// src/data/case-studies.ts
import type { CaseStudy } from '@/types/case-study';

// case studies data
const caseStudies: CaseStudy[] = [
  // Retail & E-commerce Case Study
  {
    id: 'retail-omnichannel-platform',
    slug: 'retail-omnichannel-platform',
    title: 'Omnichannel Retail Platform',
    overview:
      'Developed an integrated omnichannel platform for a national retail chain, connecting their physical stores with online shopping experiences to increase sales by 43%.',
    industry: 'Retail & E-commerce',
    duration: '10 months',
    services: [
      'E-commerce Development',
      'Mobile App Development',
      'Systems Integration',
      'Data Analytics',
    ],
    coverImage: {
      src: '/images/case-studies/retail-omnichannel.jpeg',
      alt: 'Retail omnichannel platform showing mobile, web, and store integration',
    },
    challenge:
      'The client was struggling to compete with pure e-commerce players while maintaining their physical store presence. Their online and offline channels operated in silos, creating disjointed customer experiences and inefficient inventory management.',
    approach:
      'We took an integrated approach, focusing on creating a seamless customer journey across all touchpoints. We conducted extensive research with both customers and store associates to identify the biggest pain points and opportunities for integration.',
    solution:
      'We built a comprehensive omnichannel retail platform that unifies inventory, customer data, and purchasing across online and physical store channels. The platform includes real-time inventory visibility, in-store pickup options, and personalized recommendations.',
    results: {
      summary:
        'Our solution increased overall sales by 43%, with online revenue growing by 78% and physical store traffic increasing by 22%. The unified inventory system reduced stockouts by 64% and improved margin by eliminating unnecessary markdowns.',
      metrics: [
        {
          label: 'Sales Growth',
          value: '43%',
          description: 'Increase in overall retail sales',
          icon: 'TrendingUp',
          color: 'green',
        },
        {
          label: 'Online Revenue',
          value: '78%',
          description: 'Growth in e-commerce revenue',
          icon: 'ShoppingCart',
          color: 'purple',
        },
        {
          label: 'Store Traffic',
          value: '22%',
          description: 'Increase in physical store visits',
          icon: 'Users',
          color: 'blue',
        },
        {
          label: 'Inventory Accuracy',
          value: '99.2%',
          description: 'Improved from 82% previously',
          icon: 'Package',
          color: 'amber',
        },
      ],
    },
    architecture: {
      description:
        'The architecture uses a headless commerce approach with microservices backend and multiple client frontends. The system integrates with existing in-store POS systems while adding new capabilities.',
      technologies: [
        {
          name: 'Next.js',
          icon: 'Code',
          description: 'React framework',
          category: 'frontend',
        },
        {
          name: 'React Native',
          icon: 'Smartphone',
          description: 'Mobile app framework',
          category: 'frontend',
        },
        {
          name: 'Java SpringBoot',
          icon: 'Server',
          description: 'Backend services',
          category: 'backend',
        },
        {
          name: 'Elastic Search',
          icon: 'Search',
          description: 'Search services',
          category: 'backend',
        },
        {
          name: 'PostgreSQL',
          icon: 'Database',
          description: 'Main database',
          category: 'database',
        },
        {
          name: 'Redis',
          icon: 'Database',
          description: 'Caching layer',
          category: 'database',
        },
        {
          name: 'Kafka',
          icon: 'MessageSquare',
          description: 'Event streaming',
          category: 'infrastructure',
        },
        {
          name: 'AWS',
          icon: 'CloudCog',
          description: 'Cloud infrastructure',
          category: 'cloud',
        },
      ],
      components: [
        {
          name: 'Customer Web Store',
          type: 'client',
          technologies: ['Next.js', 'Redux', 'Tailwind CSS'],
          connections: ['API Gateway', 'Search Service', 'Recommendation Service'],
        },
        {
          name: 'Mobile Shopping App',
          type: 'client',
          technologies: ['React Native', 'Redux'],
          connections: ['API Gateway', 'Location Service'],
        },
        {
          name: 'Store Associate App',
          type: 'client',
          technologies: ['React Native', 'GraphQL'],
          connections: ['API Gateway', 'Inventory Service'],
        },
        {
          name: 'API Gateway',
          type: 'service',
          technologies: ['AWS API Gateway', 'Lambda'],
          connections: ['Auth Service', 'Order Service', 'Inventory Service', 'Customer Service'],
        },
        {
          name: 'Auth Service',
          type: 'service',
          technologies: ['Spring Security', 'OAuth'],
          connections: ['Customer Database'],
        },
        {
          name: 'Order Service',
          type: 'service',
          technologies: ['Java', 'Spring Boot'],
          connections: ['Order Database', 'Payment Service', 'Fulfillment Service'],
        },
        {
          name: 'Inventory Service',
          type: 'service',
          technologies: ['Java', 'Spring Boot'],
          connections: ['Inventory Database', 'POS Integration'],
        },
        {
          name: 'Customer Service',
          type: 'service',
          technologies: ['Java', 'Spring Boot'],
          connections: ['Customer Database', 'Analytics Service'],
        },
        {
          name: 'Search Service',
          type: 'service',
          technologies: ['Elastic Search', 'Java'],
          connections: ['Product Database'],
        },
        {
          name: 'Recommendation Service',
          type: 'service',
          technologies: ['Python', 'TensorFlow'],
          connections: ['Analytics Database'],
        },
        {
          name: 'Payment Service',
          type: 'service',
          technologies: ['Java', 'Spring Boot'],
          connections: ['Payment Gateway'],
        },
        {
          name: 'Fulfillment Service',
          type: 'service',
          technologies: ['Java', 'Spring Boot'],
          connections: ['Order Database', 'Inventory Database', 'Notification Service'],
        },
        {
          name: 'Location Service',
          type: 'service',
          technologies: ['Node.js', 'Google Maps API'],
          connections: ['Store Database'],
        },
        {
          name: 'Analytics Service',
          type: 'service',
          technologies: ['Python', 'Apache Spark'],
          connections: ['Analytics Database'],
        },
        {
          name: 'Notification Service',
          type: 'service',
          technologies: ['Node.js', 'AWS SNS'],
          connections: ['Customer Database'],
        },
        {
          name: 'Customer Database',
          type: 'database',
          technologies: ['PostgreSQL'],
          connections: [],
        },
        {
          name: 'Order Database',
          type: 'database',
          technologies: ['PostgreSQL'],
          connections: [],
        },
        {
          name: 'Inventory Database',
          type: 'database',
          technologies: ['PostgreSQL'],
          connections: [],
        },
        {
          name: 'Product Database',
          type: 'database',
          technologies: ['PostgreSQL'],
          connections: [],
        },
        {
          name: 'Analytics Database',
          type: 'database',
          technologies: ['MongoDB'],
          connections: [],
        },
        {
          name: 'Store Database',
          type: 'database',
          technologies: ['PostgreSQL'],
          connections: [],
        },
        {
          name: 'POS Integration',
          type: 'external',
          technologies: ['REST API'],
          connections: ['Inventory Database'],
        },
        {
          name: 'Payment Gateway',
          type: 'external',
          technologies: ['REST API'],
          connections: [],
        },
      ],
      flows: [
        {
          from: 'Customer Web Store',
          to: 'API Gateway',
          name: 'User browsing',
        },
        {
          from: 'Mobile Shopping App',
          to: 'API Gateway',
          name: 'Mobile shopping',
        },
        {
          from: 'Store Associate App',
          to: 'API Gateway',
          name: 'In-store assistance',
        },
        {
          from: 'API Gateway',
          to: 'Auth Service',
          name: 'Authentication',
        },
        {
          from: 'API Gateway',
          to: 'Order Service',
          name: 'Order processing',
        },
        {
          from: 'API Gateway',
          to: 'Inventory Service',
          name: 'Stock checking',
        },
        {
          from: 'API Gateway',
          to: 'Customer Service',
          name: 'Customer data',
        },
        {
          from: 'Order Service',
          to: 'Payment Service',
          name: 'Payment processing',
        },
        {
          from: 'Order Service',
          to: 'Fulfillment Service',
          name: 'Order fulfillment',
        },
        {
          from: 'Fulfillment Service',
          to: 'Notification Service',
          name: 'Order updates',
        },
        {
          from: 'Inventory Service',
          to: 'POS Integration',
          name: 'Store inventory sync',
        },
        {
          from: 'Customer Service',
          to: 'Analytics Service',
          name: 'Customer insights',
        },
        {
          from: 'Payment Service',
          to: 'Payment Gateway',
          name: 'External payment',
        },
      ],
      highlights: [
        {
          title: 'Unified Inventory System',
          description:
            'Created a single source of truth for inventory across online and store channels, enabling accurate availability information.',
          icon: 'Database',
        },
        {
          title: 'Personalized Shopping Experience',
          description:
            'Implemented a recommendation engine that works across channels, providing consistent personalization.',
          icon: 'Users',
        },
        {
          title: 'Omnichannel Order Management',
          description:
            'Developed a flexible order management system supporting buy online pickup in-store, ship from store, and traditional e-commerce.',
          icon: 'ShoppingBag',
        },
        {
          title: 'Real-time Analytics',
          description:
            'Built a real-time analytics platform that provides insights into customer behavior across all touchpoints.',
          icon: 'BarChart',
        },
      ],
      keyFeatures: [
        {
          name: 'Product Discovery',
          description:
            'Advanced search and filtering capabilities with visual search and barcode scanning.',
          icon: 'Search',
        },
        {
          name: 'Unified Shopping Cart',
          description: 'Shopping cart that persists across web, mobile, and in-store experiences.',
          icon: 'ShoppingCart',
        },
        {
          name: 'Store Locator',
          description: 'Interactive map with real-time inventory availability at nearby stores.',
          icon: 'MapPin',
        },
        {
          name: 'Clienteling',
          description:
            'Tools for store associates to access customer history and preferences to provide personalized service.',
          icon: 'UserCheck',
        },
      ],
    },
    metaData: {
      title: 'Omnichannel Retail Platform | SolveJet Case Study',
      description:
        'How SolveJet helped a national retail chain create a seamless omnichannel experience that increased sales by 43%.',
      keywords: [
        'omnichannel retail',
        'e-commerce',
        'retail transformation',
        'unified commerce',
        'case study',
      ],
    },
  },

  // Real Estate Case Study
  {
    id: 'real-estate-management-platform',
    slug: 'real-estate-management-platform',
    title: 'Real Estate Property Management Platform',
    overview:
      'Built a comprehensive property management platform for a leading real estate company, streamlining operations across 12,000+ properties and reducing operational costs by 32%.',
    industry: 'Real Estate',
    duration: '12 months',
    services: [
      'Custom Software Development',
      'Mobile App Development',
      'IoT Integration',
      'Cloud Infrastructure',
    ],
    coverImage: {
      src: '/images/case-studies/real-estate-platform.jpeg',
      alt: 'Real estate property management dashboard with analytics',
    },
    challenge:
      'The client was managing thousands of residential and commercial properties using disparate legacy systems, spreadsheets, and manual processes. This led to inefficiencies, data silos, and poor visibility into property performance and tenant needs.',
    approach:
      'We took a phased approach, starting with a thorough analysis of existing systems and processes. We worked closely with property managers, maintenance teams, and executives to map out an ideal workflow and develop a roadmap for implementation.',
    solution:
      'We developed an integrated property management platform with web and mobile interfaces for staff, property owners, and tenants. The system includes maintenance request tracking, rent collection, financial reporting, and IoT integration for smart building features.',
    results: {
      summary:
        'The platform reduced operational costs by 32%, decreased maintenance response time by 74%, improved tenant satisfaction scores by 45%, and provided unprecedented visibility into portfolio performance through real-time analytics.',
      metrics: [
        {
          label: 'Cost Reduction',
          value: '32%',
          description: 'Decrease in operational expenses',
          icon: 'DollarSign',
          color: 'green',
        },
        {
          label: 'Maintenance Speed',
          value: '74%',
          description: 'Faster maintenance response',
          icon: 'Tool',
          color: 'blue',
        },
        {
          label: 'Tenant Satisfaction',
          value: '45%',
          description: 'Improvement in satisfaction scores',
          icon: 'Heart',
          color: 'red',
        },
        {
          label: 'Occupancy Rate',
          value: '98.3%',
          description: 'Increased from 87.5%',
          icon: 'Home',
          color: 'purple',
        },
      ],
    },
    architecture: {
      description:
        'The architecture is built on a microservices foundation with separate domains for property management, tenant services, maintenance, and analytics. The system integrates with IoT devices, payment processors, and accounting software.',
      technologies: [
        {
          name: 'Angular',
          icon: 'Code',
          description: 'Frontend framework',
          category: 'frontend',
        },
        {
          name: 'Flutter',
          icon: 'Smartphone',
          description: 'Mobile app framework',
          category: 'frontend',
        },
        {
          name: '.NET Core',
          icon: 'Server',
          description: 'Backend services',
          category: 'backend',
        },
        {
          name: 'SignalR',
          icon: 'Radio',
          description: 'Real-time communications',
          category: 'backend',
        },
        {
          name: 'SQL Server',
          icon: 'Database',
          description: 'Main database',
          category: 'database',
        },
        {
          name: 'Azure IoT Hub',
          icon: 'Cpu',
          description: 'IoT device management',
          category: 'cloud',
        },
        {
          name: 'Azure Functions',
          icon: 'Zap',
          description: 'Serverless compute',
          category: 'cloud',
        },
        {
          name: 'Power BI',
          icon: 'BarChart',
          description: 'Business intelligence',
          category: 'tools',
        },
      ],
      components: [
        {
          name: 'Admin Portal',
          type: 'client',
          technologies: ['Angular', 'TypeScript', 'RxJS'],
          connections: ['API Gateway', 'Reporting Service'],
        },
        {
          name: 'Property Manager App',
          type: 'client',
          technologies: ['Flutter', 'Dart'],
          connections: ['API Gateway', 'Notification Service'],
        },
        {
          name: 'Tenant Portal',
          type: 'client',
          technologies: ['Angular', 'TypeScript', 'RxJS'],
          connections: ['API Gateway', 'Payment Service'],
        },
        {
          name: 'Tenant Mobile App',
          type: 'client',
          technologies: ['Flutter', 'Dart'],
          connections: ['API Gateway', 'Notification Service'],
        },
        {
          name: 'Maintenance Staff App',
          type: 'client',
          technologies: ['Flutter', 'Dart'],
          connections: ['API Gateway', 'Work Order Service'],
        },
        {
          name: 'API Gateway',
          type: 'service',
          technologies: ['Azure API Management', '.NET Core'],
          connections: [
            'Identity Service',
            'Property Service',
            'Tenant Service',
            'Maintenance Service',
            'Financial Service',
          ],
        },
        {
          name: 'Identity Service',
          type: 'service',
          technologies: ['.NET Core', 'Identity Server'],
          connections: ['User Database'],
        },
        {
          name: 'Property Service',
          type: 'service',
          technologies: ['.NET Core', 'Entity Framework'],
          connections: ['Property Database', 'IoT Integration Service'],
        },
        {
          name: 'Tenant Service',
          type: 'service',
          technologies: ['.NET Core', 'Entity Framework'],
          connections: ['Tenant Database', 'Communication Service'],
        },
        {
          name: 'Maintenance Service',
          type: 'service',
          technologies: ['.NET Core', 'Entity Framework'],
          connections: ['Maintenance Database', 'Work Order Service', 'Notification Service'],
        },
        {
          name: 'Financial Service',
          type: 'service',
          technologies: ['.NET Core', 'Entity Framework'],
          connections: ['Financial Database', 'Payment Service', 'Accounting Integration'],
        },
        {
          name: 'Work Order Service',
          type: 'service',
          technologies: ['.NET Core', 'SignalR'],
          connections: ['Maintenance Database', 'Notification Service'],
        },
        {
          name: 'Notification Service',
          type: 'service',
          technologies: ['.NET Core', 'Azure Notification Hubs'],
          connections: ['User Database', 'Communication Service'],
        },
        {
          name: 'Payment Service',
          type: 'service',
          technologies: ['.NET Core'],
          connections: ['Financial Database', 'Payment Gateway'],
        },
        {
          name: 'Reporting Service',
          type: 'service',
          technologies: ['.NET Core', 'SQL Server Reporting'],
          connections: ['Analytics Database'],
        },
        {
          name: 'IoT Integration Service',
          type: 'service',
          technologies: ['Azure IoT Hub', 'Azure Functions'],
          connections: ['IoT Database', 'Property Database'],
        },
        {
          name: 'Communication Service',
          type: 'service',
          technologies: ['.NET Core', 'Azure Communication Services'],
          connections: ['Tenant Database'],
        },
        {
          name: 'User Database',
          type: 'database',
          technologies: ['SQL Server'],
          connections: [],
        },
        {
          name: 'Property Database',
          type: 'database',
          technologies: ['SQL Server'],
          connections: [],
        },
        {
          name: 'Tenant Database',
          type: 'database',
          technologies: ['SQL Server'],
          connections: [],
        },
        {
          name: 'Maintenance Database',
          type: 'database',
          technologies: ['SQL Server'],
          connections: [],
        },
        {
          name: 'Financial Database',
          type: 'database',
          technologies: ['SQL Server'],
          connections: [],
        },
        {
          name: 'IoT Database',
          type: 'database',
          technologies: ['Azure Cosmos DB'],
          connections: [],
        },
        {
          name: 'Analytics Database',
          type: 'database',
          technologies: ['Azure Synapse Analytics'],
          connections: [],
        },
        {
          name: 'Payment Gateway',
          type: 'external',
          technologies: ['REST API'],
          connections: [],
        },
        {
          name: 'Accounting Integration',
          type: 'external',
          technologies: ['REST API'],
          connections: [],
        },
      ],
      flows: [
        {
          from: 'Admin Portal',
          to: 'API Gateway',
          name: 'Administration',
        },
        {
          from: 'Property Manager App',
          to: 'API Gateway',
          name: 'Property management',
        },
        {
          from: 'Tenant Portal',
          to: 'API Gateway',
          name: 'Tenant services',
        },
        {
          from: 'Tenant Mobile App',
          to: 'API Gateway',
          name: 'Mobile tenant access',
        },
        {
          from: 'Maintenance Staff App',
          to: 'API Gateway',
          name: 'Maintenance operations',
        },
        {
          from: 'API Gateway',
          to: 'Identity Service',
          name: 'Authentication',
        },
        {
          from: 'API Gateway',
          to: 'Property Service',
          name: 'Property data',
        },
        {
          from: 'API Gateway',
          to: 'Tenant Service',
          name: 'Tenant management',
        },
        {
          from: 'API Gateway',
          to: 'Maintenance Service',
          name: 'Maintenance requests',
        },
        {
          from: 'API Gateway',
          to: 'Financial Service',
          name: 'Financial operations',
        },
        {
          from: 'Maintenance Service',
          to: 'Work Order Service',
          name: 'Work order dispatching',
        },
        {
          from: 'Work Order Service',
          to: 'Notification Service',
          name: 'Maintenance alerts',
        },
        {
          from: 'Tenant Service',
          to: 'Communication Service',
          name: 'Tenant communications',
        },
        {
          from: 'Financial Service',
          to: 'Payment Service',
          name: 'Payment processing',
        },
        {
          from: 'Payment Service',
          to: 'Payment Gateway',
          name: 'External payment',
        },
        {
          from: 'Financial Service',
          to: 'Accounting Integration',
          name: 'Accounting sync',
        },
        {
          from: 'Property Service',
          to: 'IoT Integration Service',
          name: 'Smart building control',
        },
      ],
      highlights: [
        {
          title: 'Smart Building Integration',
          description:
            'Seamlessly integrated with IoT sensors for automated climate control, security monitoring, and energy management.',
          icon: 'Cpu',
        },
        {
          title: 'Mobile-first Maintenance',
          description:
            'Mobile app for maintenance staff with offline capabilities, digital work orders, and photo documentation.',
          icon: 'Tool',
        },
        {
          title: 'Unified Tenant Experience',
          description:
            'Single portal for tenants to pay rent, submit maintenance requests, access documents, and communicate with management.',
          icon: 'Users',
        },
        {
          title: 'Real-time Analytics Dashboard',
          description:
            'Comprehensive analytics platform providing insights into occupancy rates, property performance, and maintenance efficiency.',
          icon: 'PieChart',
        },
      ],
      keyFeatures: [
        {
          name: 'Lease Management',
          description:
            'Digital lease creation, signing, renewal, and tracking with automated reminders and workflows.',
          icon: 'FileText',
        },
        {
          name: 'Online Rent Collection',
          description:
            'Secure online payment options with automated receipts, late fee management, and payment tracking.',
          icon: 'CreditCard',
        },
        {
          name: 'Maintenance Request System',
          description:
            'End-to-end system for submitting, tracking, and resolving maintenance issues with priority-based routing.',
          icon: 'Tool',
        },
        {
          name: 'Property Inspection',
          description:
            'Digital inspection tools with customizable checklists, photo documentation, and automated reporting.',
          icon: 'Clipboard',
        },
      ],
    },
    metaData: {
      title: 'Real Estate Property Management Platform | SolveJet Case Study',
      description:
        'How SolveJet helped a leading real estate company streamline operations across 12,000+ properties and reduce costs by 32%.',
      keywords: [
        'real estate technology',
        'property management',
        'smart buildings',
        'maintenance automation',
        'case study',
      ],
    },
  },

  // Real Estate Case Study - Luxury Properties Platform
  {
    id: 'luxury-real-estate-platform',
    slug: 'luxury-real-estate-platform',
    title: 'Luxury Real Estate Digital Marketplace',
    overview:
      'Developed an exclusive digital marketplace for high-end real estate properties, helping a premium realtor increase their international client base by 67% and reduce marketing costs by 41%.',
    industry: 'Real Estate',
    duration: '9 months',
    services: [
      'Custom Software Development',
      'Virtual Reality Tours',
      'AI-Powered Recommendations',
      'Digital Marketing Integration',
    ],
    coverImage: {
      src: '/images/case-studies/luxury-real-estate.jpg',
      alt: 'Luxury real estate platform showing virtual property tours and international buyer interface',
    },
    challenge:
      'The client, a high-end real estate agency, was struggling to reach international buyers and showcase luxury properties effectively. Traditional marketing methods were costly and inefficient, with limited reach and poor targeting capabilities for ultra-high-net-worth individuals.',
    approach:
      'We adopted a digital-first approach focused on exclusivity and personalization. By conducting in-depth market research with luxury real estate buyers and sellers, we identified key touchpoints and decision factors in the luxury property market.',
    solution:
      'We built a sophisticated digital marketplace with immersive 3D virtual tours, multilingual support, and AI-powered property matching. The platform includes private viewing rooms, concierge services, and secure communication channels for discrete negotiations.',
    results: {
      summary:
        "The platform expanded the client's international buyer base by 67%, reduced marketing spend by 41%, and decreased average selling time for properties from 8.5 months to 4.2 months. The virtual tours led to a 58% reduction in unnecessary physical viewings.",
      metrics: [
        {
          label: 'International Clients',
          value: '67%',
          description: 'Increase in international buyer acquisition',
          icon: 'Globe',
          color: 'indigo',
        },
        {
          label: 'Marketing ROI',
          value: '314%',
          description: 'Return on platform investment',
          icon: 'TrendingUp',
          color: 'green',
        },
        {
          label: 'Time to Sell',
          value: '51%',
          description: 'Reduction in average selling time',
          icon: 'Clock',
          color: 'blue',
        },
        {
          label: 'Deal Size',
          value: '18%',
          description: 'Increase in average transaction value',
          icon: 'DollarSign',
          color: 'amber',
        },
      ],
    },
    architecture: {
      description:
        'The platform uses a modern architecture with Next.js for the frontend, Node.js microservices, and MongoDB for flexible property data storage. AWS services provide global scalability and 3D asset delivery.',
      technologies: [
        {
          name: 'Next.js',
          icon: 'Code',
          description: 'Frontend framework',
          category: 'frontend',
        },
        {
          name: 'Three.js',
          icon: 'Cube',
          description: '3D visualization',
          category: 'frontend',
        },
        {
          name: 'Node.js',
          icon: 'Server',
          description: 'Backend services',
          category: 'backend',
        },
        {
          name: 'GraphQL',
          icon: 'Database',
          description: 'API layer',
          category: 'backend',
        },
        {
          name: 'MongoDB',
          icon: 'Database',
          description: 'Main database',
          category: 'database',
        },
        {
          name: 'AWS S3',
          icon: 'HardDrive',
          description: 'Asset storage',
          category: 'cloud',
        },
        {
          name: 'AWS CloudFront',
          icon: 'Globe',
          description: 'Content delivery',
          category: 'cloud',
        },
        {
          name: 'TensorFlow',
          icon: 'Brain',
          description: 'AI recommendation engine',
          category: 'tools',
        },
      ],
      components: [
        {
          name: 'Client Portal',
          type: 'client',
          technologies: ['Next.js', 'Three.js', 'TailwindCSS'],
          connections: ['API Gateway', 'Virtual Tour Service', 'Recommendation Engine'],
        },
        {
          name: 'Agent Dashboard',
          type: 'client',
          technologies: ['React', 'Redux', 'Material UI'],
          connections: ['API Gateway', 'Analytics Service', 'CRM Integration'],
        },
        {
          name: 'Mobile App',
          type: 'client',
          technologies: ['React Native', 'Redux'],
          connections: ['API Gateway', 'Notification Service'],
        },
        {
          name: 'API Gateway',
          type: 'service',
          technologies: ['Express.js', 'GraphQL'],
          connections: [
            'Auth Service',
            'Property Service',
            'User Service',
            'Communication Service',
            'Analytics Service',
          ],
        },
        {
          name: 'Auth Service',
          type: 'service',
          technologies: ['Node.js', 'JWT', 'OAuth'],
          connections: ['User Database'],
        },
        {
          name: 'Property Service',
          type: 'service',
          technologies: ['Node.js', 'Mongoose'],
          connections: ['Property Database', 'Virtual Tour Service', 'Recommendation Engine'],
        },
        {
          name: 'User Service',
          type: 'service',
          technologies: ['Node.js', 'Mongoose'],
          connections: ['User Database', 'CRM Integration'],
        },
        {
          name: 'Communication Service',
          type: 'service',
          technologies: ['Node.js', 'Socket.io', 'SendGrid'],
          connections: ['Chat Database', 'Notification Service'],
        },
        {
          name: 'Virtual Tour Service',
          type: 'service',
          technologies: ['Node.js', 'Three.js', 'WebGL'],
          connections: ['Asset Database'],
        },
        {
          name: 'Recommendation Engine',
          type: 'service',
          technologies: ['Python', 'TensorFlow', 'Node.js'],
          connections: ['Analytics Database', 'Property Database'],
        },
        {
          name: 'Analytics Service',
          type: 'service',
          technologies: ['Node.js', 'MongoDB Aggregations'],
          connections: ['Analytics Database'],
        },
        {
          name: 'Notification Service',
          type: 'service',
          technologies: ['Node.js', 'Firebase Cloud Messaging'],
          connections: ['User Database'],
        },
        {
          name: 'User Database',
          type: 'database',
          technologies: ['MongoDB'],
          connections: [],
        },
        {
          name: 'Property Database',
          type: 'database',
          technologies: ['MongoDB'],
          connections: [],
        },
        {
          name: 'Chat Database',
          type: 'database',
          technologies: ['MongoDB'],
          connections: [],
        },
        {
          name: 'Asset Database',
          type: 'database',
          technologies: ['AWS S3', 'MongoDB (metadata)'],
          connections: [],
        },
        {
          name: 'Analytics Database',
          type: 'database',
          technologies: ['MongoDB'],
          connections: [],
        },
        {
          name: 'CRM Integration',
          type: 'external',
          technologies: ['REST API'],
          connections: [],
        },
      ],
      flows: [
        {
          from: 'Client Portal',
          to: 'API Gateway',
          name: 'Property browsing',
        },
        {
          from: 'Agent Dashboard',
          to: 'API Gateway',
          name: 'Property management',
        },
        {
          from: 'Mobile App',
          to: 'API Gateway',
          name: 'Mobile access',
        },
        {
          from: 'API Gateway',
          to: 'Auth Service',
          name: 'Authentication',
        },
        {
          from: 'API Gateway',
          to: 'Property Service',
          name: 'Property operations',
        },
        {
          from: 'API Gateway',
          to: 'User Service',
          name: 'User management',
        },
        {
          from: 'API Gateway',
          to: 'Communication Service',
          name: 'Messaging',
        },
        {
          from: 'Property Service',
          to: 'Virtual Tour Service',
          name: '3D tour generation',
        },
        {
          from: 'Property Service',
          to: 'Recommendation Engine',
          name: 'Property matching',
        },
        {
          from: 'User Service',
          to: 'CRM Integration',
          name: 'Customer data sync',
        },
        {
          from: 'Communication Service',
          to: 'Notification Service',
          name: 'Alerts and messages',
        },
        {
          from: 'Recommendation Engine',
          to: 'Analytics Service',
          name: 'User preference analysis',
        },
      ],
      highlights: [
        {
          title: 'Immersive Virtual Tours',
          description:
            'High-fidelity 3D property tours allowing international buyers to explore properties remotely with realistic lighting, textures, and interactive features.',
          icon: 'Eye',
        },
        {
          title: 'AI Property Matching',
          description:
            'Machine learning algorithms that analyze buyer preferences and behaviors to recommend relevant properties, increasing match quality and conversion rates.',
          icon: 'Zap',
        },
        {
          title: 'Secure Negotiations',
          description:
            'End-to-end encrypted communication channels and digital offer management for secure and discreet property negotiations.',
          icon: 'Lock',
        },
        {
          title: 'Global Transaction Support',
          description:
            'Multi-currency support, legal documentation templates for different jurisdictions, and integration with international payment processors.',
          icon: 'Globe',
        },
      ],
      keyFeatures: [
        {
          name: 'VIP Client Portal',
          description:
            'Exclusive access to off-market properties, early listings, and personalized service from luxury property specialists.',
          icon: 'Award',
        },
        {
          name: '3D Virtual Tours',
          description:
            'Photorealistic virtual tours with interactive elements allowing remote viewing of properties from anywhere in the world.',
          icon: 'Camera',
        },
        {
          name: 'Concierge Services',
          description:
            'Integration with premium services for property evaluation, interior design consultation, and relocation assistance.',
          icon: 'Star',
        },
        {
          name: 'Market Intelligence',
          description:
            'Real-time insights into luxury market trends, property value forecasts, and investment opportunity scoring.',
          icon: 'BarChart',
        },
      ],
    },
    metaData: {
      title: 'Luxury Real Estate Digital Marketplace | SolveJet Case Study',
      description:
        'How SolveJet helped a premium real estate agency expand their international client base by 67% and reduce marketing costs with an exclusive digital marketplace.',
      keywords: [
        'luxury real estate',
        'virtual property tours',
        'international real estate',
        'high-end property marketplace',
        'case study',
      ],
    },
  },

  // Travel & Hospitality Case Study
  {
    id: 'travel-experience-platform',
    slug: 'travel-experience-platform',
    title: 'Personalized Travel Experience Platform',
    overview:
      'Created an AI-driven travel experience platform for a global tour operator, increasing booking conversions by 49% and customer satisfaction scores by 37% through personalized itinerary generation.',
    industry: 'Travel & Hospitality',
    duration: '11 months',
    services: [
      'Custom Software Development',
      'AI & Machine Learning',
      'Mobile App Development',
      'API Integration',
    ],
    coverImage: {
      src: '/images/case-studies/travel-experience-platform.png',
      alt: 'Personalized travel platform showing custom itinerary generation and experience booking',
    },
    challenge:
      'The client, a major tour operator, was struggling with generic itineraries that failed to meet the increasingly personalized expectations of modern travelers. Their legacy booking system offered limited flexibility and required significant manual work from travel agents to customize trips.',
    approach:
      'We combined AI technology with travel expertise to reimagine the trip planning process. Through extensive research with travelers and industry experts, we developed a system that could understand complex preferences and generate truly personalized experiences.',
    solution:
      'We built an intelligent travel platform that creates customized itineraries based on traveler preferences, contextual factors, and real-time availability. The system includes dynamic packaging, local experience integration, and adaptive recommendations throughout the journey.',
    results: {
      summary:
        "The platform transformed the client's business model, increasing booking conversion rates by 49%, customer satisfaction by 37%, and average trip value by 28%. It reduced itinerary creation time from days to minutes while delivering more personalized results.",
      metrics: [
        {
          label: 'Booking Conversion',
          value: '49%',
          description: 'Increase in booking completion rate',
          icon: 'ShoppingCart',
          color: 'green',
        },
        {
          label: 'Customer Satisfaction',
          value: '37%',
          description: 'Improvement in satisfaction scores',
          icon: 'Heart',
          color: 'red',
        },
        {
          label: 'Average Trip Value',
          value: '28%',
          description: 'Increase in customer spend per trip',
          icon: 'DollarSign',
          color: 'amber',
        },
        {
          label: 'Planning Efficiency',
          value: '95%',
          description: 'Reduction in itinerary creation time',
          icon: 'Clock',
          color: 'blue',
        },
      ],
    },
    architecture: {
      description:
        'The platform uses a cloud-native microservices architecture with React for web and mobile frontends, Node.js and Python for backend services, and MongoDB and PostgreSQL for different data needs.',
      technologies: [
        {
          name: 'React',
          icon: 'Code',
          description: 'Frontend framework',
          category: 'frontend',
        },
        {
          name: 'React Native',
          icon: 'Smartphone',
          description: 'Mobile app framework',
          category: 'frontend',
        },
        {
          name: 'Node.js',
          icon: 'Server',
          description: 'Backend services',
          category: 'backend',
        },
        {
          name: 'Python',
          icon: 'Terminal',
          description: 'AI services',
          category: 'backend',
        },
        {
          name: 'MongoDB',
          icon: 'Database',
          description: 'Content database',
          category: 'database',
        },
        {
          name: 'PostgreSQL',
          icon: 'Database',
          description: 'Transactional database',
          category: 'database',
        },
        {
          name: 'Google Cloud',
          icon: 'Cloud',
          description: 'Cloud infrastructure',
          category: 'cloud',
        },
        {
          name: 'TensorFlow',
          icon: 'Brain',
          description: 'Machine learning',
          category: 'tools',
        },
      ],
      components: [
        {
          name: 'Traveler Web Portal',
          type: 'client',
          technologies: ['React', 'Redux', 'Styled Components'],
          connections: ['API Gateway', 'Trip Planning Service', 'Booking Service'],
        },
        {
          name: 'Traveler Mobile App',
          type: 'client',
          technologies: ['React Native', 'Redux'],
          connections: ['API Gateway', 'Trip Planning Service', 'In-Trip Experience Service'],
        },
        {
          name: 'Agent Dashboard',
          type: 'client',
          technologies: ['React', 'Redux', 'Material UI'],
          connections: ['API Gateway', 'CRM Service', 'Analytics Service'],
        },
        {
          name: 'API Gateway',
          type: 'service',
          technologies: ['Node.js', 'Express', 'Apollo GraphQL'],
          connections: [
            'Auth Service',
            'Trip Planning Service',
            'Booking Service',
            'Content Service',
            'Recommendation Service',
          ],
        },
        {
          name: 'Auth Service',
          type: 'service',
          technologies: ['Node.js', 'Passport.js'],
          connections: ['User Database'],
        },
        {
          name: 'Trip Planning Service',
          type: 'service',
          technologies: ['Node.js', 'Express'],
          connections: ['Recommendation Service', 'Content Service', 'Inventory Service'],
        },
        {
          name: 'Booking Service',
          type: 'service',
          technologies: ['Node.js', 'Express'],
          connections: ['Inventory Service', 'Payment Service', 'Notification Service'],
        },
        {
          name: 'Content Service',
          type: 'service',
          technologies: ['Node.js', 'Express'],
          connections: ['Content Database', 'Content API Integrations'],
        },
        {
          name: 'Inventory Service',
          type: 'service',
          technologies: ['Node.js', 'Express'],
          connections: ['Inventory Database', 'Supplier API Integrations'],
        },
        {
          name: 'Recommendation Service',
          type: 'service',
          technologies: ['Python', 'Flask', 'TensorFlow'],
          connections: ['Analytics Database', 'Content Database'],
        },
        {
          name: 'In-Trip Experience Service',
          type: 'service',
          technologies: ['Node.js', 'Express'],
          connections: ['Content Database', 'Location Service', 'Notification Service'],
        },
        {
          name: 'CRM Service',
          type: 'service',
          technologies: ['Node.js', 'Express'],
          connections: ['User Database', 'CRM Integration'],
        },
        {
          name: 'Analytics Service',
          type: 'service',
          technologies: ['Python', 'Pandas', 'Node.js'],
          connections: ['Analytics Database'],
        },
        {
          name: 'Payment Service',
          type: 'service',
          technologies: ['Node.js', 'Express'],
          connections: ['Transactional Database', 'Payment Gateway Integration'],
        },
        {
          name: 'Notification Service',
          type: 'service',
          technologies: ['Node.js', 'Express'],
          connections: ['User Database', 'Notification Templates'],
        },
        {
          name: 'Location Service',
          type: 'service',
          technologies: ['Node.js', 'Express'],
          connections: ['Content Database', 'Maps API Integration'],
        },
        {
          name: 'User Database',
          type: 'database',
          technologies: ['PostgreSQL'],
          connections: [],
        },
        {
          name: 'Content Database',
          type: 'database',
          technologies: ['MongoDB'],
          connections: [],
        },
        {
          name: 'Inventory Database',
          type: 'database',
          technologies: ['PostgreSQL'],
          connections: [],
        },
        {
          name: 'Transactional Database',
          type: 'database',
          technologies: ['PostgreSQL'],
          connections: [],
        },
        {
          name: 'Analytics Database',
          type: 'database',
          technologies: ['BigQuery'],
          connections: [],
        },
        {
          name: 'Supplier API Integrations',
          type: 'external',
          technologies: ['RESTful APIs', 'SOAP APIs'],
          connections: [],
        },
        {
          name: 'Content API Integrations',
          type: 'external',
          technologies: ['RESTful APIs'],
          connections: [],
        },
        {
          name: 'Payment Gateway Integration',
          type: 'external',
          technologies: ['RESTful APIs'],
          connections: [],
        },
        {
          name: 'Maps API Integration',
          type: 'external',
          technologies: ['Google Maps APIs'],
          connections: [],
        },
        {
          name: 'CRM Integration',
          type: 'external',
          technologies: ['RESTful APIs'],
          connections: [],
        },
      ],
      flows: [
        {
          from: 'Traveler Web Portal',
          to: 'API Gateway',
          name: 'Trip planning',
        },
        {
          from: 'Traveler Mobile App',
          to: 'API Gateway',
          name: 'On-the-go access',
        },
        {
          from: 'Agent Dashboard',
          to: 'API Gateway',
          name: 'Agent assistance',
        },
        {
          from: 'API Gateway',
          to: 'Auth Service',
          name: 'Authentication',
        },
        {
          from: 'API Gateway',
          to: 'Trip Planning Service',
          name: 'Itinerary creation',
        },
        {
          from: 'Trip Planning Service',
          to: 'Recommendation Service',
          name: 'Personalization',
        },
        {
          from: 'Trip Planning Service',
          to: 'Content Service',
          name: 'Destination content',
        },
        {
          from: 'Trip Planning Service',
          to: 'Inventory Service',
          name: 'Availability check',
        },
        {
          from: 'API Gateway',
          to: 'Booking Service',
          name: 'Reservation creation',
        },
        {
          from: 'Booking Service',
          to: 'Payment Service',
          name: 'Payment processing',
        },
        {
          from: 'Booking Service',
          to: 'Notification Service',
          name: 'Booking confirmation',
        },
        {
          from: 'API Gateway',
          to: 'In-Trip Experience Service',
          name: 'Travel journey management',
        },
        {
          from: 'In-Trip Experience Service',
          to: 'Location Service',
          name: 'Geo-based recommendations',
        },
        {
          from: 'Content Service',
          to: 'Content API Integrations',
          name: 'External content',
        },
        {
          from: 'Inventory Service',
          to: 'Supplier API Integrations',
          name: 'Supplier inventory',
        },
      ],
      highlights: [
        {
          title: 'AI-Powered Itinerary Generator',
          description:
            'Machine learning algorithms that analyze user preferences, travel trends, and contextual factors to create personalized travel experiences.',
          icon: 'Brain',
        },
        {
          title: 'Dynamic Packaging Engine',
          description:
            'Real-time bundling of flights, accommodations, activities, and transportation with optimal pricing and availability.',
          icon: 'Package',
        },
        {
          title: 'Adaptive Travel Companion',
          description:
            'In-trip mobile app that adapts recommendations based on real-time factors like weather, crowds, and traveler feedback.',
          icon: 'Compass',
        },
        {
          title: 'Multi-Supplier Integration',
          description:
            'Unified API layer connecting to hundreds of travel suppliers for comprehensive inventory and competitive pricing.',
          icon: 'Link',
        },
      ],
      keyFeatures: [
        {
          name: 'Preference-Based Planning',
          description:
            'Smart questionnaires and preference learning to understand traveler interests, pace, and style for personalized recommendations.',
          icon: 'Heart',
        },
        {
          name: 'Dynamic Itineraries',
          description:
            'Flexible schedules that adapt to changes, delays, or new opportunities during the journey with automated rescheduling.',
          icon: 'Calendar',
        },
        {
          name: 'Local Experience Integration',
          description:
            'Curated selection of authentic local experiences and hidden gems beyond typical tourist attractions.',
          icon: 'MapPin',
        },
        {
          name: 'Travel Memory Capture',
          description:
            'Integrated tools for documenting trips with photos, notes, and location data to create rich travel memories and shareable content.',
          icon: 'Camera',
        },
      ],
    },
    metaData: {
      title: 'Personalized Travel Experience Platform | SolveJet Case Study',
      description:
        'How SolveJet helped a global tour operator increase booking conversions by 49% with an AI-driven travel experience platform for personalized itineraries.',
      keywords: [
        'travel technology',
        'personalized itineraries',
        'AI travel planning',
        'tour operator platform',
        'case study',
      ],
    },
  },

  // Manufacturing Case Study
{
  id: 'manufacturing-automation-platform',
  slug: 'manufacturing-automation-platform',
  title: 'Smart Manufacturing Automation Platform',
  overview:
    'Developed a comprehensive manufacturing automation platform for a leading industrial manufacturer, optimizing production workflows, reducing downtime by 42%, and increasing overall operational efficiency by 35%.',
  industry: 'Manufacturing',
  duration: '14 months',
  services: [
    'Custom Software Development',
    'Process Automation',
    'Predictive Analytics',
    'Systems Integration',
  ],
  coverImage: {
    src: '/images/case-studies/manufacturing-automation.jpeg',
    alt: 'Manufacturing automation platform dashboard showing production metrics and workflow optimization',
  },
  challenge:
    'The client, a major industrial manufacturer with facilities across three continents, was struggling with disconnected legacy systems, manual production tracking, and reactive maintenance practices. This resulted in costly downtime, quality control issues, and inefficient resource allocation.',
  approach:
    'We conducted extensive on-site assessments at key manufacturing facilities to understand existing workflows, pain points, and integration requirements. Working closely with production managers, engineers, and C-level executives, we developed a phased digital transformation strategy.',
  solution:
    'We built a centralized manufacturing automation platform that digitizes production workflows, connects disparate systems, and provides real-time visibility across the entire manufacturing operation. The platform includes modules for production scheduling, quality control, predictive maintenance, and performance analytics.',
  results: {
    summary:
      'The platform reduced unplanned downtime by 42%, increased production capacity by 35%, improved first-pass quality by 27%, and enabled data-driven decision making that shortened time-to-market for new products by 29%.',
    metrics: [
      {
        label: 'Downtime Reduction',
        value: '42%',
        description: 'Decrease in unplanned production stops',
        icon: 'Activity',
        color: 'green',
      },
      {
        label: 'Efficiency Gain',
        value: '35%',
        description: 'Increase in overall production efficiency',
        icon: 'TrendingUp',
        color: 'blue',
      },
      {
        label: 'Quality Improvement',
        value: '27%',
        description: 'Higher first-pass quality rate',
        icon: 'CheckCircle',
        color: 'purple',
      },
      {
        label: 'Time-to-Market',
        value: '29%',
        description: 'Faster product development cycles',
        icon: 'Clock',
        color: 'amber',
      },
    ],
  },
  architecture: {
    description:
      'The platform uses a modern, scalable architecture with a React-based frontend, .NET Core microservices backend, SQL Server for transactional data, and a time-series database for high-speed sensor data collection. Edge computing enables offline capabilities at production facilities.',
    technologies: [
      {
        name: 'React',
        icon: 'Code',
        description: 'Frontend framework',
        category: 'frontend',
      },
      {
        name: '.NET Core',
        icon: 'Server',
        description: 'Backend services',
        category: 'backend',
      },
      {
        name: 'SQL Server',
        icon: 'Database',
        description: 'Relational database',
        category: 'database',
      },
      {
        name: 'TimescaleDB',
        icon: 'Database',
        description: 'Time-series database',
        category: 'database',
      },
      {
        name: 'RabbitMQ',
        icon: 'MessageSquare',
        description: 'Message broker',
        category: 'infrastructure',
      },
      {
        name: 'Docker',
        icon: 'Box',
        description: 'Containerization',
        category: 'infrastructure',
      },
      {
        name: 'Kubernetes',
        icon: 'Grid',
        description: 'Container orchestration',
        category: 'infrastructure',
      },
      {
        name: 'Azure',
        icon: 'Cloud',
        description: 'Cloud infrastructure',
        category: 'cloud',
      },
    ],
    components: [
      {
        name: 'Operations Dashboard',
        type: 'client',
        technologies: ['React', 'Redux', 'Material UI'],
        connections: ['API Gateway', 'Authentication Service', 'Reporting Service'],
      },
      {
        name: 'Supervisor Console',
        type: 'client',
        technologies: ['React', 'WebSockets'],
        connections: ['API Gateway', 'Production Service', 'Quality Service'],
      },
      {
        name: 'Operator Interface',
        type: 'client',
        technologies: ['React', 'Electron'],
        connections: ['Edge Gateway', 'Production Service'],
      },
      {
        name: 'Mobile App',
        type: 'client',
        technologies: ['React Native', 'Redux'],
        connections: ['API Gateway', 'Notification Service'],
      },
      {
        name: 'API Gateway',
        type: 'service',
        technologies: ['.NET Core', 'Ocelot'],
        connections: [
          'Authentication Service',
          'Production Service',
          'Quality Service',
          'Maintenance Service',
          'Analytics Service',
        ],
      },
      {
        name: 'Edge Gateway',
        type: 'service',
        technologies: ['.NET Core', 'gRPC'],
        connections: ['Machine Interface Service', 'Data Collection Service', 'Local Cache'],
      },
      {
        name: 'Authentication Service',
        type: 'service',
        technologies: ['.NET Core', 'Identity Server'],
        connections: ['User Database'],
      },
      {
        name: 'Production Service',
        type: 'service',
        technologies: ['.NET Core', 'Entity Framework'],
        connections: ['Production Database', 'Scheduling Service', 'ERP Integration'],
      },
      {
        name: 'Quality Service',
        type: 'service',
        technologies: ['.NET Core', 'Entity Framework'],
        connections: ['Quality Database', 'Inspection Service', 'Defect Analysis Service'],
      },
      {
        name: 'Maintenance Service',
        type: 'service',
        technologies: ['.NET Core', 'Entity Framework'],
        connections: ['Maintenance Database', 'Predictive Maintenance Service', 'CMMS Integration'],
      },
      {
        name: 'Analytics Service',
        type: 'service',
        technologies: ['.NET Core', 'ML.NET'],
        connections: ['Data Warehouse', 'Reporting Service'],
      },
      {
        name: 'Machine Interface Service',
        type: 'service',
        technologies: ['.NET Core', 'OPC UA', 'Modbus'],
        connections: ['Local Cache', 'Data Collection Service'],
      },
      {
        name: 'Data Collection Service',
        type: 'service',
        technologies: ['.NET Core', 'SignalR'],
        connections: ['Local Cache', 'Time Series Database'],
      },
      {
        name: 'Scheduling Service',
        type: 'service',
        technologies: ['.NET Core', 'Quartz.NET'],
        connections: ['Production Database', 'Resource Service'],
      },
      {
        name: 'Resource Service',
        type: 'service',
        technologies: ['.NET Core', 'Entity Framework'],
        connections: ['Resource Database', 'Production Database'],
      },
      {
        name: 'Inspection Service',
        type: 'service',
        technologies: ['.NET Core', 'Computer Vision APIs'],
        connections: ['Quality Database', 'Defect Analysis Service'],
      },
      {
        name: 'Defect Analysis Service',
        type: 'service',
        technologies: ['.NET Core', 'ML.NET'],
        connections: ['Quality Database', 'Analytics Service'],
      },
      {
        name: 'Predictive Maintenance Service',
        type: 'service',
        technologies: ['.NET Core', 'ML.NET', 'Python'],
        connections: ['Maintenance Database', 'Time Series Database', 'Notification Service'],
      },
      {
        name: 'Notification Service',
        type: 'service',
        technologies: ['.NET Core', 'SignalR', 'SendGrid'],
        connections: ['User Database'],
      },
      {
        name: 'Reporting Service',
        type: 'service',
        technologies: ['.NET Core', 'SQL Server Reporting'],
        connections: ['Data Warehouse'],
      },
      {
        name: 'User Database',
        type: 'database',
        technologies: ['SQL Server'],
        connections: [],
      },
      {
        name: 'Production Database',
        type: 'database',
        technologies: ['SQL Server'],
        connections: [],
      },
      {
        name: 'Quality Database',
        type: 'database',
        technologies: ['SQL Server'],
        connections: [],
      },
      {
        name: 'Maintenance Database',
        type: 'database',
        technologies: ['SQL Server'],
        connections: [],
      },
      {
        name: 'Resource Database',
        type: 'database',
        technologies: ['SQL Server'],
        connections: [],
      },
      {
        name: 'Time Series Database',
        type: 'database',
        technologies: ['TimescaleDB'],
        connections: [],
      },
      {
        name: 'Data Warehouse',
        type: 'database',
        technologies: ['Azure Synapse'],
        connections: [],
      },
      {
        name: 'Local Cache',
        type: 'database',
        technologies: ['SQLite', 'Redis'],
        connections: [],
      },
      {
        name: 'ERP Integration',
        type: 'external',
        technologies: ['REST APIs', 'SOAP APIs'],
        connections: [],
      },
      {
        name: 'CMMS Integration',
        type: 'external',
        technologies: ['REST APIs'],
        connections: [],
      },
    ],
    flows: [
      {
        from: 'Operations Dashboard',
        to: 'API Gateway',
        name: 'Management monitoring',
      },
      {
        from: 'Supervisor Console',
        to: 'API Gateway',
        name: 'Production supervision',
      },
      {
        from: 'Operator Interface',
        to: 'Edge Gateway',
        name: 'Machine operation',
      },
      {
        from: 'Mobile App',
        to: 'API Gateway',
        name: 'Remote monitoring',
      },
      {
        from: 'API Gateway',
        to: 'Authentication Service',
        name: 'User authentication',
      },
      {
        from: 'API Gateway',
        to: 'Production Service',
        name: 'Production operations',
      },
      {
        from: 'API Gateway',
        to: 'Quality Service',
        name: 'Quality control',
      },
      {
        from: 'API Gateway',
        to: 'Maintenance Service',
        name: 'Maintenance management',
      },
      {
        from: 'API Gateway',
        to: 'Analytics Service',
        name: 'Performance analysis',
      },
      {
        from: 'Edge Gateway',
        to: 'Machine Interface Service',
        name: 'Machine communication',
      },
      {
        from: 'Machine Interface Service',
        to: 'Data Collection Service',
        name: 'Sensor data collection',
      },
      {
        from: 'Data Collection Service',
        to: 'Time Series Database',
        name: 'Time series storage',
      },
      {
        from: 'Production Service',
        to: 'Scheduling Service',
        name: 'Production scheduling',
      },
      {
        from: 'Scheduling Service',
        to: 'Resource Service',
        name: 'Resource allocation',
      },
      {
        from: 'Quality Service',
        to: 'Inspection Service',
        name: 'Quality inspection',
      },
      {
        from: 'Inspection Service',
        to: 'Defect Analysis Service',
        name: 'Defect identification',
      },
      {
        from: 'Maintenance Service',
        to: 'Predictive Maintenance Service',
        name: 'Maintenance prediction',
      },
      {
        from: 'Predictive Maintenance Service',
        to: 'Notification Service',
        name: 'Maintenance alerts',
      },
      {
        from: 'Analytics Service',
        to: 'Reporting Service',
        name: 'Report generation',
      },
      {
        from: 'Production Service',
        to: 'ERP Integration',
        name: 'ERP synchronization',
      },
      {
        from: 'Maintenance Service',
        to: 'CMMS Integration',
        name: 'CMMS synchronization',
      },
    ],
    highlights: [
      {
        title: 'Digital Production Workflow',
        description:
          'End-to-end digitization of production processes from scheduling to execution and quality control, eliminating paper-based workflows and manual data entry.',
        icon: 'FileText',
      },
      {
        title: 'Predictive Maintenance System',
        description:
          'Advanced algorithms that analyze historical and real-time machine data to predict potential failures before they occur, enabling proactive maintenance scheduling.',
        icon: 'Tool',
      },
      {
        title: 'Integrated Quality Control',
        description:
          'Automated inspection and defect detection system that integrates with production workflows to ensure real-time quality assurance and traceability.',
        icon: 'Shield',
      },
      {
        title: 'Manufacturing Intelligence',
        description:
          'Comprehensive analytics platform that transforms production data into actionable insights for continuous improvement of efficiency, quality, and resource utilization.',
        icon: 'BarChart',
      },
    ],
    keyFeatures: [
      {
        name: 'Production Scheduling',
        description:
          'AI-assisted scheduling that optimizes machine usage, worker allocation, and material flow based on order priorities and resource availability.',
        icon: 'Calendar',
      },
      {
        name: 'Digital Work Instructions',
        description:
          'Step-by-step visual guidance for operators with dynamic adjustments based on product variants and process changes.',
        icon: 'List',
      },
      {
        name: 'Real-time Performance Tracking',
        description:
          'Live monitoring of OEE (Overall Equipment Effectiveness), cycle times, and production targets with automated alerts for deviations.',
        icon: 'Activity',
      },
      {
        name: 'Quality Traceability',
        description:
          'End-to-end tracking of components, assemblies, and products with full chain of custody and quality test results throughout the manufacturing process.',
        icon: 'Search',
      },
    ],
  },
  metaData: {
    title: 'Smart Manufacturing Automation Platform | SolveJet Case Study',
    description:
      'How SolveJet helped a leading industrial manufacturer increase efficiency by 35% and reduce downtime by 42% with a comprehensive manufacturing automation platform.',
    keywords: [
      'manufacturing automation',
      'digital transformation',
      'predictive maintenance',
      'production optimization',
      'case study',
    ],
  },
},

// Logistics Case Study
{
  id: 'logistics-optimization-platform',
  slug: 'logistics-optimization-platform',
  title: 'Advanced Logistics Optimization Platform',
  overview:
    'Created an end-to-end logistics optimization platform for a global shipping and freight company, reducing transportation costs by 23% and delivery times by 31% through intelligent routing and load optimization.',
  industry: 'Logistics',
  duration: '13 months',
  services: [
    'Custom Software Development',
    'AI & Machine Learning',
    'Route Optimization',
    'Fleet Management',
  ],
  coverImage: {
    src: '/images/case-studies/logistics-optimization.jpeg',
    alt: 'Logistics optimization platform showing route planning and fleet management dashboard',
  },
  challenge:
    'The client, a global logistics provider, was facing intensifying competition and margin pressure. Their operations relied on fragmented systems, manual planning processes, and reactive decision-making, resulting in suboptimal routes, underutilized assets, and inconsistent delivery performance.',
  approach:
    'We began with a comprehensive analysis of the client`s existing logistics network, operational processes, and data architecture. Working with dispatchers, drivers, and executives, we identified key optimization opportunities and designed a platform that could adapt to the dynamic nature of modern logistics.',
  solution:
    'We developed an integrated logistics optimization platform that uses advanced algorithms to optimize routing, load planning, and resource allocation in real-time. The system integrates with existing TMS and WMS solutions while adding predictive capabilities for proactive decision-making.',
  results: {
    summary:
      'The platform reduced transportation costs by 23%, cut delivery times by 31%, increased vehicle utilization by 27%, and improved on-time delivery rates from 82% to 97%, resulting in significantly higher customer satisfaction and retention.',
    metrics: [
      {
        label: 'Cost Reduction',
        value: '23%',
        description: 'Decrease in transportation costs',
        icon: 'DollarSign',
        color: 'green',
      },
      {
        label: 'Delivery Speed',
        value: '31%',
        description: 'Improvement in average delivery time',
        icon: 'Clock',
        color: 'blue',
      },
      {
        label: 'Asset Utilization',
        value: '27%',
        description: 'Increase in vehicle capacity utilization',
        icon: 'Truck',
        color: 'amber',
      },
      {
        label: 'On-Time Delivery',
        value: '97%',
        description: 'Improved from 82% previously',
        icon: 'CheckCircle',
        color: 'purple',
      },
    ],
  },
  architecture: {
    description:
      'The platform uses a cloud-native architecture with React for the front-end, microservices built with Java Spring and Python, and a combination of PostgreSQL and MongoDB for different data needs. Edge computing enables offline operation for drivers.',
    technologies: [
      {
        name: 'React',
        icon: 'Code',
        description: 'Frontend framework',
        category: 'frontend',
      },
      {
        name: 'Java Spring Boot',
        icon: 'Server',
        description: 'Backend services',
        category: 'backend',
      },
      {
        name: 'Python',
        icon: 'Terminal',
        description: 'Optimization algorithms',
        category: 'backend',
      },
      {
        name: 'PostgreSQL',
        icon: 'Database',
        description: 'Relational database',
        category: 'database',
      },
      {
        name: 'MongoDB',
        icon: 'Database',
        description: 'Document database',
        category: 'database',
      },
      {
        name: 'Redis',
        icon: 'Database',
        description: 'In-memory database',
        category: 'database',
      },
      {
        name: 'Kafka',
        icon: 'MessageSquare',
        description: 'Event streaming',
        category: 'infrastructure',
      },
      {
        name: 'AWS',
        icon: 'Cloud',
        description: 'Cloud infrastructure',
        category: 'cloud',
      },
    ],
    components: [
      {
        name: 'Dispatch Dashboard',
        type: 'client',
        technologies: ['React', 'Redux', 'Mapbox GL'],
        connections: ['API Gateway', 'Route Planning Service', 'Fleet Management Service'],
      },
      {
        name: 'Driver App',
        type: 'client',
        technologies: ['React Native', 'Redux', 'Mapbox GL'],
        connections: ['API Gateway', 'Navigation Service', 'Delivery Management Service'],
      },
      {
        name: 'Customer Portal',
        type: 'client',
        technologies: ['React', 'Redux'],
        connections: ['API Gateway', 'Order Service', 'Tracking Service'],
      },
      {
        name: 'Analytics Dashboard',
        type: 'client',
        technologies: ['React', 'D3.js', 'Material UI'],
        connections: ['API Gateway', 'Analytics Service'],
      },
      {
        name: 'API Gateway',
        type: 'service',
        technologies: ['Spring Cloud Gateway', 'OAuth2'],
        connections: [
          'Authentication Service',
          'Order Service',
          'Route Planning Service',
          'Fleet Management Service',
          'Delivery Management Service',
        ],
      },
      {
        name: 'Authentication Service',
        type: 'service',
        technologies: ['Spring Security', 'JWT'],
        connections: ['User Database'],
      },
      {
        name: 'Order Service',
        type: 'service',
        technologies: ['Spring Boot', 'JPA'],
        connections: ['Order Database', 'Billing Service', 'TMS Integration'],
      },
      {
        name: 'Route Planning Service',
        type: 'service',
        technologies: ['Python', 'OR-Tools'],
        connections: ['Order Database', 'Vehicle Database', 'Location Database', 'Weather Service'],
      },
      {
        name: 'Fleet Management Service',
        type: 'service',
        technologies: ['Spring Boot', 'JPA'],
        connections: ['Vehicle Database', 'Maintenance Service', 'Tracking Service'],
      },
      {
        name: 'Delivery Management Service',
        type: 'service',
        technologies: ['Spring Boot', 'JPA'],
        connections: ['Order Database', 'Tracking Service', 'Notification Service'],
      },
      {
        name: 'Navigation Service',
        type: 'service',
        technologies: ['Java', 'Spring Boot', 'Mapbox API'],
        connections: ['Location Database', 'Traffic Service'],
      },
      {
        name: 'Tracking Service',
        type: 'service',
        technologies: ['Spring Boot', 'WebSockets'],
        connections: ['Location Database', 'Notification Service'],
      },
      {
        name: 'Load Optimization Service',
        type: 'service',
        technologies: ['Python', 'OR-Tools'],
        connections: ['Order Database', 'Vehicle Database'],
      },
      {
        name: 'Maintenance Service',
        type: 'service',
        technologies: ['Spring Boot', 'JPA'],
        connections: ['Vehicle Database', 'Notification Service'],
      },
      {
        name: 'Analytics Service',
        type: 'service',
        technologies: ['Python', 'Pandas', 'Spring Boot'],
        connections: ['Data Warehouse', 'Reporting Service'],
      },
      {
        name: 'Billing Service',
        type: 'service',
        technologies: ['Spring Boot', 'JPA'],
        connections: ['Order Database', 'Financial Database', 'ERP Integration'],
      },
      {
        name: 'Notification Service',
        type: 'service',
        technologies: ['Spring Boot', 'Twilio', 'SendGrid'],
        connections: ['User Database', 'Template Database'],
      },
      {
        name: 'Traffic Service',
        type: 'service',
        technologies: ['Python', 'Flask', 'TomTom API'],
        connections: ['Redis Cache'],
      },
      {
        name: 'Weather Service',
        type: 'service',
        technologies: ['Python', 'Flask', 'OpenWeather API'],
        connections: ['Redis Cache'],
      },
      {
        name: 'Reporting Service',
        type: 'service',
        technologies: ['Spring Boot', 'Jasper Reports'],
        connections: ['Data Warehouse'],
      },
      {
        name: 'User Database',
        type: 'database',
        technologies: ['PostgreSQL'],
        connections: [],
      },
      {
        name: 'Order Database',
        type: 'database',
        technologies: ['PostgreSQL'],
        connections: [],
      },
      {
        name: 'Vehicle Database',
        type: 'database',
        technologies: ['PostgreSQL'],
        connections: [],
      },
      {
        name: 'Location Database',
        type: 'database',
        technologies: ['MongoDB', 'PostGIS'],
        connections: [],
      },
      {
        name: 'Financial Database',
        type: 'database',
        technologies: ['PostgreSQL'],
        connections: [],
      },
      {
        name: 'Template Database',
        type: 'database',
        technologies: ['MongoDB'],
        connections: [],
      },
      {
        name: 'Data Warehouse',
        type: 'database',
        technologies: ['Amazon Redshift'],
        connections: [],
      },
      {
        name: 'Redis Cache',
        type: 'database',
        technologies: ['Redis'],
        connections: [],
      },
      {
        name: 'TMS Integration',
        type: 'external',
        technologies: ['REST APIs', 'SOAP APIs'],
        connections: [],
      },
      {
        name: 'ERP Integration',
        type: 'external',
        technologies: ['REST APIs'],
        connections: [],
      },
    ],
    flows: [
      {
        from: 'Dispatch Dashboard',
        to: 'API Gateway',
        name: 'Logistics planning',
      },
      {
        from: 'Driver App',
        to: 'API Gateway',
        name: 'Delivery execution',
      },
      {
        from: 'Customer Portal',
        to: 'API Gateway',
        name: 'Order management',
      },
      {
        from: 'Analytics Dashboard',
        to: 'API Gateway',
        name: 'Performance analysis',
      },
      {
        from: 'API Gateway',
        to: 'Authentication Service',
        name: 'User authentication',
      },
      {
        from: 'API Gateway',
        to: 'Order Service',
        name: 'Order processing',
      },
      {
        from: 'API Gateway',
        to: 'Route Planning Service',
        name: 'Route optimization',
      },
      {
        from: 'API Gateway',
        to: 'Fleet Management Service',
        name: 'Fleet operations',
      },
      {
        from: 'API Gateway',
        to: 'Delivery Management Service',
        name: 'Delivery execution',
      },
      {
        from: 'Route Planning Service',
        to: 'Weather Service',
        name: 'Weather impact analysis',
      },
      {
        from: 'Route Planning Service',
        to: 'Load Optimization Service',
        name: 'Cargo optimization',
      },
      {
        from: 'Navigation Service',
        to: 'Traffic Service',
        name: 'Real-time traffic data',
      },
      {
        from: 'Fleet Management Service',
        to: 'Maintenance Service',
        name: 'Preventive maintenance',
      },
      {
        from: 'Fleet Management Service',
        to: 'Tracking Service',
        name: 'Vehicle location tracking',
      },
      {
        from: 'Delivery Management Service',
        to: 'Notification Service',
        name: 'Customer notifications',
      },
      {
        from: 'Order Service',
        to: 'Billing Service',
        name: 'Invoice generation',
      },
      {
        from: 'Order Service',
        to: 'TMS Integration',
        name: 'TMS synchronization',
      },
      {
        from: 'Billing Service',
        to: 'ERP Integration',
        name: 'Financial reconciliation',
      },
      {
        from: 'Analytics Service',
        to: 'Reporting Service',
        name: 'Performance reporting',
      },
    ],
    highlights: [
      {
        title: 'Dynamic Route Optimization',
        description:
          'Advanced algorithms that optimize delivery routes in real-time based on orders, traffic conditions, weather, and vehicle capacity to minimize costs and delivery times.',
        icon: 'Map',
      },
      {
        title: 'Intelligent Load Planning',
        description:
          'Automated cargo loading optimization that maximizes vehicle utilization while considering weight distribution, handling requirements, and delivery sequence.',
        icon: 'Package',
      },
      {
        title: 'Real-time Visibility',
        description:
          'End-to-end tracking of shipments from pickup to delivery with precise ETA predictions and automatic notifications for stakeholders at every stage.',
        icon: 'Eye',
      },
      {
        title: 'Predictive Analytics',
        description:
          'Data-driven forecasting of demand patterns, capacity needs, and potential disruptions to enable proactive decision-making and resource planning.',
        icon: 'TrendingUp',
      },
    ],
    keyFeatures: [
      {
        name: 'Multi-modal Transportation Planning',
        description:
          'Integrated planning across trucking, rail, sea, and air freight with optimal mode selection based on cost, time, and sustainability objectives.',
        icon: 'Truck',
      },
      {
        name: 'Dynamic Scheduling',
        description:
          'Automated scheduling that adapts to real-time events, adjusting delivery sequences and driver assignments to maintain efficiency despite disruptions.',
        icon: 'Calendar',
      },
      {
        name: 'Last-mile Optimization',
        description:
          'Specialized routing for urban deliveries with consideration for traffic patterns, access restrictions, parking availability, and delivery time windows.',
        icon: 'Navigation',
      },
      {
        name: 'Performance Benchmarking',
        description:
          'Comprehensive analytics comparing operational performance against industry benchmarks and historical data to identify improvement opportunities.',
        icon: 'BarChart2',
      },
    ],
  },
  metaData: {
    title: 'Advanced Logistics Optimization Platform | SolveJet Case Study',
    description:
      'How SolveJet helped a global logistics provider reduce transportation costs by 23% and delivery times by 31% with an intelligent optimization platform.',
    keywords: [
      'logistics optimization',
      'route planning',
      'freight management',
      'supply chain technology',
      'case study',
    ],
  },
}
];

// Helper function to get a single case study by slug
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(caseStudy => caseStudy.slug === slug);
}

// Helper function to get all case study slugs
export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map(caseStudy => caseStudy.slug);
}

// Helper function to get all case studies
export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

// Helper function to get case studies by industry
export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return caseStudies.filter(caseStudy => caseStudy.industry === industry);
}

// Export the case studies for use in other files
export default caseStudies;
