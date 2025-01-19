// components/ui/input.tsx
'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    React.useEffect(() => {
      setHasValue(Boolean(props.value || props.defaultValue))
    }, [props.value, props.defaultValue])

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            'peer w-full rounded-lg border bg-transparent px-4 pb-2 pt-6 text-base',
            'border-gray-300 dark:border-gray-600',
            'focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:border-primary/70',
            'placeholder-transparent transition-all duration-200 ease-in-out',
            error &&
              'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          ref={ref}
          placeholder={label}
          {...props}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          onChange={(e) => {
            setHasValue(e.target.value !== '')
            props.onChange?.(e)
          }}
        />
        <label
          className={cn(
            'pointer-events-none absolute left-4 top-4',
            'text-gray-500 transition-all duration-200 ease-in-out',
            'peer-placeholder-shown:top-4 peer-placeholder-shown:text-base',
            'peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary',
            (isFocused || hasValue) && 'top-2 text-xs',
            error && 'text-red-500 peer-focus:text-red-500'
          )}
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
