// src/hooks/useConversionTracking.ts
"use client";

import { useCallback } from "react";
import { useAuthenticatedFetch } from "@/components/providers/CSRFProvider";

export interface ConversionData {
  event: string;
  platform: "linkedin" | "meta" | "both";
  userData: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    externalId?: string;
  };
  customData?: {
    value?: number;
    currency?: string;
    contentIds?: string[];
    contentType?: string;
    contentName?: string;
    contentCategory?: string;
    numItems?: number;
    enquiryType?: string;
    projectValue?: number;
    [key: string]: unknown;
  };
  eventId?: string;
  eventSourceUrl?: string;
}

export interface ConversionResult {
  success: boolean;
  results?: {
    linkedin?: { success: boolean; error?: string };
    meta?: { success: boolean; error?: string };
  };
  warning?: string;
  error?: string;
}

export const useConversionTracking = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  const trackConversion = useCallback(
    async (data: ConversionData): Promise<ConversionResult> => {
      try {
        const response = await authenticatedFetch("/api/conversions", {
          method: "POST",
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          return {
            success: false,
            error:
              errorData.error ||
              `HTTP ${response.status}: ${response.statusText}`,
          };
        }

        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Conversion tracking error:", error);
        return {
          success: false,
          error:
            error instanceof Error ? error.message : "Network error occurred",
        };
      }
    },
    [authenticatedFetch]
  );

  // Predefined tracking methods for common events
  const trackContactFormSubmission = useCallback(
    async (
      email: string,
      firstName?: string,
      lastName?: string,
      phone?: string,
      enquiryType?: string,
      platform: "linkedin" | "meta" | "both" = "both"
    ): Promise<ConversionResult> => {
      return trackConversion({
        event: "contact",
        platform,
        userData: {
          email,
          firstName,
          lastName,
          phone,
        },
        customData: {
          enquiryType,
          contentName: "Contact Form",
          contentCategory: "lead_generation",
        },
        eventId: `contact_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      });
    },
    [trackConversion]
  );

  const trackLeadGeneration = useCallback(
    async (
      email: string,
      firstName?: string,
      lastName?: string,
      phone?: string,
      value?: number,
      currency: string = "USD",
      platform: "linkedin" | "meta" | "both" = "both"
    ): Promise<ConversionResult> => {
      return trackConversion({
        event: "lead",
        platform,
        userData: {
          email,
          firstName,
          lastName,
          phone,
        },
        customData: {
          value,
          currency,
          contentName: "Lead Generation",
          contentCategory: "lead",
        },
        eventId: `lead_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      });
    },
    [trackConversion]
  );

  const trackQuoteRequest = useCallback(
    async (
      email: string,
      firstName?: string,
      lastName?: string,
      phone?: string,
      projectValue?: number,
      enquiryType?: string,
      platform: "linkedin" | "meta" | "both" = "both"
    ): Promise<ConversionResult> => {
      return trackConversion({
        event: "quote",
        platform,
        userData: {
          email,
          firstName,
          lastName,
          phone,
        },
        customData: {
          projectValue,
          value: projectValue,
          currency: "USD",
          enquiryType,
          contentName: "Quote Request",
          contentCategory: "quote",
        },
        eventId: `quote_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      });
    },
    [trackConversion]
  );

  const trackNewsletterSignup = useCallback(
    async (
      email: string,
      firstName?: string,
      lastName?: string,
      platform: "linkedin" | "meta" | "both" = "both"
    ): Promise<ConversionResult> => {
      return trackConversion({
        event: "subscribe",
        platform,
        userData: {
          email,
          firstName,
          lastName,
        },
        customData: {
          contentName: "Newsletter Subscription",
          contentCategory: "newsletter",
        },
        eventId: `newsletter_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      });
    },
    [trackConversion]
  );

  const trackRegistration = useCallback(
    async (
      email: string,
      firstName?: string,
      lastName?: string,
      phone?: string,
      platform: "linkedin" | "meta" | "both" = "both"
    ): Promise<ConversionResult> => {
      return trackConversion({
        event: "complete_registration",
        platform,
        userData: {
          email,
          firstName,
          lastName,
          phone,
        },
        customData: {
          contentName: "User Registration",
          contentCategory: "registration",
        },
        eventId: `registration_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      });
    },
    [trackConversion]
  );

  const trackPageView = useCallback(
    async (
      contentName?: string,
      contentCategory?: string,
      email?: string,
      platform: "linkedin" | "meta" | "both" = "both"
    ): Promise<ConversionResult> => {
      return trackConversion({
        event: "page_view",
        platform,
        userData: {
          email,
        },
        customData: {
          contentName: contentName || document.title,
          contentCategory: contentCategory || "website",
          contentType: "page",
        },
        eventId: `pageview_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        eventSourceUrl: window.location.href,
      });
    },
    [trackConversion]
  );

  const trackViewContent = useCallback(
    async (
      contentIds: string[],
      contentType: string,
      contentName?: string,
      value?: number,
      currency: string = "USD",
      email?: string,
      platform: "linkedin" | "meta" | "both" = "meta" // Usually Meta-specific
    ): Promise<ConversionResult> => {
      return trackConversion({
        event: "view_content",
        platform,
        userData: {
          email,
        },
        customData: {
          contentIds,
          contentType,
          contentName,
          value,
          currency,
        },
        eventId: `view_content_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      });
    },
    [trackConversion]
  );

  const trackInitiateCheckout = useCallback(
    async (
      contentIds: string[],
      value: number,
      numItems: number = 1,
      currency: string = "USD",
      email?: string,
      platform: "linkedin" | "meta" | "both" = "meta"
    ): Promise<ConversionResult> => {
      return trackConversion({
        event: "initiate_checkout",
        platform,
        userData: {
          email,
        },
        customData: {
          contentIds,
          contentType: "product",
          value,
          currency,
          numItems,
        },
        eventId: `initiate_checkout_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      });
    },
    [trackConversion]
  );

  const trackPurchase = useCallback(
    async (
      contentIds: string[],
      value: number,
      currency: string = "USD",
      email?: string,
      firstName?: string,
      lastName?: string,
      phone?: string,
      numItems?: number,
      platform: "linkedin" | "meta" | "both" = "both"
    ): Promise<ConversionResult> => {
      return trackConversion({
        event: "purchase",
        platform,
        userData: {
          email,
          firstName,
          lastName,
          phone,
        },
        customData: {
          contentIds,
          contentType: "product",
          value,
          currency,
          numItems,
        },
        eventId: `purchase_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      });
    },
    [trackConversion]
  );

  return {
    trackConversion,
    trackContactFormSubmission,
    trackLeadGeneration,
    trackQuoteRequest,
    trackNewsletterSignup,
    trackRegistration,
    trackPageView,
    trackViewContent,
    trackInitiateCheckout,
    trackPurchase,
  };
};

export default useConversionTracking;
