// src/app/layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const ClientProviders = dynamic(
  () => import('@/components/ClientProviders').then(mod => mod.ClientProviders),
  {
    ssr: true,
  }
);

// Optimize font loading - only load essential weights
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

// Essential metadata
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: 'SolveJet - Product-driven Software Development Company',
    template: '%s | SolveJet',
  },
  description:
    "Transform your business with SolveJet's innovative software solutions. We specialize in custom software development, enterprise solutions, and digital transformation with ISO certified quality standards.",
  applicationName: 'SolveJet',
  keywords: [
    'custom software development',
    'enterprise solutions',
    'digital transformation',
    'ISO certified development',
    'web development',
    'mobile app development',
    'cloud solutions',
    'AI development',
    'MVP development',
    'IT consulting',
    'software engineering',
    'Next.js',
    'React',
    'TypeScript',
  ],
  authors: [
    {
      name: 'Karan Shah',
      url: 'https://github.com/karansxa',
    },
  ],
  creator: 'Karan Shah',
  publisher: 'SolveJet',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/safari-pinned-tab.svg', rel: 'mask-icon', color: '#001926' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'SolveJet - ISO Certified Custom Software Development',
    description:
      'Partner with SolveJet for innovative software solutions. We deliver custom development, enterprise solutions, and digital transformation services with ISO certified quality.',
    siteName: 'SolveJet',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SolveJet - Custom Software Development Company',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolveJet - Custom Software Development Company',
    description:
      'Transform your business with our innovative software solutions. ISO certified custom development, enterprise solutions, and digital transformation services.',
    creator: '@karansxa',
    site: '@solvejet',
    images: [
      {
        url: '/twitter-image.png',
        width: 1200,
        height: 630,
        alt: 'SolveJet - Custom Software Development',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SolveJet',
  },
  formatDetection: {
    telephone: false,
  },
  category: 'technology',
  classification: 'Software Development',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Preconnect to origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Critical CSS for LCP optimization */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          #hero-description {
            color: #f3f4f6;
            font-size: 1rem;
            line-height: 1.7;
            max-width: 32rem;
            padding-right: 1rem;
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
          .bg-hero {
            background-color: rgb(17, 24, 39);
          }
          .hero-grid {
            background-image: linear-gradient(rgba(55, 65, 81, 0.4) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(55, 65, 81, 0.4) 1px, transparent 1px);
            background-size: 40px 40px;
            background-position: -0.5px -0.5px;
            opacity: 0.3;
          }
        `,
          }}
        />
      </head>
      <body className="font-poppins antialiased bg-white dark:bg-black">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
