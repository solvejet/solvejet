// src/types/case-study.ts

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  overview: string;
  industry: string;
  duration: string;
  services: string[];
  coverImage: {
    src: string;
    alt: string;
  };
  challenge: string;
  approach: string;
  solution: string;
  results: {
    summary: string;
    metrics: {
      label: string;
      value: string;
      description?: string;
      icon?: string;
      color?: string;
    }[];
  };
  architecture: {
    description: string;
    technologies: {
      name: string;
      icon?: string;
      description: string;
      category: 'frontend' | 'backend' | 'database' | 'infrastructure' | 'cloud' | 'tools';
      purpose?: string;
    }[];
    components: {
      name: string;
      type: 'service' | 'database' | 'client' | 'external' | 'container';
      // Making description optional as requested
      description?: string;
      technologies?: string[];
      connections?: string[]; // Names of other components this connects to
    }[];
    flows?: {
      from: string;
      to: string;
      name?: string;
      // Making flow description optional as requested
      description?: string;
    }[];
    highlights: {
      title: string;
      description: string;
      icon?: string;
    }[];
    keyFeatures: {
      name: string;
      description: string;
      icon?: string;
    }[];
  };
  metaData?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}
