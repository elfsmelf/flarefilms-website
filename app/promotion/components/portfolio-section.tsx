"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { YouTubeFacade } from "@/components/youtube-facade"

const allVideos = [
  { id: "9bsLpgnUpPs", title: "Wedding Film 1" },
  { id: "xyWimVIhye8", title: "Wedding Film 2" },
  { id: "qbYdtP8BEDM", title: "Wedding Film 3" },
  { id: "2rZhQgT4Ynk", title: "Wedding Film 4" },
  { id: "dBXfismsloc", title: "Wedding Film 5" },
  { id: "uuYwa2vOKDk", title: "Wedding Film 6" },
  { id: "mp7tycx_FhQ", title: "Wedding Film 7" },
  { id: "F0dGZUpETWk", title: "Wedding Film 8" },
]

const INITIAL_COUNT = 4
const LOAD_MORE_COUNT = 4

export function PortfolioSection() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  const visibleVideos = allVideos.slice(0, visibleCount)
  const hasMoreVideos = visibleCount < allVideos.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT)
  }

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
          {visibleVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
            >
              <YouTubeFacade videoId={video.id} title={video.title} />
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        {hasMoreVideos && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <button
              onClick={handleLoadMore}
              className="inline-block px-10 py-4 border border-[#5A534B] text-[#5A534B] font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#5A534B] hover:text-white"
            >
              View More
            </button>
          </motion.div>
        )}

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
