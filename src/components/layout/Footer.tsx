// src/components/layout/Footer.tsx
'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SolvejetLogo } from '@/components/ui/SolvejetLogo';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { cn } from '@/lib/utils';
import { navigation } from './Header/navigation';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

const FooterComponent: React.FC = () => {
  const { trackEvent } = useAnalytics();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Update the year on component mount
  useEffect(() => {
    setYear(new Date().getFullYear());

    // Animate the footer into view when the component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return (): void => {
      clearTimeout(timer);
    };
  }, []);

  const handleLinkClick = useCallback(
    (label: string, href: string): void => {
      trackEvent({
        name: 'footer_link_click',
        category: 'navigation',
        label: `footer_${label.toLowerCase().replace(/\s+/g, '_')}`,
        properties: {
          destination: href,
          link_text: label,
        },
      });
    },
    [trackEvent]
  );

  const handleSocialClick = useCallback(
    (platform: string): void => {
      trackEvent({
        name: 'social_link_click',
        category: 'engagement',
        label: `social_${platform.toLowerCase()}`,
        properties: {
          platform,
        },
      });
    },
    [trackEvent]
  );

  const handleNewsletterSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      trackEvent({
        name: 'newsletter_signup',
        category: 'conversion',
        label: 'footer_newsletter',
        properties: {
          email_domain: email.split('@')[1] ?? '',
        },
      });

      // Here you would normally handle the form submission
      // For this implementation, just show success state
      setIsSubmitted(true);

      // Reset after 5 seconds
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 5000);
    },
    [email, trackEvent]
  );

  // Define social links
  const socialLinks: SocialLink[] = [
    {
      platform: 'LinkedIn',
      href: 'https://linkedin.com/company/solvejet',
      icon: <Linkedin className="h-5 w-5" />,
    },
    { platform: 'Twitter', href: 'https://x.com/SolveJet', icon: <Twitter className="h-5 w-5" /> },
    {
      platform: 'Instagram',
      href: 'https://www.instagram.com/solvejetus/',
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      platform: 'Facebook',
      href: 'https://www.facebook.com/solvejetus',
      icon: <Facebook className="h-5 w-5" />,
    },
  ];

  return (
    <footer
      className={cn(
        'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white relative overflow-hidden transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      aria-labelledby="footer-heading"
    >
      {/* Background patterns */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '-0.5px -0.5px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10">
        {/* Top wavy separator */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-0" aria-hidden="true">
          <svg
            className="relative w-full h-8 md:h-12"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="#111827"
              opacity="0.25"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              fill="#111827"
              opacity="0.5"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="#111827"
            />
          </svg>
        </div>

        {/* CTA Section with Newsletter */}
        <div className="pt-20 md:pt-24 pb-12 border-b border-gray-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[95rem]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-2xl transform transition-all duration-700 translate-y-0 opacity-100">
                <h2 className="text-3xl md:text-4xl font-medium mb-6 text-white leading-tight">
                  <span className="text-element-400">Innovate</span> and{' '}
                  <span className="text-element-400">Grow</span> with Expert Technology Partners
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Partner with SolveJet to build solutions that matter. Our team of passionate
                  experts works alongside your business to deliver technology that drives real
                  outcomes through innovation, quality engineering, and deep industry knowledge.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-element-900/20 transform hover:-translate-y-1">
                {!isSubmitted ? (
                  <>
                    <h3 className="text-xl font-medium mb-3 flex items-center">
                      <span className="text-gradient-blue-purple">Subscribe to Our Insights</span>
                    </h3>
                    <p className="text-gray-400 text-md mb-6">
                      Stay ahead with expert insights, industry trends, and technology updates.
                    </p>

                    <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                      <div className="relative">
                        <Input
                          type="email"
                          value={email}
                          onChange={e => {
                            setEmail(e.target.value);
                          }}
                          placeholder="Your email address"
                          aria-label="Your email address"
                          required
                          className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-element-400 transition-colors duration-300 placeholder-gray-400"
                        />
                        <button
                          type="submit"
                          aria-label="Subscribe"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 rounded-full p-1.5"
                        >
                          <ArrowRight className="h-4 w-4 text-white" />
                        </button>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="privacy-consent"
                          className="mt-1.5 rounded border-gray-500 text-element-500 focus:ring-element-400"
                          required
                        />
                        <label htmlFor="privacy-consent" className="text-gray-400 text-sm ml-2">
                          I agree to receive emails and accept the{' '}
                          <Link
                            href="/privacy-policy"
                            className="text-element-400 hover:text-element-300 underline"
                          >
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      <TrackedButton
                        type="submit"
                        variant="default"
                        className="w-full py-3 px-4 bg-element-500 hover:bg-element-600 text-white font-medium rounded-lg transition-transform duration-300 transform hover:-translate-y-1"
                        trackingEvent={{
                          name: 'newsletter_subscribe_click',
                          category: 'conversion',
                          label: 'footer_newsletter_subscribe',
                        }}
                        rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
                      >
                        Subscribe for Updates
                      </TrackedButton>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center transform transition-all duration-300 scale-100 opacity-100">
                    <div className="w-16 h-16 rounded-full bg-element-500/20 flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-element-400" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-gray-400 mb-6">
                      You've been successfully subscribed to our newsletter.
                    </p>
                    <p className="text-sm text-gray-500">
                      You'll start receiving our updates soon.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[95rem] py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8">
            {/* Logo and company info */}
            <div className="lg:col-span-4">
              <div className="mb-6 transform transition-all duration-500 hover:scale-105">
                <SolvejetLogo
                  color={{ primary: '#FFFFFF', accent: '#0055B8' }}
                  className="w-auto h-14"
                />
              </div>

              <p className="text-gray-400 mb-8 max-w-md text-sm">
                We specialize in crafting innovative technology solutions that empower businesses to
                transform, scale, and succeed in today's digital-first world. Our expert teams
                deliver results that drive real business impact.
              </p>

              <div className="space-y-4 text-gray-400 text-sm mb-8">
                <div
                  className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-colors duration-300"
                  onMouseEnter={() => {
                    setIsHovered('address');
                  }}
                  onMouseLeave={() => {
                    setIsHovered(null);
                  }}
                >
                  <div
                    className={cn(
                      'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                      isHovered === 'address'
                        ? 'bg-element-500 text-white'
                        : 'bg-gray-800 text-element-400'
                    )}
                  >
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-gray-200 font-medium mb-1">Our Headquarters</h4>
                    <p>
                      30 N Gould St Ste R
                      <br />
                      Sheridan, WY 82801
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-colors duration-300"
                  onMouseEnter={() => {
                    setIsHovered('phone');
                  }}
                  onMouseLeave={() => {
                    setIsHovered(null);
                  }}
                >
                  <div
                    className={cn(
                      'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                      isHovered === 'phone'
                        ? 'bg-element-500 text-white'
                        : 'bg-gray-800 text-element-400'
                    )}
                  >
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-gray-200 font-medium mb-1">Call Us</h4>
                    <a
                      href="tel:+14155552671"
                      className="hover:text-element-400 transition-colors duration-300"
                      onClick={() => {
                        handleLinkClick('Phone', 'tel:+14155552671');
                      }}
                    >
                      +1 (415) 555-2671
                    </a>
                  </div>
                </div>

                <div
                  className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-colors duration-300"
                  onMouseEnter={() => {
                    setIsHovered('email');
                  }}
                  onMouseLeave={() => {
                    setIsHovered(null);
                  }}
                >
                  <div
                    className={cn(
                      'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                      isHovered === 'email'
                        ? 'bg-element-500 text-white'
                        : 'bg-gray-800 text-element-400'
                    )}
                  >
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-gray-200 font-medium mb-1">Email Us</h4>
                    <a
                      href="mailto:hello@solvejet.net"
                      className="hover:text-element-400 transition-colors duration-300"
                      onClick={() => {
                        handleLinkClick('Email', 'mailto:hello@solvejet.net');
                      }}
                    >
                      hello@solvejet.net
                    </a>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex space-x-3">
                {socialLinks.map(social => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.platform}`}
                    onClick={() => {
                      handleSocialClick(social.platform);
                    }}
                    className="group bg-gray-800 hover:bg-element-600 p-3 rounded-full transition-all duration-300 hover:scale-110 transform"
                  >
                    <div className="text-gray-400 group-hover:text-white transition-colors duration-300">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links - Dynamically generated based on the main navigation */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {/* What We Do section */}
                <div className="space-y-6">
                  <h3 className="text-white font-medium text-xl relative inline-block">
                    What We Do
                    <span className="absolute -bottom-1 left-0 w-16 h-0.5 bg-element-500"></span>
                  </h3>
                  <ul className="space-y-4">
                    {navigation
                      .find(item => item.name === 'What We Do')
                      ?.megaMenu?.columns.flatMap(column =>
                        column.items.slice(0, 4).map(item => (
                          <li
                            key={item.title}
                            className="transform hover:-translate-x-1 transition-transform duration-300"
                          >
                            <Link
                              href={item.href}
                              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                              onClick={() => {
                                handleLinkClick(item.title, item.href);
                              }}
                            >
                              <span className="border-b border-transparent group-hover:border-element-400 transition-colors duration-300">
                                {item.title}
                              </span>
                            </Link>
                          </li>
                        ))
                      )}
                    <li>
                      <Link
                        href="/services"
                        className="text-element-400 hover:text-element-300 transition-colors duration-300 flex items-center mt-2 font-medium group"
                        onClick={() => {
                          handleLinkClick('View All Services', '/services');
                        }}
                      >
                        <span>View All Services</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all duration-300" />
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Industries section */}
                <div className="space-y-6">
                  <h3 className="text-white font-medium text-xl relative inline-block">
                    Industries
                    <span className="absolute -bottom-1 left-0 w-16 h-0.5 bg-element-500"></span>
                  </h3>
                  <ul className="space-y-4">
                    {navigation
                      .find(item => item.name === 'Industries')
                      ?.megaMenu?.columns.flatMap(column =>
                        column.items.slice(0, 5).map(item => (
                          <li
                            key={item.title}
                            className="transform hover:-translate-x-1 transition-transform duration-300"
                          >
                            <Link
                              href={item.href}
                              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                              onClick={() => {
                                handleLinkClick(item.title, item.href);
                              }}
                            >
                              <span className="border-b border-transparent group-hover:border-element-400 transition-colors duration-300">
                                {item.title}
                              </span>
                            </Link>
                          </li>
                        ))
                      )}
                    <li>
                      <Link
                        href="/industries"
                        className="text-element-400 hover:text-element-300 transition-colors duration-300 flex items-center mt-2 font-medium group"
                        onClick={() => {
                          handleLinkClick('View All Industries', '/industries');
                        }}
                      >
                        <span>View All Industries</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all duration-300" />
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company & Resources section */}
                <div className="space-y-6">
                  <h3 className="text-white font-medium text-xl relative inline-block">
                    Company
                    <span className="absolute -bottom-1 left-0 w-16 h-0.5 bg-element-500"></span>
                  </h3>
                  <ul className="space-y-4">
                    {navigation
                      .find(item => item.name === 'Company')
                      ?.megaMenu?.columns.flatMap(column =>
                        column.items.slice(0, 4).map(item => (
                          <li
                            key={item.title}
                            className="transform hover:-translate-x-1 transition-transform duration-300"
                          >
                            <Link
                              href={item.href}
                              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                              onClick={() => {
                                handleLinkClick(item.title, item.href);
                              }}
                            >
                              <span className="border-b border-transparent group-hover:border-element-400 transition-colors duration-300">
                                {item.title}
                              </span>
                            </Link>
                          </li>
                        ))
                      )}
                  </ul>
                </div>
              </div>

              {/* Certifications and Contact CTA */}
              <div className="mt-16 pt-8 border-t border-gray-800">
                <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
                  <div>
                    <h4 className="text-white font-medium text-lg mb-6">
                      Our Certifications & Partnerships
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      <div
                        className="flex items-center bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 hover:border-element-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-element-900/20 transform hover:-translate-y-1 cursor-pointer group"
                        onClick={() => {
                          handleLinkClick('ISO Certification', '/certifications');
                        }}
                      >
                        <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center mr-4 group-hover:bg-element-900/50 transition-all duration-300">
                          <Image
                            src="/images/crdentials/iso-27001-2022.webp"
                            alt="ISO Certified"
                            width={30}
                            height={30}
                            className="filter brightness-0 invert opacity-90 group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h5 className="text-gray-200 font-medium">ISO 27001 Certified</h5>
                          <p className="text-gray-400 text-sm">Security Management System</p>
                        </div>
                      </div>

                      <div
                        className="flex items-center bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 hover:border-element-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-element-900/20 transform hover:-translate-y-1 cursor-pointer group"
                        onClick={() => {
                          handleLinkClick('Google Cloud Partner', '/partnerships');
                        }}
                      >
                        <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center mr-4 group-hover:bg-element-900/50 transition-all duration-300">
                          <Image
                            src="/images/credentials/google-cloud-partner.webp"
                            alt="Google Cloud Partner"
                            width={30}
                            height={30}
                            className="filter invert opacity-90 group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h5 className="text-gray-200 font-medium">Google Cloud Partner</h5>
                          <p className="text-gray-400 text-sm">Certified Cloud Solutions</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:ml-auto">
                    <div className="text-center lg:text-right">
                      <h4 className="text-white font-medium text-lg mb-4">
                        Ready to Discuss Your Project?
                      </h4>
                      <TrackedButton
                        variant="default"
                        className="bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => {
                          handleLinkClick('Contact Us Button', '/contact');
                        }}
                        trackingEvent={{
                          name: 'footer_contact_button_click',
                          category: 'conversion',
                          label: 'footer_contact_button',
                        }}
                        rightIcon={<ArrowRight className="ml-2 h-5 w-5" />}
                      >
                        Schedule a Consultation
                      </TrackedButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[95rem] py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div
                className="text-gray-500 text-sm mb-4 md:mb
-0"
              >
                © {year} SolveJet. All rights reserved.
              </div>

              <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3 text-sm">
                <Link
                  href="/privacy-policy"
                  className="text-gray-500 hover:text-white transition-colors duration-300 relative group"
                  onClick={() => {
                    handleLinkClick('Privacy Policy', '/privacy-policy');
                  }}
                >
                  Privacy Policy
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-element-500 group-hover:w-full transition-all duration-300"></span>
                </Link>

                <Link
                  href="/terms-of-service"
                  className="text-gray-500 hover:text-white transition-colors duration-300 relative group"
                  onClick={() => {
                    handleLinkClick('Terms of Service', '/terms-of-service');
                  }}
                >
                  Terms of Service
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-element-500 group-hover:w-full transition-all duration-300"></span>
                </Link>

                <Link
                  href="/accessibility"
                  className="text-gray-500 hover:text-white transition-colors duration-300 relative group"
                  onClick={() => {
                    handleLinkClick('Accessibility', '/accessibility');
                  }}
                >
                  Accessibility
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-element-500 group-hover:w-full transition-all duration-300"></span>
                </Link>

                <Link
                  href="/sitemap"
                  className="text-gray-500 hover:text-white transition-colors duration-300 relative group"
                  onClick={() => {
                    handleLinkClick('Sitemap', '/sitemap');
                  }}
                >
                  Sitemap
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-element-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            trackEvent({
              name: 'back_to_top_click',
              category: 'navigation',
              label: 'footer_back_to_top',
            });
          }}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 bg-element-500 hover:bg-element-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-element-900/20 focus:outline-none focus:ring-2 focus:ring-element-400 focus:ring-offset-2 focus:ring-offset-gray-900 z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

// Export the memoized component
export default memo(FooterComponent);
