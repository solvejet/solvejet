// components/providers/theme-provider.tsx
'use client'

import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

type ThemeProviderProps = {
  children: React.ReactNode
  storageKey?: string
  defaultTheme?: string | undefined
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  themes?: string[]
  forcedTheme?: string
  nonce?: string
  attribute?: 'class' | 'data-theme' | undefined
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  attribute = 'class',
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
      storageKey={storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
