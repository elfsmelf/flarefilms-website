import Link from "next/link"
import Image from "next/image"

export function ContactCTA() {
  return (
    <section className="relative py-24 px-6">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://www.flarefilms.com.au/wp-content/uploads/2021/02/nick-and-tayla-31.jpg"
          alt="Wedding couple"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <p className="text-white/90 text-sm tracking-[0.15em] uppercase mb-4 font-sans">Like what you see?</p>

        <h2 className="text-white text-3xl md:text-4xl font-cormorant mb-10">
          Let&apos;s make <em className="italic">memories</em> together
        </h2>

        <Link
          href="#"
          className="inline-block bg-[#c9b67a] text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#b8a569] transition-colors font-sans"
        >
          GET IN CONTACT
        </Link>
      </div>
    </section>
  )
}
