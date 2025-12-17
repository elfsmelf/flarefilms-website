"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const fadeInOnScroll = {
  initial: {
    opacity: 0,
    y: 20,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    margin: "-100px",
  },
  transition: {
    duration: 0.8,
    ease: "easeOut" as const,
  },
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export function About() {
  return (
    <>
      {/* About Hero Section */}
      <section className="w-full bg-[#24221d] text-[#fffdf4] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Text Content */}
            <motion.div
              className="flex flex-col justify-center z-10"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={fadeInOnScroll}
                className="font-serif text-5xl md:text-6xl text-white mb-8 leading-tight font-light"
                style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
              >
                Hi, I'm Richard
              </motion.h2>

              <motion.div variants={fadeInOnScroll} className="space-y-6 text-base md:text-lg font-sans leading-relaxed opacity-90">
                <p>
                  I'm a Brisbane-based wedding videographer who has filmed over 120 weddings across South East Queensland. From intimate ceremonies to grand celebrations, I've had the privilege of capturing love stories just like yours.
                </p>

                <p>
                  Read through my ⭐️⭐️⭐️⭐️⭐️ reviews on Facebook and Google and you'll find the same experience—working with me feels like having a friend there to capture your day.
                </p>

                <p>
                  This approach translates into authentic, emotional films that genuinely reflect who you are and allow you to relive your wedding day every time you watch.
                </p>
              </motion.div>

              <motion.div variants={fadeInOnScroll} className="mt-10">
                <Link
                  href="/testimonials"
                  className="inline-block bg-[#e7e4df] text-[#24221d] px-12 py-4 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-white transition-colors duration-300 ease-out"
                >
                  View Testimonials
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Single Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/richard.webp"
                  alt="Richard Paynter - Brisbane Wedding Videographer"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* As Seen In Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-12">
            <span className="font-sans text-sm tracking-[0.15em] uppercase text-[#585858] mr-5">AS SEEN IN</span>

            <Image
              src="https://assets.guestsnapper.com/wedding-gallery-media/easy-weddings-logo-3.png"
              alt="Easy Weddings"
              width={160}
              height={45}
              className="h-12 w-auto object-contain"
            />
            <Image
              src="https://assets.guestsnapper.com/wedding-gallery-media/brides-logo-2.png"
              alt="Brides"
              width={140}
              height={55}
              className="h-12 w-auto object-contain"
            />
            <Image
              src="https://assets.guestsnapper.com/wedding-gallery-media/modern-wedding-logo-1.png"
              alt="Modern Wedding"
              width={160}
              height={60}
              className="h-12 w-auto object-contain"
            />
            <Image
              src="https://assets.guestsnapper.com/wedding-gallery-media/thebridestree_logo-2.png"
              alt="The Bride's Tree"
              width={180}
              height={38}
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
      </section>
    </>
  )
}
