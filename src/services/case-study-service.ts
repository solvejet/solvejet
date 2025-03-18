// src/services/case-study-service.ts
import type { CaseStudy, CaseStudySummary } from '@/types/case-study';

// Mock case study data with enhanced structure for better dynamics
const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    slug: 'ecommerce-platform-revamp',
    title: 'E-commerce Platform Transformation',
    subtitle: 'Modernizing legacy systems for a seamless shopping experience',
    industry: 'Retail & E-commerce',
    overview:
      'A major retail chain with over 500 physical stores and an online presence needed to revamp their legacy e-commerce platform to meet modern customer expectations and scale with their growing business. We delivered a comprehensive transformation that increased sales by 45% and reduced operational costs.',
    challenge:
      "The client was struggling with an outdated e-commerce platform built over a decade ago. The system was slow, difficult to maintain, and lacked modern features expected by today's consumers. Key challenges included poor mobile experience, limited payment options, slow page load times averaging 6+ seconds, and isolated data silos preventing a unified customer view.",
    approach:
      'We took a phased approach to minimize disruption while delivering continuous improvements. Our team conducted extensive analysis of the existing system, customer journeys, and business processes. We designed a microservices architecture to replace the monolithic legacy system and implemented continuous delivery pipelines to enable rapid, reliable updates.',
    solution:
      'We developed a modern, mobile-first e-commerce platform using React, Node.js, and AWS services. The solution included a headless commerce architecture with separate frontend and backend services, a robust inventory management system with real-time updates, personalized recommendation engine powered by machine learning, and seamless integration with physical stores for click-and-collect functionality.',
    solutionDetails: {
      architecture: 'Microservices with Event-Driven Architecture',
      keyFeatures: [
        'Headless commerce architecture for flexible front-end implementations',
        'Real-time inventory management across online and physical stores',
        'AI-powered personalization engine with product recommendations',
        'Omnichannel capabilities including click-and-collect and mobile app integration',
        'High-performance search with Elasticsearch and custom ranking algorithms',
        'Secure payment processing with multi-provider support',
        'Comprehensive analytics dashboard for business intelligence',
      ],
      technicalHighlights: [
        'Server-side rendering for optimal SEO and performance',
        'GraphQL API layer for efficient data fetching',
        'Redis-based caching strategy reducing database load by 70%',
        'Containerized microservices deployed on Kubernetes for scalability',
        'Event-sourcing pattern for reliable data consistency across services',
        'Blue-green deployment strategy for zero-downtime updates',
      ],
      innovativeApproaches: [
        'Predictive inventory allocation based on historical patterns',
        'Progressive Web App implementation for mobile users',
        'Feature flag system enabling targeted rollouts and A/B testing',
        'Real-time analytics pipeline for instant business insights',
        'Custom content management system tailored for retail merchandising',
      ],
      architectureDiagram: {
        layers: [
          {
            name: 'Client Layer',
            color: 'blue',
            components: [
              {
                name: 'Web App',
                description:
                  'React-based progressive web application with responsive design and offline capabilities',
                icon: 'monitor',
              },
              {
                name: 'Mobile App',
                description: 'Native iOS and Android applications with shared business logic',
                icon: 'smartphone',
              },
              {
                name: 'Partner API',
                description: 'Third-party integration endpoints with standardized access protocols',
                icon: 'link',
              },
            ],
          },
          {
            name: 'Gateway Layer',
            color: 'purple',
            components: [
              {
                name: 'API Gateway',
                description:
                  'Centralized access point for all services with request routing and transformation',
                icon: 'filter',
              },
              {
                name: 'Authentication',
                description: 'OAuth2 and JWT-based identity management with MFA support',
                icon: 'lock',
              },
              {
                name: 'Rate Limiting',
                description: 'Traffic control and DDoS protection with adaptive thresholds',
                icon: 'shield',
              },
            ],
          },
          {
            name: 'Service Layer',
            color: 'green',
            components: [
              {
                name: 'Product Service',
                description: 'Catalog and inventory management with real-time stock updates',
                icon: 'shopping-bag',
              },
              {
                name: 'Order Service',
                description: 'Order processing and fulfillment with state machine workflow',
                icon: 'clipboard',
              },
              {
                name: 'User Service',
                description: 'Customer profiles and preferences with privacy controls',
                icon: 'user',
              },
              {
                name: 'Payment Service',
                description: 'Secure payment processing with multi-provider support',
                icon: 'credit-card',
              },
              {
                name: 'Analytics Service',
                description: 'Business intelligence and reporting with predictive capabilities',
                icon: 'bar-chart',
              },
            ],
          },
          {
            name: 'Data Layer',
            color: 'yellow',
            components: [
              {
                name: 'Document Store',
                description: 'MongoDB for flexible data storage and complex queries',
                icon: 'database',
              },
              {
                name: 'Cache Layer',
                description: 'Redis for high-speed data access and distributed locking',
                icon: 'zap',
              },
              {
                name: 'Object Storage',
                description: 'S3 for media and file storage with CDN integration',
                icon: 'hard-drive',
              },
            ],
          },
          {
            name: 'DevOps Layer',
            color: 'orange',
            components: [
              {
                name: 'CI/CD Pipeline',
                description: 'Automated build, test, and deployment workflows',
                icon: 'git-branch',
              },
              {
                name: 'Monitoring',
                description: 'Real-time system health and performance tracking',
                icon: 'activity',
              },
              {
                name: 'Infrastructure as Code',
                description: 'Automated cloud resource provisioning and management',
                icon: 'code',
              },
            ],
          },
        ],
      },
    },
    results: {
      metrics: [
        {
          label: 'Increase in Mobile Sales',
          value: '+135%',
          icon: 'smartphone',
        },
        {
          label: 'Improvement in Conversion Rate',
          value: '+45%',
          icon: 'trending-up',
        },
        {
          label: 'Decrease in Page Load Time',
          value: '85%',
          icon: 'zap',
        },
        {
          label: 'Reduction in Operational Costs',
          value: '32%',
          icon: 'dollar-sign',
        },
      ],
      summary:
        "The platform transformation has revolutionized GlobalShop's digital presence, providing seamless omnichannel experiences for customers and significantly boosting business metrics across all key performance indicators.",
      keyAchievements: [
        'Successfully migrated over 2 million customer accounts without service disruption',
        'Implemented AI-driven product recommendations resulting in 28% higher average order value',
        'Reduced infrastructure costs by 42% through cloud optimization',
        'Improved developer productivity by 65% with modern DevOps practices',
      ],
    },
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'GraphQL', category: 'API' },
      { name: 'AWS', category: 'Infrastructure' },
      { name: 'Elasticsearch', category: 'Search' },
      { name: 'Redis', category: 'Caching' },
      { name: 'Docker', category: 'DevOps' },
      { name: 'Kubernetes', category: 'DevOps' },
      { name: 'TensorFlow', category: 'AI/ML' },
    ],
    implementationDetails: {
      architecture: 'Microservices',
      timeline: '9 months',
      team: '12 engineers, 2 designers, 3 product managers',
      keyFeatures: [
        'Headless commerce architecture',
        'Real-time inventory management',
        'Personalized shopping experiences',
        'Multi-region deployment',
        'Comprehensive analytics dashboard',
      ],
    },
    nextSteps: {
      title: 'Ready to Transform Your E-commerce Experience?',
      description:
        'Let us help you modernize your digital retail presence and boost your online sales.',
      cta: {
        label: 'Schedule a Consultation',
        href: '/contact',
      },
    },
    relatedCaseStudies: ['2', '3'],
    featured: true,
    coverImage: {
      src: '/images/case-studies/ecommerce-platform/cover.webp',
      alt: 'GlobalShop e-commerce platform on multiple devices',
      width: 1920,
      height: 1080,
    },
    metaData: {
      title: 'E-commerce Platform Transformation | SolveJet Case Study',
      description:
        'How SolveJet helped GlobalShop increase online sales by 45% through a complete e-commerce platform modernization',
      keywords: [
        'e-commerce',
        'platform modernization',
        'retail',
        'online sales',
        'digital transformation',
      ],
      ogImage: '/images/case-studies/ecommerce-platform/og-image.jpg',
    },
  },
  {
    id: '2',
    slug: 'healthcare-data-platform',
    title: 'Healthcare Data Integration Platform',
    subtitle: 'Unifying patient data for better care and research',
    industry: 'Healthcare',
    overview:
      'A leading healthcare provider network struggled with fragmented patient data across multiple systems. We developed a secure, compliant data integration platform that unified patient records while maintaining strict HIPAA compliance.',
    challenge:
      'The healthcare provider faced challenges with siloed patient data across different departments and facilities. This fragmentation led to inefficient care coordination, duplicate tests, and missed opportunities for medical research. They needed a solution that could integrate diverse data sources while ensuring security and regulatory compliance.',
    approach:
      'We began with a comprehensive audit of existing systems and developed a roadmap for data integration. Our team worked closely with healthcare professionals and IT staff to design a solution that met both technical and clinical requirements.',
    solution:
      'We built a secure healthcare data platform using FHIR standards for interoperability. The solution included robust patient identity management, role-based access controls, comprehensive audit logging, and advanced analytics capabilities while maintaining strict HIPAA compliance.',
    solutionDetails: {
      architecture: 'Event-Driven Microservices with FHIR Integration',
      keyFeatures: [
        'FHIR-compliant data exchange for seamless integration with existing systems',
        'Patient identity resolution across disparate systems with 99.7% accuracy',
        'Granular role-based access control with contextual permissions',
        'Comprehensive audit logging for compliance and security monitoring',
        'De-identification engine for research data with configurable anonymization levels',
        'Real-time notification system for critical clinical updates',
      ],
      technicalHighlights: [
        'HL7v2 to FHIR conversion layer for legacy system integration',
        'Consent management framework with patient-controlled data sharing',
        'Blockchain-based audit log for immutable record of data access',
        'Tiered storage architecture balancing performance and cost',
        'Real-time data validation against clinical terminology standards',
        'Automated compliance scanning for PHI/PII detection',
      ],
      innovativeApproaches: [
        'Machine learning for patient record matching across systems',
        'Natural language processing for unstructured clinical notes',
        'Predictive analytics for identifying potential care gaps',
        'API-first design enabling third-party innovation',
        'Privacy-preserving federated learning for research models',
      ],
      architectureDiagram: {
        layers: [
          {
            name: 'Interface Layer',
            color: 'blue',
            components: [
              {
                name: 'Clinical Portal',
                description:
                  'Web interface for healthcare providers with patient dashboard and treatment workflows',
                icon: 'stethoscope',
              },
              {
                name: 'Admin Dashboard',
                description:
                  'System management and configuration with audit trails and access control',
                icon: 'settings',
              },
              {
                name: 'Research Portal',
                description:
                  'De-identified data access for researchers with query builder and visualization tools',
                icon: 'search',
              },
            ],
          },
          {
            name: 'Security Layer',
            color: 'purple',
            components: [
              {
                name: 'Authentication',
                description:
                  'Multi-factor authentication system with biometric options and SSO integration',
                icon: 'key',
              },
              {
                name: 'Authorization',
                description:
                  'Role-based access control framework with dynamic permission evaluation',
                icon: 'shield',
              },
              {
                name: 'Audit System',
                description:
                  'Comprehensive activity logging with immutable record storage and alerting',
                icon: 'clipboard-list',
              },
              {
                name: 'Encryption Service',
                description: 'End-to-end data encryption for sensitive patient information',
                icon: 'lock',
              },
            ],
          },
          {
            name: 'Integration Layer',
            color: 'green',
            components: [
              {
                name: 'FHIR API',
                description: 'Standards-based data exchange with comprehensive resource support',
                icon: 'shuffle',
              },
              {
                name: 'HL7 Converter',
                description: 'Legacy system integration with bidirectional message translation',
                icon: 'refresh-cw',
              },
              {
                name: 'Consent Manager',
                description:
                  'Patient data sharing preferences with granular control and audit trails',
                icon: 'check-square',
              },
              {
                name: 'Identity Service',
                description: 'Patient record matching and resolution using ML algorithms',
                icon: 'users',
              },
              {
                name: 'Analytics Engine',
                description:
                  'Clinical insights and reporting with predictive modeling capabilities',
                icon: 'bar-chart-2',
              },
            ],
          },
          {
            name: 'Storage Layer',
            color: 'yellow',
            components: [
              {
                name: 'Clinical Database',
                description: 'Primary patient data store with strict ACID compliance',
                icon: 'database',
              },
              {
                name: 'Research Database',
                description: 'De-identified data for research with statistical anonymization',
                icon: 'table',
              },
              {
                name: 'Document Store',
                description: 'Unstructured clinical documents with full-text search capability',
                icon: 'file-text',
              },
              {
                name: 'Backup System',
                description: 'Automated backup and disaster recovery procedures',
                icon: 'hard-drive',
              },
            ],
          },
          {
            name: 'Compliance Layer',
            color: 'red',
            components: [
              {
                name: 'HIPAA Controls',
                description: 'Automated compliance checks and validation',
                icon: 'shield-check',
              },
              {
                name: 'Data Governance',
                description: 'Policy enforcement and data lineage tracking',
                icon: 'git-branch',
              },
              {
                name: 'Privacy Engine',
                description: 'Automated PII/PHI detection and protection',
                icon: 'eye-off',
              },
            ],
          },
        ],
      },
    },
    results: {
      metrics: [
        {
          label: 'Reduction in Duplicate Tests',
          value: '32%',
          icon: 'file-minus',
        },
        {
          label: 'Improvement in Care Coordination',
          value: '+48%',
          icon: 'users',
        },
        {
          label: 'Increase in Research Dataset',
          value: '3.5x',
          icon: 'database',
        },
        {
          label: 'Time Saved in Data Retrieval',
          value: '85%',
          icon: 'clock',
        },
      ],
      summary:
        'The integrated platform has revolutionized how MediCore manages patient data, enabling more efficient care coordination, better clinical decision-making, and expanded research capabilities.',
      keyAchievements: [
        'Unified patient records from 12 different source systems',
        'Implemented advanced de-identification for research compliance',
        'Reduced data retrieval time from hours to seconds',
        'Enabled secure data sharing across 28 healthcare facilities',
      ],
    },
    technologies: [
      { name: 'FHIR', category: 'Standards' },
      { name: 'Java', category: 'Backend' },
      { name: 'Spring Boot', category: 'Backend' },
      { name: 'Python', category: 'Data Processing' },
      { name: 'React', category: 'Frontend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Kubernetes', category: 'Infrastructure' },
      { name: 'Azure', category: 'Cloud' },
      { name: 'Tableau', category: 'Analytics' },
    ],
    implementationDetails: {
      architecture: 'Microservices with Event-Driven Design',
      timeline: '14 months',
      team: '8 engineers, 1 designer, 2 healthcare consultants',
      keyFeatures: [
        'FHIR-compliant data exchange',
        'Role-based access control system',
        'Comprehensive audit logging',
        'Advanced de-identification for research',
        'Real-time notification system for critical updates',
      ],
    },
    nextSteps: {
      title: 'Looking to Unify Your Healthcare Data?',
      description:
        'We can help you create a secure, compliant integration platform that improves care coordination and enables research.',
      cta: {
        label: 'Book a Consultation',
        href: '/contact',
      },
    },
    relatedCaseStudies: ['1', '3'],
    featured: false,
    coverImage: {
      src: '/images/case-studies/healthcare-data/cover.webp',
      alt: 'Healthcare data integration platform',
      width: 1920,
      height: 1080,
    },
    metaData: {
      title: 'Healthcare Data Integration Platform | SolveJet Case Study',
      description:
        'How we helped MediCore unify patient data for better healthcare delivery and research while maintaining HIPAA compliance',
      keywords: [
        'healthcare data',
        'FHIR',
        'data integration',
        'HIPAA compliance',
        'healthcare IT',
      ],
    },
  },
  {
    id: '3',
    slug: 'ai-powered-supply-chain',
    title: 'AI-Powered Supply Chain Optimization',
    subtitle: 'Transforming logistics with predictive intelligence',
    industry: 'Logistics & Supply Chain',
    overview:
      'A global manufacturing company needed to optimize their global supply chain to reduce costs and improve delivery times. We implemented an AI-powered supply chain optimization system that led to significant improvements in efficiency and cost savings.',
    challenge:
      "The client was facing increasing costs and delays in their global supply chain, impacting customer satisfaction and profitability. Their traditional forecasting methods couldn't account for market volatility, and they lacked visibility across their multi-tier supplier network.",
    approach:
      'We approached the problem by first establishing comprehensive data collection across the supply chain. Then, we designed AI models to predict demand, optimize inventory, and identify potential disruptions before they affected operations.',
    solution:
      'Our team developed an AI-powered supply chain platform that provided real-time visibility, predictive analytics, and automated optimization. The system integrated with existing ERP systems and provided actionable insights through an intuitive dashboard.',
    solutionDetails: {
      architecture: 'Cloud-Native Microservices with AI/ML Pipeline',
      keyFeatures: [
        'Multi-echelon inventory optimization with dynamic safety stock calculation',
        'Predictive demand forecasting with 94% accuracy using ensemble ML models',
        'End-to-end supply chain visibility from raw materials to last-mile delivery',
        'Automated supplier risk assessment and diversification recommendations',
        'Digital twin simulation for scenario planning and disruption response',
        'Autonomous procurement optimization with price-timing intelligence',
        'Real-time logistics route optimization accounting for live conditions',
      ],
      technicalHighlights: [
        'Time-series forecasting models with external factor correlation',
        'Reinforcement learning for inventory policy optimization',
        'Graph database for supplier network analysis and risk propagation',
        'Stream processing for real-time event detection and alerting',
        'Computer vision integration for warehouse and quality control automation',
        'Edge computing for remote facility operation with intermittent connectivity',
      ],
      innovativeApproaches: [
        'Circular economy optimization for materials reuse and recycling',
        'Blockchain-based supplier certification and materials provenance',
        'Collaborative forecasting with suppliers and customers in secure environment',
        'Carbon footprint tracking and optimization throughout supply chain',
        'Predictive quality assurance using IoT sensor data and ML models',
      ],
      architectureDiagram: {
        layers: [
          {
            name: 'User Interface Layer',
            color: 'blue',
            components: [
              {
                name: 'Executive Dashboard',
                description: 'KPIs and strategic insights with customizable views and alerts',
                icon: 'pie-chart',
              },
              {
                name: 'Logistics Portal',
                description:
                  'Real-time tracking and management with interactive maps and status updates',
                icon: 'map',
              },
              {
                name: 'Supplier Portal',
                description:
                  'Collaborative forecasting and orders with shared inventory visibility',
                icon: 'users',
              },
              {
                name: 'Mobile Applications',
                description:
                  'Field operations support with barcode scanning and offline capabilities',
                icon: 'smartphone',
              },
            ],
          },
          {
            name: 'Intelligence Layer',
            color: 'purple',
            components: [
              {
                name: 'Forecasting Engine',
                description:
                  'ML-based demand prediction using ensemble models and external factors',
                icon: 'trending-up',
              },
              {
                name: 'Risk Assessment',
                description: 'Disruption detection and mitigation with proactive alerting',
                icon: 'alert-triangle',
              },
              {
                name: 'Optimization Service',
                description: 'Inventory and routing optimization using constraint programming',
                icon: 'maximize-2',
              },
              {
                name: 'Digital Twin',
                description: 'Supply chain simulation for scenario planning and what-if analysis',
                icon: 'copy',
              },
            ],
          },
          {
            name: 'Processing Layer',
            color: 'green',
            components: [
              {
                name: 'Inventory Service',
                description: 'Multi-location stock management with rebalancing algorithms',
                icon: 'package',
              },
              {
                name: 'Order Service',
                description: 'Order processing and fulfillment with dynamic prioritization',
                icon: 'shopping-cart',
              },
              {
                name: 'Supplier Service',
                description: 'Vendor management and assessment with performance scoring',
                icon: 'truck',
              },
              {
                name: 'Logistics Service',
                description: 'Transportation and delivery tracking with route optimization',
                icon: 'navigation',
              },
              {
                name: 'Analytics Service',
                description: 'Business intelligence and reporting with interactive visualizations',
                icon: 'bar-chart-2',
              },
            ],
          },
          {
            name: 'Data Layer',
            color: 'yellow',
            components: [
              {
                name: 'Time-Series DB',
                description: 'Historical operational data with efficient compression and querying',
                icon: 'clock',
              },
              {
                name: 'Graph Database',
                description: 'Supply network relationships with impact analysis capabilities',
                icon: 'share-2',
              },
              {
                name: 'Event Stream',
                description: 'Real-time event processing with scalable message queuing',
                icon: 'activity',
              },
              {
                name: 'Data Lake',
                description: 'Long-term data storage and analysis with automated data cataloging',
                icon: 'database',
              },
            ],
          },
          {
            name: 'Integration Layer',
            color: 'orange',
            components: [
              {
                name: 'API Gateway',
                description: 'Unified interface for internal and external systems',
                icon: 'server',
              },
              {
                name: 'ETL Pipeline',
                description: 'Data extraction, transformation, and loading processes',
                icon: 'filter',
              },
              {
                name: 'IoT Hub',
                description: 'Connection point for sensor data and smart devices',
                icon: 'cpu',
              },
              {
                name: 'Partner Connectors',
                description: 'Pre-built integrations with common logistics platforms',
                icon: 'link',
              },
            ],
          },
          {
            name: 'Infrastructure Layer',
            color: 'gray',
            components: [
              {
                name: 'Container Orchestration',
                description: 'Automated deployment and scaling of microservices',
                icon: 'box',
              },
              {
                name: 'Security Services',
                description: 'Identity management and data protection',
                icon: 'shield',
              },
              {
                name: 'Monitoring & Logging',
                description: 'System health tracking and troubleshooting',
                icon: 'eye',
              },
              {
                name: 'Disaster Recovery',
                description: 'Business continuity and data protection mechanisms',
                icon: 'life-buoy',
              },
            ],
          },
        ],
      },
    },
    results: {
      metrics: [
        {
          label: 'Reduction in Inventory Costs',
          value: '23%',
          icon: 'package',
        },
        {
          label: 'Improvement in Delivery Time',
          value: '28%',
          icon: 'truck',
        },
        {
          label: 'Decrease in Stockouts',
          value: '65%',
          icon: 'alert-triangle',
        },
        {
          label: 'ROI Within First Year',
          value: '342%',
          icon: 'dollar-sign',
        },
      ],
      summary:
        "The AI-powered supply chain platform has transformed LogiTech's operations, significantly reducing costs while improving service levels and creating a more resilient supply network.",
      keyAchievements: [
        'Optimized inventory levels across 32 global warehouses',
        'Reduced international shipping costs by 18%',
        'Minimized stockouts during peak season by 65%',
        'Improved supplier performance through predictive analytics',
      ],
    },
    technologies: [
      { name: 'Python', category: 'AI/ML' },
      { name: 'TensorFlow', category: 'AI/ML' },
      { name: 'PyTorch', category: 'AI/ML' },
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'MongoDB', category: 'Database' },
      { name: 'AWS', category: 'Cloud' },
      { name: 'Kafka', category: 'Streaming' },
      { name: 'Docker', category: 'DevOps' },
    ],
    implementationDetails: {
      architecture: 'Event-Driven Microservices',
      timeline: '10 months',
      team: '6 data scientists, 8 engineers, 2 supply chain consultants',
      keyFeatures: [
        'Predictive demand forecasting',
        'Multi-echelon inventory optimization',
        'Real-time supply chain visibility',
        'Supplier risk assessment',
        'AI-powered route optimization',
      ],
    },
    nextSteps: {
      title: 'Ready to Optimize Your Supply Chain?',
      description:
        'Discover how AI can transform your logistics operations and drive significant cost savings.',
      cta: {
        label: 'Request a Demo',
        href: '/contact',
      },
    },
    relatedCaseStudies: ['1', '2'],
    featured: true,
    coverImage: {
      src: '/images/case-studies/supply-chain/cover.webp',
      alt: 'AI-powered supply chain optimization',
      width: 1920,
      height: 1080,
    },
    metaData: {
      title: 'AI-Powered Supply Chain Optimization | SolveJet Case Study',
      description:
        'How we helped LogiTech Industries reduce costs and improve delivery times with AI-powered supply chain optimization',
      keywords: [
        'supply chain optimization',
        'AI in logistics',
        'predictive analytics',
        'inventory optimization',
        'logistics technology',
      ],
    },
  },
];

/**
 * Get all case studies
 * @returns Promise that resolves to an array of case study summaries
 */
export function getCaseStudies(): Promise<CaseStudySummary[]> {
  // Simulate API call with Promise
  return Promise.resolve(
    CASE_STUDIES.map(study => ({
      id: study.id,
      slug: study.slug,
      title: study.title,
      subtitle: study.subtitle,
      industry: study.industry,
      overview: study.overview,
      featured: study.featured,
      coverImage: study.coverImage,
    }))
  );
}

/**
 * Get a specific case study by slug
 * @param slug - The slug of the case study to retrieve
 * @returns Promise that resolves to the case study or null if not found
 */
export function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  // Simulate API call with Promise
  const caseStudy = CASE_STUDIES.find(study => study.slug === slug) ?? null;
  return Promise.resolve(caseStudy);
}

/**
 * Get related case studies
 * @param ids - Array of case study IDs to retrieve
 * @returns Promise that resolves to an array of case study summaries
 */
export function getRelatedCaseStudies(ids: string[]): Promise<CaseStudySummary[]> {
  // Simulate API call with Promise
  return Promise.resolve(
    CASE_STUDIES.filter(study => ids.includes(study.id)).map(study => ({
      id: study.id,
      slug: study.slug,
      title: study.title,
      subtitle: study.subtitle,
      industry: study.industry,
      overview: study.overview,
      featured: study.featured,
      coverImage: study.coverImage,
    }))
  );
}

/**
 * Filter case studies by industry
 * @param industry - The industry to filter by
 * @returns Promise that resolves to an array of case study summaries
 */
export function getCaseStudiesByIndustry(industry: string): Promise<CaseStudySummary[]> {
  return Promise.resolve(
    CASE_STUDIES.filter(study => study.industry.toLowerCase() === industry.toLowerCase()).map(
      study => ({
        id: study.id,
        slug: study.slug,
        title: study.title,
        subtitle: study.subtitle,
        industry: study.industry,
        overview: study.overview,
        featured: study.featured,
        coverImage: study.coverImage,
      })
    )
  );
}

/**
 * Get featured case studies
 * @returns Promise that resolves to an array of case study summaries
 */
export function getFeaturedCaseStudies(): Promise<CaseStudySummary[]> {
  return Promise.resolve(
    CASE_STUDIES.filter(study => study.featured).map(study => ({
      id: study.id,
      slug: study.slug,
      title: study.title,
      subtitle: study.subtitle,
      industry: study.industry,
      overview: study.overview,
      featured: study.featured,
      coverImage: study.coverImage,
    }))
  );
}
