import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Richard - Brisbane Wedding Videographer",
  description: "Meet Richard Paynter, award-winning wedding videographer specializing in authentic, emotional wedding films across Brisbane and Queensland. Natural storytelling with cinematic quality.",
  openGraph: {
    title: "About Richard - Brisbane Wedding Videographer",
    description: "Meet Richard Paynter, award-winning wedding videographer specializing in authentic wedding films",
    url: "https://flarefilms.com.au/about",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About Richard - Brisbane Wedding Videographer",
    description: "Meet Richard Paynter, award-winning wedding videographer specializing in authentic wedding films",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
