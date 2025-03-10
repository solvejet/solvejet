// src/types/case-study.ts
export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  industry: string;
  overview: string;
  challenge: string;
  approach: string;
  solution: string;
  results: {
    metrics: {
      label: string;
      value: string;
      icon?: string;
    }[];
  };
  technologies: {
    name: string;
    icon?: string;
    category?: string;
  }[];
  nextSteps?: {
    title: string;
    description: string;
    cta: {
      label: string;
      href: string;
    };
  };
  relatedCaseStudies?: string[]; // IDs of related case studies
  publishedAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  featured: boolean;
  coverImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  metaData?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface CaseStudySummary {
  industry: string;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  publishedAt: string;
  featured: boolean;
  coverImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}
