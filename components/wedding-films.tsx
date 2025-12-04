"use client"

import { motion } from "framer-motion"

// Assets
const BG_VECTOR_URL = "https://shared-pw-fonts.s3.us-west-2.amazonaws.com/pw-icons-theme-8/info-b-vector.svg"
const IMAGE_URL = "https://assets.guestsnapper.com/wedding-gallery-media/ben-and-sierra%203.webp"

// Text Content Data
const TITLE = "Does this sound like you?"
const QUESTIONS = [
  "You're camera-shy and a little nervous about looking natural in front of the lens.",
  "You want authentic, emotional footage—not stiff, awkward moments that make you cringe.",
  "Your ideal wedding feels like a celebration, not a film set.",
  "You're here to marry your best friend and party like there's no tomorrow.",
]
const CONCLUSION = "Perfect. You're in the right place..."

// Animation variants
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
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
      ease: "easeOut",
    },
  },
}

export function WeddingFilms() {
  return (
    <div className="relative w-full overflow-hidden bg-[#E7E4DF] px-6 py-24 md:py-32 lg:px-12 xl:px-0">
      {/* Decorative Background Vector */}
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[80%] bg-no-repeat opacity-60 md:block lg:opacity-100"
        style={{
          backgroundImage: `url(${BG_VECTOR_URL})`,
          backgroundPosition: "right center",
          backgroundSize: "contain",
        }}
      />

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-center lg:flex-row lg:gap-24">
        {/* Left Column: Image Area */}
        <motion.div
          className="relative mb-16 w-full max-w-[500px] flex-shrink-0 lg:mb-0 lg:w-[45%]"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          variants={imageReveal}
        >
          <div className="relative z-10 px-6 sm:px-12 lg:px-8">
            {/* The Image Wrapper */}
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-sm">
              <img
                src={IMAGE_URL || "/placeholder.svg"}
                alt="Photographer Portrait"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Column: Text Content */}
        <div className="relative z-10 w-full max-w-[600px] lg:w-[45%] lg:pr-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-50px",
            }}
          >
            {/* Title */}
            <motion.h2
              className="mb-12 font-serif text-4xl font-light leading-tight text-[#5A534B] antialiased md:text-5xl lg:text-[48px]"
              variants={fadeInUp}
              custom={0}
            >
              {TITLE}
            </motion.h2>

            {/* Questions List */}
            <div className="space-y-6 text-[#7B756C]">
              {QUESTIONS.map((question, index) => (
                <motion.div
                  key={index}
                  className="flex gap-3 text-base font-sans leading-relaxed tracking-tight md:text-lg"
                  variants={fadeInUp}
                  custom={index + 1}
                >
                  <span className="shrink-0 select-none font-medium">+</span>
                  <p>{question}</p>
                </motion.div>
              ))}

              {/* Conclusion Text */}
              <motion.p
                className="mt-8 block pt-4 text-base font-sans leading-relaxed tracking-tight md:text-lg"
                variants={fadeInUp}
                custom={5}
              >
                {CONCLUSION}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
