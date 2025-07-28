// src/app/HomePageClient.tsx
'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import critical above-the-fold component normally
import HeroSection from '@/components/sections/home/HeroSection';

// Optimized loading skeleton that prevents CLS
const ServicesLoadingSkeleton = () => (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
            {/* Header skeleton with fixed heights to prevent CLS */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
                <div className="w-24 h-4 bg-gray-200 rounded mx-auto mb-3 sm:mb-4 animate-pulse" />
                <div className="w-80 h-10 bg-gray-200 rounded mx-auto mb-4 sm:mb-6 animate-pulse" />
                <div className="w-full max-w-3xl h-6 bg-gray-200 rounded mx-auto animate-pulse" />
            </div>

            {/* Services content skeleton with proper sizing */}
            <div className="max-w-8xl mx-auto">
                {/* Mobile: Stacked layout skeleton */}
                <div className="block lg:hidden">
                    <div className="px-4 sm:px-6 mb-8">
                        <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6" style={{ minHeight: '300px' }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
                                <div className="flex-1">
                                    <div className="w-32 h-5 bg-gray-200 rounded mb-2 animate-pulse" />
                                    <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                {Array.from({ length: 4 }, (_, i) => (
                                    <div key={i} className="w-full h-16 bg-gray-200 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile service cards skeleton */}
                    <div className="px-4 sm:px-6">
                        <div className="flex gap-4 overflow-hidden">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 w-[280px] sm:w-[320px] bg-gray-200 rounded-xl animate-pulse"
                                    style={{ height: '440px' }} // Fixed height to prevent CLS
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop: Side-by-side layout skeleton */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 px-6 sm:px-8 lg:px-16">
                        <div
                            className="bg-white rounded-xl border-2 border-gray-200 p-8"
                            style={{ minHeight: '400px' }} // Fixed height to prevent CLS
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse" />
                                <div className="flex-1">
                                    <div className="w-40 h-6 bg-gray-200 rounded mb-2 animate-pulse" />
                                    <div className="w-64 h-4 bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                {Array.from({ length: 4 }, (_, i) => (
                                    <div key={i} className="w-full h-16 bg-gray-200 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="flex gap-6 overflow-hidden">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 w-[400px] bg-gray-200 rounded-xl animate-pulse"
                                    style={{ height: '520px' }} // Fixed height to prevent CLS
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Optimized testimonials skeleton with proper dimensions
const TestimonialsLoadingSkeleton = () => (
    <div className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
            <div className="text-center">
                <div className="w-32 h-4 bg-gray-300 rounded mx-auto mb-4 animate-pulse" />
                <div className="w-80 h-10 bg-gray-300 rounded mx-auto mb-6 animate-pulse" />
                <div className="w-full max-w-3xl h-6 bg-gray-300 rounded mx-auto animate-pulse" />
            </div>
        </div>

        {/* Marquee skeleton with proper spacing */}
        <div className="w-full relative mb-16">
            <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 5 }, (_, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-72 sm:w-80 md:w-96 lg:w-[400px] bg-white rounded-2xl border-2 border-gray-200 animate-pulse"
                        style={{ minHeight: '480px' }} // Fixed height to prevent CLS
                    />
                ))}
            </div>
        </div>

        {/* Stats skeleton */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pt-12 sm:pt-16 border-t border-gray-200">
                {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="text-center">
                        <div className="w-16 h-8 bg-gray-300 rounded mx-auto mb-2 animate-pulse" />
                        <div className="w-20 h-4 bg-gray-300 rounded mx-auto animate-pulse" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// Lazy load below-the-fold components with better loading states
const ServicesSection = dynamic(
    () => import('@/components/sections/home/ServiceSection'),
    {
        loading: () => <ServicesLoadingSkeleton />,
        // Use SSR for better SEO, but with lazy hydration
        ssr: true,
    }
);

const CustomerSuccessSection = dynamic(
    () => import('@/components/sections/home/CustomerSuccessSection'),
    {
        loading: () => <TestimonialsLoadingSkeleton />,
        // Testimonials can be loaded without SSR for better performance
        ssr: false,
    }
);

interface HomePageClientProps {
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function HomePageClient({ searchParams }: HomePageClientProps) {
    // Extract UTM parameters for analytics (if needed)
    const utmSource = typeof searchParams?.utm_source === 'string' ? searchParams.utm_source : undefined;

    // Optimized analytics tracking - only track what's necessary
    useEffect(() => {
        // Only track UTM parameters if they exist
        if (utmSource && typeof window !== 'undefined' && window.gtag) {
            // Use requestIdleCallback for better performance
            const trackUTM = () => {
                window.gtag('event', 'utm_source_visit', {
                    utm_source: utmSource,
                    page_location: window.location.href
                });
            };

            if ('requestIdleCallback' in window) {
                requestIdleCallback(trackUTM);
            } else {
                setTimeout(trackUTM, 100);
            }
        }
    }, [utmSource]);

    return (
        <main className="min-h-screen">
            {/* Critical above-the-fold content - loads immediately */}
            <HeroSection />

            {/* Below-the-fold content - lazy loaded with optimized skeletons */}
            <ServicesSection />
            <CustomerSuccessSection />
        </main>
    );
}