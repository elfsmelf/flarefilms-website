"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const workingTogether = [
  "You're fully present, knowing all the moments are being authentically captured.",
  "You don't have to \"pose\" or think about the camera... unless you want to.",
  "You feel cared for, supported, and gently led through the day (especially for those awkward photo poses!).",
  "You get home from your wedding knowing this: they nailed it.",
]

export function YourDaySection() {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Small Image */}
            <div className="relative w-32 h-32 mb-8">
              <Image
                src="https://assets.guestsnapper.com/wedding-gallery-media/ben%20and%20sierra%20featured%202.webp"
                alt="Wedding couple moment"
                fill
                className="object-cover rounded-full"
                sizes="128px"
              />
            </div>

            <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#5A534B] mb-6 leading-tight">
              You're here because your wedding isn't just one day...
              <span className="italic">it's your day.</span>
            </h2>

            <p className="font-sans text-[#5A534B] text-base md:text-lg leading-relaxed mb-8">
              Every smile, tear, laugh, and glance should be captured as it happens. You deserve a filmmaker who lets you live in those moments... not pause them.
            </p>

            <h3 className="font-cormorant text-xl md:text-2xl text-[#5A534B] mb-6">
              Here's what working together looks like:
            </h3>

            <ul className="space-y-4">
              {workingTogether.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-[#b8a862] font-bold">•</span>
                  <span className="font-sans text-[#5A534B] text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-[3/4] w-full"
          >
            <Image
              src="https://assets.guestsnapper.com/wedding-gallery-media/ben%20and%20sierra%20featured%203.webp"
              alt="Wedding couple"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
