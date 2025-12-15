"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

type ProcessStep = {
  id: string
  title: string
  content: React.ReactNode[]
}

const steps: ProcessStep[] = [
  {
    id: "01",
    title: "I. Let's Meet",
    content: [
      "Fill out the contact form at the bottom of the page and we can organise a meeting over Zoom. During our meeting you can ask as many questions as you'd like and get a feel for what it'll be like working together.",
      "There is zero obligation to book during our catch up, so no pressure whatsoever. I want you to feel 100% comfortable and confident in your booking once we've hashed out all the details. If you're in, I'm in! Please note that I do book out pretty far in advance, so it's best to get in touch with me sooner rather than later, to avoid any disappointment.",
    ],
  },
  {
    id: "02",
    title: "II. Film your day",
    content: [
      "I'll show up excited and ready to film your day - without missing a beat. I will be watching out for every special moment so that you can simply enjoy the day!",
      "I would have already guided you through the whole planning process leading up to this amazing day, this is where you can kick back and enjoy because you'll know I've done all I can to make sure this day is perfect for you.",
    ],
  },
  {
    id: "03",
    title: "III. Deliver memories",
    content: [
      "Let's relive your big day all over again! I know you can't wait so I'll send you a sneak peek within 3 days of your wedding.",
      "4 weeks after your wedding your full highlight film will be ready. Grab some wine and get cosy because here's the final unveiling. Hop online to view your wedding film.",
    ],
  },
]

const fadeIn = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
}

const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
}

export const PhotographyProcessFlow = () => {
  return (
    <section className="min-h-screen w-full bg-[#302d26] text-white py-16 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Header + Image */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-100px",
              }}
              variants={fadeIn}
            >
              <h2 className="text-4xl md:text-5xl lg:text-[48px] font-serif font-light tracking-wide text-white/95">
                What Now?
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-100px",
              }}
              variants={imageReveal}
              className="relative w-full aspect-[2/3] lg:aspect-auto lg:h-[930px] overflow-hidden bg-black/20"
            >
              <Image
                src="https://assets.guestsnapper.com/wedding-gallery-media/richard-photo-5.webp"
                alt="Richard Portrait"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 hover:bg-black/10" />
            </motion.div>
          </div>

          {/* Right Column: Steps Content */}
          <div className="lg:col-span-7 flex flex-col pt-0 lg:pt-32">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step Item */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    margin: "-50px",
                  }}
                  variants={fadeIn}
                  className="flex flex-col gap-6 mb-12"
                >
                  <h3 className="text-4xl md:text-5xl lg:text-[64px] font-serif font-light tracking-tight leading-tight">
                    {step.title}
                  </h3>

                  <div className="flex flex-col gap-6 max-w-2xl text-base md:text-lg leading-relaxed font-sans font-light text-gray-200/90 tracking-wide">
                    {step.content.map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                </motion.div>

                {/* Divider Line (not after the last item) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{
                      scaleX: 0,
                      opacity: 0,
                    }}
                    whileInView={{
                      scaleX: 1,
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                    }}
                    className="w-full max-w-2xl h-[1px] bg-[#535049] mb-12 origin-left"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
