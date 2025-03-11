// src/scripts/generate-seo-files.ts
import path from 'path';
import { generateRobotsTxt } from '../lib/seo/robots-generator';
import { generateSitemap } from '../lib/seo/sitemap-generator';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Main function to generate SEO files
 */
async function generateSeoFiles(): Promise<void> {
  try {
    console.warn('Starting SEO files generation...');

    // Generate robots.txt
    generateRobotsTxt({
      baseUrl: BASE_URL,
      additionalSitemaps: [],
      additionalRules: [
        {
          userAgent: 'Googlebot',
          allow: ['/'],
          disallow: ['/admin/*', '/api/*'],
        },
      ],
    });

    // Generate sitemap.xml
    generateSitemap({
      baseUrl: BASE_URL,
      pagesDirectory: path.join(process.cwd(), 'src/app'),
      outputPath: path.join(process.cwd(), 'public/sitemap.xml'),
      excludePaths: [
        '/admin/*',
        '/api/*',
        '/(website)/error',
        '/(website)/loading',
        '/(website)/not-found',
        '/(website)/case-studies/[slug]/error',
        '/(website)/case-studies/[slug]/loading',
        '/(website)/case-studies/[slug]/not-found',
      ],
      additionalPaths: [
        {
          url: '/',
          changeFrequency: 'weekly',
          priority: 1.0,
        },
        {
          url: '/case-studies',
          changeFrequency: 'weekly',
          priority: 0.9,
        },
      ],
      defaultChangeFreq: 'monthly',
      defaultPriority: 0.7,
    });

    console.warn('SEO files generation completed successfully');
  } catch (error) {
    console.error('Error generating SEO files:', error);
    process.exit(1);
  }
}

// Run the generation
generateSeoFiles().catch(console.error);
