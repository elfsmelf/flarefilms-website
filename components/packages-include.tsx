"use client"

import { motion } from "framer-motion"

const features = [
  {
    title: "WEDDING DAY COVERAGE",
    description:
      "Choose between coverage of the best bits or coverage from start to finish. Either way, we'll be there, not missing a beat.",
  },
  {
    title: "SECURE CLOUD STORAGE",
    description:
      "Your wedding memories backed up in a safe cloud storage system. Your moments, safe from all unforeseen circumstances.",
  },
  {
    title: "UNDER 4 WEEK DELIVERY",
    description: "Don't want to wait 4 months for your final photos & films? Get EVERYTHING back within 2-4 weeks.",
  },
  {
    title: "COMFORTABLE & RELAXED APPROACH",
    description: "Focusing on authentic, genuine moments so your photos & videos are NATURAL.",
  },
  {
    title: "ABSOLUTELY NO HIDDEN FEES",
    description: "No nasty surprises for you and your partner. Upfront and clear communication from the beginning.",
  },
  {
    title: "PRE-WEDDING CONSULTATION",
    description:
      "Nut out all the finer details about your day with our team. We'll make sure your day runs unbelievably smoothly",
  },
]

export function PackagesInclude() {
  return (
    <section className="bg-[#4a5347] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-[#d4c9a0] mb-4 uppercase">
            ALL PACKAGES INCLUDE...
          </h2>
          <p className="font-serif text-base tracking-[0.2em] uppercase text-[#d4c9a0] opacity-80">
            THIS AND SO MUCH MORE
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <h3 className="font-serif text-lg tracking-wide uppercase text-[#d4c9a0] mb-4">
                + {feature.title}
              </h3>
              <p className="font-sans text-base md:text-lg leading-relaxed text-[#e8e3d8]">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Check Availability Button */}
        <div className="text-center mt-16">
          <a
            href="/pricing#contact"
            className="inline-block border border-[#d4c9a0] px-12 py-4 text-sm font-serif uppercase tracking-wide text-[#d4c9a0] hover:bg-[#d4c9a0] hover:text-[#4a5347] transition-colors duration-300"
          >
            Check availability
          </a>
        </div>
      </div>
    </section>
  )
}
