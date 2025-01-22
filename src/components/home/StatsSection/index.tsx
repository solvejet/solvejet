// components/home/StatsSection/index.tsx

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

const StatsSection = dynamic(
  () => import('./client').then((mod) => mod.StatsSection as ComponentType),
  {
    loading: () => <div className="min-h-[600px] animate-pulse bg-muted/10" />,
    ssr: true,
  }
)

export default StatsSection
