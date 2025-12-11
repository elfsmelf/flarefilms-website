import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { CostCalculator } from "./cost-calculator"
import { TableOfContents } from "./table-of-contents"

export const metadata: Metadata = {
  title: "How Much Does A Wedding Videographer Cost? | 2024 Price Guide",
  description: "Discover the average cost of a wedding videographer in Australia ($2,695). Complete pricing guide with state-by-state breakdown, factors affecting cost, and money-saving tips.",
  openGraph: {
    title: "How Much Does A Wedding Videographer Cost? | 2024 Price Guide",
    description: "Discover the average cost of a wedding videographer in Australia ($2,695). Complete pricing guide with state-by-state breakdown and calculator.",
    url: "https://flarefilms.com.au/wedding-videographer-cost",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much Does A Wedding Videographer Cost? | 2024 Price Guide",
    description: "Discover the average cost of a wedding videographer in Australia. Complete pricing guide with calculator.",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
}

const tocItems = [
  { id: "calculator", label: "Wedding Video Calculator" },
  { id: "is-it-necessary", label: "Is a wedding video necessary?" },
  { id: "percentage-stats", label: "% of Brides that Hire Videographers" },
  { id: "benefits", label: "Benefits of hiring a videographer" },
  { id: "actual-cost", label: "How much do wedding videos cost?" },
  { id: "state-costs", label: "Average cost by state" },
  { id: "hours", label: "How many hours to hire for?" },
  { id: "factors", label: "Factors impacting cost" },
  { id: "extras", label: "Extra add-ons" },
  { id: "why-expensive", label: "Why are wedding videos expensive?" },
  { id: "save-money", label: "How to save money" },
  { id: "what-to-look-for", label: "What to look for" },
]

export default function WeddingVideographerCostPage() {
  return (
    <main className="min-h-screen bg-[#24221d]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 bg-[#24221d]">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/2021/01/forest-v2.jpg"
            alt="Wedding videography"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#24221d] via-[#24221d]/90 to-[#24221d]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-[#b8a862] mb-6">
            Wedding Videography
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant text-white mb-8 leading-tight">
            How Much Does A Wedding Videographer Cost?
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#C7C5BF] leading-relaxed max-w-3xl mx-auto">
            You're probably thinking about getting a wedding videographer to film your special day and wondering… "How much does a wedding videographer cost?"
          </p>
        </div>
      </section>

      {/* Quick Answer Section */}
      <section className="bg-[#E7E4DF] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-8 md:p-12 shadow-lg border-l-4 border-[#b8a862]">
            <p className="font-serif text-lg text-[#5a534b] leading-relaxed mb-6">
              You're not alone – over <strong>51% of brides</strong> choose to get a wedding videographer to film their wedding in Australia.
            </p>
            <p className="font-serif text-lg text-[#5a534b] leading-relaxed mb-6">
              Having someone capture those unforgettable moments of you walking down the aisle, reading your vows and the wedding speeches can't always be captured perfectly with just photos. Video captures the emotion and love you and your fiancée feel for one another.
            </p>
            <div className="bg-[#f8f7f5] p-6 md:p-8 mt-8">
              <h2 className="font-cormorant text-2xl md:text-3xl text-[#3d3a35] mb-4">The Quick Answer:</h2>
              <p className="font-serif text-lg text-[#5a534b] leading-relaxed">
                The average cost of a wedding videographer in Australia is around <strong className="text-[#b8a862] text-2xl">$2,695</strong>. The price depends on coverage time: <strong>6 hours</strong> of coverage would be around <strong>$2,500</strong> – whilst full day <strong>(12 hour)</strong> coverage would be <strong>$3,500+</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Richard + Calculator CTA */}
      <section className="bg-[#4a5347] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-cormorant text-3xl md:text-4xl text-[#d4c9a0] mb-4">
                About Richard: Wedding Videographer Brisbane
              </h2>
              <p className="font-serif text-lg text-[#e8e3d8] leading-relaxed mb-6">
                Don't have time to read the full cost-guide? No worries! I have created a wedding video cost calculator so you can see exactly how much you can expect to pay based on your location and what inclusions you are after.
              </p>
              <p className="font-serif text-base text-[#C7C5BF] leading-relaxed mb-8">
                The prices this calculator spits out are based on research of the prices of over <strong className="text-[#d4c9a0]">120+ wedding videographers</strong> in Australia.
              </p>
              <a
                href="#calculator"
                className="inline-block border border-[#d4c9a0] px-10 py-4 text-sm font-sans uppercase tracking-wide text-[#d4c9a0] hover:bg-[#d4c9a0] hover:text-[#4a5347] transition-colors duration-300"
              >
                Calculate My Wedding Video Price
              </a>
            </div>
            <div className="relative aspect-video">
              <Image
                src="/images/2024/03/Jess-and-Braydan-21-scaled.jpg"
                alt="Brisbane Wedding Videographer"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with TOC */}
      <section className="bg-[#E7E4DF] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            {/* Sticky Table of Contents */}
            <aside className="hidden lg:block">
              <TableOfContents items={tocItems} />
            </aside>

            {/* Main Content */}
            <div className="space-y-16">
              {/* Calculator Section */}
              <section id="calculator" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    Wedding Video Calculator
                  </h2>
                  <p className="font-serif text-lg text-[#5a534b] mb-8">
                    Use our calculator to estimate the cost of your wedding video based on your location and requirements.
                  </p>
                  <CostCalculator />
                </div>
              </section>

              {/* Is a wedding video necessary? */}
              <section id="is-it-necessary" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    Is a wedding video necessary?
                  </h2>
                  <div className="font-serif text-lg text-[#5a534b] leading-relaxed space-y-4">
                    <p>
                      First things first, before you spend $1000's on a wedding video… should you even hire a videographer?
                    </p>
                    <p>
                      Research shows that <strong>not having a videographer for your big day is the biggest regret</strong> for a lot of couples when it comes to looking back on their wedding.
                    </p>
                    <p>
                      After all, this is the one day you want to be able to remember for the rest of your lives. Whether you're getting a teaser reel, highlights footage, or the whole shebang, having a professional capture those moments is so important.
                    </p>
                    <p>
                      But don't just take it from us! <strong>51% of real couples</strong> will hire a videographer for their big day, with 7% opting to go the DIY route and avoid paying for a professional wedding video.
                    </p>
                  </div>
                </div>
              </section>

              {/* Percentage Stats */}
              <section id="percentage-stats" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    The Percentage (%) of Brides that Hire Wedding Videographers
                  </h2>
                  <div className="relative aspect-[16/9] mb-6">
                    <Image
                      src="https://assets.guestsnapper.com/is-a-wedding-videographer-worth-it-graphic-statistics.jpg"
                      alt="Statistics showing percentage of brides that hire wedding videographers"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="font-serif text-sm text-[#7b756c] text-center italic">
                    The Percentage of Brides that Hire Wedding Videographers
                  </p>
                </div>
              </section>

              {/* Benefits Section */}
              <section id="benefits" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    What are the benefits of hiring a wedding videographer?
                  </h2>
                  <div className="font-serif text-lg text-[#5a534b] leading-relaxed space-y-4 mb-8">
                    <p>
                      You've probably heard that a videographer is one of the most important things to hire for your wedding. But why?
                    </p>
                    <p>
                      A video can be an amazing way to capture memories and moments you might have missed on camera. It also allows you to relive those special moments over and over again, which is something photos just can't do.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="border-l-4 border-[#b8a862] pl-6">
                      <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">
                        Captures the moments you can't remember
                      </h3>
                      <p className="font-serif text-[#5a534b] leading-relaxed">
                        Your wedding day is a blur of excitement, love and happiness. But what about all those special moments that happen when you're not looking? What about the speeches, the first dance, or your dad's toast? You might be able to recall some of these memories if they were captured on video but chances are you'll never know for sure.
                      </p>
                    </div>

                    <div className="border-l-4 border-[#b8a862] pl-6">
                      <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">
                        Gives your guests a chance to watch it again and share it with friends
                      </h3>
                      <p className="font-serif text-[#5a534b] leading-relaxed">
                        Wedding videos are an excellent way for your family and friends to relive the magic of your special day. Your guests can watch them over and over again; you won't believe how many times even your own wedding video has been viewed! We produce a specially tailored social media video 48 hours after your wedding so your friends and family can re-watch the wedding straight away!
                      </p>
                    </div>

                    <div className="border-l-4 border-[#b8a862] pl-6">
                      <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">
                        Makes for an amazing gift for parents, grandparents, or other loved ones
                      </h3>
                      <p className="font-serif text-[#5a534b] leading-relaxed">
                        A wedding video is the best way to capture your celebrations on the biggest day of your life. This is a chance for family and friends who were unable to attend to see you exchange vows, party with everyone else, dance, eat cake—it's all there! It may seem like a lot of work at first; however, it isn't as difficult or expensive as one might think.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Actual Cost Section */}
              <section id="actual-cost" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    How much do wedding videos actually cost?
                  </h2>
                  <div className="font-serif text-lg text-[#5a534b] leading-relaxed space-y-4">
                    <p>
                      When it comes to the cost of your video you also want to look at how long you're hiring your videographer for, what sort of footage you're getting from the reel, and how many videographers you're having. While most video companies will offer two videographers to film your day, these will often both be operated by one videographer (ie a fixed camera filming the ceremony and the videographer roaming around getting other shots).
                    </p>
                    <p>
                      If you're looking at adding a wedding videographer into your wedding budget then you're in luck, because it's one of the few categories where the average hasn't gone up in price over the last few years.
                    </p>
                    <div className="bg-[#f8f7f5] p-6 text-center my-8">
                      <p className="font-serif text-lg text-[#5a534b]">
                        Nationally, an Australian videographer should cost you around
                      </p>
                      <p className="font-cormorant text-5xl text-[#b8a862] my-4">$2,695</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* State Costs */}
              <section id="state-costs" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    What is the average cost of a videographer in my state?
                  </h2>
                  <div className="font-serif text-lg text-[#5a534b] leading-relaxed space-y-4 mb-8">
                    <p>
                      Like any supplier, the average cost can go up or down a bit depending on which state you're based in and the suppliers available to you. Most of the time, you'll be looking at budgeting somewhere between <strong>$2,000 and $3,500</strong> for a popular videography package.
                    </p>
                  </div>

                  <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-6">
                    Average Cost Of A Wedding Videographer In Each State of Australia
                  </h3>
                  <div className="relative aspect-[16/9] mb-6">
                    <Image
                      src="https://assets.guestsnapper.com/Wedding-Videographer-Cost-in-Each-Sate.jpg"
                      alt="Wedding videographer cost by Australian state"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="font-serif text-sm text-[#7b756c] text-center italic">
                    The following stats are from research of over 120+ Australian wedding videographers that display their pricing.
                  </p>
                </div>
              </section>

              {/* Hours Section */}
              <section id="hours" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    How many hours should I hire my videographer for?
                  </h2>
                  <div className="font-serif text-lg text-[#5a534b] leading-relaxed space-y-4">
                    <p>
                      The amount of hours you hire a wedding videographer for solely depends on what exactly you are looking to be covered.
                    </p>
                    <p>
                      It's okay if it's only you walking down the aisle, but if you want more coverage, let your videographer know exactly what you need. If you're happy with your ceremony and speeches, perhaps you want the basics, or go a step further and get some footage of you getting ready in the morning.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 my-8">
                    <div className="bg-[#f8f7f5] p-6 text-center">
                      <p className="font-cormorant text-3xl text-[#b8a862] mb-2">4 hours</p>
                      <p className="font-serif text-[#5a534b]">Getting ready + ceremony</p>
                    </div>
                    <div className="bg-[#f8f7f5] p-6 text-center">
                      <p className="font-cormorant text-3xl text-[#b8a862] mb-2">6-8 hours</p>
                      <p className="font-serif text-[#5a534b]">Getting ready, ceremony + reception</p>
                    </div>
                    <div className="bg-[#f8f7f5] p-6 text-center">
                      <p className="font-cormorant text-3xl text-[#b8a862] mb-2">12 hours</p>
                      <p className="font-serif text-[#5a534b]">Full day coverage</p>
                    </div>
                  </div>

                  {/* All Day Coverage CTA */}
                  <div className="bg-[#4a5347] p-8 my-8">
                    <h3 className="font-cormorant text-2xl text-[#d4c9a0] mb-3">
                      Stop Worrying about Coverage - We Film All of your wedding!
                    </h3>
                    <p className="font-serif text-[#e8e3d8] mb-6">
                      Don't worry about deciding on how many hours to have your wedding videographer for. Our cheapest package has All Day Coverage so you won't miss a single moment of your wedding day!
                    </p>
                    <Link
                      href="/#packages"
                      className="inline-block border border-[#d4c9a0] px-8 py-3 text-sm font-sans uppercase tracking-wide text-[#d4c9a0] hover:bg-[#d4c9a0] hover:text-[#4a5347] transition-colors duration-300"
                    >
                      Learn more
                    </Link>
                  </div>

                  <div className="font-serif text-lg text-[#5a534b] leading-relaxed space-y-4">
                    <p>
                      From research conducted by easyweddings shows that most couples will have their videographer filming all day from start to finish (<strong>56%</strong>) which might turn into a 10 or 12-hour package. <strong>37%</strong> of couples will have their videographer for the ceremony and part of their reception. Just <strong>7%</strong> of couples have their videographer for their ceremony only.
                    </p>
                  </div>

                  <div className="relative aspect-[16/9] mt-8 mb-4">
                    <Image
                      src="https://assets.guestsnapper.com/How-long-couples-hire-wedding-videographers-2.jpg"
                      alt="How long couples hire wedding videographers"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </section>

              {/* Factors Section */}
              <section id="factors" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    Factors Impacting the Cost of a Wedding Videographer
                  </h2>
                  <p className="font-serif text-lg text-[#5a534b] leading-relaxed mb-8">
                    The videography package can be a barrier for some wedding couples. A good videographer should be able to discuss and present the options in an unbiased manner. Here are the main factors that affect the cost:
                  </p>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Duration",
                        description: "The biggest determining factor for wedding videography prices is the amount of time spent on-location. The longer the ceremony and reception, the more you can expect to pay."
                      },
                      {
                        title: "Pre-wedding Content",
                        description: "If you want to include content that takes place before the wedding, you might have to pay extra. For instance, footage of the engagement, or an interview with the bride and groom."
                      },
                      {
                        title: "Experience of the Videographer",
                        description: "Just like photography, videography is a craft that you can get better at with time. More experienced videographers who have built a name for themselves typically charge more."
                      },
                      {
                        title: "Number of Videographers",
                        description: "Some videographers use two people—one operates a camera from a fixed position while a second moves around capturing different angles. You can expect to pay more for two videographers."
                      },
                      {
                        title: "Length of Video",
                        description: "More time is spent editing than filming, so longer videos require more editing. This will drive up the price significantly."
                      },
                      {
                        title: "Equipment Used",
                        description: "High-quality cameras and recording equipment may run into tens of thousands of dollars. You will pay more for this higher quality than for someone with basic equipment."
                      },
                      {
                        title: "Location",
                        description: "A videographer's cost depends on distance travelled. If getting married abroad, hiring a local videographer will be cheaper than transporting one with you."
                      }
                    ].map((factor, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#b8a862] flex items-center justify-center text-white font-sans text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-cormorant text-xl text-[#3d3a35] mb-2">{factor.title}</h3>
                          <p className="font-serif text-[#5a534b] leading-relaxed">{factor.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Extras Section */}
              <section id="extras" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    What extras add-ons do wedding videographers have?
                  </h2>
                  <p className="font-serif text-lg text-[#5a534b] leading-relaxed mb-8">
                    Here is a list of common add-ons wedding videographers offer that can factor into the price of the wedding video package you go with:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "60 Second Social Trailer (delivered 48 hours after your wedding)",
                      "Full Speeches Multi-Camera Presentation",
                      "Full Ceremony Multi-Camera Presentation",
                      "The 'As-It-Happened' Film (Typically 30mins - 1.5hrs)",
                      "Raw Footage",
                      "Rehearsal Dinner Coverage",
                      "Drone Footage",
                      "Same-Day Edit"
                    ].map((addon, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#b8a862] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-serif text-[#5a534b]">{addon}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Why Expensive Section */}
              <section id="why-expensive" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    Why are wedding videos so expensive?
                  </h2>
                  <div className="font-serif text-lg text-[#5a534b] leading-relaxed space-y-4">
                    <p>
                      A wedding video is one of the most important parts of your special day. Having a professionally made wedding video will allow you to look back on that special day for years and even decades to come. The reason why it can be so expensive is due to several factors including: <strong>equipment costs, location fees and labor</strong>.
                    </p>
                    <p>
                      A professional wedding videographer needs about <strong>twice as much gear</strong> as a wedding photographer and their editing workstations have to be very powerful to edit HD or UltraHD video quickly. Videographers also fill up hard drives rapidly and cannot readily backup to the cloud yet because of massive file sizes and the speed limitations of most internet connections.
                    </p>
                    <p>
                      Videography has quickly become a staple in documenting a wedding along with photography. The truth is, wedding videography is not simple. It's not just your uncle recording your wedding on a camcorder; it's a complex process that needs good investment to produce quality output.
                    </p>
                    <p className="italic border-l-4 border-[#b8a862] pl-6 my-6">
                      When you understand what wedding videography really is from your videographer's perspective, you will appreciate the value of your money. And then it wouldn't be expensive for you anymore, but just reasonably priced.
                    </p>
                  </div>
                </div>
              </section>

              {/* Save Money Section */}
              <section id="save-money" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    How can I save money on my wedding videographer?
                  </h2>
                  <p className="font-serif text-lg text-[#5a534b] leading-relaxed mb-8">
                    We highly recommend hiring a professional wedding videographer for your wedding (instead of friends and family). However, there are ways to cut costs without compromising on quality:
                  </p>

                  <div className="space-y-6">
                    <div className="border-l-4 border-[#b8a862] pl-6">
                      <h3 className="font-cormorant text-xl text-[#3d3a35] mb-2">Cut the time</h3>
                      <p className="font-serif text-[#5a534b] leading-relaxed">
                        The more time your wedding videographer is filming, the more you'll pay. You can have your videographer skip the pre-wedding getting ready process, or leave halfway through your reception. A four-hour package will certainly cost less than a 12-hour one.
                      </p>
                    </div>

                    <div className="border-l-4 border-[#b8a862] pl-6">
                      <h3 className="font-cormorant text-xl text-[#3d3a35] mb-2">Don't ask for extras</h3>
                      <p className="font-serif text-[#5a534b] leading-relaxed">
                        As much as I love encouraging couples to consider adding drone footage or an additional longer edit, it often isn't necessary. In most cases the base package will have enough of the essentials. Flare Films offers flexible packages—you can add extra edits or raw footage any time before or after your wedding day.
                      </p>
                    </div>

                    <div className="border-l-4 border-[#b8a862] pl-6">
                      <h3 className="font-cormorant text-xl text-[#3d3a35] mb-2">Ask for raw footage</h3>
                      <p className="font-serif text-[#5a534b] leading-relaxed">
                        The editing process tends to be the most time-consuming—and therefore, the most expensive. You can cut costs by asking for just raw footage. However, I highly discourage this option, and 90% of wedding videographers will not allow this as they are concerned an outside editor may tarnish the intended quality of the video.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* What to Look For Section */}
              <section id="what-to-look-for" className="scroll-mt-24">
                <div className="bg-white p-8 md:p-12 shadow-lg">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#3d3a35] mb-6">
                    What to look for in a good videographer
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">Experience</h3>
                      <p className="font-serif text-[#5a534b] leading-relaxed">
                        Having an experienced wedding videographer allows you to stress less about your wedding video. You will be in good hands. An experienced videographer will familiarise themselves with your wedding timeline and make sure that they are in sync with your photographer. They will know exactly where to be, at exactly the right times to get the perfect shot! Even an expensive camera can't replace the gut instinct a long-time wedding videographer has.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">Portfolio</h3>
                      <p className="font-serif text-[#5a534b] leading-relaxed">
                        Like any creative professional, your wedding videographer's wedding films are a solid indicator of their skill and experience. If they only have a couple of videos, they may be new. If the overall quality of the video is low, that is probably an indication of the standard of video you will receive.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-cormorant text-2xl text-[#3d3a35] mb-3">Pricing</h3>
                      <p className="font-serif text-[#5a534b] leading-relaxed">
                        This one might sound strange. But the most experienced wedding videographers typically charge more than the going market rate. Price is a good way to tell who is the longest standing wedding videographer in an area. As the old adage goes… <strong>you get what you pay for!</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Final CTA */}
              <section className="scroll-mt-24">
                <div className="bg-[#4a5347] p-8 md:p-12 text-center">
                  <h2 className="font-cormorant text-3xl md:text-4xl text-[#d4c9a0] mb-4">
                    Thinking of Having A Wedding Film?
                  </h2>
                  <p className="font-cormorant text-2xl text-[#e8e3d8] mb-6">
                    Let Me Create Your Forever Film.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8 text-left max-w-3xl mx-auto">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#d4c9a0] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-serif text-[#e8e3d8]">All Day Wedding Coverage</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#d4c9a0] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-serif text-[#e8e3d8]">Your Film Is Handmade For You</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#d4c9a0] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-serif text-[#e8e3d8]">You're Not Locked in To Your Package</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/#packages"
                      className="inline-block border border-[#d4c9a0] px-10 py-4 text-sm font-sans uppercase tracking-wide text-[#d4c9a0] hover:bg-[#d4c9a0] hover:text-[#4a5347] transition-colors duration-300"
                    >
                      Wedding Packages
                    </Link>
                    <Link
                      href="/#contact"
                      className="inline-block bg-[#d4c9a0] px-10 py-4 text-sm font-sans uppercase tracking-wide text-[#4a5347] hover:bg-[#e8e3d8] transition-colors duration-300"
                    >
                      Get in Contact
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
