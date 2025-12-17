"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export function MeetRichard() {
  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0"
          >
            <Image
              src="https://assets.guestsnapper.com/wedding-gallery-media/richard.webp"
              alt="Richard - Brisbane Wedding Videographer"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-cormorant italic text-3xl md:text-4xl lg:text-5xl text-[#5A534B] mb-8">
              Meet Richard
            </h2>

            <div className="space-y-5 font-sans text-[#5A534B] text-base md:text-lg leading-relaxed">
              <p>
                I'm Richard, and I've filmed over 120 weddings across Brisbane, the Gold Coast, and the Sunshine Coast.
              </p>

              <p>
                Here's what makes Flare Films different: I shoot and edit every single wedding myself. No subcontractors. No strangers turning up on your day. Just me.
              </p>

              <p>
                I've seen too many couples wait months for a film that ends up feeling generic. That's not what your wedding deserves.
              </p>

              <p>
                I focus on the real moments — your dad's voice cracking, the laughter during speeches, the little glances you'll start to forget if no one captures them properly.
              </p>

              <p>
                And I deliver in 4 weeks. Guaranteed. Because your wedding film should arrive while you still feel like newlyweds.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="#films"
                className="inline-block bg-[#b8a862] hover:bg-[#a69752] text-white px-8 py-4 text-sm md:text-base font-sans uppercase tracking-[0.15em] transition-colors duration-300 text-center"
              >
                Watch My Films
              </Link>
              <Link
                href="#pricing"
                className="inline-block bg-[#5A534B] hover:bg-[#4a453e] text-white px-8 py-4 text-sm md:text-base font-sans uppercase tracking-[0.15em] transition-colors duration-300 text-center"
              >
                See Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
