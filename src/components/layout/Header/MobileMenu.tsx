// src/components/layout/Header/MobileMenu.tsx
'use client';

import React, { memo, useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Phone, Mail, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import type { NavItem } from './types';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
}

interface AccordionSectionProps {
  item: NavItem;
  isOpen: boolean;
  toggleAccordion: () => void;
  onLinkClick: (itemName: string, subItemName?: string) => void;
}

// Accordion component for mobile mega menu
const AccordionSection: React.FC<AccordionSectionProps> = ({
  item,
  isOpen,
  toggleAccordion,
  onLinkClick,
}) => {
  return (
    <div className="border-b border-gray-800 last:border-b-0">
      {/* Main navigation item */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <Link
          href={item.href}
          className={cn(
            'text-lg font-medium transition-colors duration-200',
            item.current ? 'text-element-400' : 'text-white'
          )}
          onClick={e => {
            e.stopPropagation();
            onLinkClick(item.name);
          }}
        >
          {item.name}
        </Link>

        {item.megaMenu && (
          <button
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
            aria-expanded={isOpen}
            aria-label={isOpen ? `Collapse ${item.name} menu` : `Expand ${item.name} menu`}
          >
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* Expandable mega menu content */}
      {item.megaMenu && (
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out bg-gray-900/50',
            isOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
          )}
        >
          {item.megaMenu.columns.map((column, colIndex) => (
            <div key={colIndex} className="mb-4 px-5">
              <h4 className="text-element-400 text-sm font-medium mb-2 flex items-center">
                <span className="w-1 h-4 bg-element-500 rounded-full mr-2"></span>
                {column.title}
              </h4>
              <ul className="space-y-2 ml-3">
                {column.items.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      href={subItem.href}
                      className="text-gray-300 hover:text-element-300 text-base py-1.5 flex items-center transition-colors"
                      onClick={() => {
                        onLinkClick(item.name, subItem.title);
                      }}
                    >
                      {subItem.icon && (
                        <span className="mr-3 text-element-400">{subItem.icon}</span>
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
  );
};

function MobileMenuComponent({ isOpen, navItems }: MobileMenuProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  if (!isOpen) return <></>;

  // Track mobile menu link clicks
  const handleLinkClick = (itemName: string, subItemName?: string): void => {
    trackEvent({
      name: 'mobile_menu_link_click',
      category: 'navigation',
      label: subItemName ? `${itemName}_${subItemName}` : itemName,
      properties: {
        item_name: itemName,
        sub_item_name: subItemName ?? null,
      },
    });
  };

  const toggleAccordion = (itemName: string): void => {
    setOpenAccordions(prev => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));

    // Track accordion toggle
    trackEvent({
      name: openAccordions[itemName] ? 'mobile_accordion_collapse' : 'mobile_accordion_expand',
      category: 'navigation',
      label: itemName,
      properties: {
        item_name: itemName,
      },
    });
  };

  return (
    <div className="py-3 animate-fade-in">
      <nav className="py-3">
        {navItems.map(item => (
          <AccordionSection
            key={item.name}
            item={item}
            isOpen={!!openAccordions[item.name]}
            toggleAccordion={() => {
              toggleAccordion(item.name);
            }}
            onLinkClick={handleLinkClick}
          />
        ))}
      </nav>

      {/* CTA Section with enhanced styling */}
      <div className="py-4 px-5 border-t border-gray-800/50 mt-4 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="p-4 bg-gray-800/80 rounded-lg border border-gray-700/70 mb-4 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-element-900/20 blur-xl"></div>

          <h4 className="font-medium text-white text-base">Ready to Transform Your Business?</h4>
          <p className="mt-1 text-sm text-gray-300 mb-3">
            Let our experts help you build scalable solutions tailored to your needs.
          </p>
          <TrackedButton
            variant="default"
            size="sm"
            className="bg-element-600 text-white hover:bg-element-700 group"
            onClick={() => (window.location.href = '/contact')}
            trackingEvent={{
              name: 'mobile_menu_cta_click',
              category: 'navigation',
              label: 'transform_business',
            }}
            rightIcon={
              <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            }
          >
            Get Started
          </TrackedButton>
        </div>

        <TrackedButton
          variant="outline"
          size="lg"
          className="w-full flex justify-center py-3 px-4 border-element-400 text-element-400 hover:bg-element-900/50 group"
          onClick={() => (window.location.href = '/contact')}
          trackingEvent={{
            name: 'mobile_contact_click',
            category: 'navigation',
            label: 'mobile_menu_contact_button',
          }}
          leftIcon={
            <MessageSquare className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
          }
        >
          Get in Touch
        </TrackedButton>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-400">
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
