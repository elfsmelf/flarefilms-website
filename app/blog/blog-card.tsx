"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  date: Date
  category: string
  published: boolean
}

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-white shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Category badge on image */}
          <div className="absolute top-4 left-4">
            <span className="bg-[#b8a862] px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.15em] text-[#24221d] font-medium">
              {post.category}
            </span>
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Date */}
          <span className="font-serif text-sm text-[#9B9589] italic">
            {formattedDate}
          </span>

          {/* Title */}
          <h2 className="font-cormorant text-2xl text-[#3d3a35] group-hover:text-[#b8a862] transition-colors duration-300 mt-3 mb-3 leading-tight line-clamp-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="font-serif text-sm leading-relaxed text-[#7b756c] line-clamp-3 mb-5">
            {post.excerpt}
          </p>

          {/* Read More Link */}
          <span className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.15em] text-[#5a534b] group-hover:text-[#b8a862] transition-all duration-300">
            Read Article
            <svg
              width="20"
              height="8"
              viewBox="0 0 24 8"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M23.3536 4.35355C23.5488 4.15829 23.5488 3.84171 23.3536 3.64645L20.1716 0.464466C19.9763 0.269204 19.6597 0.269204 19.4645 0.464466C19.2692 0.659728 19.2692 0.976311 19.4645 1.17157L22.2929 4L19.4645 6.82843C19.2692 7.02369 19.2692 7.34027 19.4645 7.53553C19.6597 7.7308 19.9763 7.7308 20.1716 7.53553L23.3536 4.35355ZM0 4.5H23V3.5H0V4.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
