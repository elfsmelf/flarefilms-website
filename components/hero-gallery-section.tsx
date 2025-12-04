"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

type HeroGallerySectionProps = {
  title?: string
  subtitle?: string
  images?: {
    leftLandscape: string
    centerTall: string
    centerPortrait: string
    rightLandscape: string
  }
}

const defaultImages = {
  leftLandscape: "https://assets.guestsnapper.com/wedding-gallery-media/Jess-and-Braydan-24-scaled.jpg",
  centerTall: "https://assets.guestsnapper.com/wedding-gallery-media/lena-2.webp",
  centerPortrait: "https://assets.guestsnapper.com/wedding-gallery-media/dasuni%20and%20luke.webp",
  rightLandscape: "https://assets.guestsnapper.com/wedding-gallery-media/Natasha-and-Jono-18.webp",
}

export const HeroGallerySection = ({
  title = "Let's Make SOME MAGIC!",
  subtitle = "Your Journey Starts Here.",
  images = defaultImages,
}: HeroGallerySectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const yLeft = useTransform(scrollYProgress, [0, 1], [50, -50])
  const yCenter = useTransform(scrollYProgress, [0, 1], [0, -100])
  const yRight = useTransform(scrollYProgress, [0, 1], [80, -80])

  const smoothLeft = useSpring(yLeft, { stiffness: 100, damping: 30 })
  const smoothCenter = useSpring(yCenter, { stiffness: 100, damping: 30 })
  const smoothRight = useSpring(yRight, { stiffness: 100, damping: 30 })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: "easeOut" as const },
    }),
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#24221d] text-white overflow-hidden py-24 px-4 sm:px-8 flex items-center justify-center font-sans"
    >
      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* LEFT COLUMN */}
          <motion.div
            style={{ y: smoothLeft }}
            className="lg:col-span-4 flex flex-col gap-16 lg:gap-32 lg:pt-20 order-2 lg:order-1"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1}
              variants={fadeIn}
              className="relative z-20 text-center lg:text-left px-4"
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-[5rem] leading-[1.1] tracking-tight font-light text-white">
                <span className="block">Let's Make</span>
                <span className="block italic font-normal">SOME MAGIC!</span>
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.4}
              variants={fadeIn}
              className="relative w-full aspect-[3/2] lg:w-[110%] lg:-mr-[10%]"
            >
              <img
                src={images.leftLandscape || "/placeholder.svg"}
                alt="Couple running"
                className="w-full h-full object-cover shadow-2xl"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity hover:bg-black/0" />
            </motion.div>
          </motion.div>

          {/* CENTER COLUMN */}
          <motion.div
            style={{ y: smoothCenter }}
            className="lg:col-span-4 flex flex-col items-center gap-12 lg:-mt-12 order-1 lg:order-2"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2}
              variants={fadeIn}
              className="relative w-full max-w-md lg:max-w-full aspect-[2/3] p-[10px] bg-[#302d26] shadow-2xl z-10"
            >
              <img
                src={images.centerTall || "/placeholder.svg"}
                alt="Bride portrait"
                className="w-full h-full object-cover block"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.6}
              variants={fadeIn}
              className="relative w-[85%] aspect-[4/5] z-0 -mt-8 lg:mt-8 shadow-xl"
            >
              <img
                src={images.centerPortrait || "/placeholder.svg"}
                alt="Portrait detail"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            style={{ y: smoothRight }}
            className="lg:col-span-4 flex flex-col gap-16 lg:gap-24 lg:pt-40 order-3"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.3}
              variants={fadeIn}
              className="text-center lg:text-center px-4"
            >
              <h3 className="font-serif text-3xl md:text-4xl lg:text-[2.5rem] font-light italic leading-tight text-white/90">
                {subtitle}
              </h3>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              variants={fadeIn}
              className="relative w-full aspect-[16/10] p-[10px] bg-[#302d26] shadow-2xl lg:-ml-[10%] lg:w-[110%]"
            >
              <img
                src={images.rightLandscape || "/placeholder.svg"}
                alt="Romantic moment"
                className="w-full h-full object-cover block"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
