// src/data/services.ts
import type { Service } from '@/components/Home/ServiceSection';

export const services: Service[] = [
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
