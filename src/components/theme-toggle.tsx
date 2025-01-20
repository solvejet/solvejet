// components/theme-toggle.tsx
'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface ThemeToggleProps {
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

export function ThemeToggle({ className, onClick }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  // Handle mounting
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = React.useCallback(
    (e: React.MouseEvent) => {
      // If already transitioning, prevent multiple clicks
      if (isTransitioning) return

      // Call the provided onClick handler if it exists
      onClick?.(e)

      setIsTransitioning(true)

      // Use resolvedTheme to get the actual current theme
      const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
      setTheme(newTheme)

      // Reset transitioning state after animation
      setTimeout(() => {
        setIsTransitioning(false)
      }, 300) // Match this with your animation duration
    },
    [onClick, setTheme, resolvedTheme, isTransitioning]
  )

  // Render a placeholder button during SSR to prevent layout shift
  if (!mounted) {
    return (
      <button
        className={cn(
          'rounded-md p-2.5 transition-colors hover:bg-accent',
          className
        )}
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </button>
    )
  }

  return (
    <motion.button
      onClick={handleThemeChange}
      className={cn(
        'rounded-md p-2.5 transition-colors hover:bg-accent',
        isTransitioning && 'pointer-events-none',
        className
      )}
      aria-label="Toggle theme"
      disabled={isTransitioning}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}
