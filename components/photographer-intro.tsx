"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ReactNode } from "react"

type PhotographerIntroProps = {
  title?: string
  paragraph1?: ReactNode
  paragraph2?: ReactNode
  paragraph3?: ReactNode
}

const defaultContent = {
  paragraph1: "You deserve the absolute best. That's why I want to make sure I'm the right choice for you.",
  paragraph2: (
    <>
      I do not take every wedding I'm approached to film. It's truly important that I work with couples who share the same values.
    </>
  ),
  paragraph3: (
    <>
      I'd love to hear more about you and your story. If you haven't already, take a moment to{" "}
      <Link href="/films" className="text-[#b8a862] hover:underline">
        view my wedding films
      </Link>{" "}
      and{" "}
      <Link href="/pricing" className="text-[#b8a862] hover:underline">
        check my packages
      </Link>
      . Then fill out the contact form below and I'll be in touch as soon as humanly possible.
    </>
  ),
}

export const PhotographerIntro = ({
  paragraph1 = defaultContent.paragraph1,
  paragraph2 = defaultContent.paragraph2,
  paragraph3 = defaultContent.paragraph3,
}: PhotographerIntroProps) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      className="w-full relative overflow-hidden flex justify-center items-center"
      style={{ backgroundColor: "rgb(36, 34, 29)" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 py-20 md:py-32 lg:px-[121.8px] lg:py-[135.6px]">
        <div className="flex flex-wrap justify-center w-full">
          <div className="w-full md:w-10/12 lg:w-8/12 max-w-[960px]">
            <motion.div
              className="text-white font-sans"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <div
                className="flex flex-col gap-6 text-[18px] leading-[27px] font-normal tracking-[0.4px]"
                style={{ fontFamily: '"Work Sans", sans-serif' }}
              >
                <motion.p variants={itemVariants} className="antialiased">
                  {paragraph1}
                </motion.p>

                <motion.p variants={itemVariants} className="antialiased">
                  {paragraph2}
                </motion.p>

                <motion.p variants={itemVariants} className="antialiased">
                  {paragraph3}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
