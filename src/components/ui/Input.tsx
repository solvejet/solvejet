// src/components/ui/Input.tsx
'use client';

import React, { forwardRef, type InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    error?: string;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    onRightIconClick?: () => void;
    loading?: boolean;
    fullWidth?: boolean;
    variant?: 'default' | 'filled';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type = 'text',
            label,
            helperText,
            error,
            leftIcon: LeftIcon,
            rightIcon: RightIcon,
            onRightIconClick,
            loading = false,
            fullWidth = true,
            variant = 'default',
            disabled,
            placeholder,
            ...props
        },
        ref
    ) => {
        const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
        const hasError = Boolean(error);
        const brandPrimary = '#3C86FF';
        const brandDark = '#1e1d28';

        const containerClasses = cn(
            'relative',
            fullWidth ? 'w-full' : 'w-auto'
        );

        const baseInputClasses = cn(
            // Base styles
            'w-full bg-transparent placeholder-gray-400',
            'transition-all duration-200 ease-in-out',
            // Border bottom only - with important to override inline styles
            'border-0 border-b-2 !border-b-2',
            'rounded-none',
            // Cross-platform touch optimization
            'touch-manipulation',
            // Remove all focus/active effects and default styling
            'outline-none focus:outline-none active:outline-none',
            'focus:ring-0 active:ring-0',
            'appearance-none',
            // Padding and sizing
            'py-3 text-base leading-relaxed',
            // Icon spacing
            LeftIcon ? 'pl-10' : 'pl-0',
            RightIcon || loading ? 'pr-10' : 'pr-0',
            // States - using classes instead of inline styles
            hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#3C86FF]',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text',
            // Variant styles
            variant === 'filled' ? 'bg-gray-50 px-4 rounded-t-md' : '',
            className
        );

        const getTextColor = () => {
            return brandDark;
        };

        const iconClasses = cn(
            'absolute top-1/2 transform -translate-y-1/2',
            'w-5 h-5',
            'pointer-events-none'
        );

        const rightIconClasses = cn(
            'absolute top-1/2 transform -translate-y-1/2 right-0',
            'w-5 h-5',
            onRightIconClick ? 'cursor-pointer pointer-events-auto transition-colors duration-200' : 'pointer-events-none'
        );

        const LoadingSpinner = () => (
            <svg
                className="absolute top-1/2 transform -translate-y-1/2 right-0 w-5 h-5 animate-spin"
                style={{ color: brandPrimary }}
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
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        );

        return (
            <div className={containerClasses}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium mb-2"
                        style={{ color: brandDark }}
                    >
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <div className="relative">
                    {LeftIcon && (
                        <LeftIcon
                            className={cn(iconClasses, 'left-0')}
                            style={{ color: '#9ca3af' }}
                        />
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        type={type}
                        className={baseInputClasses}
                        style={{
                            color: getTextColor(),
                        }}
                        disabled={disabled || loading}
                        placeholder={placeholder}
                        {...props}
                    />

                    {loading ? (
                        <LoadingSpinner />
                    ) : RightIcon ? (
                        <RightIcon
                            className={rightIconClasses}
                            style={{
                                color: onRightIconClick ? brandPrimary : '#9ca3af'
                            }}
                            onMouseEnter={(e) => {
                                if (onRightIconClick) {
                                    (e.currentTarget as SVGElement).style.color = '#2563eb';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (onRightIconClick) {
                                    (e.currentTarget as SVGElement).style.color = brandPrimary;
                                }
                            }}
                            onClick={onRightIconClick}
                        />
                    ) : null}
                </div>

                {(error || helperText) && (
                    <div className="mt-2">
                        {error ? (
                            <p className="text-sm text-red-500">{error}</p>
                        ) : helperText ? (
                            <p className="text-sm text-gray-500">{helperText}</p>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };