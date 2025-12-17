"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { motion } from "framer-motion"

interface Film {
  slug: string
  title: string
  subtitle: string
  tagline: string
  location: string
  headerImage: string
  featured: boolean
}

interface VideoCardProps {
  film: Film
  index: number
}

function VideoCard({ film, index }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full"
    >
      <Link href={`/films/${film.slug}`}>
        {/* Video/Image Area */}
        <div className="relative group cursor-pointer overflow-hidden shadow-lg mb-6">
          <div className="aspect-video w-full relative overflow-hidden bg-gray-100">
            <Image
              src={film.headerImage || "/placeholder.svg"}
              alt={film.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Overlay with Play Button */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-white opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <Play size={80} strokeWidth={1} fill="currentColor" className="drop-shadow-lg" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-4">
          {/* Couple Name */}
          <h3 className="font-cormorant text-3xl md:text-4xl lg:text-6xl tracking-widest mb-3 uppercase text-[#5A534B]">
            {film.title}
          </h3>

          {/* Location */}
          <p className="font-sans italic text-base md:text-lg text-[#7B756C] mb-4">{film.location}</p>

          {/* Description */}
          <p className="text-base md:text-lg leading-relaxed text-[#7B756C] mb-6 font-sans">{film.tagline}</p>

          {/* Learn More Button */}
          <span className="inline-block border border-[#7B756C] px-8 py-3 text-xs font-sans uppercase tracking-[3px] text-[#7B756C] group-hover:bg-[#7B756C] group-hover:text-white transition-colors duration-300">
            Learn More
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

interface FeaturedWorkProps {
  films: Film[]
}

export function FeaturedWork({ films }: FeaturedWorkProps) {
  return (
    <section className="bg-[#E7E4DF]">
      {/* Header */}
      <div className="text-center py-20 md:py-24 px-6">
        <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] text-[#5A534B] mb-5 uppercase">
          FEATURED WORK
        </h2>
        <p className="font-sans text-sm tracking-[0.2em] uppercase text-[#b8a862]">
          GRAB THE TISSUES, SIT BACK AND FEEL THE LOVE!
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {films.map((film, index) => (
            <VideoCard key={film.slug} film={film} index={index} />
          ))}
        </div>
      </div>

      {/* View All Films button */}
      <div className="text-center pb-20 px-6">
        <Link
          href="/films"
          className="inline-block font-sans text-sm tracking-[0.15em] uppercase text-[#5A534B] border-b border-[#5A534B] pb-1 hover:opacity-70 transition-opacity"
        >
          View ALL FILMS!
        </Link>
      </div>
    </section>
  )
}
