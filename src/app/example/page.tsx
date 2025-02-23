// src/app/example/page.tsx
import type { Metadata } from 'next';
import { ExamplePageClient } from '../ExamplePageClient';
import type { JSX } from 'react';

export const metadata: Metadata = {
  title: 'Component Examples',
  description: 'Example page showcasing all UI components and hooks',
};

export default function ExamplePage(): JSX.Element {
  return <ExamplePageClient />;
}
