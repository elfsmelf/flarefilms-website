// Organization schema (for site-wide use)
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Flare Films',
    url: 'https://flarefilms.com.au',
    logo: 'https://flarefilms.com.au/logo.png',
    description: 'Brisbane wedding videographer capturing precious moments',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      addressCountry: 'AU',
    },
    sameAs: [
      'https://www.facebook.com/flarefilms.au/',
      'https://www.instagram.com/flarefilms.au/',
      'https://www.youtube.com/@flarefilms861',
    ],
  }
}

// Extract YouTube video ID from various URL formats
function extractYouTubeVideoId(url: string): string | null {
  // Handle embed URLs: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/)
  if (embedMatch) return embedMatch[1]

  // Handle watch URLs: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  if (watchMatch) return watchMatch[1]

  // Handle short URLs: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return shortMatch[1]

  return null
}

// VideoObject schema for films
export function generateVideoSchema(film: {
  title: string
  slug: string
  tagline?: string | null
  headerImage: string | null
  createdAt?: Date
  videoUrl?: string | null
  venue?: {
    venueTitle: string
    city?: string | null
  } | null
}) {
  const hasVenue = film.venue?.venueTitle
  const videoId = film.videoUrl ? extractYouTubeVideoId(film.videoUrl) : null

  // Generate proper URLs for YouTube videos
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : undefined
  const contentUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : undefined
  const youtubeThumbnail = videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `https://flarefilms.com.au/films/${film.slug}#video`,
    name: hasVenue
      ? `${film.title} | ${film.venue!.venueTitle} Wedding Film`
      : `${film.title} - Wedding Film`,
    description: hasVenue
      ? `${film.title}'s ${film.venue!.venueTitle} wedding film. ${film.tagline || ''} By Flare Films.`.trim()
      : film.tagline || `${film.title} wedding film by Flare Films`,
    thumbnailUrl: youtubeThumbnail || film.headerImage || undefined,
    uploadDate: film.createdAt?.toISOString() || new Date().toISOString(),
    contentUrl,
    embedUrl,
    duration: 'PT5M',
    publisher: {
      '@type': 'Organization',
      name: 'Flare Films',
      logo: {
        '@type': 'ImageObject',
        url: 'https://flarefilms.com.au/logo.png',
      },
    },
    // SEO: Include venue location in schema
    ...(hasVenue && {
      contentLocation: {
        '@type': 'Place',
        name: film.venue!.venueTitle,
        address: {
          '@type': 'PostalAddress',
          addressLocality: film.venue!.city || 'Brisbane',
          addressRegion: 'QLD',
          addressCountry: 'AU',
        },
      },
    }),
  }
}

// LocalBusiness schema for venues
export function generateVenueSchema(venue: {
  venueTitle: string
  shortDescription?: string | null
  listingImage?: string | null
  venueAddress?: string | null
  city?: string | null
  phoneNumber?: string | null
  websiteUrl?: string | null
  price?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: venue.venueTitle,
    description: venue.shortDescription || `${venue.venueTitle} wedding venue`,
    image: venue.listingImage || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.venueAddress || undefined,
      addressLocality: venue.city || 'Brisbane',
      addressRegion: 'QLD',
      addressCountry: 'AU',
    },
    telephone: venue.phoneNumber || undefined,
    url: venue.websiteUrl || undefined,
    priceRange: venue.price || undefined,
  }
}

// Article schema for blog posts
export function generateArticleSchema(post: {
  title: string
  excerpt?: string | null
  image?: string | null
  date: Date
  updatedAt?: Date | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || `${post.title} - Flare Films blog`,
    image: post.image || undefined,
    datePublished: post.date.toISOString(),
    dateModified: post.updatedAt?.toISOString() || post.date.toISOString(),
    author: {
      '@type': 'Person',
      name: 'Richard Paynter',
    },
  }
}

// BreadcrumbList schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
