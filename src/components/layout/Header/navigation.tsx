// src/components/layout/Header/navigation.tsx
import {
  ExternalLink,
  Phone,
  ArrowRight,
  ShoppingCart,
  Users,
  BarChart
} from 'lucide-react';
import type { NavItem } from './types';

// Define the navigation items with mega menu content
export const navigation: NavItem[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Services',
    href: '/services',
    megaMenu: {
      title: 'Our Services',
      description: 'Comprehensive software development and digital transformation solutions',
      columns: [
        {
          title: 'Development',
          items: [
            {
              title: 'Web Development',
              href: '/services/web-development',
              description: 'Custom websites and web applications',
              icon: <ExternalLink className="h-5 w-5" />,
            },
            {
              title: 'Mobile Development',
              href: '/services/mobile-development',
              description: 'iOS and Android native apps',
              icon: <Phone className="h-5 w-5" />,
            },
            {
              title: 'API Development',
              href: '/services/api-development',
              description: 'RESTful and GraphQL APIs',
              icon: <ArrowRight className="h-5 w-5" />,
            },
          ],
        },
        {
          title: 'Solutions',
          items: [
            {
              title: 'E-commerce',
              href: '/services/ecommerce',
              description: 'Online stores and marketplaces',
              icon: <ShoppingCart className="h-5 w-5" />,
            },
            {
              title: 'CRM Systems',
              href: '/services/crm',
              description: 'Customer relationship management',
              icon: <Users className="h-5 w-5" />,
            },
            {
              title: 'Analytics',
              href: '/services/analytics',
              description: 'Data analysis and visualization',
              icon: <BarChart className="h-5 w-5" />,
            },
          ],
        },
      ],
    },
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    megaMenu: {
      title: 'Our Portfolio',
      description: 'Explore our successful projects and client success stories',
      columns: [
        {
          title: 'Case Studies',
          items: [
            {
              title: 'Enterprise Solutions',
              href: '/portfolio/enterprise',
              description: 'Solutions for large organizations',
            },
            {
              title: 'Startups',
              href: '/portfolio/startups',
              description: 'Helping startups grow and scale',
            },
          ],
        },
        {
          title: 'By Industry',
          items: [
            {
              title: 'Healthcare',
              href: '/portfolio/healthcare',
              description: 'Medical and healthcare software',
            },
            {
              title: 'Finance',
              href: '/portfolio/finance',
              description: 'Banking and financial services',
            },
            {
              title: 'E-commerce',
              href: '/portfolio/ecommerce',
              description: 'Online retail solutions',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'Blog',
    href: '/blog',
  },
];
