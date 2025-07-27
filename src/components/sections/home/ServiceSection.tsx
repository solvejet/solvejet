// src/components/sections/home/ServiceSection.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
    ChevronDown,
    ChevronRight,
    ChevronLeft,
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
    Mail,
    Sparkles,
    Target,
    Clock,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { event } from '@/lib/analytics';

// Type definitions
interface Service {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    tags: string[];
    duration: string;
    features: string[];
    businessType: string[];
    projectSize: string[];
    timeline: string[];
    budget: string[];
}

interface ContactCard {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    tags: string[];
    duration: string;
    features: string[];
    isContact: true;
}

interface Question {
    id: string;
    question: string;
    options: Array<{
        id: string;
        label: string;
        value: string;
    }>;
}

type ServiceCriteriaKey = 'businessType' | 'projectSize' | 'timeline' | 'budget';

// Constants
const SCROLL_AMOUNT = 300;
const MATCH_THRESHOLD = 0.5;

const services: Service[] = [
    {
        id: 'mvp-development',
        title: 'MVP Development',
        description: 'Rapid prototyping and minimum viable product development to validate your business ideas quickly with core features.',
        icon: Rocket,
        tags: ['Startup', 'Rapid', 'Validation'],
        duration: '4-8 weeks',
        features: ['Core Feature Development', 'User Feedback Integration', 'Quick Market Entry'],
        businessType: ['startup', 'entrepreneur'],
        projectSize: ['small', 'medium'],
        timeline: ['urgent', 'fast'],
        budget: ['budget-conscious', 'flexible']
    },
    {
        id: 'app-development',
        title: 'App Development',
        description: 'Full-scale mobile and web application development with modern technologies and industry best practices.',
        icon: Smartphone,
        tags: ['Mobile', 'Web', 'Cross-platform'],
        duration: '3-6 months',
        features: ['Native & Cross-platform', 'UI/UX Design', 'App Store Deployment'],
        businessType: ['startup', 'enterprise', 'smb'],
        projectSize: ['medium', 'large'],
        timeline: ['standard', 'fast'],
        budget: ['flexible', 'premium']
    },
    {
        id: 'product-design',
        title: 'Product Design',
        description: 'User-centered design solutions that create intuitive and engaging digital experiences for your users.',
        icon: Palette,
        tags: ['UI/UX', 'Design System', 'Prototyping'],
        duration: '2-4 weeks',
        features: ['User Research', 'Interactive Prototypes', 'Design Systems'],
        businessType: ['startup', 'enterprise', 'smb'],
        projectSize: ['small', 'medium', 'large'],
        timeline: ['fast', 'standard'],
        budget: ['budget-conscious', 'flexible']
    },
    {
        id: 'ai-development',
        title: 'AI Development',
        description: 'Cutting-edge artificial intelligence solutions to automate processes and enhance business decision-making.',
        icon: Brain,
        tags: ['Machine Learning', 'Automation', 'Intelligence'],
        duration: '2-8 months',
        features: ['Custom AI Models', 'ML Pipeline', 'Predictive Analytics'],
        businessType: ['enterprise', 'smb'],
        projectSize: ['medium', 'large'],
        timeline: ['standard', 'extended'],
        budget: ['flexible', 'premium']
    },
    {
        id: 'data-science',
        title: 'Data Science',
        description: 'Transform your data into actionable insights with advanced analytics and comprehensive visualization.',
        icon: BarChart3,
        tags: ['Analytics', 'Insights', 'Visualization'],
        duration: '1-4 months',
        features: ['Data Analysis', 'Predictive Modeling', 'Business Intelligence'],
        businessType: ['enterprise', 'smb'],
        projectSize: ['medium', 'large'],
        timeline: ['standard', 'extended'],
        budget: ['flexible', 'premium']
    },
    {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        description: 'Comprehensive security solutions to protect your digital assets and ensure regulatory compliance.',
        icon: Shield,
        tags: ['Security', 'Compliance', 'Protection'],
        duration: '2-6 months',
        features: ['Security Audit', 'Threat Assessment', 'Compliance Framework'],
        businessType: ['enterprise', 'smb'],
        projectSize: ['medium', 'large'],
        timeline: ['standard', 'extended'],
        budget: ['flexible', 'premium']
    },
    {
        id: 'enterprise-application',
        title: 'Enterprise Application',
        description: 'Scalable enterprise-grade applications designed for complex business workflows and integrations.',
        icon: Building2,
        tags: ['Enterprise', 'Scalable', 'Integration'],
        duration: '6-12 months',
        features: ['Enterprise Architecture', 'Scalable Infrastructure', 'Legacy Modernization'],
        businessType: ['enterprise'],
        projectSize: ['large'],
        timeline: ['extended'],
        budget: ['premium']
    },
    {
        id: 'poc-development',
        title: 'POC Development',
        description: 'Proof of concept development to test feasibility and demonstrate core functionality effectively.',
        icon: TestTube,
        tags: ['Prototype', 'Validation', 'Testing'],
        duration: '2-6 weeks',
        features: ['Rapid Prototyping', 'Feasibility Testing', 'Risk Assessment'],
        businessType: ['startup', 'enterprise', 'smb'],
        projectSize: ['small', 'medium'],
        timeline: ['urgent', 'fast'],
        budget: ['budget-conscious', 'flexible']
    },
    {
        id: 'cloud-infrastructure',
        title: 'Cloud Infrastructure',
        description: 'Modern cloud solutions for scalable, reliable, and cost-effective infrastructure management.',
        icon: Cloud,
        tags: ['Cloud', 'Infrastructure', 'Scalability'],
        duration: '1-4 months',
        features: ['Cloud Migration', 'Auto-scaling', 'Cost Optimization'],
        businessType: ['enterprise', 'smb'],
        projectSize: ['medium', 'large'],
        timeline: ['standard', 'extended'],
        budget: ['flexible', 'premium']
    },
    {
        id: 'it-consulting',
        title: 'IT Consulting',
        description: 'Strategic technology consulting to align IT initiatives with your core business objectives.',
        icon: MessageSquare,
        tags: ['Strategy', 'Consulting', 'Planning'],
        duration: '1-3 months',
        features: ['Technology Strategy', 'Digital Roadmap', 'Architecture Review'],
        businessType: ['enterprise', 'smb'],
        projectSize: ['small', 'medium', 'large'],
        timeline: ['standard', 'extended'],
        budget: ['flexible', 'premium']
    },
    {
        id: 'staff-augmentation',
        title: 'IT Staff Augmentation',
        description: 'Skilled developers and IT professionals to extend your team capabilities and accelerate delivery.',
        icon: Users,
        tags: ['Team Extension', 'Skilled Resources', 'Flexible'],
        duration: '1-12 months',
        features: ['Skilled Developers', 'Flexible Engagement', 'Quick Onboarding'],
        businessType: ['startup', 'enterprise', 'smb'],
        projectSize: ['small', 'medium', 'large'],
        timeline: ['urgent', 'fast', 'standard', 'extended'],
        budget: ['budget-conscious', 'flexible', 'premium']
    },
    {
        id: 'devops',
        title: 'DevOps',
        description: 'Streamline development and deployment with automated CI/CD pipelines and robust infrastructure.',
        icon: Settings,
        tags: ['Automation', 'CI/CD', 'Infrastructure'],
        duration: '2-5 months',
        features: ['CI/CD Pipeline', 'Infrastructure as Code', 'Deployment Automation'],
        businessType: ['startup', 'enterprise', 'smb'],
        projectSize: ['medium', 'large'],
        timeline: ['standard', 'extended'],
        budget: ['flexible', 'premium']
    }
];

const contactCard: ContactCard = {
    id: 'contact-us',
    title: 'Contact Us',
    description: 'Ready to start your project? Let\'s discuss your requirements and find the perfect solution for your needs.',
    icon: Mail,
    tags: ['Consultation', 'Planning', 'Support'],
    duration: 'Free consultation',
    features: ['Free Consultation', 'Custom Quote', 'Project Planning', 'Expert Guidance'],
    isContact: true
};

const questions: Question[] = [
    {
        id: 'business-type',
        question: 'What type of business are you?',
        options: [
            { id: 'startup', label: 'Startup', value: 'startup' },
            { id: 'smb', label: 'Small/Medium Business', value: 'smb' },
            { id: 'enterprise', label: 'Enterprise', value: 'enterprise' },
            { id: 'entrepreneur', label: 'Individual Entrepreneur', value: 'entrepreneur' }
        ]
    },
    {
        id: 'project-size',
        question: 'What\'s the scope of your project?',
        options: [
            { id: 'small', label: 'Small Project', value: 'small' },
            { id: 'medium', label: 'Medium Project', value: 'medium' },
            { id: 'large', label: 'Large/Complex Project', value: 'large' }
        ]
    },
    {
        id: 'timeline',
        question: 'What\'s your preferred timeline?',
        options: [
            { id: 'urgent', label: 'ASAP (Rush)', value: 'urgent' },
            { id: 'fast', label: '1-2 Months', value: 'fast' },
            { id: 'standard', label: '3-6 Months', value: 'standard' },
            { id: 'extended', label: '6+ Months', value: 'extended' }
        ]
    },
    {
        id: 'budget',
        question: 'What\'s your budget range?',
        options: [
            { id: 'budget-conscious', label: 'Budget-conscious', value: 'budget-conscious' },
            { id: 'flexible', label: 'Flexible Budget', value: 'flexible' },
            { id: 'premium', label: 'Premium Investment', value: 'premium' }
        ]
    }
];

const ServicesSection: React.FC = () => {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [expandedQuestion, setExpandedQuestion] = useState<string>('business-type');
    const [filteredServices, setFilteredServices] = useState<Service[]>(services);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Helper function to calculate service score
    const calculateServiceScore = useCallback((service: Service, userAnswers: Record<string, string>): number => {
        let score = 0;
        let totalCriteria = 0;

        Object.entries(userAnswers).forEach(([questionId, answer]) => {
            totalCriteria++;
            const criteriaKey = questionId.replace('-', '') as ServiceCriteriaKey;
            const serviceCriteria = service[criteriaKey];

            if (serviceCriteria && serviceCriteria.includes(answer)) {
                score++;
            }
        });

        return totalCriteria > 0 ? score / totalCriteria : 0;
    }, []);

    // Check scroll position and update button states
    const updateScrollButtons = useCallback(() => {
        if (scrollContainerRef.current) {
            const { scrollLeft: currentScrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(currentScrollLeft > 10);
            setCanScrollRight(currentScrollLeft < scrollWidth - clientWidth - 10);
        }
    }, []);

    // Update scroll buttons on mount and when services change
    useEffect(() => {
        const timer = setTimeout(updateScrollButtons, 100);
        const handleResize = () => updateScrollButtons();
        window.addEventListener('resize', handleResize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [updateScrollButtons, filteredServices]);

    // Filter and sort services based on answers
    useEffect(() => {
        if (Object.keys(answers).length === 0) {
            setFilteredServices(services);
            return;
        }

        const servicesWithScores = services.map(service => ({
            service,
            score: calculateServiceScore(service, answers)
        }));

        const filtered = servicesWithScores
            .filter(({ score }) => score >= MATCH_THRESHOLD)
            .sort((a, b) => b.score - a.score)
            .map(({ service }) => service);

        setFilteredServices(filtered.length > 0 ? filtered : services);
    }, [answers, calculateServiceScore]);

    const handleAnswerSelect = useCallback((questionId: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));

        event({
            action: 'service_filter_answer',
            category: 'engagement',
            label: `${questionId}_${answer}`
        });

        const currentIndex = questions.findIndex(q => q.id === questionId);
        const nextQuestion = questions[currentIndex + 1];
        if (nextQuestion) {
            setExpandedQuestion(nextQuestion.id);
        }
    }, []);

    const handleQuestionToggle = useCallback((questionId: string) => {
        setExpandedQuestion(expandedQuestion === questionId ? '' : questionId);
    }, [expandedQuestion]);

    const handleResetFilters = useCallback(() => {
        setAnswers({});
        setExpandedQuestion('business-type');

        event({
            action: 'service_filter_reset',
            category: 'engagement',
            label: 'questionnaire_reset'
        });
    }, []);

    // Scroll handlers
    const scrollBy = useCallback((direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(updateScrollButtons, 300);
        }
    }, [updateScrollButtons]);

    // Enhanced touch handlers for mobile - Only for scroll containers
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        // Only handle touch events on the scroll container itself, not child elements
        if (!scrollContainerRef.current || e.currentTarget !== scrollContainerRef.current) return;

        const touch = e.touches[0];
        setIsDragging(true);
        setStartX(touch.clientX);
        setScrollLeft(scrollContainerRef.current.scrollLeft);

        // Only prevent default for scroll containers, not questionnaire elements
        if (isMobile && e.currentTarget === scrollContainerRef.current) {
            e.preventDefault();
        }
    }, [isMobile]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging || !scrollContainerRef.current || e.currentTarget !== scrollContainerRef.current) return;

        const touch = e.touches[0];
        const x = touch.clientX;
        const walk = (startX - x) * 1.5; // Increase sensitivity for mobile
        scrollContainerRef.current.scrollLeft = scrollLeft + walk;

        // Only prevent default for scroll containers
        if (isMobile && e.currentTarget === scrollContainerRef.current) {
            e.preventDefault();
        }
    }, [isDragging, startX, scrollLeft, isMobile]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
        setTimeout(updateScrollButtons, 100);
    }, [updateScrollButtons]);

    // Mouse handlers for desktop
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (isMobile || !scrollContainerRef.current) return;

        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        e.preventDefault();
    }, [isMobile]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isMobile || !isDragging || !scrollContainerRef.current) return;

        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }, [isMobile, isDragging, startX, scrollLeft]);

    const handleMouseEnd = useCallback(() => {
        if (!isMobile) {
            setIsDragging(false);
            setTimeout(updateScrollButtons, 100);
        }
    }, [isMobile, updateScrollButtons]);

    // Service card click handler
    const handleServiceClick = useCallback((serviceId: string, isContact: boolean = false) => {
        event({
            action: isContact ? 'contact_card_click' : 'service_card_click',
            category: 'engagement',
            label: serviceId
        });
    }, []);

    // Mobile-optimized Service Card Component
    const ServiceCard: React.FC<{
        service: Service | ContactCard;
        isContact?: boolean;
    }> = React.memo(({ service, isContact = false }) => (
        <div
            className={cn(
                "flex-shrink-0 bg-white rounded-xl border-2 border-gray-200 transition-all duration-300 group hover:bg-brand-dark",
                // Responsive width and height with proper spacing
                "w-[280px] sm:w-[320px] lg:w-[400px]",
                "h-[440px] sm:h-[480px] lg:h-[520px]",
                // Add proper padding for better spacing
                "p-6 sm:p-7 lg:p-8"
            )}
            onClick={() => handleServiceClick(service.id, isContact)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleServiceClick(service.id, isContact);
                }
            }}
            aria-label={`${service.title} service card`}
        >
            <div className="flex flex-col h-full justify-between">
                {/* Header */}
                <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-7 flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-brand-50 rounded-xl flex items-center justify-center group-hover:bg-brand-100 transition-all duration-300">
                        <service.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-brand-500 group-hover:text-brand-600 transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-h-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white mb-2 sm:mb-3 transition-colors duration-300 line-clamp-2">
                            {service.title}
                        </h3>
                        <p className="text-gray-600 group-hover:text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3 transition-colors duration-300">
                            {service.description}
                        </p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-7 flex-shrink-0">
                    {service.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={`${service.id}-tag-${index}`}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Features */}
                <div className="flex-1 mb-6 sm:mb-7 min-h-0">
                    <div className="space-y-2 sm:space-y-3">
                        {service.features.slice(0, 4).map((feature, index) => (
                            <div key={`${service.id}-feature-${index}`} className="flex items-center gap-2 sm:gap-3">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-500 rounded-full group-hover:bg-brand-300 transition-colors duration-300 flex-shrink-0" />
                                <span className="text-gray-700 group-hover:text-gray-300 text-xs sm:text-sm transition-colors duration-300 line-clamp-1">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 mb-6 sm:mb-7 flex-shrink-0">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-brand-300 transition-colors duration-300" />
                    <span className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 transition-colors duration-300">
                        {service.duration}
                    </span>
                </div>

                {/* CTA Button Container */}
                <div className="flex-shrink-0">
                    {isContact ? (
                        // Contact card - keep the original gradient button with Link
                        <Link href="/contact" className="block w-full">
                            <button
                                className="w-full py-3 sm:py-4 px-3 sm:px-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border-2 text-sm cursor-pointer bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-600 hover:to-brand-700 transform group-hover:scale-105 border-transparent"
                                aria-label={`Get started with ${service.title}`}
                            >
                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                    Get Started
                                </span>
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </Link>
                    ) : (
                        // Service cards - Link wrapper with horizontal pill container
                        <Link href={`/services/${service.id}`} className="block w-full">
                            <div
                                className="relative w-full h-20 sm:h-22 lg:h-24 bg-white group-hover:bg-brand-dark border-2 border-gray-200 group-hover:border-white rounded-full transition-all duration-300 cursor-pointer p-2 sm:p-2.5 lg:p-3"
                                role="button"
                                tabIndex={0}
                                aria-label={`Learn more about ${service.title}`}
                            >
                                {/* Background Image Layer */}
                                <div
                                    className="absolute inset-0 rounded-full transition-all duration-700 z-0"
                                    style={{
                                        backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop&crop=center")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        opacity: 0
                                    }}
                                ></div>

                                {/* Hover Background Image Overlay */}
                                <div
                                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 z-0"
                                    style={{
                                        backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop&crop=center")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                ></div>

                                {/* Dark Overlay for Better Contrast */}
                                <div className="absolute inset-0 rounded-full bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-5"></div>

                                {/* Horizontal Center Line - Hidden on Hover */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 w-32 sm:w-40 lg:w-48 bg-gray-200 rounded-full z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

                                {/* View Service Text - Shown on Hover */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                    <span className="text-white font-medium text-sm sm:text-base whitespace-nowrap">View Service</span>
                                </div>

                                {/* Smaller Sliding Arrow Button */}
                                <div className="absolute top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white group-hover:bg-brand-dark border-2 border-gray-200 group-hover:border-white rounded-full flex items-center justify-center transition-all duration-700 ease-in-out left-2 sm:left-2.5 lg:left-3 group-hover:left-[calc(100%-2rem-0.5rem)] sm:group-hover:left-[calc(100%-2.25rem-0.625rem)] lg:group-hover:left-[calc(100%-2.5rem-0.75rem)] z-20">
                                    <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-brand-dark group-hover:text-white transition-colors duration-300" />
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    ));

    ServiceCard.displayName = 'ServiceCard';

    return (
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white relative" aria-labelledby="services-heading">

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500" aria-hidden="true" />
                        <span className="text-brand-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                            Our Services
                        </span>
                    </div>
                    <h2 id="services-heading" className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                        Find Your Perfect
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600"> Solution</span>
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                        Answer a few questions to discover the ideal service for your project, or explore our full range of technology solutions.
                    </p>
                </div>
            </div>

            {/* Main Content - Responsive Layout */}
            <div className="max-w-8xl mx-auto">
                {/* Mobile: Stacked Layout */}
                <div className="block lg:hidden">
                    {/* Mobile Questionnaire */}
                    <div className="px-4 sm:px-6 mb-8">
                        <div className="bg-white rounded-xl border-2 border-border-dark p-4 sm:p-6 transition-all duration-300 hover:border-brand-400">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center border-2 border-brand-600">
                                    <Target className="w-5 h-5 text-white" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Find Your Service</h3>
                                    <p className="text-sm text-gray-600">Get personalized recommendations</p>
                                </div>
                            </div>

                            <div className="space-y-3" role="group" aria-label="Service recommendation questionnaire">
                                {questions.map((question, index) => {
                                    const isExpanded = expandedQuestion === question.id;
                                    const isAnswered = Boolean(answers[question.id]);
                                    const isAccessible = index === 0 || questions.slice(0, index).every(q => answers[q.id]);

                                    return (
                                        <div
                                            key={question.id}
                                            className={cn(
                                                'border-2 rounded-xl transition-all duration-300',
                                                isExpanded ? 'bg-brand-50/30 border-brand-400' : 'border-border-dark',
                                                !isAccessible && 'opacity-50'
                                            )}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => isAccessible && handleQuestionToggle(question.id)}
                                                disabled={!isAccessible}
                                                className="w-full flex items-center justify-between p-3 sm:p-4 text-left"
                                                aria-expanded={isExpanded}
                                                aria-controls={`question-${question.id}-options`}
                                                aria-label={`Question ${index + 1}: ${question.question}`}
                                            >
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    <div className={cn(
                                                        'w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 border-2 flex-shrink-0',
                                                        isAnswered
                                                            ? 'bg-brand-500 text-white border-brand-600'
                                                            : isExpanded
                                                                ? 'bg-brand-100 text-brand-700 border-brand-300'
                                                                : 'bg-gray-100 text-gray-600 border-border-dark'
                                                    )}>
                                                        {index + 1}
                                                    </div>
                                                    <span className={cn(
                                                        'font-medium text-sm sm:text-base truncate',
                                                        isAnswered ? 'text-brand-700' : 'text-gray-900'
                                                    )}>
                                                        {question.question}
                                                    </span>
                                                </div>
                                                {isAccessible && (
                                                    <ChevronDown
                                                        className={cn(
                                                            'w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-300 flex-shrink-0',
                                                            isExpanded && 'rotate-180'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </button>

                                            {isExpanded && (
                                                <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                                                    <div
                                                        className="flex flex-wrap gap-2"
                                                        id={`question-${question.id}-options`}
                                                        role="radiogroup"
                                                        aria-labelledby={`question-${question.id}-label`}
                                                    >
                                                        {question.options.map((option) => {
                                                            const isSelected = answers[question.id] === option.value;
                                                            return (
                                                                <button
                                                                    key={option.id}
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleAnswerSelect(question.id, option.value);
                                                                    }}
                                                                    onTouchEnd={(e) => {
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        handleAnswerSelect(question.id, option.value);
                                                                    }}
                                                                    className={cn(
                                                                        'px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2',
                                                                        'hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer',
                                                                        'touch-manipulation select-none',
                                                                        isSelected
                                                                            ? 'bg-brand-500 text-white border-brand-600 shadow-md'
                                                                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-600'
                                                                    )}
                                                                    style={{ pointerEvents: 'auto' }}
                                                                    role="radio"
                                                                    aria-checked={isSelected}
                                                                    aria-label={option.label}
                                                                >
                                                                    {option.label}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {Object.keys(answers).length > 0 && (
                                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-brand-50 rounded-xl border-2 border-brand-300">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap className="w-4 h-4 text-brand-600" aria-hidden="true" />
                                        <span className="text-sm font-semibold text-brand-700">
                                            {filteredServices.length} matching service{filteredServices.length !== 1 ? 's' : ''} found
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleResetFilters}
                                        className="text-sm text-brand-600 hover:text-brand-700 underline"
                                        aria-label="Reset all filter selections"
                                    >
                                        Reset filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Service Cards */}
                    <div className="px-4 sm:px-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                                    {Object.keys(answers).length > 0 ? 'Recommended Services' : 'All Services'}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Swipe to explore • {filteredServices.length + 1} services
                                </p>
                            </div>
                        </div>

                        {/* Mobile Slider Container - NO SCROLLBAR */}
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 overflow-x-auto py-2 -mx-4 px-4 scrollbar-none-mobile"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onScroll={updateScrollButtons}
                            role="region"
                            aria-label="Services carousel"
                        >
                            {filteredServices.map((service) => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                            <ServiceCard service={contactCard} isContact={true} />
                        </div>
                    </div>
                </div>

                {/* Desktop: Side-by-side Layout */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Interactive Questionnaire */}
                    <div className="lg:col-span-5 w-full px-6 sm:px-8 lg:px-16">
                        <div className="bg-white rounded-xl border-2 border-border-dark p-8 transition-all duration-300 hover:border-brand-400 h-fit">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center border-2 border-brand-600">
                                    <Target className="w-6 h-6 text-white" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Find Your Service</h3>
                                    <p className="text-gray-600">Answer questions to get personalized recommendations</p>
                                </div>
                            </div>

                            <div className="space-y-4" role="group" aria-label="Service recommendation questionnaire">
                                {questions.map((question, index) => {
                                    const isExpanded = expandedQuestion === question.id;
                                    const isAnswered = Boolean(answers[question.id]);
                                    const isAccessible = index === 0 || questions.slice(0, index).every(q => answers[q.id]);

                                    return (
                                        <div
                                            key={question.id}
                                            className={cn(
                                                'border-2 rounded-xl transition-all duration-300',
                                                isExpanded ? 'bg-brand-50/30 border-brand-400' : 'border-border-dark',
                                                !isAccessible && 'opacity-50'
                                            )}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => isAccessible && handleQuestionToggle(question.id)}
                                                disabled={!isAccessible}
                                                className="w-full flex items-center justify-between p-4 text-left"
                                                aria-expanded={isExpanded}
                                                aria-controls={`question-${question.id}-options`}
                                                aria-label={`Question ${index + 1}: ${question.question}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 border-2',
                                                        isAnswered
                                                            ? 'bg-brand-500 text-white border-brand-600'
                                                            : isExpanded
                                                                ? 'bg-brand-100 text-brand-700 border-brand-300'
                                                                : 'bg-gray-100 text-gray-600 border-border-dark'
                                                    )}>
                                                        {index + 1}
                                                    </div>
                                                    <span className={cn(
                                                        'font-medium',
                                                        isAnswered ? 'text-brand-700' : 'text-gray-900'
                                                    )}>
                                                        {question.question}
                                                    </span>
                                                </div>
                                                {isAccessible && (
                                                    <ChevronDown
                                                        className={cn(
                                                            'w-5 h-5 text-gray-400 transition-transform duration-300',
                                                            isExpanded && 'rotate-180'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </button>

                                            {isExpanded && (
                                                <div className="px-4 pb-4">
                                                    <div
                                                        className="flex flex-wrap gap-2"
                                                        id={`question-${question.id}-options`}
                                                        role="radiogroup"
                                                        aria-labelledby={`question-${question.id}-label`}
                                                    >
                                                        {question.options.map((option) => {
                                                            const isSelected = answers[question.id] === option.value;
                                                            return (
                                                                <button
                                                                    key={option.id}
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleAnswerSelect(question.id, option.value);
                                                                    }}
                                                                    onTouchEnd={(e) => {
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        handleAnswerSelect(question.id, option.value);
                                                                    }}
                                                                    className={cn(
                                                                        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2',
                                                                        'hover:scale-105 active:scale-95 cursor-pointer',
                                                                        'touch-manipulation select-none',
                                                                        isSelected
                                                                            ? 'bg-brand-500 text-white border-brand-600 shadow-md'
                                                                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-600'
                                                                    )}
                                                                    style={{ pointerEvents: 'auto' }}
                                                                    role="radio"
                                                                    aria-checked={isSelected}
                                                                    aria-label={option.label}
                                                                >
                                                                    {option.label}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {Object.keys(answers).length > 0 && (
                                <div className="mt-6 p-4 bg-brand-50 rounded-xl border-2 border-brand-300">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap className="w-4 h-4 text-brand-600" aria-hidden="true" />
                                        <span className="text-sm font-semibold text-brand-700">
                                            {filteredServices.length} matching service{filteredServices.length !== 1 ? 's' : ''} found
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleResetFilters}
                                        className="text-sm text-brand-600 hover:text-brand-700 underline"
                                        aria-label="Reset all filter selections"
                                    >
                                        Reset filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Service Cards Slider */}
                    <div className="lg:col-span-7 w-full">
                        <div className="flex items-center justify-between mb-6 px-6 sm:px-8 lg:pl-0 lg:pr-16">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {Object.keys(answers).length > 0 ? 'Recommended Services' : 'All Services'}
                                </h3>
                                <p className="text-gray-600">
                                    Drag to explore • {filteredServices.length + 1} services available
                                </p>
                            </div>

                            {/* Navigation Arrows */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => scrollBy('left')}
                                    disabled={!canScrollLeft}
                                    className={cn(
                                        "w-12 h-12 bg-white border-2 rounded-full flex items-center justify-center transition-all duration-300 group",
                                        canScrollLeft
                                            ? "border-border-dark hover:bg-brand-50 hover:border-brand-400 cursor-pointer"
                                            : "border-gray-200 cursor-not-allowed opacity-50"
                                    )}
                                    aria-label="Scroll services left"
                                >
                                    <ChevronLeft className={cn(
                                        "w-5 h-5 transition-colors duration-300",
                                        canScrollLeft
                                            ? "text-gray-600 group-hover:text-brand-600"
                                            : "text-gray-300"
                                    )} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollBy('right')}
                                    disabled={!canScrollRight}
                                    className={cn(
                                        "w-12 h-12 bg-white border-2 rounded-full flex items-center justify-center transition-all duration-300 group",
                                        canScrollRight
                                            ? "border-border-dark hover:bg-brand-50 hover:border-brand-400 cursor-pointer"
                                            : "border-gray-200 cursor-not-allowed opacity-50"
                                    )}
                                    aria-label="Scroll services right"
                                >
                                    <ChevronRight className={cn(
                                        "w-5 h-5 transition-colors duration-300",
                                        canScrollRight
                                            ? "text-gray-600 group-hover:text-brand-600"
                                            : "text-gray-300"
                                    )} />
                                </button>
                            </div>
                        </div>

                        {/* Desktop Slider Container - NO SCROLLBAR */}
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 overflow-x-auto py-4 scrollbar-none-desktop"
                            style={{
                                WebkitOverflowScrolling: 'touch',
                                paddingLeft: '0',
                                paddingRight: 'max(1.5rem, calc((100vw - 1280px) / 2))'
                            }}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseEnd}
                            onMouseUp={handleMouseEnd}
                            onMouseMove={handleMouseMove}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onScroll={updateScrollButtons}
                            role="region"
                            aria-label="Services carousel"
                            tabIndex={0}
                        >
                            {filteredServices.map((service) => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                            <ServiceCard service={contactCard} isContact={true} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;