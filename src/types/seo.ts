// src/types/seo.ts

/**
 * URL entry for the sitemap
 */
export interface SitemapUrl {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Configuration options for sitemap generation
 */
export interface SitemapConfig {
  baseUrl: string;
  pagesDirectory: string;
  outputPath: string;
  excludePaths: string[];
  additionalPaths?: SitemapUrl[];
  defaultChangeFreq?: SitemapUrl['changeFrequency'];
  defaultPriority?: number;
}

/**
 * Configuration options for robots.txt generation
 */
export interface RobotsConfig {
  baseUrl: string;
  additionalSitemaps?: string[];
  additionalRules?: {
    userAgent: string;
    allow?: string[];
    disallow?: string[];
  }[];
}
