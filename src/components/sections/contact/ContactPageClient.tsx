// src/components/sections/contact/ContactPageClient.tsx
'use client';

import React from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageSquare,
    Globe,
    Award,
    Users,
    CheckCircle,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import { event } from '@/lib/analytics';

const ContactPageClient: React.FC = () => {
    const handleGetDirectionsClick = (): void => {
        event({
            action: 'click_get_directions',
            category: 'engagement',
            label: 'contact_page_directions'
        });
    };

    const handleCallClick = (): void => {
        event({
            action: 'click_phone_number',
            category: 'engagement',
            label: 'contact_page_call'
        });
    };

    const handleEmailClick = (): void => {
        event({
            action: 'click_email_address',
            category: 'engagement',
            label: 'contact_page_email'
        });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-brand-50 to-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-brand-500" aria-hidden="true" />
                            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
                                Get In Touch
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-gray-900 mb-6">
                            Let&apos;s Build Something
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600"> Amazing Together</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Ready to transform your ideas into reality? Our expert team is here to help you navigate your software development journey.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 sm:py-20 lg:py-24">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        {/* Contact Form */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 lg:p-12">
                                <div className="mb-8">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                                        Start Your Project
                                    </h2>
                                    <p className="text-gray-600 text-lg">
                                        Fill out the form below and we&apos;ll get back to you within 24 hours to discuss your project requirements.
                                    </p>
                                </div>
                                <ContactForm />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="lg:col-span-4">
                            <div className="space-y-8">
                                {/* Contact Details */}
                                <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                                    <div className="space-y-6">
                                        {/* Phone */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-6 h-6 text-brand-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                                                <a
                                                    href="tel:+19095081408"
                                                    onClick={handleCallClick}
                                                    className="text-brand-600 hover:text-brand-700 transition-colors duration-200"
                                                >
                                                    +1 (909) 508-1408
                                                </a>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-6 h-6 text-brand-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                                                <a
                                                    href="mailto:hello@solvejet.net"
                                                    onClick={handleEmailClick}
                                                    className="text-brand-600 hover:text-brand-700 transition-colors duration-200"
                                                >
                                                    hello@solvejet.net
                                                </a>
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-brand-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                                                <address className="text-gray-600 not-italic">
                                                    30 N Gould St Ste R<br />
                                                    Sheridan, WY 82801<br />
                                                    United States
                                                </address>
                                                <a
                                                    href="https://maps.google.com/?q=30+N+Gould+St+Ste+R+Sheridan+WY+82801"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={handleGetDirectionsClick}
                                                    className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 transition-colors duration-200 mt-2"
                                                >
                                                    Get Directions
                                                    <ArrowRight className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Business Hours */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-6 h-6 text-brand-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                                                <div className="text-gray-600 space-y-1">
                                                    <div>Mon - Fri: 9:00 AM - 6:00 PM</div>
                                                    <div>Saturday: 10:00 AM - 4:00 PM</div>
                                                    <div>Sunday: Closed</div>
                                                    <div className="text-sm text-gray-500 mt-2">Mountain Time (MT)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Why Choose Us */}
                                <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl border-2 border-brand-200 p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose SolveJet?</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                                            <span className="text-gray-700">Google Cloud Certified Partner</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                                            <span className="text-gray-700">ISO Quality Certification</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                                            <span className="text-gray-700">Top-rated on Clutch & GoodFirms</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                                            <span className="text-gray-700">500+ Successful Projects</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                                            <span className="text-gray-700">24/7 Support Available</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Our Impact</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                <Users className="w-6 h-6 text-brand-500" />
                                            </div>
                                            <div className="text-2xl font-bold text-gray-900">500+</div>
                                            <div className="text-sm text-gray-600">Happy Clients</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                <Award className="w-6 h-6 text-brand-500" />
                                            </div>
                                            <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                                            <div className="text-sm text-gray-600">Client Rating</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                <Globe className="w-6 h-6 text-brand-500" />
                                            </div>
                                            <div className="text-2xl font-bold text-gray-900">50+</div>
                                            <div className="text-sm text-gray-600">Countries</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                <MessageSquare className="w-6 h-6 text-brand-500" />
                                            </div>
                                            <div className="text-2xl font-bold text-gray-900">24h</div>
                                            <div className="text-sm text-gray-600">Response Time</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPageClient;