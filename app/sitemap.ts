import { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { films, venues, blogPosts } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://flarefilms.com.au'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/films`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/venues`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Location pages
    {
      url: `${baseUrl}/byron-bay-wedding-videographer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gold-coast-wedding-videographer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/moreton-bay-wedding-videographer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/noosa-wedding-videographer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/st-george-wedding-videographer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sunshine-coast-wedding-videographer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/toowoomba-wedding-videographer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Dynamic film pages
  const allFilms = await db
    .select({ slug: films.slug, updatedAt: films.updatedAt })
    .from(films)
    .where(eq(films.published, true))

  const filmPages: MetadataRoute.Sitemap = allFilms.map((film) => ({
    url: `${baseUrl}/films/${film.slug}`,
    lastModified: film.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Dynamic venue pages
  const allVenues = await db
    .select({ slug: venues.slug, updatedAt: venues.updatedAt })
    .from(venues)
    .where(eq(venues.published, true))

  const venuePages: MetadataRoute.Sitemap = allVenues.map((venue) => ({
    url: `${baseUrl}/venues/${venue.slug}`,
    lastModified: venue.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Dynamic blog pages
  const allPosts = await db
    .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt })
    .from(blogPosts)
    .where(eq(blogPosts.published, true))

  const blogPages: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...filmPages, ...venuePages, ...blogPages]
}
