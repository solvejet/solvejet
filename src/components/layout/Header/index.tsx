// src/components/layout/Header/index.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { SolvejetLogo } from '@/components/ui/SolvejetLogo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { MegaMenuPanel } from './MegaMenuPanel';
import { MobileMenu } from './MobileMenu';
import { navigation } from './navigation';
import type { NavItem } from './types';

export default function Header(): React.ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const megaMenuContainerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Handle scroll to apply sticky styles
  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setOpenMegaMenu(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle hover events for mega menu
  const handleNavItemMouseEnter = (name: string): void => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Set a small delay to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMegaMenu(name);
    }, 50);
  };

  const handleNavItemMouseLeave = (): void => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Set a delay before closing to prevent accidental closing
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMegaMenu(null);
    }, 100);
  };

  // Handler for when mouse enters the mega menu itself - keep it open
  const handleMegaMenuMouseEnter = (): void => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Handler for when mouse leaves the mega menu - close after delay
  const handleMegaMenuMouseLeave = (): void => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMegaMenu(null);
    }, 100);
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return (): void => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

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
          'fixed w-full z-50 transition-all duration-300 ease-in-out',
          isScrolled
            ? 'py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md'
            : 'py-4 bg-white dark:bg-gray-900'
        )}
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={megaMenuContainerRef}
            className={cn(
              'relative border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-all',
              isScrolled ? 'py-2 px-4' : 'py-3 px-6',
              openMegaMenu ? 'rounded-b-none border-b-0' : 'rounded-b-lg'
            )}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div
                className="flex-shrink-0 transition-all duration-300"
                style={{
                  transform: isScrolled ? 'scale(0.9)' : 'scale(1)',
                  transformOrigin: 'left center',
                }}
              >
                <Link href="/" className="block" aria-label="SolveJet Home">
                  <SolvejetLogo
                    width={isScrolled ? 120 : 140}
                    height={isScrolled ? 36 : 42}
                    color={{ primary: '#2c2e35', accent: '#0055B8' }}
                  />
                </Link>
              </div>

              {/* Desktop navigation */}
              <nav className="hidden md:flex space-x-1 lg:space-x-3" aria-label="Main Navigation">
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
                        'inline-block px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 group',
                        item.current
                          ? 'text-element-500 dark:text-element-400'
                          : 'text-gray-700 hover:text-element-500 dark:text-gray-300 dark:hover:text-element-400'
                      )}
                      itemProp="url"
                      aria-current={item.current ? 'page' : undefined}
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
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'transition-all duration-300 ml-4 border-element-500 text-element-500 hover:bg-element-50 dark:border-element-400 dark:text-element-400 dark:hover:bg-element-900',
                    isScrolled ? 'py-1.5 px-4' : 'py-2 px-5'
                  )}
                  leftIcon={<MessageSquare className="h-4 w-4" />}
                >
                  Get in Touch
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                  onClick={() => {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                  }}
                  className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 rounded-md"
                >
                  <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                </Button>
              </div>
            </div>
          </div>

          {/* Mega menu panel - part of the header border */}
          {openMegaMenu && (
            <div
              className={cn(
                'border border-gray-200 dark:border-gray-800 border-t-0 rounded-t-none rounded-b-lg overflow-hidden',
                'animate-menu-slide-down'
              )}
              onMouseEnter={handleMegaMenuMouseEnter}
              onMouseLeave={handleMegaMenuMouseLeave}
            >
              <MegaMenuPanel navItems={navigation} openMegaMenu={openMegaMenu} />
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          navItems={currentNavItems}
          openMegaMenu={openMegaMenu}
          toggleMegaMenu={(name: string) => {
            setOpenMegaMenu(openMegaMenu === name ? null : name);
          }}
        />
      </header>

      {/* Spacer for fixed header */}
      <div className={cn('transition-all duration-300', isScrolled ? 'h-16' : 'h-24')} />
    </>
  );
}
