// src/components/sections/home/HeroSection.tsx
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Shield, Users, Palette, Code, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface VideoState {
    isLoaded: boolean;
    hasError: boolean;
}

interface ClientLogo {
    id: string;
    name: string;
    logo: string;
    width?: number;
    height?: number;
}

interface ServiceCard {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
}

const clientLogos: ClientLogo[] = [
    {
        id: 'google',
        name: 'Google',
        logo: '/logos/google.webp',
        width: 120,
        height: 40
    },
    {
        id: 'microsoft',
        name: 'Microsoft',
        logo: '/logos/microsoft.webp',
        width: 140,
        height: 30
    },
    {
        id: 'amazon',
        name: 'Amazon',
        logo: '/logos/amazon.webp',
        width: 120,
        height: 36
    },
    {
        id: 'meta',
        name: 'Meta',
        logo: '/logos/meta.webp',
        width: 100,
        height: 28
    },
    {
        id: 'netflix',
        name: 'Netflix',
        logo: '/logos/netflix.webp',
        width: 120,
        height: 32
    },
    {
        id: 'spotify',
        name: 'Spotify',
        logo: '/logos/spotify.webp',
        width: 40,
        height: 40
    }
];

const serviceCards: ServiceCard[] = [
    {
        id: 'staff-augmentation',
        title: 'Staff Augmentation',
        description: 'Scale your team with skilled developers',
        icon: Users,
        href: '/services/staff-augmentation'
    },
    {
        id: 'product-design',
        title: 'Product Design',
        description: 'Create intuitive user experiences',
        icon: Palette,
        href: '/services/product-design'
    },
    {
        id: 'software-development',
        title: 'Software Development',
        description: 'Build scalable custom applications',
        icon: Code,
        href: '/services/software-development'
    }
];

// Optimized Service Card Component with reduced re-renders
const ServiceCardComponent = React.memo<{
    service: ServiceCard;
    isMobile: boolean;
}>(({ service }) => {
    const IconComponent = service.icon;

    return (
        <div className={cn(
            'group bg-white/10 backdrop-blur-lg rounded-xl',
            'p-5 h-40',
            'sm:p-6 sm:h-52',
            'md:p-7 md:h-60',
            'lg:p-8 lg:h-64',
            'will-change-transform' // GPU acceleration hint
        )}>
            <div className="h-full flex flex-col">
                {/* Mobile Layout */}
                <div className="sm:hidden h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center flex-shrink-0">
                            <IconComponent className="text-white w-8 h-8" />
                        </div>
                        <h2 className="text-white font-bold leading-tight text-xl flex-1">
                            {service.title}
                        </h2>
                    </div>

                    <div className="flex items-start gap-3">
                        <p className="text-white/80 leading-relaxed text-base flex-1">
                            {service.description}
                        </p>

                        <Link href={service.href} className="flex-shrink-0">
                            <button
                                className="bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110 group-hover:bg-white/35 w-9 h-9"
                                aria-label={`Learn more about ${service.title}`}
                            >
                                <ChevronRight className="text-white transition-transform duration-300 hover:translate-x-0.5 w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex sm:flex-col sm:h-full">
                    <h2 className={cn(
                        'text-white font-bold leading-tight transition-colors duration-300 group-hover:text-white/90 mb-3',
                        'text-xl',
                        'md:text-2xl',
                        'lg:text-2xl'
                    )}>
                        {service.title}
                    </h2>

                    <p className={cn(
                        'text-white/80 leading-relaxed transition-colors duration-300 group-hover:text-white/70 flex-1',
                        'text-base mb-6',
                        'md:text-base md:mb-8'
                    )}>
                        {service.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className={cn(
                            'flex items-center justify-center transition-all duration-300',
                            'w-11 h-11',
                            'md:w-12 md:h-12'
                        )}>
                            <IconComponent className={cn(
                                'text-white transition-transform duration-300 group-hover:scale-110',
                                'w-6 h-6',
                                'md:w-7 md:h-7'
                            )} />
                        </div>

                        <Link href={service.href}>
                            <button
                                className={cn(
                                    'bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110 group-hover:bg-white/35',
                                    'w-11 h-11',
                                    'md:w-12 md:h-12'
                                )}
                                aria-label={`Learn more about ${service.title}`}
                            >
                                <ChevronRight className={cn(
                                    'text-white transition-transform duration-300 hover:translate-x-0.5',
                                    'w-6 h-6',
                                    'md:w-7 md:h-7'
                                )} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
});

ServiceCardComponent.displayName = 'ServiceCardComponent';

const HeroSection: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoState, setVideoState] = useState<VideoState>({
        isLoaded: false,
        hasError: false
    });
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Debounce timer ref to prevent memory leaks
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Memoize viewport detection to prevent unnecessary re-renders
    const checkMobile = useMemo(() => {
        return () => {
            if (typeof window !== 'undefined') {
                setIsMobile(window.innerWidth < 768);
            }
        };
    }, []);

    useEffect(() => {
        checkMobile();

        // Use passive listener for better performance
        const handleResize = () => {
            // Debounce resize for better performance
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            resizeTimeoutRef.current = setTimeout(checkMobile, 150);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            window.removeEventListener('resize', handleResize);
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
        };
    }, [checkMobile]);

    // Optimize video loading
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedData = (): void => {
            setVideoState(prev => ({ ...prev, isLoaded: true }));
        };

        const handleError = (): void => {
            setVideoState(prev => ({ ...prev, hasError: true }));
        };

        // Use passive listeners for better performance
        video.addEventListener('loadeddata', handleLoadedData, { passive: true });
        video.addEventListener('error', handleError, { passive: true });

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('error', handleError);
        };
    }, []);

    // Optimize video autoplay
    useEffect(() => {
        if (videoState.isLoaded && videoRef.current && !videoState.hasError) {
            // Use requestIdleCallback if available for better performance
            const playVideo = () => {
                const playPromise = videoRef.current?.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.warn('Video autoplay failed:', error);
                        setVideoState(prev => ({ ...prev, hasError: true }));
                    });
                }
            };

            if ('requestIdleCallback' in window) {
                requestIdleCallback(playVideo);
            } else {
                setTimeout(playVideo, 0);
            }
        }
    }, [videoState.isLoaded, videoState.hasError]);

    return (
        <section
            className="relative min-h-screen flex flex-col bg-gray-900 overflow-hidden"
            aria-labelledby="hero-heading"
        >
            {/* Optimized Video Background */}
            <div className="absolute inset-0 z-0">
                {!videoState.hasError ? (
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster="/video-poster.jpg"
                        aria-hidden="true"
                        style={{
                            // GPU acceleration
                            transform: 'translateZ(0)',
                            willChange: 'auto'
                        }}
                    >
                        <source src="/hero.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    // Optimized fallback image with better sizing
                    <div className="w-full h-full relative">
                        <Image
                            src="/video-poster.jpg"
                            alt="Hero background"
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                            quality={85}
                        />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
                <div className="max-w-5xl w-full">
                    {/* Badge */}
                    <div className={cn(
                        'inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-medium mb-3 sm:mb-4 md:mb-6 transition-all duration-300 hover:bg-white/15',
                        'px-3 py-1.5 text-xs',
                        'sm:px-4 sm:py-2 sm:text-sm'
                    )}>
                        <Shield className={cn(
                            'text-brand-400',
                            'w-3 h-3',
                            'sm:w-4 sm:h-4'
                        )} />
                        <span>Trusted by 200+ Companies Worldwide</span>
                    </div>

                    {/* Main Title - Optimized for CLS */}
                    <h1
                        id="hero-heading"
                        className={cn(
                            'text-left font-bold leading-[1.05] relative z-30 mb-6 sm:mb-8 md:mb-10',
                            'text-3xl',
                            'sm:text-4xl',
                            'md:text-4xl',
                            'lg:text-5xl',
                            'xl:text-6xl',
                            '2xl:text-7xl'
                        )}
                        style={{
                            // Prevent layout shift by reserving space
                            minHeight: isMobile ? '120px' : '200px'
                        }}
                    >
                        <span className="block text-white drop-shadow-lg mb-2 sm:mb-3 md:mb-4">
                            Engineered for Impact
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 via-pink-500 to-rose-400 drop-shadow-lg">
                            Delivered with Precision
                        </span>
                    </h1>

                    {/* Service Cards Grid - Optimized layout */}
                    <div className={cn(
                        'grid gap-1 w-full',
                        'grid-cols-1',
                        'sm:grid-cols-2 sm:gap-1',
                        'md:grid-cols-3 md:gap-2'
                    )}>
                        {serviceCards.map((service) => (
                            <ServiceCardComponent
                                key={service.id}
                                service={service}
                                isMobile={isMobile}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Optimized Logo Section - Reduced Height */}
            <div className="relative z-20 w-full bg-white/5 backdrop-blur-3xl border-t border-white/10">
                <div className={cn(
                    'flex items-center w-full',
                    'flex-col gap-2 py-3', // Reduced gap and padding
                    'sm:flex-row sm:justify-between sm:gap-0 sm:px-6 sm:py-3', // Reduced padding
                    'md:px-8 md:py-4', // Reduced padding
                    'lg:px-12 lg:py-4', // Reduced padding
                    'xl:px-16 xl:py-4' // Reduced padding
                )}>
                    <div className={cn(
                        'flex-shrink-0',
                        'text-center',
                        'sm:text-left'
                    )}>
                        <p className={cn(
                            'text-white/80 font-medium uppercase tracking-wider leading-tight',
                            'text-xs', // Keep small text
                            'sm:text-xs',
                            'md:text-sm'
                        )}>
                            Trusted by
                            <br />
                            Leading Brands
                        </p>
                    </div>

                    {/* Optimized Logo Grid - Smaller Images */}
                    <div className={cn(
                        'opacity-70 transition-opacity duration-300 hover:opacity-90',
                        'grid grid-cols-3 gap-3 w-full px-4', // Reduced gap
                        'sm:flex sm:items-center sm:justify-between sm:flex-1 sm:ml-6 sm:px-0', // Reduced margin
                        'md:ml-8', // Reduced margin
                        'lg:ml-12' // Reduced margin
                    )}>
                        {clientLogos.map((client) => {
                            // Further reduced logo sizes for better performance
                            const logoWidth = isMobile ? (client.width || 120) * 0.35 : (client.width || 120) * 0.55;
                            const logoHeight = isMobile ? (client.height || 40) * 0.35 : (client.height || 40) * 0.55;

                            return (
                                <div
                                    key={client.id}
                                    className="flex items-center justify-center transition-all duration-300 hover:opacity-100 hover:scale-110"
                                >
                                    <Image
                                        src={client.logo}
                                        alt={`${client.name} logo`}
                                        width={Math.round(logoWidth)}
                                        height={Math.round(logoHeight)}
                                        className="max-w-full h-auto filter brightness-0 invert opacity-60 transition-all duration-300 hover:opacity-80"
                                        loading="lazy"
                                        sizes={isMobile ? "25vw" : "80px"} // Reduced sizes
                                        quality={70} // Reduced quality for better performance
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;