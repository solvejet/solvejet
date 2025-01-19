// src/config/analytics.ts

export const analyticsConfig = {
  gtm: {
    id: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXX',
  },
  ga: {
    id: process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXX',
  },
} as const

// Type definitions for analytics events
export interface GTMEvent {
  event: string
  value?: string | number
  [key: string]: unknown
}

export interface GAEvent {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: unknown
}
