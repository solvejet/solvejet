'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Lightbulb,
  Layout,
  CodeSquare,
  TestTube,
  Settings,
  ArrowUpRight,
  CheckCircle2,
  ArrowDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ServiceStep {
  title: string
  description: string
  icon: React.ElementType
  features: string[]
  color: string
  tools: string[]
}

const services: ServiceStep[] = [
  {
    title: 'Discovery & Planning',
    description: 'Requirements gathering and project planning phase',
    icon: Lightbulb,
    color: 'from-amber-500 via-amber-500/50 to-amber-500/20',
    features: [
      'Business requirements analysis',
      'Technical feasibility study',
      'Project scope definition',
      'Timeline & resource planning',
    ],
    tools: ['Jira', 'Confluence', 'Miro'],
  },
  {
    title: 'Design & Architecture',
    description: 'System design and technical blueprint creation',
    icon: Layout,
    color: 'from-blue-500 via-blue-500/50 to-blue-500/20',
    features: [
      'System architecture design',
      'Database schema planning',
      'UI/UX wireframing',
      'API specification',
    ],
    tools: ['Figma', 'AWS Architecture', 'Draw.io'],
  },
  {
    title: 'Development & Integration',
    description: 'Agile development with continuous integration',
    icon: CodeSquare,
    color: 'from-purple-500 via-purple-500/50 to-purple-500/20',
    features: [
      'Sprint-based development',
      'Code review process',
      'CI/CD pipeline setup',
      'Regular client demos',
    ],
    tools: ['Git', 'Docker', 'Jenkins'],
  },
  {
    title: 'Testing & Quality Assurance',
    description: 'Comprehensive testing and quality checks',
    icon: TestTube,
    color: 'from-emerald-500 via-emerald-500/50 to-emerald-500/20',
    features: [
      'Automated testing',
      'Performance testing',
      'Security testing',
      'User acceptance testing',
    ],
    tools: ['Jest', 'Cypress', 'JMeter'],
  },
  {
    title: 'Deployment & Maintenance',
    description: 'Production deployment and ongoing support',
    icon: Settings,
    color: 'from-rose-500 via-rose-500/50 to-rose-500/20',
    features: [
      'Zero-downtime deployment',
      'Performance monitoring',
      'Security updates',
      'Scalability management',
    ],
    tools: ['AWS', 'Kubernetes', 'Grafana'],
  },
]

const TimelineConnector = () => (
  <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20">
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: '100%' }}
      transition={{ duration: 0.5 }}
      className="h-full w-full bg-primary"
    />
  </div>
)

const ServiceCard = ({
  service,
  index,
  total,
}: {
  service: ServiceStep
  index: number
  total: number
}) => {
  const Icon = service.icon
  const isLeft = index % 2 === 0

  return (
    <div className="relative grid grid-cols-[1fr,auto,1fr] gap-4 py-8">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          'space-y-6 rounded-2xl border bg-background/50 p-6 backdrop-blur lg:p-8',
          isLeft ? 'text-right lg:pr-12' : 'col-start-3 text-left lg:pl-12'
        )}
      >
        <div
          className={cn(
            'inline-flex items-center gap-3',
            isLeft ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          <div
            className={cn('rounded-xl bg-gradient-to-br p-3', service.color)}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              Phase {index + 1}
            </span>
            <h3 className="text-xl font-semibold">{service.title}</h3>
          </div>
        </div>

        <p className="text-muted-foreground">{service.description}</p>

        <ul className={cn('space-y-2', isLeft ? 'items-end' : 'items-start')}>
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * idx }}
              className={cn(
                'flex items-center gap-2 text-sm',
                isLeft ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
              {feature}
            </motion.li>
          ))}
        </ul>

        <div
          className={cn(
            'flex flex-wrap gap-2',
            isLeft ? 'justify-end' : 'justify-start'
          )}
        >
          {service.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Center timeline */}
      <div className="relative flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className={cn(
            'relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2',
            'bg-background shadow-xl',
            index === total - 1 ? 'border-primary' : 'border-primary/50'
          )}
        >
          <span className="text-sm font-medium">
            {(index + 1).toString().padStart(2, '0')}
          </span>
        </motion.div>
        {index !== total - 1 && (
          <div className="absolute top-[95%]">
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <ArrowDown className="h-4 w-4 text-primary/50" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Empty column for alignment */}
      <div className={isLeft ? 'col-start-3' : 'col-start-1'} />
    </div>
  )
}

export function ServicesSection() {
  const containerRef = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-32"
      aria-label="Software Development Life Cycle"
    >
      {/* Background effects */}
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute right-[10%] top-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 mix-blend-multiply blur-[130px]" />
        <div className="absolute left-[20%] top-[20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 mix-blend-multiply blur-[130px]" />
      </motion.div>

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Software Development Life Cycle
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Our battle-tested SDLC process ensures high-quality deliverables
              at every stage of your project&apos;s journey.
            </p>
          </motion.div>
        </div>

        <div className="relative mt-20">
          <TimelineConnector />
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              total={services.length}
            />
          ))}
        </div>

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
            href="/services"
          >
            Explore Our Process
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
