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
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { JSX } from 'react';
import { useState, useEffect, useRef, memo } from 'react';
import { SolvejetLogo, SolvejetIcon } from '@/components/ui/SolvejetLogo';
import { cn } from '@/lib/utils';

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
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || '';
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

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }

      // For mobile, only close if clicked outside AND not the toggle button
      if (
        showMobileMenu &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-mobile-toggle]')
      ) {
        setShowMobileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    // Lock body scroll when mobile menu is open
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [showMobileMenu]);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
    return (): void => {
      /* Empty cleanup */
    };
  }, [pathname]);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      toast.addToast({
        title: 'Logged out',
        message: 'You have been successfully logged out',
        variant: 'info',
      });

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Implement search functionality
    toast.addToast({
      title: 'Search',
      message: `Searching for: ${searchQuery}`,
      variant: 'info',
    });
  };

  return (
    <>
      {/* Main Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                data-mobile-toggle="true"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 md:hidden transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <div className="hidden md:block">
                  <SolvejetLogo
                    width={130}
                    height={40}
                    color={{ primary: '#2c2e35', accent: '#186ebc' }}
                  />
                </div>
                <div className="md:hidden">
                  <SolvejetIcon
                    width={32}
                    height={32}
                    color={{ primary: '#2c2e35', accent: '#186ebc' }}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2 flex-1 justify-center">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
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

            {/* Actions Menu */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
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
                  <div className="absolute right-0 mt-2 w-56 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
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
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Link>

                    <Link
                      href="/admin/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Link>

                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={(): void => {
                        void handleLogout();
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu with Glassmorphism Sidebar */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transform transition-transform duration-300 ease-in-out',
          showMobileMenu ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Empty backdrop for closing the menu on click outside - no blur or background color */}
        <div className="absolute inset-0" onClick={toggleMobileMenu} />

        {/* Glassmorphism Sidebar */}
        <div
          ref={mobileMenuRef}
          className="absolute inset-y-0 left-0 w-72 max-w-[80vw] backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 shadow-xl flex flex-col h-full border-r border-gray-200 dark:border-gray-700"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {/* Logo */}
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <SolvejetLogo
                width={130}
                height={40}
                color={{ primary: '#2c2e35', accent: '#186ebc' }}
              />
              <button
                onClick={toggleMobileMenu}
                className="p-1 rounded-md hover:bg-gray-100/70 dark:hover:bg-gray-700/70 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Search Bar - Only in Mobile View */}
          <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-element-500 focus:border-transparent text-gray-900 dark:text-gray-100"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            </form>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-3 px-2">
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                      item.active
                        ? 'text-element-600 dark:text-element-400 bg-element-50/70 dark:bg-element-900/70'
                        : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 hover:scale-[1.02]'
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
              <div className="px-4 mb-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                User Settings
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/admin/profile"
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 transition-all duration-200 hover:scale-[1.02]"
                    onClick={toggleMobileMenu}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/settings"
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 transition-all duration-200 hover:scale-[1.02]"
                    onClick={toggleMobileMenu}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg bg-white/30 dark:bg-gray-800/30">
            <button
              className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 rounded-md transition-all duration-200 hover:scale-[1.02]"
              onClick={(): void => {
                void handleLogout();
              }}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </button>

            <div className="mt-4 flex items-center">
              <div className="w-10 h-10 bg-element-100/70 dark:bg-element-800/70 rounded-full flex items-center justify-center text-element-600 dark:text-element-400 flex-shrink-0">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name ?? 'User'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role ?? 'Admin'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Memoize the component to avoid unnecessary re-renders
export const TopBar = memo(TopBarComponent);
