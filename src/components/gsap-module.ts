// src/components/gsap-module.ts
// This file serves as a dynamic import layer for GSAP to prevent it from blocking initial render

interface Killable {
  kill: () => void;
}

// Define a more flexible interface using Record for our module
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GSAPInterface = Record<string, any>;

interface GSAPReturn {
  gsap: GSAPInterface;
  ScrollTrigger: GSAPInterface;
}

// Import GSAP dynamically
const setupGsap = async (): Promise<GSAPReturn> => {
  try {
    // Import the core GSAP library
    const gsapCore = await import('gsap');
    const { gsap } = gsapCore;

    // Import ScrollTrigger plugin
    const ScrollTriggerModule = await import('gsap/dist/ScrollTrigger');
    const { ScrollTrigger } = ScrollTriggerModule;

    // Register the plugin
    gsap.registerPlugin(ScrollTrigger);

    // Return both for use
    return {
      gsap: gsap as GSAPInterface,
      ScrollTrigger: ScrollTrigger as unknown as GSAPInterface,
    };
  } catch (error) {
    console.error('Error loading GSAP:', error);

    // Create a mock object with ESLint disable comments for empty methods
    const createEmptyMethod = () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return (): void => {};
    };

    // Return a minimal implementation to prevent crashes
    return {
      gsap: {
        utils: {
          toArray: (): unknown[] => [],
        },
        ticker: {
          add: createEmptyMethod(),
          remove: createEmptyMethod(),
          lagSmoothing: createEmptyMethod(),
        },
        globalTimeline: {
          clear: createEmptyMethod(),
        },
        registerPlugin: createEmptyMethod(),
      },
      ScrollTrigger: {
        create: (): Record<string, never> => ({}),
        update: createEmptyMethod(),
        getAll: (): Killable[] => [],
        refresh: createEmptyMethod(),
      },
    };
  }
};

// Create and export the GSAP module
const GsapModule = setupGsap();

export default GsapModule;
