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
  solutionDetails?: {
    architecture?: string;
    keyFeatures?: string[];
    technicalHighlights?: string[];
    innovativeApproaches?: string[];
    architectureDiagram?: {
      layers: {
        name: string;
        color: string;
        components: {
          name: string;
          description?: string;
          icon?: string;
        }[];
      }[];
    };
  };
  results: {
    metrics: {
      label: string;
      value: string;
      icon?: string;
    }[];
    summary?: string;
    keyAchievements?: string[];
  };
  technologies: {
    name: string;
    icon?: string;
    category?: string;
  }[];
  implementationDetails?: {
    architecture: string;
    timeline: string;
    team: string;
    keyFeatures: string[];
  };
  nextSteps?: {
    title: string;
    description: string;
    cta: {
      label: string;
      href: string;
    };
  };
  relatedCaseStudies?: string[]; // IDs of related case studies
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
  featured: boolean;
  coverImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}
