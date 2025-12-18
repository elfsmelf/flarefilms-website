"use client"

import { useState } from "react"
import Image from "next/image"

interface YouTubeFacadeProps {
  videoId?: string
  videoUrl?: string
  title: string
  className?: string
}

// Extract video ID from various YouTube URL formats
function extractVideoId(url: string): string | null {
  // Handle embed URLs: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/)
  if (embedMatch) return embedMatch[1]

  // Handle watch URLs: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  if (watchMatch) return watchMatch[1]

  // Handle short URLs: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return shortMatch[1]

  return null
}

export function YouTubeFacade({ videoId, videoUrl, title, className = "" }: YouTubeFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Get video ID from either prop
  const resolvedVideoId = videoId || (videoUrl ? extractVideoId(videoUrl) : null)

  if (!resolvedVideoId) {
    return null
  }

  // Use maxresdefault for high quality, fall back to hqdefault
  const thumbnailUrl = `https://i.ytimg.com/vi/${resolvedVideoId}/maxresdefault.jpg`

  if (isLoaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${resolvedVideoId}?autoplay=1`}
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
      <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/10 transition-colors duration-300">
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
