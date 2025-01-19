// src/components/consent-banner.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/lib/utils'

export function ConsentBanner() {
  const [cookieConsent, setCookieConsent] = useLocalStorage(
    'cookie-consent',
    false
  )

  if (cookieConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4">
      <div className="mx-auto max-w-screen-xl">
        <p className="text-sm text-muted-foreground">
          We use cookies to improve your experience. By continuing to use our
          site, you agree to our use of cookies.
        </p>
        <div className="mt-4 flex gap-4">
          <Button onClick={() => setCookieConsent(true)} variant="default">
            Accept
          </Button>
          <Button
            onClick={() => (window.location.href = '/privacy')}
            variant="ghost"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}
