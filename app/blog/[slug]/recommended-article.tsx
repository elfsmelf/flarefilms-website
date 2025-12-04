"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

interface RecommendedPost {
  slug: string
  title: string
  image: string
  date: Date
}

export function RecommendedArticle({ post }: { post: RecommendedPost }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="group pb-8 mb-8 border-b border-[#d4cfca] last:border-0 last:pb-0 last:mb-0">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative w-full aspect-[4/3] overflow-hidden mb-4">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <h3 className="font-serif text-lg text-[#5a534b] group-hover:text-[#b8a862] transition-colors duration-300 mb-3 leading-tight">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 text-[#7b756c] text-sm mb-4">
          <Calendar size={14} />
          <span className="font-serif">{formattedDate}</span>
        </div>
        <div className="inline-flex items-center gap-2 text-[#5a534b] text-sm font-serif uppercase tracking-wide group-hover:text-[#b8a862] transition-colors duration-300">
          Read Article
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  )
}
