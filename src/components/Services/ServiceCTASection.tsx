// src/components/Services/ServiceCTASection.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';

interface ServiceCTASectionProps {
  className?: string;
}

export default function ServiceCTASection({ className }: ServiceCTASectionProps): React.ReactElement {
  const { trackEvent } = useAnalytics();

  // Track section view
  useEffect(() => {
    trackEvent({
      name: 'service_cta_section_view',
      category: 'engagement',
      label: 'service_cta_section',
    });
  }, [trackEvent]);

  return (
    <section
      className={cn(
        'py-24 bg-element-900 dark:bg-element-900 relative overflow-hidden',
        className
      )}
      id="services-cta-section"
    >
      {/* Background elements */}
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-element-800 rounded-full opacity-30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 -right-32 w-96 h-96 bg-element-800 rounded-full opacity-30 blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 max-w-[95rem] relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-element-200 mb-10">
            Let's discuss how our technology solutions can help you achieve your business goals.
            Schedule a free consultation today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <TrackedButton
                variant="default"
                size="lg"
                className="bg-white text-element-900 hover:bg-gray-100 group"
                leftIcon={<MessageSquare className="mr-2 h-5 w-5" />}
                trackingEvent={{
                  name: 'cta_contact_button_click',
                  category: 'conversion',
                  label: 'service_cta_contact',
                }}
              >
                Contact Us
              </TrackedButton>
            </Link>

            <Link href="/schedule-consultation">
              <TrackedButton
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 group"
                leftIcon={<Calendar className="mr-2 h-5 w-5" />}
                rightIcon={<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                trackingEvent={{
                  name: 'cta_schedule_button_click',
                  category: 'conversion',
                  label: 'service_cta_schedule',
                }}
              >
                Schedule Consultation
              </TrackedButton>
            </Link>
          </div>

          {/* Additional info */}
          <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="bg-element-800/50 backdrop-blur-sm rounded-xl px-6 py-4 text-white">
              <span className="font-medium">Free initial consultation</span>
            </div>
            <div className="bg-element-800/50 backdrop-blur-sm rounded-xl px-6 py-4 text-white">
              <span className="font-medium">No-obligation quote</span>
            </div>
            <div className="bg-element-800/50 backdrop-blur-sm rounded-xl px-6 py-4 text-white">
              <span className="font-medium">Expert advice guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
