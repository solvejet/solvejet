// app/layout.tsx
import React from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { analyticsConfig } from '@/config/analytics'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { generateSEOMetadata, generateOrganizationSchema } from '@/config/seo'
import JsonLD from '@/components/json-ld'
import type { Metadata } from 'next'

import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Export metadata using Next.js generateMetadata function
export function generateMetadata(): Metadata {
  return generateSEOMetadata({})
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <JsonLD data={generateOrganizationSchema()} />
      </head>
      <body className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <GoogleTagManager gtmId={analyticsConfig.gtm.id} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="solvejet-theme"
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics gaId={analyticsConfig.ga.id} />
      </body>
    </html>
  )
}
