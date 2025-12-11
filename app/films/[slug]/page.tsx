import { getFilmBySlug, getRecommendedFilms, getAllFilms } from "@/lib/films-data"
import { FilmClient } from "./film-client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { generateOGMetadata, generateTwitterMetadata } from "@/lib/seo/metadata"
import { generateVideoSchema, generateBreadcrumbSchema } from "@/lib/seo/schema"
import { JsonLd } from "@/components/seo/JsonLd"

// Generate static params for all published films
export async function generateStaticParams() {
  const films = await getAllFilms()
  return films.map((film) => ({
    slug: film.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const film = await getFilmBySlug(slug)

  if (!film) return {}

  // SEO: Include venue name in title if available for venue-targeted keywords
  const hasVenue = film.venue?.venueTitle
  const title = hasVenue
    ? `${film.title} | ${film.venue!.venueTitle} Wedding Film`
    : `${film.title} - Wedding Film`

  // SEO: Venue-optimized description
  const description = hasVenue
    ? `Watch ${film.title}'s beautiful ${film.venue!.venueTitle} wedding film. ${film.tagline || ''} Captured by Flare Films, Brisbane's premier wedding videographer.`.trim()
    : film.tagline || film.subtitle || `${film.title} wedding film by Flare Films`

  const url = `https://flarefilms.com.au/films/${slug}`

  // SEO: Include venue in keywords if available
  const keywords = [
    film.location,
    "wedding film",
    "wedding video",
    film.title,
    "Brisbane wedding videographer",
    ...(hasVenue ? [`${film.venue!.venueTitle} wedding film`, `${film.venue!.venueTitle} wedding video`, film.venue!.venueTitle] : []),
  ]

  return {
    title,
    description,
    keywords,
    openGraph: generateOGMetadata({
      title,
      description,
      image: film.headerImage || undefined,
      url,
      type: 'video.other',
    }),
    twitter: generateTwitterMetadata({
      title,
      description,
      image: film.headerImage || undefined,
    }),
  }
}

export default async function FilmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const film = await getFilmBySlug(slug)

  if (!film) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="py-32 text-center">
          <h1 className="font-cormorant text-4xl text-[#5a534b]">Film not found</h1>
          <Link
            href="/films"
            className="inline-flex items-center gap-2 mt-8 text-sm font-sans uppercase tracking-[0.15em] text-[#5a534b] hover:text-[#b8a862] transition-colors duration-300"
          >
            <ArrowRight size={16} className="rotate-180" />
            Back to Films
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const recommendedFilms = await getRecommendedFilms(slug, 3)

  const videoSchema = generateVideoSchema(film)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://flarefilms.com.au' },
    { name: 'Films', url: 'https://flarefilms.com.au/films' },
    { name: film.title, url: `https://flarefilms.com.au/films/${slug}` },
  ])

  return (
    <>
      <JsonLd data={videoSchema} />
      <JsonLd data={breadcrumbSchema} />
      <FilmClient film={film} recommendedFilms={recommendedFilms} />
    </>
  )
}
