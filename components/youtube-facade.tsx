"use client"

import { useState } from "react"
import Image from "next/image"

interface YouTubeFacadeProps {
  videoId: string
  title: string
  className?: string
}

export function YouTubeFacade({ videoId, title, className = "" }: YouTubeFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Use maxresdefault for high quality, fall back to hqdefault
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  if (isLoaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={`h-full w-full ${className}`}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setIsLoaded(true)}
      className={`relative w-full h-full group cursor-pointer ${className}`}
      aria-label={`Play video: ${title}`}
    >
      {/* Thumbnail */}
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={false}
      />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors duration-300 shadow-lg">
          <svg
            className="w-7 h-7 md:w-8 md:h-8 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
