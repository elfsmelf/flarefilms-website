import { Metadata } from "next"
import { Header } from "@/components/header"
import { CongratulationsHero } from "@/components/congratulations-hero"
import { PackagesInclude } from "@/components/packages-include"
import { PricingCards } from "@/components/pricing-cards-new"
import { ImageCarousel } from "@/components/image-carousel"
import { Footer } from "@/components/footer"
import { HeroHeading } from "@/components/hero-heading"
import { FAQSection } from "@/components/faq-section"
import { FilmsListWithFilter } from "@/components/films-list-with-filter"
import { getAllFilms } from "@/lib/films-data"
import { GoogleReviewsSection, LimitedBonusSection, BookCallSection } from "./pricing-guide-content"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
}

export default async function PricingGuidePage() {
  const allFilms = await getAllFilms()

  return (
    <main className="min-h-screen bg-[#24221d]">
      <Header />
      <CongratulationsHero />
      <GoogleReviewsSection />
      <PackagesInclude hideCheckAvailability />

      {/* Pricing Header */}
      <section id="pricing" className="w-full bg-[#24221d] pt-20 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-wide">
            Packages Starting at $2,800
          </h2>
        </div>
      </section>

      <PricingCards hideCheckAvailability />
      <LimitedBonusSection />
      <BookCallSection />

      {/* Wedding Films Section */}
      <section className="w-full bg-[#24221d] py-20 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl mb-4 tracking-normal leading-tight font-light text-white">
              Wedding Films
            </h2>
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-[#b8a862]">
              Capturing your special moments
            </p>
          </div>
          <FilmsListWithFilter films={allFilms} />
        </div>
      </section>

      <HeroHeading title="You've got questions? I've got answers!" />
      <FAQSection />
      <ImageCarousel />
      <Footer />
    </main>
  )
}
