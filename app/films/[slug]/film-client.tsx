'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import { YouTubeFacade } from "@/components/youtube-facade"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, MapPin } from "lucide-react"
import type { Film } from "@/lib/films-data"

const fadeInOnScroll = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -100px 0px" },
  transition: { duration: 0.3, ease: "easeOut" as const },
}

interface FilmClientProps {
  film: Film
  recommendedFilms: Film[]
}

export function FilmClient({ film, recommendedFilms }: FilmClientProps) {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Video */}
      <section className="bg-[#24221D] pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Title and Tagline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[32px] md:text-[40px] lg:text-[48px] font-cormorant tracking-wide text-[#F5F3ED] mb-2 leading-tight"
              >
                {film.title}
              </motion.h1>
              {/* SEO: Venue-targeted H2 for keyword optimization */}
              {film.venue?.venueTitle && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.05 }}
                  className="text-[20px] md:text-[24px] lg:text-[28px] font-cormorant tracking-wide text-[#b8a862] leading-tight"
                >
                  {film.venue.venueTitle} Wedding Film
                </motion.h2>
              )}
            </div>
            <div className="flex items-center lg:justify-end">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-base md:text-lg font-sans text-[#C7C5BF] leading-relaxed italic lg:text-right"
              >
                {film.subtitle}
              </motion.p>
            </div>
          </div>

          {/* Video */}
          {film.videoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="aspect-video w-full bg-black overflow-hidden shadow-2xl">
                <YouTubeFacade
                  videoUrl={film.videoUrl}
                  title={`${film.title} Wedding Film`}
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Venue Link Section */}
      {film.venue && (
        <section className="bg-white py-20 border-b border-[#E7E4DF]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div {...fadeInOnScroll} className="mb-8 text-center">
              <p className="font-sans text-sm uppercase tracking-[0.3em] text-[#b8a862] mb-2">
                Featured Venue
              </p>
              <h2 className="font-cormorant text-4xl md:text-5xl tracking-wide text-[#5a534b]">
                Film Shot at {film.venue.venueTitle}
              </h2>
            </motion.div>

            <Link href={`/venues/${film.venue.slug}`} className="group block">
              <motion.div
                {...fadeInOnScroll}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4 relative">
                  {/* Main large image */}
                  {film.venue.listingImage && (
                    <div className="col-span-2 relative aspect-[16/10] overflow-hidden shadow-lg">
                      <Image
                        src={film.venue.listingImage}
                        alt={film.venue.venueTitle}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  {/* Gallery images - show up to 2 */}
                  {film.venue.gallery.slice(0, 2).map((image, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden shadow-lg">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Show "View More" overlay on last image if there are more */}
                      {index === 1 && film.venue?.gallery && film.venue.gallery.length > 2 && (
                        <div className="absolute inset-0 bg-[#24221d]/70 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white font-sans text-sm md:text-base uppercase tracking-wider">
                            +{film.venue.gallery.length - 2} More
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {film.venue.city && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#b8a862]" />
                      <span className="font-sans uppercase tracking-[0.2em] text-sm text-[#b8a862]">
                        {film.venue.city}
                      </span>
                    </div>
                  )}

                  <h3 className="font-cormorant text-3xl md:text-4xl tracking-wide text-[#5a534b] group-hover:text-[#b8a862] transition-colors">
                    {film.venue.venueTitle}
                  </h3>

                  {film.venue.shortDescription && (
                    <p className="font-sans text-base md:text-lg text-[#7B756C] leading-relaxed">
                      {film.venue.shortDescription}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-[#b8a862] font-sans text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                    Explore This Venue
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
      )}

      {/* Story and Vendors Combined Section */}
      <section className="bg-[#E7E4DF] py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Story Column */}
            <motion.div {...fadeInOnScroll}>
              <div
                className="prose prose-lg max-w-none
                  [&_h1]:font-cormorant [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:lg:text-5xl [&_h1]:tracking-wide [&_h1]:text-[#5a534b] [&_h1]:mb-8
                  [&_h2]:font-cormorant [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:tracking-wide [&_h2]:text-[#5a534b] [&_h2]:mb-6
                  [&_p]:text-base [&_p]:md:text-lg [&_p]:font-sans [&_p]:leading-relaxed [&_p]:text-[#7B756C] [&_p]:mb-6
                  [&_strong]:font-semibold [&_em]:italic
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-[#7B756C]
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:text-[#7B756C]
                  [&_li]:mb-2 [&_li]:font-sans [&_li]:text-base [&_li]:md:text-lg"
                dangerouslySetInnerHTML={{ __html: film.storyContent }}
              />
            </motion.div>

            {/* Vendors Column */}
            <motion.div {...fadeInOnScroll}>
              <div className="bg-white p-8 shadow-sm">
                <h2 className="font-cormorant text-3xl md:text-4xl tracking-wide text-[#5a534b] mb-6">
                  I Loved Working with These Vendors:
                </h2>
                <table className="w-full">
                  <tbody>
                    {film.vendors.map((vendor, index) => (
                      <tr key={index} className="border-b border-[#E7E4DF] last:border-0">
                        <td className="py-4 pr-4 font-sans text-sm uppercase tracking-[0.1em] text-[#b8a862] align-top">
                          {vendor.role}
                        </td>
                        <td className="py-4 font-sans text-base md:text-lg text-[#5a534b]">
                          {vendor.link ? (
                            <a
                              href={vendor.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[#b8a862] transition-colors inline-flex items-center gap-2"
                            >
                              {vendor.name}
                              <ExternalLink size={14} />
                            </a>
                          ) : (
                            vendor.name
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wedding Trailer */}
      {film.trailerUrl && (
        <section className="bg-[#E7E4DF] py-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div {...fadeInOnScroll}>
              <h2 className="font-cormorant text-4xl md:text-5xl tracking-wide text-[#5a534b] mb-4 text-center">
                Wedding Trailer
              </h2>
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-[#b8a862] mb-12 text-center">
                A Preview of the Big Day
              </p>
              <div className="aspect-video w-full bg-black overflow-hidden shadow-2xl">
                <YouTubeFacade
                  videoUrl={film.trailerUrl}
                  title={`${film.title} Wedding Trailer`}
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      <section className="bg-[#E7E4DF] py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeInOnScroll}>
            <h2 className="font-cormorant text-4xl md:text-5xl tracking-wide text-[#5a534b] mb-4 text-center">
              Here are some...
            </h2>
            <p className="font-sans text-sm uppercase tracking-[0.2em] text-[#b8a862] mb-12 text-center">
              Snapshots of the Wedding Day
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {film.gallery.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{ duration: 0.3, ease: "easeOut" as const }}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg group"
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recommended Films Section */}
      {recommendedFilms.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div {...fadeInOnScroll} className="text-center mb-12">
              <h2 className="font-cormorant text-4xl md:text-5xl tracking-wide text-[#5a534b] mb-4">
                Looking for more inspiration?
              </h2>
              <p className="font-sans text-base md:text-lg text-[#7B756C]">Explore More Wedding Videos</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {recommendedFilms.map((recommendedFilm, index) => (
                <motion.div
                  key={recommendedFilm.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{ duration: 0.3, ease: "easeOut" as const }}
                >
                  <Link href={`/films/${recommendedFilm.slug}`}>
                    <div className="relative group cursor-pointer overflow-hidden shadow-lg mb-4">
                      <div className="aspect-video w-full relative overflow-hidden bg-gray-100">
                        <Image
                          src={recommendedFilm.headerImage}
                          alt={recommendedFilm.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <h3 className="font-cormorant text-2xl md:text-3xl tracking-wide text-[#5a534b] mb-2">
                      {recommendedFilm.title}
                    </h3>
                    <p className="font-sans text-sm uppercase tracking-[0.15em] text-[#b8a862] mb-2">
                      {recommendedFilm.location}
                    </p>
                    <p className="font-sans text-base md:text-lg text-[#7B756C] line-clamp-2">
                      {recommendedFilm.tagline}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeInOnScroll} className="text-center">
              <Link
                href="/films"
                className="inline-block border border-[#5a534b] px-10 py-4 text-sm font-sans uppercase tracking-[3px] text-[#5a534b] hover:bg-[#5a534b] hover:text-white transition-all duration-300"
              >
                View All Films
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-[#24221d] py-24 md:py-32 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#b8a862] to-transparent" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div {...fadeInOnScroll} className="text-center mb-16">
            <h2 className="font-cormorant text-5xl md:text-6xl lg:text-7xl tracking-wide text-[#F5F3ED] mb-6 leading-tight">
              Like What You See?
            </h2>
            <p className="font-sans text-2xl md:text-3xl text-[#b8a862] italic">
              Let Me Create Your Forever Film
            </p>
          </motion.div>

          <motion.div
            {...fadeInOnScroll}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
          >
            <div className="text-center group">
              <div className="mb-4 inline-block">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#b8a862]/10 flex items-center justify-center group-hover:bg-[#b8a862]/20 transition-colors duration-300">
                  <svg className="w-8 h-8 text-[#b8a862]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-[#b8a862] mb-4">
                Natural & Authentic
              </h3>
              <p className="font-sans text-base md:text-lg text-[#C7C5BF] leading-relaxed">
                Look amazing without awkward posing. I capture genuine moments and authentic emotions as they naturally unfold throughout your special day.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-4 inline-block">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#b8a862]/10 flex items-center justify-center group-hover:bg-[#b8a862]/20 transition-colors duration-300">
                  <svg className="w-8 h-8 text-[#b8a862]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-[#b8a862] mb-4">
                Fast Turnaround
              </h3>
              <p className="font-sans text-base md:text-lg text-[#C7C5BF] leading-relaxed">
                Receive your full wedding film in just 4 weeks, plus every package includes a cinematic trailer delivered within 7 days so you can relive the magic right away.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-4 inline-block">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#b8a862]/10 flex items-center justify-center group-hover:bg-[#b8a862]/20 transition-colors duration-300">
                  <svg className="w-8 h-8 text-[#b8a862]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-[#b8a862] mb-4">
                Pre-Wedding Consultation
              </h3>
              <p className="font-sans text-base md:text-lg text-[#C7C5BF] leading-relaxed">
                Nut out all the finer details about your day with me in a pre-wedding zoom call. Comprehensive planning help to make sure your day runs unbelievably smoothly.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeInOnScroll}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              href="/pricing"
              className="inline-block bg-[#b8a862] px-12 py-5 text-sm font-sans uppercase tracking-[0.2em] text-[#24221d] hover:bg-[#d4c9a0] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Wedding Packages
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-[#b8a862] px-12 py-5 text-sm font-sans uppercase tracking-[0.2em] text-[#b8a862] hover:bg-[#b8a862] hover:text-[#24221d] transition-all duration-300"
            >
              Get in Contact
            </Link>
          </motion.div>
        </div>
      </section>

      <ImageCarousel />
      <Footer />
    </main>
  )
}
