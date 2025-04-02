// src/components/Services/CustomSoftwareDevelopment/skeletons.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for the Service Detail Hero section
 */
export function ServiceDetailHeroSkeleton(): React.ReactElement {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Static background */}
      <div className="absolute inset-0 bg-[rgba(17, 24, 39, 1)]" aria-hidden="true" />

      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem] relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-7xl sm:ml-0 ml-0 md:pt-0">
          {/* Main heading skeleton */}
          <div className="flex justify-between items-start mb-16 pt-4 md:pt-20">
            <div className="w-full max-w-4xl mr-8">
              <Skeleton className="h-16 w-full max-w-xl mb-4" />

              {/* Subheading with highlighted text */}
              <div className="mt-4">
                <Skeleton className="h-10 w-96" />
              </div>

              {/* Description skeleton */}
              <div className="mt-10">
                <Skeleton className="h-4 w-full max-w-2xl mb-2" />
                <Skeleton className="h-4 w-full max-w-2xl mb-2" />
                <Skeleton className="h-4 w-2/3 max-w-2xl" />
              </div>

              {/* CTA buttons skeleton */}
              <div className="mt-12 flex gap-5">
                <Skeleton className="h-12 w-36 rounded-lg" />
                <Skeleton className="h-12 w-48 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits grid skeleton */}
        <div className="absolute bottom-20 left-0 right-0 container mx-auto px-4 sm:px-6 max-w-[95rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-5"
                >
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton loader for the Credentials section
 */
export function CredentialsSkeleton(): React.ReactElement {
  return (
    <section className="py-20 bg-element-900">
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="text-center mb-12">
          <Skeleton className="h-5 w-40 mx-auto mb-2 bg-element-800" />
          <Skeleton className="h-12 w-96 mx-auto mb-4 bg-element-800" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto bg-element-800" />
        </div>
      </div>

      {/* Marquee skeleton */}
      <div className="w-full py-6">
        <div className="flex overflow-hidden">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="mx-6 flex-shrink-0">
                <Skeleton className="h-40 w-52 bg-element-800" />
              </div>
            ))}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-[95rem] mt-12">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-10 w-48 rounded-full bg-element-800" />
            ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton loader for the Project Stages section
 */
export function ProjectStagesSkeleton(): React.ReactElement {
  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
        {/* Section header skeleton */}
        <div className="mb-16">
          <div className="animate-pulse h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="animate-pulse h-5 w-full max-w-3xl bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="animate-pulse h-5 w-3/4 max-w-3xl bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Timeline skeleton */}
        <div className="mb-12">
          <div className="relative">
            <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-full w-full"></div>
            <div className="relative flex justify-between pt-4">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="animate-pulse w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="animate-pulse mt-2 h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Content panel skeleton */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 md:p-10 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left column */}
            <div className="md:col-span-7">
              <div className="animate-pulse h-6 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
              <div className="animate-pulse h-10 w-3/4 bg-gray-200 dark:bg-gray-600 rounded mb-6"></div>
              <div className="animate-pulse h-5 w-full bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
              <div className="animate-pulse h-5 w-full bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
              <div className="animate-pulse h-5 w-2/3 bg-gray-200 dark:bg-gray-600 rounded mb-8"></div>
              <div className="animate-pulse h-10 w-48 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
            </div>

            {/* Right column */}
            <div className="md:col-span-5">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="animate-pulse h-6 w-40 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
                <div className="space-y-3">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-start">
                        <div className="animate-pulse mr-3 mt-1 h-2 w-2 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                        <div className="animate-pulse h-4 w-full bg-gray-200 dark:bg-gray-600 rounded"></div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
