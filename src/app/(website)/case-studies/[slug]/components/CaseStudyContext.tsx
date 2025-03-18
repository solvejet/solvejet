// src/app/(website)/case-studies/[slug]/components/CaseStudyContext.tsx
'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import type { CaseStudy, CaseStudySummary } from '@/types/case-study';

// Define the types to accommodate React's RefObject behavior
interface CaseStudyContextType {
  caseStudy: CaseStudy;
  relatedCaseStudies: CaseStudySummary[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  sectionRefs: {
    overview: React.RefObject<HTMLElement | null>;
    challenge: React.RefObject<HTMLElement | null>;
    approach: React.RefObject<HTMLElement | null>;
    solution: React.RefObject<HTMLElement | null>;
    results: React.RefObject<HTMLElement | null>;
    technology: React.RefObject<HTMLElement | null>;
  };
  visibleSections: Record<string, boolean>;
  animationComplete: Record<string, boolean>;
  completeAnimation: (section: string) => void;
}

const CaseStudyContext = createContext<CaseStudyContextType | undefined>(undefined);

export const useCaseStudy = (): CaseStudyContextType => {
  const context = useContext(CaseStudyContext);
  if (context === undefined) {
    throw new Error('useCaseStudy must be used within a CaseStudyProvider');
  }
  return context;
};

interface CaseStudyProviderProps {
  children: React.ReactNode;
  caseStudy: CaseStudy;
  relatedCaseStudies: CaseStudySummary[];
}

export const CaseStudyProvider: React.FC<CaseStudyProviderProps> = ({
  children,
  caseStudy,
  relatedCaseStudies,
}) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    overview: false,
    challenge: false,
    approach: false,
    solution: false,
    results: false,
    technology: false,
  });

  const [animationComplete, setAnimationComplete] = useState<Record<string, boolean>>({
    overview: false,
    challenge: false,
    approach: false,
    solution: false,
    results: false,
    technology: false,
  });

  // Create individual refs for each section
  const overviewRef = useRef<HTMLElement>(null);
  const challengeRef = useRef<HTMLElement>(null);
  const approachRef = useRef<HTMLElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const technologyRef = useRef<HTMLElement>(null);

  // Set up intersection observer to track visible sections
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const observers: IntersectionObserver[] = [];
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, // 30% of the element must be visible
    };

    // Check each ref one by one to avoid type issues
    if (overviewRef.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.warn('Section overview is now visible');
            setActiveSection('overview');
          }
          setVisibleSections(prev => ({ ...prev, overview: entry.isIntersecting }));
        });
      }, observerOptions);
      observer.observe(overviewRef.current);
      observers.push(observer);
    } else {
      console.warn('Ref for overview section is not attached yet');
    }

    if (challengeRef.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.warn('Section challenge is now visible');
            setActiveSection('challenge');
          }
          setVisibleSections(prev => ({ ...prev, challenge: entry.isIntersecting }));
        });
      }, observerOptions);
      observer.observe(challengeRef.current);
      observers.push(observer);
    } else {
      console.warn('Ref for challenge section is not attached yet');
    }

    if (approachRef.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.warn('Section approach is now visible');
            setActiveSection('approach');
          }
          setVisibleSections(prev => ({ ...prev, approach: entry.isIntersecting }));
        });
      }, observerOptions);
      observer.observe(approachRef.current);
      observers.push(observer);
    } else {
      console.warn('Ref for approach section is not attached yet');
    }

    if (solutionRef.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.warn('Section solution is now visible');
            setActiveSection('solution');
          }
          setVisibleSections(prev => ({ ...prev, solution: entry.isIntersecting }));
        });
      }, observerOptions);
      observer.observe(solutionRef.current);
      observers.push(observer);
    } else {
      console.warn('Ref for solution section is not attached yet');
    }

    if (resultsRef.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.warn('Section results is now visible');
            setActiveSection('results');
          }
          setVisibleSections(prev => ({ ...prev, results: entry.isIntersecting }));
        });
      }, observerOptions);
      observer.observe(resultsRef.current);
      observers.push(observer);
    } else {
      console.warn('Ref for results section is not attached yet');
    }

    if (technologyRef.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.warn('Section technology is now visible');
            setActiveSection('technology');
          }
          setVisibleSections(prev => ({ ...prev, technology: entry.isIntersecting }));
        });
      }, observerOptions);
      observer.observe(technologyRef.current);
      observers.push(observer);
    } else {
      console.warn('Ref for technology section is not attached yet');
    }

    // Return cleanup function to disconnect observers
    return (): void => {
      observers.forEach(observer => {
        observer.disconnect();
      });
    };
  }, []);

  // Create a second useEffect to check ref attachment
  useEffect(() => {
    const checkRefs = {
      overview: overviewRef.current !== null,
      challenge: challengeRef.current !== null,
      approach: approachRef.current !== null,
      solution: solutionRef.current !== null,
      results: resultsRef.current !== null,
      technology: technologyRef.current !== null,
    };

    const unattachedRefs = Object.entries(checkRefs)
      .filter(([, attached]) => !attached)
      .map(([section]) => section);

    if (unattachedRefs.length > 0) {
      console.warn(`Some section refs still not attached: ${unattachedRefs.join(', ')}`);
    }
  }, []);

  const completeAnimation = (section: string): void => {
    setAnimationComplete(prev => ({
      ...prev,
      [section]: true,
    }));
  };

  // Create the context value with proper typing
  const sectionRefs = {
    overview: overviewRef,
    challenge: challengeRef,
    approach: approachRef,
    solution: solutionRef,
    results: resultsRef,
    technology: technologyRef,
  };

  const value: CaseStudyContextType = {
    caseStudy,
    relatedCaseStudies,
    activeSection,
    setActiveSection,
    sectionRefs,
    visibleSections,
    animationComplete,
    completeAnimation,
  };

  return <CaseStudyContext.Provider value={value}>{children}</CaseStudyContext.Provider>;
};
