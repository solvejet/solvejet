// components/home/StatsSection/client.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion'
import {
  Users,
  Star,
  Award,
  Briefcase,
  UserCheck,
  ArrowUpRight,
} from 'lucide-react'

interface StatItem {
  label: string
  value: number
  icon: React.ElementType
  suffix?: string
  description: string
  color: string
}

interface ClientLogo {
  name: string
  logo: string
  width: number
  height: number
}

const stats: StatItem[] = [
  {
    label: 'Customer Engagement',
    value: 4.3,
    icon: Star,
    suffix: '/5',
    description: 'Average rating from our clients',
    color: 'from-yellow-500/10 to-amber-500/10 text-amber-500',
  },
  {
    label: 'Years Experience',
    value: 5,
    icon: Award,
    suffix: '+',
    description: 'Years of industry expertise',
    color: 'from-blue-500/10 to-indigo-500/10 text-blue-500',
  },
  {
    label: 'Projects Completed',
    value: 150,
    icon: Briefcase,
    suffix: '+',
    description: 'Successful project deliveries',
    color: 'from-purple-500/10 to-pink-500/10 text-purple-500',
  },
  {
    label: 'Happy Clients',
    value: 50,
    icon: UserCheck,
    suffix: '+',
    description: 'Satisfied enterprise clients',
    color: 'from-green-500/10 to-emerald-500/10 text-emerald-500',
  },
  {
    label: 'Team Members',
    value: 20,
    icon: Users,
    suffix: '+',
    description: 'Expert professionals',
    color: 'from-red-500/10 to-rose-500/10 text-rose-500',
  },
]

// Sample client logos (replace with actual logos)
const clients: ClientLogo[] = [
  { name: 'Client 1', logo: '/api/placeholder/160/80', width: 160, height: 80 },
  { name: 'Client 2', logo: '/api/placeholder/160/80', width: 160, height: 80 },
  { name: 'Client 3', logo: '/api/placeholder/160/80', width: 160, height: 80 },
  { name: 'Client 4', logo: '/api/placeholder/160/80', width: 160, height: 80 },
  { name: 'Client 5', logo: '/api/placeholder/160/80', width: 160, height: 80 },
  { name: 'Client 6', logo: '/api/placeholder/160/80', width: 160, height: 80 },
]

const CountingNumber = ({
  value,
  suffix = '',
}: {
  value: number
  suffix?: string
}) => {
  const countRef = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(countRef, { once: true })
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    let startTime: number
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / 2000 // 2 seconds duration

      if (progress < 1) {
        setCount(Math.min(value * progress, value))
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [value, isInView])

  return (
    <span ref={countRef}>
      {count % 1 === 0 ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </span>
  )
}

const StatCard = ({ stat }: { stat: StatItem }) => {
  const Icon = stat.icon
  const inViewRef = React.useRef(null)
  const isInView = useInView(inViewRef, { once: true })

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl border bg-background/50 p-8 backdrop-blur-sm"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-25 ${stat.color}`}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className={`rounded-xl bg-gradient-to-br p-3 ${stat.color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <ArrowUpRight
            className={`h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 ${stat.color.split(' ').pop()}`}
          />
        </div>

        <h3 className="mt-6 text-4xl font-bold tracking-tight">
          <CountingNumber value={stat.value} suffix={stat.suffix} />
        </h3>

        <p className="mt-4 font-medium">{stat.label}</p>
        <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${stat.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
    </motion.div>
  )
}

const ClientLogos = () => {
  const marqueeRef = React.useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = React.useState(false)

  const duplicatedClients = [...clients, ...clients]

  return (
    <div className="mt-20 overflow-hidden rounded-3xl border bg-background/50 p-12 backdrop-blur-sm">
      <h3 className="mb-12 text-center text-xl font-semibold">
        Trusted by Leading Companies
      </h3>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={marqueeRef}
          className="flex items-center justify-center gap-16"
          style={{
            animation: isHovered ? 'none' : 'marquee 30s linear infinite',
            animationPlayState: isHovered ? 'paused' : 'running',
          }}
        >
          {duplicatedClients.map((client, i) => (
            <motion.div
              key={`${client.name}-${i}`}
              whileHover={{
                scale: 1.05,
                filter: 'grayscale(0)',
                opacity: 1,
              }}
              className="flex min-w-[200px] items-center justify-center"
            >
              <div className="relative h-20 w-auto">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={client.width}
                  height={client.height}
                  className="object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function StatsSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-32"
      aria-label="Company Statistics and Clients"
    >
      {/* Animated background gradients */}
      <motion.div
        style={{ y: springY, opacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[10%] top-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 mix-blend-multiply blur-[120px]" />
        <div className="absolute right-[20%] top-[20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 mix-blend-multiply blur-[120px]" />
        <div className="absolute bottom-0 left-[20%] h-[400px] w-[600px] rounded-full bg-emerald-500/10 mix-blend-multiply blur-[120px]" />
      </motion.div>

      <div className="max-w-screen-2xl relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Delivering Excellence at Scale
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Our track record speaks for itself. We&apos;ve helped hundreds of
              businesses transform their digital presence and achieve remarkable
              growth.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <ClientLogos />
      </div>
    </section>
  )
}
