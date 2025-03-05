// src/components/layout/Header/navigation.tsx
import {
  Code,
  Brain,
  Users,
  Cloud,
  Smartphone,
  Rocket,
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
  Lightbulb,
  Database,
  Shield,
  Cpu,
  Share2,
  AirVent,
  Layers,
  Puzzle,
} from 'lucide-react';
import type { NavItem } from './types';

// Define the navigation items with enhanced mega menu content
export const navigation: NavItem[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'What We Do',
    href: '/services',
    megaMenu: {
      title: 'Our Solutions & Services',
      description:
        'Discover how we can transform your business with cutting-edge technology solutions tailored to your specific needs.',
      columns: [
        {
          title: 'Core Solutions',
          items: [
            {
              title: 'Custom Software Development',
              href: '/services/custom-software-development',
              description:
                'Bespoke software solutions designed to address your unique business challenges.',
              icon: <Code className="h-5 w-5" />,
            },
            {
              title: 'Artificial Intelligence',
              href: '/services/artificial-intelligence',
              description:
                'Harness the power of AI and ML to automate processes and gain valuable insights.',
              icon: <Brain className="h-5 w-5" />,
            },
            {
              title: 'Enterprise Systems',
              href: '/services/enterprise-systems',
              description: 'Scalable, secure, and integrated solutions for large-scale operations.',
              icon: <Database className="h-5 w-5" />,
            },
            {
              title: 'Digital Transformation',
              href: '/services/digital-transformation',
              description: 'Strategic initiatives to evolve your business in the digital era.',
              icon: <Share2 className="h-5 w-5" />,
            },
          ],
        },
        {
          title: 'Technical Expertise',
          items: [
            {
              title: 'Cloud Services',
              href: '/services/cloud-services',
              description: 'AWS, Azure, and Google Cloud solutions for optimized infrastructure.',
              icon: <Cloud className="h-5 w-5" />,
            },
            {
              title: 'Mobile Development',
              href: '/services/mobile-app-development',
              description: 'Native and cross-platform solutions for iOS and Android.',
              icon: <Smartphone className="h-5 w-5" />,
            },
            {
              title: 'IoT Solutions',
              href: '/services/iot-solutions',
              description: 'Connect your devices and systems for intelligent data exchange.',
              icon: <Cpu className="h-5 w-5" />,
            },
            {
              title: 'Cybersecurity',
              href: '/services/cybersecurity',
              description:
                'Protect your data and systems with our comprehensive security approach.',
              icon: <Shield className="h-5 w-5" />,
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
      title: 'Industry Expertise',
      description:
        'Our deep understanding of various sectors enables us to deliver tailored solutions that address industry-specific challenges.',
      columns: [
        {
          title: 'Business Sectors',
          items: [
            {
              title: 'Real Estate & PropTech',
              href: '/industries/real-estate',
              description: 'Digital solutions transforming property management and transactions.',
              icon: <Building2 className="h-5 w-5" />,
            },
            {
              title: 'E-commerce & Retail',
              href: '/industries/ecommerce',
              description: 'Scalable platforms and systems for modern commerce operations.',
              icon: <ShoppingCart className="h-5 w-5" />,
            },
            {
              title: 'Manufacturing',
              href: '/industries/manufacturing',
              description: 'Industry 4.0 solutions for smart manufacturing and operations.',
              icon: <Factory className="h-5 w-5" />,
            },
            {
              title: 'Healthcare & Biotech',
              href: '/industries/healthcare',
              description: 'Innovative solutions for patient care and medical research.',
              icon: <AirVent className="h-5 w-5" />,
            },
          ],
        },
        {
          title: 'Additional Sectors',
          items: [
            {
              title: 'Logistics & Supply Chain',
              href: '/industries/logistics',
              description: 'Optimize your supply chain with intelligent tracking and management.',
              icon: <Truck className="h-5 w-5" />,
            },
            {
              title: 'Travel & Hospitality',
              href: '/industries/travel-tourism',
              description: 'Enhance guest experiences and streamline operations.',
              icon: <Plane className="h-5 w-5" />,
            },
            {
              title: 'Finance & FinTech',
              href: '/industries/finance',
              description: 'Secure and innovative solutions for financial services.',
              icon: <Layers className="h-5 w-5" />,
            },
            {
              title: 'Education & EdTech',
              href: '/industries/education',
              description: 'Transform learning experiences with technology.',
              icon: <Lightbulb className="h-5 w-5" />,
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
      description:
        'Learn about our journey, mission, and the passionate team driving innovation and excellence in everything we do.',
      columns: [
        {
          title: 'Our Organization',
          items: [
            {
              title: 'About Us',
              href: '/company/about',
              description: 'Our story, mission, values, and commitment to excellence.',
              icon: <Home className="h-5 w-5" />,
            },
            {
              title: 'Leadership Team',
              href: '/company/leadership',
              description: 'Meet the visionaries guiding our company toward innovation.',
              icon: <Users className="h-5 w-5" />,
            },
            {
              title: 'Careers',
              href: '/company/careers',
              description: 'Join our growing team of passionate technology experts.',
              icon: <Briefcase className="h-5 w-5" />,
            },
            {
              title: 'Partnerships',
              href: '/company/partnerships',
              description: 'Strategic alliances that expand our capabilities and reach.',
              icon: <Handshake className="h-5 w-5" />,
            },
          ],
        },
        {
          title: 'Insights & Resources',
          items: [
            {
              title: 'Case Studies',
              href: '/company/case-studies',
              description: 'Success stories showcasing our impactful solutions.',
              icon: <BookText className="h-5 w-5" />,
            },
            {
              title: 'Blog',
              href: '/company/blog',
              description: 'Thought leadership, industry insights, and technology trends.',
              icon: <FileText className="h-5 w-5" />,
            },
            {
              title: 'Innovation Lab',
              href: '/company/innovation',
              description: 'Explore our latest research and experimental projects.',
              icon: <Rocket className="h-5 w-5" />,
            },
            {
              title: 'Technical Guides',
              href: '/company/resources',
              description: 'In-depth technical content and best practices.',
              icon: <Puzzle className="h-5 w-5" />,
            },
          ],
        },
      ],
    },
  },
  {
    name: 'Case Studies',
    href: '/case-studies',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];
