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
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const { trackEvent } = useAnalytics();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    // Initial check
    handleScroll();

    // Add scroll listener
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

  // Close the megamenu with animation - memoized with useCallback
  const closeMegaMenu = useCallback((): void => {
    if (openMegaMenu && !isTransitioning) {
      setIsClosing(true);

      // Wait for animation to complete before actually closing
      setTimeout(() => {
        setOpenMegaMenu(null);
        setIsClosing(false);
      }, 300); // Match animation duration
    }
  }, [openMegaMenu, isTransitioning]);

  // Handle direct menu change without closing animation - memoized with useCallback
  const changeMegaMenu = useCallback(
    (name: string): void => {
      setIsTransitioning(true);
      setOpenMegaMenu(name);

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

  // Handle hover events for mega menu - memoized with useCallback
  const handleNavItemMouseEnter = useCallback(
    (name: string): void => {
      // Clear any existing timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      // Set a small delay to prevent flickering
      hoverTimeoutRef.current = setTimeout(() => {
        if (openMegaMenu && openMegaMenu !== name) {
          // If another menu is open, directly change to the new one without closing animation
          changeMegaMenu(name);
        } else if (!openMegaMenu) {
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

  const handleNavItemMouseLeave = useCallback((): void => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Set a delay before closing to prevent accidental closing
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isTransitioning) {
        closeMegaMenu();
      }
    }, 100);
  }, [isTransitioning, closeMegaMenu]);

  // Handler for when mouse enters the mega menu itself - keep it open
  const handleMegaMenuMouseEnter = useCallback((): void => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  // Handler for when mouse leaves the mega menu - close after delay
  const handleMegaMenuMouseLeave = useCallback((): void => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isTransitioning) {
        closeMegaMenu();
      }
    }, 100);
  }, [isTransitioning, closeMegaMenu]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return (): void => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

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

    // Close any open mega menu when closing mobile menu
    if (!newState && openMegaMenu) {
      setOpenMegaMenu(null);
    }
  }, [isMobileMenuOpen, openMegaMenu, trackEvent]);

  // Toggle mega menu in mobile view
  const toggleMegaMenu = useCallback(
    (name: string): void => {
      setOpenMegaMenu(prevState => {
        const newState = prevState === name ? null : name;

        // Track event
        trackEvent({
          name: newState ? 'mobile_submenu_open' : 'mobile_submenu_close',
          category: 'navigation',
          label: name,
          properties: { menu_name: name },
        });

        return newState;
      });
    },
    [trackEvent]
  );

  // Find active nav item based on pathname
  const currentNavItems: NavItem[] = navigation.map(item => ({
    ...item,
    current: pathname === item.href || pathname.startsWith(`${item.href}/`),
  }));

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

      {/* Header container with border, padding and sticky behavior */}
      <header
        ref={headerRef}
        className={cn(
          'fixed w-full z-50 transition-all duration-300 ease-in-out py-3',
          isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md' : 'bg-transparent'
        )}
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          {/* Single container for the header */}
          <div
            className={cn(
              'relative border border-gray-200 dark:border-gray-800 rounded-lg',
              'bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm',
              'py-3 px-4',
              'transition-all duration-200 ease-in-out',
              openMegaMenu ? 'rounded-b-none border-b-0' : 'rounded-b-lg',
              isScrolled ? 'shadow-md' : 'shadow-sm'
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
                    width={140}
                    height={42}
                    color={{ primary: '#2c2e35', accent: '#0055B8' }}
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
                        'inline-block px-4 py-2.5 text-base font-medium rounded-md transition-all duration-200 group',
                        item.current
                          ? 'text-element-500 dark:text-element-400'
                          : 'text-gray-700 hover:text-element-500 dark:text-gray-300 dark:hover:text-element-400'
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
                  className="ml-4 border-element-500 text-element-500 hover:bg-element-50 dark:border-element-400 dark:text-element-400 dark:hover:bg-element-900 py-2 px-5"
                  leftIcon={<MessageSquare className="h-5 w-5 mr-1" />}
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
                  className="p-2.5 text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 rounded-md"
                  trackingEvent={{
                    name: 'mobile_menu_toggle',
                    category: 'navigation',
                    label: isMobileMenuOpen ? 'close_mobile_menu' : 'open_mobile_menu',
                  }}
                >
                  <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </TrackedButton>
              </div>
            </div>
          </div>

          {/* Mega menu panel - outside the header container but associated with it */}
          {openMegaMenu && (
            <div onMouseEnter={handleMegaMenuMouseEnter} onMouseLeave={handleMegaMenuMouseLeave}>
              <MegaMenuPanel
                navItems={navigation}
                openMegaMenu={openMegaMenu}
                closing={isClosing}
              />
            </div>
          )}

          {/* Mobile menu - separate from desktop mega menu */}
          <div
            className={cn(
              'md:hidden transition-all duration-300 ease-in-out w-full overflow-hidden',
              'border border-gray-200 dark:border-gray-800 rounded-b-lg border-t-0',
              'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md',
              isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 border-0'
            )}
            id="mobile-menu"
          >
            <MobileMenu
              isOpen={isMobileMenuOpen}
              navItems={currentNavItems}
              openMegaMenu={openMegaMenu}
              toggleMegaMenu={toggleMegaMenu}
            />
          </div>
        </div>
      </header>

      {/* Spacer for fixed header - fixed height */}
      <div className="h-20" />
    </>
  );
}
