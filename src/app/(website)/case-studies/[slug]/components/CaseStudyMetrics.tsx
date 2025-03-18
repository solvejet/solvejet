// src/app/(website)/case-studies/[slug]/components/CaseStudyMetrics.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useCaseStudy } from './CaseStudyContext';
import {
  TrendingUp,
  Clock,
  Package,
  Truck,
  AlertTriangle,
  DollarSign,
  Smartphone,
  Users,
  FileMinus,
  BarChart,
  PieChart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import type { JSX } from 'react';

export default function CaseStudyMetrics(): JSX.Element {
  const { caseStudy } = useCaseStudy();
  const { trackEvent } = useAnalytics();
  const [activeMetric, setActiveMetric] = useState<number | null>(null);

  // Get metrics from case study
  const metrics = caseStudy.results.metrics;

  // Animation ref and control
  const metricsRef = React.useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(metricsRef, { once: false, amount: 0.3 });

  // Track metrics view
  useEffect(() => {
    if (isInView) {
      void controls.start('visible');
      trackEvent({
        name: 'case_study_metrics_view',
        category: 'engagement',
        label: 'metrics_view',
        properties: {
          case_study_id: caseStudy.id,
          case_study_title: caseStudy.title,
          metrics_count: metrics.length,
        },
      });
    }
  }, [isInView, controls, trackEvent, caseStudy, metrics.length]);

  // Get icon for metric
  const getMetricIcon = (iconName?: string): JSX.Element => {
    switch (iconName) {
      case 'trending-up':
        return <TrendingUp className="h-5 w-5" />;
      case 'clock':
        return <Clock className="h-5 w-5" />;
      case 'dollar-sign':
        return <DollarSign className="h-5 w-5" />;
      case 'package':
        return <Package className="h-5 w-5" />;
      case 'truck':
        return <Truck className="h-5 w-5" />;
      case 'alert-triangle':
        return <AlertTriangle className="h-5 w-5" />;
      case 'smartphone':
        return <Smartphone className="h-5 w-5" />;
      case 'users':
        return <Users className="h-5 w-5" />;
      case 'file-minus':
        return <FileMinus className="h-5 w-5" />;
      case 'pie-chart':
        return <PieChart className="h-5 w-5" />;
      default:
        return <BarChart className="h-5 w-5" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const handleMetricHover = (index: number): void => {
    setActiveMetric(index);

    trackEvent({
      name: 'case_study_metric_hover',
      category: 'engagement',
      label: 'metric_hover',
      properties: {
        case_study_id: caseStudy.id,
        case_study_title: caseStudy.title,
        metric_label: metrics[index]?.label,
        metric_value: metrics[index]?.value,
      },
    });
  };

  const parseMetricValue = (value: string): number => {
    // Strip any non-numeric characters except decimal points
    const numericValue = value.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue);
  };

  return (
    <motion.div
      ref={metricsRef}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24 z-20"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <BarChart className="h-5 w-5 mr-2 text-element-500" />
        Key Results
      </h3>

      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const isPositive = metric.value.includes('+');
          const rawValue = parseMetricValue(metric.value);
          const isActive = activeMetric === index;

          return (
            <motion.div
              key={index}
              className={cn(
                'rounded-lg p-4 transition-all duration-300',
                isActive
                  ? 'shadow-md -translate-y-1 border border-element-200 bg-element-50'
                  : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'
              )}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onMouseEnter={() => {
                handleMetricHover(index);
              }}
              onMouseLeave={() => {
                setActiveMetric(null);
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div
                    className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center mr-3 transition-colors duration-300',
                      isPositive
                        ? isActive
                          ? 'bg-green-200 text-green-700'
                          : 'bg-green-100 text-green-600'
                        : isActive
                        ? 'bg-blue-200 text-blue-700'
                        : 'bg-blue-100 text-blue-600'
                    )}
                  >
                    {getMetricIcon(metric.icon)}
                  </div>
                  <h4 className="font-medium text-gray-800">{metric.label}</h4>
                </div>
              </div>

              <div className="ml-11">
                <div
                  className={cn(
                    'text-2xl font-bold',
                    isPositive ? 'text-green-600' : 'text-element-600'
                  )}
                >
                  {isInView ? <span className="counter-value">{metric.value}</span> : metric.value}
                </div>

                <div className="h-2 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className={cn(
                      'h-full rounded-full',
                      isPositive ? 'bg-green-500' : 'bg-element-500'
                    )}
                    initial={{ width: '0%' }}
                    animate={
                      isInView
                        ? { width: `${Math.min(rawValue, 100).toString()}%` }
                        : { width: '0%' }
                    }
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {isPositive
                    ? 'Improvement over baseline'
                    : metric.label.toLowerCase().includes('reduction')
                    ? 'Reduction from baseline'
                    : 'Efficiency gain'}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-element-200 hover:bg-element-50/40 transition-all duration-300">
        <h4 className="font-medium text-gray-800 mb-2">Overall Impact</h4>
        <p className="text-sm text-gray-600">
          The implementation achieved significant improvements across key performance indicators,
          resulting in substantial ROI and business growth within the first six months.
        </p>
      </div>
    </motion.div>
  );
}
