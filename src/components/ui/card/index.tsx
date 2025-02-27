// src/components/ui/card/index.tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-lg border bg-white dark:bg-gray-800 shadow-sm', {
  variants: {
    variant: {
      default: 'border-gray-200 dark:border-gray-700',
      outline: 'border-2',
      ghost: 'border-transparent shadow-none bg-transparent dark:bg-transparent',
    },
    size: {
      default: '',
      sm: 'p-4',
      lg: 'p-8',
    },
    hover: {
      true: 'transition-all duration-200 hover:shadow-md',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    hover: false,
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardVariants({ variant, size, hover, className }))} {...props} />
    );
  }
);

Card.displayName = 'Card';

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
        {title && <h3 className="font-semibold leading-none tracking-tight">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Content Component
export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
  }
);

CardContent.displayName = 'CardContent';

// Card Footer Component
export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />;
  }
);

CardFooter.displayName = 'CardFooter';

export { cardVariants };
