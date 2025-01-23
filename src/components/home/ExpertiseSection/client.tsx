'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menuData } from '@/data/menu-data'
import { ArrowUpRight, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { memo } from '@/lib/memo'
import { getIconColor, getIconBgColor } from '@/lib/icon-colors'

interface ExpertiseArea {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  technologies: string[]
  href: string
}

interface ExpertiseCardProps {
  area: ExpertiseArea
  index: number
}

const expertiseAreas: ExpertiseArea[] = [
  // Main services
  {
    title: 'Technology Consulting',
    description:
      'Strategic guidance for digital transformation and technology adoption',
    icon: menuData.whatWeDo.services[0].icon,
    features: [
      'Digital Transformation Strategy',
      'Technology Stack Assessment',
      'Enterprise Architecture',
      'Technical Due Diligence',
    ],
    technologies: [
      'Cloud Migration',
      'Legacy Modernization',
      'Tech Stack Optimization',
    ],
    href: '/services/consulting',
  },
  {
    title: 'Custom Software Development',
    description:
      'Tailored software solutions engineered for your unique business needs',
    icon: menuData.whatWeDo.services[1].icon,
    features: [
      'Enterprise Software Solutions',
      'Cloud-Native Applications',
      'API Development & Integration',
      'Legacy System Modernization',
    ],
    technologies: ['React/Node.js', 'Java/Spring', '.NET Core', 'Python'],
    href: '/services/custom-development',
  },
  {
    title: 'MVP Development',
    description: 'Rapid prototyping and minimum viable product development',
    icon: menuData.whatWeDo.services[2].icon,
    features: [
      'Rapid Prototyping',
      'Iterative Development',
      'Market Validation',
      'Scalable Architecture',
    ],
    technologies: ['Next.js', 'React Native', 'Node.js', 'AWS/Azure'],
    href: '/services/mvp',
  },
  // Technical expertise
  {
    title: 'Web Development',
    description: 'Modern web applications and progressive platforms',
    icon: menuData.whatWeDo.expertise[0].icon,
    features: [
      'Single Page Applications',
      'Progressive Web Apps',
      'E-commerce Platforms',
      'Content Management Systems',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    href: '/expertise/web',
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile solutions',
    icon: menuData.whatWeDo.expertise[1].icon,
    features: [
      'iOS Development',
      'Android Development',
      'Cross-platform Apps',
      'Mobile-first Design',
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter'],
    href: '/expertise/mobile',
  },
  {
    title: 'AI/ML Solutions',
    description: 'Artificial Intelligence and Machine Learning implementations',
    icon: menuData.whatWeDo.expertise[2].icon,
    features: [
      'Predictive Analytics',
      'Natural Language Processing',
      'Computer Vision',
      'Machine Learning Models',
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'scikit-learn'],
    href: '/expertise/ai-ml',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
}

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
}

const ExpertiseCard = React.memo(function ExpertiseCard({
  area,
  index,
}: ExpertiseCardProps) {
  const Icon = area.icon
  const iconColor = getIconColor(index).replace('text-', '')

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={index}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl"
    >
      {/* Card gradient background */}
      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-25"
        style={{
          background: `linear-gradient(135deg, ${iconColor} 0%, transparent 100%)`,
        }}
      />

      {/* Card content */}
      <div className="relative z-10 flex h-full flex-col border bg-background/50 p-6 backdrop-blur-sm transition-all duration-500 lg:p-8">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          {/* Icon Container */}
          <div className="relative">
            <div
              className={cn(
                'relative rounded-2xl p-4 transition-transform duration-500 group-hover:scale-110',
                getIconBgColor(index)
              )}
            >
              {/* Background Glow Effect */}
              <div
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${iconColor} 0%, transparent 70%)`,
                  transform: 'scale(2)',
                  filter: 'blur(10px)',
                }}
              />

              {/* Pulsing Circle */}
              <div
                className="absolute inset-0 -z-20 animate-ping opacity-0 transition-opacity duration-1000 group-hover:opacity-30"
                style={{
                  background: `radial-gradient(circle at center, ${iconColor} 0%, transparent 70%)`,
                  animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
                }}
              />

              {/* Icon */}
              <Icon
                className={cn(
                  'relative h-6 w-6 transition-all duration-500 group-hover:scale-110 group-hover:transform',
                  getIconColor(index)
                )}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Action Button */}
          <Button
            variant="ghost"
            size="icon"
            href={area.href}
            className="relative overflow-hidden opacity-0 transition-all duration-300 group-hover:opacity-100"
            aria-label={`Learn more about ${area.title}`}
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* Content Section */}
        <div className="mt-6 flex flex-1 flex-col">
          <div className="mb-6">
            <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
              {area.title}
            </h3>
            <p className="mt-2 text-muted-foreground">{area.description}</p>
          </div>

          {/* Features List */}
          <ul className="mb-6 grid flex-1 grid-cols-2 gap-2">
            {area.features.map((feature, idx) => (
              <motion.li
                key={idx}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-125" />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* Technologies Tags */}
          <div className="mt-auto flex flex-wrap gap-2">
            {area.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
})

function ExpertiseSection() {
  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      aria-labelledby="expertise-title"
    >
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 opacity-50 mix-blend-multiply blur-[100px]" />
        <div className="absolute right-1/4 top-1/3 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-purple-500/10 opacity-50 mix-blend-multiply blur-[100px]" />
      </div>

      <div className="relative">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                id="expertise-title"
                className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
              >
                Our Expertise
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Delivering end-to-end digital solutions with cutting-edge
                technologies and industry best practices.
              </p>
            </motion.div>
          </div>

          {/* Expertise cards grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {expertiseAreas.map((area, index) => (
                <ExpertiseCard key={area.title} area={area} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 text-center"
          >
            <Button
              size="lg"
              className="group rounded-full px-8"
              href="/contact"
            >
              Start Your Project
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default memo(ExpertiseSection)
