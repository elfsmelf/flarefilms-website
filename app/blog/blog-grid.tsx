"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BlogCard } from "./blog-card"

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

interface BlogGridProps {
  posts: BlogPost[]
  categories: string[]
  allPosts: BlogPost[]
}

export function BlogGrid({ posts, categories, allPosts }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Filter posts based on active category
  const filteredPosts = activeCategory
    ? allPosts.filter((post) => post.category === activeCategory)
    : posts

  return (
    <>
      {/* Category Filter Tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2.5 font-sans text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
              activeCategory === null
                ? "bg-[#5a534b] text-white"
                : "bg-white text-[#7b756c] hover:bg-[#5a534b] hover:text-white"
            }`}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 font-sans text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#5a534b] text-white"
                  : "bg-white text-[#7b756c] hover:bg-[#5a534b] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Blog Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory || "all"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="font-sans text-lg text-[#7b756c]">
                No articles found in this category.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
