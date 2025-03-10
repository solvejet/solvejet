// src/components/layout/Footer.tsx
import type { JSX } from 'react';
import Link from 'next/link';
import { SolvejetLogo } from '@/components/ui/SolvejetLogo';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Custom Software', href: '/services/custom-software-development' },
      { label: 'Cloud Services', href: '/services/cloud-services' },
      { label: 'Mobile Apps', href: '/services/mobile-app-development' },
      { label: 'AI Development', href: '/services/artificial-intelligence' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and company info */}
          <div className="lg:col-span-2">
            <SolvejetLogo
              className="mb-6"
              width={140}
              height={40}
              color={{ primary: '#FFFFFF', accent: '#0055B8' }}
            />
            <p className="text-gray-400 mb-4 max-w-md">
              Engineering tomorrow's solutions today. We help businesses transform through
              innovative software solutions and digital strategies.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'linkedin', 'github', 'facebook'].map(social => (
                <Link
                  key={social}
                  href={`https://${social}.com/solvejet`}
                  aria-label={`SolveJet ${social} page`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 hover:border-element-400">
                    {/* We'd use actual icons here, omitted for brevity */}
                    <span className="capitalize text-xs">{social[0]}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map(group => (
            <div key={group.title}>
              <h3 className="text-white font-medium mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {currentYear} SolveJet. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-sm">
              Designed and built with <span className="text-red-500">♥</span> in New York
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
