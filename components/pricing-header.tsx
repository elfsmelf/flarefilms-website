"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type PricingHeaderProps = {
  title?: string
  className?: string
}

// @component: PricingHeader
export const PricingHeader = ({ title = "No hidden pricing.", className }: PricingHeaderProps) => {
  // @return
  return (
    <div
      className={cn(
        "w-full bg-[#E7E4DF] flex justify-center items-center overflow-hidden",
        "pt-20 pb-12 px-6 md:px-[121px]",
        className,
      )}
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center">
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
            duration: 0.8,
            ease: "easeOut" as const,
          }}
          className="relative w-full max-w-full"
        >
          <h3
            className={cn(
              "font-serif text-[#5A534B] text-[32px] md:text-[40px] leading-[1.1] md:leading-[44px]",
              "font-thin tracking-tight text-center break-words antialiased",
              "mx-auto max-w-[800px]", // Constraint to ensure clean wrapping if text gets long
            )}
            style={{
              fontWeight: 100,
            }} // Tailwind 'font-thin' is 100, but explicit inline style guarantees it overrides generic resets
          >
            {title}
          </h3>
        </motion.div>
      </div>
    </div>
  )
}
