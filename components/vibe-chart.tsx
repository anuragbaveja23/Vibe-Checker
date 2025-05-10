"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface VibeChartProps {
  data: {
    energetic: number
    chill: number
    creative: number
    adventurous: number
  }
}

export default function VibeChart({ data }: VibeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const height = rect.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 30

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw radar background with gradient
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    bgGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
    bgGradient.addColorStop(1, "rgba(255, 255, 255, 0.1)")

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = bgGradient
    ctx.fill()
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw inner circles with labels
    for (let i = 1; i <= 4; i++) {
      const circleRadius = (radius * i) / 5

      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI)
      ctx.strokeStyle = "rgba(226, 232, 240, 0.7)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Add level label
      if (i === 2) {
        ctx.fillStyle = "rgba(100, 116, 139, 0.3)"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText("Low", centerX + 5, centerY - circleRadius)
      } else if (i === 4) {
        ctx.fillStyle = "rgba(100, 116, 139, 0.3)"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText("High", centerX + 5, centerY - circleRadius)
      }
    }

    // Draw axes
    const axes = [
      { label: "Energetic", angle: 0, color: "rgba(250, 204, 21, 0.8)" },
      { label: "Creative", angle: Math.PI / 2, color: "rgba(168, 85, 247, 0.8)" },
      { label: "Chill", angle: Math.PI, color: "rgba(59, 130, 246, 0.8)" },
      { label: "Adventurous", angle: (3 * Math.PI) / 2, color: "rgba(34, 197, 94, 0.8)" },
    ]

    axes.forEach((axis) => {
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + radius * Math.cos(axis.angle), centerY + radius * Math.sin(axis.angle))
      ctx.strokeStyle = axis.color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw labels
      ctx.font = "bold 14px sans-serif"
      ctx.fillStyle = axis.color
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const labelX = centerX + (radius + 25) * Math.cos(axis.angle)
      const labelY = centerY + (radius + 25) * Math.sin(axis.angle)

      ctx.fillText(axis.label, labelX, labelY)
    })

    // Normalize data to scale of 0-5
    const maxPossible = 5 // Maximum questions per category
    const normalizedData = {
      energetic: (data.energetic / maxPossible) * radius,
      creative: (data.creative / maxPossible) * radius,
      chill: (data.chill / maxPossible) * radius,
      adventurous: (data.adventurous / maxPossible) * radius,
    }

    // Draw data points
    const points = [
      { value: normalizedData.energetic, angle: 0, color: "rgba(250, 204, 21, 1)" },
      { value: normalizedData.creative, angle: Math.PI / 2, color: "rgba(168, 85, 247, 1)" },
      { value: normalizedData.chill, angle: Math.PI, color: "rgba(59, 130, 246, 1)" },
      { value: normalizedData.adventurous, angle: (3 * Math.PI) / 2, color: "rgba(34, 197, 94, 1)" },
    ]

    // Draw data area with gradient
    ctx.beginPath()
    points.forEach((point, index) => {
      const x = centerX + point.value * Math.cos(point.angle)
      const y = centerY + point.value * Math.sin(point.angle)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()

    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "rgba(250, 204, 21, 0.3)")
    gradient.addColorStop(0.33, "rgba(168, 85, 247, 0.3)")
    gradient.addColorStop(0.66, "rgba(59, 130, 246, 0.3)")
    gradient.addColorStop(1, "rgba(34, 197, 94, 0.3)")

    ctx.fillStyle = gradient
    ctx.fill()

    // Add stroke with gradient
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points with glow effect
    points.forEach((point) => {
      const x = centerX + point.value * Math.cos(point.angle)
      const y = centerY + point.value * Math.sin(point.angle)

      // Draw glow
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 12)
      glowGradient.addColorStop(0, point.color)
      glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.beginPath()
      ctx.arc(x, y, 12, 0, 2 * Math.PI)
      ctx.fillStyle = glowGradient
      ctx.fill()

      // Draw point
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, 2 * Math.PI)
      ctx.fillStyle = point.color
      ctx.fill()
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Add score labels
    points.forEach((point, index) => {
      const x = centerX + point.value * Math.cos(point.angle)
      const y = centerY + point.value * Math.sin(point.angle)

      const scoreValue = Object.values(data)[index]

      ctx.font = "bold 12px sans-serif"
      ctx.fillStyle = point.color
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const textX = x + 15 * Math.cos(point.angle)
      const textY = y + 15 * Math.sin(point.angle)

      ctx.fillText(scoreValue.toString(), textX, textY)
    })
  }, [data])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex items-center justify-center"
    >
      <canvas ref={canvasRef} width={400} height={300} className="max-w-full" />
    </motion.div>
  )
}
