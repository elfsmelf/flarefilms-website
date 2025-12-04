"use client"

import { motion } from "framer-motion"

export function BlogHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl tracking-[0.1em] text-[#5a534b] mb-4 uppercase">
        Latest Articles
      </h2>
      <p className="font-serif text-lg text-[#7b756c] max-w-2xl mx-auto">
        Discover helpful tips and inspiration for your wedding day journey
      </p>
    </motion.div>
  )
}
