// src/components/layout/Header/MegaMenuPanel.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { NavItem } from './types';

interface MegaMenuPanelProps {
  navItems: NavItem[];
  openMegaMenu: string;
}

export function MegaMenuPanel({ navItems, openMegaMenu }: MegaMenuPanelProps): React.ReactElement {
  return (
    <div className="bg-white dark:bg-gray-900">
      {navItems.map(item => {
        if (item.name === openMegaMenu && item.megaMenu) {
          return (
            <div key={item.name}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {/* Mega menu header - conditional */}
                {item.megaMenu.title && (
                  <div className="col-span-full mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.megaMenu.title}
                    </h3>
                    {item.megaMenu.description && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {item.megaMenu.description}
                      </p>
                    )}
                    <div className="mt-3 border-b border-gray-200 dark:border-gray-700"></div>
                  </div>
                )}

                {/* Mega menu columns */}
                {item.megaMenu.columns.map((column, i) => (
                  <div
                    key={i}
                    className="animate-fade-in"
                    style={{ animationDelay: `${String(i * 100)}ms` }}
                  >
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                      {column.title}
                    </h4>
                    <ul className="space-y-3">
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
                            className="group flex items-start p-2 -m-2 rounded-md transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            {subItem.icon && (
                              <div className="flex-shrink-0 mr-3 mt-0.5">
                                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-element-50 dark:bg-element-900 text-element-500 dark:text-element-400 group-hover:bg-element-100 dark:group-hover:bg-element-800 transition-colors">
                                  {subItem.icon}
                                </div>
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-element-500 dark:group-hover:text-element-400 transition-colors">
                                {subItem.title}
                              </p>
                              {subItem.description && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
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

              <div className="bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span>Need assistance with {item.name.toLowerCase()}?</span>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-element-500 dark:text-element-400 hover:text-element-600 dark:hover:text-element-300 transition-colors"
                >
                  Contact our team
                  <ArrowRight className="ml-1 h-4 w-4" />
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
