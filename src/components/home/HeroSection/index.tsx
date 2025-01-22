// src/components/home/HeroSection/index.tsx
'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import type { ComponentType, JSX } from 'react'

// Explicitly type the dynamic imports
const ClientHeroSection = dynamic(
  () =>
    import('./client').then((mod) => mod.ClientHeroSection as ComponentType),
  {
    loading: () => <div className="min-h-[600px] animate-pulse bg-muted/10" />,
  }
)

const WaveBackground = dynamic(
  () => import('./WaveBackground').then((mod) => mod.default as ComponentType),
  {
    loading: () => <div className="absolute inset-0 bg-background" />,
    ssr: false,
  }
)

export default function HeroSection(): JSX.Element {
  return (
    <div className="relative isolate min-h-[calc(100vh-5rem)] w-full overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <WaveBackground />
      </Suspense>
      <ClientHeroSection />
    </div>
  )
}
