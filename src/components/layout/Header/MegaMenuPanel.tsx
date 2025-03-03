// src/components/layout/Header/MegaMenuPanel.tsx
import React, { memo } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import type { NavItem } from './types';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

interface MegaMenuPanelProps {
  navItems: NavItem[];
  openMegaMenu: string | null;
  closing: boolean;
}

function MegaMenuPanelComponent({
  navItems,
  openMegaMenu,
  closing,
}: MegaMenuPanelProps): React.ReactElement {
  const { trackEvent } = useAnalytics();

  if (!openMegaMenu) return <></>;

  // Find the active mega menu
  const activeMegaMenu = navItems.find(item => item.name === openMegaMenu)?.megaMenu;
  if (!activeMegaMenu) return <></>;

  // Track link click events
  const handleLinkClick = (itemName: string, columnTitle: string, linkTitle: string): void => {
    trackEvent({
      name: 'mega_menu_link_click',
      category: 'navigation',
      label: `${itemName}_${linkTitle}`,
      properties: {
        menu_name: itemName,
        column_title: columnTitle,
        link_title: linkTitle,
      },
    });
  };

  return (
    <div
      className={cn(
        'absolute inset-x-0 top-full -mt-[1px] w-full',
        'transition-all duration-300 ease-in-out overflow-hidden',
        closing ? 'max-h-0 opacity-0 scale-y-95' : 'max-h-[90rem] opacity-100 scale-y-100'
      )}
      style={{ transformOrigin: 'top' }}
    >
      {/* Modern card design with sidebar layout */}
      <div className="w-full bg-white dark:bg-gray-900 rounded-b-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 border-t-0">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar/header with title and featured content - takes 30% on desktop */}
          <div className="w-full md:w-1/3 bg-gradient-to-br from-element-50 to-element-100 dark:from-gray-800 dark:to-gray-700 p-6 md:p-8">
            <div className="h-full flex flex-col">
              {activeMegaMenu.title && (
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-element-500 dark:text-element-400">
                    {openMegaMenu}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mt-1 text-gray-900 dark:text-white">
                    {activeMegaMenu.title}
                  </h3>
                  {activeMegaMenu.description && (
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      {activeMegaMenu.description}
                    </p>
                  )}
                </div>
              )}

              {/* Featured item - highlight */}
              <div className="mt-auto">
                <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-element-200 dark:border-gray-600 shadow-sm">
                  <div className="flex items-start">
                    <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-element-100 dark:bg-gray-700 text-element-500 dark:text-element-400">
                      <ExternalLink className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Need Assistance?
                      </h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Our experts are ready to help with your {openMegaMenu.toLowerCase()} needs.
                      </p>
                      <TrackedButton
                        variant="default"
                        size="sm"
                        className="mt-3 bg-element-500 text-white hover:bg-element-600 dark:bg-element-600 dark:hover:bg-element-700"
                        onClick={() => (window.location.href = '/contact')}
                        trackingEvent={{
                          name: 'mega_menu_contact_button',
                          category: 'navigation',
                          label: `${openMegaMenu}_contact`,
                        }}
                        rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}
                      >
                        Contact us
                      </TrackedButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area - takes 70% on desktop */}
          <div className="w-full md:w-2/3 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Menu columns with cards */}
              {activeMegaMenu.columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className="animate-fade-in"
                  style={{ animationDelay: `${String(columnIndex * 50)}ms` }}
                >
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                    <span className="inline-block mr-2 h-4 w-1 bg-element-500 dark:bg-element-400 rounded"></span>
                    {column.title}
                  </h4>

                  <ul className="space-y-3">
                    {column.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="animate-fade-in"
                        style={{
                          animationDelay: `${String(columnIndex * 50 + itemIndex * 30)}ms`,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="group block p-3 -mx-3 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                          onClick={(): void => {
                            handleLinkClick(openMegaMenu, column.title, item.title);
                          }}
                        >
                          <div className="flex items-center">
                            {item.icon && (
                              <div className="flex-shrink-0 mr-3 text-element-400 dark:text-element-500 group-hover:text-element-500 dark:group-hover:text-element-400 transition-colors">
                                <div className="h-5 w-5">{item.icon}</div>
                              </div>
                            )}

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-gray-900 dark:text-white group-hover:text-element-500 dark:group-hover:text-element-400 transition-colors">
                                  {item.title}
                                </p>
                                <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-element-500 dark:group-hover:text-element-400 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                              </div>

                              {item.description && (
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 line-clamp-2 transition-colors">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Resource links at the bottom */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Popular resources: </span>
              <Link
                href="/privacy-policy"
                className="text-sm text-element-500 dark:text-element-400 hover:text-element-600 dark:hover:text-element-300 transition-colors"
                onClick={(): void => {
                  trackEvent({
                    name: 'mega_menu_resource_link',
                    category: 'navigation',
                    label: `${openMegaMenu}_privacy_policy`,
                  });
                }}
              >
                Privacy Policy
              </Link>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Link
                href="/resources/case-studies"
                className="text-sm text-element-500 dark:text-element-400 hover:text-element-600 dark:hover:text-element-300 transition-colors"
                onClick={(): void => {
                  trackEvent({
                    name: 'mega_menu_resource_link',
                    category: 'navigation',
                    label: `${openMegaMenu}_case_studies`,
                  });
                }}
              >
                Case Studies
              </Link>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Link
                href="/resources/blog"
                className="text-sm text-element-500 dark:text-element-400 hover:text-element-600 dark:hover:text-element-300 transition-colors"
                onClick={(): void => {
                  trackEvent({
                    name: 'mega_menu_resource_link',
                    category: 'navigation',
                    label: `${openMegaMenu}_blog`,
                  });
                }}
              >
                Blog
              </Link>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Link
                href="/terms-conditions"
                className="text-sm text-element-500 dark:text-element-400 hover:text-element-600 dark:hover:text-element-300 transition-colors"
                onClick={(): void => {
                  trackEvent({
                    name: 'mega_menu_resource_link',
                    category: 'navigation',
                    label: `${openMegaMenu}_terms_conditions`,
                  });
                }}
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const MegaMenuPanel = memo(MegaMenuPanelComponent);
