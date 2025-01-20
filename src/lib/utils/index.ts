// lib/utils/index.ts
"use client"

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useState, useEffect, useCallback, RefObject, useRef } from 'react'

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}

/**
 * Format currency values
 */
export function formatCurrency(
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount)
}

/**
 * Format dates
 */
export function formatDate(
    date: Date | string,
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    },
    locale: string = 'en-US'
): string {
    return new Intl.DateTimeFormat(locale, options).format(
        typeof date === 'string' ? new Date(date) : date
    )
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean = false

    return function executedFunction(...args: Parameters<T>): void {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => {
                inThrottle = false
            }, limit)
        }
    }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, length: number): string {
    return text.length > length ? `${text.substring(0, length)}...` : text
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
}

/**
 * Generate random ID
 */
export function generateId(length: number = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`
}

/**
 * Sleep function for async operations
 */
export const sleep = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms))

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * Capitalize string
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Handle API errors
 */
export function handleApiError(error: unknown): string {
    if (error instanceof Error) return error.message
    if (typeof error === 'string') return error
    return 'An unknown error occurred'
}

/**
 * Remove HTML tags from string
 */
export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>?/gm, '')
}

/**
 * Check if object is empty
 */
export function isEmptyObject(obj: Record<string, unknown>): boolean {
    return Object.keys(obj).length === 0
}

/**
 * Parse query string to object
 */
export function parseQueryString(queryString: string): Record<string, string> {
    return Object.fromEntries(new URLSearchParams(queryString))
}

/**
 * Custom hook for handling click outside
 */
export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T>,
    handler: () => void
): void {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [ref, handler])
}

/**
 * Custom hook for local storage
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    const setValue = useCallback(
        (value: T | ((prevValue: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value
                setStoredValue(valueToStore)
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore))
                }
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error)
            }
        },
        [key, storedValue]
    )

    return [storedValue, setValue]
}

/**
 * Custom hook for media queries
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches
        }
        return false
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia(query)
            const handler = (event: MediaQueryListEvent) => setMatches(event.matches)

            mediaQuery.addEventListener('change', handler)
            return () => mediaQuery.removeEventListener('change', handler)
        }
    }, [query])

    return matches
}

/**
 * Custom hook for managing previous value
 */
export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>(value)

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}

/**
 * Custom hook for managing async state
 */
export function useAsync<T, E = string>(
    asyncFunction: () => Promise<T>,
    immediate = true
) {
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
    const [value, setValue] = useState<T | null>(null)
    const [error, setError] = useState<E | null>(null)

    const execute = useCallback(() => {
        setStatus('pending')
        setValue(null)
        setError(null)

        return asyncFunction()
            .then((response) => {
                setValue(response)
                setStatus('success')
            })
            .catch((error) => {
                setError(error)
                setStatus('error')
            })
    }, [asyncFunction])

    useEffect(() => {
        if (immediate) {
            execute()
        }
    }, [execute, immediate])

    return { execute, status, value, error }
}

/**
 * Custom hook for detecting if component is mounted
 */
export function useMounted(): boolean {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    return mounted
}