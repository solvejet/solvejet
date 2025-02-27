// src/app/(website)/components/Footer.tsx
import Link from 'next/link';
import type { JSX } from 'react';

export function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} SolveJet. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
