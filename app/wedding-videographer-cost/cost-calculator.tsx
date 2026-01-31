"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const statePricing: Record<string, { base: number; perHour: number }> = {
  QLD: { base: 1800, perHour: 180 },
  NSW: { base: 2000, perHour: 200 },
  VIC: { base: 1900, perHour: 190 },
  SA: { base: 1700, perHour: 170 },
  WA: { base: 1800, perHour: 180 },
  TAS: { base: 1600, perHour: 160 },
  NT: { base: 1700, perHour: 170 },
  ACT: { base: 1900, perHour: 190 },
}

const extras = [
  { id: "drone", label: "Drone Footage", price: 350 },
  { id: "social", label: "48hr Social Media Trailer", price: 250 },
  { id: "rawFootage", label: "Raw Footage", price: 400 },
  { id: "secondShooter", label: "Second Videographer", price: 500 },
  { id: "rehearsal", label: "Rehearsal Dinner Coverage", price: 600 },
]

export function CostCalculator() {
  const [state, setState] = useState<string>("QLD")
  const [hours, setHours] = useState<number>(8)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    )
  }

  const calculatePrice = () => {
    const pricing = statePricing[state]
    const basePrice = pricing.base + pricing.perHour * hours
    const extrasPrice = selectedExtras.reduce((total, extraId) => {
      const extra = extras.find((e) => e.id === extraId)
      return total + (extra?.price || 0)
    }, 0)
    return basePrice + extrasPrice
  }

  const handleCalculate = () => {
    setShowResult(true)
  }

  const estimatedPrice = calculatePrice()
  const lowRange = Math.round(estimatedPrice * 0.85)
  const highRange = Math.round(estimatedPrice * 1.15)

  return (
    <div className="space-y-8">
      {/* State Selection */}
      <div>
        <label className="block font-sans text-sm uppercase tracking-wide text-[#5a534b] mb-3">
          Your State
        </label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {Object.keys(statePricing).map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`py-3 px-4 text-sm font-sans uppercase tracking-wide transition-colors duration-200 ${
                state === s
                  ? "bg-[#b8a862] text-white"
                  : "bg-[#f8f7f5] text-[#5a534b] hover:bg-[#e7e4df]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Hours Selection */}
      <div>
        <label className="block font-sans text-sm uppercase tracking-wide text-[#5a534b] mb-3">
          Hours of Coverage: <span className="text-[#b8a862]">{hours} hours</span>
        </label>
        <input
          type="range"
          min="4"
          max="14"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          className="w-full h-2 bg-[#e7e4df] rounded-lg appearance-none cursor-pointer accent-[#b8a862]"
        />
        <div className="flex justify-between text-xs text-[#7b756c] mt-2 font-serif">
          <span>4 hrs (Ceremony)</span>
          <span>8 hrs (Half Day)</span>
          <span>14 hrs (Full Day)</span>
        </div>
      </div>

      {/* Extras Selection */}
      <div>
        <label className="block font-sans text-sm uppercase tracking-wide text-[#5a534b] mb-3">
          Add-ons (Optional)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {extras.map((extra) => (
            <button
              key={extra.id}
              onClick={() => toggleExtra(extra.id)}
              className={`flex items-center justify-between p-4 text-left transition-colors duration-200 ${
                selectedExtras.includes(extra.id)
                  ? "bg-[#b8a862]/10 border-2 border-[#b8a862]"
                  : "bg-[#f8f7f5] border-2 border-transparent hover:border-[#e7e4df]"
              }`}
            >
              <span className="font-serif text-[#5a534b]">{extra.label}</span>
              <span className="font-sans text-sm text-[#b8a862]">+${extra.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full bg-[#b8a862] text-white py-4 font-sans text-sm uppercase tracking-wide hover:bg-[#a09556] transition-colors duration-200"
      >
        Calculate My Wedding Video Price
      </button>

      {/* Result */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#4a5347] p-8 text-center"
          >
            <p className="font-serif text-[#e8e3d8] mb-2">
              Based on your selections, you can expect to pay approximately:
            </p>
            <p className="font-cormorant text-5xl md:text-6xl text-[#d4c9a0] my-4">
              ${lowRange.toLocaleString()} - ${highRange.toLocaleString()}
            </p>
            <p className="font-serif text-sm text-[#C7C5BF] mb-6">
              for a wedding videographer in {state}
            </p>

            <div className="border-t border-[#5a6357] pt-6 mt-6">
              <p className="font-serif text-[#e8e3d8] mb-4">
                Want to see our actual pricing? Flare Films offers all-day coverage starting from $2,500.
              </p>
              <a
                href="/#packages"
                className="inline-block border border-[#d4c9a0] px-8 py-3 text-sm font-sans uppercase tracking-wide text-[#d4c9a0] hover:bg-[#d4c9a0] hover:text-[#4a5347] transition-colors duration-300"
              >
                View Our Packages
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disclaimer */}
      <p className="font-serif text-xs text-[#9B9589] text-center">
        *Prices are estimates based on research of 120+ Australian wedding videographers. Actual prices may vary based on specific requirements and videographer.
      </p>
    </div>
  )
}
