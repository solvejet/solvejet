// src/app/(website)/case-studies/[slug]/loading.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function CaseStudyLoading(): React.ReactElement {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-element-900 to-element-700 pt-32 pb-20">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Navigation link */}
          <div className="flex flex-wrap items-center justify-between mb-10">
            <Link
              href="/case-studies"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 group mb-4 md:mb-0"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>Back to Case Studies</span>
            </Link>

            {/* Publication date skeleton */}
            <div className="flex items-center">
              <Skeleton className="h-6 w-32 bg-white/20" />
            </div>
          </div>

          {/* Industry badge skeleton */}
          <div className="mb-6">
            <Skeleton className="h-8 w-32 rounded-full bg-white/20" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content skeleton */}
            <div className="flex flex-col">
              <Skeleton className="h-12 w-3/4 mb-4 bg-white/20" />
              <Skeleton className="h-8 w-full mb-4 bg-white/20" />
              <Skeleton className="h-8 w-1/2 mb-6 bg-white/20" />
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Skeleton className="h-6 w-full mb-2 bg-white/20" />
                <Skeleton className="h-6 w-full mb-2 bg-white/20" />
                <Skeleton className="h-6 w-2/3 bg-white/20" />
              </div>
            </div>

            {/* Hero image skeleton */}
            <div className="relative mt-8 lg:mt-0">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-white/20">
                <Skeleton className="h-full w-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute bottom-0 w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,213.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Table of contents skeleton */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-nowrap items-center py-3 overflow-x-auto hide-scrollbar">
            <Skeleton className="h-6 w-20 mr-4" />
            <div className="flex space-x-6">
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <Skeleton key={i} className="h-5 w-24" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content sections skeleton */}
      <div className="pb-16">
        {/* Challenge section skeleton */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="h-12 w-1 bg-red-500 mr-4 rounded-full"></div>
                <Skeleton className="h-10 w-48" />
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-10">
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-4/5" />
              </div>

              {/* Challenges grid skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Skeleton className="h-8 w-8 rounded-full mr-3" />
                      <Skeleton className="h-6 w-40" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results section skeleton */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-10">
                <div className="h-12 w-1 bg-blue-500 mr-4 rounded-full"></div>
                <Skeleton className="h-10 w-48" />
              </div>

              {/* Metrics grid skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Skeleton className="h-8 w-8 rounded-lg mr-2" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-10 w-20 mb-2" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>

              {/* Charts placeholder */}
              <div className="mb-12">
                <Skeleton className="h-10 w-48 mx-auto mb-6" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                    >
                      <Skeleton className="h-8 w-48 mb-4" />
                      <Skeleton className="h-80 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies section skeleton */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-12">
                <div className="h-12 w-1 bg-gray-400 mr-4 rounded-full"></div>
                <Skeleton className="h-10 w-48" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <Skeleton className="h-8 w-32 mb-4" />
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5].map((_, j) => (
                        <Skeleton key={j} className="h-10 w-24 rounded-lg" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA section skeleton */}
        <section className="py-16 bg-gradient-to-br from-element-900 to-element-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Skeleton className="h-12 w-2/3 mx-auto mb-6 bg-white/20" />
              <Skeleton className="h-6 w-full mx-auto mb-6 bg-white/20" />
              <Skeleton className="h-12 w-48 mx-auto rounded-full bg-white/20" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
