"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

interface Film {
  id: string
  slug: string
  title: string
  subtitle: string
  tagline: string
  location: string
  headerImage: string
}

interface VenueFilmsSectionProps {
  films: Film[]
  venueName: string
}

export function VenueFilmsSection({ films, venueName }: VenueFilmsSectionProps) {
  if (films.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-[#E7E4DF]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-cormorant text-4xl md:text-5xl text-[#5A534B] mb-4">
            Films Shot at {venueName}
          </h2>
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-[#b8a862]">
            See this venue come to life
          </p>
        </motion.div>

        {films.length === 1 ? (
          // Single film - larger featured layout
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link href={`/films/${films[0].slug}`}>
              <div className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden shadow-lg mb-6">
                  <Image
                    src={films[0].headerImage}
                    alt={films[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay with Play Button */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-white opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      <Play size={100} strokeWidth={1} fill="currentColor" className="drop-shadow-lg" />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-[#5A534B] mb-4 group-hover:text-[#b8a862] transition-colors">
                    {films[0].title}
                  </h3>
                  <p className="font-sans text-base uppercase tracking-[0.2em] text-[#b8a862] mb-4">{films[0].location}</p>
                  <p className="font-sans text-lg text-[#7B756C] max-w-2xl mx-auto leading-relaxed">{films[0].tagline}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ) : (
          // Multiple films - grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {films.map((film, index) => (
              <motion.div
                key={film.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/films/${film.slug}`}>
                  <div className="group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative aspect-video overflow-hidden shadow-md mb-4">
                      <Image
                        src={film.headerImage}
                        alt={film.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay with Play Button */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="text-white opacity-80 group-hover:opacity-100 transition-opacity"
                        >
                          <Play size={60} strokeWidth={1} fill="currentColor" className="drop-shadow-lg" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-cormorant text-2xl md:text-3xl text-[#5A534B] mb-2 group-hover:text-[#b8a862] transition-colors">
                        {film.title}
                      </h3>
                      <p className="font-sans text-sm text-[#7B756C] mb-2">{film.location}</p>
                      <p className="font-sans text-sm text-[#7B756C] line-clamp-2">{film.tagline}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
