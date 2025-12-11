"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const videos = [
  { id: "9bsLpgnUpPs", title: "Wedding Film 1" },
  { id: "xyWimVIhye8", title: "Wedding Film 2" },
  { id: "qbYdtP8BEDM", title: "Wedding Film 3" },
  { id: "2rZhQgT4Ynk", title: "Wedding Film 4" },
]

export function PortfolioSection() {
  return (
    <section id="films" className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#5A534B] uppercase tracking-wide">
            A Taste of Real Wedding Films
          </h2>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="inline-block bg-[#b8a862] hover:bg-[#a69752] text-white px-10 md:px-14 py-4 text-sm md:text-base font-sans uppercase tracking-[0.15em] transition-colors duration-300"
            >
              Let's Chat
            </Link>
            <Link
              href="#pricing"
              className="inline-block bg-[#5A534B] hover:bg-[#4a453e] text-white px-10 md:px-14 py-4 text-sm md:text-base font-sans uppercase tracking-[0.15em] transition-colors duration-300"
            >
              See Pricing
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
