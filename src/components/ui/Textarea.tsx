// src/components/ui/Textarea.tsx
'use client';

import React, { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    error?: string;
    fullWidth?: boolean;
    variant?: 'default' | 'filled';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            label,
            helperText,
            error,
            fullWidth = true,
            variant = 'default',
            disabled,
            placeholder,
            ...props
        },
        ref
    ) => {
        const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
        const hasError = Boolean(error);
        const brandDark = '#1e1d28';

        const containerClasses = cn(
            'relative',
            fullWidth ? 'w-full' : 'w-auto'
        );

        const baseTextareaClasses = cn(
            // Base styles
            'w-full bg-transparent placeholder-gray-400 resize-none',
            'transition-all duration-200 ease-in-out',
            // Border bottom only
            'border-0 border-b-2',
            'rounded-none',
            // Cross-platform touch optimization
            'touch-manipulation',
            // Remove all focus/active effects and default styling
            'outline-none focus:outline-none active:outline-none',
            'focus:ring-0 active:ring-0',
            'appearance-none',
            // Padding and sizing
            'py-3 px-0 text-base leading-relaxed',
            // States
            hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#3C86FF]',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text',
            // Variant styles
            variant === 'filled' ? 'bg-gray-50 px-4 rounded-t-md' : '',
            className
        );

        const getTextColor = () => {
            return brandDark;
        };

        return (
            <div className={containerClasses}>
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="block text-sm font-medium mb-2"
                        style={{ color: brandDark }}
                    >
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <div className="relative">
                    <textarea
                        ref={ref}
                        id={textareaId}
                        className={baseTextareaClasses}
                        style={{
                            color: getTextColor(),
                        }}
                        disabled={disabled}
                        placeholder={placeholder}
                        {...props}
                    />
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

Textarea.displayName = 'Textarea';

export { Textarea };