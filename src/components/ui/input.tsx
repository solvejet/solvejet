// components/ui/input.tsx
import React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  icon?: React.ReactNode
  iconClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, icon, iconClassName, type = 'text', ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const id = React.useId()

    React.useEffect(() => {
      setHasValue(Boolean(props.value || props.defaultValue))
    }, [props.value, props.defaultValue])

    return (
      <div className="relative w-full">
        {/* Input wrapper */}
        <div className="relative">
          {/* Icon container */}
          {icon && (
            <div
              className={cn(
                'absolute left-0 flex items-center justify-center',
                'transition-all duration-200',
                isFocused || hasValue ? 'top-6' : 'top-4',
                iconClassName
              )}
            >
              {icon}
            </div>
          )}

          {/* Input field */}
          <input
            id={id}
            type={type}
            className={cn(
              'peer w-full border-b bg-transparent transition-colors duration-200',
              'border-input hover:border-muted-foreground',
              'placeholder-transparent',
              'outline-none focus:outline-none focus:ring-0 focus:ring-offset-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive',
              icon ? 'px-10 pb-2 pt-6' : 'px-0 pb-2 pt-6',
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

          {/* Floating label */}
          <label
            htmlFor={id}
            className={cn(
              'pointer-events-none absolute left-0 text-muted-foreground',
              'transition-all duration-200',
              icon && 'left-10',
              isFocused || hasValue ? '-top-2 text-xs' : 'top-4 text-base',
              isFocused && 'text-primary',
              error && 'text-destructive'
            )}
          >
            {label}
          </label>
        </div>

        {/* Error message */}
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
