// src/components/ui/Button.tsx

'use client';

import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'gradient' | 'gradient-pulse' | 'gradient-breathe' | 'gradient-static' | 'gradient-flow' | 'gradient-flow-glow';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    fullWidth?: boolean;
    children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            icon: Icon,
            iconPosition = 'left',
            loading = false,
            fullWidth = false,
            disabled,
            children,
            type = 'button',
            ...props
        },
        ref
    ) => {
        const baseClasses = cn(
            // Base styles
            'inline-flex items-center justify-center gap-2 font-medium',
            'transition-all duration-300 ease-out',
            'border-0 rounded-xl',
            'cursor-pointer select-none',
            'whitespace-nowrap text-center',
            'touch-manipulation',
            'outline-none focus:outline-none active:outline-none',
            'focus:ring-0 active:ring-0',
            'transform-gpu',
            // Disabled state
            disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
            // Full width
            fullWidth ? 'w-full' : ''
        );

        const sizeClasses = {
            xs: 'h-7 px-3 text-xs min-w-[2rem]',
            sm: 'h-8 px-4 text-sm min-w-[2.5rem]',
            md: 'h-10 px-6 text-sm min-w-[3rem]',
            lg: 'h-12 px-8 text-base min-w-[3.5rem]',
            xl: 'h-14 px-10 text-lg min-w-[4rem]',
        };

        const variantClasses = {
            primary: cn(
                'text-white shadow-lg',
                'transition-all duration-300 ease-out',
                'active:scale-95',
                'shadow-lg hover:shadow-xl'
            ),
            secondary: cn(
                'text-white shadow-md',
                'transition-all duration-300 ease-out',
                'active:scale-95',
                'shadow-md hover:shadow-lg'
            ),
            outline: cn(
                'bg-transparent ring-2 ring-inset transition-all duration-300 ease-out',
                'active:scale-95'
            ),
            ghost: cn(
                'bg-transparent transition-all duration-300 ease-out',
                'active:scale-95'
            ),
            link: cn(
                'bg-transparent underline-offset-4 transition-all duration-300 ease-out',
                'hover:underline active:scale-95',
                'h-auto p-0 font-normal shadow-none'
            ),
            destructive: cn(
                'bg-red-500 text-white shadow-lg shadow-red-500/25',
                'hover:bg-red-600 hover:shadow-xl hover:shadow-red-600/30',
                'active:bg-red-600 active:scale-95'
            ),
            gradient: cn(
                'text-white shadow-lg relative overflow-hidden',
                'transition-all duration-300 ease-out',
                'active:scale-95',
                // Multi-color gradient with intervals
                'animate-gradient-interval'
            ),
            'gradient-pulse': cn(
                'text-white shadow-lg relative overflow-hidden',
                'transition-all duration-300 ease-out',
                'active:scale-95',
                // Dramatic color shift animation
                'animate-gradient-pulse'
            ),
            'gradient-breathe': cn(
                'text-white shadow-lg relative overflow-hidden',
                'transition-all duration-300 ease-out',
                'active:scale-95',
                'shadow-lg hover:shadow-xl',
                // Breathing gradient with shadow changes
                'animate-gradient-breathe'
            ),
            'gradient-static': cn(
                'text-white shadow-lg relative overflow-hidden',
                'transition-all duration-300 ease-out',
                'active:scale-95',
                // True static intervals
                'animate-gradient-static'
            ),
            'gradient-flow': cn(
                'text-white shadow-lg relative overflow-hidden',
                'transition-all duration-300 ease-out',
                'active:scale-95',
                'hover:shadow-xl',
                // New smooth flowing gradient
                'animate-gradient-flow'
            ),
            'gradient-flow-glow': cn(
                'text-white shadow-lg relative overflow-hidden',
                'transition-all duration-300 ease-out',
                'active:scale-95',
                'hover:shadow-xl',
                // New flowing gradient with glow effect
                'animate-gradient-flow-glow'
            ),
        };

        // Apply brand colors using inline styles for precise color control
        const getBrandStyles = () => {
            const brandPrimary = '#3C86FF';
            const brandDark = '#1e1d28';
            const brandLight = '#f8fbff';

            switch (variant) {
                case 'primary':
                    return {
                        backgroundColor: brandPrimary,
                        boxShadow: `0 4px 14px 0 ${brandPrimary}40`,
                        '--hover-bg': '#2563eb',
                        '--hover-shadow': `0 6px 20px 0 ${brandPrimary}60`,
                    } as React.CSSProperties & { [key: string]: string };

                case 'secondary':
                    return {
                        backgroundColor: brandDark,
                        boxShadow: `0 4px 14px 0 ${brandDark}40`,
                        '--hover-bg': '#0f0e14',
                        '--hover-shadow': `0 6px 20px 0 ${brandDark}60`,
                    } as React.CSSProperties & { [key: string]: string };

                case 'outline':
                    return {
                        color: brandPrimary,
                        borderColor: brandPrimary,
                        '--hover-bg': brandPrimary,
                        '--hover-color': '#ffffff',
                        '--hover-border': '#2563eb',
                    } as React.CSSProperties & { [key: string]: string };

                case 'ghost':
                    return {
                        color: brandPrimary,
                        '--hover-bg': brandLight,
                        '--hover-color': '#2563eb',
                        '--active-bg': '#e0efff',
                    } as React.CSSProperties & { [key: string]: string };

                case 'link':
                    return {
                        color: brandPrimary,
                        '--hover-color': '#2563eb',
                    } as React.CSSProperties & { [key: string]: string };

                case 'gradient':
                case 'gradient-pulse':
                case 'gradient-breathe':
                case 'gradient-static':
                case 'gradient-flow':
                case 'gradient-flow-glow':
                    return {
                        // No static background needed - handled by CSS animations
                    } as React.CSSProperties & { [key: string]: string };

                default:
                    return {};
            }
        };

        const iconSizeClasses = {
            xs: 'w-3 h-3',
            sm: 'w-3.5 h-3.5',
            md: 'w-4 h-4',
            lg: 'w-4 h-4',
            xl: 'w-5 h-5',
        };

        const isIconOnly = !children && Icon;
        const iconOnlyClasses = {
            xs: 'w-7 h-7 p-0',
            sm: 'w-8 h-8 p-0',
            md: 'w-10 h-10 p-0',
            lg: 'w-12 h-12 p-0',
            xl: 'w-14 h-14 p-0',
        };

        const LoadingSpinner = () => (
            <svg
                className={cn('animate-spin', iconSizeClasses[size])}
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
            <button
                className={cn(
                    baseClasses,
                    sizeClasses[size],
                    variantClasses[variant],
                    isIconOnly ? iconOnlyClasses[size] : '',
                    className
                )}
                style={{
                    ...getBrandStyles(),
                    ...(!disabled && !loading && variant === 'primary' && {
                        '--tw-bg-opacity': '1',
                    }),
                    ...(!disabled && !loading && variant === 'secondary' && {
                        '--tw-bg-opacity': '1',
                    }),
                    // CSS variables for hover states
                    ...(!disabled && !loading && {
                        '--transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }),
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                    if (!disabled && !loading) {
                        const target = e.currentTarget;
                        const styles = getBrandStyles();
                        if (styles['--hover-bg']) {
                            target.style.backgroundColor = styles['--hover-bg'];
                        }
                        if (styles['--hover-shadow']) {
                            target.style.boxShadow = styles['--hover-shadow'];
                        }
                        if (styles['--hover-color']) {
                            target.style.color = styles['--hover-color'];
                        }
                        if (styles['--hover-border']) {
                            target.style.borderColor = styles['--hover-border'];
                        }
                    }
                }}
                onMouseLeave={(e) => {
                    if (!disabled && !loading) {
                        const target = e.currentTarget;
                        if (variant === 'primary') {
                            target.style.backgroundColor = '#3C86FF';
                            target.style.boxShadow = '0 4px 14px 0 #3C86FF40';
                        } else if (variant === 'secondary') {
                            target.style.backgroundColor = '#1e1d28';
                            target.style.boxShadow = '0 4px 14px 0 #1e1d2840';
                        } else if (variant === 'outline') {
                            target.style.backgroundColor = 'transparent';
                            target.style.borderColor = '#3C86FF';
                            target.style.color = '#3C86FF';
                        } else if (variant === 'ghost') {
                            target.style.backgroundColor = 'transparent';
                            target.style.color = '#3C86FF';
                        } else if (variant === 'link') {
                            target.style.color = '#3C86FF';
                        } else if (variant === 'gradient' || variant === 'gradient-pulse' || variant === 'gradient-breathe' || variant === 'gradient-static' || variant === 'gradient-flow' || variant === 'gradient-flow-glow') {
                            // Gradient buttons handle their own hover effects via CSS animations
                        }
                    }
                }}
                disabled={disabled || loading}
                ref={ref}
                type={type}
                {...props}
            >
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {Icon && iconPosition === 'left' && (
                            <Icon className={iconSizeClasses[size]} />
                        )}
                        {children}
                        {Icon && iconPosition === 'right' && (
                            <Icon className={iconSizeClasses[size]} />
                        )}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };