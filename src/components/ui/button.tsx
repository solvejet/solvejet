// components/ui/button.tsx
import React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden text-sm font-medium transition-all duration-500 before:absolute before:inset-0 before:z-0 before:transition-all before:duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-2 border-foreground bg-transparent text-foreground before:-translate-x-full before:bg-foreground hover:text-background hover:before:translate-x-0',
        outline:
          'border-2 border-foreground/80 bg-transparent text-foreground before:-translate-x-full before:bg-foreground hover:text-background hover:before:translate-x-0',
        ghost:
          'text-foreground before:-translate-y-full before:bg-foreground hover:text-background hover:before:translate-y-0',
        transparent:
          'border border-foreground/20 bg-transparent text-foreground before:scale-x-0 before:bg-foreground hover:border-foreground hover:text-background before:origin-left hover:before:scale-x-100',
        shine:
          'border border-foreground/20 bg-transparent text-foreground before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-foreground before:transition-all before:duration-500 after:absolute after:left-0 after:top-0 after:h-[3px] after:w-0 after:bg-foreground after:transition-all after:duration-500 hover:border-foreground hover:before:h-0 hover:after:w-full',
        destructive:
          'border-2 border-destructive bg-transparent text-destructive before:-translate-x-full before:bg-destructive hover:text-background hover:before:translate-x-0',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 py-1 text-xs',
        lg: 'h-12 px-6 py-3 text-base',
        xl: 'h-14 px-8 py-4 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  fullWidth?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, isLoading, children, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, fullWidth, className }),
          'group'
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-500">
          {isLoading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Loading...</span>
            </>
          ) : (
            children
          )}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'
