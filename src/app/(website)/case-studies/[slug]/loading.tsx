// src/app/(website)/case-studies/[slug]/loading.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ChevronLeft, Laptop, Server, Database, Lock } from 'lucide-react';
import { SolvejetLogo } from '@/components/ui/SolvejetLogo';
import { cn } from '@/lib/utils';

export default function CaseStudyLoading(): React.ReactElement {
  // Create arrays for multiple skeleton items
  const metrics = Array(4).fill(0);
  const highlights = Array(4).fill(0);
  const technologies = Array(8).fill(0);
  const features = Array(4).fill(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header section with navbar */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <SolvejetLogo height={40} />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center text-element-600 dark:text-element-400 hover:text-element-800 dark:hover:text-element-300 text-sm font-medium transition-colors"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              <span>Back to Case Studies</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section with shimmering animation */}
      <section className="relative pt-16 pb-20 bg-gradient-to-br from-gray-900 to-element-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-element-800/30 blur-3xl animate-pulse"
            style={{ animationDuration: '8s' }}
          ></div>
          <div
            className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-element-700/20 blur-3xl animate-pulse"
            style={{ animationDuration: '12s' }}
          ></div>
        </div>

        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-20 bg-grid"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Content column with staggered skeleton animations */}
            <div className="w-full lg:w-1/2 text-white">
              <div className="space-y-8">
                <div>
                  <Skeleton className="h-8 w-40 rounded-full bg-white/10 mb-4" />
                  <Skeleton className="h-12 w-full sm:w-4/5 bg-white/10 mb-3" />
                  <Skeleton className="h-12 w-full sm:w-3/5 bg-white/10 mb-6" />
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-full bg-white/10" />
                    <Skeleton className="h-5 w-full bg-white/10" />
                    <Skeleton className="h-5 w-4/5 bg-white/10" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-24 rounded-full bg-white/10" />
                  <Skeleton className="h-8 w-32 rounded-full bg-white/10" />
                  <Skeleton className="h-8 w-28 rounded-full bg-white/10" />
                </div>

                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-10 w-40 rounded-md bg-white/10" />
                  <Skeleton className="h-10 w-48 rounded-md bg-white/10" />
                </div>
              </div>
            </div>

            {/* Image placeholder with shimmer effect */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-gray-800/50 to-element-800/50 shimmer-container">
                <div className="absolute inset-0 animate-pulse" style={{ animationDuration: '2s' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Results metrics with skeleton loading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {metrics.map((_, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <Skeleton className="h-16 w-16 rounded-full bg-white/10" />
                  <Skeleton className="h-10 w-20 bg-white/10" />
                  <Skeleton className="h-5 w-32 bg-white/10" />
                  <Skeleton className="h-4 w-24 bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curved divider at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="fill-gray-50 dark:fill-gray-900 w-full h-auto"
          >
            <path d="M0,96L80,80C160,64,320,32,480,32C640,32,800,64,960,80C1120,96,1280,96,1360,96L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Page navigation tabs */}
      <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar py-3 px-4 gap-8">
            {['Overview', 'Challenge', 'Solution', 'Features', 'Architecture', 'Results'].map(
              ( index) => (
                <Skeleton
                  key={index}
                  className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700 shrink-0"
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Main content sections */}
      <main>
        {/* Challenge & Solution Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section header */}
              <div className="mb-12 text-center">
                <Skeleton className="h-10 w-64 mx-auto rounded" />
                <div className="mt-4 w-20 h-1.5 bg-element-500/40 mx-auto rounded-full" />
              </div>

              {/* 2-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Challenge Column */}
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-xl bg-red-500/20 flex items-center justify-center mr-4">
                      <Lock className="h-6 w-6 text-red-500" />
                    </div>
                    <Skeleton className="h-8 w-48 rounded" />
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-full rounded" />
                      <Skeleton className="h-5 w-full rounded" />
                      <Skeleton className="h-5 w-full rounded" />
                      <Skeleton className="h-5 w-4/5 rounded" />
                    </div>

                    <div className="mt-6">
                      <Skeleton className="h-6 w-40 rounded mb-4" />
                      <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex">
                            <Skeleton className="h-6 w-6 rounded-full mr-3 shrink-0" />
                            <Skeleton className="h-6 w-full rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solution Column */}
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-xl bg-green-500/20 flex items-center justify-center mr-4">
                      <Laptop className="h-6 w-6 text-green-500" />
                    </div>
                    <Skeleton className="h-8 w-48 rounded" />
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-full rounded" />
                      <Skeleton className="h-5 w-full rounded" />
                      <Skeleton className="h-5 w-full rounded" />
                      <Skeleton className="h-5 w-3/4 rounded" />
                    </div>

                    <div className="mt-6">
                      <Skeleton className="h-6 w-40 rounded mb-4" />
                      <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex">
                            <Skeleton className="h-6 w-6 rounded-full mr-3 shrink-0" />
                            <Skeleton className="h-6 w-full rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Highlights Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section header */}
              <div className="mb-12 text-center">
                <Skeleton className="h-10 w-64 mx-auto rounded" />
                <div className="mt-4 w-20 h-1.5 bg-element-500/40 mx-auto rounded-full" />
                <Skeleton className="h-5 w-full max-w-2xl mx-auto rounded mt-4" />
              </div>

              {/* Highlights grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {highlights.map((_, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={index}
                      className={cn(
                        'bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700',
                        isEven ? 'md:translate-y-8' : ''
                      )}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-5">
                          <Skeleton className="w-14 h-14 rounded-lg" />
                        </div>
                        <div className="space-y-3 flex-grow">
                          <Skeleton className="h-6 w-40 rounded" />
                          <Skeleton className="h-4 w-full rounded" />
                          <Skeleton className="h-4 w-4/5 rounded" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section header */}
              <div className="mb-12 text-center">
                <Skeleton className="h-10 w-64 mx-auto rounded" />
                <div className="mt-4 w-20 h-1.5 bg-element-500/40 mx-auto rounded-full" />
                <Skeleton className="h-5 w-full max-w-2xl mx-auto rounded mt-4" />
              </div>

              {/* Architecture diagram placeholder */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 mb-16">
                <Skeleton className="h-8 w-60 rounded mb-6" />
                <Skeleton className="h-5 w-full rounded mb-10" />

                <div className="relative">
                  <Skeleton className="w-full h-[400px] rounded-xl" />

                  {/* Overlay some architecture-like shapes for better visual feedback */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="relative">
                      {/* Server icon */}
                      <div className="absolute top-[-120px] left-[0px]">
                        <Server className="w-16 h-16" />
                      </div>

                      {/* Database icon */}
                      <div className="absolute top-[60px] left-[-150px]">
                        <Database className="w-16 h-16" />
                      </div>

                      {/* Database icon */}
                      <div className="absolute top-[60px] right-[-150px]">
                        <Database className="w-16 h-16" />
                      </div>

                      {/* Connection lines */}
                      <div className="w-[400px] h-[300px] border-2 border-dashed rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technology stack filter buttons */}
              <div className="flex justify-center flex-wrap mb-8 gap-2">
                {['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'Infrastructure'].map(
                  (_, index) => (
                    <Skeleton key={index} className="h-10 w-28 rounded-full" />
                  )
                )}
              </div>

              {/* Tech stack grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {technologies.map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center text-center"
                  >
                    <Skeleton className="w-12 h-12 rounded-md mb-3" />
                    <Skeleton className="h-5 w-24 rounded mb-1" />
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section header */}
              <div className="mb-12 text-center">
                <Skeleton className="h-10 w-64 mx-auto rounded" />
                <div className="mt-4 w-20 h-1.5 bg-element-500/40 mx-auto rounded-full" />
                <Skeleton className="h-5 w-full max-w-2xl mx-auto rounded mt-4" />
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex flex-col items-center text-center">
                      <Skeleton className="w-16 h-16 rounded-xl mb-6" />
                      <Skeleton className="h-6 w-40 rounded mb-3" />
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-5/6 rounded mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-element-900 to-blue-900 rounded-2xl p-12 shadow-xl border border-element-800 text-center relative overflow-hidden">
              <div className="max-w-3xl mx-auto relative z-10">
                <Skeleton className="h-10 w-4/5 mx-auto bg-white/10 rounded mb-6" />
                <Skeleton className="h-5 w-full mx-auto bg-white/10 rounded mb-8" />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Skeleton className="h-12 w-40 sm:w-48 mx-auto sm:mx-0 rounded-md bg-white/20" />
                  <Skeleton className="h-12 w-40 sm:w-48 mx-auto sm:mx-0 rounded-md bg-white/10" />
                </div>
              </div>

              {/* Decorative background */}
              <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10" />
              <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </div>
          </div>
        </section>
      </main>

      {/* Loading indicator at bottom */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="animate-spin h-4 w-4 border-2 border-element-500 border-t-transparent rounded-full" />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Loading case study...
        </span>
      </div>
    </div>
  );
}
