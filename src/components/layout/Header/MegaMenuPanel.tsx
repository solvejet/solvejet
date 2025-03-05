// src/components/layout/Header/MegaMenuPanel.tsx
'use client';

import React, { useRef, memo } from 'react';
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
  const panelRef = useRef<HTMLDivElement>(null);

  // Find the active mega menu
  const activeMegaMenu = navItems.find(item => item.name === openMegaMenu)?.megaMenu;

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

  if (!openMegaMenu || !activeMegaMenu) return <></>;

  return (
    <div
      ref={panelRef}
      className={cn(
        'absolute inset-x-0 top-full w-full overflow-hidden bg-transparent transition-all duration-300 ease-in-out',
        closing ? 'max-h-0 opacity-0 scale-y-95' : 'max-h-[95rem] opacity-100 scale-y-100'
      )}
      style={{ transformOrigin: 'top' }}
    >
      {/* Glass-like card with blur effect */}
      <div className="w-full bg-gray-900/95 backdrop-blur-lg border border-gray-800/40 rounded-b-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left sidebar with description - takes 30% width */}
          <div className="w-full md:w-1/3 bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8">
            <div className="h-full flex flex-col">
              {activeMegaMenu.title && (
                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-1 bg-element-500 rounded-full"></div>
                    <span className="text-sm uppercase tracking-wider text-element-400 font-medium">
                      {openMegaMenu}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mt-2 text-white">
                    {activeMegaMenu.title}
                  </h3>
                  {activeMegaMenu.description && (
                    <p className="mt-3 text-gray-300 leading-relaxed">
                      {activeMegaMenu.description}
                    </p>
                  )}
                </div>
              )}

              {/* Featured item with background gradient */}
              <div className="mt-auto">
                <div className="p-5 rounded-lg border border-element-900/60 shadow-lg relative overflow-hidden">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-element-900/70 to-gray-900/90 z-0"></div>

                  {/* Accent circle */}
                  <div className="absolute -right-12 -bottom-12 w-36 h-36 rounded-full bg-element-500/10 blur-xl"></div>

                  <div className="relative z-10 flex items-start">
                    <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-element-900 text-element-400">
                      <ExternalLink className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-white">Need Assistance?</h4>
                      <p className="mt-1 text-sm text-gray-300">
                        Our experts are ready to help with your {openMegaMenu.toLowerCase()} needs.
                      </p>
                      <TrackedButton
                        variant="default"
                        size="sm"
                        className="mt-3 bg-element-600 text-white hover:bg-element-700 group"
                        onClick={() => (window.location.href = '/contact')}
                        trackingEvent={{
                          name: 'mega_menu_contact_button',
                          category: 'navigation',
                          label: `${openMegaMenu}_contact`,
                        }}
                        rightIcon={
                          <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        }
                      >
                        Contact us
                      </TrackedButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content area - takes 70% width */}
          <div className="w-full md:w-2/3 p-6 md:p-8 bg-transparent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Menu columns with modern card designs */}
              {activeMegaMenu.columns.map((column, columnIndex) => (
                <div key={columnIndex}>
                  <h4 className="font-semibold text-element-400 mb-4 flex items-center">
                    <span className="inline-block mr-2 h-4 w-1 bg-element-500 rounded"></span>
                    {column.title}
                  </h4>

                  <ul className="space-y-2">
                    {column.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          href={item.href}
                          className="group flex items-center p-3 -mx-3 rounded-lg transition-all duration-200
                          bg-transparent hover:bg-element-900/30 border border-transparent hover:border-element-800/50"
                          onClick={(): void => {
                            handleLinkClick(openMegaMenu, column.title, item.title);
                          }}
                        >
                          <div className="flex items-center w-full">
                            {item.icon && (
                              <div className="flex-shrink-0 mr-3 text-element-400 group-hover:text-element-300 transition-colors">
                                <div className="h-5 w-5">{item.icon}</div>
                              </div>
                            )}

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-white group-hover:text-element-300 transition-colors">
                                  {item.title}
                                </p>
                                <ChevronRight
                                  className="h-4 w-4 text-gray-500 group-hover:text-element-400
                                  opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2
                                  group-hover:translate-x-0 duration-300"
                                />
                              </div>

                              {item.description && (
                                <p className="mt-1 text-sm text-gray-400 group-hover:text-gray-300 line-clamp-2 transition-colors">
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

            {/* Resource links with modern design */}
            <div className="mt-8 pt-6 border-t border-gray-800/40">
              <div className="flex flex-wrap gap-4">
                <span className="text-sm text-gray-400 font-medium">Popular resources:</span>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/resources/case-studies"
                    className="text-sm text-element-400 hover:text-element-300 transition-colors
                      px-3 py-1 rounded-full border border-element-900/60 hover:border-element-800
                      bg-element-900/20 hover:bg-element-900/40 transition-all duration-300"
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
                  <Link
                    href="/resources/blog"
                    className="text-sm text-element-400 hover:text-element-300 transition-colors
                      px-3 py-1 rounded-full border border-element-900/60 hover:border-element-800
                      bg-element-900/20 hover:bg-element-900/40 transition-all duration-300"
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
                  <Link
                    href="/resources/articles"
                    className="text-sm text-element-400 hover:text-element-300 transition-colors
                      px-3 py-1 rounded-full border border-element-900/60 hover:border-element-800
                      bg-element-900/20 hover:bg-element-900/40 transition-all duration-300"
                    onClick={(): void => {
                      trackEvent({
                        name: 'mega_menu_resource_link',
                        category: 'navigation',
                        label: `${openMegaMenu}_articles`,
                      });
                    }}
                  >
                    Articles
                  </Link>
                  <Link
                    href="/resources/whitepapers"
                    className="text-sm text-element-400 hover:text-element-300 transition-colors
                      px-3 py-1 rounded-full border border-element-900/60 hover:border-element-800
                      bg-element-900/20 hover:bg-element-900/40 transition-all duration-300"
                    onClick={(): void => {
                      trackEvent({
                        name: 'mega_menu_resource_link',
                        category: 'navigation',
                        label: `${openMegaMenu}_whitepapers`,
                      });
                    }}
                  >
                    Whitepapers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const MegaMenuPanel = memo(MegaMenuPanelComponent);
