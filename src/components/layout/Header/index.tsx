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

interface MenuItemProps {
  text: string
  href?: string
  children?: React.ReactElement<MenuProps>
}

const MenuItem: React.FC<MenuItemProps> = ({ text, href, children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  if (href) {
    return (
      <Link
        href={href}
        className="group relative px-4 py-2 text-base font-medium text-foreground"
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
    >
      <button
        className="group relative px-4 py-2 text-base font-medium text-foreground"
        type="button"
        aria-expanded={isOpen}
      >
        {text}
        <span className="absolute bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all duration-300 ease-in-out group-hover:w-full" />
      </button>
      {children &&
        React.cloneElement<MenuProps>(children, {
          isOpen,
          onClose: () => setIsOpen(false),
        })}
    </div>
  )
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Handler for theme toggle clicks
  const handleThemeToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <nav className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo width={140} height={46} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-12 lg:flex">
            <div className="flex items-center gap-4">
              <MenuItem text="What We Do">
                <WhatWeDoMenu isOpen={false} onClose={() => {}} />
              </MenuItem>
              <MenuItem text="Technologies">
                <TechnologiesMenu isOpen={false} onClose={() => {}} />
              </MenuItem>
              <MenuItem text="Industries">
                <IndustriesMenu isOpen={false} onClose={() => {}} />
              </MenuItem>
              <MenuItem text="Company">
                <CompanyMenu isOpen={false} onClose={() => {}} />
              </MenuItem>
              <MenuItem text="Case Studies" href="/case-studies" />
            </div>

            <div className="flex items-center gap-6">
              <Button
                variant="shine"
                size="lg"
                className="group relative text-base font-medium"
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

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <div onClick={handleThemeToggleClick}>
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md p-2 hover:bg-accent"
              aria-label="Toggle mobile menu"
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

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  )
}

export default Header
