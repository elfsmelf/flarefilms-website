"use client"

import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function PromotionHero() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Announcement Bar */}
      <div className="bg-[#b8a862] text-white py-3 px-4 text-center z-20 relative">
        <p className="text-base md:text-lg lg:text-xl font-sans tracking-wide uppercase">
          Now booking the final 10 wedding spots for 2026. Once these dates are gone, that's it.
        </p>
      </div>

      {/* Hero Section */}
      <div className="relative flex-1 flex items-center justify-center min-h-[calc(100vh-48px)]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://assets.guestsnapper.com/wedding-gallery-media/ben%20and%20sierra%20featured%204.webp"
            alt="Wedding couple"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={80}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 py-16 max-w-5xl mx-auto">
          {/* Location */}
          <motion.p
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-sm md:text-base tracking-[0.2em] uppercase mb-6 opacity-90"
          >
            Brisbane · Gold Coast · Sunshine Coast
          </motion.p>

          {/* Subheading */}
          <motion.p
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-cormorant italic text-xl md:text-2xl lg:text-3xl mb-6 max-w-3xl mx-auto"
          >
            Real moments. Not cookie-cutter slideshows.
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-cormorant text-4xl md:text-5xl lg:text-7xl leading-tight mb-10 uppercase tracking-wide"
          >
            Wedding films that actually feel like your day.
          </motion.h1>

          {/* Checkmarks */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12"
          >
            {[
              "4-week delivery guaranteed",
              "120+ weddings filmed across SEQ",
              "Starting at $2,800",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-6 h-6 text-[#b8a862]" strokeWidth={3} />
                <span className="font-sans text-lg md:text-lg lg:text-xl">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Link
                href="#films"
                className="inline-block bg-[#b8a862] hover:bg-[#a69752] text-white px-8 md:px-12 py-4 text-base md:text-lg font-sans uppercase tracking-[0.15em] transition-colors duration-300"
              >
                Watch My Films
              </Link>
              <Link
                href="#pricing"
                className="inline-block bg-white hover:bg-gray-100 text-[#24221d] px-8 md:px-12 py-4 text-base md:text-lg font-sans uppercase tracking-[0.15em] transition-colors duration-300"
              >
                See Pricing
              </Link>
            </div>
            <p className="font-sans text-sm opacity-70">
              No pressure. No hard sell. Just real work.
            </p>
          </motion.div>
        </div>

        {/* Trust Badge - Bottom */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-[200px] md:max-w-[280px]">
            <Image
              src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-12-05%20at%202.55.15%20pm.png"
              alt="Google Reviews - 5 Star Rating"
              width={280}
              height={80}
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
