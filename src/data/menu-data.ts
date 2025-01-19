// src/data/menu-data.ts
import {
    Code2, Rocket, Users, Globe, Smartphone, Brain,
    Cloud, Building2, ShoppingCart,
    Store, Truck, UserRound, GraduationCap, Handshake,
    HeartHandshake, UserPlus, LayoutGrid, Server, Code,
    Network,
} from 'lucide-react'
import { MenuData } from '@/types/mega-menu'

export const menuData: MenuData = {
    whatWeDo: {
        services: [
            {
                title: 'Technology Consulting',
                description: 'Strategic guidance for digital transformation',
                icon: Code2,
                href: '/services/consulting',
                stats: [
                    { label: 'Success Rate', value: '98%' },
                    { label: 'Projects', value: '500+' }
                ]
            },
            {
                title: 'Custom Software Development',
                description: 'Tailored solutions for your unique business needs',
                icon: Code,
                href: '/services/custom-development',
                stats: [
                    { label: 'Delivered Projects', value: '1000+' },
                    { label: 'Client Satisfaction', value: '96%' }
                ]
            },
            {
                title: 'MVP Development',
                description: 'Rapid prototyping and minimum viable product development',
                icon: Rocket,
                href: '/services/mvp',
                stats: [
                    { label: 'Time to Market', value: '4-8 weeks' },
                    { label: 'Success Rate', value: '92%' }
                ]
            },
            {
                title: 'Team Augmentation',
                description: 'Skilled developers to strengthen your existing team',
                icon: Users,
                href: '/services/team-augmentation',
                stats: [
                    { label: 'Active Teams', value: '50+' },
                    { label: 'Retention Rate', value: '95%' }
                ]
            }
        ],
        expertise: [
            {
                title: 'Web Development',
                description: 'Modern web applications and platforms',
                icon: Globe,
                href: '/expertise/web'
            },
            {
                title: 'Mobile App Development',
                description: 'Native and cross-platform mobile solutions',
                icon: Smartphone,
                href: '/expertise/mobile'
            },
            {
                title: 'AI/ML',
                description: 'Artificial Intelligence and Machine Learning solutions',
                icon: Brain,
                href: '/expertise/ai-ml'
            },
            {
                title: 'Blockchain',
                description: 'Decentralized applications and smart contracts',
                icon: Network,
                href: '/expertise/blockchain'
            },
            {
                title: 'Cloud',
                description: 'Cloud infrastructure and deployment solutions',
                icon: Cloud,
                href: '/expertise/cloud'
            }
        ]
    },
    technologies: [
        {
            title: 'Frontend Development',
            subtitle: 'React • Angular • Vue.js',
            description: 'Build modern, responsive web applications',
            icon: LayoutGrid,
            href: '/tech/frontend',
            featured: true
        },
        {
            title: 'Backend Development',
            subtitle: 'Java • PHP • Node.js • .NET • Python',
            description: 'Robust and scalable server-side solutions',
            icon: Server,
            href: '/tech/backend',
            featured: true
        },
        {
            title: 'Mobile Development',
            subtitle: 'Android • iOS • Flutter • React Native • Kotlin',
            description: 'Native and cross-platform mobile apps',
            icon: Smartphone,
            href: '/tech/mobile',
            featured: true
        },
        {
            title: 'Cloud Services',
            subtitle: 'AWS • GCP • Azure',
            description: 'Cloud infrastructure and deployment',
            icon: Cloud,
            href: '/tech/cloud',
            featured: true
        }
    ],
    industries: [
        {
            title: 'Real Estate',
            description: 'PropTech solutions for modern real estate',
            icon: Building2,
            href: '/industries/real-estate',
            stats: [
                { label: 'Projects', value: '200+' },
                { label: 'Revenue Generated', value: '$50M+' }
            ]
        },
        {
            title: 'E-commerce',
            description: 'Digital commerce and retail solutions',
            icon: ShoppingCart,
            href: '/industries/ecommerce',
            stats: [
                { label: 'Online Stores', value: '300+' },
                { label: 'GMV Processed', value: '$100M+' }
            ]
        },
        {
            title: 'Retail',
            description: 'Omnichannel retail technology solutions',
            icon: Store,
            href: '/industries/retail',
            stats: [
                { label: 'Retail Chains', value: '50+' },
                { label: 'POS Integrated', value: '1000+' }
            ]
        },
        {
            title: 'Travel & Tourism',
            description: 'Digital solutions for travel industry',
            icon: Globe,
            href: '/industries/travel',
            stats: [
                { label: 'Bookings Processed', value: '1M+' },
                { label: 'Active Users', value: '500K+' }
            ]
        },
        {
            title: 'Logistics',
            description: 'Supply chain and logistics solutions',
            icon: Truck,
            href: '/industries/logistics',
            stats: [
                { label: 'Shipments Tracked', value: '5M+' },
                { label: 'Fleet Managed', value: '10K+' }
            ]
        }
    ],
    company: [
        {
            title: 'About Us',
            description: 'Our story and mission',
            icon: UserRound,
            href: '/about'
        },
        {
            title: 'Career',
            description: 'Join our growing team',
            icon: GraduationCap,
            href: '/careers'
        },
        {
            title: 'Vendor Partnership',
            description: 'Collaborate with us as a vendor',
            icon: Handshake,
            href: '/partnerships/vendor'
        },
        {
            title: 'Recruitment Partnership',
            description: 'Partner with our talent acquisition',
            icon: HeartHandshake,
            href: '/partnerships/recruitment'
        },
        {
            title: 'Sales Partnership',
            description: 'Grow with our sales network',
            icon: UserPlus,
            href: '/partnerships/sales'
        }
    ]
}