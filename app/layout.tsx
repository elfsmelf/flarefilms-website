import type React from "react"
import type { Metadata } from "next"
import { EB_Garamond, Cormorant_Garamond, Questrial } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { JsonLd } from "@/components/seo/JsonLd"
import { generateOrganizationSchema } from "@/lib/seo/schema"
import "./globals.css"

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-eb-garamond",
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const questrial = Questrial({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-questrial",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://flarefilms.com.au'),
  title: {
    default: "Wedding Videographer Brisbane | Flare Films",
    template: "%s | Flare Films",
  },
  description:
    "Award-winning Brisbane wedding videographer capturing authentic, emotional wedding films across Queensland. Natural storytelling, cinematic quality.",
  keywords: ["wedding videographer", "Brisbane", "Queensland", "wedding films", "cinematic wedding videos"],
  authors: [{ name: "Richard Paynter" }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://flarefilms.com.au',
    siteName: 'Flare Films',
    title: 'Wedding Videographer Brisbane | Flare Films',
    description: 'Award-winning Brisbane wedding videographer',
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Videographer Brisbane | Flare Films',
    description: 'Award-winning Brisbane wedding videographer',
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const orgSchema = generateOrganizationSchema()

  return (
    <html lang="en">
      <body
        className={`${ebGaramond.variable} ${cormorantGaramond.variable} ${questrial.variable} font-sans antialiased`}
      >
        <JsonLd data={orgSchema} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
