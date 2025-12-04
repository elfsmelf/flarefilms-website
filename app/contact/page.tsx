"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import { PhotographerIntro } from "@/components/photographer-intro"
import { TimelessWeddings } from "@/components/timeless-weddings"
import Image from "next/image"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Same as Films page */}
      <section className="relative h-[70vh]">
        <Image
          src="https://assets.guestsnapper.com/wedding-gallery-media/ben%20and%20sierra%20featured%204.webp"
          alt="Contact"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1
            className="text-[50px] md:text-[65px] lg:text-[80px] font-cormorant tracking-[0.05em] uppercase font-medium leading-[1.1]"
            style={{ textShadow: "rgba(0, 0, 0, 0.46) 0px 0px 10px" }}
          >
            Contact
          </h1>
        </div>
      </section>

      {/* Photographer Intro Section */}
      <PhotographerIntro />

      {/* Let's Chat Form Section */}
      <TimelessWeddings />

      <ImageCarousel />
      <Footer />
    </main>
  )
}
