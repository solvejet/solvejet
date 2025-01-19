// src/components/layout/mobile-sidebar.tsx
'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { menuData } from '@/data/menu-data'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  ChevronDown,
  ChevronRight,
  Phone,
  Globe,
  Users,
  Mail,
  LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { MenuItem } from '@/types/mega-menu'

interface MobileSubmenuProps {
  title: string
  items: MenuItem[]
  isOpen: boolean
  onToggle: () => void
  badge?: string
}

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

// Prevent click events from bubbling up
const stopPropagation = (e: React.MouseEvent) => {
  e.stopPropagation()
}

const MobileSubmenu: React.FC<MobileSubmenuProps> = ({
  title,
  items,
  isOpen,
  onToggle,
  badge,
}) => {
  return (
    <div className="border-b border-border/50" onClick={stopPropagation}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5"
      >
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">{title}</span>
          {badge && (
            <Badge variant="outline" className="bg-primary/10 text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-1 px-4 pb-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-accent"
                >
                  <div className={cn('rounded-md p-2', 'bg-primary/10')}>
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium group-hover:text-primary">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    {item.stats && (
                      <div className="mt-2 flex gap-4">
                        {item.stats.map((stat) => (
                          <div key={stat.label}>
                            <p className="text-sm font-medium text-primary">
                              {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="mt-1 h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const companyStats: Array<{
  icon: LucideIcon
  label: string
  value: string
}> = [
  {
    icon: Globe,
    label: 'Global',
    value: '20+ Countries',
  },
  {
    icon: Users,
    label: 'Team',
    value: '500+ People',
  },
  {
    icon: Mail,
    label: 'Support',
    value: '24/7 Active',
  },
]

const CompanyStats = () => (
  <div
    className="grid grid-cols-3 gap-2 bg-accent/50 px-6 py-4"
    onClick={stopPropagation}
  >
    {companyStats.map((stat) => (
      <div key={stat.label} className="space-y-1 text-center">
        <stat.icon className="mx-auto h-5 w-5 text-primary" />
        <p className="text-sm font-medium">{stat.label}</p>
        <p className="text-xs text-muted-foreground">{stat.value}</p>
      </div>
    ))}
  </div>
)

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const [openMenus, setOpenMenus] = React.useState<string[]>([])
  const sidebarRef = React.useRef<HTMLDivElement>(null)

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName]
    )
  }

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 dark:bg-black/40"
            onClick={handleOverlayClick}
          />

          {/* Sidebar Content */}
          <motion.div
            ref={sidebarRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 top-20 z-50 flex h-[calc(100vh-5rem)] w-full flex-col overflow-y-auto bg-background/60 backdrop-blur-xl"
            onClick={stopPropagation}
          >
            <CompanyStats />

            <div className="flex-1 pt-2">
              <MobileSubmenu
                title="What We Do"
                items={menuData.whatWeDo.services}
                isOpen={openMenus.includes('whatWeDo')}
                onToggle={() => toggleMenu('whatWeDo')}
                badge="Services"
              />
              <MobileSubmenu
                title="Technologies"
                items={menuData.technologies}
                isOpen={openMenus.includes('technologies')}
                onToggle={() => toggleMenu('technologies')}
                badge="Stack"
              />
              <MobileSubmenu
                title="Industries"
                items={menuData.industries}
                isOpen={openMenus.includes('industries')}
                onToggle={() => toggleMenu('industries')}
                badge="Sectors"
              />
              <MobileSubmenu
                title="Company"
                items={menuData.company}
                isOpen={openMenus.includes('company')}
                onToggle={() => toggleMenu('company')}
                badge="About"
              />

              <Link
                href="/case-studies"
                className="flex items-center justify-between border-b border-border/50 px-6 py-5"
                onClick={stopPropagation}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium">Case Studies</span>
                  <Badge variant="outline" className="bg-primary/10 text-xs">
                    Featured
                  </Badge>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </div>

            {/* Bottom Actions */}
            <div
              className="border-t border-border/50 p-6"
              onClick={stopPropagation}
            >
              <Button size="lg" className="w-full gap-2">
                <Phone className="h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileSidebar
