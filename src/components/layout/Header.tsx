// src/components/layout/Header.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Search,
    Menu,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import ServicesMegaMenu from '@/components/layout/megamenus/ServicesMegaMenu';
import IndustriesMegaMenu from '@/components/layout/megamenus/IndustriesMegaMenu';
import AboutMegaMenu from '@/components/layout/megamenus/AboutMegaMenu';
import MobileSidebar from '@/components/layout/MobileSidebar';
import { cn } from '@/lib/utils';
import { event } from '@/lib/analytics';

interface MenuItem {
    label: string;
    href: string;
    isActive?: boolean;
    hasSubmenu?: boolean;
}

interface HeaderProps {
    className?: string;
}

const navigationItems: MenuItem[] = [
    { label: 'Services', href: '/services', hasSubmenu: true },
    { label: 'Industries', href: '/industries', hasSubmenu: true },
    { label: 'About', href: '/about', hasSubmenu: true },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'How we work', href: '/how-we-work' },
];

const Header: React.FC<HeaderProps> = ({ className }) => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = (): void => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveSubmenu(null);
    }, [pathname]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    const handleMobileMenuToggle = useCallback((): void => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setActiveSubmenu(null);

        event({
            action: isMobileMenuOpen ? 'close_mobile_menu' : 'open_mobile_menu',
            category: 'navigation',
            label: 'header_mobile_menu'
        });
    }, [isMobileMenuOpen]);

    const handleSubmenuOpen = useCallback((label: string): void => {
        // Clear any existing timeout
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }

        setActiveSubmenu(label);

        event({
            action: 'hover_mega_menu',
            category: 'navigation',
            label: label.toLowerCase()
        });
    }, []);

    const handleSubmenuClose = useCallback((): void => {
        // Add small delay to prevent flickering when moving mouse between elements
        hoverTimeoutRef.current = setTimeout(() => {
            setActiveSubmenu(null);
        }, 150);
    }, []);

    const handleSubmenuStay = useCallback((): void => {
        // Cancel close timeout if mouse re-enters
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    }, []);

    const handleSearchClick = useCallback((): void => {
        event({
            action: 'click_search',
            category: 'navigation',
            label: 'header_search_button'
        });
    }, []);

    const handleLogoClick = useCallback((): void => {
        event({
            action: 'click_logo',
            category: 'navigation',
            label: 'header_logo'
        });
    }, []);

    const handleNavItemClick = useCallback((item: MenuItem): void => {
        if (!item.hasSubmenu) {
            event({
                action: 'click_nav_item',
                category: 'navigation',
                label: item.label.toLowerCase(),
                value: 1
            });
        }
    }, []);

    const handleContactClick = useCallback((): void => {
        event({
            action: 'click_contact_button',
            category: 'conversion',
            label: 'header_contact_cta'
        });
    }, []);

    const isActiveRoute = useCallback((href: string): boolean => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    }, [pathname]);

    return (
        <>
            <header
                ref={headerRef}
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 w-full', // Keep z-50 so header stays above sidebar
                    'transition-all duration-300 ease-out',
                    'backdrop-blur-md',
                    isScrolled && 'bg-white/15 supports-[backdrop-filter]:bg-white/10',
                    className
                )}
            >
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="flex items-center group transition-transform duration-200 hover:scale-105"
                                aria-label="SolveJet Home"
                                onClick={handleLogoClick}
                            >
                                <Logo size="lg" className="transition-transform duration-200 group-hover:rotate-3" />
                            </Link>
                        </div>

                        <nav className="hidden lg:flex items-center space-x-8">
                            {navigationItems.map((item) => {
                                const isActive = isActiveRoute(item.href);
                                const hasActiveSubmenu = activeSubmenu === item.label;

                                if (item.hasSubmenu) {
                                    return (
                                        <div
                                            key={item.href}
                                            className="relative"
                                            onMouseEnter={() => handleSubmenuOpen(item.label)}
                                            onMouseLeave={handleSubmenuClose}
                                        >
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    'relative px-4 py-2 text-base lg:text-lg font-medium rounded-full',
                                                    'transition-all duration-200 ease-out',
                                                    'flex items-center gap-1',
                                                    isActive || hasActiveSubmenu
                                                        ? isScrolled
                                                            ? 'text-brand-600'
                                                            : 'text-white'
                                                        : isScrolled
                                                            ? 'text-gray-700 hover:text-brand-600'
                                                            : 'text-white/90 hover:text-white',
                                                    'focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-2'
                                                )}
                                                onClick={() => handleNavItemClick(item)}
                                                onMouseEnter={handleSubmenuStay}
                                            >
                                                {item.label}
                                                {(isActive || hasActiveSubmenu) && (
                                                    <span
                                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-brand-500 rounded-full"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                {/* Hover dot indicator */}
                                                <span
                                                    className={cn(
                                                        'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-brand-500 rounded-full transition-all duration-200',
                                                        'opacity-0 scale-0',
                                                        hasActiveSubmenu && !isActive && 'opacity-100 scale-100'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'relative px-4 py-2 text-base lg:text-lg font-medium rounded-full',
                                            'transition-all duration-200 ease-out',
                                            isActive
                                                ? isScrolled
                                                    ? 'text-brand-600'
                                                    : 'text-white'
                                                : isScrolled
                                                    ? 'text-gray-700 hover:text-brand-600'
                                                    : 'text-white/90 hover:text-white',
                                            'focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-2'
                                        )}
                                        aria-current={isActive ? 'page' : undefined}
                                        onClick={() => handleNavItemClick(item)}
                                    >
                                        {item.label}
                                        {isActive && (
                                            <span
                                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-brand-500 rounded-full"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="hidden sm:block">
                                <Link href="/contact" onClick={handleContactClick}>
                                    <Button
                                        variant="gradient-flow"
                                        size="lg"
                                        className="rounded-full px-4 lg:px-6"
                                    >
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>

                            <button
                                onClick={handleSearchClick}
                                className={cn(
                                    "rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200 border",
                                    isScrolled
                                        ? "bg-gray-100/80 hover:bg-gray-200/80 border-gray-200/60 hover:border-gray-300/80"
                                        : "bg-white/20 hover:bg-white/30 border-white/30 hover:border-white/50"
                                )}
                                aria-label="Search"
                            >
                                <Search
                                    className={cn(
                                        "w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200",
                                        isScrolled ? "text-gray-600" : "text-white"
                                    )}
                                />
                            </button>

                            <button
                                onClick={handleMobileMenuToggle}
                                className={cn(
                                    "lg:hidden rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-200 relative z-60", // Keep z-60 for mobile menu button accessibility
                                    isScrolled
                                        ? "hover:bg-gray-100/80 text-gray-600"
                                        : "hover:bg-white/20 text-white"
                                )}
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6 sm:w-7 sm:h-7" />
                                ) : (
                                    <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mega Menu positioned at header level - outside the container with proper z-index */}
                {navigationItems.map((item) => {
                    const hasActiveSubmenu = activeSubmenu === item.label;

                    if (item.hasSubmenu) {
                        if (item.label === 'Services') {
                            return (
                                <div
                                    key={`mega-${item.label}`}
                                    className="relative z-40" // Ensure mega menus are below mobile sidebar
                                    onMouseEnter={handleSubmenuStay}
                                    onMouseLeave={handleSubmenuClose}
                                >
                                    <ServicesMegaMenu
                                        isOpen={hasActiveSubmenu}
                                        onClose={() => setActiveSubmenu(null)}
                                        isScrolled={isScrolled}
                                    />
                                </div>
                            );
                        }

                        if (item.label === 'Industries') {
                            return (
                                <div
                                    key={`mega-${item.label}`}
                                    className="relative z-40"
                                    onMouseEnter={handleSubmenuStay}
                                    onMouseLeave={handleSubmenuClose}
                                >
                                    <IndustriesMegaMenu
                                        isOpen={hasActiveSubmenu}
                                        onClose={() => setActiveSubmenu(null)}
                                        isScrolled={isScrolled}
                                    />
                                </div>
                            );
                        }

                        if (item.label === 'About') {
                            return (
                                <div
                                    key={`mega-${item.label}`}
                                    className="relative z-40"
                                    onMouseEnter={handleSubmenuStay}
                                    onMouseLeave={handleSubmenuClose}
                                >
                                    <AboutMegaMenu
                                        isOpen={hasActiveSubmenu}
                                        onClose={() => setActiveSubmenu(null)}
                                        isScrolled={isScrolled}
                                    />
                                </div>
                            );
                        }
                    }
                    return null;
                })}
            </header>

            {/* Mobile Sidebar with proper z-index stacking */}
            <MobileSidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                isScrolled={isScrolled}
            />
        </>
    );
};

export default Header;