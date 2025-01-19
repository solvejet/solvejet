// src/hooks/use-analytics.ts
'use client'

import { sendGTMEvent, sendGAEvent } from '@next/third-parties/google'
import type { GTMEvent, GAEvent } from '@/config/analytics'

export function useAnalytics() {
  const trackGTMEvent = (event: GTMEvent) => {
    try {
      sendGTMEvent(event)
    } catch (error) {
      console.error('Failed to send GTM event:', error)
    }
  }

  const trackGAEvent = ({
    action,
    category = 'general',
    label,
    value,
    ...rest
  }: GAEvent) => {
    try {
      sendGAEvent({
        action,
        category,
        label,
        value,
        ...rest,
      })
    } catch (error) {
      console.error('Failed to send GA event:', error)
    }
  }

  return {
    trackGTMEvent,
    trackGAEvent,
  }
}
