// src/components/home/HeroSection/client.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Rocket,
  Users,
  Globe,
  Trophy,
  CheckCircle2,
} from 'lucide-react'
import dynamic from 'next/dynamic'

export function ClientHeroSection() {
  const [mounted, setMounted] = useState(false)

  // Use useMemo inside the component
  const highlights = React.useMemo(
    () =>
      [
        { label: 'Customer Satisfaction', value: '98%', icon: Trophy },
        { label: 'Enterprise Projects', value: '500+', icon: Rocket },
        { label: 'Global Presence', value: '20+', icon: Globe },
        { label: 'Expert Team', value: '50+', icon: Users },
      ] as const,
    []
  )

  const features = React.useMemo(
    () =>
      [
        'Custom Software Development',
        'Enterprise Solutions',
        'Digital Transformation',
        'Cloud Infrastructure',
        'AI & Machine Learning',
        'Mobile Applications',
      ] as const,
    []
  )

  // Move WaveBackground import inside component to use the loading fallback properly
  const WaveBackground = React.useMemo(
    () =>
      dynamic(() => import('./WaveBackground'), {
        ssr: false,
        loading: () => <div className="fixed inset-0 -z-10 bg-background" />,
      }),
    []
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative isolate h-[calc(100vh-5rem)] w-full overflow-hidden">
      {/* Wave Background Container */}
      <div className="absolute inset-0 h-full w-full">
        {mounted && (
          <React.Suspense
            fallback={<div className="absolute inset-0 bg-background" />}
          >
            <WaveBackground />
          </React.Suspense>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />

      {/* Content Container */}
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 gap-8 px-6 pt-24 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* Left Column - Main Content */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Enterprise Software Solutions
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10"
          >
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Transform Your Business with{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Digital Innovation
                </span>
                <svg
                  aria-hidden="true"
                  aria-label="Decorative underline"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/20"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              Partner with us to build scalable, secure, and innovative software
              solutions that drive your business forward. Our expert team
              delivers excellence in every project.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="group" href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" href="/case-studies">
                View Case Studies
              </Button>
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Stats Grid */}
        <div className="flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {highlights.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border bg-background/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/50"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <stat.icon className="h-8 w-8 text-primary" />
                <p className="mt-4 text-3xl font-bold">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
