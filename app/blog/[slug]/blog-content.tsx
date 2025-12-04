"use client"

import { motion } from "framer-motion"
import { Calendar, Clock } from "lucide-react"

interface BlogContentProps {
  category: string
  title: string
  date: string
  readTime: string
}

export function BlogContent({ category, title, date, readTime }: BlogContentProps) {
  return (
    <div className="absolute inset-0 flex items-end">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-16 md:pb-20 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Category Badge */}
          <span className="inline-block bg-[#b8a862] px-5 py-2 font-serif text-xs uppercase tracking-[0.2em] text-[#24221d] mb-6">
            {category}
          </span>

          {/* Title */}
          <h1 className="font-cormorant text-4xl md:text-6xl lg:text-7xl font-semibold tracking-wide text-[#F5F3ED] mb-6 leading-tight max-w-4xl">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-[#C7C5BF]">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="font-serif text-sm">{date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="font-serif text-sm">{readTime}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
