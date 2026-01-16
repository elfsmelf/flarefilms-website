import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: "Pricing Guide - Brisbane Wedding Videographer",
  description: "Transparent wedding videography pricing from Flare Films. Quality Brisbane wedding films with packages to suit every couple. View our pricing and investment options for your special day.",
  openGraph: {
    title: "Pricing Guide - Brisbane Wedding Videographer",
    description: "Transparent wedding videography pricing from Flare Films Brisbane",
    url: "https://flarefilms.com.au/pricing-guide",
    images: ['https://assets.guestsnapper.com/wedding-gallery-media/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pricing Guide - Brisbane Wedding Videographer",
    description: "Transparent wedding videography pricing from Flare Films Brisbane",
    images: ['https://assets.guestsnapper.com/wedding-gallery-media/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default function PricingGuideLayout({ children }: { children: React.ReactNode }) {
  return children
}
