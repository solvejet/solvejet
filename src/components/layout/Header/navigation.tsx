// src/components/layout/Header/navigation.tsx
import {
  Code,
  Brain,
  HeadsetIcon,
  Users,
  Cloud,
  Smartphone,
  Rocket,
  BarChart3,
  Building2,
  ShoppingCart,
  Factory,
  Truck,
  Plane,
  Home,
  Briefcase,
  Handshake,
  FileText,
  BookText,
} from 'lucide-react';
import type { NavItem } from './types';

// Define the navigation items with mega menu content
export const navigation: NavItem[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'What We Do',
    href: '/services',
    megaMenu: {
      title: 'Our Services',
      description: 'Comprehensive software development and digital transformation solutions',
      columns: [
        {
          title: 'Core Services',
          items: [
            {
              title: 'Custom Software Development',
              href: '/services/custom-software-development',
              description: 'Tailored software solutions for your business needs',
              icon: <Code className="h-5 w-5" />,
            },
            {
              title: 'Artificial Intelligence',
              href: '/services/artificial-intelligence',
              description: 'AI and machine learning solutions',
              icon: <Brain className="h-5 w-5" />,
            },
            {
              title: 'IT Consulting',
              href: '/services/it-consulting',
              description: 'Strategic technology consulting',
              icon: <HeadsetIcon className="h-5 w-5" />,
            },
            {
              title: 'IT Staff Augmentation',
              href: '/services/it-staff-augmentation',
              description: 'Skilled resources for your projects',
              icon: <Users className="h-5 w-5" />,
            },
          ],
        },
        {
          title: 'Technology Solutions',
          items: [
            {
              title: 'Cloud Services',
              href: '/services/cloud-services',
              description: 'AWS, Azure, and Google Cloud solutions',
              icon: <Cloud className="h-5 w-5" />,
            },
            {
              title: 'Mobile App Development',
              href: '/services/mobile-app-development',
              description: 'iOS and Android applications',
              icon: <Smartphone className="h-5 w-5" />,
            },
            {
              title: 'MVP Development',
              href: '/services/mvp-development',
              description: 'Validate your product ideas quickly',
              icon: <Rocket className="h-5 w-5" />,
            },
            {
              title: 'Data Analytics',
              href: '/services/data-analytics',
              description: 'Turn your data into actionable insights',
              icon: <BarChart3 className="h-5 w-5" />,
            },
          ],
        },
      ],
    },
  },
  {
    name: 'Industries',
    href: '/industries',
    megaMenu: {
      title: 'Industries We Serve',
      description: 'Specialized solutions for diverse industry verticals',
      columns: [
        {
          title: 'Key Industries',
          items: [
            {
              title: 'Real Estate',
              href: '/industries/real-estate',
              description: 'PropTech solutions for the modern real estate industry',
              icon: <Building2 className="h-5 w-5" />,
            },
            {
              title: 'Ecommerce',
              href: '/industries/ecommerce',
              description: 'Digital commerce solutions',
              icon: <ShoppingCart className="h-5 w-5" />,
            },
            {
              title: 'Manufacturing',
              href: '/industries/manufacturing',
              description: 'Industry 4.0 and smart manufacturing',
              icon: <Factory className="h-5 w-5" />,
            },
          ],
        },
        {
          title: 'Additional Sectors',
          items: [
            {
              title: 'Logistics',
              href: '/industries/logistics',
              description: 'Supply chain and logistics optimization',
              icon: <Truck className="h-5 w-5" />,
            },
            {
              title: 'Travel & Tourism',
              href: '/industries/travel-tourism',
              description: 'Digital solutions for travel businesses',
              icon: <Plane className="h-5 w-5" />,
            },
          ],
        },
      ],
    },
  },
  {
    name: 'Company',
    href: '/company',
    megaMenu: {
      title: 'About SolveJet',
      description: 'Learn more about our company, culture, and expertise',
      columns: [
        {
          title: 'Who We Are',
          items: [
            {
              title: 'About Us',
              href: '/company/about',
              description: 'Our story, mission, and values',
              icon: <Home className="h-5 w-5" />,
            },
            {
              title: 'Careers',
              href: '/company/careers',
              description: 'Join our growing team',
              icon: <Briefcase className="h-5 w-5" />,
            },
            {
              title: 'Partnerships',
              href: '/company/partnerships',
              description: 'Strategic alliances and collaborations',
              icon: <Handshake className="h-5 w-5" />,
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              title: 'Blogs',
              href: '/company/blogs',
              description: 'Insights and thought leadership',
              icon: <FileText className="h-5 w-5" />,
            },
            {
              title: 'Case Studies',
              href: '/company/case-studies',
              description: 'Our success stories and project highlights',
              icon: <BookText className="h-5 w-5" />,
            },
          ],
        },
      ],
    },
  },
  {
    name: 'Case Study',
    href: '/case-study',
  },
];
