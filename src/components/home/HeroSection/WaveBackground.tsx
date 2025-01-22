// src/components/home/HeroSection/WaveBackground.tsx
'use client'

import React, { useEffect, useState, memo } from 'react'
import dynamic from 'next/dynamic'

// Lazy load the heavy Three.js scene
const WaveScene = dynamic(() => import('./WaveScene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background" />,
})

function WaveBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      setMounted(true)
    }
    return () => {
      isSubscribed = false
    }
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0 bg-background" />
  }

  return (
    <div
      id="wave-container"
      className="fixed inset-0 -z-10 transition-opacity duration-500"
      style={{
        pointerEvents: 'none',
        height: '100vh',
        width: '100vw',
      }}
    >
      <WaveScene />
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(WaveBackground)
