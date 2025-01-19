// src/components/layout/Footer/index.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { siteConfig } from '@/config/site'
import { menuData } from '@/data/menu-data'
import {
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = React.useState('')

  return (
    <footer className="relative w-full overflow-hidden border-t">
      {/* Enhanced Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Primary gradient - top left */}
        <div className="absolute -left-[10%] -top-[50%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px] dark:bg-primary/20" />

        {/* Secondary gradient - top right */}
        <div className="absolute -right-[10%] top-0 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[100px] dark:bg-purple-500/20" />

        {/* Tertiary gradient - bottom */}
        <div className="absolute bottom-0 left-[20%] h-[400px] w-[600px] rounded-full bg-blue-500/20 blur-[100px] dark:bg-blue-500/20" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Company Info - Left Column */}
          <div className="lg:col-span-4">
            <Logo width={140} height={46} className="mb-6" />
            <p className="mb-4 max-w-sm text-sm text-muted-foreground">
              {siteConfig.description}
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>India & USA</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href={`tel:${siteConfig.contacts.India}`}
                  className="hover:text-primary"
                >
                  {siteConfig.contacts.India}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:hello@solvejet.net"
                  className="hover:text-primary"
                >
                  hello@solvejet.net
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <Link
                href="https://instagram.com/solvejet"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 hover:bg-accent"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 hover:bg-accent"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 hover:bg-accent"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Navigation Links - Middle Columns */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-sm font-semibold">What We Do</h3>
              <ul className="space-y-3 text-sm">
                {menuData.whatWeDo.services.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-3 text-sm">
                {menuData.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter - Right Column */}
          <div className="lg:col-span-4">
            <h3 className="mb-4 text-sm font-semibold">Stay Updated</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to our newsletter for updates, insights, and tech news.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                error=""
              />
              <Button type="submit" variant="default" className="h-[42px]">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
