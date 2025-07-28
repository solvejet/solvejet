// src/components/layout/megamenus/IndustriesMegaMenu.tsx
'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Heart,
    ShoppingCart,
    GraduationCap,
    Home,
    Truck,
    Plane,
    Factory,
    HandHeart,
    Package,
    TrendingUp,
    Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { event } from '@/lib/analytics';

interface IndustryItem {
    id: string;
    name: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    featured?: boolean;
}

interface IndustriesMegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isScrolled: boolean;
}

// Industries data
const industriesData: IndustryItem[] = [
    {
        id: 'healthcare',
        name: 'Healthcare',
        description: 'Digital health solutions and medical software',
        href: '/industries/healthcare',
        icon: Heart,
        featured: true
    },
    {
        id: 'retail',
        name: 'Retail & E-commerce',
        description: 'Online stores and retail technology',
        href: '/industries/retail',
        icon: ShoppingCart,
        featured: true
    },
    {
        id: 'edtech',
        name: 'EdTech',
        description: 'Educational technology and learning platforms',
        href: '/industries/edtech',
        icon: GraduationCap
    },
    {
        id: 'real-estate',
        name: 'Real Estate',
        description: 'Property management and real estate tech',
        href: '/industries/real-estate',
        icon: Home
    },
    {
        id: 'logistics',
        name: 'Logistics',
        description: 'Supply chain and transportation solutions',
        href: '/industries/logistics',
        icon: Truck
    },
    {
        id: 'travel-hospitality',
        name: 'Travel & Hospitality',
        description: 'Booking platforms and hospitality systems',
        href: '/industries/travel',
        icon: Plane
    },
    {
        id: 'manufacturing',
        name: 'Manufacturing',
        description: 'Industrial automation and smart factories',
        href: '/industries/manufacturing',
        icon: Factory
    },
    {
        id: 'non-profit',
        name: 'Non-Profit',
        description: 'Technology for social impact organizations',
        href: '/industries/non-profit',
        icon: HandHeart
    },
    {
        id: 'fmcg',
        name: 'FMCG',
        description: 'Fast-moving consumer goods solutions',
        href: '/industries/fmcg',
        icon: Package
    }
];

const IndustriesMegaMenu: React.FC<IndustriesMegaMenuProps> = React.memo(({
    isOpen,
    onClose,
}) => {
    const handleIndustryClick = useCallback((industryId: string) => {
        event({
            action: 'click_mega_menu_industry',
            category: 'navigation',
            label: industryId
        });
        onClose();
    }, [onClose]);

    const handleViewAllClick = useCallback(() => {
        event({
            action: 'click_mega_menu_view_all_industries',
            category: 'navigation',
            label: 'industries_view_all'
        });
        onClose();
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 bg-brand-dark border border-gray-700 shadow-2xl rounded-lg"
            style={{ width: '1100px' }}
            role="menu"
            aria-label="Industries menu"
            onMouseLeave={onClose}
        >
            <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Industries We Serve</h3>
                        <p className="text-gray-300">Specialized solutions across diverse industry verticals</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <TrendingUp className="w-4 h-4 text-brand-400" />
                        <span>200+ projects delivered</span>
                    </div>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {industriesData.map((industry) => (
                        <Link
                            key={industry.id}
                            href={industry.href}
                            onClick={() => handleIndustryClick(industry.id)}
                            className={cn(
                                'group block p-5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95',
                                'hover:bg-white hover:shadow-lg',
                                industry.featured
                                    ? 'bg-white/10 border-2 border-brand-400'
                                    : 'bg-white/5 border-2 border-gray-600 hover:border-gray-400'
                            )}
                            role="menuitem"
                        >
                            <div className="flex items-start gap-4">
                                <div className={cn(
                                    'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200',
                                    industry.featured
                                        ? 'bg-brand-500 text-white group-hover:bg-brand-600'
                                        : 'bg-gray-700 text-gray-300 group-hover:bg-brand-500 group-hover:text-white'
                                )}>
                                    <industry.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className={cn(
                                            'font-semibold text-base transition-colors duration-200',
                                            industry.featured
                                                ? 'text-white group-hover:text-gray-900'
                                                : 'text-gray-200 group-hover:text-gray-900'
                                        )}>
                                            {industry.name}
                                        </h4>
                                        {industry.featured && (
                                            <span className="px-2 py-1 text-xs font-medium bg-brand-500 text-white rounded-full group-hover:bg-brand-600">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    <p className={cn(
                                        'text-sm leading-relaxed mb-3 transition-colors duration-200',
                                        industry.featured
                                            ? 'text-gray-300 group-hover:text-gray-600'
                                            : 'text-gray-400 group-hover:text-gray-600'
                                    )}>
                                        {industry.description}
                                    </p>
                                    <div className="flex items-center justify-end">
                                        <ArrowRight className={cn(
                                            'w-4 h-4 transition-all duration-200',
                                            'opacity-0 group-hover:opacity-100 group-hover:translate-x-1',
                                            'text-gray-400 group-hover:text-brand-600'
                                        )} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer Stats */}
                <div className="border-t border-gray-600 pt-6">
                    <div className="flex items-center justify-between">
                        <div className="grid grid-cols-4 gap-8 flex-1">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-brand-400 mb-1">200+</div>
                                <div className="text-xs text-gray-400">Total Projects</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-brand-400 mb-1">9</div>
                                <div className="text-xs text-gray-400">Industries</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-brand-400 mb-1">98%</div>
                                <div className="text-xs text-gray-400">Success Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-brand-400 mb-1">150+</div>
                                <div className="text-xs text-gray-400">Happy Clients</div>
                            </div>
                        </div>
                        <div className="ml-8">
                            <Link
                                href="/industries"
                                onClick={handleViewAllClick}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
                            >
                                <Users className="w-4 h-4" />
                                View All Industries
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

IndustriesMegaMenu.displayName = 'IndustriesMegaMenu';

export default IndustriesMegaMenu;