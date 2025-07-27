// src/lib/analytics.ts

// Google Analytics gtag function types
type GtagCommand = "config" | "event" | "js" | "set";

interface GtagConfigParams {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  send_page_view?: boolean;
  [key: string]: unknown;
}

interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
}

type GtagFunction = (
  command: GtagCommand,
  targetId: string | Date,
  config?: GtagConfigParams | GtagEventParams
) => void;

// Other analytics function types
type ClarityFunction = (...args: unknown[]) => void;
type HotjarFunction = (...args: unknown[]) => void;
type FacebookPixelFunction = (...args: unknown[]) => void;
type LinkedInFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag: GtagFunction;
    dataLayer: unknown[];
    clarity: ClarityFunction;
    hj: HotjarFunction;
    fbq: FacebookPixelFunction;
    _linkedin_partner_id: string;
    lintrk: LinkedInFunction;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";
export const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID ?? "";
export const LINKEDIN_PARTNER_ID =
  process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? "";
export const FACEBOOK_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? "";

// Google Analytics
export const gtag: GtagFunction = (command, targetId, config) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(command, targetId, config);
  }
};

// Track page views
export const pageview = (url: string): void => {
  gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track events
interface EventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({
  action,
  category,
  label,
  value,
}: EventParams): void => {
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
