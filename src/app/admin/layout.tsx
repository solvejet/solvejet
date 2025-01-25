// src/app/admin/layout.tsx
'use client'

import { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminAuth } from '@/hooks/use-admin-auth'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/Logo'
import { Toaster } from 'sonner'
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Loader2,
} from 'lucide-react'

interface AdminLayoutProps {
  children: ReactNode
}

const navigationItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

const publicPaths = ['/admin/login']

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isLoading, logout } = useAdminAuth()
  const pathname = usePathname()
  const router = useRouter()
  const isPublicPath = publicPaths.includes(pathname)

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="admin-theme"
      >
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </ThemeProvider>
    )
  }

  // Handle authentication
  if (!user && !isPublicPath) {
    router.replace('/admin/login')
    return null
  }

  if (user && isPublicPath) {
    router.replace('/admin/dashboard')
    return null
  }

  // For login page, render without admin layout
  if (isPublicPath) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="admin-theme"
      >
        {children}
        <Toaster position="top-right" richColors closeButton />
      </ThemeProvider>
    )
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.replace('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="admin-theme"
    >
      <div className="flex min-h-screen flex-col bg-background">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-8">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <Logo width={120} height={40} />
                <span className="text-sm font-semibold">Admin</span>
              </Link>

              <nav className="hidden items-center space-x-6 md:flex">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                      pathname === item.href
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Menu */}
              <div className="hidden items-center gap-4 md:flex">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container py-8"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  )
}
