// src/app/(website)/case-studies/[slug]/components/CaseStudySolution.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useCaseStudy } from './CaseStudyContext';
import {
  Zap,
  Server,
  Shield,
  BarChart,
  ArrowRight,
  Code,
  Database,
  ListChecks,
  CheckCircle,
  Lightbulb,
  Monitor,
  Smartphone,
  Link2,
  Filter,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Clipboard,
  User,
  Users,
  CreditCard,
  BarChart2,
  HardDrive,
  GitBranch,
  Activity,
  Stethoscope,
  Settings,
  Search,
  Key,
  ClipboardList,
  Shuffle,
  RefreshCw,
  CheckSquare,
  Table,
  FileText,
  EyeOff,
  PieChart,
  Map,
  TrendingUp,
  AlertTriangle,
  Maximize2,
  Copy,
  Package,
  ShoppingCart,
  Truck,
  Navigation,
  Clock,
  Share2,
  Cpu,
  Box,
  Eye,
  LifeBuoy,
  Circle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import type { JSX } from 'react';

export default function CaseStudySolution(): JSX.Element {
  const { caseStudy, sectionRefs, visibleSections, animationComplete, completeAnimation } =
    useCaseStudy();
  const { trackEvent } = useAnalytics();
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'technical' | 'innovative'>(
    'overview'
  );
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  // Animation controller
  const controls = useAnimation();

  // Check if section is in view
  const isSolutionInView = useInView(sectionRefs.solution, { once: false, amount: 0.3 });

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isSolutionInView) {
      void controls.start('visible');
      if (!animationComplete.solution) {
        trackEvent({
          name: 'case_study_section_view',
          category: 'engagement',
          label: 'solution_section_view',
          properties: {
            case_study_id: caseStudy.id,
            case_study_title: caseStudy.title,
            section: 'solution',
          },
        });
        completeAnimation('solution');
      }
    }
  }, [
    isSolutionInView,
    controls,
    animationComplete.solution,
    trackEvent,
    caseStudy,
    completeAnimation,
  ]);

  const handleTabChange = (tab: 'overview' | 'features' | 'technical' | 'innovative'): void => {
    setActiveTab(tab);
    trackEvent({
      name: 'case_study_solution_tab_change',
      category: 'engagement',
      label: `solution_tab_${tab}`,
      properties: {
        case_study_id: caseStudy.id,
        case_study_title: caseStudy.title,
        tab: tab,
      },
    });
  };

  // Get icon for a component based on icon name
  const getIconComponent = (iconName?: string): JSX.Element => {
    switch (iconName) {
      case 'monitor':
        return <Monitor className="h-4 w-4" />;
      case 'smartphone':
        return <Smartphone className="h-4 w-4" />;
      case 'link':
        return <Link2 className="h-4 w-4" />;
      case 'filter':
        return <Filter className="h-4 w-4" />;
      case 'lock':
        return <Lock className="h-4 w-4" />;
      case 'shield':
        return <Shield className="h-4 w-4" />;
      case 'shield-check':
        return <ShieldCheck className="h-4 w-4" />;
      case 'shopping-bag':
        return <ShoppingBag className="h-4 w-4" />;
      case 'clipboard':
        return <Clipboard className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      case 'users':
        return <Users className="h-4 w-4" />;
      case 'credit-card':
        return <CreditCard className="h-4 w-4" />;
      case 'bar-chart':
        return <BarChart className="h-4 w-4" />;
      case 'bar-chart-2':
        return <BarChart2 className="h-4 w-4" />;
      case 'database':
        return <Database className="h-4 w-4" />;
      case 'zap':
        return <Zap className="h-4 w-4" />;
      case 'hard-drive':
        return <HardDrive className="h-4 w-4" />;
      case 'git-branch':
        return <GitBranch className="h-4 w-4" />;
      case 'activity':
        return <Activity className="h-4 w-4" />;
      case 'code':
        return <Code className="h-4 w-4" />;
      case 'stethoscope':
        return <Stethoscope className="h-4 w-4" />;
      case 'settings':
        return <Settings className="h-4 w-4" />;
      case 'search':
        return <Search className="h-4 w-4" />;
      case 'key':
        return <Key className="h-4 w-4" />;
      case 'clipboard-list':
        return <ClipboardList className="h-4 w-4" />;
      case 'shuffle':
        return <Shuffle className="h-4 w-4" />;
      case 'refresh-cw':
        return <RefreshCw className="h-4 w-4" />;
      case 'check-square':
        return <CheckSquare className="h-4 w-4" />;
      case 'table':
        return <Table className="h-4 w-4" />;
      case 'file-text':
        return <FileText className="h-4 w-4" />;
      case 'eye-off':
        return <EyeOff className="h-4 w-4" />;
      case 'pie-chart':
        return <PieChart className="h-4 w-4" />;
      case 'map':
        return <Map className="h-4 w-4" />;
      case 'trending-up':
        return <TrendingUp className="h-4 w-4" />;
      case 'alert-triangle':
        return <AlertTriangle className="h-4 w-4" />;
      case 'maximize-2':
        return <Maximize2 className="h-4 w-4" />;
      case 'copy':
        return <Copy className="h-4 w-4" />;
      case 'package':
        return <Package className="h-4 w-4" />;
      case 'shopping-cart':
        return <ShoppingCart className="h-4 w-4" />;
      case 'truck':
        return <Truck className="h-4 w-4" />;
      case 'navigation':
        return <Navigation className="h-4 w-4" />;
      case 'clock':
        return <Clock className="h-4 w-4" />;
      case 'share-2':
        return <Share2 className="h-4 w-4" />;
      case 'server':
        return <Server className="h-4 w-4" />;
      case 'cpu':
        return <Cpu className="h-4 w-4" />;
      case 'box':
        return <Box className="h-4 w-4" />;
      case 'eye':
        return <Eye className="h-4 w-4" />;
      case 'life-buoy':
        return <LifeBuoy className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  // Feature icons mapping
  const featureIcons = {
    microservices: <Server className="h-6 w-6 text-green-600" />,
    security: <Shield className="h-6 w-6 text-green-600" />,
    realtime: <Zap className="h-6 w-6 text-green-600" />,
    analytics: <BarChart className="h-6 w-6 text-green-600" />,
    code: <Code className="h-6 w-6 text-green-600" />,
    database: <Database className="h-6 w-6 text-green-600" />,
  };

  const hasDetailedSolution =
    caseStudy.solutionDetails &&
    (caseStudy.solutionDetails.keyFeatures ??
      caseStudy.solutionDetails.technicalHighlights ??
      caseStudy.solutionDetails.innovativeApproaches);

  return (
    <motion.section
      ref={sectionRefs.solution}
      id="solution"
      className={cn(
        'scroll-mt-20 py-8 transition-opacity duration-500',
        visibleSections.solution ? 'opacity-100' : 'opacity-90'
      )}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.div variants={itemVariants} className="flex items-center mb-6">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mr-4">
          <Zap className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">The Solution</h2>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl border border-green-100 mb-10 hover:shadow-lg transition-all duration-300 hover:border-green-200"
      >
        <p className="text-lg text-gray-700 leading-relaxed">{caseStudy.solution}</p>

        {caseStudy.solutionDetails?.architecture && (
          <div className="mt-6 bg-white/60 p-4 rounded-lg border border-green-100">
            <h3 className="font-semibold text-gray-800 flex items-center mb-2">
              <Server className="h-5 w-5 mr-2 text-green-600" />
              Architecture Approach
            </h3>
            <p className="text-gray-700">{caseStudy.solutionDetails.architecture}</p>
          </div>
        )}
      </motion.div>

      {/* Solution details tabs - only show if there are detailed solutions */}
      {hasDetailedSolution && (
        <motion.div variants={itemVariants} className="mb-12">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => {
                  handleTabChange('overview');
                }}
                className={cn(
                  'py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm',
                  activeTab === 'overview'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <Zap className="mr-2 h-4 w-4" />
                Overview
              </button>

              {caseStudy.solutionDetails?.keyFeatures && (
                <button
                  onClick={() => {
                    handleTabChange('features');
                  }}
                  className={cn(
                    'py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm',
                    activeTab === 'features'
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  <ListChecks className="mr-2 h-4 w-4" />
                  Key Features
                </button>
              )}

              {caseStudy.solutionDetails?.technicalHighlights && (
                <button
                  onClick={() => {
                    handleTabChange('technical');
                  }}
                  className={cn(
                    'py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm',
                    activeTab === 'technical'
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Technical Details
                </button>
              )}

              {caseStudy.solutionDetails?.innovativeApproaches && (
                <button
                  onClick={() => {
                    handleTabChange('innovative');
                  }}
                  className={cn(
                    'py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm',
                    activeTab === 'innovative'
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Innovative Approaches
                </button>
              )}
            </nav>
          </div>

          {/* Tab content */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Solution Overview</h3>
                <p className="text-gray-700 mb-6">{caseStudy.solution}</p>

                {caseStudy.implementationDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Implementation Timeline</h4>
                      <p className="text-gray-700">{caseStudy.implementationDetails.timeline}</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Team Composition</h4>
                      <p className="text-gray-700">{caseStudy.implementationDetails.team}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'features' && caseStudy.solutionDetails?.keyFeatures && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Solution Features</h3>
                <ul className="space-y-4">
                  {caseStudy.solutionDetails.keyFeatures.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'technical' && caseStudy.solutionDetails?.technicalHighlights && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Highlights</h3>
                <ul className="space-y-4">
                  {caseStudy.solutionDetails.technicalHighlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3">
                        <Code className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'innovative' && caseStudy.solutionDetails?.innovativeApproaches && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Innovative Approaches</h3>
                <ul className="space-y-4">
                  {caseStudy.solutionDetails.innovativeApproaches.map((approach, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3">
                        <Lightbulb className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-gray-700">{approach}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Solution features */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <motion.div
          className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
          whileHover={{
            y: -8,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderColor: 'rgb(209, 250, 229)',
          }}
        >
          {/* Background glow effect */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-green-200/30 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            {featureIcons.microservices}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Microservices Architecture</h3>
          <p className="text-gray-600 mb-4">
            Modular design that enables independent deployment and maintenance of components, with
            improved scalability and resilience.
          </p>
          <div className="flex items-center text-green-600 text-sm font-medium group">
            <span>Learn more</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
          whileHover={{
            y: -8,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderColor: 'rgb(209, 250, 229)',
          }}
        >
          {/* Background glow effect */}
          <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-green-200/30 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            {featureIcons.security}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Security</h3>
          <p className="text-gray-600 mb-4">
            Multi-layered protection with encryption, access controls, and automated threat
            detection to safeguard sensitive data.
          </p>
          <div className="flex items-center text-green-600 text-sm font-medium group">
            <span>Learn more</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
          whileHover={{
            y: -8,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderColor: 'rgb(209, 250, 229)',
          }}
        >
          {/* Background glow effect */}
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-green-200/30 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            {featureIcons.realtime}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Processing</h3>
          <p className="text-gray-600 mb-4">
            Instant data processing for up-to-the-minute insights and operational efficiency,
            reducing latency by over 80%.
          </p>
          <div className="flex items-center text-green-600 text-sm font-medium group">
            <span>Learn more</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
          whileHover={{
            y: -8,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderColor: 'rgb(209, 250, 229)',
          }}
        >
          {/* Background glow effect */}
          <div className="absolute -left-6 -top-6 w-32 h-32 bg-green-200/30 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            {featureIcons.analytics}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Analytics</h3>
          <p className="text-gray-600 mb-4">
            Integrated business intelligence with intuitive dashboards and reporting for data-driven
            decision making.
          </p>
          <div className="flex items-center text-green-600 text-sm font-medium group">
            <span>Learn more</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </motion.div>
      </motion.div>

      {/* Architecture Diagram Section */}
      {caseStudy.solutionDetails?.architectureDiagram ? (
        <motion.div
          variants={itemVariants}
          className="mt-16 p-8 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-green-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Solution Architecture
          </h3>

          <div className="relative max-w-5xl mx-auto">
            {caseStudy.solutionDetails.architectureDiagram.layers.map((layer, layerIndex) => {
              // Get the color scheme for this layer
              const getColorScheme = (
                colorName: string
              ): {
                badge: string;
                component: string;
                hoverBg: string;
              } => {
                switch (colorName.toLowerCase()) {
                  case 'blue':
                    return {
                      badge: 'bg-blue-100 text-blue-700',
                      component:
                        'bg-blue-50 border-blue-100 hover:bg-blue-100 hover:border-blue-200',
                      hoverBg: 'rgb(219, 234, 254)', // blue-100
                    };
                  case 'purple':
                    return {
                      badge: 'bg-purple-100 text-purple-700',
                      component:
                        'bg-purple-50 border-purple-100 hover:bg-purple-100 hover:border-purple-200',
                      hoverBg: 'rgb(237, 233, 254)', // purple-100
                    };
                  case 'green':
                    return {
                      badge: 'bg-green-100 text-green-700',
                      component:
                        'bg-green-50 border-green-100 hover:bg-green-100 hover:border-green-200',
                      hoverBg: 'rgb(220, 252, 231)', // green-100
                    };
                  case 'yellow':
                    return {
                      badge: 'bg-yellow-100 text-yellow-700',
                      component:
                        'bg-yellow-50 border-yellow-100 hover:bg-yellow-100 hover:border-yellow-200',
                      hoverBg: 'rgb(254, 249, 195)', // yellow-100
                    };
                  case 'red':
                    return {
                      badge: 'bg-red-100 text-red-700',
                      component: 'bg-red-50 border-red-100 hover:bg-red-100 hover:border-red-200',
                      hoverBg: 'rgb(254, 226, 226)', // red-100
                    };
                  case 'orange':
                    return {
                      badge: 'bg-orange-100 text-orange-700',
                      component:
                        'bg-orange-50 border-orange-100 hover:bg-orange-100 hover:border-orange-200',
                      hoverBg: 'rgb(255, 237, 213)', // orange-100
                    };
                  case 'gray':
                    return {
                      badge: 'bg-gray-100 text-gray-700',
                      component:
                        'bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-200',
                      hoverBg: 'rgb(243, 244, 246)', // gray-100
                    };
                  default:
                    return {
                      badge: 'bg-gray-100 text-gray-700',
                      component:
                        'bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-200',
                      hoverBg: 'rgb(243, 244, 246)', // gray-100
                    };
                }
              };

              const colorScheme = getColorScheme(layer.color);
              const isLayerHovered = hoveredLayer === layerIndex;

              return (
                <motion.div
                  className={cn(
                    'mb-16 relative transition-all duration-300',
                    isLayerHovered ? 'scale-105 z-10' : 'scale-100 z-0'
                  )}
                  key={`layer-${String(layerIndex)}`}
                  id={`layer-${String(layerIndex)}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: layerIndex * 0.1 }}
                  onMouseEnter={() => {
                    setHoveredLayer(layerIndex);
                  }}
                  onMouseLeave={() => {
                    setHoveredLayer(null);
                  }}
                >
                  <div className="text-center mb-4">
                    <span
                      className={`${colorScheme.badge} rounded-full px-4 py-1 text-sm font-medium`}
                    >
                      {layer.name}
                    </span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    {layer.components.map((component, componentIndex) => (
                      <motion.div
                        key={`component-${String(layerIndex)}-${String(componentIndex)}`}
                        className={`px-4 py-3 w-auto min-w-40 text-center ${colorScheme.component} rounded-md transition-all duration-300 relative group`}
                        whileHover={{
                          y: -2,
                          backgroundColor: colorScheme.hoverBg,
                          scale: 1.03,
                        }}
                        title={component.description}
                      >
                        <div className="flex items-center justify-center mb-1">
                          <div
                            className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${colorScheme.badge.replace(
                              'bg-',
                              'bg-opacity-70 bg-'
                            )}`}
                          >
                            {component.icon ? (
                              getIconComponent(component.icon)
                            ) : (
                              <Circle className="h-4 w-4" />
                            )}
                          </div>
                          <span className="font-medium">{component.name}</span>
                        </div>

                        {/* Hover tooltip with description */}
                        {component.description && (
                          <div className="absolute z-10 w-64 p-2 -mt-1 text-sm bg-gray-800 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none transform -translate-x-1/2 left-1/2 translate-y-2 invisible group-hover:visible">
                            {component.description}
                            <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Connecting arrow (except for the last layer) */}
                  {layerIndex <
                    (caseStudy.solutionDetails?.architectureDiagram?.layers.length ?? 0) - 1 && (
                    <div className="h-8 flex justify-center items-center">
                      <svg width="24" height="24" className="text-gray-400">
                        <path
                          fill="currentColor"
                          d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Layer navigation sidebar */}
            <div className="hidden lg:flex flex-col fixed left-8 top-1/2 transform -translate-y-1/2 space-y-3">
              {caseStudy.solutionDetails.architectureDiagram.layers.map((layer, index) => {
                const getLayerColor = (colorName: string): string => {
                  switch (colorName.toLowerCase()) {
                    case 'blue':
                      return 'bg-blue-500';
                    case 'purple':
                      return 'bg-purple-500';
                    case 'green':
                      return 'bg-green-500';
                    case 'yellow':
                      return 'bg-yellow-500';
                    case 'red':
                      return 'bg-red-500';
                    case 'orange':
                      return 'bg-orange-500';
                    case 'gray':
                      return 'bg-gray-500';
                    default:
                      return 'bg-gray-500';
                  }
                };

                const colorClass = getLayerColor(layer.color);

                return (
                  <button
                    key={`nav-${String(index)}`}
                    className={`h-3 w-3 rounded-full ${colorClass} ${
                      hoveredLayer === index ? 'scale-150' : 'scale-100'
                    } transition-all duration-300`}
                    title={layer.name}
                    onClick={() => {
                      const element = document.getElementById(`layer-${String(index)}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                      setHoveredLayer(index);

                      // Track layer navigation click
                      trackEvent({
                        name: 'architecture_layer_click',
                        category: 'engagement',
                        label: `architecture_layer_${layer.name}`,
                        properties: {
                          case_study_id: caseStudy.id,
                          layer_name: layer.name,
                        },
                      });
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Architecture notes */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Architecture Notes</h4>
            <p className="text-gray-600">
              This architectural approach ensures scalability, maintainability, and resilience
              through clear separation of concerns and well-defined interfaces between layers. Each
              component is designed to be independently deployable and scalable, enabling rapid
              iterations and targeted optimizations.
            </p>
          </div>
        </motion.div>
      ) : (
        // Fallback diagram for case studies without the architecture diagram data
        <motion.div
          variants={itemVariants}
          className="mt-16 p-8 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-green-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Solution Architecture
          </h3>

          <div className="relative max-w-3xl mx-auto">
            {/* Client Layer */}
            <div className="mb-16">
              <div className="text-center mb-4">
                <span className="bg-blue-100 text-blue-700 rounded-full px-4 py-1 text-sm font-medium">
                  Client Layer
                </span>
              </div>
              <div className="flex justify-center space-x-4">
                <motion.div
                  className="px-4 py-2 w-32 text-center bg-blue-50 rounded-md border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  Web App
                </motion.div>
                <motion.div
                  className="px-4 py-2 w-32 text-center bg-blue-50 rounded-md border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  Mobile App
                </motion.div>
                <motion.div
                  className="px-4 py-2 w-32 text-center bg-blue-50 rounded-md border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  API Clients
                </motion.div>
              </div>

              {/* Connecting arrow */}
              <div className="h-8 flex justify-center items-center">
                <svg width="24" height="24" className="text-gray-400">
                  <path
                    fill="currentColor"
                    d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"
                  />
                </svg>
              </div>
            </div>

            {/* API Gateway */}
            <div className="mb-16">
              <motion.div
                className="px-4 py-2 max-w-xs mx-auto text-center bg-purple-50 rounded-md border border-purple-100 hover:bg-purple-100 hover:border-purple-200 transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                API Gateway & Authentication
              </motion.div>

              {/* Connecting arrow */}
              <div className="h-8 flex justify-center items-center">
                <svg width="24" height="24" className="text-gray-400">
                  <path
                    fill="currentColor"
                    d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"
                  />
                </svg>
              </div>
            </div>

            {/* Microservices Layer */}
            <div className="mb-16">
              <div className="text-center mb-4">
                <span className="bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-medium">
                  Microservices Layer
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'User Service',
                  'Product Service',
                  'Order Service',
                  'Payment Service',
                  'Analytics Service',
                ].map((service, i) => (
                  <motion.div
                    key={i}
                    className="px-4 py-2 w-40 text-center bg-green-50 rounded-md border border-green-100 hover:bg-green-100 hover:border-green-200 transition-all duration-300"
                    whileHover={{ y: -2, backgroundColor: 'rgb(220, 252, 231)' }}
                  >
                    {service}
                  </motion.div>
                ))}
              </div>

              {/* Connecting arrow */}
              <div className="h-8 flex justify-center items-center">
                <svg width="24" height="24" className="text-gray-400">
                  <path
                    fill="currentColor"
                    d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"
                  />
                </svg>
              </div>
            </div>

            {/* Data Layer */}
            <div>
              <div className="text-center mb-4">
                <span className="bg-yellow-100 text-yellow-700 rounded-full px-4 py-1 text-sm font-medium">
                  Data Layer
                </span>
              </div>
              <div className="flex justify-center space-x-4">
                {['Document Store', 'Cache Layer', 'Object Storage'].map((storage, i) => (
                  <motion.div
                    key={i}
                    className="px-4 py-2 w-32 text-center bg-yellow-50 rounded-md border border-yellow-100 hover:bg-yellow-100 hover:border-yellow-200 transition-all duration-300"
                    whileHover={{ y: -2, backgroundColor: 'rgb(254, 249, 195)' }}
                  >
                    {storage}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
