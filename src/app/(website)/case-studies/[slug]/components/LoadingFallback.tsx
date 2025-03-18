// src/app/(website)/case-studies/[slug]/components/LoadingFallback.tsx

'use client';

import React from 'react';
import type { JSX } from 'react';

interface LoadingFallbackProps {
  type: 'content' | 'solution' | 'metrics' | 'technology' | 'results' | 'related';
}

export default function LoadingFallback({ type }: LoadingFallbackProps): JSX.Element {
  // Type-specific skeletons
  switch (type) {
    case 'content':
      return (
        <div className="space-y-16 mb-16 animate-pulse">
          {/* Overview Section */}
          <div className="py-8">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
              <div className="h-8 w-48 bg-gray-200 rounded"></div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg h-20"></div>
                <div className="bg-white p-4 rounded-lg h-20"></div>
                <div className="bg-white p-4 rounded-lg h-20"></div>
              </div>
            </div>
          </div>

          {/* Challenge Section */}
          <div className="py-8">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
              <div className="h-8 w-48 bg-gray-200 rounded"></div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-32"></div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-32"></div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-32"></div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-32"></div>
            </div>
          </div>

          {/* Approach Section */}
          <div className="py-8">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
              <div className="h-8 w-48 bg-gray-200 rounded"></div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
            </div>
          </div>
        </div>
      );

    case 'solution':
      return (
        <div className="animate-pulse py-8">
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg mb-10">
            <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 h-44"></div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 h-44"></div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 h-44"></div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 h-44"></div>
          </div>
        </div>
      );

    case 'metrics':
      return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 animate-pulse">
          <div className="flex items-center mb-6">
            <div className="h-5 w-5 rounded bg-gray-200 mr-2"></div>
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 mr-3"></div>
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div className="ml-11">
                  <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="h-5 w-36 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      );

    case 'technology':
      return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 animate-pulse">
          <div className="flex items-center mb-6">
            <div className="h-5 w-5 rounded bg-gray-200 mr-2"></div>
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index}>
                <div className="flex items-center mb-3">
                  <div className="h-6 w-6 rounded-md bg-gray-200 mr-2"></div>
                  <div className="h-5 w-24 bg-gray-200 rounded"></div>
                </div>

                <div className="flex flex-wrap gap-2 ml-8">
                  {[1, 2, 3, 4].map((_, j) => (
                    <div key={j} className="h-8 w-20 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <div className="h-5 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      );

    case 'results':
      return (
        <div className="py-20 bg-element-900">
          <div className="container mx-auto px-4 animate-pulse">
            <div className="flex items-center justify-center mb-12">
              <div className="h-16 w-16 rounded-full bg-white/10 mr-4"></div>
              <div className="h-10 w-64 bg-white/10 rounded"></div>
            </div>

            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="h-6 w-full bg-white/10 rounded mb-3"></div>
              <div className="h-6 w-full bg-white/10 rounded mb-3"></div>
              <div className="h-6 w-2/3 mx-auto bg-white/10 rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="bg-white/10 rounded-xl p-6 border border-white/20 h-48"></div>
              <div className="bg-white/10 rounded-xl p-6 border border-white/20 h-48"></div>
              <div className="bg-white/10 rounded-xl p-6 border border-white/20 h-48"></div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 h-96"></div>
          </div>
        </div>
      );

    case 'related':
      return (
        <div className="py-20 bg-gray-50 animate-pulse">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4"></div>
              <div className="h-6 w-full max-w-3xl bg-gray-200 rounded mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 h-96"
                ></div>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return <div className="h-40 w-full bg-gray-100 animate-pulse rounded-lg"></div>;
  }
}
