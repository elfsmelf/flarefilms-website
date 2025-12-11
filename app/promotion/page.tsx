import type { Metadata } from "next"
import { PromotionHero } from "./components/promotion-hero"
import { AsSeenIn } from "./components/as-seen-in"
import { IsThisYou } from "./components/is-this-you"
import { MeetRichard } from "./components/meet-richard"
import { PromiseSection } from "./components/promise-section"
import { MoreThanClients } from "./components/more-than-clients"
import { TestimonialsSection } from "./components/testimonials-section"
import { PortfolioSection } from "./components/portfolio-section"
import { GuaranteeSection } from "./components/guarantee-section"
import { PricingSection } from "./components/pricing-section"
import { TimelessWeddings } from "@/components/timeless-weddings"

export const metadata: Metadata = {
  title: "Wedding Videographer Brisbane | 4-Week Delivery Guaranteed",
  description: "Your wedding film in 4 weeks or $1,000 back. 120+ weddings filmed across Brisbane, Gold Coast & Sunshine Coast. Full pricing upfront, no surprises.",
}

export default function PromotionPage() {
  return (
    <main className="min-h-screen">
      <PromotionHero />
      <AsSeenIn />
      <IsThisYou />
      <MeetRichard />
      <PromiseSection />
      <MoreThanClients />
      <GuaranteeSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <TimelessWeddings
        title="TELL ME ABOUT YOUR WEDDING!"
        description="Fill out the form below and I'll reply within 24 hours with everything you need: full pricing breakdown, available dates, and any questions answered. No pressure. No hard sell. Just a conversation."
      />
    </main>
  )
}
