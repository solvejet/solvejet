// src/app/layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';
import { ClientProviders } from '@/components/ClientProviders';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

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
    <html
      lang="en"
      className={`${poppins.variable} scroll-smooth bg-primary-light`}
      suppressHydrationWarning
    >
      <body className="font-poppins antialiased bg-white dark:bg-black">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
