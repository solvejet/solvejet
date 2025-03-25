// src/components/Services/skeletons.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for the Service Hero section
 */
export function ServiceHeroSectionSkeleton(): React.ReactElement {
  return (
    <section className="relative w-full min-h-[70vh] pt-28 pb-16 bg-gray-900">
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="max-w-3xl">
          <Skeleton className="h-6 w-40 mb-4" />
          <Skeleton className="h-14 w-full max-w-2xl mb-4" />
          <Skeleton className="h-14 w-3/4 mb-8" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-5/6 mb-6" />
          <div className="flex flex-wrap gap-4 mt-8">
            <Skeleton className="h-12 w-36 rounded-lg" />
            <Skeleton className="h-12 w-40 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton loader for the Service Cards section
 */
export function ServiceCardsSectionSkeleton(): React.ReactElement {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-5 w-full max-w-xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 h-96">
                <div className="flex justify-between mb-6">
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-6" />
                <div className="flex flex-wrap gap-2 mb-6">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
                <Skeleton className="h-10 w-32 rounded-lg mt-6" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton loader for the Service Process section
 */
export function ServiceProcessSectionSkeleton(): React.ReactElement {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="text-center mb-16">
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-5 w-full max-w-xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 rounded-3xl p-6 relative">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-7 w-40 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton loader for the Service FAQ section
 */
export function ServiceFAQSectionSkeleton(): React.ReactElement {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="text-center mb-16">
          <Skeleton className="h-10 w-72 mx-auto mb-4" />
          <Skeleton className="h-5 w-full max-w-xl mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 rounded-xl p-6 mb-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton loader for the Service CTA section
 */
export function ServiceCTASectionSkeleton(): React.ReactElement {
  return (
    <section className="py-20 bg-element-900 dark:bg-element-900">
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-6 bg-white/20" />
          <Skeleton className="h-5 w-full max-w-xl mx-auto bg-white/20" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
          <Skeleton className="h-14 w-48 rounded-lg bg-white/20" />
          <Skeleton className="h-14 w-48 rounded-lg bg-white/20" />
        </div>
      </div>
    </section>
  );
}
