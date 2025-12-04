"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"

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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden">
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-[#7b756c]">
            <Calendar size={14} />
            <span className="font-serif text-sm">{formattedDate}</span>
          </div>
          <span className="text-[#7b756c]">•</span>
          <span className="bg-white/95 backdrop-blur-sm px-3 py-1 font-sans text-xs uppercase tracking-[0.15em] text-[#b8a862]">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-cormorant text-3xl md:text-4xl tracking-wide text-[#5a534b] group-hover:text-[#b8a862] transition-colors duration-300 mb-4 leading-tight">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="font-serif text-base leading-relaxed text-[#7b756c] mb-6 flex-1">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-[0.15em] text-[#5a534b] hover:text-[#b8a862] transition-all duration-300 group/link mt-auto border-t border-[#e7e4df] pt-6"
        >
          <span className="relative">
            Read More
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b8a862] group-hover/link:w-full transition-all duration-300" />
          </span>
          <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-2" />
        </Link>
      </div>
    </motion.article>
  )
}
