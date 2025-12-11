"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, User, Film, Heart, DollarSign, MessageCircle } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "4-Week Guaranteed Delivery",
    description: "No waiting 6 months wondering when your film will arrive. You'll have your complete wedding film in 4 weeks — guaranteed. If I'm late, you get $1,000 back. No excuses.",
  },
  {
    icon: User,
    title: "One Filmmaker. Start to Finish.",
    description: "I shoot and edit every wedding myself. No subcontractors, no random person showing up on your day. You know exactly who you're getting.",
  },
  {
    icon: Film,
    title: "3-Day Sneak Peek",
    description: "Three days after your wedding, you'll have a 60-second film to watch and share — while everyone's still buzzing about your day.",
  },
  {
    icon: Heart,
    title: "Real Moments. Not Slideshows.",
    description: "I'm not interested in slow-motion confetti and generic music. Your film should feel like your day actually felt — the emotions, the laughter, the tears.",
  },
  {
    icon: DollarSign,
    title: "Full Pricing Upfront",
    description: "No awkward sales calls. No hidden fees. You'll see exactly what everything costs before we even speak.",
  },
  {
    icon: MessageCircle,
    title: "24-Hour Reply Promise",
    description: "Every message answered within 24 hours. No chasing. No ghosting. No wondering what's happening.",
  },
]

export function PromiseSection() {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#24221d] text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-wide">
            Why Couples Choose Flare Films
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#b8a862] mb-5">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-cormorant text-xl md:text-2xl text-white mb-3">
                {feature.title}
              </h3>
              <p className="font-sans text-white/80 text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#films"
              className="inline-block bg-[#b8a862] hover:bg-[#a69752] text-white px-8 md:px-12 py-4 text-sm md:text-base font-sans uppercase tracking-[0.15em] transition-colors duration-300"
            >
              Watch My Films
            </Link>
            <Link
              href="#pricing"
              className="inline-block bg-white hover:bg-gray-100 text-[#24221d] px-8 md:px-12 py-4 text-sm md:text-base font-sans uppercase tracking-[0.15em] transition-colors duration-300"
            >
              See Pricing
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
