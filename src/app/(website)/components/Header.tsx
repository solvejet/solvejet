// src/app/(website)/components/Header.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import type { JSX } from 'react';

export function Header(): JSX.Element {
  return (
    <header className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          SolveJet
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="hover:text-element-500">
            About
          </Link>
          <Link href="/services" className="hover:text-element-500">
            Services
          </Link>
          <Link href="/portfolio" className="hover:text-element-500">
            Portfolio
          </Link>
          <Link href="/contact" className="hover:text-element-500">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Contact Sales
          </Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
}
