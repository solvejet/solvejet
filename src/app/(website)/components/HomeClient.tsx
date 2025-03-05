// src/app/(website)/components/HomeClient.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';

// Simple dynamic imports without any additional transformations
const HeroSection = dynamic(() => import('@/components/Home/HeroSection'), {
  ssr: true,
  loading: () => (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="w-32 h-8 bg-element-900/50 animate-pulse rounded"></div>
    </div>
  ),
});

const ServiceSection = dynamic(() => import('@/components/Home/ServiceSection'), {
  ssr: true,
  loading: () => (
    <div className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
          <div className="h-8 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div
              key={i}
              className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  ),
});

const IndustriesGrid = dynamic(() => import('@/components/Home/IndustriesGrid'), {
  ssr: true,
  loading: () => (
    <div className="py-24 bg-white rounded-t-3xl">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
          <div className="h-12 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[1, 2].map(i => (
            <div key={i} className="aspect-[16/9] bg-gray-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  ),
});

const industries = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'PropTech solutions for the modern real estate industry',
    shortDescription:
      'Our innovative real estate solutions streamline property management, sales processes, and data analytics for agencies and developers.',
    iconName: 'Building2',
    color: 'bg-blue-500',
    imagePath: '/images/industries/real-estate.webp',
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    description: 'Digital commerce solutions for global reach',
    shortDescription:
      'We build powerful, scalable ecommerce platforms that integrate seamlessly with payment gateways and inventory systems.',
    iconName: 'ShoppingCart',
    color: 'bg-purple-500',
    imagePath: '/images/industries/ecommerce.webp',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Industry 4.0 and smart manufacturing',
    shortDescription:
      'Our Industry 4.0 solutions incorporate IoT, AI, and data analytics to optimize production processes and reduce downtime.',
    iconName: 'Factory',
    color: 'bg-green-500',
    imagePath: '/images/industries/manufacturing.webp',
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Supply chain and logistics optimization',
    shortDescription:
      'We develop comprehensive logistics management systems that provide real-time tracking and route optimization.',
    iconName: 'Truck',
    color: 'bg-amber-500',
    imagePath: '/images/industries/logistics.webp',
  },
  {
    id: 'travel',
    title: 'Travel & Tourism',
    description: 'Digital solutions for travel businesses',
    shortDescription:
      'Our travel industry solutions help agencies, hotels, and tour operators deliver exceptional customer experiences.',
    iconName: 'Plane',
    color: 'bg-teal-500',
    imagePath: '/images/industries/travel.webp',
  },
];

// Services data with tags for each service
const services = [
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    description:
      'We build custom, scalable software solutions tailored to your business needs, from web applications to enterprise systems.',
    iconPath: '/images/services/custom-software-development.svg',
    href: '/services/custom-software-development',
    tags: [
      { text: 'Web Apps', className: 'bg-blue-100 text-blue-700' },
      { text: 'API', className: 'bg-green-100 text-green-700' },
      { text: 'Enterprise', className: 'bg-purple-100 text-purple-700' },
    ],
  },
  {
    id: 'cloud-services',
    title: 'Cloud Services',
    description:
      'Our cloud experts help migrate, optimize, and manage your infrastructure on AWS, Azure, or Google Cloud.',
    iconPath: '/images/services/cloud-services.svg',
    href: '/services/cloud-services',
    tags: [
      { text: 'AWS', className: 'bg-yellow-100 text-yellow-700' },
      { text: 'Azure', className: 'bg-blue-100 text-blue-700' },
      { text: 'GCP', className: 'bg-red-100 text-red-700' },
    ],
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    description:
      'We develop AI solutions that drive business value through machine learning, NLP, and computer vision.',
    iconPath: '/images/services/artificial-intelligence.svg',
    href: '/services/artificial-intelligence',
    tags: [
      { text: 'ML', className: 'bg-purple-100 text-purple-700' },
      { text: 'NLP', className: 'bg-blue-100 text-blue-700' },
      { text: 'Computer Vision', className: 'bg-green-100 text-green-700' },
    ],
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    description:
      'We specialize in developing native and cross-platform mobile applications for iOS and Android.',
    iconPath: '/images/services/mobile-app-development.svg',
    href: '/services/mobile-app-development',
    tags: [
      { text: 'Swift', className: 'bg-orange-100 text-orange-700' },
      { text: 'React Native', className: 'bg-blue-100 text-blue-700' },
      { text: 'Flutter', className: 'bg-cyan-100 text-cyan-700' },
      { text: 'Kotlin', className: 'bg-purple-100 text-purple-700' },
    ],
  },
  {
    id: 'mvp-development',
    title: 'MVP Development',
    description:
      'Quickly validate your product ideas with our rapid MVP development approach focused on core functionality.',
    iconPath: '/images/services/mvp-development.svg',
    href: '/services/mvp-development',
    tags: [
      { text: 'Rapid', className: 'bg-red-100 text-red-700' },
      { text: 'Agile', className: 'bg-blue-100 text-blue-700' },
      { text: 'Scalable', className: 'bg-green-100 text-green-700' },
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description:
      'Transform raw data into actionable insights with our comprehensive data analytics and visualization solutions.',
    iconPath: '/images/services/data-analytics.svg',
    href: '/services/data-analytics',
    tags: [
      { text: 'Big Data', className: 'bg-blue-100 text-blue-700' },
      { text: 'BI', className: 'bg-green-100 text-green-700' },
      { text: 'Visualization', className: 'bg-purple-100 text-purple-700' },
    ],
  },
  {
    id: 'it-staff-augmentation',
    title: 'IT Staff Augmentation',
    description:
      'We provide skilled engineers or dedicated teams tailored to your project, seamlessly aligning with your goals and company culture.',
    iconPath: '/images/services/it-staff-augmentation.svg',
    href: '/services/it-staff-augmentation',
    tags: [
      { text: 'Cultural fit', className: 'bg-purple-100 text-purple-700' },
      { text: 'Top 1%', className: 'bg-yellow-100 text-yellow-700' },
      { text: 'Instant hire', className: 'bg-blue-100 text-blue-700' },
    ],
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    description:
      'Our experts provide strategic IT advisory, helping you align technology with business goals and maximize ROI.',
    iconPath: '/images/services/it-consulting.svg',
    href: '/services/it-consulting',
    tags: [
      { text: 'Strategy', className: 'bg-blue-100 text-blue-700' },
      { text: 'Architecture', className: 'bg-gray-100 text-gray-700' },
      { text: 'Assessment', className: 'bg-green-100 text-green-700' },
    ],
  },
];

export default function HomeClient(): ReactElement {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only show content after client-side mount
    setMounted(true);

    // Reset scroll position when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!mounted) {
    // Return a simple placeholder while mounting
    return <div className="h-screen bg-black"></div>;
  }

  return (
    <>
      <HeroSection />
      <IndustriesGrid industries={industries} />
      <ServiceSection services={services} />
    </>
  );
}
