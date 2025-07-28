// src/components/layout/megamenus/AboutMegaMenu.tsx
'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowRight,
  Users,
  Target,
  Award,
  Handshake,
  Briefcase,
  Building,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { event } from '@/lib/analytics';

interface AboutSection {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  featured?: boolean;
}

interface AboutMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isScrolled: boolean;
}

// About sections data
const aboutSections: AboutSection[] = [
  {
    id: 'about-us',
    title: 'About Us',
    description: 'Learn about our story, mission, and values that drive our success',
    href: '/about',
    icon: Building,
    featured: true
  },
  {
    id: 'how-we-work',
    title: 'How We Work',
    description: 'Our methodology and development process for delivering excellence',
    href: '/how-we-work',
    icon: Target,
    featured: true
  },
  {
    id: 'awards-partners',
    title: 'Awards & Partners',
    description: 'Recognition from industry leaders and strategic partnerships',
    href: '/awards-partners',
    icon: Award
  },
  {
    id: 'partnerships',
    title: 'Partnerships',
    description: 'Strategic alliances and collaboration opportunities',
    href: '/partnerships',
    icon: Handshake
  },
  {
    id: 'careers',
    title: 'Careers',
    description: 'Join our team and grow your career with exciting opportunities',
    href: '/careers',
    icon: Briefcase
  }
];

const AboutMegaMenu: React.FC<AboutMegaMenuProps> = React.memo(({ 
  isOpen, 
  onClose, 
  isScrolled 
}) => {
  const handleLinkClick = useCallback((sectionId: string) => {
    event({
      action: 'click_mega_menu_about',
      category: 'navigation',
      label: sectionId
    });
    onClose();
  }, [onClose]);

  const handleViewAllClick = useCallback(() => {
    event({
      action: 'click_mega_menu_view_all_about',
      category: 'navigation',
      label: 'about_view_all'
    });
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 shadow-2xl rounded-lg"
      style={{ width: '800px' }}
      role="menu"
      aria-label="About menu"
      onMouseLeave={onClose}
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">About SolveJet</h3>
            <p className="text-gray-600">Get to know us better and explore opportunities</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4 text-brand-500" />
            <span>Trusted by 200+ companies</span>
          </div>
        </div>

        {/* About Sections Grid */}
        <div className="grid grid-cols-2 gap-px bg-gray-200 min-h-[300px] mb-8">
          {aboutSections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              onClick={() => handleLinkClick(section.id)}
              className="group flex p-6 bg-white hover:bg-gray-50 transition-all duration-200"
              role="menuitem"
            >
              <div className="flex items-start gap-4 w-full">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors duration-200">
                  <section.icon className="w-6 h-6 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-base text-gray-900 group-hover:text-brand-700 transition-colors duration-200">
                      {section.title}
                    </h4>
                    {section.featured && (
                      <span className="px-2 py-1 text-xs font-medium bg-brand-500 text-white rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                    {section.description}
                  </p>
                  <div className="flex items-center justify-end mt-3">
                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div className="grid grid-cols-3 gap-8 flex-1">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-600 mb-1">200+</div>
                <div className="text-xs text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-600 mb-1">5+</div>
                <div className="text-xs text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-600 mb-1">150+</div>
                <div className="text-xs text-gray-600">Team Members</div>
              </div>
            </div>
            <div className="ml-8">
              <Link 
                href="/contact" 
                onClick={handleViewAllClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
              >
                <Users className="w-4 h-4" />
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AboutMegaMenu.displayName = 'AboutMegaMenu';

export default AboutMegaMenu;