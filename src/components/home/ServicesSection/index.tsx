// components/home/ServicesSection/index.tsx
import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

const ServicesSection = dynamic(
  () => import('./client').then((mod) => mod.ServicesSection as ComponentType),
  {
    loading: () => <div className="min-h-[800px] animate-pulse bg-muted/10" />,
    ssr: true,
  }
)

export default ServicesSection
