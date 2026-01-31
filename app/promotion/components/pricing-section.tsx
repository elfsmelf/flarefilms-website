"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Check, Star } from "lucide-react"

type PricingPackage = {
  id: string
  title: string
  price: string
  popular?: boolean
  image: string
  features: string[]
  bonus?: string
}

const packages: PricingPackage[] = [
  {
    id: "simply-perfect",
    title: "Simply Perfect",
    price: "$2,500",
    popular: false,
    image: "https://assets.guestsnapper.com/wedding-gallery-media/paula.webp",
    features: [
      "7 Hours Coverage",
      "4-6 Minute Highlight Film in 4K",
      "60-Second Sneak Peek within 3 Days",
      "4-Week Delivery Guaranteed",
      "Drone Footage",
      "Expert Timeline & Schedule",
      "Choose ONE: Full Ceremony OR Full Speeches Film",
    ],
  },
  {
    id: "all-you-could-want",
    title: "All You Could Want",
    price: "$2,800",
    popular: true,
    image: "https://assets.guestsnapper.com/wedding-gallery-media/wedding%20couple-3.webp",
    features: [
      "8 Hours Coverage",
      "7-9 Minute Highlight Film in 4K",
      "60-Second Sneak Peek within 3 Days",
      "4-Week Delivery Guaranteed",
      "Drone Footage",
      "Expert Timeline & Schedule",
    ],
    bonus: "Full Ceremony & Speeches Films — BOTH included (FREE for next 5 bookings)",
  },
  {
    id: "ultimate",
    title: "The Ultimate Experience",
    price: "$3,500",
    popular: false,
    image: "https://assets.guestsnapper.com/wedding-gallery-media/nicole%20and%20josh%20(1).webp",
    features: [
      "10 Hours Coverage",
      "7-10 Minute Highlight Film in 4K",
      "60-Second Sneak Peek within 3 Days",
      "4-Week Delivery Guaranteed",
      "1-2 Hour Documentary Edit",
      "Drone Footage",
      "Expert Timeline & Schedule",
    ],
    bonus: "Full Ceremony & Speeches Films — BOTH included (FREE for next 5 bookings)",
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 px-6 bg-[#24221d]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-wide">
            Packages Starting at $2,500
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col rounded-lg overflow-hidden border transition-all duration-300 ${
                pkg.popular
                  ? "border-[#b8a862] ring-2 ring-[#b8a862]/20 md:scale-105"
                  : "border-[#b8a862]/20"
              }`}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-[#b8a862] text-[#24221d] px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow bg-[#302d26] p-6 md:p-8">
                <div className="text-center mb-6">
                  <h3 className="font-cormorant text-2xl md:text-3xl text-white">
                    {pkg.title}
                  </h3>
                </div>

                <div className="border-t border-[#b8a862]/20 mb-6" />

                {/* Features */}
                <div className="space-y-3 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#b8a862] flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-sm md:text-base text-[#C7C5BF]">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {pkg.bonus && (
                    <div className="flex items-start gap-3 pt-2">
                      <Star className="w-5 h-5 text-[#b8a862] flex-shrink-0 mt-0.5 fill-current" />
                      <span className="font-sans text-sm md:text-base text-[#b8a862] font-medium">
                        {pkg.bonus}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  href="#contact"
                  className={`mt-6 inline-block text-center border px-6 py-3 text-sm font-sans uppercase tracking-wider transition-colors duration-300 ${
                    pkg.popular
                      ? "bg-[#b8a862] border-[#b8a862] text-[#24221d] hover:bg-[#d4c9a0]"
                      : "border-[#b8a862] text-[#b8a862] hover:bg-[#b8a862] hover:text-[#24221d]"
                  }`}
                >
                  Check Availability
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Limited Bonus Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
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
