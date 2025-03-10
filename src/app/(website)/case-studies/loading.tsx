// src/app/(website)/case-studies/loading.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';

export default function CaseStudiesLoading(): React.ReactElement {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-element-900 pt-32 pb-24 overflow-hidden">
        {/* Background placeholder */}
        <div className="absolute inset-0 opacity-30" aria-hidden="true"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-white/20" />
            <Skeleton className="h-6 w-full mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-8 bg-white/20" />

            <Skeleton className="h-12 w-48 mx-auto rounded-full bg-white/20" />
          </div>
        </div>
      </section>

      {/* Search and filter section */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Search input placeholder */}
            <div className="relative md:w-1/2 lg:w-1/3">
              <div className="h-12 rounded-full border border-gray-200 pl-12 pr-4 flex items-center">
                <Search className="h-5 w-5 text-gray-400 absolute left-4" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>

            {/* Filter button placeholder (mobile) */}
            <div className="md:hidden">
              <Skeleton className="h-10 w-40 rounded-md" />
            </div>

            {/* Industry filters placeholder (desktop) */}
            <div className="hidden md:flex items-center">
              <Skeleton className="h-10 w-64 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured case studies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mb-12" />

          <div className="grid grid-cols-1 gap-10">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 relative">
                    <Skeleton className="aspect-video lg:h-full" />
                  </div>

                  <div className="lg:w-1/2 p-8 md:p-10 flex flex-col">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-6 w-full mb-6" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-8" />

                    <Skeleton className="h-6 w-40 mt-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All case studies grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <Skeleton className="h-10 w-56" />
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 h-full flex flex-col"
              >
                <div className="relative">
                  <Skeleton className="aspect-video" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <Skeleton className="h-7 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />

                  <Skeleton className="h-6 w-40 mt-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-br from-element-900 to-element-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-10 w-2/3 mx-auto mb-6 bg-white/20" />
            <Skeleton className="h-6 w-full mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-8 bg-white/20" />
            <Skeleton className="h-12 w-48 mx-auto rounded-full bg-white/20" />
          </div>
        </div>
      </section>
    </div>
  );
}
