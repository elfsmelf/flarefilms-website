"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { MapPin, Search, X } from "lucide-react"

interface Venue {
  id: string
  slug: string
  venueTitle: string
  shortDescription: string | null
  expandedText: string | null
  listingImage: string | null
  city: string | null
  venueLocation: string | null
  price: string | null
  ceremonyGuests: string | null
  receptionGuests: string | null
  weddingTypes: string | null
  indoorOutdoor: string | null
}

interface VenuesGridProps {
  venues: Venue[]
}

export function VenuesGrid({ venues }: VenuesGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<string>('all')

  // Extract unique cities
  const cities = useMemo(() => {
    const uniqueCities = new Set(venues.map(v => v.city).filter(Boolean))
    return Array.from(uniqueCities).sort()
  }, [venues])

  // Filter venues
  const filteredVenues = useMemo(() => {
    return venues.filter(venue => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        const matchesSearch =
          venue.venueTitle.toLowerCase().includes(searchLower) ||
          venue.shortDescription?.toLowerCase().includes(searchLower) ||
          venue.city?.toLowerCase().includes(searchLower) ||
          venue.venueLocation?.toLowerCase().includes(searchLower)

        if (!matchesSearch) return false
      }

      // City filter
      if (selectedCity !== 'all' && venue.city !== selectedCity) {
        return false
      }

      return true
    })
  }, [venues, searchQuery, selectedCity])

  return (
    <>
      {/* Content wrapper with background squiggle */}
      <div className="relative overflow-hidden">
        {/* Background Decorative Squiggle */}
        <div
          className="absolute top-0 right-0 bottom-0 w-[200%] md:w-[120%] lg:w-[150%] pointer-events-none opacity-60 mix-blend-soft-light lg:mix-blend-normal z-0"
          style={{
            backgroundImage:
              'url("https://shared-pw-fonts.s3.us-west-2.amazonaws.com/pw-icons-theme-8/info-b-vector.svg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "100% 50%",
            backgroundSize: "contain",
          }}
          aria-hidden="true"
        />

        {/* Hero Section */}
        <section className="relative bg-[#24221D] pt-40 pb-16 px-6 z-10">
          <div className="max-w-[1200px] mx-auto text-center relative">
            <h1 className="text-[40px] md:text-[60px] lg:text-[72px] font-cormorant tracking-wide text-[#F5F3ED] mb-6 leading-tight">
              Wedding Venues
            </h1>
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-[#b8a862] max-w-[600px] mx-auto mb-8">
              Discover Queensland's Most Beautiful Wedding Locations
            </p>
            <p className="text-base md:text-lg text-[#C7C5BF] font-serif leading-relaxed max-w-3xl mx-auto">
              From sweeping river views to enchanting old Queenslanders, explore wedding venues across Brisbane, Gold Coast, Sunshine Coast, Byron Bay and beyond.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="relative bg-[#24221D] pb-8 px-6 z-10">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {/* Search */}
              <div className="relative w-full md:w-auto md:min-w-[300px]">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F5F3ED]/60" size={18} />
                <input
                  type="text"
                  placeholder="Search venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-[#24221D] border border-[#b8a862]/30 text-[#F5F3ED] font-sans text-sm uppercase tracking-wider focus:outline-none focus:border-[#b8a862] transition-colors placeholder:text-[#F5F3ED]/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F5F3ED]/60 hover:text-[#b8a862]"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* City Filter */}
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full md:w-auto px-6 py-3 bg-[#24221D] border border-[#b8a862]/30 text-[#F5F3ED] font-sans text-sm uppercase tracking-wider focus:outline-none focus:border-[#b8a862] transition-colors cursor-pointer hover:border-[#b8a862]/60"
              >
                <option value="all">All Locations</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Results count */}
            <p className="text-center mt-6 text-sm font-sans text-[#F5F3ED]/60">
              Showing {filteredVenues.length} {filteredVenues.length === 1 ? "venue" : "venues"}
              {selectedCity !== 'all' && ` in ${selectedCity}`}
            </p>
          </div>
        </section>

        {/* Venues Grid */}
        <section className="relative bg-[#24221D] py-12 px-6 z-10">
          <div className="max-w-[1200px] mx-auto">
            {filteredVenues.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredVenues.map((venue, index) => (
                  <motion.div
                    key={venue.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full"
                  >
                    <Link href={`/venues/${venue.slug}`}>
                      {/* Image Area */}
                      <div className="relative group cursor-pointer overflow-hidden shadow-lg mb-6">
                        <div className="aspect-video w-full relative overflow-hidden bg-gray-100">
                          <Image
                            src={venue.listingImage || "/placeholder.svg"}
                            alt={venue.venueTitle}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="px-4">
                        {/* Location */}
                        {venue.city && (
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin size={14} className="text-[#b8a862]" />
                            <span className="font-sans uppercase tracking-[0.2em] text-xs text-[#b8a862]">
                              {venue.city}
                            </span>
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="font-cormorant text-3xl md:text-4xl tracking-wide mb-3 text-[#F5F3ED] group-hover:text-[#b8a862] transition-colors">
                          {venue.venueTitle}
                        </h3>

                        {/* Description */}
                        {venue.shortDescription && (
                          <p className="font-serif text-sm text-[#C7C5BF] leading-relaxed line-clamp-2">
                            {venue.shortDescription}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-[#F5F3ED]/60 font-sans text-lg mb-4">
                  No venues found
                  {selectedCity !== 'all' && ` in ${selectedCity}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCity('all')
                  }}
                  className="text-[#b8a862] font-sans text-sm hover:underline uppercase tracking-wider"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
