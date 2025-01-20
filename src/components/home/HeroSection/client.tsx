// src/components/home/HeroSection/client.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Rocket, Code2, Server, Globe, ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

const WaveBackground = dynamic(() => import('./WaveBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
})

interface ServiceCard {
  icon: React.ElementType
  title: string
  description: string
  color: string
  bg: string
}

export function ClientHeroSection() {
  const [mounted, setMounted] = useState(false)

  const servicesData: ServiceCard[] = [
    {
      icon: Code2,
      title: 'Custom Development',
      description: 'Tailored solutions built with cutting-edge technology',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Server,
      title: 'Cloud Solutions',
      description: 'Scalable infrastructure for enterprise applications',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      icon: Globe,
      title: 'Digital Transformation',
      description: 'Modernize your business with innovative solutions',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.6,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  }

  return (
    <div className="relative isolate min-h-[calc(100vh-5rem)] w-full overflow-hidden">
      {/* Wave Background */}
      <div className="absolute inset-0 h-full w-full">
        {mounted && (
          <React.Suspense
            fallback={<div className="absolute inset-0 bg-background" />}
          >
            <WaveBackground />
          </React.Suspense>
        )}
      </div>

      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Enterprise Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-medium">
              Enterprise Software Solutions
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl"
          >
            Transform Your Business with{' '}
            <span className="text-primary">Innovation</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-balance text-lg text-muted-foreground sm:text-xl"
          >
            Leverage our expertise in custom software development, cloud
            solutions, and digital transformation to drive your business
            forward.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="group h-12 gap-2 px-6 text-base shadow-lg"
              href="/contact"
            >
              <Rocket className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
              Start Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group h-12 gap-2 px-6 text-base"
              href="/solutions"
            >
              Explore Solutions
            </Button>
          </motion.div>

          {/* Services Cards */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="wait">
              {servicesData.map((service) => (
                <motion.div
                  key={service.title}
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border bg-background/50 p-6 backdrop-blur-sm transition-colors hover:border-primary"
                >
                  <div
                    className={`mb-4 inline-flex rounded-xl ${service.bg} p-3`}
                  >
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 transform bg-gradient-to-r from-primary/40 via-primary to-primary/40 transition-transform duration-300 group-hover:scale-x-100" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Technologies Badge */}
          <motion.div
            variants={itemVariants}
            className="mt-16 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2"
          >
            <span className="text-sm font-medium text-primary">
              Powered by Latest Technologies
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
