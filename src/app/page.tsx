// app/page.tsx
import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import WaveBackground from '@/components/home/HeroSection/WaveBackground'
import { generateSEOMetadata } from '@/config/seo'
import ServicesSection from '@/components/home/ServicesSection'
import ExpertiseSection from '@/components/home/ExpertiseSection'

export const metadata: Metadata = generateSEOMetadata({
  title: 'SolveJet - Custom Software Development Company',
  description:
    'Transform your business with custom software solutions, innovative technology, and expert consulting services.',
})

export default function HomePage() {
  return (
    <>
      <WaveBackground />
      <main className="relative flex min-h-screen flex-col">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <ExpertiseSection />
        {/* Other sections will be added here */}
      </main>
    </>
  )
}
