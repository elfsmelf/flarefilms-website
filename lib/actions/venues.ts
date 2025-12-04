'use server'

import { db } from '@/lib/db'
import { venues, venueGalleryImages, venueWeddingFilms, similarVenues } from '@/lib/db/schema'
import { requireAuth } from '@/lib/session'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { createId } from '@paralleldrive/cuid2'

export interface VenueFormData {
  slug: string
  venueTitle: string
  shortDescription?: string
  expandedText?: string
  listingImage?: string
  venueAddress?: string
  phoneNumber?: string
  city?: string
  cityPageUrl?: string
  venueLocation?: string
  weddingTypes?: string
  categories?: string
  price?: string
  pricePerHead?: string
  rating?: number
  availableDaysAndTimes?: string
  venueContact?: string
  websiteUrl?: string
  isParkingOnSite?: string
  canHaveCeremony?: string
  canHaveReception?: string
  wetWeatherOption?: string
  marqueeRequired?: string
  inHouseCatering?: string
  thirdPartyCatering?: string
  cateringOptions?: string
  covidInfo?: string
  howToGetMostOut?: string
  weddingCost?: string
  themeStyle?: string
  address?: string
  accommodationOptions?: string
  customCallToAction?: string
  timeRestriction?: string
  musicEndBy?: string
  ceremonyGuests?: string
  receptionGuests?: string
  html?: string
  indoorOutdoor?: string
  published: boolean
  featured: boolean
  order: number
}

export interface VenueGalleryImageFormData {
  url: string
  alt: string
}

interface ActionResponse {
  success: boolean
  error?: string
  venueId?: string
}

/**
 * Get all published venues for public display
 */
export async function getAllVenues() {
  const allVenues = await db.query.venues.findMany({
    where: eq(venues.published, true),
    with: {
      gallery: {
        orderBy: (gallery, { asc }) => [asc(gallery.order)],
      },
    },
    orderBy: (venues, { desc, asc }) => [desc(venues.featured), asc(venues.order)],
  })

  return allVenues
}

/**
 * Get a single published venue by slug with wedding films
 */
export async function getVenueBySlug(slug: string) {
  const venue = await db.query.venues.findFirst({
    where: eq(venues.slug, slug),
    with: {
      gallery: {
        orderBy: (gallery, { asc }) => [asc(gallery.order)],
      },
      weddingFilms: {
        orderBy: (weddingFilms, { asc }) => [asc(weddingFilms.order)],
        with: {
          film: {
            columns: {
              id: true,
              slug: true,
              title: true,
              subtitle: true,
              tagline: true,
              location: true,
              headerImage: true,
            },
          },
        },
      },
    },
  })

  return venue
}

/**
 * Get all venues for admin (including unpublished)
 */
export async function getAllVenuesAdmin() {
  await requireAuth()

  const allVenues = await db.query.venues.findMany({
    with: {
      gallery: {
        orderBy: (gallery, { asc }) => [asc(gallery.order)],
      },
      weddingFilms: {
        orderBy: (weddingFilms, { asc }) => [asc(weddingFilms.order)],
        with: {
          film: true,
        },
      },
      similarVenues: {
        orderBy: (similarVenues, { asc }) => [asc(similarVenues.order)],
      },
    },
    orderBy: (venues, { desc, asc }) => [desc(venues.featured), asc(venues.order)],
  })

  return allVenues
}

/**
 * Get a single venue by ID for admin (including unpublished)
 */
export async function getVenueByIdAdmin(id: string) {
  await requireAuth()

  const venue = await db.query.venues.findFirst({
    where: eq(venues.id, id),
    with: {
      gallery: {
        orderBy: (gallery, { asc }) => [asc(gallery.order)],
      },
      weddingFilms: {
        orderBy: (weddingFilms, { asc }) => [asc(weddingFilms.order)],
        with: {
          film: true,
        },
      },
      similarVenues: {
        orderBy: (similarVenues, { asc }) => [asc(similarVenues.order)],
      },
    },
  })

  return venue
}

/**
 * Create a new venue
 */
export async function createVenue(
  venueData: VenueFormData,
  galleryData: VenueGalleryImageFormData[],
  weddingFilmIds: string[],
  similarVenueIds: string[]
): Promise<ActionResponse> {
  try {
    await requireAuth()

    // Check if slug already exists
    const existingVenue = await db.query.venues.findFirst({
      where: eq(venues.slug, venueData.slug),
    })

    if (existingVenue) {
      return {
        success: false,
        error: 'A venue with this slug already exists',
      }
    }

    // Create venue
    const venueId = createId()
    const [newVenue] = await db
      .insert(venues)
      .values({
        id: venueId,
        ...venueData,
      })
      .returning()

    // Create gallery images
    if (galleryData.length > 0) {
      await db.insert(venueGalleryImages).values(
        galleryData.map((image, index) => ({
          id: createId(),
          venueId: newVenue.id,
          url: image.url,
          alt: image.alt,
          order: index,
        }))
      )
    }

    // Create wedding film relations
    if (weddingFilmIds.length > 0) {
      await db.insert(venueWeddingFilms).values(
        weddingFilmIds.map((filmId, index) => ({
          id: createId(),
          venueId: newVenue.id,
          filmId,
          order: index,
        }))
      )
    }

    // Create similar venue relations
    if (similarVenueIds.length > 0) {
      await db.insert(similarVenues).values(
        similarVenueIds.map((similarVenueId, index) => ({
          id: createId(),
          venueId: newVenue.id,
          similarVenueId,
          order: index,
        }))
      )
    }

    revalidatePath('/venues')
    revalidatePath(`/venues/${venueData.slug}`)
    revalidatePath('/admin/venues')

    return {
      success: true,
      venueId: newVenue.id,
    }
  } catch (error) {
    console.error('Create venue error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create venue',
    }
  }
}

/**
 * Update an existing venue
 */
export async function updateVenue(
  id: string,
  venueData: VenueFormData,
  galleryData: VenueGalleryImageFormData[],
  weddingFilmIds: string[],
  similarVenueIds: string[]
): Promise<ActionResponse> {
  try {
    await requireAuth()

    // Check if venue exists
    const existingVenue = await db.query.venues.findFirst({
      where: eq(venues.id, id),
    })

    if (!existingVenue) {
      return {
        success: false,
        error: 'Venue not found',
      }
    }

    // Check if slug is changing and already in use
    if (venueData.slug !== existingVenue.slug) {
      const slugInUse = await db.query.venues.findFirst({
        where: eq(venues.slug, venueData.slug),
      })

      if (slugInUse) {
        return {
          success: false,
          error: 'A venue with this slug already exists',
        }
      }
    }

    // Update venue
    await db
      .update(venues)
      .set({
        ...venueData,
        updatedAt: new Date(),
      })
      .where(eq(venues.id, id))

    // Delete existing gallery images and create new ones
    await db.delete(venueGalleryImages).where(eq(venueGalleryImages.venueId, id))
    if (galleryData.length > 0) {
      await db.insert(venueGalleryImages).values(
        galleryData.map((image, index) => ({
          id: createId(),
          venueId: id,
          url: image.url,
          alt: image.alt,
          order: index,
        }))
      )
    }

    // Delete existing wedding film relations and create new ones
    await db.delete(venueWeddingFilms).where(eq(venueWeddingFilms.venueId, id))
    if (weddingFilmIds.length > 0) {
      await db.insert(venueWeddingFilms).values(
        weddingFilmIds.map((filmId, index) => ({
          id: createId(),
          venueId: id,
          filmId,
          order: index,
        }))
      )
    }

    // Delete existing similar venue relations and create new ones
    await db.delete(similarVenues).where(eq(similarVenues.venueId, id))
    if (similarVenueIds.length > 0) {
      await db.insert(similarVenues).values(
        similarVenueIds.map((similarVenueId, index) => ({
          id: createId(),
          venueId: id,
          similarVenueId,
          order: index,
        }))
      )
    }

    revalidatePath('/venues')
    revalidatePath(`/venues/${existingVenue.slug}`)
    revalidatePath(`/venues/${venueData.slug}`)
    revalidatePath('/admin/venues')

    return {
      success: true,
      venueId: id,
    }
  } catch (error) {
    console.error('Update venue error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update venue',
    }
  }
}

/**
 * Delete a venue
 */
export async function deleteVenue(id: string): Promise<ActionResponse> {
  try {
    await requireAuth()

    const venue = await db.query.venues.findFirst({
      where: eq(venues.id, id),
    })

    if (!venue) {
      return {
        success: false,
        error: 'Venue not found',
      }
    }

    // Delete related data (cascade)
    await db.delete(venueGalleryImages).where(eq(venueGalleryImages.venueId, id))
    await db.delete(venueWeddingFilms).where(eq(venueWeddingFilms.venueId, id))
    await db.delete(similarVenues).where(eq(similarVenues.venueId, id))

    // Delete venue
    await db.delete(venues).where(eq(venues.id, id))

    revalidatePath('/venues')
    revalidatePath(`/venues/${venue.slug}`)
    revalidatePath('/admin/venues')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Delete venue error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete venue',
    }
  }
}

/**
 * Toggle published status
 */
export async function togglePublished(id: string): Promise<ActionResponse> {
  try {
    await requireAuth()

    const venue = await db.query.venues.findFirst({
      where: eq(venues.id, id),
    })

    if (!venue) {
      return {
        success: false,
        error: 'Venue not found',
      }
    }

    await db
      .update(venues)
      .set({
        published: !venue.published,
        updatedAt: new Date(),
      })
      .where(eq(venues.id, id))

    revalidatePath('/venues')
    revalidatePath(`/venues/${venue.slug}`)
    revalidatePath('/admin/venues')

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

    const venue = await db.query.venues.findFirst({
      where: eq(venues.id, id),
    })

    if (!venue) {
      return {
        success: false,
        error: 'Venue not found',
      }
    }

    await db
      .update(venues)
      .set({
        featured: !venue.featured,
        updatedAt: new Date(),
      })
      .where(eq(venues.id, id))

    revalidatePath('/venues')
    revalidatePath(`/venues/${venue.slug}`)
    revalidatePath('/admin/venues')

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
