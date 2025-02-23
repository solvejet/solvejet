// src/components/ui/Image.tsx
'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ImageProps
  extends Omit<React.ComponentProps<typeof NextImage>, 'alt' | 'width' | 'height'> {
  alt: string;
  width: number;
  height: number;
  fallback?: string;
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2' | '2:1';
  className?: string;
  wrapperClassName?: string;
  showLoader?: boolean;
  loadingBehavior?: 'lazy' | 'eager';
  onLoadingComplete?: () => void;
}

const aspectRatioClasses = {
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '3:2': 'aspect-[3/2]',
  '2:1': 'aspect-[2/1]',
} as const;

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fallback = '/placeholder.webp',
      aspectRatio = '16:9',
      className = '',
      wrapperClassName = '',
      width,
      height,
      showLoader = true,
      loadingBehavior = 'lazy',
      onLoadingComplete,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [currentSrc, setCurrentSrc] = useState<string | typeof src>(src);

    useEffect((): void => {
      setCurrentSrc(src);
      setError(false);
      setIsLoading(true);
    }, [src]);

    const handleError = (): void => {
      setError(true);
      setCurrentSrc(fallback);
    };

    const handleLoadingComplete = (img: HTMLImageElement): void => {
      setIsLoading(false);
      onLoadingComplete?.();

      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development') {
        const performanceEntry =
          img.getAttribute('fetchpriority') === 'high'
            ? performance.getEntriesByName(img.src)[0]
            : null;

        if (performanceEntry) {
          // Using allowed console method
          console.warn('Image Performance Metrics:', {
            src: img.src,
            loadTime: performanceEntry.duration,
            dimensions: `${String(width)}x${String(height)}`,
          });
        }
      }
    };

    return (
      <div
        className={cn(
          'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
          aspectRatioClasses[aspectRatio],
          wrapperClassName
        )}
      >
        <NextImage
          ref={ref}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loadingBehavior}
          quality={90}
          className={cn(
            'object-cover duration-700 ease-in-out',
            isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0',
            className
          )}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
          {...props}
        />

        {showLoader && isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 dark:bg-gray-800/80">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <span className="text-sm text-gray-500 dark:text-gray-400">Failed to load image</span>
          </div>
        )}
      </div>
    );
  }
);

Image.displayName = 'Image';
