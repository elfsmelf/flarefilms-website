"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import { TestimonialCard } from "@/components/testimonial-card"
import { WeddingCTASection } from "@/components/wedding-cta-section"
import { AwardsRecognition } from "@/components/awards-recognition"
import Image from "next/image"
import { motion } from "framer-motion"

const fadeInOnScroll = {
  initial: {
    opacity: 0,
    y: 20,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    margin: "-100px",
  },
  transition: {
    duration: 0.8,
    ease: "easeOut" as const,
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh]">
        <Image
          src="https://assets.guestsnapper.com/wedding-gallery-media/gheorja%20and%20jake%20about.webp"
          alt="Meet Richard"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1
            className="text-[50px] md:text-[65px] lg:text-[80px] font-cormorant tracking-[0.05em] uppercase font-medium leading-[1.1]"
            style={{ textShadow: "rgba(0, 0, 0, 0.46) 0px 0px 10px" }}
          >
            Meet Richard
          </h1>
        </div>
      </section>

      {/* Section 1: We Love Our Jobs */}
      <section className="w-full bg-[#F5F3ED] py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Decorative Rose Divider */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex-1 h-px bg-[#5A534B]/20"></div>
            <svg className="w-8 h-8 mx-8 text-[#5A534B]/40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 6c-2.5 0-4 1.5-4 4 0 2.5 2 4 4 4s4-1.5 4-4c0-2.5-1.5-4-4-4z" strokeWidth="1.5"/>
              <path d="M12 14v6" strokeWidth="1.5"/>
            </svg>
            <div className="flex-1 h-px bg-[#5A534B]/20"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <motion.div {...fadeInOnScroll}>
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#7B756C] mb-4">ABOUT ME</p>
              <h2 className="font-cormorant text-5xl lg:text-6xl text-[#5A534B] mb-8 leading-tight">
                I'M SO GLAD YOU'RE HERE!
              </h2>
              <div className="w-px h-16 bg-[#b8a862] mb-6"></div>
              <p className="text-base md:text-lg font-sans text-[#7B756C] leading-relaxed mb-6">
                I'm Richard, a Brisbane-based videographer who has filmed over 120 weddings across QLD and beyond. From your first look to your last dance, I capture the authentic moments and emotions that make your day unforgettable. I treat every wedding as my own – because your story deserves nothing less.
              </p>
              <p className="text-2xl font-cormorant italic text-[#5A534B]">
                -Richard
              </p>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              {...fadeInOnScroll}
              className="relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/richard%20with%20couple.webp"
                  alt="Richard with couple"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Your Wedding Day */}
      <section className="w-full bg-white py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Image */}
            <motion.div {...fadeInOnScroll} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://assets.guestsnapper.com/wedding-gallery-media/Natasha-and-Jono-8.webp"
                alt="Wedding couple moment"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Right: Text */}
            <motion.div {...fadeInOnScroll} className="flex flex-col justify-center">
              <h2 className="font-serif text-4xl lg:text-5xl text-[#5A534B] mb-8 leading-tight">
                You're here because your wedding isn't just one day....it's your day.
              </h2>
              <p className="text-base md:text-lg font-sans text-[#7B756C] leading-relaxed mb-6">
                Every <span className="italic text-[#b8a862]">smile</span>, <span className="italic text-[#b8a862]">tear</span>, <span className="italic text-[#b8a862]">laugh</span>, and <span className="italic text-[#b8a862]">glance</span> should be captured as it happens. You deserve a filmmaker who <span className="italic text-[#b8a862]">lets you live in those moments...</span> not pause them.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Working Together */}
      <section className="w-full bg-[#F5F3ED] py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <motion.div {...fadeInOnScroll}>
              <h2 className="font-serif text-4xl lg:text-5xl text-[#5A534B] mb-12 leading-tight">
                Here's what working together looks like:
              </h2>

              <div className="space-y-6 text-base md:text-lg font-sans text-[#7B756C] leading-relaxed">
                <p>
                  <span className="font-semibold">•</span> You're fully <span className="italic text-[#b8a862]">present</span>, knowing all the moments are being <span className="italic text-[#b8a862]">authentically</span> captured.
                </p>
                <p>
                  <span className="font-semibold">•</span> You don't have to <span className="italic text-[#b8a862]">"pose"</span> or think about the camera... unless you want to.
                </p>
                <p>
                  <span className="font-semibold">•</span> You feel <span className="italic text-[#b8a862]">cared for, supported, and gently led through the day</span> (especially for those awkward photo poses!).
                </p>
                <p>
                  <span className="font-semibold">•</span> You get home from your wedding knowing this: <span className="italic text-[#b8a862]">they nailed it</span>.
                </p>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div {...fadeInOnScroll} className="relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/7TKw-qeDd5mZ5RvOIJM3I.webp"
                  alt="Our Wedding"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Our Promise & How We Do It */}
      <section className="w-full bg-white py-20 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Two Column Layout for Promise & How We Do It */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-20">
            {/* Left Column: Our Promise */}
            <motion.div {...fadeInOnScroll}>
              <h2 className="font-cormorant text-4xl lg:text-5xl text-[#5A534B] mb-10 leading-tight">
                OUR <span className="italic text-[#b8a862]">PROMISE</span>
              </h2>
              <div className="space-y-6 text-base md:text-lg font-sans text-[#7B756C] leading-relaxed">
                <p>
                  <span className="text-[#b8a862] text-2xl mr-3">•</span> Your day is <span className="italic text-[#b8a862]">relaxed</span>, from prep to party.
                </p>
                <p>
                  <span className="text-[#b8a862] text-2xl mr-3">•</span> Your <span className="italic">emotions</span>, your <span className="italic">energy</span>, your <span className="italic">vibe</span>—it's all documented in the most <span className="italic text-[#b8a862]">natural way</span>.
                </p>
                <p>
                  <span className="text-[#b8a862] text-2xl mr-3">•</span> The focus is on <span className="italic">your story</span>, with no unnecessary gear or distractions.
                </p>
              </div>
            </motion.div>

            {/* Right Column: How We Do It */}
            <motion.div {...fadeInOnScroll}>
              <h2 className="font-cormorant text-4xl lg:text-5xl text-[#5A534B] mb-10 leading-tight">
                <span className="italic text-[#b8a862]">HOW</span> WE DO IT
              </h2>
              <div className="space-y-6 text-base md:text-lg font-sans text-[#7B756C] leading-relaxed">
                <p>
                  <span className="text-[#b8a862] text-2xl mr-3">•</span> <span className="italic text-[#b8a862]">We start by listening:</span> Your story, vision, and priorities guide every decision.
                </p>
                <p>
                  <span className="text-[#b8a862] text-2xl mr-3">•</span> <span className="italic text-[#b8a862]">We plan together:</span> From timelines to what you value the most, so you know exactly what to expect.
                </p>
                <p>
                  <span className="text-[#b8a862] text-2xl mr-3">•</span> <span className="italic text-[#b8a862]">We shoot like a guest:</span> On-The-Fly, who-you-are style, without stiff posing.
                </p>
                <p>
                  <span className="text-[#b8a862] text-2xl mr-3">•</span> <span className="italic text-[#b8a862]">We care about the vibe:</span> Authentic emotions and candid energy are what makes your film feel real.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center my-16">
            <div className="flex-1 h-px bg-[#5A534B]/20"></div>
            <svg className="w-8 h-8 mx-8 text-[#b8a862]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 6c-2.5 0-4 1.5-4 4 0 2.5 2 4 4 4s4-1.5 4-4c0-2.5-1.5-4-4-4z" strokeWidth="1.5"/>
              <path d="M12 14v6" strokeWidth="1.5"/>
            </svg>
            <div className="flex-1 h-px bg-[#5A534B]/20"></div>
          </div>

          {/* Centered Closing Statement */}
          <motion.div {...fadeInOnScroll} className="text-center max-w-[800px] mx-auto">
            <h3 className="font-cormorant text-5xl lg:text-6xl italic text-[#5A534B] mb-8 leading-tight">
              You're more than clients.
            </h3>
            <p className="text-base md:text-lg font-sans text-[#7B756C] leading-relaxed mb-8">
              You're real people, with real love and real moments.
            </p>
            <p className="text-base md:text-lg font-sans text-[#7B756C] leading-relaxed">
              That's why our approach is simple: <span className="italic text-[#b8a862]">blend</span> into your day, <span className="italic text-[#b8a862]">elevate your story</span>, and help you <span className="italic text-[#b8a862]">feel calm, confident, and truly present</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <AwardsRecognition />

      {/* Testimonial Section */}
      <section className="w-full bg-[#F5F3ED] py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Header */}
          <motion.div {...fadeInOnScroll} className="text-center mb-16">
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#7B756C] mb-4">CLIENT TESTIMONIALS</p>
            <h2 className="font-cormorant text-4xl lg:text-6xl text-[#5A534B] mb-8 leading-tight">
              OUR CLIENTS HAVE THE<br />SWEETEST THINGS TO SAY
            </h2>
          </motion.div>

          {/* Featured Testimonial */}
          <motion.div {...fadeInOnScroll} className="max-w-[900px] mx-auto mb-20">
            <div className="bg-white p-8 lg:p-12 shadow-sm">
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-[#b8a862] fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-base md:text-lg font-sans text-[#7B756C] leading-relaxed text-center mb-6 italic">
                "Richard did the videography for our wedding last Friday and we must say that we couldn't be more pleased with how it all went.
              </p>
              <p className="text-base md:text-lg font-sans text-[#7B756C] leading-relaxed text-center mb-6 italic">
                Excellent, excellent videographer. He arrived on time, coordinated the utterly clueless bride and groom efficiently, and patiently held our hands all throughout the wedding day. Richard even stayed back really late as we and our guests as we danced through the night, documenting us all the while 😁
              </p>
              <p className="text-base md:text-lg font-sans text-[#7B756C] leading-relaxed text-center italic">
                Can't recommend him enough!"
              </p>
            </div>
          </motion.div>

          {/* Google Reviews Grid */}
          <motion.div {...fadeInOnScroll}>
            <h3 className="font-cormorant text-3xl text-center text-[#5A534B] mb-12">
              More Reviews from Our Happy Couples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.25.02%20pm.png"
                  alt="Google Review 1"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.32.48%20pm.png"
                  alt="Google Review 2"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.32.56%20pm.png"
                  alt="Google Review 3"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.33.07%20pm.png"
                  alt="Google Review 4"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.33.20%20pm.png"
                  alt="Google Review 5"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(1).webp"
                  alt="Google Review 6"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(2).webp"
                  alt="Google Review 7"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(3).webp"
                  alt="Google Review 8"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(4).webp"
                  alt="Google Review 9"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.06-pm.png"
                  alt="Google Review 10"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.12-pm.png"
                  alt="Google Review 11"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.34-pm.png"
                  alt="Google Review 12"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.24.02-pm.png"
                  alt="Google Review 13"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wedding CTA Section */}
      <WeddingCTASection />

      <ImageCarousel />
      <Footer />
    </main>
  )
}
