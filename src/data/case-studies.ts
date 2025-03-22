// src/data/case-studies.ts
import type { CaseStudy } from '@/types/case-study';

// Mock case studies data
const caseStudies: CaseStudy[] = [
  // Financial Services Case Study
  {
    id: 'fintech-banking-platform',
    slug: 'fintech-banking-platform',
    title: 'Digital Banking Platform Transformation',
    overview:
      'Helped a leading financial institution transform their legacy banking platform into a modern, user-friendly digital experience that increased customer engagement by 35%.',
    industry: 'Financial Services',
    duration: '8 months',
    services: ['UI/UX Design', 'Full-stack Development', 'Cloud Migration', 'DevOps'],
    coverImage: {
      src: '/images/case-studies/fintech-banking.jpg',
      alt: 'Digital banking platform dashboard on multiple devices',
    },
    challenge:
      "The client was facing increasing customer churn due to an outdated banking platform with poor user experience. Their legacy system was difficult to maintain and couldn't support modern features that customers expected.",
    approach:
      'We followed a user-centered design approach combined with agile development. Starting with extensive user research, we identified pain points in the existing system and created a comprehensive roadmap for the transformation.',
    solution:
      'We developed a modern, responsive digital banking platform that provides a seamless experience across all devices. The solution included a customer-facing application, admin portal, and a secure API gateway for third-party integrations.',
    results: {
      summary:
        'The new platform led to a 35% increase in user engagement, 28% reduction in customer service calls, and enabled the client to launch new services 3x faster than before.',
      metrics: [
        {
          label: 'Increased Engagement',
          value: '35%',
          description: 'Growth in active users and session time',
          icon: 'TrendingUp',
          color: 'green',
        },
        {
          label: 'Reduced Support Calls',
          value: '28%',
          description: 'Decreased customer service inquiries',
          icon: 'MessageSquare',
          color: 'blue',
        },
        {
          label: 'Faster Time to Market',
          value: '3x',
          description: 'Acceleration in new feature deployment',
          icon: 'Zap',
          color: 'amber',
        },
        {
          label: 'Mobile Adoption',
          value: '62%',
          description: 'Users primarily accessing via mobile',
          icon: 'Smartphone',
          color: 'purple',
        },
      ],
    },
    architecture: {
      description:
        'The architecture uses a microservices approach with a React frontend, Node.js backend services, and a mix of SQL and NoSQL databases. All components are deployed on AWS with CI/CD automation.',
      technologies: [
        {
          name: 'React',
          icon: 'Code',
          description: 'Frontend UI library',
          category: 'frontend',
        },
        {
          name: 'Node.js',
          icon: 'Server',
          description: 'Backend runtime',
          category: 'backend',
        },
        {
          name: 'MongoDB',
          icon: 'Database',
          description: 'NoSQL database',
          category: 'database',
        },
        {
          name: 'PostgreSQL',
          icon: 'Database',
          description: 'Relational database',
          category: 'database',
        },
        {
          name: 'AWS API Gateway',
          icon: 'CloudCog',
          description: 'API management',
          category: 'cloud',
        },
        {
          name: 'AWS Lambda',
          icon: 'CloudCog',
          description: 'Serverless compute',
          category: 'cloud',
        },
        {
          name: 'Docker',
          icon: 'Box',
          description: 'Containerization',
          category: 'infrastructure',
        },
        {
          name: 'Kubernetes',
          icon: 'Box',
          description: 'Container orchestration',
          category: 'infrastructure',
        },
      ],
      components: [
        {
          name: 'Customer Web App',
          type: 'client',
          technologies: ['React', 'Redux', 'TypeScript'],
          connections: ['API Gateway', 'Authentication Service'],
        },
        {
          name: 'Mobile App',
          type: 'client',
          technologies: ['React Native', 'TypeScript'],
          connections: ['API Gateway', 'Authentication Service'],
        },
        {
          name: 'API Gateway',
          type: 'service',
          technologies: ['AWS API Gateway', 'Lambda'],
          connections: [
            'Authentication Service',
            'Account Service',
            'Transaction Service',
            'Notification Service',
          ],
        },
        {
          name: 'Authentication Service',
          type: 'service',
          technologies: ['Node.js', 'JWT', 'OAuth'],
          connections: ['User Database', 'Account Service'],
        },
        {
          name: 'Account Service',
          type: 'service',
          technologies: ['Node.js', 'Express'],
          connections: ['Account Database', 'Transaction Service'],
        },
        {
          name: 'Transaction Service',
          type: 'service',
          technologies: ['Node.js', 'Express'],
          connections: ['Transaction Database', 'Notification Service'],
        },
        {
          name: 'Notification Service',
          type: 'service',
          technologies: ['Node.js', 'AWS SES', 'AWS SNS'],
          connections: ['User Database'],
        },
        {
          name: 'User Database',
          type: 'database',
          technologies: ['MongoDB'],
          connections: [],
        },
        {
          name: 'Account Database',
          type: 'database',
          technologies: ['PostgreSQL'],
          connections: [],
        },
        {
          name: 'Transaction Database',
          type: 'database',
          technologies: ['PostgreSQL'],
          connections: [],
        },
        {
          name: 'Admin Portal',
          type: 'client',
          technologies: ['React', 'TypeScript'],
          connections: ['API Gateway', 'Authentication Service'],
        },
      ],
      flows: [
        {
          from: 'Customer Web App',
          to: 'API Gateway',
          name: 'User requests',
        },
        {
          from: 'Mobile App',
          to: 'API Gateway',
          name: 'User requests',
        },
        {
          from: 'API Gateway',
          to: 'Authentication Service',
          name: 'Auth validation',
        },
        {
          from: 'API Gateway',
          to: 'Account Service',
          name: 'Account operations',
        },
        {
          from: 'API Gateway',
          to: 'Transaction Service',
          name: 'Transaction operations',
        },
        {
          from: 'Transaction Service',
          to: 'Notification Service',
          name: 'Transaction alerts',
        },
        {
          from: 'Authentication Service',
          to: 'User Database',
          name: 'User data',
        },
        {
          from: 'Account Service',
          to: 'Account Database',
          name: 'Account data',
        },
        {
          from: 'Transaction Service',
          to: 'Transaction Database',
          name: 'Transaction data',
        },
        {
          from: 'Admin Portal',
          to: 'API Gateway',
          name: 'Admin operations',
        },
      ],
      highlights: [
        {
          title: 'Microservices Architecture',
          description:
            'Decomposed the monolithic system into independent microservices that can be developed, deployed, and scaled separately.',
          icon: 'Server',
        },
        {
          title: 'Real-time Notifications',
          description:
            'Implemented a notification system that alerts users about account activities through multiple channels (email, SMS, push).',
          icon: 'Bell',
        },
        {
          title: 'Secure Authentication',
          description:
            'Developed a multi-factor authentication system with biometric options for enhanced security.',
          icon: 'Shield',
        },
        {
          title: 'Performance Optimization',
          description:
            'Optimized database queries and implemented caching strategies to achieve sub-second response times even under heavy load.',
          icon: 'Zap',
        },
      ],
      keyFeatures: [
        {
          name: 'Account Management',
          description:
            'Comprehensive tools for users to manage multiple accounts, set preferences, and monitor activity.',
          icon: 'Users',
        },
        {
          name: 'Transaction History',
          description:
            'Detailed transaction history with advanced filtering, search, and visualization capabilities.',
          icon: 'Activity',
        },
        {
          name: 'Bill Payments',
          description:
            'Automated bill payment system with scheduling, reminders, and confirmation notifications.',
          icon: 'Calendar',
        },
        {
          name: 'Funds Transfer',
          description:
            'Secure and instant transfer of funds between accounts, with support for domestic and international transfers.',
          icon: 'RefreshCcw',
        },
      ],
    },
    metaData: {
      title: 'Digital Banking Platform Transformation | SolveJet Case Study',
      description:
        'How SolveJet helped a leading financial institution transform their legacy banking platform and achieve a 35% increase in customer engagement.',
      keywords: [
        'digital banking',
        'fintech',
        'banking platform',
        'financial services',
        'case study',
      ],
    },
  },

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
      src: '/images/case-studies/retail-omnichannel.jpg',
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
      src: '/images/case-studies/real-estate-platform.jpg',
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
