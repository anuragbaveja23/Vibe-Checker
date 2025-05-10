"use client"

import { motion } from "framer-motion"

interface CompatibilityMeterProps {
  vibeType: string
  description: string
  vibeDescriptions: Record<string, any>
}

export default function CompatibilityMeter({ vibeType, description, vibeDescriptions }: CompatibilityMeterProps) {
  const vibe = vibeDescriptions[vibeType as keyof typeof vibeDescriptions]
  const compatibilityLevel = description.startsWith("High") ? 3 : description.startsWith("Medium") ? 2 : 1

  return (
    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
      <div
        className={`w-10 h-10 rounded-full bg-gradient-to-r ${vibe.color} flex items-center justify-center text-white text-lg mr-3`}
      >
        {vibe.emoji}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-gray-800">{vibe.title.replace("The ", "")}</span>
          <span className="text-xs text-gray-500">{description.split(" - ")[0]}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(compatibilityLevel / 3) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-full bg-gradient-to-r ${vibe.color}`}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">{description.split(" - ")[1]}</p>
      </div>
    </div>
  )
}
