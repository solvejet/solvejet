// src/app/privacy/page.tsx
import { Metadata } from 'next'
import { generateSEOMetadata } from '@/config/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Privacy Policy',
  description:
    'Learn about how we collect, use, and protect your personal information.',
  path: '/privacy',
})

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
          <p>Last updated: [Current Date]</p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website and use our
            services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Information We Collect
          </h2>
          <h3 className="mb-2 text-xl font-semibold">Personal Information</h3>
          <ul>
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Company information</li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold">
            Technical Information
          </h3>
          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Cookies and usage data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            How We Use Your Information
          </h2>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Cookie Policy</h2>
          <p>We use the following types of cookies:</p>
          <ul>
            <li>
              <strong>Necessary cookies:</strong> Essential for the website to
              function properly
            </li>
            <li>
              <strong>Analytics cookies:</strong> Help us understand how
              visitors interact with our website
            </li>
            <li>
              <strong>Marketing cookies:</strong> Used to track visitors across
              websites for marketing purposes
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Your Data Protection Rights
          </h2>
          <p>Under GDPR, you have the following rights:</p>
          <ul>
            <li>The right to access your personal data</li>
            <li>The right to rectification</li>
            <li>The right to erasure</li>
            <li>The right to restrict processing</li>
            <li>The right to data portability</li>
            <li>The right to object</li>
            <li>Rights related to automated decision-making and profiling</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
          <p>
            For any questions or concerns regarding this Privacy Policy, please
            contact us at:
          </p>
          <p>Email: privacy@solvejet.net</p>
          <p>Address: [Your Company Address]</p>
        </section>
      </div>
    </div>
  )
}
