"use client"

import { motion } from "framer-motion"

interface PersonalityTraitsProps {
  traits: string[]
}

export default function PersonalityTraits({ traits }: PersonalityTraitsProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Personality Traits</h3>
      <div className="flex flex-wrap gap-2">
        {traits.map((trait, index) => (
          <motion.div
            key={trait}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {trait}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
