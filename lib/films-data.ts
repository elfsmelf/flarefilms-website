import 'server-only'

import { db } from './db'
import { films } from './db/schema'
import { eq, sql } from 'drizzle-orm'

export interface Film {
  slug: string
  title: string
  subtitle: string
  tagline: string
  location: string
  headerImage: string
  videoUrl?: string
  trailerUrl?: string
  storyContent: string
  vendors: {
    role: string
    name: string
    link?: string | null
  }[]
  gallery: {
    url: string
    alt: string
  }[]
  venue?: {
    slug: string
    venueTitle: string
    listingImage: string | null
    shortDescription: string | null
    city: string | null
    gallery: {
      url: string
      alt: string
    }[]
  }
}

/**
 * Find a film's current slug by checking old slugs.
 * Returns the current slug if found, null otherwise.
 * Used for redirecting old URLs to new ones.
 */
export async function getFilmSlugByOldSlug(oldSlug: string): Promise<string | null> {
  // Search for films where old_slugs JSON array contains the given slug
  const film = await db.query.films.findFirst({
    where: sql`${films.oldSlugs}::jsonb ? ${oldSlug}`,
    columns: {
      slug: true,
      published: true,
    },
  })

  if (!film || !film.published) {
    return null
  }

  return film.slug
}

export async function getFilmBySlug(slug: string): Promise<Film | null> {
  const film = await db.query.films.findFirst({
    where: eq(films.slug, slug),
    with: {
      vendors: {
        orderBy: (vendors, { asc }) => [asc(vendors.order)],
      },
      gallery: {
        orderBy: (gallery, { asc }) => [asc(gallery.order)],
      },
      venueWeddingFilms: {
        with: {
          venue: {
            with: {
              gallery: {
                orderBy: (gallery, { asc }) => [asc(gallery.order)],
              },
            },
          },
        },
      },
    },
  })

  if (!film || !film.published) {
    return null
  }

  // Get the first venue if it exists
  const venue = film.venueWeddingFilms?.[0]?.venue

  return {
    slug: film.slug,
    title: film.title,
    subtitle: film.subtitle,
    tagline: film.tagline,
    location: film.location,
    headerImage: film.headerImage,
    videoUrl: film.videoUrl ?? undefined,
    trailerUrl: film.trailerUrl ?? undefined,
    storyContent: film.storyContent,
    vendors: film.vendors.map((v) => ({
      role: v.role,
      name: v.name,
      link: v.link,
    })),
    gallery: film.gallery.map((g) => ({
      url: g.url,
      alt: g.alt,
    })),
    venue: venue ? {
      slug: venue.slug,
      venueTitle: venue.venueTitle,
      listingImage: venue.listingImage,
      shortDescription: venue.shortDescription,
      city: venue.city,
      gallery: venue.gallery.map((g) => ({
        url: g.url,
        alt: g.alt,
      })),
    } : undefined,
  }
}

export async function getAllFilms(): Promise<Film[]> {
  const allFilms = await db.query.films.findMany({
    where: eq(films.published, true),
    with: {
      vendors: {
        orderBy: (vendors, { asc }) => [asc(vendors.order)],
      },
      gallery: {
        orderBy: (gallery, { asc }) => [asc(gallery.order)],
      },
    },
    orderBy: (films, { desc }) => [desc(films.rating)],
  })

  return allFilms.map((film) => ({
    slug: film.slug,
    title: film.title,
    subtitle: film.subtitle,
    tagline: film.tagline,
    location: film.location,
    headerImage: film.headerImage,
    videoUrl: film.videoUrl ?? undefined,
    trailerUrl: film.trailerUrl ?? undefined,
    storyContent: film.storyContent,
    vendors: film.vendors.map((v) => ({
      role: v.role,
      name: v.name,
      link: v.link,
    })),
    gallery: film.gallery.map((g) => ({
      url: g.url,
      alt: g.alt,
    })),
  }))
}

export async function getRecommendedFilms(
  currentSlug: string,
  limit: number = 3
): Promise<Film[]> {
  const allFilms = await db.query.films.findMany({
    where: eq(films.published, true),
    with: {
      vendors: {
        orderBy: (vendors, { asc }) => [asc(vendors.order)],
      },
      gallery: {
        orderBy: (gallery, { asc }) => [asc(gallery.order)],
      },
    },
    orderBy: (films, { desc }) => [desc(films.rating)],
  })

  // Filter out current film
  const filteredFilms = allFilms.filter((film) => film.slug !== currentSlug)

  // Shuffle array for random selection (Fisher-Yates shuffle)
  const shuffled = [...filteredFilms]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
    .slice(0, limit)
    .map((film) => ({
      slug: film.slug,
      title: film.title,
      subtitle: film.subtitle,
      tagline: film.tagline,
      location: film.location,
      headerImage: film.headerImage,
      videoUrl: film.videoUrl ?? undefined,
      trailerUrl: film.trailerUrl ?? undefined,
      storyContent: film.storyContent,
      vendors: film.vendors.map((v) => ({
        role: v.role,
        name: v.name,
        link: v.link,
      })),
      gallery: film.gallery.map((g) => ({
        url: g.url,
        alt: g.alt,
      })),
    }))
}
