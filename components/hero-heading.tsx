"use client"
import { motion } from "framer-motion"

type HeroHeadingProps = {
  title?: string
  className?: string
}

export const HeroHeading = ({ title = "You've got questions? I've got answers!", className }: HeroHeadingProps) => {
  return (
    <section
      className={`w-full bg-[#24221d] text-white overflow-hidden ${className}`}
      style={{ padding: "135px 20px" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[120px]">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-5xl text-center relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mx-auto font-serif"
              style={{
                fontWeight: 100,
                fontSize: "clamp(32px, 5vw, 64px)",
                lineHeight: "1.1",
                letterSpacing: "-1.2px",
                color: "rgb(255, 255, 255)",
                maxWidth: "100%",
                overflowWrap: "break-word",
              }}
            >
              {title}
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  )
}
