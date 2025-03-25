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
  const navGroupRef = useRef<HTMLDivElement>(null);

  // Track if we're hovering over either the nav item or the mega menu
  const [navHovered, setNavHovered] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);

  // Set initial header state and scroll position immediately to prevent flash
  useEffect(() => {
    // This will run on initial mount
    setIsLoaded(true);

    // Initialize scroll state immediately to prevent flashing
    setIsScrolled(window.scrollY > 10);
  }, []);

  // Handle scroll effects with better performance
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

  // Clean up timeouts on unmount
  useEffect(() => {
    return (): void => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, []);

  // Effect to handle closing the menu when neither nav nor menu is hovered
  useEffect(() => {
    if (!navHovered && !menuHovered && openMegaMenu) {
      // Both nav and menu are not hovered, start closing after a delay
      exitTimeoutRef.current = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setOpenMegaMenu(null);
          setIsClosing(false);
        }, 300);
      }, 300); // Delay before starting close animation
    } else if (exitTimeoutRef.current) {
      // Clear the exit timeout if we're hovering either element
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }

    return (): void => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, [navHovered, menuHovered, openMegaMenu]);

  // Find active nav item based on pathname
  const currentNavItems: NavItem[] = navigation.map(item => ({
    ...item,
    current: pathname === item.href || pathname.startsWith(`${item.href}/`),
  }));

  // Determine background styling - separate blur from color for better performance
  const headerBlur = isLoaded
    ? isScrolled
      ? 'backdrop-blur-lg'
      : 'backdrop-blur-md'
    : 'backdrop-blur-lg';

  const headerBackgroundColor = isScrolled ? 'bg-gray-900/95' : 'bg-gray-900/90';

  // Simple toggle for mobile menu
  const toggleMobileMenu = useCallback((): void => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Handle mouse enter for nav items - opens mega menu
  const handleNavItemMouseEnter = useCallback((name: string): void => {
    setNavHovered(true);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMegaMenu(name);
      setIsClosing(false);
    }, 100);
  }, []);

  // Handle mouse leave for nav items
  const handleNavItemMouseLeave = useCallback((): void => {
    setNavHovered(false);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  // Handle mouse enter for mega menu
  const handleMegaMenuMouseEnter = useCallback((): void => {
    setMenuHovered(true);

    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
  }, []);

  // Handle mouse leave for mega menu
  const handleMegaMenuMouseLeave = useCallback((): void => {
    setMenuHovered(false);
  }, []);

  return (
    <>
      {/* Header container */}
      <header ref={headerRef} className="fixed w-full z-50 py-2">
        <div className="container mx-auto px-4 max-w-[95rem]">
          {/* Single container for the header */}
          <div
            className={cn(
              'relative rounded-lg border border-gray-800/30 overflow-hidden',
              openMegaMenu ? 'rounded-b-none border-b-0' : 'rounded-lg',
              isMobileMenuOpen ? 'rounded-b-none border-b-0' : ''
            )}
          >
            {/* Static background layer - no transitions */}
            <div
              className={cn('absolute inset-0 -z-10', headerBackgroundColor)}
              aria-hidden="true"
            />

            {/* Blur effect layer - separate from color for better performance */}
            <div className={cn('absolute inset-0 -z-5', headerBlur)} aria-hidden="true" />

            {/* Content container */}
            <div className="py-3 px-4 relative z-10">
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
                <nav
                  className="hidden md:flex space-x-2 lg:space-x-5"
                  aria-label="Main Navigation"
                  ref={navGroupRef}
                >
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
                          'inline-block px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 group',
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

                          {/* Hover indicator - using transform instead of width for better performance */}
                          <span
                            className={cn(
                              'absolute -bottom-0.5 left-0 h-0.5 w-full bg-element-500 dark:bg-element-400 transition-transform duration-300 ease-out origin-left',
                              'scale-x-0 group-hover:scale-x-100'
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

                {/* Mobile menu button - simplified implementation */}
                <div className="md:hidden flex items-center">
                  <button
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                    onClick={toggleMobileMenu}
                    className="p-2.5 rounded-md text-white hover:bg-white/10"
                  >
                    <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
                    {isMobileMenuOpen ? (
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
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
          </div>

          {/* Mega menu panel - simplified container with hover tracking */}
          <div
            ref={megaMenuContainerRef}
            className="relative z-50"
            onMouseEnter={handleMegaMenuMouseEnter}
            onMouseLeave={handleMegaMenuMouseLeave}
          >
            {openMegaMenu && (
              <MegaMenuPanel
                navItems={navigation}
                openMegaMenu={openMegaMenu}
                closing={isClosing}
              />
            )}
          </div>

          {/* Mobile menu - use transform for GPU acceleration */}
          <div
            className={cn(
              'md:hidden w-full overflow-hidden border-t-0 border border-gray-800/30 rounded-b-lg',
              headerBackgroundColor, // Use same background as header
              headerBlur, // Use same blur as header
              isMobileMenuOpen
                ? 'opacity-100 transform-none max-h-screen'
                : 'opacity-0 transform -translate-y-4 max-h-0',
              'transition-opacity transition-transform duration-300 ease-in-out'
            )}
            id="mobile-menu"
            style={{
              // Use will-change for GPU acceleration
              willChange: 'transform, opacity',
            }}
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
