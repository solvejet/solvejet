// src/lib/gsap.ts

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Animation presets
export const animations = {
  fadeIn: (element: string | Element, duration = 1) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration, ease: "power2.out" }
    );
  },

  slideIn: (
    element: string | Element,
    direction: "left" | "right" = "left",
    duration = 1
  ) => {
    const x = direction === "left" ? -100 : 100;
    return gsap.fromTo(
      element,
      { opacity: 0, x },
      { opacity: 1, x: 0, duration, ease: "power2.out" }
    );
  },

  scaleIn: (element: string | Element, duration = 0.8) => {
    return gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration, ease: "back.out(1.7)" }
    );
  },

  stagger: (elements: string | Element[], duration = 0.6) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration, stagger: 0.1, ease: "power2.out" }
    );
  },

  parallax: (element: string | Element, speed = 0.5) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  },

  typeWriter: (element: string | Element, text: string, duration = 2) => {
    return gsap.to(element, {
      duration,
      text: text,
      ease: "none",
    });
  },
};

// Utility functions
export const createTimeline = (options?: gsap.TimelineVars) => {
  return gsap.timeline(options);
};

export const killScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

export { gsap };
