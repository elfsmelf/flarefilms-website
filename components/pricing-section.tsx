"use client"

import { PricingHeader } from "./pricing-header"
import { ServicePricingCards } from "./pricing-cards"
import { motion } from "framer-motion"

export function PricingSection() {
  return (
    <section className="w-full bg-[#E7E4DF]">
      <PricingHeader title="No hidden pricing." />
      <ServicePricingCards />

      <div className="w-full bg-[#E7E4DF] flex justify-center pt-12 pb-20 px-6">
        <motion.a
          href="/pricing"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-block px-10 py-4 border border-[#5A534B] text-[#5A534B] font-sans text-sm tracking-[1px] uppercase transition-all duration-300 hover:bg-[#5A534B] hover:text-white"
        >
          Full Pricing & FAQ's
        </motion.a>
      </div>
    </section>
  )
}
