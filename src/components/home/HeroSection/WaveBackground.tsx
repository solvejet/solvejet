// src/components/home/HeroSection/WaveBackground.tsx
'use client'

import React, { useEffect, useState, memo } from 'react'
import dynamic from 'next/dynamic'
import { useMediaQuery } from '@/lib/utils'

// Separate mobile and desktop scenes for code splitting
const DesktopWaveScene = dynamic(() => import('./WaveScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
})

const MobileWaveScene = dynamic(() => import('./MobileWaveScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
})

function WaveBackground() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setMounted(true)
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
      }}
    >
      {isMobile ? <MobileWaveScene /> : <DesktopWaveScene />}
    </div>
  )
}

export default memo(WaveBackground)
