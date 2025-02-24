// src/components/ui/Button/index.tsx
import React, { forwardRef, memo, type ComponentPropsWithRef } from 'react';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define strict types for variants
interface ButtonVariant {
  type: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

interface ButtonSize {
  type: 'default' | 'sm' | 'lg' | 'icon';
}

interface ButtonAnimation {
  type: 'none' | 'pulse' | 'bounce' | 'slideUp' | 'glow' | 'ripple';
}

// Define the variant configuration interface
interface ButtonVariantsConfig {
  variant?: ButtonVariant['type'];
  size?: ButtonSize['type'];
  fullWidth?: boolean;
  animation?: ButtonAnimation['type'];
  className?: string;
}

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-element-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:transform active:scale-95 select-none',
  {
    variants: {
      variant: {
        default:
          'bg-element-500 text-primary-light border-2 border-element-500 hover:bg-primary-light hover:text-element-500 hover:border-element-500 shadow-sm hover:shadow-md dark:bg-element-600 dark:border-element-600 dark:hover:bg-primary-dark dark:hover:text-element-400 dark:hover:border-element-400',

        destructive:
          'bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md dark:bg-red-600 dark:hover:bg-red-700',

        outline:
          'border-2 border-element-500 bg-transparent text-element-500 hover:bg-element-500 hover:text-primary-light dark:border-element-400 dark:text-element-400 dark:hover:bg-element-600 dark:hover:text-primary-dark',

        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',

        ghost:
          'bg-transparent hover:bg-element-50 text-element-500 hover:text-element-600 dark:text-element-400 dark:hover:bg-element-950 dark:hover:text-element-300',

        link: 'text-element-500 underline-offset-4 hover:underline hover:text-element-600 dark:text-element-400 dark:hover:text-element-300 p-0 h-auto',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
      animation: {
        none: '',
        pulse: 'animate-pulse',
        bounce: 'animate-bounce',
        slideUp: 'hover:-translate-y-0.5 transition-transform',
        glow: 'hover:animate-glow',
        ripple:
          'relative overflow-hidden hover:before:animate-ripple before:absolute before:content-[""] before:w-full before:h-full before:bg-white/20 before:scale-0 before:opacity-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'none',
    },
  }
);

// Define button props interface
export interface ButtonProps
  extends Omit<ComponentPropsWithRef<'button'>, keyof ButtonVariantsConfig> {
  variant?: ButtonVariant['type'];
  size?: ButtonSize['type'];
  fullWidth?: boolean;
  animation?: ButtonAnimation['type'];
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingText?: string;
  className?: string;
}

// Create base button component
const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      fullWidth = false,
      animation = 'none',
      isLoading = false,
      leftIcon,
      rightIcon,
      loadingText,
      children,
      disabled = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Memoize button classes
    const buttonClasses = React.useMemo(() => {
      return cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
          animation,
          className,
        })
      );
    }, [variant, size, fullWidth, animation, className]);

    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={disabled || isLoading}
        type={type}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
              data-testid="loading-spinner"
            />
            <span>{loadingText ?? children}</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="mr-2 inline-flex" aria-hidden="true" data-testid="left-icon">
                {leftIcon}
              </span>
            )}
            <span>{children}</span>
            {rightIcon && (
              <span className="ml-2 inline-flex" aria-hidden="true" data-testid="right-icon">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

ButtonBase.displayName = 'Button';

// Memoize the button component with proper type
export const Button = memo(ButtonBase);

// Export variants function with proper type
export { buttonVariants };

// Type guard for variant validation
export function isButtonVariant(value: unknown): value is ButtonVariant['type'] {
  return (
    typeof value === 'string' &&
    ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'].includes(value)
  );
}

// Type guard for size validation
export function isButtonSize(value: unknown): value is ButtonSize['type'] {
  return typeof value === 'string' && ['default', 'sm', 'lg', 'icon'].includes(value);
}

// Type guard for animation validation
export function isButtonAnimation(value: unknown): value is ButtonAnimation['type'] {
  return (
    typeof value === 'string' &&
    ['none', 'pulse', 'bounce', 'slideUp', 'glow', 'ripple'].includes(value)
  );
}
