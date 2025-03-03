// src/components/Home/FeaturesSection.tsx
'use client';

import { Shield, Code, Zap, Cloud, BarChart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturesSectionProps {
  className?: string;
}

const features = [
  {
    title: 'Secure by Design',
    description:
      'Enterprise-grade security with multi-layer protection for your data and applications.',
    icon: <Shield className="h-6 w-6" />,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    title: 'Custom Development',
    description: 'Tailored solutions developed to meet your specific business requirements.',
    icon: <Code className="h-6 w-6" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    title: 'High Performance',
    description: 'Optimized solutions built for speed, reliability, and seamless user experience.',
    icon: <Zap className="h-6 w-6" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    title: 'Cloud Native',
    description: 'Modern architecture leveraging the full power of cloud infrastructure.',
    icon: <Cloud className="h-6 w-6" />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    title: 'Data Analytics',
    description: 'Turn your data into actionable insights with advanced analytics capabilities.',
    icon: <BarChart className="h-6 w-6" />,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    title: 'Dedicated Support',
    description: 'Expert team ready to assist you throughout your digital transformation journey.',
    icon: <Users className="h-6 w-6" />,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
  },
];

export default function FeaturesSection({ className }: FeaturesSectionProps): React.ReactElement {
  return (
    <section className={cn('py-20 bg-gray-50 dark:bg-gray-800', className)}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-element-100 dark:bg-element-900/40 text-element-600 dark:text-element-400 rounded-full text-sm font-medium mb-4">
            Core Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our comprehensive platform combines powerful features to drive your digital
            transformation journey forward with confidence.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className={cn('p-4 rounded-lg inline-block mb-4', feature.bgColor)}>
                <div className={feature.color}>{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            All features come with dedicated support and regular updates to ensure optimal
            performance.
          </p>
        </div>
      </div>
    </section>
  );
}
