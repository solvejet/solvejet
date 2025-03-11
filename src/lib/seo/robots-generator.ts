// src/lib/seo/robots-generator.ts
import fs from 'fs';
import path from 'path';
import type { RobotsConfig } from '@/types/seo';

/**
 * Generates robots.txt file with appropriate rules
 */
export function generateRobotsTxt(baseUrl: string | RobotsConfig): void {
  // Handle flexible input - either a string baseUrl or a full config
  const config: RobotsConfig = typeof baseUrl === 'string' ? { baseUrl } : baseUrl;
  console.warn('Generating robots.txt...');

  // Get the normalized base URL
  const baseUrlStr = typeof baseUrl === 'string' ? baseUrl : baseUrl.baseUrl;
  const normalizedBaseUrl = baseUrlStr.endsWith('/') ? baseUrlStr.slice(0, -1) : baseUrlStr;

  // Start with the standard rules
  let robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /404
Disallow: /500
`;

  // Add any additional rules
  if (config.additionalRules && config.additionalRules.length > 0) {
    config.additionalRules.forEach(rule => {
      robotsTxt += `\nUser-agent: ${rule.userAgent}\n`;

      if (rule.allow && rule.allow.length > 0) {
        rule.allow.forEach(path => {
          robotsTxt += `Allow: ${path}\n`;
        });
      }

      if (rule.disallow && rule.disallow.length > 0) {
        rule.disallow.forEach(path => {
          robotsTxt += `Disallow: ${path}\n`;
        });
      }
    });
  }

  // Add the sitemaps section
  robotsTxt += `\n# Sitemaps\nSitemap: ${normalizedBaseUrl}/sitemap.xml\n`;

  // Add any additional sitemaps
  if (config.additionalSitemaps && config.additionalSitemaps.length > 0) {
    config.additionalSitemaps.forEach(sitemap => {
      // Check if the sitemap is a full URL or a relative path
      const sitemapUrl = sitemap.startsWith('http') ? sitemap : `${normalizedBaseUrl}${sitemap}`;
      robotsTxt += `Sitemap: ${sitemapUrl}\n`;
    });
  }

  // Ensure the public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write the robots.txt file to the public directory
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.warn('robots.txt generated successfully');
}
