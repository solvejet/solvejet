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
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    // Call the provided onClick handler if it exists
    onClick?.(e)
    // Toggle the theme
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) return null

  return (
    <button
      onClick={handleClick}
      className={`rounded-md p-2.5 hover:bg-accent ${className ?? ''}`}
      aria-label="Toggle theme"
    >
      {mounted && theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
