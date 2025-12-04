import { Header } from "@/components/header"
import { CongratulationsHero } from "@/components/congratulations-hero"
import { ReviewsHeader } from "@/components/reviews-header"
import { TestimonialCarousel } from "@/components/testimonial-carousel-reviews"
import { PackagesInclude } from "@/components/packages-include"
import { PricingCards } from "@/components/pricing-cards-new"
import { ImageCarousel } from "@/components/image-carousel"
import { Footer } from "@/components/footer"
import { PhotographyProcessFlow } from "@/components/photography-process-flow"
import { HeroHeading } from "@/components/hero-heading"
import { FAQSection } from "@/components/faq-section"
import { HeroGallerySection } from "@/components/hero-gallery-section"
import { TimelessWeddings } from "@/components/timeless-weddings"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#24221d]">
      <Header />
      <CongratulationsHero />
      <ReviewsHeader />
      <TestimonialCarousel />
      <PackagesInclude />
      <PricingCards />
      <PhotographyProcessFlow />
      <HeroHeading title="You've got questions? I've got answers!" />
      <FAQSection />
      <HeroGallerySection />
      <TimelessWeddings />
      <ImageCarousel />
      <Footer />
    </main>
  )
}
