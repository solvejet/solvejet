// components/ui/input.tsx
'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type = 'text', ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    React.useEffect(() => {
      setHasValue(Boolean(props.value || props.defaultValue))
    }, [props.value, props.defaultValue])

    return (
      <div className="relative w-full">
        <div className="relative">
          <input
            type={type}
            className={cn(
              'peer w-full border-b bg-transparent pb-2 pt-6 text-base outline-none transition-all',
              'border-input hover:border-muted-foreground',
              'placeholder-transparent',
              'focus:border-primary focus:outline-none focus:ring-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive focus:border-destructive',
              icon && 'pl-10',
              // Add these classes to disable autofill background
              '[&:-webkit-autofill]:bg-transparent',
              '[&:-webkit-autofill]:shadow-[0_0_0px_1000px_transparent_inset]',
              '[&:-webkit-autofill]:transition-[background-color_0s_9999999999s]',
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
              'pointer-events-none absolute left-0 top-5 origin-[0] text-base text-muted-foreground transition-all duration-200',
              'peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground',
              'peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-primary',
              (isFocused || hasValue) && '-top-0.5 scale-75',
              error && 'text-destructive peer-focus:text-destructive',
              icon && 'left-10'
            )}
          >
            {label}
          </label>

          {icon && (
            <div className="absolute left-0 top-5 text-muted-foreground">
              {icon}
            </div>
          )}
        </div>

        {error && (
          <div className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="h-3 w-3" />
            <p>{error}</p>
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
