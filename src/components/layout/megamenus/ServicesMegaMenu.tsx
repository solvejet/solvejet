// src/components/layout/megamenus/ServicesMegaMenu.tsx
'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Rocket,
    Smartphone,
    Palette,
    Brain,
    BarChart3,
    Shield,
    Building2,
    TestTube,
    Cloud,
    MessageSquare,
    Users,
    Settings,
    Code
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { event } from '@/lib/analytics';

interface ServiceItem {
    id: string;
    title: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    category: 'Development' | 'Design' | 'Cloud' | 'Consulting' | 'Intelligence';
    featured?: boolean;
}

interface ServiceCategory {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    services: ServiceItem[];
}

interface ServicesMegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isScrolled: boolean;
}

// Services data structure for mega menu
const servicesData: ServiceCategory[] = [
    {
        id: 'development',
        name: 'Development',
        description: 'End-to-end development services for seamless software delivery.',
        icon: Code,
        services: [
            {
                id: 'mvp-development',
                title: 'MVP Development',
                description: 'Rapid prototyping and minimum viable product development to validate your business ideas quickly',
                href: '/services/mvp-development',
                icon: Rocket,
                category: 'Development',
                featured: true
            },
            {
                id: 'app-development',
                title: 'Application development',
                description: 'Bring your software vision to life with a tailored solution and deliver an industry-leading user experience.',
                href: '/services/app-development',
                icon: Smartphone,
                category: 'Development'
            },
            {
                id: 'enterprise-application',
                title: 'Enterprise applications',
                description: 'ERP consulting\nCRM consulting',
                href: '/services/enterprise-application',
                icon: Building2,
                category: 'Development'
            },
            {
                id: 'poc-development',
                title: 'PoC development',
                description: 'Safely explore business-boosting concepts with robust testing and expert road mapping.',
                href: '/services/poc-development',
                icon: TestTube,
                category: 'Development'
            },
            {
                id: 'legacy-modernization',
                title: 'Legacy software modernization',
                description: 'Transform your core legacy systems to elevate performance, agility, scalability, and UX.',
                href: '/services/legacy-modernization',
                icon: Settings,
                category: 'Development'
            },
            {
                id: 'product-delivery',
                title: 'Product-oriented delivery',
                description: 'Ensure timely and cost-effective product delivery while prioritizing your business objectives.',
                href: '/services/product-delivery',
                icon: Palette,
                category: 'Development'
            }
        ]
    },
    {
        id: 'cloud',
        name: 'Cloud & Infrastructure',
        description: 'Scalable cloud solutions and infrastructure management.',
        icon: Cloud,
        services: [
            {
                id: 'cloud-computing',
                title: 'Cloud computing',
                description: 'Modern cloud solutions for scalable, reliable, and cost-effective infrastructure management',
                href: '/services/cloud-computing',
                icon: Cloud,
                category: 'Cloud'
            },
            {
                id: 'cloud-migration',
                title: 'Cloud migration',
                description: 'Seamlessly migrate your existing infrastructure to the cloud with minimal downtime',
                href: '/services/cloud-migration',
                icon: Cloud,
                category: 'Cloud'
            },
            {
                id: 'devops',
                title: 'DevOps',
                description: 'Streamline development and deployment with automated CI/CD pipelines and infrastructure as code',
                href: '/services/devops',
                icon: Settings,
                category: 'Cloud'
            },
            {
                id: 'cybersecurity',
                title: 'Cybersecurity',
                description: 'Comprehensive security solutions to protect your digital assets and ensure regulatory compliance',
                href: '/services/cybersecurity',
                icon: Shield,
                category: 'Cloud'
            },
            {
                id: 'infrastructure-monitoring',
                title: 'Infrastructure monitoring',
                description: 'Real-time monitoring and alerting for your cloud infrastructure and applications',
                href: '/services/infrastructure-monitoring',
                icon: BarChart3,
                category: 'Cloud'
            },
            {
                id: 'disaster-recovery',
                title: 'Disaster recovery',
                description: 'Robust backup and disaster recovery solutions to ensure business continuity',
                href: '/services/disaster-recovery',
                icon: Shield,
                category: 'Cloud'
            }
        ]
    },
    {
        id: 'data-ai',
        name: 'Data & AI',
        description: 'Custom solutions to maximize the value of your data.',
        icon: Brain,
        services: [
            {
                id: 'ai-development',
                title: 'AI Development',
                description: 'Cutting-edge artificial intelligence solutions to automate processes and enhance decision-making',
                href: '/services/ai-development',
                icon: Brain,
                category: 'Intelligence',
                featured: true
            },
            {
                id: 'machine-learning',
                title: 'Machine Learning',
                description: 'Custom ML models and algorithms to solve complex business problems and predict outcomes',
                href: '/services/machine-learning',
                icon: Brain,
                category: 'Intelligence'
            },
            {
                id: 'data-science',
                title: 'Data Science',
                description: 'Transform your data into actionable insights with advanced analytics and visualization',
                href: '/services/data-science',
                icon: BarChart3,
                category: 'Intelligence'
            },
            {
                id: 'data-engineering',
                title: 'Data Engineering',
                description: 'Build robust data pipelines and warehouses for scalable data processing and storage',
                href: '/services/data-engineering',
                icon: BarChart3,
                category: 'Intelligence'
            },
            {
                id: 'business-intelligence',
                title: 'Business Intelligence',
                description: 'Comprehensive BI solutions with dashboards and reporting for data-driven decisions',
                href: '/services/business-intelligence',
                icon: BarChart3,
                category: 'Intelligence'
            },
            {
                id: 'ai-automation',
                title: 'AI Automation',
                description: 'Intelligent process automation to streamline workflows and reduce manual tasks',
                href: '/services/ai-automation',
                icon: Settings,
                category: 'Intelligence'
            }
        ]
    },
    {
        id: 'consulting',
        name: 'Consulting & Teams',
        description: 'Strategic guidance and skilled resources for your projects.',
        icon: MessageSquare,
        services: [
            {
                id: 'it-consulting',
                title: 'IT Consulting',
                description: 'Strategic technology consulting to align IT initiatives with your business objectives',
                href: '/services/it-consulting',
                icon: MessageSquare,
                category: 'Consulting'
            },
            {
                id: 'digital-strategy',
                title: 'Digital Strategy',
                description: 'Comprehensive digital transformation roadmaps and implementation strategies',
                href: '/services/digital-strategy',
                icon: Brain,
                category: 'Consulting'
            },
            {
                id: 'staff-augmentation',
                title: 'IT Staff Augmentation',
                description: 'Skilled developers and IT professionals to extend your team capabilities and accelerate delivery',
                href: '/services/staff-augmentation',
                icon: Users,
                category: 'Consulting',
                featured: true
            },
            {
                id: 'project-management',
                title: 'Project Management',
                description: 'Expert project management services to ensure on-time delivery and budget compliance',
                href: '/services/project-management',
                icon: Settings,
                category: 'Consulting'
            },
            {
                id: 'technology-audit',
                title: 'Technology Audit',
                description: 'Comprehensive assessment of your technology stack and recommendations for improvement',
                href: '/services/technology-audit',
                icon: Shield,
                category: 'Consulting'
            },
            {
                id: 'architecture-design',
                title: 'Architecture Design',
                description: 'Scalable system architecture design and technical blueprints for complex projects',
                href: '/services/architecture-design',
                icon: Building2,
                category: 'Consulting'
            }
        ]
    },
    {
        id: 'design',
        name: 'Design & UX',
        description: 'User-centered design solutions for exceptional experiences.',
        icon: Palette,
        services: [
            {
                id: 'product-design',
                title: 'Product Design',
                description: 'User-centered design solutions that create intuitive and engaging digital experiences',
                href: '/services/product-design',
                icon: Palette,
                category: 'Design',
                featured: true
            },
            {
                id: 'ui-ux-design',
                title: 'UI/UX Design',
                description: 'Beautiful and functional user interfaces with exceptional user experience design',
                href: '/services/ui-ux-design',
                icon: Palette,
                category: 'Design'
            },
            {
                id: 'mobile-design',
                title: 'Mobile Design',
                description: 'Native mobile app design optimized for iOS and Android platforms',
                href: '/services/mobile-design',
                icon: Smartphone,
                category: 'Design'
            },
            {
                id: 'design-systems',
                title: 'Design Systems',
                description: 'Comprehensive design systems and component libraries for consistent brand experience',
                href: '/services/design-systems',
                icon: Settings,
                category: 'Design'
            },
            {
                id: 'user-research',
                title: 'User Research',
                description: 'In-depth user research and usability testing to inform design decisions',
                href: '/services/user-research',
                icon: Brain,
                category: 'Design'
            },
            {
                id: 'prototyping',
                title: 'Prototyping',
                description: 'Interactive prototypes and wireframes to validate concepts before development',
                href: '/services/prototyping',
                icon: TestTube,
                category: 'Design'
            }
        ]
    }
];

const ServicesMegaMenu: React.FC<ServicesMegaMenuProps> = React.memo(({
    isOpen,
    onClose,
    isScrolled
}) => {
    const [activeCategory, setActiveCategory] = useState<string>('development');

    const handleServiceClick = useCallback((serviceId: string) => {
        event({
            action: 'click_mega_menu_service',
            category: 'navigation',
            label: serviceId
        });
        onClose();
    }, [onClose]);

    const handleCategoryHover = useCallback((categoryId: string) => {
        setActiveCategory(categoryId);
        event({
            action: 'hover_mega_menu_category',
            category: 'navigation',
            label: categoryId
        });
    }, []);

    const handleGetStartedClick = useCallback(() => {
        event({
            action: 'click_mega_menu_get_started',
            category: 'conversion',
            label: 'services_get_started'
        });
        onClose();
    }, [onClose]);

    const activeServices = servicesData.find(cat => cat.id === activeCategory)?.services || [];

    if (!isOpen) return null;

    return (
        <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 shadow-2xl rounded-lg"
            style={{ width: '1000px' }}
            role="menu"
            aria-label="Services menu"
            onMouseLeave={onClose}
        >
            <div className="flex">
                {/* Left Sidebar - Categories */}
                <div className="w-80 bg-brand-dark text-white p-6 rounded-l-lg">
                    <div className="space-y-1">
                        {servicesData.map((category) => {
                            const isActive = activeCategory === category.id;
                            return (
                                <div
                                    key={category.id}
                                    onMouseEnter={() => handleCategoryHover(category.id)}
                                    className={cn(
                                        'p-4 rounded-lg cursor-pointer transition-all duration-200',
                                        isActive ? 'bg-white text-gray-900' : 'hover:bg-brand-900'
                                    )}
                                >
                                    <h4 className="font-semibold text-base mb-1">
                                        {category.name}
                                    </h4>
                                    <p className={cn(
                                        'text-sm leading-relaxed',
                                        isActive ? 'text-gray-600' : 'text-gray-300'
                                    )}>
                                        {category.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Content - Services Grid */}
                <div className="flex-1 p-6">
                    <div className="grid grid-cols-2 gap-px bg-gray-200 min-h-[400px]">
                        {activeServices.map((service) => (
                            <Link
                                key={service.id}
                                href={service.href}
                                onClick={() => handleServiceClick(service.id)}
                                className="group flex p-6 bg-white hover:bg-gray-50 transition-all duration-200"
                                role="menuitem"
                            >
                                <div className="flex items-start gap-3 w-full">
                                    <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors duration-200">
                                        <service.icon className="w-5 h-5 text-brand-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-semibold text-base text-gray-900 group-hover:text-brand-700 transition-colors duration-200 mb-2">
                                            {service.title}
                                        </h5>
                                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

ServicesMegaMenu.displayName = 'ServicesMegaMenu';

export default ServicesMegaMenu;