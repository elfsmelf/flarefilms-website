"use client"
import { motion } from "framer-motion"

// Font imports to match the original design exactly
const FontStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Questrial&display=swap');
      
      .font-cormorant {
        font-family: 'Cormorant Garamond', serif;
      }
      
      .font-questrial {
        font-family: 'Questrial', sans-serif;
      }
    `}
  </style>
)
const LOGOS = [
  {
    name: "Easy Weddings",
    src: "/images/2020/10/easy-weddings-logo-3.png",
    width: 147,
    height: 42,
  },
  {
    name: "Brides",
    src: "/images/2020/10/brides-logo-2.png",
    width: 142,
    height: 60,
  },
  {
    name: "Modern Wedding",
    src: "/images/2020/10/modern-wedding-logo-1.png",
    width: 142,
    height: 58,
  },
  {
    name: "The Bride's Tree",
    src: "https://www.flarefilms.com.au/wp-content/uploads/2020/10/thebridestree_logo-1024x215.png",
    width: 142,
    height: 30,
  },
] as any[]

// @component: AwardsRecognition
export const AwardsRecognition = () => {
  // @return
  return (
    <div className="w-full bg-white text-[#333] overflow-hidden">
      <FontStyles />

      <section className="max-w-[1936px] mx-auto px-4 py-[80px] md:py-[120px]">
        {/* Main Title Section */}
        <div className="flex flex-col items-center justify-center mb-8">
          <motion.h2
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
              ease: "easeOut",
            }}
            className="font-cormorant text-[36px] md:text-[53px] leading-tight md:leading-[47.8px] uppercase tracking-[3px] md:tracking-[5px] text-center text-gray-900 mb-8"
          >
            Awards & Recognition
          </motion.h2>

          {/* Decorative vertical separator */}
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            whileInView={{
              opacity: 1,
              height: 30,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            className="h-[30px] border-r border-[#c5c5c5] mx-auto"
            aria-hidden="true"
          />
        </div>

        {/* Logos Section */}
        <div className="w-full max-w-[1140px] mx-auto mt-8 md:mt-12">
          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {/* "As Seen In" Label */}
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="flex items-center justify-center min-w-[140px]"
            >
              <p className="font-questrial text-[16px] uppercase tracking-[3px] text-gray-800 text-center md:text-left whitespace-nowrap">
                as seen in
              </p>
            </motion.div>

            {/* Logo Grid */}
            {LOGOS.map((logo, index) => (
              <motion.div
                key={logo.name}
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
                  duration: 0.5,
                  delay: 0.3 + index * 0.1,
                }}
                className="flex items-center justify-center p-2"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={logo.height}
                  className="max-w-[150px] md:max-w-[160px] max-h-[60px] w-auto h-auto object-contain transition-opacity duration-300 hover:opacity-80"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
