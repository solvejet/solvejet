// src/types/mega-menu.ts

import { LucideIcon } from 'lucide-react'

export interface MenuItemBase {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export interface MenuItem extends MenuItemBase {
  subtitle?: string
  badge?: string
  featured?: boolean
  stats?: StatsItem[]
}

export interface FeaturedItem {
  title: string
  description: string
  image: string
  href: string
}

export interface StatsItem {
  label: string
  value: string
}

export interface ArticleItem {
  tag: string
  title: string
  href: string
}

export interface MenuData {
  whatWeDo: {
    services: MenuItem[]
    expertise: MenuItem[]
  }
  technologies: MenuItem[]
  industries: MenuItem[]
  company: MenuItem[]
}

export interface MenuProps {
  isOpen: boolean
  onClose: () => void
  id?: string
}

// Props for shared components
export interface MenuContainerProps extends MenuProps {
  children: React.ReactNode
}

export interface MenuGridProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4 | 5
}

export interface MenuSectionProps {
  title: string
  children: React.ReactNode
}
