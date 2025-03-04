// src/components/layout/Header/MobileMenu.tsx
import React, { memo } from 'react';
import Link from 'next/link';
import { MessageSquare, Phone, Mail, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import type { NavItem } from './types';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
}

function MobileMenuComponent({ isOpen, navItems }: MobileMenuProps): React.ReactElement {
  const { trackEvent } = useAnalytics();

  if (!isOpen) return <></>;

  // Track mobile menu link clicks
  const handleLinkClick = (itemName: string): void => {
    trackEvent({
      name: 'mobile_menu_link_click',
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
          <div key={item.name} className="border-b border-gray-800 last:border-b-0">
            <Link
              href={item.href}
              className={cn(
                'block px-5 py-4 text-lg font-medium transition-colors duration-200',
                item.current ? 'text-element-400' : 'text-white hover:text-element-300'
              )}
              aria-current={item.current ? 'page' : undefined}
              onClick={() => {
                handleLinkClick(item.name);
              }}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </nav>

      {/* Services Shortcuts */}
      <div className="px-5 py-4">
        <h3 className="text-element-400 font-medium mb-3">Popular Services</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Custom Software', href: '/services/custom-software-development' },
            { name: 'AI Solutions', href: '/services/artificial-intelligence' },
            { name: 'Cloud Services', href: '/services/cloud-services' },
            { name: 'Mobile Apps', href: '/services/mobile-app-development' },
          ].map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="bg-gray-800/60 px-3 py-2.5 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-700/60 transition-colors"
              onClick={() => {
                trackEvent({
                  name: 'mobile_menu_service_click',
                  category: 'navigation',
                  label: service.name,
                });
              }}
            >
              {service.name}
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-4 px-5 border-t border-gray-700 mt-2">
        <div className="p-4 bg-gray-800/60 rounded-lg border border-gray-700 mb-4">
          <h4 className="font-medium text-white text-base">Ready to Transform Your Business?</h4>
          <p className="mt-1 text-sm text-gray-400 mb-3">
            Let our experts help you build scalable solutions tailored to your needs.
          </p>
          <TrackedButton
            variant="default"
            size="sm"
            className="bg-element-600 text-white hover:bg-element-700"
            onClick={() => (window.location.href = '/contact')}
            trackingEvent={{
              name: 'mobile_menu_cta_click',
              category: 'navigation',
              label: 'transform_business',
            }}
            rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}
          >
            Get Started
          </TrackedButton>
        </div>

        <TrackedButton
          variant="outline"
          size="lg"
          className="w-full flex justify-center py-3 px-4 border-element-400 text-element-400 hover:bg-element-900/50"
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
