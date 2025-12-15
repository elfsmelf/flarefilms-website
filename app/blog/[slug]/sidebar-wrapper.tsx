"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface SidebarWrapperProps {
  children: React.ReactNode
}

export function SidebarWrapper({ children }: SidebarWrapperProps) {
  return (
    <div className="sticky top-24 space-y-8">
      {/* Recommended Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white shadow-lg p-8"
      >
        <h2 className="font-cormorant text-3xl text-[#5a534b] mb-6 tracking-wide border-b border-[#E7E4DF] pb-4">
          Related Articles
        </h2>
        <div className="space-y-6">{children}</div>
      </motion.div>

      {/* Back to Blog */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
        <Link
          href="/blog"
          className="flex items-center justify-center gap-2 bg-[#5a534b] text-[#F5F3ED] px-6 py-4 text-sm font-sans uppercase tracking-wide hover:bg-[#b8a862] transition-colors duration-300 shadow-lg"
        >
          <ArrowRight size={16} className="rotate-180" />
          All Articles
        </Link>
      </motion.div>
    </div>
  )
}
