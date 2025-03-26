// src/app/layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';
import ClientLayoutWrapper from './ClientLayoutWrapper';

// Only load essential fonts - subset for latin characters only
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-poppins',
  display: 'swap', // Ensures text displays while font loads
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: 'SolveJet - Top Software Development Company',
    template: '%s ',
  },
  description:
    "Transform your business with SolveJet's innovative software solutions. We specialize in custom software development, enterprise solutions, and digital transformation with ISO certified quality standards.",
  // Other metadata...
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Resource hints for important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* DNS prefetch for commonly used external domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Preload LCP hero image with high priority */}
        <link
          rel="preload"
          href="/images/industries/real-estate.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />

        {/* Add viewport-based preloads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Add preloads based on viewport size to prevent unnecessary resource loading
              (function() {
                const isMobile = window.innerWidth < 768;
                const addPreload = (href, as, priority = 'low') => {
                  const link = document.createElement('link');
                  link.rel = 'preload';
                  link.href = href;
                  link.as = as;
                  link.fetchPriority = priority;
                  document.head.appendChild(link);
                };

                // Only load desktop-specific resources on desktop
                if (!isMobile) {
                  // Preload main hero image
                  addPreload('/images/industries/ecommerce.webp', 'image');
                }

                // Defer non-critical JS
                document.addEventListener('DOMContentLoaded', () => {
                  setTimeout(() => {
                    // Add additional resources after main content is loaded
                  }, 3000);
                });
              })();
            `,
          }}
        />

        {/* Critical CSS for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for hero section and header */
              #hero-description {
        color: #f3f4f6;
        font-size: 1rem;
        line-height: 1.7;
        max-width: 32rem;
        font-family: system-ui, -apple-system, sans-serif;
      }
      @media (min-width: 768px) {
        #hero-description {
          font-size: 0.875rem;
          max-width: 48rem;
        }
      }
              @media (min-width: 1024px) {
                #hero-description {
                  max-width: 56rem;
                }
              }
              .bg-hero { background-color: rgb(17, 24, 39); }
              .hero-grid {
                background-image: linear-gradient(rgba(55, 65, 81, 0.4) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(55, 65, 81, 0.4) 1px, transparent 1px);
                background-size: 40px 40px;
                background-position: -0.5px -0.5px;
                opacity: 0.3;
              }
              .text-rotate-out {
                animation: textRotateOut 0.5s forwards;
                transform-origin: center center;
              }
              .text-rotate-in {
                animation: textRotateIn 0.5s forwards;
                transform-origin: center center;
              }
              @keyframes textRotateOut {
                0% { opacity: 1; transform: translateY(0) rotateX(0); }
                100% { opacity: 0; transform: translateY(20px) rotateX(-90deg); }
              }
              @keyframes textRotateIn {
                0% { opacity: 0; transform: translateY(-20px) rotateX(90deg); }
                100% { opacity: 1; transform: translateY(0) rotateX(0); }
              }
            `,
          }}
        />
      </head>
      <body className="font-poppins antialiased bg-white dark:bg-black">
        {/* Use progressive enhancement with the client wrapper */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
