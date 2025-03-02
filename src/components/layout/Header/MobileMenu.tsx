// src/components/layout/Header/MobileMenu.tsx
import React from 'react';
import Link from 'next/link';
import { ChevronDown, MessageSquare, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
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
  if (!isOpen) return <></>;

  return (
    <div className="py-3">
      <nav className="py-3">
        {navItems.map(item => (
          <div key={item.name}>
            {item.megaMenu ? (
              <div className="px-5">
                <button
                  onClick={() => {
                    toggleMegaMenu(item.name);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between py-4 text-lg font-medium',
                    item.current
                      ? 'text-element-600 dark:text-element-400'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      'h-6 w-6 transition-transform duration-200',
                      openMegaMenu === item.name ? 'rotate-180' : ''
                    )}
                  />
                </button>
                {openMegaMenu === item.name && (
                  <div className="pl-5 pb-4 animate-fade-in">
                    {item.megaMenu.columns.map(column => (
                      <div key={column.title} className="mb-4">
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-4">
                          {column.title}
                        </h4>
                        <ul className="space-y-3">
                          {column.items.map(subItem => (
                            <li key={subItem.title}>
                              <Link
                                href={subItem.href}
                                className="flex items-center py-2.5 text-base text-gray-700 dark:text-gray-300 hover:text-element-500 dark:hover:text-element-400"
                              >
                                {subItem.icon && (
                                  <span className="mr-3 text-gray-400 dark:text-gray-500">
                                    <div className="h-5 w-5">{subItem.icon}</div>
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
                  'block px-5 py-4 text-lg font-medium',
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

      <div className="py-4 px-5 border-t border-gray-200 dark:border-gray-700">
        <TrackedButton
          variant="outline"
          size="lg"
          className="w-full flex justify-center py-3 px-4 border-element-500 text-element-600 hover:bg-element-50 dark:border-element-400 dark:text-element-400 dark:hover:bg-element-900"
          onClick={() => (window.location.href = '/contact')}
          trackingEvent={{
            name: 'mobile_contact_click',
            category: 'navigation',
            label: 'mobile_menu_contact_button',
          }}
          leftIcon={<MessageSquare className="mr-2 h-5 w-5" />}
        >
          Get in Touch
        </TrackedButton>

        <div className="mt-5 flex items-center justify-between text-base text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            <span>+1 (123) 456-7890</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            <span>hello@solvejet.net</span>
          </div>
        </div>
      </div>
    </div>
  );
}
