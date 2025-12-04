"use client"
import { motion } from "framer-motion"
import Link from "next/link"
const PRICING_TIERS = [
  {
    id: 1,
    title: "7 Hours",
    price: "$2,800",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/paula.webp",
    width: 1500,
    height: 2250, // estimated aspect based on common photography ratios
  },
  {
    id: 2,
    title: "9 Hours",
    price: "$3,500",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/wedding%20couple-3.webp",
    width: 1500,
    height: 2250,
  },
  {
    id: 3,
    title: "All Day Coverage",
    price: "$4,000",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/nicole%20and%20josh%20(1).webp",
    width: 1500,
    height: 2250,
  },
] as any[]

// Animation variants for staggered reveal
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1.0] as [number, number, number, number],
    },
  },
}

// @component: ServicePricingCards
export const ServicePricingCards = () => {
  // @return
  return (
    <div className="w-full bg-[#E7E4DF] py-12 px-6 md:px-[60px] lg:px-[120px] flex justify-center items-start overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div key={tier.id} className="flex flex-col items-center" variants={itemVariants}>
              <Link href="/pricing" className="w-full flex flex-col items-center no-underline">
                {/* Image Container */}
                <div className="w-full relative group cursor-pointer">
                  <div className="overflow-hidden w-full">
                    <motion.img
                      src={tier.image}
                      alt={`${tier.title} Photography Package`}
                      className="w-full h-auto object-cover block transition-opacity duration-300"
                      loading="lazy"
                      whileHover={{
                        scale: 1.02,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                    />
                  </div>
                  {/* Tint overlay simulated from original CSS */}
                  <div className="absolute inset-0 bg-transparent pointer-events-none" />
                </div>

                {/* Text Container */}
                <div className="mt-[50px] text-center w-full flex flex-col items-center">
                  <h5 className="text-[#5A534B] font-medium text-[16px] leading-[19.2px] tracking-[1px] uppercase mb-0 font-sans">
                    {tier.title}
                  </h5>
                  <p className="text-[#7B756C] font-normal text-[18px] leading-[27px] tracking-[0.4px] mt-2 mb-0 font-sans">
                    {tier.price}
                  </p>
                  {/* Spacer/Empty paragraph from original design */}
                  <div className="h-6" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
