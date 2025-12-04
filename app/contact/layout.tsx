import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Brisbane Wedding Videographer",
  description: "Get in touch with Flare Films to discuss your wedding videography needs. Based in Brisbane, serving Queensland couples with authentic wedding films. Contact us today for availability and pricing.",
  openGraph: {
    title: "Contact - Brisbane Wedding Videographer",
    description: "Get in touch with Flare Films to discuss your wedding videography needs",
    url: "https://flarefilms.com.au/contact",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact - Brisbane Wedding Videographer",
    description: "Get in touch with Flare Films to discuss your wedding videography needs",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
