"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import Image from "next/image"
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

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh]">
        <Image
          src="https://assets.guestsnapper.com/wedding-gallery-media/about%20us%20hero-2.webp"
          alt="Client Testimonials"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1
            className="text-[50px] md:text-[65px] lg:text-[80px] font-cormorant tracking-[0.05em] uppercase font-medium leading-[1.1]"
            style={{ textShadow: "rgba(0, 0, 0, 0.46) 0px 0px 10px" }}
          >
            Testimonials
          </h1>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full bg-[#F5F3ED] py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Header */}
          <motion.div {...fadeInOnScroll} className="text-center mb-16">
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#7B756C] mb-4">CLIENT TESTIMONIALS</p>
            <h2 className="font-cormorant text-4xl lg:text-6xl text-[#5A534B] mb-8 leading-tight">
              OUR CLIENTS HAVE THE<br />SWEETEST THINGS TO SAY
            </h2>
          </motion.div>

          {/* Featured Testimonial */}
          <motion.div {...fadeInOnScroll} className="max-w-[900px] mx-auto mb-20">
            <div className="bg-white p-8 lg:p-12 shadow-sm">
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-[#b8a862] fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg lg:text-xl font-serif text-[#7B756C] leading-relaxed text-center mb-6 italic">
                "Richard did the videography for our wedding last Friday and we must say that we couldn't be more pleased with how it all went.
              </p>
              <p className="text-lg lg:text-xl font-serif text-[#7B756C] leading-relaxed text-center mb-6 italic">
                Excellent, excellent videographer. He arrived on time, coordinated the utterly clueless bride and groom efficiently, and patiently held our hands all throughout the wedding day. Richard even stayed back really late as we and our guests as we danced through the night, documenting us all the while 😁
              </p>
              <p className="text-lg lg:text-xl font-serif text-[#7B756C] leading-relaxed text-center italic">
                Can't recommend him enough!"
              </p>
            </div>
          </motion.div>

          {/* Google Reviews Grid */}
          <motion.div {...fadeInOnScroll}>
            <h3 className="font-cormorant text-3xl text-center text-[#5A534B] mb-12">
              More Reviews from Our Happy Couples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.25.02%20pm.png"
                  alt="Google Review 1"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.32.48%20pm.png"
                  alt="Google Review 2"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.32.56%20pm.png"
                  alt="Google Review 3"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.33.07%20pm.png"
                  alt="Google Review 4"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.33.20%20pm.png"
                  alt="Google Review 5"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(1).webp"
                  alt="Google Review 6"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(2).webp"
                  alt="Google Review 7"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(3).webp"
                  alt="Google Review 8"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(4).webp"
                  alt="Google Review 9"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.06-pm.png"
                  alt="Google Review 10"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.12-pm.png"
                  alt="Google Review 11"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.34-pm.png"
                  alt="Google Review 12"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.24.02-pm.png"
                  alt="Google Review 13"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ImageCarousel />
      <Footer />
    </main>
  )
}
