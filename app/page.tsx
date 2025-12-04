import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { WeddingFilms } from "@/components/wedding-films"
import { About } from "@/components/about"
import { FeaturedWork } from "@/components/featured-work"
import { Testimonial } from "@/components/testimonial"
import { PricingSection } from "@/components/pricing-section"
import { TimelessWeddings } from "@/components/timeless-weddings"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import { db } from "@/lib/db"
import { films } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wedding Videographer Brisbane | Flare Films",
  description: "Award-winning Brisbane wedding videographer capturing authentic, emotional wedding films across Queensland. Natural storytelling, cinematic quality. View our portfolio and pricing.",
  openGraph: {
    title: "Wedding Videographer Brisbane | Flare Films",
    description: "Award-winning Brisbane wedding videographer capturing authentic, emotional wedding films",
    url: "https://flarefilms.com.au",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wedding Videographer Brisbane | Flare Films",
    description: "Award-winning Brisbane wedding videographer capturing authentic, emotional wedding films",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default async function Home() {
  // Fetch featured films from database
  const featuredFilms = await db.query.films.findMany({
    where: eq(films.published, true),
    orderBy: (films, { desc }) => [desc(films.rating)],
    limit: 4,
  })

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <WeddingFilms />
      <About />
      <FeaturedWork films={featuredFilms} />
      <Testimonial />
      <PricingSection />
      <TimelessWeddings />
      <ImageCarousel />
      <Footer />
    </main>
  )
}
