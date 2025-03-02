// src/components/layout/Header/MobileMenu.tsx
import React, { memo } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageSquare, Phone, Mail, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import type { NavItem } from './types';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  openMegaMenu: string | null;
  toggleMegaMenu: (name: string) => void;
}

function MobileMenuComponent({
  isOpen,
  navItems,
  openMegaMenu,
  toggleMegaMenu,
}: MobileMenuProps): React.ReactElement {
  const { trackEvent } = useAnalytics();

  if (!isOpen) return <></>;

  // Track mobile menu link clicks
  const handleLinkClick = (itemName: string, isSubmenu = false): void => {
    trackEvent({
      name: 'mobile_menu_link_click',
      category: 'navigation',
      label: itemName,
      properties: {
        item_name: itemName,
        is_submenu: isSubmenu,
      },
    });
  };

  // Handle submenu item click
  const handleSubmenuItemClick = (
    menuName: string,
    itemTitle: string,
    columnTitle: string
  ): void => {
    trackEvent({
      name: 'mobile_submenu_link_click',
      category: 'navigation',
      label: `${menuName}_${itemTitle}`,
      properties: {
        menu_name: menuName,
        column_title: columnTitle,
        item_title: itemTitle,
      },
    });
  };

  return (
    <div className="py-3 animate-fade-in">
      <nav className="py-3">
        {navItems.map(item => (
          <div
            key={item.name}
            className="border-b border-gray-100 dark:border-gray-800 last:border-b-0"
          >
            {item.megaMenu ? (
              <div className="px-5">
                <button
                  onClick={() => {
                    toggleMegaMenu(item.name);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between py-4 text-lg font-medium transition-all duration-200',
                    item.current
                      ? 'text-element-600 dark:text-element-400'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                  aria-expanded={openMegaMenu === item.name}
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 transition-transform duration-200',
                      openMegaMenu === item.name ? 'rotate-180 text-element-500' : 'text-gray-400'
                    )}
                  />
                </button>

                {/* Animated submenu */}
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    openMegaMenu === item.name ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="pl-4 pb-4">
                    {/* Display mega menu title and description if available */}
                    {item.megaMenu.title && (
                      <div className="mb-4 mt-2 pl-2 border-l-2 border-element-400">
                        <h3 className="text-lg font-semibold text-element-500 dark:text-element-400">
                          {item.megaMenu.title}
                        </h3>
                        {item.megaMenu.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {item.megaMenu.description}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Menu columns */}
                    {item.megaMenu.columns.map((column, columnIndex) => (
                      <div
                        key={columnIndex}
                        className="mb-4 animate-fade-in"
                        style={{ animationDelay: `${String(columnIndex * 100)}ms` }}
                      >
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-4 flex items-center">
                          <span className="inline-block mr-2 h-3 w-1 bg-element-500 dark:bg-element-400 rounded"></span>
                          {column.title}
                        </h4>
                        <ul className="space-y-2 pl-3">
                          {column.items.map((subItem, itemIndex) => (
                            <li
                              key={subItem.title}
                              className="animate-fade-in"
                              style={{
                                animationDelay: `${String(columnIndex * 100 + itemIndex * 50)}ms`,
                              }}
                            >
                              <Link
                                href={subItem.href}
                                className="flex items-center py-2 text-base text-gray-600 dark:text-gray-300 hover:text-element-500 dark:hover:text-element-400 transition-colors"
                                onClick={() => {
                                  handleSubmenuItemClick(item.name, subItem.title, column.title);
                                }}
                              >
                                {subItem.icon && (
                                  <span className="mr-3 text-gray-400 dark:text-gray-500 group-hover:text-element-500 dark:group-hover:text-element-400">
                                    <div className="h-5 w-5">{subItem.icon}</div>
                                  </span>
                                )}
                                <span className="flex-1">{subItem.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* Add featured content card similar to desktop version */}
                    <div className="mt-4 mb-2 px-1">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-start">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-element-100 dark:bg-gray-700 text-element-500 dark:text-element-400">
                            <ExternalLink className="h-5 w-5" />
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                              Need Assistance?
                            </h4>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              Our experts are ready to help with your {item.name.toLowerCase()}{' '}
                              needs.
                            </p>
                            <TrackedButton
                              variant="default"
                              size="sm"
                              className="mt-2 py-1.5 px-3 text-xs bg-element-500 text-white hover:bg-element-600 dark:bg-element-600 dark:hover:bg-element-700"
                              onClick={() => (window.location.href = '/contact')}
                              trackingEvent={{
                                name: 'mobile_menu_contact_button',
                                category: 'navigation',
                                label: `${item.name}_contact`,
                              }}
                            >
                              Contact us
                            </TrackedButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  'block px-5 py-4 text-lg font-medium transition-colors duration-200',
                  item.current
                    ? 'text-element-600 dark:text-element-400'
                    : 'text-gray-700 hover:text-element-500 dark:text-gray-300 dark:hover:text-element-400'
                )}
                aria-current={item.current ? 'page' : undefined}
                onClick={() => {
                  handleLinkClick(item.name);
                }}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="py-4 px-5 border-t border-gray-200 dark:border-gray-700 mt-2">
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

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            <span>+1 (123) 456-7890</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <span>hello@solvejet.net</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const MobileMenu = memo(MobileMenuComponent);
