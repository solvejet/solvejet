// src/app/contact/page.tsx
import React from 'react';
import { generateMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import ContactPageClient from '@/components/sections/contact/ContactPageClient';

export const metadata: Metadata = generateMetadata({
    title: 'Contact Us - Get in Touch with SolveJet Software Development Team',
    description: 'Contact SolveJet for your software development needs. Get expert consultation for web development, mobile apps, cloud solutions, and enterprise software. Located in Sheridan, WY.',
    url: '/contact',
});

export default function ContactPage() {
    return <ContactPageClient />;
}