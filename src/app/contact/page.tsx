// app/contact/page.tsx
import { Metadata } from 'next'
import { ContactForm } from '@/components/forms/contact-form'
import { generateSEOMetadata } from '@/config/seo'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { JSX } from 'react'

// Contact info type for better type safety
interface ContactInfo {
  icon: typeof Mail | typeof MapPin | typeof Phone | typeof Clock
  title: string
  content: string | JSX.Element
  href?: string
}

// Contact information with proper typing
const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'hello@solvejet.net',
    href: 'mailto:hello@solvejet.net',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: siteConfig.contacts.USA,
    href: `tel:${siteConfig.contacts.USA.replace(/\s/g, '')}`,
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: (
      <>
        30 N Gould ST Ste R,
        <br />
        Sheridan, WY 82801
      </>
    ),
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: (
      <>
        Monday - Friday
        <br />
        9:00 AM - 6:00 PM EST
      </>
    ),
  },
]

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us | SolveJet',
  description:
    'Get in touch with our team for inquiries, support, or partnerships. Available 24/7 for your software development needs.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="relative pt-20">
      {' '}
      {/* Add top padding to account for fixed header */}
      <div className="container pb-12 pt-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground">
              Have a question or want to work together? Fill out the form below
              or use our contact information to get in touch with us.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="space-y-8 lg:pt-8">
              <h2 className="sr-only">Contact Information</h2>
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="rounded-lg border bg-background p-4 transition-colors duration-200 hover:bg-accent/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium">{info.title}</h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Trust Indicators */}
              <div className="rounded-lg border bg-accent/50 p-4">
                <p className="text-sm text-muted-foreground">
                  ISO 27001 Certified Company
                  <br />
                  Your data is secure with us
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border bg-background p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 text-2xl font-semibold">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
