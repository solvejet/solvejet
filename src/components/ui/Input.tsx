// src/components/ui/Input.tsx
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define strict types for variants
type InputVariantType = 'default' | 'error' | 'success';
type InputSizeType = 'default' | 'sm' | 'lg';

// Define interfaces for component props
interface PasswordRevealProps {
  show: boolean;
  onToggle: () => void;
  showIcon?: React.ReactNode;
  hideIcon?: React.ReactNode;
}

interface StatusIconProps {
  variant: InputVariantType;
}

const inputVariants = cva(
  'flex rounded-md border bg-white text-primary-dark transition-colors duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-element-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-primary-light dark:placeholder:text-gray-500',
  {
    variants: {
      variant: {
        default:
          'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600',
        error:
          'border-red-500 hover:border-red-600 focus:ring-red-500 dark:border-red-600 dark:hover:border-red-500',
        success:
          'border-green-500 hover:border-green-600 focus:ring-green-500 dark:border-green-600 dark:hover:border-green-500',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-8 px-3 py-1 text-xs',
        lg: 'h-12 px-6 py-3 text-base',
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
);

// Password reveal button component
const PasswordRevealButton = React.memo(function PasswordRevealButton({
  show,
  onToggle,
  showIcon,
  hideIcon,
}: PasswordRevealProps): React.ReactElement {
  const defaultShowIcon = <Eye className="h-4 w-4" />;
  const defaultHideIcon = <EyeOff className="h-4 w-4" />;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center justify-center w-8 h-8 transition-colors duration-200 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      {show ? hideIcon ?? defaultHideIcon : showIcon ?? defaultShowIcon}
    </button>
  );
});

PasswordRevealButton.displayName = 'PasswordRevealButton';

// Status icon component
const StatusIcon = React.memo(function StatusIcon({
  variant,
}: StatusIconProps): React.ReactElement | null {
  if (variant === 'error') {
    return <AlertCircle className="h-4 w-4 text-red-500" />;
  }
  if (variant === 'success') {
    return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  }
  return null;
});

StatusIcon.displayName = 'StatusIcon';

// Define input props interface
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string | undefined;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  showPasswordIcon?: React.ReactNode;
  hidePasswordIcon?: React.ReactNode;
  size?: InputSizeType;
  variant?: InputVariantType;
}

// Create base input component
const InputBase = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      fullWidth = false,
      type = 'text',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      id: propId,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    // Generate unique IDs for accessibility
    const uniqueId = React.useId();
    const id = propId ?? uniqueId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    // Password visibility toggle
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = React.useCallback(() => {
      setShowPassword(prev => !prev);
    }, []);

    // Compute input type based on password visibility
    const computedType = React.useMemo(() => {
      if (type === 'password' && showPassword) {
        return 'text';
      }
      return type;
    }, [type, showPassword]);

    // Memoize aria-describedby
    const describedBy = React.useMemo(() => {
      const ids = [];
      if (error) ids.push(errorId);
      if (hint) ids.push(hintId);
      if (ariaDescribedBy) ids.push(ariaDescribedBy);
      return ids.join(' ') || undefined;
    }, [error, hint, ariaDescribedBy, errorId, hintId]);

    // Memoize container classes
    const containerClasses = React.useMemo(() => {
      return cn('relative', fullWidth && 'w-full');
    }, [fullWidth]);

    // Memoize input wrapper classes
    const inputWrapperClasses = React.useMemo(() => {
      return cn('relative flex items-center');
    }, []);

    // Memoize input classes
    const inputClasses = React.useMemo(() => {
      const hasRightDecorator =
        (rightIcon ?? false) || type === 'password' || variant === 'error' || variant === 'success';

      return cn(
        inputVariants({ variant, size, fullWidth }),
        leftIcon && 'pl-10',
        hasRightDecorator && 'pr-10',
        className
      );
    }, [variant, size, fullWidth, leftIcon, rightIcon, type, className]);

    return (
      <div className={containerClasses}>
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
        )}

        <div className={inputWrapperClasses}>
          {leftIcon && (
            <span className="absolute left-3 flex items-center justify-center text-gray-400 dark:text-gray-500">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={computedType}
            aria-invalid={variant === 'error'}
            aria-describedby={describedBy}
            className={inputClasses}
            {...props}
          />

          <div className="absolute right-3 flex items-center gap-2">
            {rightIcon && !showPasswordToggle && rightIcon}

            {type === 'password' && showPasswordToggle && (
              <PasswordRevealButton
                show={showPassword}
                onToggle={togglePasswordVisibility}
                showIcon={props.showPasswordIcon}
                hideIcon={props.hidePasswordIcon}
              />
            )}

            {(variant === 'error' || variant === 'success') && !showPasswordToggle && (
              <StatusIcon variant={variant} />
            )}
          </div>
        </div>

        {hint && !error && (
          <p id={hintId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-500 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputBase.displayName = 'Input';

// Export memoized component
export const Input = React.memo(InputBase);

// Export variants function
export { inputVariants };
