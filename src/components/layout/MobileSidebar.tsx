// src/components/layout/MobileSidebar.tsx
'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    ArrowRight,
    Users,
    Building,
    Target,
    Award,
    Handshake,
    Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { event } from '@/lib/analytics';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isScrolled: boolean;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
    isOpen,
    onClose,
}) => {
    const pathname = usePathname();

    const handleLinkClick = useCallback((section: string, item?: string) => {
        event({
            action: 'click_mobile_sidebar',
            category: 'navigation',
            label: item ? `${section}_${item}` : section
        });
        onClose();
    }, [onClose]);

    const handleContactClick = useCallback(() => {
        event({
            action: 'click_mobile_contact',
            category: 'conversion',
            label: 'mobile_sidebar_contact'
        });
        onClose();
    }, [onClose]);

    const isActiveRoute = useCallback((href: string): boolean => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    }, [pathname]);

    return (
        <>
            {/* Enhanced Sidebar - No Overlay */}
            <div
                className={cn(
                    'lg:hidden fixed top-14 sm:top-16 lg:top-18 right-0 bottom-0 left-0 z-40', // Responsive top positioning, below header (z-50) but above content
                    'transform transition-all duration-500 ease-out',
                    'backdrop-blur-xl bg-white/90 border-l border-white/20',
                    'shadow-2xl shadow-black/25',
                    isOpen ? 'translate-x-0' : 'translate-x-full', // Slide from right
                )}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                id="mobile-menu"
            >
                <div className="h-full flex flex-col relative">
                    {/* Glassmorphism effect background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl" />

                    {/* Content with improved spacing and typography */}
                    <div className="relative z-10 flex-1 overflow-y-auto">
                        <div className="p-6 sm:p-8 space-y-8 sm:space-y-10">
                            {/* Services Section - Enhanced UI */}
                            <div className="space-y-4">
                                <Link
                                    href="/services"
                                    className="group flex items-center justify-between p-5 bg-gradient-to-r from-brand-50/80 to-brand-100/60 backdrop-blur-sm rounded-2xl hover:from-brand-100/90 hover:to-brand-200/80 transition-all duration-300 border border-brand-200/50 shadow-lg shadow-brand-500/10"
                                    onClick={() => handleLinkClick('services')}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <Building className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">Services</h3>
                                            <p className="text-sm text-gray-600">Comprehensive tech solutions</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-brand-600 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>

                                <div className="grid grid-cols-1 gap-4">
                                    <Link
                                        href="/services/mvp-development"
                                        className={cn(
                                            'group p-5 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                                            'bg-white/60 backdrop-blur-sm hover:bg-white/80',
                                            'hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10',
                                            isActiveRoute('/services/mvp-development')
                                                ? 'border-brand-400 bg-brand-50/80 shadow-lg shadow-brand-500/20'
                                                : 'border-gray-200/60'
                                        )}
                                        onClick={() => handleLinkClick('services', 'mvp_development')}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                                                <Target className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">MVP Development</h4>
                                                <p className="text-sm text-gray-600 leading-relaxed">Rapid prototyping and market validation</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link
                                        href="/services/app-development"
                                        className={cn(
                                            'group p-5 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                                            'bg-white/60 backdrop-blur-sm hover:bg-white/80',
                                            'hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10',
                                            isActiveRoute('/services/app-development')
                                                ? 'border-brand-400 bg-brand-50/80 shadow-lg shadow-brand-500/20'
                                                : 'border-gray-200/60'
                                        )}
                                        onClick={() => handleLinkClick('services', 'app_development')}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                                                <Building className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">App Development</h4>
                                                <p className="text-sm text-gray-600 leading-relaxed">Full-scale mobile & web applications</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link
                                        href="/services/ai-development"
                                        className={cn(
                                            'group p-5 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                                            'bg-white/60 backdrop-blur-sm hover:bg-white/80',
                                            'hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10',
                                            isActiveRoute('/services/ai-development')
                                                ? 'border-brand-400 bg-brand-50/80 shadow-lg shadow-brand-500/20'
                                                : 'border-gray-200/60'
                                        )}
                                        onClick={() => handleLinkClick('services', 'ai_development')}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                                                <Award className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">AI Development</h4>
                                                <p className="text-sm text-gray-600 leading-relaxed">Intelligent automation solutions</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Industries Section - Enhanced UI */}
                            <div className="space-y-4">
                                <Link
                                    href="/industries"
                                    className="group flex items-center justify-between p-5 bg-gradient-to-r from-purple-50/80 to-purple-100/60 backdrop-blur-sm rounded-2xl hover:from-purple-100/90 hover:to-purple-200/80 transition-all duration-300 border border-purple-200/50 shadow-lg shadow-purple-500/10"
                                    onClick={() => handleLinkClick('industries')}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">Industries</h3>
                                            <p className="text-sm text-gray-600">Specialized sector solutions</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-purple-600 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>

                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { href: '/industries/healthcare', label: 'Healthcare', desc: 'Digital health', active: isActiveRoute('/industries/healthcare') },
                                        { href: '/industries/retail', label: 'Retail', desc: 'E-commerce', active: isActiveRoute('/industries/retail') },
                                        { href: '/industries/fintech', label: 'FinTech', desc: 'Financial tech', active: isActiveRoute('/industries/fintech') },
                                        { href: '/industries/edtech', label: 'EdTech', desc: 'Education tech', active: isActiveRoute('/industries/edtech') }
                                    ].map((industry) => (
                                        <Link
                                            key={industry.href}
                                            href={industry.href}
                                            className={cn(
                                                'group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                                                'bg-white/60 backdrop-blur-sm hover:bg-white/80',
                                                'hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10',
                                                industry.active
                                                    ? 'border-purple-400 bg-purple-50/80 shadow-md shadow-purple-500/20'
                                                    : 'border-gray-200/60'
                                            )}
                                            onClick={() => handleLinkClick('industries', industry.label.toLowerCase())}
                                        >
                                            <h4 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">{industry.label}</h4>
                                            <p className="text-xs text-gray-600">{industry.desc}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* About Section - Enhanced UI */}
                            <div className="space-y-4">
                                <Link
                                    href="/about"
                                    className="group flex items-center justify-between p-5 bg-gradient-to-r from-emerald-50/80 to-emerald-100/60 backdrop-blur-sm rounded-2xl hover:from-emerald-100/90 hover:to-emerald-200/80 transition-all duration-300 border border-emerald-200/50 shadow-lg shadow-emerald-500/10"
                                    onClick={() => handleLinkClick('about')}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <Handshake className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">About</h3>
                                            <p className="text-sm text-gray-600">Get to know us better</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-emerald-600 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>

                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { href: '/about', label: 'About Us', desc: 'Our story', active: isActiveRoute('/about') && pathname === '/about' },
                                        { href: '/how-we-work', label: 'How We Work', desc: 'Methodology', active: isActiveRoute('/how-we-work') },
                                        { href: '/careers', label: 'Careers', desc: 'Join us', active: isActiveRoute('/careers') },
                                        { href: '/partnerships', label: 'Partnerships', desc: 'Alliances', active: isActiveRoute('/partnerships') }
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                'group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                                                'bg-white/60 backdrop-blur-sm hover:bg-white/80',
                                                'hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10',
                                                item.active
                                                    ? 'border-emerald-400 bg-emerald-50/80 shadow-md shadow-emerald-500/20'
                                                    : 'border-gray-200/60'
                                            )}
                                            onClick={() => handleLinkClick('about', item.label.toLowerCase().replace(' ', '_'))}
                                        >
                                            <h4 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">{item.label}</h4>
                                            <p className="text-xs text-gray-600">{item.desc}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Case Studies Section - Enhanced */}
                            <div>
                                <Link
                                    href="/case-studies"
                                    className={cn(
                                        'group flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                                        'bg-gradient-to-r from-orange-50/80 to-orange-100/60 backdrop-blur-sm hover:from-orange-100/90 hover:to-orange-200/80',
                                        'border border-orange-200/50 shadow-lg shadow-orange-500/10',
                                        'hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/20',
                                        isActiveRoute('/case-studies')
                                            ? 'border-orange-400 bg-orange-50/90 shadow-lg shadow-orange-500/20'
                                            : ''
                                    )}
                                    onClick={() => handleLinkClick('case_studies')}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <Briefcase className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">Case Studies</h3>
                                            <p className="text-sm text-gray-600">Our success stories</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-orange-600 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Footer */}
                    <div className="relative z-10 p-6 sm:p-8 border-t border-white/30 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm">
                        <Link href="/contact" className="block w-full mb-6" onClick={handleContactClick}>
                            <Button
                                variant="gradient-flow"
                                size="lg"
                                fullWidth
                                className="rounded-2xl text-base font-semibold py-4 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                Contact Us
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>

                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-700 mb-3">Trusted by 200+ Companies</p>
                            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                                    <span className="font-medium">ISO Certified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    <span className="font-medium">Google Cloud Partner</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileSidebar;