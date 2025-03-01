// src/app/admin/components/TopBar.tsx
'use client';

import { Button } from '@/components/ui/Button';
import { useToastStore } from '@/components/ui/toast/toast-store';
import { useAuthStore } from '@/store/auth-store';
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Menu,
  X,
  Home,
  Users,
  ShoppingBag,
  BarChart2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { JSX } from 'react';
import { useState, useEffect, useRef, memo } from 'react';

interface NavItem {
  name: string;
  href: string;
  icon: JSX.Element;
  active?: boolean;
}

function TopBarComponent(): JSX.Element {
  const [notifications] = useState(3); // Example notification count
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || ''; // Changed from router.pathname
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const toast = useToastStore();

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: <Home className="h-5 w-5" />,
      active: pathname === '/admin/dashboard',
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: <Users className="h-5 w-5" />,
      active: pathname.startsWith('/admin/users'),
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: <ShoppingBag className="h-5 w-5" />,
      active: pathname.startsWith('/admin/products'),
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: <BarChart2 className="h-5 w-5" />,
      active: pathname.startsWith('/admin/analytics'),
    },
  ];

  // Close user menu when clicking outside
  useEffect((): (() => void) => {
    function handleClickOutside(event: MouseEvent): void {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      toast.addToast({
        title: 'Logged out',
        message: 'You have been successfully logged out',
        variant: 'info',
      });

      // Use Next.js router for navigation instead of window.location
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error');
      toast.addToast({
        title: 'Error',
        message: 'There was a problem logging out. Please try again.',
        variant: 'error',
      });
    }
  };

  const toggleMobileMenu = (): void => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleUserMenu = (): void => {
    setShowUserMenu(!showUserMenu);
  };

  const handleMobileNavClick = (): void => {
    setShowMobileMenu(false);
  };

  const handleLogoutClick = (): void => {
    void handleLogout();
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-element-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">SJ</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white hidden md:inline-block">
                SolveJet Admin
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.active
                    ? 'text-element-600 dark:text-element-400 bg-element-50 dark:bg-element-900'
                    : 'text-gray-600 dark:text-gray-300 hover:text-element-500 dark:hover:text-element-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu & Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-200 hover:text-element-500 dark:hover:text-element-400 focus:outline-none px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={toggleUserMenu}
              >
                <div className="w-8 h-8 bg-element-100 dark:bg-element-800 rounded-full flex items-center justify-center text-element-600 dark:text-element-400">
                  {user?.name ? user.name.charAt(0) : 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="font-medium">{user?.name ?? 'User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.role ?? 'Admin'}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 md:hidden">
                    <p className="font-medium">{user?.name ?? 'User'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.role ?? 'Admin'}
                    </p>
                  </div>

                  <Link
                    href="/admin/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>

                  <Link
                    href="/admin/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>

                  <button
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleLogoutClick}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-2 px-4">
          <nav className="flex flex-col space-y-1">
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.active
                    ? 'text-element-600 dark:text-element-400 bg-element-50 dark:bg-element-900'
                    : 'text-gray-600 dark:text-gray-300 hover:text-element-500 dark:hover:text-element-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={handleMobileNavClick}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// Memoize the component to avoid unnecessary re-renders
export const TopBar = memo(TopBarComponent);
