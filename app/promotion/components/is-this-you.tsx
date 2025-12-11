"use client"

import Image from "next/image"
import Link from "next/link"
import { XCircle } from "lucide-react"
import { motion } from "framer-motion"

const painPoints = [
  "You've seen wedding videos that all look the same — slow motion confetti, generic music, nothing that actually feels real.",
  "You're worried the videographer will miss the moments that actually matter — your dad's voice during his speech, the look on your partner's face.",
  "You don't want to wait 6 months wondering when your film will arrive.",
  "You want someone who actually cares about your story, not just ticking boxes.",
  "You'd rather know exactly what you're paying upfront than deal with hidden costs and awkward sales calls.",
]

export function IsThisYou() {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto">
        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-center text-[#5A534B] mb-12 md:mb-16 uppercase tracking-wide"
        >
          Your Wedding{" "}
          <span className="underline underline-offset-4 decoration-2">Happens Once</span>
          ... So Get It Captured Perfectly
        </motion.h2>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Content */}
            <div className="p-8 md:p-12 lg:p-16">
              <h3 className="font-cormorant text-2xl md:text-3xl text-[#5A534B] mb-8 uppercase tracking-wide">
                Is This You?
              </h3>

              {/* Pain Points */}
              <div className="space-y-5 mb-10">
                {painPoints.map((point, index) => (
                  <div key={index} className="flex gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="font-sans text-[#5A534B] text-sm md:text-base leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              {/* Transition Text */}
              <p className="font-sans font-semibold text-[#5A534B] text-base md:text-lg mb-10">
                That's exactly why I built Flare Films the way I did.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#films"
                  className="inline-block bg-[#3d3d3d] hover:bg-[#2d2d2d] text-white px-6 md:px-10 py-4 text-sm md:text-base font-sans uppercase tracking-wider transition-colors duration-300 rounded-lg text-center"
                >
                  Watch My Films
                </Link>
                <Link
                  href="#pricing"
                  className="inline-block bg-[#b8a862] hover:bg-[#a69752] text-white px-6 md:px-10 py-4 text-sm md:text-base font-sans uppercase tracking-wider transition-colors duration-300 rounded-lg text-center"
                >
                  See Pricing
                </Link>
              </div>

              {/* Google Reviews */}
              <div className="flex items-center gap-2 mt-6">
                <span className="font-sans text-sm text-[#5A534B]">5.0</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-sans text-sm text-[#b8a862]">10 Google reviews</span>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative min-h-[400px] lg:min-h-full">
              <Image
                src="https://assets.guestsnapper.com/wedding-gallery-media/rory.webp"
                alt="Happy wedding couple"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
