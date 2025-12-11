"use client"

import { motion } from "framer-motion"
import { Shield, Clock } from "lucide-react"

const guarantees = [
  {
    icon: Clock,
    title: "4-Week Delivery Guarantee",
    description: "Your complete wedding film delivered in 4 weeks or you get <strong>$1,000</strong> back. I've built my entire workflow around this promise — no exceptions.",
  },
  {
    icon: Shield,
    title: "24-Hour Communication Promise",
    description: "Every email, every question — answered within 24 hours. You'll never be left wondering what's happening with your film.",
  },
]

export function GuaranteeSection() {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#f8f7f5]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#5A534B] uppercase tracking-wide leading-tight">
            Your Wedding Happens Once —<br />
            I Guarantee I'll Get It Right
          </h2>
        </motion.div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#b8a862]/10 mb-5">
                <guarantee.icon className="w-8 h-8 text-[#b8a862]" />
              </div>
              <h3 className="font-cormorant text-xl md:text-2xl text-[#5A534B] mb-3">
                {guarantee.title}
              </h3>
              <p
                className="font-sans text-[#7B756C] text-sm md:text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: guarantee.description }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
