"use client"

import { motion } from "framer-motion"

export function MoreThanClients() {
  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#5A534B] mb-6 leading-tight">
            You're more than clients.
          </h2>

          <p className="font-cormorant italic text-xl md:text-2xl text-[#7B756C] mb-8">
            You're real people, with real love and real moments.
          </p>

          <p className="font-sans text-[#5A534B] text-base md:text-lg leading-relaxed">
            That's why my approach is simple: blend into your day, elevate your story, and help you feel calm, confident, and truly present.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
