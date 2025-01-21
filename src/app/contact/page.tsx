// app/contact/page.tsx

import { Metadata } from 'next'
import { ContactForm } from '@/components/forms/contact-form'
import { generateSEOMetadata } from '@/config/seo'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with our team for inquiries, support, or partnerships.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Get in Touch</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Have a question or want to work together? Fill out the form below or
            use our contact information to get in touch with us.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="space-y-8 lg:pt-8">
            <h2 className="sr-only">Contact Information</h2>
            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">Email Us</h3>
                    <a
                      href="mailto:hello@solvejet.net"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      hello@solvejet.net
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">Call Us</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">Visit Us</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Business Avenue,
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">Business Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday
                      <br />
                      9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-background p-6 sm:p-8">
              <h2 className="mb-6 text-2xl font-semibold">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
