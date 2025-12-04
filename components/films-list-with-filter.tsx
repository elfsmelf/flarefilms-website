"use client"

import { useState } from "react"
import { FilmVideoCard } from "@/components/film-video-card"

interface Film {
  slug: string
  title: string
  location: string
  tagline: string
  headerImage: string
}

interface FilmsListWithFilterProps {
  films: Film[]
}

export function FilmsListWithFilter({ films }: FilmsListWithFilterProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>("all")

  // Filter films based on selected location
  const filteredFilms =
    selectedLocation === "all"
      ? films
      : films.filter((film) => film.location === selectedLocation)

  // Get unique locations from films
  const locations = Array.from(new Set(films.map((film) => film.location))).sort()

  return (
    <>
      {/* Filter Section */}
      <div className="max-w-[1200px] mx-auto mb-8">
        <div className="flex items-center justify-center gap-4">
          <label
            htmlFor="location-filter"
            className="text-sm font-sans uppercase tracking-[0.2em] text-[#F5F3ED]/80"
          >
            Filter by Location:
          </label>
          <select
            id="location-filter"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-6 py-3 bg-[#24221D] border border-[#b8a862]/30 text-[#F5F3ED] font-sans text-sm uppercase tracking-wider focus:outline-none focus:border-[#b8a862] transition-colors cursor-pointer hover:border-[#b8a862]/60"
          >
            <option value="all">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-center mt-4 text-sm font-sans text-[#F5F3ED]/60">
          Showing {filteredFilms.length} {filteredFilms.length === 1 ? "film" : "films"}
          {selectedLocation !== "all" && ` in ${selectedLocation}`}
        </p>
      </div>

      {/* Films Grid */}
      <div className="max-w-[1200px] mx-auto">
        {filteredFilms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredFilms.map((film, index) => (
              <FilmVideoCard
                key={film.slug}
                slug={film.slug}
                title={film.title}
                location={film.location}
                tagline={film.tagline}
                image={film.headerImage}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#F5F3ED]/60 font-sans text-lg">
              No films found for {selectedLocation}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
