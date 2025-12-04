import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import { VenuePageClient } from "@/components/venue-page-client"
import { VenueFilmsSection } from "@/components/venue-films-section"
import { getVenueBySlug, getAllVenues } from "@/lib/actions/venues"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { generateOGMetadata, generateTwitterMetadata } from "@/lib/seo/metadata"
import { generateVenueSchema, generateBreadcrumbSchema } from "@/lib/seo/schema"
import { JsonLd } from "@/components/seo/JsonLd"

// Generate static params for all published venues
export async function generateStaticParams() {
  const venues = await getAllVenues()
  return venues.map((venue) => ({
    slug: venue.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const venue = await getVenueBySlug(slug)

  if (!venue || !venue.published) return {}

  const title = `${venue.venueTitle} - Wedding Venue in ${venue.city || 'Brisbane'}`
  const description = venue.shortDescription || `${venue.venueTitle} wedding venue in ${venue.city || 'Brisbane'}, Queensland`
  const url = `https://flarefilms.com.au/venues/${slug}`

  return {
    title,
    description,
    keywords: [venue.city || 'Brisbane', "wedding venue", venue.venueTitle, "Queensland wedding venue", "Brisbane wedding venue"],
    openGraph: generateOGMetadata({
      title,
      description,
      image: venue.listingImage || undefined,
      url,
      type: 'website',
    }),
    twitter: generateTwitterMetadata({
      title,
      description,
      image: venue.listingImage || undefined,
    }),
  }
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Fetch venue from database
  const dbVenue = await getVenueBySlug(slug)

  // Show 404 if venue not found or not published
  if (!dbVenue || !dbVenue.published) {
    notFound()
  }

  // Extract films if they exist
  const films = dbVenue.weddingFilms?.map((wf) => wf.film).filter(Boolean) || []

  // Get gallery images
  const images = dbVenue.gallery?.map((img) => img.url) || []

  // Parse indoor/outdoor JSON if it exists
  let ceremonyType = "N/A"
  if (dbVenue.indoorOutdoor) {
    try {
      const parsed = JSON.parse(dbVenue.indoorOutdoor)
      ceremonyType = Array.isArray(parsed) ? parsed.join(" / ") : parsed
    } catch {
      ceremonyType = dbVenue.indoorOutdoor
    }
  } else if (dbVenue.canHaveCeremony === "Yes") {
    ceremonyType = "Available"
  }

  // Handle price per head - strip HTML tags if present or show contact message
  let pricePerHeadText = "Contact for pricing"
  if (dbVenue.pricePerHead) {
    // Strip HTML tags and check if there's actual content
    const stripped = dbVenue.pricePerHead.replace(/<[^>]*>/g, '').trim()
    if (stripped) {
      pricePerHeadText = stripped
    }
  } else if (dbVenue.price) {
    pricePerHeadText = dbVenue.price
  }

  // Map database venue to VenuePageClient format
  const venueData = {
    name: dbVenue.venueTitle,
    slug: dbVenue.slug,
    description: dbVenue.shortDescription || "",
    expandedText: dbVenue.expandedText || "",
    location: dbVenue.venueAddress || dbVenue.address || "",
    phone: dbVenue.phoneNumber || "",
    website: dbVenue.websiteUrl || "",
    features: {
      pricePerHead: pricePerHeadText,
      receptionGuests: dbVenue.receptionGuests || "N/A",
      ceremony: ceremonyType,
      ceremonyGuests: dbVenue.ceremonyGuests || "N/A",
      inHouseCatering: dbVenue.inHouseCatering || "N/A",
      thirdPartyCatering: dbVenue.thirdPartyCatering || "N/A",
      eventTime: dbVenue.timeRestriction || "Contact venue",
      musicEnd: dbVenue.musicEndBy || "N/A",
      availability: dbVenue.availableDaysAndTimes || "Contact venue",
      contact: dbVenue.venueContact || "Contact venue",
    },
    images: images.length > 0 ? images : [dbVenue.listingImage || ""],
  }

  const venueSchema = generateVenueSchema(dbVenue)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://flarefilms.com.au' },
    { name: 'Venues', url: 'https://flarefilms.com.au/venues' },
    { name: dbVenue.venueTitle, url: `https://flarefilms.com.au/venues/${slug}` },
  ])

  return (
    <>
      <JsonLd data={venueSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="min-h-screen bg-[#E7E4DF]">
        <Header />
        <VenuePageClient venueData={venueData} slug={slug} />

        {/* Films Section - only show if venue has films */}
        {films.length > 0 && (
          <VenueFilmsSection films={films} venueName={dbVenue.venueTitle} />
        )}

        <ImageCarousel />
        <Footer />
      </main>
    </>
  )
}
