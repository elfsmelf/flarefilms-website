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

// VideoObject schema for films
export function generateVideoSchema(film: {
  title: string
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

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: hasVenue
      ? `${film.title} | ${film.venue!.venueTitle} Wedding Film`
      : `${film.title} - Wedding Film`,
    description: hasVenue
      ? `${film.title}'s ${film.venue!.venueTitle} wedding film. ${film.tagline || ''} By Flare Films.`.trim()
      : film.tagline || `${film.title} wedding film by Flare Films`,
    thumbnailUrl: film.headerImage || undefined,
    uploadDate: film.createdAt?.toISOString() || new Date().toISOString(),
    contentUrl: film.videoUrl || undefined,
    embedUrl: film.videoUrl || undefined,
    duration: 'PT10M', // Adjust based on actual video length if available
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
