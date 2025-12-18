import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for your enquiry. We'll be in touch within 24 hours.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#24221D]">
      <Header />

      {/* Thank You Section */}
      <section className="min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-24">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#b8a862]/20 text-[#b8a862]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>

          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            Thank You!
          </h1>

          <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed mb-4">
            Your enquiry has been received successfully.
          </p>

          <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed mb-8">
            I will be in contact with you ASAP.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block border border-[#b8a862] px-8 py-4 text-sm font-sans uppercase tracking-wide text-[#b8a862] hover:bg-[#b8a862] hover:text-[#24221D] transition-colors duration-300"
            >
              Back to Home
            </Link>
            <Link
              href="/films"
              className="inline-block border border-white/30 px-8 py-4 text-sm font-sans uppercase tracking-wide text-white/80 hover:bg-white/10 transition-colors duration-300"
            >
              View Our Films
            </Link>
          </div>
        </div>
      </section>

      <ImageCarousel />
      <Footer />
    </main>
  )
}
