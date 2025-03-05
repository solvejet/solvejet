// src/components/layout/Header/index.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { SolvejetLogo } from '@/components/ui/SolvejetLogo';
import { cn } from '@/lib/utils';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import { MegaMenuPanel } from './MegaMenuPanel';
import { MobileMenu } from './MobileMenu';
import { navigation } from './navigation';
import type { NavItem } from './types';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

export default function Header(): React.ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const { trackEvent } = useAnalytics();
  const megaMenuContainerRef = useRef<HTMLDivElement>(null);

  // Set initial header state and scroll position immediately to prevent flash
  useEffect(() => {
    // This will run on initial mount
    setIsLoaded(true);

    // Initialize scroll state immediately to prevent flashing
    setIsScrolled(window.scrollY > 10);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
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

  // Track page view on initial load
  useEffect(() => {
    trackEvent({
      name: 'page_view',
      category: 'navigation',
      label: pathname,
      properties: {
        page_path: pathname,
        page_title: document.title,
      },
    });
  }, [pathname, trackEvent]);

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

  // Close the megamenu with animation
  const closeMegaMenu = useCallback((): void => {
    if (openMegaMenu && !isTransitioning) {
      setIsClosing(true);

      // Wait for animation to complete before actually closing
      exitTimeoutRef.current = setTimeout(() => {
        setOpenMegaMenu(null);
        setIsClosing(false);
      }, 300); // Match animation duration in CSS
    }
  }, [openMegaMenu, isTransitioning]);

  // Handle direct menu change without closing animation
  const changeMegaMenu = useCallback(
    (name: string): void => {
      setIsTransitioning(true);
      setOpenMegaMenu(name);
      setIsClosing(false); // Ensure we're not in closing state

      // Track menu open event
      trackEvent({
        name: 'mega_menu_open',
        category: 'navigation',
        label: name,
        properties: { menu_name: name },
      });

      // Reset transitioning state after a small delay
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    },
    [trackEvent]
  );

  // Handle hover events for mega menu - simplified for better performance
  const handleNavItemMouseEnter = useCallback(
    (name: string): void => {
      // Clear any existing timeouts
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }

      // Set a small delay to prevent flickering on accidental hovering
      hoverTimeoutRef.current = setTimeout(() => {
        if (openMegaMenu && openMegaMenu !== name) {
          // If another menu is open, directly change to the new one without closing animation
          changeMegaMenu(name);
        } else if (!openMegaMenu) {
          // Open new menu, ensuring we're not in closing state
          setIsClosing(false);
          setOpenMegaMenu(name);

          // Track menu open event
          trackEvent({
            name: 'mega_menu_open',
            category: 'navigation',
            label: name,
            properties: { menu_name: name },
          });
        }
      }, 50);
    },
    [openMegaMenu, changeMegaMenu, trackEvent]
  );

  // Simplified handler for mouse leave
  const handleNavItemMouseLeave = useCallback((): void => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Set a delay before closing to allow time to move to menu
    exitTimeoutRef.current = setTimeout(() => {
      if (!isTransitioning) {
        closeMegaMenu();
      }
    }, 100);
  }, [isTransitioning, closeMegaMenu]);

  // Handler for when mouse enters the mega menu itself - keep it open
  const handleMegaMenuMouseEnter = useCallback((): void => {
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
  }, []);

  // Handler for when mouse leaves the mega menu - close after delay
  const handleMegaMenuMouseLeave = useCallback((): void => {
    exitTimeoutRef.current = setTimeout(() => {
      if (!isTransitioning) {
        closeMegaMenu();
      }
    }, 100);
  }, [isTransitioning, closeMegaMenu]);

  // Handle mobile menu toggle
  const toggleMobileMenu = useCallback((): void => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    // Track event
    trackEvent({
      name: 'mobile_menu_toggle',
      category: 'navigation',
      label: newState ? 'open_mobile_menu' : 'close_mobile_menu',
    });
  }, [isMobileMenuOpen, trackEvent]);

  // Find active nav item based on pathname
  const currentNavItems: NavItem[] = navigation.map(item => ({
    ...item,
    current: pathname === item.href || pathname.startsWith(`${item.href}/`),
  }));

  // Determine background styling - we set a default background even before isLoaded is true
  const headerBackground = isLoaded
    ? isScrolled
      ? 'bg-gray-900/95 backdrop-blur-lg border-gray-800/30'
      : 'bg-gray-900/90 backdrop-blur-md'
    : 'bg-gray-900/95 backdrop-blur-lg border-gray-800/30'; // Default state during load

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SolveJet',
            url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net',
            logo: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net'}/logo.png`,
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-123-456-7890',
              contactType: 'customer service',
              availableLanguage: ['English'],
            },
            sameAs: [
              'https://twitter.com/solvejet',
              'https://www.linkedin.com/company/solvejet',
              'https://github.com/solvejet',
            ],
          }),
        }}
      />

      {/* Header container*/}
      <header
        ref={headerRef}
        className={cn(
          'fixed w-full z-50 transition-all duration-300 ease-in-out py-2',
          'bg-transparent'
        )}
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <div className="container mx-auto px-4 max-w-[95rem]">
          {/* Single container for the header */}
          <div
            className={cn(
              'relative rounded-lg',
              headerBackground, // Use the computed background
              'py-3 px-4',
              'transition-all duration-200 ease-in-out',
              openMegaMenu ? 'rounded-b-none border-b-0' : 'rounded-b-lg'
            )}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link
                  href="/"
                  className="block"
                  aria-label="SolveJet Home"
                  onClick={() => {
                    trackEvent({
                      name: 'logo_click',
                      category: 'navigation',
                      label: 'header_logo',
                    });
                  }}
                >
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
                      itemProp="url"
                      aria-current={item.current ? 'page' : undefined}
                      onClick={() => {
                        trackEvent({
                          name: 'nav_link_click',
                          category: 'navigation',
                          label: item.name,
                          properties: { item_name: item.name, has_mega_menu: !!item.megaMenu },
                        });
                      }}
                    >
                      <span itemProp="name" className="relative">
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

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <TrackedButton
                  variant="ghost"
                  size="lg"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                  onClick={toggleMobileMenu}
                  className={cn('p-2.5 rounded-md', 'text-white hover:bg-white/10')}
                  trackingEvent={{
                    name: 'mobile_menu_toggle',
                    category: 'navigation',
                    label: isMobileMenuOpen ? 'close_mobile_menu' : 'open_mobile_menu',
                  }}
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
                </TrackedButton>
              </div>
            </div>
          </div>

          {/* Mega menu panel - simplified container */}
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

          {/* Mobile menu - separate from desktop mega menu */}
          <div
            className={cn(
              'md:hidden transition-all duration-300 ease-in-out w-full overflow-hidden',
              'border-0 lg:border border-gray-800/30 rounded-b-lg border-t-0',
              'bg-black/90 backdrop-blur-lg',
              isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 border-0'
            )}
            id="mobile-menu"
          >
            <MobileMenu isOpen={isMobileMenuOpen} navItems={currentNavItems} />
          </div>
        </div>
      </header>
    </>
  );
}
