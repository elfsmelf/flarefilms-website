import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import { FilmsListWithFilter } from "@/components/films-list-with-filter"
import { getAllFilms } from "@/lib/films-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wedding Films - Brisbane Wedding Videographer",
  description: "Browse our portfolio of authentic wedding films from across Queensland. Cinematic wedding videography capturing real emotions and precious moments. View our featured wedding films.",
  openGraph: {
    title: "Wedding Films - Brisbane Wedding Videographer",
    description: "Browse our portfolio of authentic wedding films from across Queensland",
    url: "https://flarefilms.com.au/films",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wedding Films - Brisbane Wedding Videographer",
    description: "Browse our portfolio of authentic wedding films from across Queensland",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default async function FilmsPage() {
  const allFilms = await getAllFilms()

  return (
    <main className="min-h-screen bg-[#24221D]">
      <Header />

      {/* Content wrapper with single background squiggle */}
      <div className="relative overflow-hidden">
        {/* Background Decorative Squiggle - spans both sections */}
        <div
          className="absolute top-0 right-0 bottom-0 w-[200%] md:w-[120%] lg:w-[150%] pointer-events-none opacity-60 mix-blend-soft-light lg:mix-blend-normal z-0"
          style={{
            backgroundImage:
              'url("https://shared-pw-fonts.s3.us-west-2.amazonaws.com/pw-icons-theme-8/info-b-vector.svg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "100% 50%",
            backgroundSize: "contain",
          }}
          aria-hidden="true"
        />

        {/* Hero Section */}
        <section className="relative bg-[#24221D] pt-40 pb-8 px-6 z-10">
          <div className="max-w-[1200px] mx-auto text-center relative">
            <h1 className="text-[40px] md:text-[60px] lg:text-[72px] font-cormorant tracking-wide text-[#F5F3ED] mb-4 leading-tight">
              Wedding Films
            </h1>
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-[#b8a862] max-w-[600px] mx-auto">
              Capturing your special moments
            </p>
          </div>
        </section>

        {/* Films Grid with Filter */}
        <section className="relative bg-[#24221D] pt-6 pb-12 px-6 z-10">
          <FilmsListWithFilter films={allFilms} />
        </section>
      </div>

      <ImageCarousel />
      <Footer />
    </main>
  )
}

