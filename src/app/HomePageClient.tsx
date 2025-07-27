// src/app/HomePageClient.tsx
'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import critical above-the-fold component normally
import HeroSection from '@/components/sections/home/HeroSection';

// Analytics component for UTM tracking
const AnalyticsTracker: React.FC<{ utmSource: string }> = ({ utmSource }) => {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'page_view', {
                utm_source: utmSource,
                page_location: window.location.href
            });
        }
    }, [utmSource]);

    return null;
};

// Improved loading skeleton that matches your actual design
const ServicesLoadingSkeleton = () => (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
            {/* Header skeleton */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
                <div className="w-24 h-4 bg-gray-200 rounded mx-auto mb-3 sm:mb-4 animate-pulse" />
                <div className="w-80 h-10 bg-gray-200 rounded mx-auto mb-4 sm:mb-6 animate-pulse" />
                <div className="w-full max-w-3xl h-6 bg-gray-200 rounded mx-auto animate-pulse" />
            </div>

            {/* Services content skeleton */}
            <div className="max-w-8xl mx-auto">
                {/* Mobile: Stacked layout skeleton */}
                <div className="block lg:hidden">
                    <div className="px-4 sm:px-6 mb-8">
                        <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
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
                                <div key={i} className="flex-shrink-0 w-[280px] sm:w-[320px] h-[440px] sm:h-[480px] bg-gray-200 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop: Side-by-side layout skeleton */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 px-6 sm:px-8 lg:px-16">
                        <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
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
                                <div key={i} className="flex-shrink-0 w-[400px] h-[520px] bg-gray-200 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Improved loading skeleton for testimonials marquee
const TestimonialsLoadingSkeleton = () => (
    <div className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
            <div className="text-center">
                <div className="w-32 h-4 bg-gray-300 rounded mx-auto mb-4 animate-pulse" />
                <div className="w-80 h-10 bg-gray-300 rounded mx-auto mb-6 animate-pulse" />
                <div className="w-full max-w-3xl h-6 bg-gray-300 rounded mx-auto animate-pulse" />
            </div>
        </div>

        {/* Marquee skeleton */}
        <div className="w-full relative mb-16">
            <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex-shrink-0 w-72 sm:w-80 md:w-96 lg:w-[400px] min-h-[380px] sm:min-h-[420px] md:min-h-[480px] bg-white rounded-2xl border-2 border-gray-200 animate-pulse" />
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

// Lazy load below-the-fold components with improved loading states
const ServicesSection = dynamic(
    () => import('@/components/sections/home/ServiceSection'),
    {
        loading: () => <ServicesLoadingSkeleton />,
        ssr: false, // Services section doesn't need SSR for SEO
    }
);

const CustomerSuccessSection = dynamic(
    () => import('@/components/sections/home/CustomerSuccessSection'),
    {
        loading: () => <TestimonialsLoadingSkeleton />,
        ssr: false, // Testimonials don't need SSR
    }
);

interface HomePageClientProps {
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function HomePageClient({ searchParams }: HomePageClientProps) {
    // Extract any search parameters for analytics
    const utmSource = typeof searchParams?.utm_source === 'string' ? searchParams.utm_source : undefined;

    // Enhanced analytics tracking
    useEffect(() => {
        // Track page load time for performance monitoring
        if (typeof window !== 'undefined' && 'performance' in window) {
            const handleLoad = () => {
                const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
                if (perfData && window.gtag) {
                    window.gtag('event', 'page_load_time', {
                        custom_parameter: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                        event_category: 'performance'
                    });
                }
            };

            if (document.readyState === 'complete') {
                handleLoad();
            } else {
                window.addEventListener('load', handleLoad);
                return () => window.removeEventListener('load', handleLoad);
            }
        }
    }, []);

    return (
        <>
            {/* Critical above-the-fold content */}
            <main className="min-h-screen">
                {/* Hero loads immediately - critical for LCP */}
                <HeroSection />

                {/* Below-the-fold content - lazy loaded with better skeletons */}
                <ServicesSection />
                <CustomerSuccessSection />
            </main>

            {/* Analytics tracking for UTM parameters */}
            {utmSource && (
                <AnalyticsTracker utmSource={utmSource} />
            )}
        </>
    );
}