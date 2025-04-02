// src/components/Services/MVPDevelopment/ContactFormSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCSRF } from '@/hooks';

interface ContactFormSectionProps {
  className?: string;
}

// Success response from the API
interface SuccessResponse {
  success: true;
  message: string;
  id: string;
}

// Error response from the API
interface ErrorResponse {
  success: false;
  message: string;
  errors?: {
    code: string;
    path: string[];
    message: string;
  }[];
  code?: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

export default function ContactFormSection({
  className,
}: ContactFormSectionProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const { token, getCSRFToken } = useCSRF();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    services: {
      mvpDevelopment: true,
      webDevelopment: false,
      mobileDevelopment: false,
      uiuxDesign: false,
      startupAdvisory: false,
      investorMaterials: false,
      other: false,
    },
    source: 'mvp_development_page',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Track view event
    trackEvent({
      name: 'mvp_contact_form_view',
      category: 'engagement',
      label: 'mvp_development_contact_form',
    });

    // Set up intersection observer for animation triggers
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return (): void => {
      observer.disconnect();
    };
  }, [trackEvent]);

  // Prefetch CSRF token when component mounts
  useEffect(() => {
    void getCSRFToken();
  }, [getCSRFToken]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target;
    setFormState({
      ...formState,
      services: {
        ...formState.services,
        [name]: checked,
      },
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Please provide a more detailed message (at least 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Reset any previous submission state
    setSubmissionError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Track form submission attempt
    trackEvent({
      name: 'mvp_contact_form_submit',
      category: 'conversion',
      label: 'mvp_development_contact_form_submit',
      properties: {
        services: Object.entries(formState.services)
          .filter(([, selected]) => selected)
          .map(([service]) => service)
          .join(','),
      },
    });

    try {
      // Use the CSRF token that was already fetched
      // Send the form data to the API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': token ?? '', // Use the token from the hook state
        },
        body: JSON.stringify(formState),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok || !data.success) {
        // Handle API error response
        const errorData = data as ErrorResponse;
        throw new Error(errorData.message || 'There was a problem submitting your form');
      }

      // Track successful submission
      trackEvent({
        name: 'mvp_contact_form_success',
        category: 'conversion',
        label: 'mvp_development_contact_form_success',
        properties: {
          submissionId: data.id,
        },
      });

      // Set submitted state to show success message
      setIsSubmitted(true);

      // Reset form after a delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          services: {
            mvpDevelopment: true,
            webDevelopment: false,
            mobileDevelopment: false,
            uiuxDesign: false,
            startupAdvisory: false,
            investorMaterials: false,
            other: false,
          },
          source: 'mvp_development_page',
        });
      }, 5000);
    } catch (error) {
      // Handle errors
      console.error('Form submission error:', error);
      setSubmissionError(error instanceof Error ? error.message : 'An unknown error occurred');

      // Track error
      trackEvent({
        name: 'mvp_contact_form_error',
        category: 'error',
        label: 'mvp_development_contact_form_error',
        properties: {
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact-form-section"
      className={cn('py-24 bg-gray-50 dark:bg-gray-800', className)}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
        <div className="max-w-7xl mx-auto">
          <div
            className={cn(
              'mb-16 text-center transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Bring Your Idea to Life
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your concept into a market-ready MVP? Complete the form below to start a conversation about your project and take the first step toward product validation.
            </p>
          </div>

          <div
            className={cn(
              'bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left side - Form */}
              <div className="lg:col-span-3 p-8 md:p-12">
                {isSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                      <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                      Your message has been sent successfully. Our startup specialists will get back to you shortly to discuss your MVP development needs and next steps.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={e => {
                      void handleSubmit(e);
                    }}
                    className="space-y-6"
                  >
                    {/* Show global error message if API call fails */}
                    {submissionError && (
                      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{submissionError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name field */}
                      <Input
                        id="name"
                        name="name"
                        label="Full Name*"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        variant={errors.name ? 'error' : 'default'}
                        error={errors.name}
                        fullWidth
                      />

                      {/* Email field */}
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address*"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        variant={errors.email ? 'error' : 'default'}
                        error={errors.email}
                        fullWidth
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Company field */}
                      <Input
                        id="company"
                        name="company"
                        label="Company/Startup Name"
                        value={formState.company}
                        onChange={handleInputChange}
                        placeholder="Startup, Inc."
                        fullWidth
                      />

                      {/* Phone field */}
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        label="Phone Number"
                        value={formState.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        fullWidth
                      />
                    </div>

                    {/* Services checkboxes - Modified for MVP specific options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Services of Interest
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="mvpDevelopment"
                            name="mvpDevelopment"
                            checked={formState.services.mvpDevelopment}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500 mt-0.5"
                          />
                          <label
                            htmlFor="mvpDevelopment"
                            className="ml-3 text-gray-700 dark:text-gray-300"
                          >
                            MVP Development
                          </label>
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="webDevelopment"
                            name="webDevelopment"
                            checked={formState.services.webDevelopment}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500 mt-0.5"
                          />
                          <label
                            htmlFor="webDevelopment"
                            className="ml-3 text-gray-700 dark:text-gray-300"
                          >
                            Web Development
                          </label>
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="mobileDevelopment"
                            name="mobileDevelopment"
                            checked={formState.services.mobileDevelopment}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500 mt-0.5"
                          />
                          <label
                            htmlFor="mobileDevelopment"
                            className="ml-3 text-gray-700 dark:text-gray-300"
                          >
                            Mobile App Development
                          </label>
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="uiuxDesign"
                            name="uiuxDesign"
                            checked={formState.services.uiuxDesign}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500 mt-0.5"
                          />
                          <label
                            htmlFor="uiuxDesign"
                            className="ml-3 text-gray-700 dark:text-gray-300"
                          >
                            UI/UX Design
                          </label>
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="startupAdvisory"
                            name="startupAdvisory"
                            checked={formState.services.startupAdvisory}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500 mt-0.5"
                          />
                          <label
                            htmlFor="startupAdvisory"
                            className="ml-3 text-gray-700 dark:text-gray-300"
                          >
                            Startup Advisory
                          </label>
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="investorMaterials"
                            name="investorMaterials"
                            checked={formState.services.investorMaterials}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500 mt-0.5"
                          />
                          <label
                            htmlFor="investorMaterials"
                            className="ml-3 text-gray-700 dark:text-gray-300"
                          >
                            Investor Materials
                          </label>
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="other"
                            name="other"
                            checked={formState.services.other}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500 mt-0.5"
                          />
                          <label htmlFor="other" className="ml-3 text-gray-700 dark:text-gray-300">
                            Other Services
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Message field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Project Details*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleInputChange}
                        className={cn(
                          'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white',
                          errors.message
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300'
                        )}
                        placeholder="Tell us about your project idea, goals, and timeline..."
                      ></textarea>
                      {errors.message && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit button */}
                    <div>
                      <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                        isLoading={isSubmitting}
                        loadingText="Sending..."
                        leftIcon={isSubmitting ? undefined : <Send className="h-5 w-5 mr-2" />}
                      >
                        Send Message
                      </Button>
                      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                        By submitting this form, you agree to our{' '}
                        <a
                          href="/privacy"
                          className="text-pink-600 dark:text-pink-400 hover:underline"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </form>
                )}
              </div>

              {/* Right side - MVP specific info */}
              <div className="lg:col-span-2 bg-gradient-to-br from-pink-600 to-purple-700 text-white p-8 md:p-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Why Choose SolveJet for Your MVP</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold mb-1">Rapid Time-to-Market</h4>
                        <p className="text-white/80">
                          Launch your MVP in weeks, not months, with our streamlined development process focused on essential features.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold mb-1">Startup Experience</h4>
                        <p className="text-white/80">
                          Benefit from our experience working with Y Combinator and Techstars startups across various funding stages.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold mb-1">Growth-Ready Architecture</h4>
                        <p className="text-white/80">
                          We build MVPs that can scale with your success, avoiding costly rewrites as your user base grows.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-12 pt-12 border-t border-white/20">
                  <h3 className="text-xl font-bold mb-6">MVP Development Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Discovery & Planning</span>
                      <span className="font-medium">1-2 Weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Design & Prototyping</span>
                      <span className="font-medium">2-4 Weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Development</span>
                      <span className="font-medium">4-12 Weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Testing & Launch</span>
                      <span className="font-medium">1-3 Weeks</span>
                    </div>
                  </div>
                  <p className="mt-6 text-white/90 font-medium">
                    Response Time: <span className="font-bold">Within 24 Hours</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
