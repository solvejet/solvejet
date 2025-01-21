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

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = React.useCallback(
    (e: React.MouseEvent) => {
      if (isTransitioning) return

      onClick?.(e)
      setIsTransitioning(true)

      const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
      setTheme(newTheme)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    },
    [onClick, setTheme, resolvedTheme, isTransitioning]
  )

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
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
      disabled={isTransitioning}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      <AnimatePresence>
        <motion.div
          key={resolvedTheme}
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
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
