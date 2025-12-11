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
  title: "Gold Coast Wedding Videographer | Flare Films",
  description: "Award-winning Gold Coast wedding videographer capturing story-driven, candid wedding films. Serving the Gold Coast, hinterland and surrounds. View our portfolio.",
  openGraph: {
    title: "Gold Coast Wedding Videographer | Flare Films",
    description: "Award-winning Gold Coast wedding videographer capturing story-driven, candid wedding films.",
    url: "https://flarefilms.com.au/gold-coast-wedding-videographer",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gold Coast Wedding Videographer | Flare Films",
    description: "Award-winning Gold Coast wedding videographer capturing story-driven, candid wedding films.",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default async function GoldCoastWeddingVideographerPage() {
  // Fetch films from Gold Coast location
  const locationFilms = await db.query.films.findMany({
    where: and(
      eq(films.published, true),
      ilike(films.location, '%Gold Coast%')
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

  // Fetch venues in Gold Coast area
  const locationVenues = await db.query.venues.findMany({
    where: and(
      eq(venues.published, true),
      or(
        ilike(venues.city, '%Gold Coast%'),
        ilike(venues.venueLocation, '%Gold Coast%')
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
          alt="Gold Coast wedding videography - couple at sunset"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <p
            className="text-[28px] md:text-[34px] font-cormorant mb-4 tracking-wide font-light"
            style={{ textShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px" }}
          >
            <span className="font-light">Story-driven </span>
            <em className="italic font-serif">and</em>
            <span className="font-light"> candid</span>
          </p>
          <h1
            className="text-[40px] md:text-[50px] lg:text-[65px] font-cormorant tracking-[0.05em] uppercase mb-4 font-medium leading-[1.1]"
            style={{ textShadow: "rgba(0, 0, 0, 0.46) 0px 0px 10px" }}
          >
            Gold Coast Wedding Videographer
          </h1>
          <p
            className="text-[24px] md:text-[34px] font-cormorant tracking-wide font-light"
            style={{ textShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px" }}
          >
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
            Gold Coast Wedding Films
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
            <Link
              href="/about"
              className="inline-block border border-[#5a534b] px-8 py-4 text-sm font-sans uppercase tracking-[0.15em] text-[#5a534b] hover:bg-[#5a534b] hover:text-white transition-colors duration-300"
            >
              Meet your Videographer
            </Link>
            <Link
              href="/films"
              className="inline-block border border-[#5a534b] px-8 py-4 text-sm font-sans uppercase tracking-[0.15em] text-[#5a534b] hover:bg-[#5a534b] hover:text-white transition-colors duration-300"
            >
              Browse Our Wedding Films
            </Link>
            <Link
              href="/#packages"
              className="inline-block border border-[#5a534b] px-8 py-4 text-sm font-sans uppercase tracking-[0.15em] text-[#5a534b] hover:bg-[#5a534b] hover:text-white transition-colors duration-300"
            >
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
              <h2
                className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight font-light uppercase tracking-wide"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Gold Coast Wedding Videographer
              </h2>

              <div className="space-y-6 text-base md:text-lg font-sans leading-relaxed opacity-90">
                <p>
                  Your wedding day will fly by! And if you don't have a filmmaker who knows what they're doing, you just might miss it. I want to be there to capture those precious moments for you.
                </p>
                <p>
                  I'm honoured to use my creative talent, passion for storytelling, and 10 years of experience to create that same magic for you.
                </p>
                <p>
                  The Gold Coast offers incredible diversity—from pristine beaches to lush hinterland rainforests. Whether you're saying "I do" at a beachfront venue or a mountain retreat, I'll capture every magical moment.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/about"
                  className="inline-block bg-[#e7e4df] text-[#24221d] px-12 py-4 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-white transition-colors duration-300 ease-out"
                >
                  Learn more about my approach
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/richard-photo-5.webp"
                  alt="Richard Paynter - Gold Coast Wedding Videographer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <FeaturedWork films={featuredFilms} />

      {/* Testimonials */}
      <Testimonial />

      {/* Filming on the Gold Coast Section */}
      <section className="bg-[#E7E4DF] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#3d3a35] mb-6">
                Filming Wedding Videos On The Gold Coast
              </h2>
              <div className="font-sans text-lg text-[#5a534b] leading-relaxed space-y-4">
                <p>
                  The Gold Coast is one of Australia's most popular wedding destinations, and for good reason. With over 300 days of sunshine a year, stunning beaches, and world-class venues, it's the perfect backdrop for your love story.
                </p>
                <p>
                  From the iconic Surfers Paradise skyline to the tranquil Tamborine Mountain rainforest, I love capturing the unique beauty of Gold Coast weddings. Every location offers something special for your wedding film.
                </p>
              </div>
            </div>
            <div className="relative aspect-video">
              <Image
                src="/images/2024/03/Jess-and-Braydan-21-scaled.jpg"
                alt="Gold Coast Wedding Venue"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Gold Coast Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#3d3a35] mb-6 text-center">
            Why is the Gold Coast A Great Location For A Wedding Video?
          </h2>
          <div className="font-sans text-lg text-[#5a534b] leading-relaxed space-y-4">
            <p>
              The Gold Coast is blessed with incredible natural beauty and world-class wedding venues. From beachfront ceremonies to hinterland hideaways, there's a perfect location for every couple.
            </p>
            <p>
              As a wedding videographer, I absolutely love filming on the Gold Coast. The golden light, stunning coastline, and lush green hinterland provide endless opportunities for breathtaking footage—especially with drone cinematography capturing those sweeping coastal views.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Venues Section */}
      <section className="bg-[#4a5347] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#d4c9a0] mb-4">
              Gold Coast Wedding Venue Ideas
            </p>
            <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Popular Wedding Venues On The Gold Coast
            </h2>
            <p className="font-sans text-lg text-[#e8e3d8] leading-relaxed max-w-3xl mx-auto">
              The Gold Coast offers an incredible variety of wedding venues—from beachfront locations to rainforest retreats. Here are some of our favourites.
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
                <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">The Valley Estate</h3>
                <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                  Nestled in the Gold Coast Hinterland, The Valley Estate offers breathtaking mountain views and elegant rustic charm.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6">
                <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">Currumbin Beach</h3>
                <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                  One of the Gold Coast's most picturesque beaches with golden sands and iconic Elephant Rock.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6">
                <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">O'Reilly's Rainforest Retreat</h3>
                <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                  A magical rainforest setting with misty mountain views in Lamington National Park.
                </p>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/venues"
              className="inline-block border border-[#d4c9a0] px-10 py-4 text-sm font-sans uppercase tracking-wide text-[#d4c9a0] hover:bg-[#d4c9a0] hover:text-[#4a5347] transition-colors duration-300"
            >
              Browse All Wedding Venues
            </Link>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#3d3a35] mb-12 text-center">
            Tips For Hiring A Wedding Videographer On The Gold Coast
          </h2>

          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#b8a862] flex items-center justify-center text-white font-cormorant text-2xl">
                1
              </div>
              <div>
                <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">Book Early—Especially for Peak Season</h3>
                <p className="font-sans text-[#5a534b] leading-relaxed">
                  The Gold Coast is one of Australia's most popular wedding destinations. The best videographers book out 12-18 months in advance, especially for spring and autumn weddings.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#b8a862] flex items-center justify-center text-white font-cormorant text-2xl">
                2
              </div>
              <div>
                <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">Consider Your Venue's Unique Features</h3>
                <p className="font-sans text-[#5a534b] leading-relaxed">
                  Whether you're getting married on the beach or in the hinterland, make sure your videographer knows how to capture those unique features—drone footage can be particularly stunning for coastal and mountain venues.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#b8a862] flex items-center justify-center text-white font-cormorant text-2xl">
                3
              </div>
              <div>
                <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">Watch Their Previous Gold Coast Work</h3>
                <p className="font-sans text-[#5a534b] leading-relaxed">
                  A videographer familiar with Gold Coast venues will know the best spots for footage and how to work with the coastal light. Ask to see examples from venues similar to yours.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/wedding-videographer-cost"
              className="inline-block border border-[#5a534b] px-10 py-4 text-sm font-sans uppercase tracking-wide text-[#5a534b] hover:bg-[#5a534b] hover:text-white transition-colors duration-300"
            >
              Wedding Video Price Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* As Seen In Section */}
      <section className="py-20 px-6 bg-[#E7E4DF]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-12">
            <span className="font-sans text-sm tracking-[0.15em] uppercase text-[#585858] mr-5">AS SEEN IN</span>
            <Image src="/images/2020/10/easy-weddings-logo-3.png" alt="Easy Weddings" width={160} height={45} className="h-12 w-auto object-contain" />
            <Image src="/images/2020/10/brides-logo-2.png" alt="Brides" width={140} height={55} className="h-12 w-auto object-contain" />
            <Image src="/images/2020/10/modern-wedding-logo-1.png" alt="Modern Wedding" width={160} height={60} className="h-12 w-auto object-contain" />
            <Image src="https://www.flarefilms.com.au/wp-content/uploads/2020/10/thebridestree_logo-1024x215.png" alt="The Bride's Tree" width={180} height={38} className="h-10 w-auto object-contain" />
          </div>
        </div>
      </section>

      <TimelessWeddings />
      <Footer />
    </main>
  )
}
