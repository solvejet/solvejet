// app/admin/dashboard/page.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
  Activity,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Stats card component
interface StatsCardProps {
  title: string
  value: string
  change: number
  icon: React.ElementType
  index: number
}

const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
  index,
}: StatsCardProps) => {
  const isPositive = change > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-lg border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div
          className={`rounded-lg p-2 ${
            index % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'
          }`}
        >
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div
          className={cn(
            'flex items-center gap-1 text-sm',
            isPositive ? 'text-green-500' : 'text-red-500'
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </motion.div>
  )
}

const statsData = [
  {
    title: 'Total Users',
    value: '8,549',
    change: 12.5,
    icon: Users,
  },
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: 8.2,
    icon: DollarSign,
  },
  {
    title: 'Active Orders',
    value: '156',
    change: -3.4,
    icon: ShoppingCart,
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: 2.1,
    icon: Activity,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <div className="mt-4 space-y-4">
          {/* Add your activity items here */}
          <p className="text-muted-foreground">No recent activity to show.</p>
        </div>
      </div>
    </div>
  )
}
