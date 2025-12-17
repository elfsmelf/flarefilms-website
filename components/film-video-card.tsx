"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { motion } from "framer-motion"

interface FilmVideoCardProps {
  slug: string
  title: string
  location: string
  tagline: string
  image: string
  index: number
}

export function FilmVideoCard({ slug, title, location, tagline, image, index }: FilmVideoCardProps) {
  // Ensure we have a valid image URL
  const isValidUrl = (url: string): boolean => {
    if (!url || url.trim() === '') return false
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')
  }

  const imageUrl = isValidUrl(image) ? image : '/placeholder.svg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
      className="w-full"
    >
      <Link href={`/films/${slug}`}>
        {/* Video/Image Area */}
        <div className="relative group cursor-pointer overflow-hidden shadow-lg mb-6">
          <div className="aspect-video w-full relative overflow-hidden bg-gray-100">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
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
          {/* Title */}
          <h3 className="font-cormorant text-3xl md:text-4xl lg:text-5xl tracking-widest mb-3 uppercase text-[#F5F3ED]">
            {title}
          </h3>

          {/* Location */}
          <p className="font-sans uppercase tracking-[0.2em] text-sm text-[#C7C5BF] mb-4">{location}</p>

          {/* Description */}
          <p className="font-serif text-base text-[#C7C5BF] leading-relaxed">{tagline}</p>
        </div>
      </Link>
    </motion.div>
  )
}
