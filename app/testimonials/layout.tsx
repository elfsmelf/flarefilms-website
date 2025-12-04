import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Testimonials - Brisbane Wedding Videographer",
  description: "Read what our couples say about their wedding videography experience with Flare Films. Real testimonials from Brisbane weddings. See why couples trust us with their precious memories.",
  openGraph: {
    title: "Testimonials - Brisbane Wedding Videographer",
    description: "Read what our couples say about their wedding videography experience with Flare Films",
    url: "https://flarefilms.com.au/testimonials",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Testimonials - Brisbane Wedding Videographer",
    description: "Read what our couples say about their wedding videography experience with Flare Films",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children
}
