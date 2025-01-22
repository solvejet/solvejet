// app/layout.tsx
import React from 'react'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { analyticsConfig } from '@/config/analytics'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { generateSEOMetadata, generateOrganizationSchema } from '@/config/seo'
import JsonLD from '@/components/json-ld'
import type { Metadata, Viewport } from 'next'

import '@/styles/globals.css'

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

// Add metadata optimization
export function generateMetadata(): Metadata {
  return generateSEOMetadata({})
}

// Add viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} antialiased`}
    >
      <head>
        {/* Preconnect to critical domains */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Add schema markup */}
        <JsonLD data={generateOrganizationSchema()} />
      </head>

      <body className="flex min-h-screen flex-col bg-background">
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

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${analyticsConfig.gtm.id}');
            `,
          }}
        />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga.id}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${analyticsConfig.ga.id}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `,
          }}
        />

        {/* Noscript fallback for GTM */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${analyticsConfig.gtm.id}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </html>
  )
}
