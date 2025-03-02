// src/components/layout/Header/MegaMenuPanel.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from './types';

interface MegaMenuPanelProps {
  navItems: NavItem[];
  openMegaMenu: string | null;
  closing: boolean;
}

export function MegaMenuPanel({
  navItems,
  openMegaMenu,
  closing,
}: MegaMenuPanelProps): React.ReactElement {
  if (!openMegaMenu) return <></>;

  return (
    <div
      className={cn(
        'backdrop-blur-xl bg-white/80 dark:bg-gray-900/80',
        'border-t border-gray-100 dark:border-gray-800',
        'transition-all duration-300 ease-in-out',
        closing ? 'animate-menu-slide-up' : 'animate-menu-slide-down'
      )}
    >
      {navItems.map(item => {
        if (item.name === openMegaMenu && item.megaMenu) {
          return (
            <div key={item.name}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                {/* Mega menu header - conditional */}
                {item.megaMenu.title && (
                  <div className="col-span-full mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {item.megaMenu.title}
                    </h3>
                    {item.megaMenu.description && (
                      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                        {item.megaMenu.description}
                      </p>
                    )}
                    <div className="mt-4 border-b border-gray-200 dark:border-gray-700"></div>
                  </div>
                )}

                {/* Mega menu columns */}
                {item.megaMenu.columns.map((column, i) => (
                  <div
                    key={i}
                    className="animate-fade-in"
                    style={{ animationDelay: `${String(i * 100)}ms` }}
                  >
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                      <span className="border-b-2 border-element-400 pb-1">{column.title}</span>
                    </h4>
                    <ul className="space-y-4">
                      {column.items.map((subItem, j) => (
                        <li
                          key={j}
                          className="animate-fade-in"
                          style={{
                            animationDelay: `${String(i * 100 + j * 50)}ms`,
                          }}
                        >
                          <Link
                            href={subItem.href}
                            className="group flex items-start p-3 -m-3 rounded-md transition-all duration-300 hover:bg-element-50/50 dark:hover:bg-element-900/50"
                          >
                            {subItem.icon && (
                              <div className="flex-shrink-0 mr-4 mt-0.5">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-element-100/80 dark:bg-element-900/80 text-element-500 dark:text-element-400 group-hover:bg-element-200/90 dark:group-hover:bg-element-800/90 transition-all duration-300 shadow-sm group-hover:shadow-md">
                                  <div className="h-6 w-6">{subItem.icon}</div>
                                </div>
                              </div>
                            )}
                            <div>
                              <div className="flex items-center">
                                <p className="text-base font-medium text-gray-900 dark:text-white group-hover:text-element-500 dark:group-hover:text-element-400 transition-colors">
                                  {subItem.title}
                                </p>
                                <div className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                  <ArrowRight className="h-4 w-4 text-element-500 dark:text-element-400" />
                                </div>
                              </div>
                              {subItem.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                  {subItem.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-element-50/90 dark:bg-gray-800/90 backdrop-blur-md p-5 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                <div className="text-base text-gray-500 dark:text-gray-400">
                  <span>Need assistance with {item.name.toLowerCase()}?</span>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-5 py-2 text-base font-medium text-white bg-element-500 hover:bg-element-600 dark:bg-element-600 dark:hover:bg-element-700 rounded-md transition-colors duration-300"
                >
                  Contact our team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
