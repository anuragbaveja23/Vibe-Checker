"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"

const questions = [
  {
    id: 1,
    question: "How do you recharge after a long day?",
    options: [
      { text: "Party with friends", vibe: "energetic", icon: "🎉" },
      { text: "Netflix and chill", vibe: "chill", icon: "🍿" },
      { text: "Creative hobby", vibe: "creative", icon: "🎨" },
      { text: "Outdoor adventure", vibe: "adventurous", icon: "🏞️" },
    ],
  },
  {
    id: 2,
    question: "What's your ideal weekend activity?",
    options: [
      { text: "Hiking or camping", vibe: "adventurous", icon: "⛺" },
      { text: "Art gallery or museum", vibe: "creative", icon: "🏛️" },
      { text: "Club or concert", vibe: "energetic", icon: "🎵" },
      { text: "Reading or gaming", vibe: "chill", icon: "📚" },
    ],
  },
  {
    id: 3,
    question: "What's your communication style?",
    options: [
      { text: "Thoughtful and measured", vibe: "chill", icon: "🧠" },
      { text: "Enthusiastic and expressive", vibe: "energetic", icon: "🗣️" },
      { text: "Metaphorical and visual", vibe: "creative", icon: "🎭" },
      { text: "Direct and action-oriented", vibe: "adventurous", icon: "🎯" },
    ],
  },
  {
    id: 4,
    question: "How do you approach challenges?",
    options: [
      { text: "Think outside the box", vibe: "creative", icon: "💡" },
      { text: "Take risks and dive in", vibe: "adventurous", icon: "🏄" },
      { text: "Analyze and plan carefully", vibe: "chill", icon: "📊" },
      { text: "Rally people and tackle it together", vibe: "energetic", icon: "👥" },
    ],
  },
  {
    id: 5,
    question: "What's your social media style?",
    options: [
      { text: "Rarely post, mostly observe", vibe: "chill", icon: "👁️" },
      { text: "Share adventures and travels", vibe: "adventurous", icon: "✈️" },
      { text: "Post artistic content and creations", vibe: "creative", icon: "📸" },
      { text: "Document social events and gatherings", vibe: "energetic", icon: "👯" },
    ],
  },
]

export default function QuizPage() {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAnswer = (vibe: string) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setDirection(1)

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = vibe
    setAnswers(newAnswers)

    // Play sound effect
    const audio = new Audio("/sounds/click.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Calculate results
        const vibes = {
          energetic: 0,
          chill: 0,
          creative: 0,
          adventurous: 0,
        }

        newAnswers.forEach((vibe) => {
          vibes[vibe as keyof typeof vibes]++
        })

        // Find dominant vibe
        let dominantVibe = "chill"
        let maxCount = 0

        Object.entries(vibes).forEach(([vibe, count]) => {
          if (count > maxCount) {
            dominantVibe = vibe
            maxCount = count
          }
        })

        // Generate a unique ID based on answers
        const resultId = btoa(newAnswers.join("-") + "-" + timeSpent)

        // Show completion toast
        toast({
          title: "Quiz completed!",
          description: "Generating your personalized vibe profile...",
          duration: 3000,
        })

        // Navigate to results page
        router.push(
          `/results/${resultId}?vibe=${dominantVibe}&e=${vibes.energetic}&c=${vibes.chill}&cr=${vibes.creative}&a=${vibes.adventurous}&t=${timeSpent}`,
        )
      }
      setIsTransitioning(false)
    }, 500)
  }

  const goBack = () => {
    if (currentQuestion > 0 && !isTransitioning) {
      setIsTransitioning(true)
      setDirection(-1)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1)
        setIsTransitioning(false)
      }, 500)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 text-violet-500 mr-1" />
                <p className="text-sm font-medium text-violet-500">{Math.floor(progress)}% Complete</p>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-gray-100" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ x: direction * 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{questions[currentQuestion].question}</h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left p-4 h-auto ${
                        answers[currentQuestion] === option.vibe
                          ? "border-violet-500 bg-violet-50 text-violet-700 shadow-md"
                          : "hover:bg-gray-50 hover:border-gray-300"
                      }`}
                      onClick={() => handleAnswer(option.vibe)}
                    >
                      <span className="text-xl mr-3">{option.icon}</span>
                      <span>{option.text}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={currentQuestion === 0 || isTransitioning}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {currentQuestion < questions.length - 1 ? (
              <Button
                onClick={() => answers[currentQuestion] && handleAnswer(answers[currentQuestion])}
                disabled={!answers[currentQuestion] || isTransitioning}
                className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 shadow-md hover:shadow-lg"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => answers[currentQuestion] && handleAnswer(answers[currentQuestion])}
                disabled={!answers[currentQuestion] || isTransitioning}
                className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 shadow-md hover:shadow-lg"
              >
                See Results <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  )
}
