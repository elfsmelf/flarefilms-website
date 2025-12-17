import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedWork } from "@/components/featured-work"
import { Testimonial } from "@/components/testimonial"
import { TimelessWeddings } from "@/components/timeless-weddings"
import { db } from "@/lib/db"
import { films, venues } from "@/lib/db/schema"
import { eq, and, ilike, or } from "drizzle-orm"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toowoomba Wedding Videographer | Flare Films",
  description: "Award-winning Toowoomba wedding videographer capturing story-driven, candid wedding films. Serving Toowoomba, the Darling Downs and surrounds. View our portfolio.",
  openGraph: {
    title: "Toowoomba Wedding Videographer | Flare Films",
    description: "Award-winning Toowoomba wedding videographer capturing story-driven, candid wedding films.",
    url: "https://flarefilms.com.au/toowoomba-wedding-videographer",
    images: ['https://assets.guestsnapper.com/wedding-gallery-media/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Toowoomba Wedding Videographer | Flare Films",
    description: "Award-winning Toowoomba wedding videographer capturing story-driven, candid wedding films.",
    images: ['https://assets.guestsnapper.com/wedding-gallery-media/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default async function ToowoombaWeddingVideographerPage() {
  // Fetch films from Toowoomba location
  const locationFilms = await db.query.films.findMany({
    where: and(
      eq(films.published, true),
      ilike(films.location, '%Toowoomba%')
    ),
    orderBy: (films, { desc }) => [desc(films.rating)],
    limit: 4,
  })

  // Fallback to all films if no location-specific films found
  const featuredFilms = locationFilms.length > 0
    ? locationFilms
    : await db.query.films.findMany({
        where: eq(films.published, true),
        orderBy: (films, { desc }) => [desc(films.rating)],
        limit: 4,
      })

  // Fetch venues in Toowoomba area
  const locationVenues = await db.query.venues.findMany({
    where: and(
      eq(venues.published, true),
      or(
        ilike(venues.city, '%Toowoomba%'),
        ilike(venues.venueLocation, '%Toowoomba%')
      )
    ),
    orderBy: (venues, { desc }) => [desc(venues.featured)],
    limit: 6,
  })

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[90vh]">
        <Image
          src="https://assets.guestsnapper.com/wedding-gallery-media/jess%20and%20braydon%20featured%20image2.webp"
          alt="Toowoomba wedding videography - garden city wedding"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <p className="text-[28px] md:text-[34px] font-cormorant mb-4 tracking-wide font-light" style={{ textShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px" }}>
            <span className="font-light">Story-driven </span>
            <em className="italic font-serif">and</em>
            <span className="font-light"> candid</span>
          </p>
          <h1 className="text-[40px] md:text-[50px] lg:text-[65px] font-cormorant tracking-[0.05em] uppercase mb-4 font-medium leading-[1.1]" style={{ textShadow: "rgba(0, 0, 0, 0.46) 0px 0px 10px" }}>
            Toowoomba Wedding Videographer
          </h1>
          <p className="text-[24px] md:text-[34px] font-cormorant tracking-wide font-light" style={{ textShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px" }}>
            <em className="italic font-serif">Relive</em>
            <span> the most special day of your life.</span>
          </p>
        </div>
      </section>

      {/* Wedding Films Intro */}
      <section className="bg-[#E7E4DF] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-[#b8a862] mb-6">
            ELEGANT AND INTENTIONAL…
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-[#3d3a35] mb-8 uppercase tracking-wide">
            Toowoomba Wedding Films
          </h2>
          <p className="font-serif text-xl md:text-2xl text-[#5a534b] leading-relaxed italic mb-8">
            That is a treasure you simply cannot do without.
          </p>
          <p className="font-sans text-lg text-[#7b756c] leading-relaxed mb-8">
            Your day is about a future you can't wait to begin, the people you love most, and the moments you don't want to forget:
          </p>
          <ul className="font-serif text-lg text-[#5a534b] leading-relaxed space-y-3 text-left max-w-xl mx-auto mb-12">
            <li className="flex items-start gap-3">
              <span className="text-[#b8a862]">•</span>
              <span>Your grandma's voice as she prays over you.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#b8a862]">•</span>
              <span>Your mom helping you into your dress.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#b8a862]">•</span>
              <span>The pure joy on your newly-married faces.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#b8a862]">•</span>
              <span>Or perhaps your best friend busting a move on the dance floor…</span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="inline-block border border-[#5a534b] px-8 py-4 text-sm font-sans uppercase tracking-[0.15em] text-[#5a534b] hover:bg-[#5a534b] hover:text-white transition-colors duration-300">
              Meet your Videographer
            </Link>
            <Link href="/films" className="inline-block border border-[#5a534b] px-8 py-4 text-sm font-sans uppercase tracking-[0.15em] text-[#5a534b] hover:bg-[#5a534b] hover:text-white transition-colors duration-300">
              Browse Our Wedding Films
            </Link>
            <Link href="/#packages" className="inline-block border border-[#5a534b] px-8 py-4 text-sm font-sans uppercase tracking-[0.15em] text-[#5a534b] hover:bg-[#5a534b] hover:text-white transition-colors duration-300">
              View Our Packages
            </Link>
          </div>
        </div>
      </section>

      {/* About Richard Section */}
      <section className="w-full bg-[#24221d] text-[#fffdf4] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col justify-center z-10">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#b8a862] mb-4">
                HI. I'M RICHARD!
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight font-light uppercase tracking-wide" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                Toowoomba Wedding Videographer
              </h2>

              <div className="space-y-6 text-base md:text-lg font-sans leading-relaxed opacity-90">
                <p>
                  Your wedding day will fly by! And if you don't have a filmmaker who knows what they're doing, you just might miss it. I want to be there to capture those precious moments for you.
                </p>
                <p>
                  I'm honoured to use my creative talent, passion for storytelling, and 10 years of experience to create that same magic for you.
                </p>
                <p>
                  Toowoomba, the Garden City, is one of Queensland's most beautiful wedding destinations. The stunning gardens, heritage buildings, and rolling countryside provide the perfect backdrop for romantic wedding films.
                </p>
              </div>

              <div className="mt-10">
                <Link href="/about" className="inline-block bg-[#e7e4df] text-[#24221d] px-12 py-4 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-white transition-colors duration-300 ease-out">
                  Learn more about my approach
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/richard.webp"
                  alt="Richard Paynter - Toowoomba Wedding Videographer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedWork films={featuredFilms} />
      <Testimonial />

      {/* Filming in Toowoomba Section */}
      <section className="bg-[#E7E4DF] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#3d3a35] mb-6">
                Filming Wedding Videos In Toowoomba
              </h2>
              <div className="font-sans text-lg text-[#5a534b] leading-relaxed space-y-4">
                <p>
                  Known as the Garden City, Toowoomba is famous for its stunning parks, beautiful heritage architecture, and the spectacular Carnival of Flowers. The region offers a unique blend of country charm and sophistication.
                </p>
                <p>
                  I love filming weddings in Toowoomba—the beautiful gardens, historic venues, and rolling farmland of the Darling Downs provide endless opportunities for stunning footage. The mild climate and beautiful light make it perfect for outdoor ceremonies.
                </p>
              </div>
            </div>
            <div className="relative aspect-video">
              <Image src="https://assets.guestsnapper.com/wedding-gallery-media/Jess-and-Braydan-21-scaled.jpg" alt="Toowoomba Wedding Venue" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Toowoomba Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#3d3a35] mb-6 text-center">
            Why is Toowoomba Great For A Wedding Video?
          </h2>
          <div className="font-sans text-lg text-[#5a534b] leading-relaxed space-y-4">
            <p>
              Toowoomba offers a unique wedding experience with its stunning gardens, heritage buildings, and beautiful countryside. The elevated location provides spectacular views over the Darling Downs, and the mild climate means beautiful conditions year-round.
            </p>
            <p>
              As a wedding videographer, I love the romantic atmosphere of Toowoomba. The beautiful gardens, historic churches, and rural properties provide stunning backdrops. Drone footage captures the rolling hills and patchwork farmland that makes this region so special.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Venues Section */}
      <section className="bg-[#4a5347] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#d4c9a0] mb-4">
              Toowoomba Wedding Venue Ideas
            </p>
            <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Popular Wedding Venues In Toowoomba
            </h2>
            <p className="font-sans text-lg text-[#e8e3d8] leading-relaxed max-w-3xl mx-auto">
              From historic homesteads to beautiful gardens, Toowoomba and the Darling Downs offer stunning wedding venues.
            </p>
          </div>

          {locationVenues.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locationVenues.map((venue) => (
                <Link
                  key={venue.id}
                  href={`/venues/${venue.slug}`}
                  className="bg-white/10 backdrop-blur-sm p-6 hover:bg-white/20 transition-colors duration-300"
                >
                  {venue.listingImage && (
                    <div className="relative aspect-video mb-4 overflow-hidden">
                      <Image
                        src={venue.listingImage}
                        alt={venue.venueTitle || 'Wedding venue'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">{venue.venueTitle}</h3>
                  {venue.shortDescription && (
                    <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4 line-clamp-3">
                      {venue.shortDescription}
                    </p>
                  )}
                  {venue.city && (
                    <p className="font-sans text-sm text-[#d4c9a0]">
                      <strong>Location:</strong> {venue.city}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6">
                <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">Gabbinbar Homestead</h3>
                <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                  A stunning National Trust heritage property featuring beautiful gardens and timeless elegance.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6">
                <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">Preston Peak Wines</h3>
                <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                  A beautiful winery venue offering spectacular views over the Lockyer Valley.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6">
                <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">Queens Park</h3>
                <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                  One of Toowoomba's most beautiful parks with stunning gardens.
                </p>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/venues" className="inline-block border border-[#d4c9a0] px-10 py-4 text-sm font-sans uppercase tracking-wide text-[#d4c9a0] hover:bg-[#d4c9a0] hover:text-[#4a5347] transition-colors duration-300">
              Browse All Wedding Venues
            </Link>
          </div>
        </div>
      </section>

      {/* As Seen In Section */}
      <section className="py-20 px-6 bg-[#E7E4DF]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-12">
            <span className="font-sans text-sm tracking-[0.15em] uppercase text-[#585858] mr-5">AS SEEN IN</span>
            <Image src="https://assets.guestsnapper.com/wedding-gallery-media/easy-weddings-logo-3.png" alt="Easy Weddings" width={160} height={45} className="h-12 w-auto object-contain" />
            <Image src="https://assets.guestsnapper.com/wedding-gallery-media/brides-logo-2.png" alt="Brides" width={140} height={55} className="h-12 w-auto object-contain" />
            <Image src="https://assets.guestsnapper.com/wedding-gallery-media/modern-wedding-logo-1.png" alt="Modern Wedding" width={160} height={60} className="h-12 w-auto object-contain" />
            <Image src="https://assets.guestsnapper.com/wedding-gallery-media/thebridestree_logo-2.png" alt="The Bride's Tree" width={180} height={38} className="h-10 w-auto object-contain" />
          </div>
        </div>
      </section>

      <TimelessWeddings />
      <Footer />
    </main>
  )
}
