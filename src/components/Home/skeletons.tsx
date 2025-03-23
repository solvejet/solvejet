// src/components/Home/skeletons.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for the Hero section
 */
export function HeroSectionSkeleton(): React.ReactElement {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Static background */}
      <div className="absolute inset-0 bg-[rgba(17, 24, 39, 1)]" aria-hidden="true" />

      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem] relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-7xl sm:ml-0 ml-0 md:pt-0">
          {/* Main heading skeleton */}
          <div className="flex justify-between items-start mb-12 pt-4 md:pt-16">
            <div className="w-full max-w-4xl mr-8">
              <Skeleton className="h-16 w-full max-w-xl mb-4" />

              {/* Subheading with highlighted text */}
              <div className="mt-4">
                <Skeleton className="h-10 w-96" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom content skeleton */}
        <div className="absolute bottom-16 left-0 right-0 container mx-auto px-4 sm:px-6 max-w-[95rem]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <Skeleton className="h-20 w-full md:w-1/2" />

            {/* Client logos skeleton */}
            <div className="hidden md:flex items-center space-x-8">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-12 w-32" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton loader for the Industries Grid section
 */
export function IndustriesGridSkeleton(): React.ReactElement {
  return (
    <section className="py-24 bg-white rounded-t-3xl">
      <div className="container mx-auto px-4 max-w-7xl rounded-t-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
          <Skeleton className="h-12 w-48 mb-6 md:mb-0" />
          <Skeleton className="h-8 w-96" />
        </div>

        {/* Top row skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="aspect-[16/9] relative">
                <Skeleton className="h-full w-full rounded-2xl" />
              </div>
            ))}
        </div>

        {/* Bottom grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="aspect-square relative">
                <Skeleton className="h-full w-full rounded-2xl" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton loader for the Service Section
 */
export function ServiceSectionSkeleton(): React.ReactElement {
  return (
    <section className="py-24 bg-[#F5F5FB] dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="text-center mb-16">
          <Skeleton className="h-6 w-40 mx-auto mb-3" />
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden h-64">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
        </div>

        {/* Call to action section skeleton */}
        <div className="mt-16 rounded-3xl p-12 text-center relative overflow-hidden">
          <Skeleton className="h-12 w-96 mx-auto mb-6" />
          <Skeleton className="h-6 w-2/3 mx-auto mb-8" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-12 w-48 rounded-full mx-auto sm:mx-0" />
            <Skeleton className="h-12 w-48 rounded-full mx-auto sm:mx-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustSectionSkeleton(): React.JSX.Element {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-[95rem]">
        {/* Section Header skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-6 w-40 mx-auto mb-3" />
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>

        {/* Filter tabs skeleton */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>

        {/* Credentials Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm h-64"
              >
                <div className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    <Skeleton className="w-16 h-16 rounded-lg mr-4" />
                    <div>
                      <Skeleton className="h-6 w-32 mb-1" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-4 w-4/6" />
                  <div className="mt-auto pt-6">
                    <Skeleton className="h-9 w-32 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Credentials Marquee skeleton */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <Skeleton className="h-8 w-64 mx-auto" />
          </div>

          <div className="relative overflow-hidden py-8">
            <div className="flex space-x-6 overflow-hidden">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-20 w-64 rounded-xl flex-shrink-0" />
                ))}
            </div>
          </div>
        </div>

        {/* Client logos section skeleton */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <Skeleton className="h-8 w-64 mx-auto mb-3" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>

          <div className="relative overflow-hidden py-4">
            <div className="flex space-x-8 overflow-hidden">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-16 w-48 rounded-md flex-shrink-0" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add this to src/components/Home/skeletons.tsx

export function CaseStudySectionSkeleton(): React.ReactElement {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      {/* Section header skeleton */}
      <div className="container mx-auto px-4 max-w-[95rem] mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="max-w-2xl mb-8 md:mb-0">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>

          <Skeleton className="h-10 w-48 rounded-md" />
        </div>
      </div>

      {/* Vertical stack of case study cards skeleton */}
      <div className="container mx-auto px-4 max-w-[95rem]">
        {Array(3)
          .fill(0)
          .map((_, cardIndex) => (
            <div
              key={cardIndex}
              className="w-full mb-12 rounded-3xl overflow-hidden shadow-sm bg-white dark:bg-gray-800"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image section skeleton */}
                <div className="md:w-2/5 h-80 md:h-auto relative">
                  <Skeleton className="absolute inset-0" />
                  {/* Industry badge skeleton */}
                  <div className="absolute top-6 left-6">
                    <Skeleton className="h-8 w-32 rounded-full" />
                  </div>
                </div>

                {/* Content section skeleton */}
                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                  <div className="max-w-2xl">
                    {/* Title skeleton */}
                    <Skeleton className="h-10 w-4/5 mb-4" />

                    {/* Overview skeleton */}
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-6" />

                    {/* Challenge & Solution skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Skeleton className="h-6 w-40 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-4/5" />
                      </div>
                      <div>
                        <Skeleton className="h-6 w-40 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-4/5" />
                      </div>
                    </div>

                    {/* Results metrics skeleton */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {Array(4)
                        .fill(0)
                        .map((_, idx) => (
                          <Skeleton key={idx} className="h-20 rounded-xl" />
                        ))}
                    </div>

                    {/* CTA Button skeleton */}
                    <Skeleton className="h-10 w-48 rounded-md mt-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Call to action skeleton */}
      <div className="container mx-auto px-4 max-w-[95rem] mt-8 text-center">
        <Skeleton className="h-6 w-96 mx-auto mb-8" />
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Skeleton className="h-10 w-36 rounded-md mx-auto sm:mx-0" />
          <Skeleton className="h-10 w-48 rounded-md mx-auto sm:mx-0" />
        </div>
      </div>
    </section>
  );
}
