// src/hooks/use-locked-body.ts
import { useEffect, useState } from 'react'

// Reuse these values throughout the hook
const LOCK_STYLES = {
  overflow: 'hidden',
  paddingRight: 'var(--scrollbar-compensation)',
} as const

/**
 * Custom hook to lock/unlock body scroll
 * @param {boolean} initialState - Initial lock state
 * @returns {[boolean, (locked: boolean) => void]} Array containing current lock state and setter
 */
export function useLockedBody(
  initialLocked = false
): [boolean, (locked: boolean) => void] {
  const [locked, setLocked] = useState(initialLocked)

  // Update state if initialLocked changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked)
    }
    // We want this effect to only run if initialLocked changes, not if locked changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked])

  // Handle body locking
  useEffect(() => {
    if (!locked) return

    // Get original body overflow and padding
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    // Get the scrollbar width
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth

    // Set scrollbar compensation variable
    document.documentElement.style.setProperty(
      '--scrollbar-compensation',
      `${scrollBarWidth}px`
    )

    // Apply locking styles
    document.body.style.overflow = LOCK_STYLES.overflow
    document.body.style.paddingRight = LOCK_STYLES.paddingRight

    // Clean up function
    return () => {
      // Remove scrollbar compensation
      document.documentElement.style.removeProperty('--scrollbar-compensation')

      // Reset original styles
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [locked]) // Only re-run effect if locked state changes

  return [locked, setLocked]
}

/**
 * Custom hook that prevents body scroll when a condition is met
 * and restores it when that condition is no longer met
 * @param {boolean} condition - The condition that triggers scroll lock
 */
export function usePreventScroll(condition: boolean): void {
  useEffect(() => {
    if (!condition) return

    // Save the current scroll position
    const scrollY = window.scrollY

    // Add styles to prevent scrolling
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = `-${scrollY}px`

    // Cleanup function to restore scrolling
    return () => {
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
  }, [condition]) // Only re-run effect if condition changes
}

/**
 * Get a value indicating whether the current device is a touch device
 * @returns {boolean} True if the device supports touch input, false otherwise
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false

  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error msMaxTouchPoints is available in IE11 and older versions of Edge
    navigator.msMaxTouchPoints > 0
  )
}
