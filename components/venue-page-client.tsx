"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Phone, Globe, ChevronRight } from "lucide-react"
import { useState } from "react"
import { VenueFilmsSection } from "./venue-films-section"

interface Film {
  id: string
  slug: string
  title: string
  subtitle: string
  tagline: string
  location: string
  headerImage: string
}

interface VenueData {
  name: string
  slug: string
  description: string
  expandedText: string
  location: string
  phone: string
  website: string
  features: {
    pricePerHead: string
    receptionGuests: string
    ceremony: string
    ceremonyGuests: string
    inHouseCatering: string
    thirdPartyCatering: string
    eventTime: string
    musicEnd: string
    availability: string
    contact: string
  }
  images: string[]
}

export function VenuePageClient({ venueData, slug, films = [] }: { venueData: VenueData; slug: string; films?: Film[] }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    referral: "",
    ceremonyLocation: "",
    receptionVenue: "",
    weddingDate: "",
    message: "",
  })

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src={venueData.images[0] || "/images/2021/01/forest-v2.jpg"}
          alt={venueData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-cormorant text-5xl md:text-6xl lg:text-7xl text-white mb-4 drop-shadow-lg"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
            {venueData.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 font-serif italic max-w-3xl mx-auto drop-shadow-lg"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            {venueData.description}
          </motion.p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b border-[#7B756C]/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 text-sm text-[#7B756C] font-sans">
            <Link href="/" className="hover:text-[#5A534B] transition-colors">
              Home
            </Link>
            <ChevronRight size={16} />
            <Link href="/venues" className="hover:text-[#5A534B] transition-colors">
              Venues
            </Link>
            <ChevronRight size={16} />
            <span className="text-[#5A534B]">{venueData.name}</span>
          </div>
        </div>
      </div>

      {/* Contact Info Bar */}
      <section className="bg-[#5A534B] py-6">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-white">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="flex-shrink-0" />
              <span className="font-sans text-sm">{venueData.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="flex-shrink-0" />
              <a href={`tel:${venueData.phone}`} className="font-sans text-sm hover:underline">
                {venueData.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={20} className="flex-shrink-0" />
              <a
                href={venueData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm hover:underline"
              >
                Visit {venueData.name}'s Website
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Features at a Glance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 shadow-md"
              >
                <h2 className="font-cormorant text-3xl md:text-4xl text-[#5A534B] mb-6">Venue Features at A Glance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-1">Price per head</p>
                      <p className="text-lg font-serif text-[#5A534B]">{venueData.features.pricePerHead}</p>
                    </div>
                    <div>
                      <p className="text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-1">Reception guests</p>
                      <p className="text-lg font-serif text-[#5A534B]">{venueData.features.receptionGuests}</p>
                    </div>
                    <div>
                      <p className="text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-1">Ceremony</p>
                      <p className="text-lg font-serif text-[#5A534B]">{venueData.features.ceremony}</p>
                    </div>
                    <div>
                      <p className="text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-1">Ceremony Guests</p>
                      <p className="text-lg font-serif text-[#5A534B]">{venueData.features.ceremonyGuests}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-1">
                        In-house catering
                      </p>
                      <p className="text-lg font-serif text-[#5A534B]">{venueData.features.inHouseCatering}</p>
                    </div>
                    <div>
                      <p className="text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-1">
                        3rd party catering
                      </p>
                      <p className="text-lg font-serif text-[#5A534B]">{venueData.features.thirdPartyCatering}</p>
                    </div>
                    <div>
                      <p className="text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-1">
                        Event time included
                      </p>
                      <p className="text-lg font-serif text-[#5A534B]">{venueData.features.eventTime}</p>
                    </div>
                    <div>
                      <p className="text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-1">
                        Music must end by
                      </p>
                      <p className="text-lg font-serif text-[#5A534B]">{venueData.features.musicEnd}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-[#7B756C]/20">
                  <div>
                    <p className="text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-1">
                      Available Days and Times
                    </p>
                    <p className="text-lg font-serif text-[#5A534B]">{venueData.features.availability}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-1">Venue Contact</p>
                    <p className="text-lg font-serif text-[#5A534B]">{venueData.features.contact}</p>
                  </div>
                </div>
              </motion.div>

              {/* Films Section - only show if venue has films */}
              {films.length > 0 && (
                <VenueFilmsSection films={films} venueName={venueData.name} />
              )}

              {/* Photo Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-cormorant text-3xl md:text-4xl text-[#5A534B] mb-6">
                  {venueData.name} Wedding Photos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {venueData.images.map((image, index) => (
                    <div key={index} className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${venueData.name} photo ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* About Section - Dynamic content from database */}
              {venueData.expandedText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="prose prose-lg max-w-none venue-content"
                  dangerouslySetInnerHTML={{ __html: venueData.expandedText }}
                />
              )}
            </div>

            {/* Right Sidebar - Contact Form */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#24221d] p-8 sticky top-24"
              >
                <h3 className="font-cormorant text-3xl text-[#F5F3ED] mb-2">
                  Thinking of capturing your wedding video here?
                </h3>
                <p className="text-[#C7C5BF] font-serif text-sm mb-6">
                  As a Toowoomba Wedding Videographer I would love to help you! Check my availability!
                </p>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#F5F3ED] font-sans text-sm mb-2">First Name*</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#b8a862]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#F5F3ED] font-sans text-sm mb-2">Last Name*</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#b8a862]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#F5F3ED] font-sans text-sm mb-2">Email*</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#b8a862]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#F5F3ED] font-sans text-sm mb-2">Phone*</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#b8a862]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#F5F3ED] font-sans text-sm mb-2">I'm the...*</label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#b8a862]"
                    >
                      <option value="">Select...</option>
                      <option value="bride">Bride</option>
                      <option value="groom">Groom</option>
                      <option value="couple">Couple</option>
                      <option value="planner">Wedding Planner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#F5F3ED] font-sans text-sm mb-2">Where did you hear about me?*</label>
                    <select
                      required
                      value={formData.referral}
                      onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#b8a862]"
                    >
                      <option value="">Select...</option>
                      <option value="google">Google</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="referral">Referral</option>
                      <option value="venue">Venue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#F5F3ED] font-sans text-sm mb-2">Ceremony Location*</label>
                    <input
                      type="text"
                      required
                      value={formData.ceremonyLocation}
                      onChange={(e) => setFormData({ ...formData, ceremonyLocation: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#b8a862]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#F5F3ED] font-sans text-sm mb-2">Reception Venue*</label>
                    <input
                      type="text"
                      required
                      value={formData.receptionVenue}
                      onChange={(e) => setFormData({ ...formData, receptionVenue: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#b8a862]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#F5F3ED] font-sans text-sm mb-2">Wedding Date*</label>
                    <input
                      type="date"
                      required
                      value={formData.weddingDate}
                      onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#b8a862]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#F5F3ED] font-sans text-sm mb-2">
                      Tell me more about your wedding!
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#b8a862] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#b8a862] text-[#24221d] py-3 px-6 font-sans uppercase tracking-wider text-sm hover:bg-[#a89752] transition-colors"
                  >
                    Check Availability
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
