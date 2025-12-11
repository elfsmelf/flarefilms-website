"use client"
import { motion } from "framer-motion"
import Image from "next/image"

type PricingPackage = {
  id: string
  title: string
  subtitle: string
  description: string
  price: string
  savings?: string
  popular?: boolean
  image: string
  features: string[]
}

const packages: PricingPackage[] = [
  {
    id: "simply-perfect",
    title: "Simply Perfect",
    subtitle: "",
    description: "",
    price: "$2,800",
    popular: false,
    image: "https://assets.guestsnapper.com/wedding-gallery-media/paula.webp",
    features: [
      "1 Minute Sneak Peek Trailer within 7 days",
      "7 Hours Coverage",
      "4-6 MIN Highlight Film in 4K",
      "Drone Footage",
      "Expert Timeline & Schedule",
    ],
  },
  {
    id: "all-you-could-want",
    title: "All You Could Want",
    subtitle: "Most Popular",
    description: "",
    price: "$3,500",
    popular: true,
    image: "https://assets.guestsnapper.com/wedding-gallery-media/wedding%20couple-3.webp",
    features: [
      "1 Minute Sneak Peek Trailer within 7 days",
      "9 Hours Coverage",
      "7-9 MIN Highlight Film in 4K",
      "Full Ceremony & Speeches Film",
      "Drone Footage",
      "Expert Timeline & Schedule",
    ],
  },
  {
    id: "ultimate",
    title: "The Ultimate Experience",
    subtitle: "",
    description: "",
    price: "$4,000",
    popular: false,
    image: "https://assets.guestsnapper.com/wedding-gallery-media/nicole%20and%20josh%20(1).webp",
    features: [
      "1 Minute Sneak Peek Trailer within 7 days",
      "10 Hours Coverage",
      "7-10 MIN Highlight Film in 4K",
      "Full Ceremony & Speeches Film",
      "1-2 Hour Documentary Edit",
      "Drone Footage",
      "Expert Timeline & Schedule",
    ],
  },
]

export const PricingCards = () => {
  return (
    <div className="w-full bg-[#24221d] text-white py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`flex flex-col group rounded-lg overflow-hidden border transition-all duration-300 ${
                pkg.popular
                  ? "border-[#b8a862] ring-2 ring-[#b8a862]/20 scale-105"
                  : "border-[#b8a862]/20 hover:border-[#b8a862]/40"
              }`}
            >
              {/* Image */}
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-[#b8a862] text-[#24221d] px-6 py-2 text-sm font-serif font-semibold uppercase tracking-wider">
                    {pkg.subtitle}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow bg-[#302d26] p-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <h4 className="font-cormorant text-3xl md:text-4xl font-light text-[#F5F3ED] mb-3">
                    {pkg.title}
                  </h4>

                  <p className="text-base md:text-lg font-sans text-[#C7C5BF] mb-4">{pkg.description}</p>

                  <div className="flex flex-col items-center mb-2">
                    <p className="text-4xl md:text-5xl font-cormorant font-medium text-[#F5F3ED]">{pkg.price}</p>
                    {pkg.savings && (
                      <p className="text-sm md:text-base font-serif text-[#b8a862] mt-1">{pkg.savings}</p>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#b8a862]/20 mb-6"></div>

                {/* Features */}
                <div className="space-y-3 mb-6 flex-grow">
                  {pkg.features.map((feature, idx) => {
                    const isHighlighted = feature.includes("Sneak Peek Trailer")
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <svg
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            isHighlighted ? "text-[#b8a862]" : "text-[#b8a862]"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p
                          className={`text-base md:text-lg font-sans text-left ${
                            isHighlighted ? "text-[#b8a862] font-semibold" : "text-[#C7C5BF]"
                          }`}
                        >
                          {feature}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* CTA Button */}
                <a
                  href="/pricing#contact"
                  className={`inline-block text-center border px-8 py-3 text-sm font-serif uppercase tracking-wide transition-colors duration-300 ${
                    pkg.popular
                      ? "bg-[#b8a862] border-[#b8a862] text-[#24221d] hover:bg-[#d4c9a0] hover:border-[#d4c9a0]"
                      : "border-[#b8a862] text-[#b8a862] hover:bg-[#b8a862] hover:text-[#24221d]"
                  }`}
                >
                  Check Availability
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
