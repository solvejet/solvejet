// src/components/layout/Header/MobileMenu.tsx
import React from 'react';
import Link from 'next/link';
import { ChevronDown, MessageSquare, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { NavItem } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  openMegaMenu: string | null;
  toggleMegaMenu: (name: string) => void;
}

export function MobileMenu({
  isOpen,
  navItems,
  openMegaMenu,
  toggleMegaMenu,
}: MobileMenuProps): React.ReactElement {
  return (
    <div
      className={cn(
        'md:hidden transition-all duration-300 ease-in-out overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        isOpen ? 'max-h-screen opacity-100 mt-2' : 'max-h-0 opacity-0'
      )}
      id="mobile-menu"
    >
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
        <nav className="py-2">
          {navItems.map(item => (
            <div key={item.name}>
              {item.megaMenu ? (
                <div className="px-4">
                  <button
                    onClick={() => {
                      toggleMegaMenu(item.name);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between py-3 text-base font-medium',
                      item.current
                        ? 'text-element-600 dark:text-element-400'
                        : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 transition-transform duration-200',
                        openMegaMenu === item.name ? 'rotate-180' : ''
                      )}
                    />
                  </button>
                  {openMegaMenu === item.name && (
                    <div className="pl-4 pb-3 animate-fade-in">
                      {item.megaMenu.columns.map(column => (
                        <div key={column.title} className="mb-3">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 mt-3">
                            {column.title}
                          </h4>
                          <ul className="space-y-2">
                            {column.items.map(subItem => (
                              <li key={subItem.title}>
                                <Link
                                  href={subItem.href}
                                  className="flex items-center py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-element-500 dark:hover:text-element-400"
                                >
                                  {subItem.icon && (
                                    <span className="mr-2 text-gray-400 dark:text-gray-500">
                                      {subItem.icon}
                                    </span>
                                  )}
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 text-base font-medium',
                    item.current
                      ? 'text-element-600 dark:text-element-400'
                      : 'text-gray-700 hover:text-element-500 dark:text-gray-300 dark:hover:text-element-400'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="py-3 px-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full flex justify-center py-2.5 border-element-500 text-element-600 hover:bg-element-50 dark:border-element-400 dark:text-element-400 dark:hover:bg-element-900"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Get in Touch
          </Button>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>contact@solvejet.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
