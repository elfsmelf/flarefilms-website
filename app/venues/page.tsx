import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import { getAllVenues } from "@/lib/actions/venues"
import { VenuesGrid } from "./venues-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wedding Venues Brisbane & Queensland",
  description: "Discover beautiful wedding venues across Brisbane and Queensland. Browse our curated collection of wedding venues with photos, details, and wedding films from each location.",
  openGraph: {
    title: "Wedding Venues Brisbane & Queensland",
    description: "Discover beautiful wedding venues across Brisbane and Queensland",
    url: "https://flarefilms.com.au/venues",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wedding Venues Brisbane & Queensland",
    description: "Discover beautiful wedding venues across Brisbane and Queensland",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default async function VenuesPage() {
  const venues = await getAllVenues()

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <VenuesGrid venues={venues} />
      <ImageCarousel />
      <Footer />
    </main>
  )
}
