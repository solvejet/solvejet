// src/components/layout/Header/index.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { SolvejetLogo } from '@/components/ui/SolvejetLogo';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { navigation } from './navigation';
import type { NavItem } from './types';

// Dynamically import non-critical components
const MegaMenuPanel = dynamic(() => import('./MegaMenuPanel').then(mod => mod.MegaMenuPanel), {
  ssr: false,
  loading: () => null,
});

const MobileMenu = dynamic(() => import('./MobileMenu').then(mod => mod.MobileMenu), {
  ssr: false,
  loading: () => null,
});

const TrackedButton = dynamic(
  () => import('@/components/ui/Button/TrackedButton').then(mod => mod.TrackedButton),
  {
    ssr: false,
    loading: () => (
      <button className="inline-flex items-center justify-center px-5 py-2 border border-element-400 text-element-400 hover:bg-element-900/50 rounded-md">
        Get in Touch
      </button>
    ),
  }
);

export default function Header(): React.ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const megaMenuContainerRef = useRef<HTMLDivElement>(null);

  // Set initial header state and scroll position immediately to prevent flash
  useEffect(() => {
    // This will run on initial mount
    setIsLoaded(true);

    // Initialize scroll state immediately to prevent flashing
    setIsScrolled(window.scrollY > 10);
  }, []);

  // Handle scroll effects - use passive listener for performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setOpenMegaMenu(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Find active nav item based on pathname
  const currentNavItems: NavItem[] = navigation.map(item => ({
    ...item,
    current: pathname === item.href || pathname.startsWith(`${item.href}/`),
  }));

  // Determine background styling - we set a default background even before isLoaded is true
  const headerBackground = isLoaded
    ? isScrolled
      ? 'bg-gray-900/95 backdrop-blur-lg'
      : 'bg-gray-900/90 backdrop-blur-md'
    : 'bg-gray-900/95 backdrop-blur-lg'; // Default state during load

  // Simple toggle for mobile menu
  const toggleMobileMenu = useCallback((): void => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Simplified mega menu handlers
  const handleNavItemMouseEnter = useCallback((name: string): void => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMegaMenu(name);
      setIsClosing(false);
    }, 100);
  }, []);

  const handleNavItemMouseLeave = useCallback((): void => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    exitTimeoutRef.current = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setOpenMegaMenu(null);
        setIsClosing(false);
      }, 300);
    }, 100);
  }, []);

  return (
    <>
      {/* Header container*/}
      <header
        ref={headerRef}
        className={cn(
          'fixed w-full z-50 transition-all duration-300 ease-in-out py-2',
          'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 max-w-[95rem]">
          {/* Single container for the header */}
          <div
            className={cn(
              'relative rounded-lg border border-gray-800/30',
              headerBackground, // Use the computed background
              'py-3 px-4',
              'transition-all duration-200 ease-in-out',
              openMegaMenu ? 'rounded-b-none border-b-0' : 'rounded-lg',
              isMobileMenuOpen ? 'rounded-b-none border-b-0' : ''
            )}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="block" aria-label="SolveJet Home">
                  <SolvejetLogo
                    width="auto"
                    height="auto"
                    className="w-36 md:w-44"
                    color={{ primary: '#ffffff', accent: '#0055B8' }}
                  />
                </Link>
              </div>

              {/* Desktop navigation */}
              <nav className="hidden md:flex space-x-2 lg:space-x-5" aria-label="Main Navigation">
                {currentNavItems.map(item => (
                  <div
                    key={item.name}
                    className="relative"
                    data-nav-item
                    onMouseEnter={() => {
                      if (item.megaMenu) {
                        handleNavItemMouseEnter(item.name);
                      }
                    }}
                    onMouseLeave={handleNavItemMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'inline-block px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 group',
                        item.current ? 'text-element-400' : 'text-white hover:text-element-300'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <span className="relative">
                        {item.name}

                        {/* Current indicator */}
                        {item.current && (
                          <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-element-500 dark:bg-element-400" />
                        )}

                        {/* Hover indicator */}
                        <span
                          className={cn(
                            'absolute -bottom-0.5 left-0 h-0.5 w-0 bg-element-500 dark:bg-element-400 transition-all duration-300 ease-out',
                            'group-hover:w-full'
                          )}
                        />
                      </span>
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Contact us button */}
              <div className="hidden md:block">
                <TrackedButton
                  variant="outline"
                  size="lg"
                  className={cn(
                    'py-2 px-5',
                    'border-element-400 text-element-400 hover:bg-element-900/50 group'
                  )}
                  leftIcon={
                    <MessageSquare className="h-5 w-5 mr-1 transition-transform duration-300 group-hover:scale-110" />
                  }
                  onClick={() => (window.location.href = '/contact')}
                  trackingEvent={{
                    name: 'contact_button_click',
                    category: 'navigation',
                    label: 'header_contact_button',
                  }}
                >
                  Get in Touch
                </TrackedButton>
              </div>

              {/* Mobile menu button - simpler implementation */}
              <div className="md:hidden flex items-center">
                <button
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                  onClick={toggleMobileMenu}
                  className="p-2.5 rounded-md text-white hover:bg-white/10"
                >
                  <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
                  {isMobileMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <div className="flex flex-col space-y-1.5">
                      <div className="w-6 h-0.5 bg-white rounded-full"></div>
                      <div className="w-6 h-1 bg-white rounded-full"></div>
                      <div className="w-6 h-0.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mega menu panel - simplified container */}
          <div ref={megaMenuContainerRef} className="relative z-50">
            {openMegaMenu && (
              <MegaMenuPanel
                navItems={navigation}
                openMegaMenu={openMegaMenu}
                closing={isClosing}
              />
            )}
          </div>

          {/* Mobile menu - integrated with main header container for visual consistency */}
          <div
            className={cn(
              'md:hidden transition-all duration-300 ease-in-out w-full overflow-hidden',
              'border-t-0 border border-gray-800/30 rounded-b-lg',
              headerBackground, // Use same background as header for consistency
              isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 border-0'
            )}
            id="mobile-menu"
          >
            {isMobileMenuOpen && (
              <MobileMenu isOpen={isMobileMenuOpen} navItems={currentNavItems} />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
