// src/components/home/HeroSection/MobileWaveScene.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export default function MobileWaveScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number
    let offset = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      const color = resolvedTheme === 'dark' ? '96, 165, 250' : '147, 197, 253'
      gradient.addColorStop(0, `rgba(${color}, 0.1)`)
      gradient.addColorStop(0.5, `rgba(${color}, 0.2)`)
      gradient.addColorStop(1, `rgba(${color}, 0.1)`)

      ctx.fillStyle = gradient

      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let i = 0; i <= canvas.width; i++) {
        const y = Math.sin(i * 0.01 + offset) * 20 + canvas.height / 2
        ctx.lineTo(i, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fill()

      offset += 0.05
      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="h-full w-full" />
}
