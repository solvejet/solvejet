// src/components/home/HeroSection/WaveBackground.tsx
'use client'

import React, { useEffect, useState, memo } from 'react'
import dynamic from 'next/dynamic'

// Lazy load the heavy Three.js scene
const WaveScene = dynamic(() => import('./WaveScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
})

function WaveBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let isSubscribed = true
    // Only mount after client-side hydration
    if (isSubscribed) {
      setMounted(true)
    }
    return () => {
      isSubscribed = false
    }
  }, [])

  // Add intersection observer for performance
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        rootMargin: '50px',
      }
    )

    const element = document.getElementById('wave-container')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  if (!mounted) {
    return <div className="absolute inset-0 bg-background" />
  }

  return (
    <div
      id="wave-container"
      className="absolute inset-0 transition-opacity duration-500"
      style={{
        pointerEvents: 'none',
        height: '100%',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {isVisible && <WaveScene />}
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(WaveBackground)
