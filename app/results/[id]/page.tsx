"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Share2, ArrowLeft, Twitter, Facebook, Sparkles, Download, Copy } from "lucide-react"
import { motion } from "framer-motion"
import VibeChart from "@/components/vibe-chart"
import ConfettiExplosion from "react-confetti-explosion"
import { useToast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CompatibilityMeter from "@/components/compatibility-meter"
import PersonalityTraits from "@/components/personality-traits"

export default function ResultsPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const vibe = searchParams.get("vibe") || "chill"
  const energetic = Number.parseInt(searchParams.get("e") || "0")
  const chill = Number.parseInt(searchParams.get("c") || "0")
  const creative = Number.parseInt(searchParams.get("cr") || "0")
  const adventurous = Number.parseInt(searchParams.get("a") || "0")
  const timeSpent = Number.parseInt(searchParams.get("t") || "0")

  const [isExploding, setIsExploding] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showCompatibility, setShowCompatibility] = useState(false)

  useEffect(() => {
    setIsExploding(true)

    // Play celebration sound
    const audio = new Audio("/sounds/success.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Track completion
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "quiz_completed", {
        vibe_type: vibe,
        time_spent: timeSpent,
      })
    }
  }, [vibe, timeSpent])

  const vibeData = {
    energetic,
    chill,
    creative,
    adventurous,
  }

  const vibeDescriptions = {
    energetic: {
      title: "The Energetic Vibe",
      emoji: "⚡",
      description:
        "You're the life of the party! Your vibrant energy lights up any room. You thrive in social settings and love bringing people together.",
      color: "from-yellow-400 to-orange-500",
      traits: ["Enthusiastic", "Social", "Outgoing", "Expressive", "Dynamic"],
      compatibility: {
        energetic: "High - You feed off each other's energy!",
        creative: "Medium - You inspire each other's passions",
        chill: "Medium - They help you slow down and reflect",
        adventurous: "High - You're both always ready for action!",
      },
    },
    chill: {
      title: "The Chill Vibe",
      emoji: "😌",
      description:
        "You're calm, collected, and thoughtful. You bring a peaceful presence to any situation and value meaningful connections over small talk.",
      color: "from-blue-400 to-cyan-500",
      traits: ["Calm", "Thoughtful", "Patient", "Observant", "Grounded"],
      compatibility: {
        energetic: "Medium - They bring excitement to your calm",
        creative: "High - You both appreciate depth and meaning",
        chill: "High - Peaceful harmony together",
        adventurous: "Medium - They push you out of your comfort zone",
      },
    },
    creative: {
      title: "The Creative Vibe",
      emoji: "🎨",
      description:
        "Your imagination knows no bounds! You see the world through a unique lens and express yourself in ways that inspire others.",
      color: "from-purple-400 to-pink-500",
      traits: ["Imaginative", "Expressive", "Innovative", "Perceptive", "Artistic"],
      compatibility: {
        energetic: "Medium - They help you share your creations",
        creative: "High - Endless inspiration together",
        chill: "High - They provide the calm you need to create",
        adventurous: "Medium - They help bring your ideas to life",
      },
    },
    adventurous: {
      title: "The Adventurous Vibe",
      emoji: "🚀",
      description:
        "You're always ready for the next challenge! Your bold spirit and courage inspire others to step outside their comfort zones.",
      color: "from-green-400 to-emerald-500",
      traits: ["Bold", "Courageous", "Spontaneous", "Resilient", "Curious"],
      compatibility: {
        energetic: "High - You both love excitement and action",
        creative: "Medium - They bring fresh perspectives to your adventures",
        chill: "Medium - They help you reflect on your experiences",
        adventurous: "High - Unstoppable together!",
      },
    },
  }

  const currentVibe = vibeDescriptions[vibe as keyof typeof vibeDescriptions]

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Vibe Check Results: ${currentVibe.title}`,
        text: `I just took the Vibe Check quiz and my dominant vibe is ${currentVibe.title}! Take the quiz to find your vibe!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "Share it with your friends to compare vibes",
        duration: 3000,
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadImage = () => {
    const resultElement = document.getElementById("result-card")
    if (!resultElement) return

    toast({
      title: "Coming soon!",
      description: "This feature will be available in the next update",
      duration: 3000,
    })
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500">
      {isExploding && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2">
          <ConfettiExplosion force={0.8} duration={3000} particleCount={150} width={1600} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden"
        id="result-card"
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${currentVibe.color} text-white text-5xl mb-4 shadow-lg`}
            >
              {currentVibe.emoji}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-gray-800"
            >
              {currentVibe.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 mt-2"
            >
              {currentVibe.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6 h-64"
          >
            <VibeChart data={vibeData} />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <PersonalityTraits traits={currentVibe.traits} />
          </motion.div>

          {showCompatibility && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Vibe Compatibility</h3>
              <div className="space-y-3">
                {Object.entries(currentVibe.compatibility).map(([vibeType, description]) => (
                  <CompatibilityMeter
                    key={vibeType}
                    vibeType={vibeType}
                    description={description}
                    vibeDescriptions={vibeDescriptions}
                  />
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col gap-3 mt-6"
          >
            <Button
              onClick={() => setShowCompatibility(!showCompatibility)}
              variant="outline"
              className="w-full border-violet-200 text-violet-600 hover:bg-violet-50"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {showCompatibility ? "Hide Compatibility" : "Show Compatibility"}
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Results
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={shareResults}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=I just took the Vibe Check quiz and my dominant vibe is ${currentVibe.title}! Take the quiz to find your vibe!&url=${encodeURIComponent(window.location.href)}`,
                        "_blank",
                      )
                    }
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Share on Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                        "_blank",
                      )
                    }
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Share on Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={downloadImage}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Image
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Take Again
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
