'use server'

import { db } from '@/lib/db'
import { films, vendors, galleryImages, venueWeddingFilms, venues } from '@/lib/db/schema'
import { requireAuth } from '@/lib/session'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { createId } from '@paralleldrive/cuid2'
import { redirect } from 'next/navigation'

export interface FilmFormData {
  slug: string
  title: string
  subtitle: string
  tagline: string
  location: string
  headerImage: string
  videoUrl?: string
  trailerUrl?: string
  storyContent: string
  published: boolean
  featured: boolean
  order: number
  rating: number
  venueId?: string
}

export interface VendorFormData {
  role: string
  name: string
  link?: string
}

export interface GalleryImageFormData {
  url: string
  alt: string
}

interface ActionResponse {
  success: boolean
  error?: string
  filmId?: string
}

/**
 * Get all films for admin (including unpublished)
 */
export async function getAllFilmsAdmin() {
  await requireAuth()

  const allFilms = await db.query.films.findMany({
    with: {
      vendors: {
        orderBy: (vendors, { asc }) => [asc(vendors.order)],
      },
      gallery: {
        orderBy: (gallery, { asc }) => [asc(gallery.order)],
      },
    },
    orderBy: (films, { desc, asc }) => [desc(films.featured), asc(films.order)],
  })

  return allFilms
}

/**
 * Get a single film by ID for admin (including unpublished)
 */
export async function getFilmByIdAdmin(id: string) {
  await requireAuth()

  const film = await db.query.films.findFirst({
    where: eq(films.id, id),
    with: {
      vendors: {
        orderBy: (vendors, { asc }) => [asc(vendors.order)],
      },
      gallery: {
        orderBy: (gallery, { asc }) => [asc(gallery.order)],
      },
      venueWeddingFilms: {
        with: {
          venue: true,
        },
      },
    },
  })

  return film
}

/**
 * Create a new film
 */
export async function createFilm(
  filmData: FilmFormData,
  vendorsData: VendorFormData[],
  galleryData: GalleryImageFormData[]
): Promise<ActionResponse> {
  try {
    await requireAuth()

    // Check if slug already exists
    const existingFilm = await db.query.films.findFirst({
      where: eq(films.slug, filmData.slug),
    })

    if (existingFilm) {
      return {
        success: false,
        error: 'A film with this slug already exists',
      }
    }

    // Create film
    const filmId = createId()
    const [newFilm] = await db
      .insert(films)
      .values({
        id: filmId,
        ...filmData,
      })
      .returning()

    // Create vendors
    if (vendorsData.length > 0) {
      await db.insert(vendors).values(
        vendorsData.map((vendor, index) => ({
          id: createId(),
          filmId: newFilm.id,
          role: vendor.role,
          name: vendor.name,
          link: vendor.link || null,
          order: index,
        }))
      )
    }

    // Create gallery images
    if (galleryData.length > 0) {
      await db.insert(galleryImages).values(
        galleryData.map((image, index) => ({
          id: createId(),
          filmId: newFilm.id,
          url: image.url,
          alt: image.alt,
          order: index,
        }))
      )
    }

    // Create venue relationship if venueId is provided
    if (filmData.venueId) {
      await db.insert(venueWeddingFilms).values({
        id: createId(),
        venueId: filmData.venueId,
        filmId: newFilm.id,
        order: 0,
      })
    }

    revalidatePath('/films')
    revalidatePath(`/films/${filmData.slug}`)
    revalidatePath('/admin/films')
    if (filmData.venueId) {
      revalidatePath('/venues')
    }

    return {
      success: true,
      filmId: newFilm.id,
    }
  } catch (error) {
    console.error('Create film error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create film',
    }
  }
}

/**
 * Update an existing film
 */
export async function updateFilm(
  id: string,
  filmData: FilmFormData,
  vendorsData: VendorFormData[],
  galleryData: GalleryImageFormData[]
): Promise<ActionResponse> {
  try {
    await requireAuth()

    // Check if film exists
    const existingFilm = await db.query.films.findFirst({
      where: eq(films.id, id),
    })

    if (!existingFilm) {
      return {
        success: false,
        error: 'Film not found',
      }
    }

    // Check if slug is changing and already in use
    if (filmData.slug !== existingFilm.slug) {
      const slugInUse = await db.query.films.findFirst({
        where: eq(films.slug, filmData.slug),
      })

      if (slugInUse) {
        return {
          success: false,
          error: 'A film with this slug already exists',
        }
      }
    }

    // Update film
    await db
      .update(films)
      .set({
        ...filmData,
        updatedAt: new Date(),
      })
      .where(eq(films.id, id))

    // Delete existing vendors and create new ones
    await db.delete(vendors).where(eq(vendors.filmId, id))
    if (vendorsData.length > 0) {
      await db.insert(vendors).values(
        vendorsData.map((vendor, index) => ({
          id: createId(),
          filmId: id,
          role: vendor.role,
          name: vendor.name,
          link: vendor.link || null,
          order: index,
        }))
      )
    }

    // Delete existing gallery images and create new ones
    await db.delete(galleryImages).where(eq(galleryImages.filmId, id))
    if (galleryData.length > 0) {
      await db.insert(galleryImages).values(
        galleryData.map((image, index) => ({
          id: createId(),
          filmId: id,
          url: image.url,
          alt: image.alt,
          order: index,
        }))
      )
    }

    // Update venue relationship
    // Delete existing venue relationships and create new one if venueId is provided
    await db.delete(venueWeddingFilms).where(eq(venueWeddingFilms.filmId, id))
    if (filmData.venueId) {
      await db.insert(venueWeddingFilms).values({
        id: createId(),
        venueId: filmData.venueId,
        filmId: id,
        order: 0,
      })
    }

    revalidatePath('/films')
    revalidatePath(`/films/${existingFilm.slug}`)
    revalidatePath(`/films/${filmData.slug}`)
    revalidatePath('/admin/films')
    revalidatePath('/venues')

    return {
      success: true,
      filmId: id,
    }
  } catch (error) {
    console.error('Update film error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update film',
    }
  }
}

/**
 * Delete a film
 */
export async function deleteFilm(id: string): Promise<ActionResponse> {
  try {
    await requireAuth()

    const film = await db.query.films.findFirst({
      where: eq(films.id, id),
    })

    if (!film) {
      return {
        success: false,
        error: 'Film not found',
      }
    }

    // Delete related vendors and gallery images (cascade)
    await db.delete(vendors).where(eq(vendors.filmId, id))
    await db.delete(galleryImages).where(eq(galleryImages.filmId, id))

    // Delete film
    await db.delete(films).where(eq(films.id, id))

    revalidatePath('/films')
    revalidatePath(`/films/${film.slug}`)
    revalidatePath('/admin/films')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Delete film error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete film',
    }
  }
}

/**
 * Toggle published status
 */
export async function togglePublished(id: string): Promise<ActionResponse> {
  try {
    await requireAuth()

    const film = await db.query.films.findFirst({
      where: eq(films.id, id),
    })

    if (!film) {
      return {
        success: false,
        error: 'Film not found',
      }
    }

    await db
      .update(films)
      .set({
        published: !film.published,
        updatedAt: new Date(),
      })
      .where(eq(films.id, id))

    revalidatePath('/films')
    revalidatePath(`/films/${film.slug}`)
    revalidatePath('/admin/films')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Toggle published error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to toggle published status',
    }
  }
}

/**
 * Toggle featured status
 */
export async function toggleFeatured(id: string): Promise<ActionResponse> {
  try {
    await requireAuth()

    const film = await db.query.films.findFirst({
      where: eq(films.id, id),
    })

    if (!film) {
      return {
        success: false,
        error: 'Film not found',
      }
    }

    await db
      .update(films)
      .set({
        featured: !film.featured,
        updatedAt: new Date(),
      })
      .where(eq(films.id, id))

    revalidatePath('/films')
    revalidatePath(`/films/${film.slug}`)
    revalidatePath('/admin/films')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Toggle featured error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to toggle featured status',
    }
  }
}

/**
 * Get all venues for venue dropdown (admin only)
 */
export async function getAllVenuesForDropdown() {
  await requireAuth()

  const allVenues = await db.query.venues.findMany({
    columns: {
      id: true,
      venueTitle: true,
    },
    orderBy: (venues, { asc }) => [asc(venues.venueTitle)],
  })

  return allVenues
}
