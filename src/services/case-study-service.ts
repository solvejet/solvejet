// src/services/case-study-service.ts
import type { CaseStudy, CaseStudySummary } from '@/types/case-study';

// Mock case study data with simplified structure
const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    slug: 'ecommerce-platform-revamp',
    title: 'E-commerce Platform Transformation',
    subtitle: 'Modernizing legacy systems for a seamless shopping experience',
    industry: 'Retail & E-commerce',
    overview:
      'GlobalShop, a major retail chain with over 500 physical stores and an online presence, needed to revamp their legacy e-commerce platform to meet modern customer expectations and scale with their growing business. We delivered a comprehensive transformation that increased sales by 45% and reduced operational costs.',
    challenge:
      "GlobalShop was struggling with an outdated e-commerce platform built over a decade ago. The system was slow, difficult to maintain, and lacked modern features expected by today's consumers. Key challenges included poor mobile experience, limited payment options, slow page load times averaging 6+ seconds, and isolated data silos preventing a unified customer view.",
    approach:
      'We took a phased approach to minimize disruption while delivering continuous improvements. Our team conducted extensive analysis of the existing system, customer journeys, and business processes. We designed a microservices architecture to replace the monolithic legacy system and implemented continuous delivery pipelines to enable rapid, reliable updates.',
    solution:
      'We developed a modern, mobile-first e-commerce platform using React, Node.js, and AWS services. The solution included a headless commerce architecture with separate frontend and backend services, a robust inventory management system with real-time updates, personalized recommendation engine powered by machine learning, and seamless integration with physical stores for click-and-collect functionality.',
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
    },
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'AWS', category: 'Infrastructure' },
      { name: 'Elasticsearch', category: 'Search' },
      { name: 'Redis', category: 'Caching' },
      { name: 'Docker', category: 'DevOps' },
      { name: 'Kubernetes', category: 'DevOps' },
      { name: 'TensorFlow', category: 'AI/ML' },
    ],
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
    publishedAt: '2023-09-15T10:00:00Z',
    updatedAt: '2023-11-02T14:30:00Z',
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
      'MediCore, a leading healthcare provider network, struggled with fragmented patient data across multiple systems. We developed a secure, compliant data integration platform that unified patient records while maintaining strict HIPAA compliance.',
    challenge:
      'MediCore faced challenges with siloed patient data across different departments and facilities. This fragmentation led to inefficient care coordination, duplicate tests, and missed opportunities for medical research. They needed a solution that could integrate diverse data sources while ensuring security and regulatory compliance.',
    approach:
      'We began with a comprehensive audit of existing systems and developed a roadmap for data integration. Our team worked closely with healthcare professionals and IT staff to design a solution that met both technical and clinical requirements.',
    solution:
      'We built a secure healthcare data platform using FHIR standards for interoperability. The solution included robust patient identity management, role-based access controls, comprehensive audit logging, and advanced analytics capabilities while maintaining strict HIPAA compliance.',
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
    },
    technologies: [
      { name: 'FHIR', category: 'Standards' },
      { name: 'Java', category: 'Backend' },
      { name: 'Python', category: 'Data Processing' },
      { name: 'React', category: 'Frontend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Kubernetes', category: 'Infrastructure' },
      { name: 'Azure', category: 'Cloud' },
    ],
    nextSteps: {
      title: 'Looking to Unify Your Healthcare Data?',
      description:
        'We can help you create a secure, compliant integration platform that improves care coordination and enables research.',
      cta: {
        label: 'Book a Consultation',
        href: '/contact',
      },
    },
    publishedAt: '2023-07-20T08:00:00Z',
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
      'LogiTech Industries needed to optimize their global supply chain to reduce costs and improve delivery times. We implemented an AI-powered supply chain optimization system that led to significant improvements in efficiency and cost savings.',
    challenge:
      "LogiTech Industries was facing increasing costs and delays in their global supply chain, impacting customer satisfaction and profitability. Their traditional forecasting methods couldn't account for market volatility, and they lacked visibility across their multi-tier supplier network.",
    approach:
      'We approached the problem by first establishing comprehensive data collection across the supply chain. Then, we designed AI models to predict demand, optimize inventory, and identify potential disruptions before they affected operations.',
    solution:
      'Our team developed an AI-powered supply chain platform that provided real-time visibility, predictive analytics, and automated optimization. The system integrated with existing ERP systems and provided actionable insights through an intuitive dashboard.',
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
    },
    technologies: [
      { name: 'Python', category: 'AI/ML' },
      { name: 'TensorFlow', category: 'AI/ML' },
      { name: 'React', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'MongoDB', category: 'Database' },
      { name: 'AWS', category: 'Cloud' },
      { name: 'Kafka', category: 'Streaming' },
    ],
    nextSteps: {
      title: 'Ready to Optimize Your Supply Chain?',
      description:
        'Discover how AI can transform your logistics operations and drive significant cost savings.',
      cta: {
        label: 'Request a Demo',
        href: '/contact',
      },
    },
    relatedCaseStudies: ['1'],
    publishedAt: '2023-08-05T09:30:00Z',
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
      publishedAt: study.publishedAt,
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
      publishedAt: study.publishedAt,
      featured: study.featured,
      coverImage: study.coverImage,
    }))
  );
}
