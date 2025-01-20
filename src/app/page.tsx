// src/app/page.tsx
import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import { generateSEOMetadata } from '@/config/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'SolveJet - Custom Software Development Company',
  description:
    'Transform your business with custom software solutions, innovative technology, and expert consulting services.',
})

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      {/* Other sections will be added here */}
    </main>
  )
}
