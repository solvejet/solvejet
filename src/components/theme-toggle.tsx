// src/components/theme-toggle.tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

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

      // Reset transitioning state after a short delay
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    },
    [onClick, setTheme, resolvedTheme, isTransitioning]
  )

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className={`rounded-md p-2.5 hover:bg-accent ${className ?? ''}`}
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={handleThemeChange}
      className={`rounded-md p-2.5 hover:bg-accent ${className ?? ''}`}
      aria-label="Toggle theme"
      disabled={isTransitioning}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
