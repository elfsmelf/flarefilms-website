"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function AsSeenIn() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12 md:py-16 px-6 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <span className="font-sans text-xs md:text-sm tracking-[0.15em] uppercase text-[#585858]">
            As Seen In
          </span>

          <Image
            src="https://assets.guestsnapper.com/wedding-gallery-media/easy-weddings-logo-3.png"
            alt="Easy Weddings"
            width={160}
            height={45}
            className="h-10 md:h-12 w-auto object-contain"
          />
          <Image
            src="https://assets.guestsnapper.com/wedding-gallery-media/brides-logo-2.png"
            alt="Brides"
            width={140}
            height={55}
            className="h-10 md:h-12 w-auto object-contain"
          />
          <Image
            src="https://assets.guestsnapper.com/wedding-gallery-media/modern-wedding-logo-1.png"
            alt="Modern Wedding"
            width={160}
            height={60}
            className="h-10 md:h-12 w-auto object-contain"
          />
          <Image
            src="https://assets.guestsnapper.com/wedding-gallery-media/thebridestree_logo-2.png"
            alt="The Bride's Tree"
            width={180}
            height={38}
            className="h-8 md:h-10 w-auto object-contain"
          />
        </div>
      </div>
    </motion.section>
  )
}
