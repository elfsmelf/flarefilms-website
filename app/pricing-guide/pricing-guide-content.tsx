"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CalendarEmbed } from "@/components/calendar-embed"

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

const googleReviews = [
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.25.02%20pm.png",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.32.48%20pm.png",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.32.56%20pm.png",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.33.07%20pm.png",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.33.20%20pm.png",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(1).webp",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(2).webp",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(3).webp",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(4).webp",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.06-pm.png",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.12-pm.png",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.34-pm.png",
  "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.24.02-pm.png",
]

export function GoogleReviewsSection() {
  return (
    <section className="w-full bg-[#F5F3ED] py-20 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div {...fadeInOnScroll}>
          <div className="flex flex-col items-center text-center mb-12">
            <h2
              className="font-cormorant text-3xl md:text-5xl mb-0 tracking-normal leading-tight font-light"
              style={{ color: "#5a534b" }}
            >
              Reviews from Our Happy Couples
            </h2>
            <p className="font-sans text-base md:text-lg mt-0" style={{ color: "#7b756c" }}>
              Here's what couples are saying...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {googleReviews.map((src, index) => (
              <div key={index} className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src={src}
                  alt={`Google Review ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function LimitedBonusSection() {
  return (
    <section className="w-full bg-[#24221d] py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div {...fadeInOnScroll}>
          <div className="bg-[#b8a862]/10 border border-[#b8a862]/30 rounded-xl p-8 md:p-10 text-center">
            <h3 className="font-cormorant text-2xl md:text-3xl text-[#b8a862] mb-4 uppercase">
              Limited Bonus: Free Ceremony & Speeches Upgrade
            </h3>
            <p className="font-sans text-white/90 text-base md:text-lg leading-relaxed mb-4">
              For my next 5 bookings, I'm including Ceremony & Speeches films with any package — that's <strong className="text-[#b8a862]">$1,000</strong> worth.
            </p>
            <p className="font-sans text-white/80 text-base leading-relaxed mb-4">
              These are the moments you'll want to hear again in 10, 20, 30 years. Your dad's speech. Your vows. Word for word.
            </p>
            <p className="font-sans text-[#b8a862] text-sm uppercase tracking-wider">
              If you're seeing this, spots are still available.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function BookCallSection() {
  return (
    <section id="book" className="w-full bg-[#24221d] py-20 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div {...fadeInOnScroll}>
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl mb-4 tracking-normal leading-tight font-light text-white">
              Ready to Chat?
            </h2>
            <p className="font-sans text-base md:text-lg text-white/80 max-w-2xl mb-12">
              Book a Zoom call below to ask questions and see if we're the right fit. There's zero obligation - I just want you to feel 100% confident before booking.
            </p>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#b8a862]/20 text-[#b8a862] font-serif font-semibold text-lg">
                    1
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-white mb-2">Book a Call</h3>
                  <p className="font-sans text-base text-white/70 leading-relaxed">
                    Pick a time that works for you below. Zoom or phone - your choice. These calls are relaxed, no pressure, and typically last around 40 mins.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#b8a862]/20 text-[#b8a862] font-serif font-semibold text-lg">
                    2
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-white mb-2">Tell Me Your Story</h3>
                  <p className="font-sans text-base text-white/70 leading-relaxed">
                    I want to hear all about your day - the venue, the vibe, what matters most to you. The more I know, the better I can craft a film that truly captures your love story.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <CalendarEmbed />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
