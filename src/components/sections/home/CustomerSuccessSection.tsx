// src/components/sections/home/CustomerSuccessSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import {
    Sparkles,
    Quote
} from 'lucide-react';

interface Testimonial {
    id: string;
    name: string;
    jobTitle: string;
    company: string;
    image: string;
    quote: string;
}

const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Will Bryk',
        jobTitle: 'CEO',
        company: 'Exa',
        image: '/clients/will_bryk.jpeg',
        quote: 'Their proactive communication and genuine investment in our success set them apart from other vendors.'
    },
    {
        id: '2',
        name: 'Donald E.',
        jobTitle: 'Principal Product Manager',
        company: 'Dotloop',
        image: '/clients/dotloop.jpeg',
        quote: 'SolveJet developed a custom CRM system for a real estate technology company. The team designed the system to manage customer relationships, track leads, and streamline communication.'
    },
    {
        id: '3',
        name: 'Andrea Colombo',
        jobTitle: 'CEO',
        company: 'Cortilla',
        image: '/clients/cortilla.jpeg',
        quote: 'SolveJet built a custom mobile app for an online food retailer. The team handled the development and design process and integrated key features, such as live inventory and delivery tracking and payment tools.'
    },
    {
        id: '4',
        name: 'Hazza Zafar',
        jobTitle: 'COO',
        company: 'Livbnb',
        image: '/clients/livbnb.jpeg',
        quote: 'SolveJet developed a custom booking and reservation system for a property management company. The team implemented property search features and integrated payment gateways into the platform.'
    },
    {
        id: '5',
        name: 'Robin Knapp',
        jobTitle: 'Co-Owner',
        company: 'Custom Closets & Cabinets',
        image: '/clients/custom_closets.jpg',
        quote: 'Our overall experience working with SolveJet was highly positive and impactful. From the initial consultation, their team took the time to understand the specifics of our construction business and the challenges our customers face when visualizing custom closet solutions.'
    },
    {
        id: '6',
        name: 'Dion Brant',
        jobTitle: 'Founder & CEO',
        company: 'Frontier Touring',
        image: '/clients/frontier_touring.jpg',
        quote: 'Our overall experience with SolveJet was outstanding from start to finish. They quickly understood the vision we had for a modern, user-friendly web platform that could handle the fast pace of tour updates and ticket sales.'
    },
    {
        id: '7',
        name: 'Greg Williams',
        jobTitle: 'President',
        company: 'Audigent',
        image: '/clients/audigent.jpg',
        quote: 'My overall experience working with Solvejet was highly positive. From the outset, they demonstrated a clear understanding of our goals at Audigent, ensuring that the mobile app they developed aligned perfectly with our advertising strategies.'
    },
    {
        id: '8',
        name: 'Robert Kim',
        jobTitle: 'VP of Technology',
        company: 'GreenEnergy Systems',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=80&h=80&fit=crop&crop=face',
        quote: 'Their IoT solution for our smart grid infrastructure exceeded expectations. The energy optimization results were remarkable and helped us reduce costs significantly.'
    },
    {
        id: '9',
        name: 'David Mejia Gomez',
        jobTitle: 'President',
        company: 'Starkflow',
        image: '/clients/starkflow.jpeg',
        quote: 'SolveJet developed and designed an online marketplace for a staffing solutions company. The platform connects the client&apos;s IT partners and vendors with clients through an e-commerce model.'
    }
];

const CustomerSuccessSection: React.FC = () => {
    // Create extended testimonials for infinite scroll effect
    const extendedTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-16 sm:py-20 lg:py-24 overflow-hidden" aria-labelledby="customer-success-heading">

            {/* Header */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-brand-500" aria-hidden="true" />
                        <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
                            Client Success Stories
                        </span>
                    </div>
                    <h2 id="customer-success-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Trusted by
                        <span className="text-brand-500"> Industry Leaders</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        See how we&apos;ve helped companies scale their operations and achieve their digital transformation goals.
                    </p>
                </div>
            </div>

            {/* Testimonials Marquee - Full Width */}
            <div className="w-full relative mb-16">
                {/* Gradient Overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

                {/* Marquee Container */}
                <div className="flex animate-marquee hover:pause-animation">
                    {extendedTestimonials.map((testimonial, index) => (
                        <div
                            key={`${testimonial.id}-${index}`}
                            className="flex-shrink-0 w-72 sm:w-80 md:w-96 lg:w-[400px] mx-2 sm:mx-3 bg-gray-50 rounded-2xl border-2 border-gray-200 p-6 sm:p-8 lg:p-10 hover:border-brand-300 hover:shadow-lg transition-all duration-300 group min-h-[420px] sm:min-h-[460px] md:min-h-[520px] flex flex-col"
                        >
                            {/* Quote Section */}
                            <div className="mb-6 sm:mb-8 flex-1">
                                {/* Quote Icon */}
                                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-brand-400/30 mb-4 sm:mb-6" />

                                {/* Quote Text */}
                                <blockquote className="text-gray-700 leading-relaxed text-sm sm:text-base line-clamp-4 sm:line-clamp-4">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </blockquote>
                            </div>

                            {/* Person Info */}
                            <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100 mt-auto">
                                {/* Profile Image */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden border-2 border-brand-200">
                                        <Image
                                            src={testimonial.image}
                                            alt={`${testimonial.name}, ${testimonial.jobTitle} at ${testimonial.company}`}
                                            width={56}
                                            height={56}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Verified Badge */}
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                        <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Text Info */}
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight mb-1">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                                        {testimonial.jobTitle}
                                    </p>
                                    <p className="text-xs sm:text-sm text-brand-600 font-medium">
                                        {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerSuccessSection;
