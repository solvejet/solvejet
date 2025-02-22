// src/hooks/useSEO.ts
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export const useSEO = ({ title, description, canonical, openGraph }: SEOProps): void => {
  useEffect((): void => {
    // Update meta tags
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    
    // Update canonical
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalElement) {
        canonicalElement = document.createElement('link');
        canonicalElement.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalElement);
      }
      canonicalElement.setAttribute('href', canonical);
    }

    // Update OpenGraph
    if (openGraph) {
      Object.entries(openGraph).forEach(([key, value]) => {
        if (value) {
          document.querySelector(`meta[property="og:${key}"]`)?.setAttribute('content', value);
        }
      });
    }
  }, [title, description, canonical, openGraph]);
};