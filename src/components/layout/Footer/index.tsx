// src/components/layout/Footer/index.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { siteConfig } from '@/config/site'
import { menuData } from '@/data/menu-data'
import { memo } from '@/lib/memo'
import {
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Globe,
  Shield,
  FileText,
} from 'lucide-react'

function Footer() {
  const footerRef = React.useRef<HTMLDivElement>(null)
  const [email, setEmail] = React.useState('')
  const currentYear = React.useMemo(() => new Date().getFullYear(), [])

  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const handleEmailChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    },
    []
  )

  const handleNewsletterSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      // Newsletter subscription logic
    },
    []
  )

  const socialLinks = React.useMemo(
    () => [
      {
        name: 'Instagram',
        href: 'https://instagram.com/solvejet',
        icon: Instagram,
      },
      { name: 'Twitter', href: siteConfig.social.twitter, icon: Twitter },
      { name: 'Linkedin', href: siteConfig.social.linkedin, icon: Linkedin },
    ],
    []
  )

  const footerLinks = React.useMemo(
    () => [
      { href: '/privacy', text: 'Privacy' },
      { href: '/terms', text: 'Terms' },
      { href: '/dpa', text: 'DPA' },
      { href: '/ccpa', text: 'CCPA' },
    ],
    []
  )

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden border-t"
    >
      {/* Parallax Gradient Overlays */}
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute -left-[10%] -top-[50%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px] dark:bg-primary/20"
        />
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -right-[10%] top-0 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[100px] dark:bg-purple-500/20"
        />
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-0 left-[20%] h-[400px] w-[600px] rounded-full bg-blue-500/20 blur-[100px] dark:bg-blue-500/20"
        />
      </motion.div>

      {/* Main Footer Content with Parallax */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, 0]) }}
        className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <Logo width={140} height={46} className="mb-6" />
            <p className="mb-4 max-w-sm text-sm text-muted-foreground">
              {siteConfig.description}
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-sm"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span>India & USA</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-sm"
              >
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href={`tel:${siteConfig.contacts.India}`}
                  className="hover:text-primary"
                >
                  {siteConfig.contacts.India}
                </a>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-sm"
              >
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:hello@solvejet.net"
                  className="hover:text-primary"
                >
                  hello@solvejet.net
                </a>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-sm"
              >
                <Globe className="h-4 w-4 text-primary" />
                <a
                  href={siteConfig.author.website}
                  className="hover:text-primary"
                >
                  {siteConfig.author.website.replace('https://', '')}
                </a>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <motion.div
                  key={social.href}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md p-2 hover:bg-accent"
                    aria-label={`Follow us on ${social.name}`} // Add this
                  >
                    <social.icon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-2"
          >
            {/* Services Menu */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">What We Do</h3>
              <ul className="space-y-3 text-sm">
                {menuData.whatWeDo.services.map((item) => (
                  <motion.li
                    key={item.href}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Legal Menu */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Legal</h3>
              <ul className="space-y-3 text-sm">
                {[
                  'Privacy Policy',
                  'Terms of Service',
                  'DPA',
                  'Cookie Policy',
                  'GDPR',
                ].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Link
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <h3 className="mb-4 text-sm font-semibold">Stay Updated</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to our newsletter for updates, insights, and tech news.
            </p>
            <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="flex-1"
              />
              <Button
                type="submit"
                variant="default"
                className="h-[42px]"
                aria-label="Subscribe to NewsLetter"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {/* Security Badges */}
            <div className="mt-8 flex flex-col gap-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2"
              >
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">ISO 27001 Certified</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2"
              >
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm">Secured by SSL</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row"
        >
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default memo(Footer, 'Footer')
