// src/components/layout/Header/index.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { Phone, Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  WhatWeDoMenu,
  TechnologiesMenu,
  IndustriesMenu,
  CompanyMenu,
} from '../mega-menus'
import MobileSidebar from '../mobile-sidebar'
import { MenuProps } from '@/types/mega-menu'
import { memo } from '@/lib/memo'

interface MenuItemProps {
  text: string
  href?: string
  children?: React.ReactElement<MenuProps>
}

const MenuItem: React.FC<MenuItemProps> = ({ text, href, children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const handleMouseEnter = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
      if (e.key === 'Enter' || e.key === ' ') {
        setIsOpen((prev) => !prev)
      }
    },
    [isOpen]
  )

  if (href) {
    return (
      <Link
        href={href}
        className="group relative px-4 py-2 text-base font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
        role="menuitem"
      >
        {text}
        <span className="absolute bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all duration-300 ease-in-out group-hover:w-full" />
      </Link>
    )
  }

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="menuitem"
    >
      <button
        ref={buttonRef}
        className="group relative px-4 py-2 text-base font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={`${text.toLowerCase().replace(/\s+/g, '-')}-menu`}
        onKeyDown={handleKeyDown}
      >
        {text}
        <span className="absolute bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all duration-300 ease-in-out group-hover:w-full" />
      </button>
      {children &&
        React.cloneElement<MenuProps>(children, {
          isOpen,
          onClose: () => setIsOpen(false),
          id: `${text.toLowerCase().replace(/\s+/g, '-')}-menu`,
        })}
    </div>
  )
}

const MemoizedMenuItem = memo(MenuItem, 'MenuItem')

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const navRef = React.useRef<HTMLElement>(null)

  const handleThemeToggleClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const toggleMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <header
        className="relative w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80"
        role="banner"
      >
        <nav
          ref={navRef}
          className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex h-20 items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2"
              aria-label="Go to homepage"
            >
              <Logo width={140} height={46} />
            </Link>

            <div className="hidden items-center gap-12 lg:flex">
              <div
                className="flex items-center gap-4"
                role="menu"
                aria-label="Main menu"
              >
                <MemoizedMenuItem text="What We Do">
                  <WhatWeDoMenu isOpen={false} onClose={() => {}} />
                </MemoizedMenuItem>
                <MemoizedMenuItem text="Technologies">
                  <TechnologiesMenu isOpen={false} onClose={() => {}} />
                </MemoizedMenuItem>
                <MemoizedMenuItem text="Industries">
                  <IndustriesMenu isOpen={false} onClose={() => {}} />
                </MemoizedMenuItem>
                <MemoizedMenuItem text="Company">
                  <CompanyMenu isOpen={false} onClose={() => {}} />
                </MemoizedMenuItem>
                <MemoizedMenuItem text="Case Studies" href="/case-studies" />
              </div>

              <div className="flex items-center gap-6">
                <Button
                  variant="shine"
                  size="lg"
                  className="group relative text-base font-medium"
                  href="/contact"
                  aria-label="Contact us"
                >
                  <Phone className="h-5 w-5 transition-all duration-500 ease-out group-hover:scale-110" />
                  <span className="relative ml-2 inline-block overflow-hidden">
                    <span className="relative inline-block transition-transform duration-500 group-hover:translate-y-[-100%]">
                      Get in Touch
                    </span>
                    <span className="absolute left-0 inline-block translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0">
                      Get in Touch
                    </span>
                  </span>
                </Button>
                <div onClick={handleThemeToggleClick}>
                  <ThemeToggle />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:hidden">
              <div onClick={handleThemeToggleClick}>
                <ThemeToggle />
              </div>
              <button
                onClick={toggleMobileMenu}
                className="rounded-md p-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        <MobileSidebar
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          id="mobile-menu"
        />
      </header>
    </div>
  )
}

export default memo(Header, 'Header')
