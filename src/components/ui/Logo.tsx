// src/components/ui/Logo.tsx
'use client';

import React, { memo } from 'react';

interface LogoProps {
    className?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    variant?: 'default' | 'white' | 'minimal';
}

// Utility function for className merging
function clsx(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

// CSS Grid Logo Component
const Logo = memo(({ className, size = 'md', variant = 'default' }: LogoProps) => {
    const sizeClasses = {
        xs: 'w-4 h-4',      // 16px
        sm: 'w-6 h-6',      // 24px
        md: 'w-8 h-8',      // 32px
        lg: 'w-12 h-12',    // 48px
        xl: 'w-16 h-16',    // 64px
        '2xl': 'w-20 h-20', // 80px
        '3xl': 'w-24 h-24'  // 96px
    };

    const colorClasses = {
        default: 'bg-brand-500',
        white: 'bg-white',
        minimal: 'bg-gray-400'
    };

    return (
        <div className={clsx('relative inline-block', sizeClasses[size], className)}>
            <div className="absolute grid grid-cols-4 gap-[0.15em] w-full h-full p-[0.1em]">
                {/* Row 1 - 3 dots */}
                <div className={clsx('rounded-full', colorClasses[variant], 'col-start-1')} />
                <div className={clsx('rounded-full', colorClasses[variant], 'col-start-2')} />
                <div className={clsx('rounded-full', colorClasses[variant], 'col-start-3')} />
                <div className="col-start-4" />

                {/* Row 2 - 3 dots offset */}
                <div className="col-start-1" />
                <div className={clsx('rounded-full', colorClasses[variant], 'col-start-2')} />
                <div className={clsx('rounded-full', colorClasses[variant], 'col-start-3')} />
                <div className={clsx('rounded-full', colorClasses[variant], 'col-start-4')} />

                {/* Row 3 - 1 dot */}
                <div className="col-start-1" />
                <div className={clsx('rounded-full', colorClasses[variant], 'col-start-2')} />
                <div className="col-start-3" />
                <div className="col-start-4" />

                {/* Row 4 - 1 dot */}
                <div className="col-start-1" />
                <div className={clsx('rounded-full', colorClasses[variant], 'col-start-2')} />
                <div className="col-start-3" />
                <div className="col-start-4" />
            </div>
        </div>
    );
});

Logo.displayName = 'Logo';

export default Logo;