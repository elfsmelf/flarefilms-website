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
  title: "Byron Bay Wedding Videographer | Flare Films",
  description: "Award-winning Byron Bay wedding videographer capturing story-driven, candid wedding films. Serving Byron Bay, Northern NSW and surrounds. View our portfolio.",
  openGraph: {
    title: "Byron Bay Wedding Videographer | Flare Films",
    description: "Award-winning Byron Bay wedding videographer capturing story-driven, candid wedding films.",
    url: "https://flarefilms.com.au/byron-bay-wedding-videographer",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Byron Bay Wedding Videographer | Flare Films",
    description: "Award-winning Byron Bay wedding videographer capturing story-driven, candid wedding films.",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default async function ByronBayWeddingVideographerPage() {
  // Fetch films from Byron Bay location
  const locationFilms = await db.query.films.findMany({
    where: and(
      eq(films.published, true),
      or(
        ilike(films.location, '%Byron%'),
        ilike(films.location, '%Northern NSW%')
      )
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

  // Fetch venues in Byron Bay area
  const locationVenues = await db.query.venues.findMany({
    where: and(
      eq(venues.published, true),
      or(
        ilike(venues.city, '%Byron%'),
        ilike(venues.venueLocation, '%Byron%')
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
          alt="Byron Bay wedding videography - couple on the beach"
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
            Byron Bay Wedding Videographer
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
            Byron Bay Wedding Films
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
                Byron Bay Wedding Videographer
              </h2>

              <div className="space-y-6 text-base md:text-lg font-sans leading-relaxed opacity-90">
                <p>
                  Your wedding day will fly by! And if you don't have a filmmaker who knows what they're doing, you just might miss it. I want to be there to capture those precious moments for you.
                </p>
                <p>
                  I'm honoured to use my creative talent, passion for storytelling, and 10 years of experience to create that same magic for you.
                </p>
                <p>
                  Byron Bay is one of my favourite places to shoot weddings—the stunning beaches, lush hinterland, and golden light create the perfect backdrop for your love story.
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
                  alt="Richard Paynter - Byron Bay Wedding Videographer"
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

      {/* Filming in Byron Bay Section */}
      <section className="bg-[#E7E4DF] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#3d3a35] mb-6">
                Filming Wedding Videos In Byron Bay
              </h2>
              <div className="font-sans text-lg text-[#5a534b] leading-relaxed space-y-4">
                <p>
                  I have been fortunate enough to be able to work on a lot of amazing weddings in Australia. Byron Bay is one of my favourite places to shoot weddings, and the couples who book with me are always happy.
                </p>
                <p>
                  I love capturing the spirit of a wedding, but I also love capturing the surroundings. Whether it's on a sun-drenched beach or in a small backyard, I capture the spirit of the wedding while also celebrating the surroundings.
                </p>
              </div>
            </div>
            <div className="relative aspect-video">
              <Image
                src="/images/2024/03/Jess-and-Braydan-21-scaled.jpg"
                alt="Byron Bay Wedding Venue"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Byron Bay Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#3d3a35] mb-6 text-center">
            Why is Byron Bay A Great Location For A Wedding Video?
          </h2>
          <div className="font-sans text-lg text-[#5a534b] leading-relaxed space-y-4">
            <p>
              If you're lucky enough to live on the Byron Bay, you would understand what an incredible paradise it is – most of all for the couples lucky enough to get married in Byron Bay!
            </p>
            <p>
              As a wedding videographer, I am so lucky to be able to harness the golden sunshine year-round to create stunning films for couples in Byron Bay. Of course, I can take footage on the ground but many wedding venues in Byron Bay are perfect for captivating, 360 views from the sky using my drone!
            </p>
          </div>
        </div>
      </section>

      {/* Beach Wedding Venues Section */}
      <section className="bg-[#4a5347] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#d4c9a0] mb-4">
              Byron Bay Beach Wedding Venue Ideas
            </p>
            <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Beach Wedding Venue Ideas In Byron Bay
            </h2>
            <p className="font-sans text-lg text-[#e8e3d8] leading-relaxed max-w-3xl mx-auto">
              If you've made up your mind to have your wedding and reception in Byron Bay, there are many incredible places you can choose from that will allow for spectacular views and amazing footage from your wedding videographer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Venue Card: Cape Byron Lighthouse */}
            <div className="bg-white/10 backdrop-blur-sm p-6">
              <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">Cape Byron Lighthouse</h3>
              <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                She's the grand old lady of Byron Bay, iconic and statuesque. She'll stand as a proud majestic witness as you exchange your vows and provide unbeatable ocean and hinterland views.
              </p>
              <p className="font-sans text-sm text-[#d4c9a0]">
                <strong>Best suits:</strong> Anyone looking for jaw-dropping views, fabulous photo ops, architecture and history.
              </p>
            </div>

            {/* Venue Card: Clarkes Beach */}
            <div className="bg-white/10 backdrop-blur-sm p-6">
              <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">Clarkes Beach</h3>
              <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                Located directly in front of The Beach Byron Bay, with sweeping views of the bay, Byron lighthouse, Mount Warning and Julian Rocks—this uncrowded beach is a spectacular setting for your beach wedding.
              </p>
              <p className="font-sans text-sm text-[#d4c9a0]">
                <strong>Best suits:</strong> Anyone looking for a relaxed beach wedding location with a conveniently located beachfront reception venue.
              </p>
            </div>

            {/* Venue Card: Wategos Beach */}
            <div className="bg-white/10 backdrop-blur-sm p-6">
              <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">Wategos Beach</h3>
              <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                For a stunning wedding ceremony by the sea, it's hard to go past the breathtaking Wategos Beach. With its white sand, pandanus palms and stunning Pacific Ocean views—it truly is paradise.
              </p>
              <p className="font-sans text-sm text-[#d4c9a0]">
                <strong>Best suits:</strong> Ultimate beach wedding! Need we say more…
              </p>
            </div>

            {/* Venue Card: The Pass */}
            <div className="bg-white/10 backdrop-blur-sm p-6">
              <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">The Pass</h3>
              <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                This pristine beach is located below the Byron Bay lighthouse and is one of the prettiest beaches in Byron Bay with its gentle rolling waves and natural surroundings.
              </p>
              <p className="font-sans text-sm text-[#d4c9a0]">
                <strong>Best suits:</strong> Nature lovers who want to pair coastal rainforest with the sea.
              </p>
            </div>

            {/* Venue Card: Broken Head */}
            <div className="bg-white/10 backdrop-blur-sm p-6">
              <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">Broken Head</h3>
              <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                The only private house in the Byron Shire approved for wedding receptions. Barefoot at Broken Head hosts the most sophisticated beach weddings in Australia.
              </p>
              <p className="font-sans text-sm text-[#d4c9a0]">
                <strong>Best suits:</strong> Couples looking for the ultimate beach wedding venue, infrastructure and luxury accommodation all in one.
              </p>
            </div>

            {/* Venue Card: Apex Park */}
            <div className="bg-white/10 backdrop-blur-sm p-6">
              <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">Apex Park</h3>
              <p className="font-sans text-[#e8e3d8] leading-relaxed mb-4">
                Alongside The Beach Byron Bay you will find Apex Park with its manicured lawns and views across the ocean. With the sun sparkling through the trees, Apex Park can provide an idyllic scene for your special day.
              </p>
              <p className="font-sans text-sm text-[#d4c9a0]">
                <strong>Best suits:</strong> Anyone wanting great accessibility from town and to the beach for the wedding reception.
              </p>
            </div>
          </div>

          {locationVenues.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/venues"
                className="inline-block border border-[#d4c9a0] px-10 py-4 text-sm font-sans uppercase tracking-wide text-[#d4c9a0] hover:bg-[#d4c9a0] hover:text-[#4a5347] transition-colors duration-300"
              >
                Browse All Wedding Venues
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#3d3a35] mb-12 text-center">
            5 Quick Tips For Hiring The Perfect Videographer in Byron Bay
          </h2>

          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#b8a862] flex items-center justify-center text-white font-cormorant text-2xl">
                1
              </div>
              <div>
                <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">Lock In Your Wedding Date and Venue First</h3>
                <p className="font-sans text-[#5a534b] leading-relaxed">
                  The first question any videographer will ask is when and where you are getting married. The top wedding videographers in Byron Bay can easily book out one or two years in advance, particularly during peak times like spring or autumn.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#b8a862] flex items-center justify-center text-white font-cormorant text-2xl">
                2
              </div>
              <div>
                <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">Hire a Videographer With a Video Style That You 'Vibe' With</h3>
                <p className="font-sans text-[#5a534b] leading-relaxed">
                  Watch as many wedding videos as you can! Start on YouTube and find videos you really enjoy. Ask yourself why you liked it so much… Was it romantic? Did it give you a warm fuzzy feeling? Did you like the incredible cinematic shots?
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#b8a862] flex items-center justify-center text-white font-cormorant text-2xl">
                3
              </div>
              <div>
                <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">Research Wedding Videographers in Byron Bay</h3>
                <p className="font-sans text-[#5a534b] leading-relaxed">
                  A little research will quickly show you that you're not comparing apples with apples – each videographer will have their own style, their own vibe and it's up to you to find the one that best resonates with you.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#b8a862] flex items-center justify-center text-white font-cormorant text-2xl">
                4
              </div>
              <div>
                <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">Calculate Your Wedding Video Budget</h3>
                <p className="font-sans text-[#5a534b] leading-relaxed">
                  The most helpful advice I can give you is to go with your gut and follow your heart when it comes to choosing a wedding videographer. As the old adage goes… you get what you pay for!
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#b8a862] flex items-center justify-center text-white font-cormorant text-2xl">
                5
              </div>
              <div>
                <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">Send Detailed Enquiries</h3>
                <p className="font-sans text-[#5a534b] leading-relaxed">
                  When sending an enquiry, include as much information as you can about you and your wedding! The more information you give upfront, the easier the process will be for both of you.
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

            <Image
              src="/images/2020/10/easy-weddings-logo-3.png"
              alt="Easy Weddings"
              width={160}
              height={45}
              className="h-12 w-auto object-contain"
            />
            <Image
              src="/images/2020/10/brides-logo-2.png"
              alt="Brides"
              width={140}
              height={55}
              className="h-12 w-auto object-contain"
            />
            <Image
              src="/images/2020/10/modern-wedding-logo-1.png"
              alt="Modern Wedding"
              width={160}
              height={60}
              className="h-12 w-auto object-contain"
            />
            <Image
              src="https://www.flarefilms.com.au/wp-content/uploads/2020/10/thebridestree_logo-1024x215.png"
              alt="The Bride's Tree"
              width={180}
              height={38}
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <TimelessWeddings />

      <Footer />
    </main>
  )
}
