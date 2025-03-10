// src/components/ui/skeleton.tsx
import { cn } from '@/lib/utils';
import type { JSX } from 'react';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps): JSX.Element {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-200 dark:bg-slate-700', className)}
      {...props}
    />
  );
}
