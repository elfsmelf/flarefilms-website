"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

// Font import helper
const GoogleFonts = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Questrial&display=swap');
    `}
  </style>
)

// @component: WeddingCTASection
export const WeddingCTASection = () => {
  // @return
  return (
    <div className="w-full bg-[#24221D] py-[80px] md:py-[120px] overflow-hidden">
      <GoogleFonts />

      <div className="max-w-[1140px] mx-auto px-6 relative flex flex-col items-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut" as const,
          }}
          className="w-full text-center mb-12 md:mb-[55px]"
        >
          <h2
            className="text-white text-[40px] md:text-[60px] leading-[1.2] font-light tracking-[0.6px]"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            LET'S CHAT!
          </h2>
        </motion.div>

        {/* Content Section */}
        <div className="w-full max-w-[900px] mx-auto relative">
          <div className="flex flex-col md:flex-row items-start md:gap-0">
            {/* Left Image Column */}
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut" as const,
                delay: 0.2,
              }}
              className="w-full md:w-1/2 z-10"
            >
              <div className="relative pr-0 md:pr-10 w-full h-[400px] md:h-[554px]">
                <Image
                  src="https://assets.guestsnapper.com/wedding-gallery-media/lets-get-in-contact.jpg"
                  alt="Wedding moment"
                  fill
                  className="object-cover shadow-sm"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut" as const,
                delay: 0.4,
              }}
              className="w-full md:w-1/2 md:mt-[109px] z-0"
            >
              <div className="bg-[#302D26] p-[40px] md:p-[80px_55px] h-full flex flex-col items-start justify-center text-left">
                {/* Subheading */}
                <h3
                  className="text-white text-[28px] md:text-[36px] font-normal tracking-[1px] mb-4"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                  }}
                >
                  READY TO START?
                </h3>

                {/* Paragraph */}
                <p
                  className="text-white/90 text-[16px] md:text-[18px] leading-[1.7] text-justify mb-8 font-light"
                  style={{
                    fontFamily: '"EB Garamond", serif',
                  }}
                >
                  Fill out the contact form or explore our wedding films to see if your date is still available. I will
                  get back to you within 24 hours with full galleries too!
                </p>

                {/* Two CTA Buttons */}
                <div className="flex flex-col gap-4 w-full">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-[#b8a862] text-white text-[12px] font-normal uppercase tracking-[3px] transition-all duration-300 hover:bg-[#a89752] hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    style={{
                      fontFamily: '"Questrial", sans-serif',
                    }}
                  >
                    GET IN CONTACT
                  </Link>
                  <Link
                    href="/films"
                    className="w-full inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 text-white text-[12px] font-normal uppercase tracking-[3px] transition-all duration-300 hover:border-white hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      fontFamily: '"Questrial", sans-serif',
                    }}
                  >
                    VIEW WEDDINGS
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
