"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const GOOGLE_REVIEWS = [
  {
    id: 1,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.25.02%20pm.png",
    alt: "Google Review 1",
  },
  {
    id: 2,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.32.48%20pm.png",
    alt: "Google Review 2",
  },
  {
    id: 3,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.32.56%20pm.png",
    alt: "Google Review 3",
  },
  {
    id: 4,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.33.07%20pm.png",
    alt: "Google Review 4",
  },
  {
    id: 5,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot%202025-11-30%20at%207.33.20%20pm.png",
    alt: "Google Review 5",
  },
  {
    id: 6,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(1).webp",
    alt: "Google Review 6",
  },
  {
    id: 7,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(2).webp",
    alt: "Google Review 7",
  },
  {
    id: 8,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(3).webp",
    alt: "Google Review 8",
  },
  {
    id: 9,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12%20(4).webp",
    alt: "Google Review 9",
  },
  {
    id: 10,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.06-pm.png",
    alt: "Google Review 10",
  },
  {
    id: 11,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.12-pm.png",
    alt: "Google Review 11",
  },
  {
    id: 12,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.23.34-pm.png",
    alt: "Google Review 12",
  },
  {
    id: 13,
    src: "https://assets.guestsnapper.com/wedding-gallery-media/Screenshot-2025-04-23-at-12.24.02-pm.png",
    alt: "Google Review 13",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-6 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-sans text-sm tracking-[0.2em] uppercase text-[#b8a862] mb-4">
            Client Testimonials
          </p>
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#5A534B] uppercase tracking-wide">
            Our Clients Have The
            <br />
            Sweetest Things To Say
          </h2>
        </motion.div>

        {/* Google Reviews Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {GOOGLE_REVIEWS.map((review) => (
                <CarouselItem key={review.id} className="pl-4">
                  <div className="relative aspect-[16/9] overflow-hidden bg-white shadow-sm rounded-lg">
                    <Image
                      src={review.src}
                      alt={review.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-white border-[#5A534B] text-[#5A534B] hover:bg-[#5A534B] hover:text-white" />
              <CarouselNext className="static translate-y-0 bg-white border-[#5A534B] text-[#5A534B] hover:bg-[#5A534B] hover:text-white" />
            </div>
          </Carousel>
        </motion.div>

        {/* More Reviews Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="#contact"
            className="inline-block font-sans text-sm tracking-[0.15em] uppercase text-[#5A534B] border-b border-[#5A534B] pb-1 hover:opacity-70 transition-opacity"
          >
            Check Availability
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
