"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-3">
              Vibe Check
            </h1>
            <p className="text-gray-600 text-lg">Discover your true vibe in just 5 questions</p>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            <motion.div variants={item} className="flex items-center p-4 bg-pink-50 rounded-lg">
              <span className="text-3xl mr-4">✨</span>
              <div>
                <h3 className="font-medium text-gray-800">Quick & Fun</h3>
                <p className="text-sm text-gray-600">5-minute personality quiz with instant results</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex items-center p-4 bg-purple-50 rounded-lg">
              <span className="text-3xl mr-4">🔮</span>
              <div>
                <h3 className="font-medium text-gray-800">Detailed Insights</h3>
                <p className="text-sm text-gray-600">Get your unique vibe profile with personality traits</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex items-center p-4 bg-indigo-50 rounded-lg">
              <span className="text-3xl mr-4">🚀</span>
              <div>
                <h3 className="font-medium text-gray-800">Shareable Results</h3>
                <p className="text-sm text-gray-600">Compare your vibe with friends and find compatibility</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8"
          >
            <Link href="/quiz">
              <Button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white py-6 rounded-lg text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                Start Quiz <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-gray-50 p-5 text-center"
        >
          <p className="text-gray-500">
            Already taken the quiz?{" "}
            <Link href="/results/random" className="text-violet-500 font-medium hover:underline">
              See example results
            </Link>
          </p>
          <p className="text-xs text-gray-400 mt-1">Join 10,000+ people who discovered their vibe</p>
        </motion.div>
      </motion.div>
    </main>
  )
}
