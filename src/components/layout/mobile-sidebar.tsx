// src/components/layout/MobileSidebar/index.tsx
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePrevious } from '@/lib/utils'
import { useLockedBody } from '@/hooks/use-locked-body'
import type { MenuItem } from '@/types/mega-menu'

// Constants
const OVERLAY_ANIMATION_DURATION = 0.2
const SIDEBAR_ANIMATION_CONFIG = {
  type: 'spring',
  damping: 20,
  stiffness: 300,
}

// Types
interface MobileSubmenuProps {
  title: string
  items: MenuItem[]
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  badge?: string
  id: string
}

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  id?: string
}

// Utils
const stopPropagation = (e: React.MouseEvent) => {
  e.stopPropagation()
}

// Submenu Component
const MobileSubmenu = React.memo(function MobileSubmenu({
  title,
  items,
  isOpen,
  onToggle,
  onClose,
  badge,
  id,
}: MobileSubmenuProps) {
  const buttonId = `${id}-button`

  return (
    <div className="border-b border-border/50" onClick={stopPropagation}>
      <button
        onClick={onToggle}
        className={cn(
          'flex w-full items-center justify-between px-6 py-5',
          'outline-none transition-colors duration-200',
          'hover:bg-accent/50 focus-visible:bg-accent/50',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-primary focus-visible:ring-offset-2'
        )}
        aria-expanded={isOpen}
        aria-controls={id}
        id={buttonId}
        aria-label={`${title} section`}
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
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-1 px-4 pb-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-start gap-4 rounded-lg p-3',
                    'transition-colors duration-200',
                    'hover:bg-accent focus-visible:bg-accent',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-primary'
                  )}
                  onClick={() => {
                    // Close sidebar after navigation on mobile
                    if (window.innerWidth < 768) {
                      onClose?.()
                    }
                  }}
                  tabIndex={isOpen ? 0 : -1}
                  aria-label={`${item.title}: ${item.description}`}
                >
                  <div className="rounded-md bg-primary/10 p-2">
                    <item.icon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium group-hover:text-primary">
                      {item.title}
                    </h3>
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
                  <ChevronRight
                    className="mt-1 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

// Company Stats Component
const companyStats = [
  { icon: Globe, label: 'Global', value: '5+ Countries' },
  { icon: Users, label: 'Team', value: '20+ People' },
  { icon: Mail, label: 'Support', value: '24/7 Active' },
] as const

const CompanyStats = React.memo(function CompanyStats() {
  return (
    <div
      className="grid grid-cols-3 gap-2 bg-accent/50 px-6 py-4"
      onClick={stopPropagation}
      role="complementary"
      aria-label="Company Statistics"
    >
      {companyStats.map((stat) => (
        <div key={stat.label} className="space-y-1 text-center">
          <stat.icon
            className="mx-auto h-5 w-5 text-primary"
            aria-hidden="true"
          />
          <p className="text-sm font-medium">{stat.label}</p>
          <p className="text-xs text-muted-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  )
})

// Main Sidebar Component
const MobileSidebar = React.forwardRef<HTMLDivElement, MobileSidebarProps>(
  function MobileSidebar({ isOpen, onClose, id = 'mobile-menu' }, ref) {
    const [openMenus, setOpenMenus] = React.useState<string[]>([])
    const sidebarRef = React.useRef<HTMLDivElement>(null)
    const previousOpen = usePrevious(isOpen)

    // Lock body scroll when sidebar is open
    useLockedBody(isOpen)

    // Handle Escape key and focus trap
    React.useEffect(() => {
      if (!isOpen) return

      const sidebar = sidebarRef.current
      if (!sidebar) return

      const focusableElements = sidebar.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstFocusable = focusableElements[0] as HTMLElement
      const lastFocusable = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
          return
        }

        if (e.key !== 'Tab') return

        if (!document.activeElement) return

        const isFirstFocusable = document.activeElement === firstFocusable
        const isLastFocusable = document.activeElement === lastFocusable

        if (e.shiftKey && isFirstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        } else if (!e.shiftKey && isLastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      // Focus first element when opened
      if (!previousOpen && isOpen) {
        firstFocusable?.focus()
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [isOpen, onClose, previousOpen])

    const toggleMenu = (menuName: string) => {
      setOpenMenus((prev) =>
        prev.includes(menuName)
          ? prev.filter((name) => name !== menuName)
          : [...prev, menuName]
      )
    }

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
              transition={{ duration: OVERLAY_ANIMATION_DURATION }}
              className="fixed inset-0 z-40 "
              onClick={handleOverlayClick}
              role="presentation"
              aria-hidden="true"
            />

            {/* Sidebar Content */}
            <motion.div
              ref={ref}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={SIDEBAR_ANIMATION_CONFIG}
              className={cn(
                'fixed bottom-0 left-0 right-0 top-20 z-50',
                'flex h-[calc(100vh-5rem)] w-full flex-col',
                'backdrop-blur-xl', // Updated background with blur
                'border-l border-border/50' // Optional: add border for better definition
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-title`}
              id={id}
            >
              {/* Hidden title for screen readers */}
              <h2 id={`${id}-title`} className="sr-only">
                Mobile Navigation Menu
              </h2>

              {/* Main Content - Scrollable */}
              <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain">
                <CompanyStats />

                <nav className="flex-1" aria-label="Mobile navigation">
                  <MobileSubmenu
                    title="What We Do"
                    items={menuData.whatWeDo.services}
                    isOpen={openMenus.includes('whatWeDo')}
                    onToggle={() => toggleMenu('whatWeDo')}
                    onClose={onClose}
                    badge="Services"
                    id={`${id}-what-we-do`}
                  />
                  <MobileSubmenu
                    title="Technologies"
                    items={menuData.technologies}
                    isOpen={openMenus.includes('technologies')}
                    onToggle={() => toggleMenu('technologies')}
                    onClose={onClose}
                    badge="Stack"
                    id={`${id}-technologies`}
                  />
                  <MobileSubmenu
                    title="Industries"
                    items={menuData.industries}
                    isOpen={openMenus.includes('industries')}
                    onToggle={() => toggleMenu('industries')}
                    onClose={onClose}
                    badge="Sectors"
                    id={`${id}-industries`}
                  />
                  <MobileSubmenu
                    title="Company"
                    items={menuData.company}
                    isOpen={openMenus.includes('company')}
                    onToggle={() => toggleMenu('company')}
                    onClose={onClose}
                    badge="About"
                    id={`${id}-company`}
                  />

                  <Link
                    href="/case-studies"
                    className={cn(
                      'flex items-center justify-between',
                      'border-b border-border/50 px-6 py-5',
                      'outline-none transition-colors duration-200',
                      'hover:bg-accent focus-visible:bg-accent',
                      'focus-visible:outline-none focus-visible:ring-2',
                      'focus-visible:ring-primary'
                    )}
                    onClick={stopPropagation}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base font-medium">
                        Case Studies
                      </span>
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-xs"
                      >
                        Featured
                      </Badge>
                    </div>
                    <ChevronRight
                      className="h-5 w-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </Link>
                </nav>
              </div>

              {/* Sticky Button */}
              <div
                className={cn(
                  'sticky bottom-0 left-0 right-0',
                  'border-t border-border/50 bg-background/80',
                  'safe-area-bottom p-4 backdrop-blur-lg'
                )}
                onClick={stopPropagation}
              >
                <Button
                  size="lg"
                  className="w-full gap-2 shadow-lg"
                  href="/contact"
                  onClick={onClose}
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span>Contact Us</span>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }
)

export default React.memo(MobileSidebar)
