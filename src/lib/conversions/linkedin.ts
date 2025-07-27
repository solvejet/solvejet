// src/lib/conversions/linkedin.ts
import { NextRequest } from "next/server";
import { extractClientIP } from "@/lib/utils/ip-extraction";

export interface LinkedInConversionEvent {
  conversion_rule_id: string;
  user: {
    sha256_email_address?: string;
    sha256_first_name?: string;
    sha256_last_name?: string;
    linkedin_first_party_ads_tracking_uuid?: string;
    acxiom_id?: string;
    oracle_moat_id?: string;
  };
  conversion_happened_at: number;
  conversion_value?: {
    currency_code: string;
    amount: string;
  };
  event_id?: string;
  user_agent?: string;
  ip_address?: string;
}

export interface LinkedInConversionPayload {
  elements: LinkedInConversionEvent[];
}

interface LinkedInAPIResponse {
  message?: string;
  [key: string]: unknown;
}

class LinkedInConversionAPI {
  private readonly baseUrl = "https://api.linkedin.com/rest/conversions";
  private readonly accessToken: string;
  private readonly partnerId: string;

  constructor() {
    this.accessToken = process.env.LINKEDIN_ACCESS_TOKEN || "";
    this.partnerId = process.env.LINKEDIN_PARTNER_ID || "";

    if (!this.accessToken || !this.partnerId) {
      console.warn(
        "LinkedIn Conversion API: Missing required environment variables"
      );
    }
  }

  /**
   * Hash string using SHA-256
   */
  private async hashSHA256(value: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(value.toLowerCase().trim());
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  /**
   * Extract user data from request
   */
  private async extractUserData(
    request: NextRequest,
    email?: string,
    firstName?: string,
    lastName?: string
  ) {
    const userAgent = request.headers.get("user-agent") || "";

    // Use the utility function to extract IP address
    const ipAddress = extractClientIP(request);

    // Hash PII data
    const user: LinkedInConversionEvent["user"] = {};

    if (email) {
      user.sha256_email_address = await this.hashSHA256(email);
    }

    if (firstName) {
      user.sha256_first_name = await this.hashSHA256(firstName);
    }

    if (lastName) {
      user.sha256_last_name = await this.hashSHA256(lastName);
    }

    // Extract LinkedIn first-party tracking UUID from cookies
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      // LinkedIn uses different cookie names for tracking
      const linkedinTrackingId =
        cookies["li_fat_id"] ||
        cookies["linkedin_oauth_token"] ||
        cookies["li_sugr"];

      if (linkedinTrackingId) {
        user.linkedin_first_party_ads_tracking_uuid = linkedinTrackingId;
      }
    }

    return {
      user,
      userAgent,
      ipAddress,
    };
  }

  /**
   * Send conversion event to LinkedIn
   */
  async trackConversion(
    conversionRuleId: string,
    request: NextRequest,
    options: {
      email?: string;
      firstName?: string;
      lastName?: string;
      value?: number;
      currency?: string;
      eventId?: string;
    } = {}
  ): Promise<{
    success: boolean;
    error?: string;
    response?: Record<string, unknown>;
  }> {
    if (!this.accessToken || !this.partnerId) {
      return {
        success: false,
        error: "LinkedIn Conversion API not configured",
      };
    }

    try {
      const { user, userAgent, ipAddress } = await this.extractUserData(
        request,
        options.email,
        options.firstName,
        options.lastName
      );

      const conversionEvent: LinkedInConversionEvent = {
        conversion_rule_id: conversionRuleId,
        user,
        conversion_happened_at: Date.now(),
        user_agent: userAgent,
        ip_address: ipAddress,
      };

      // Add conversion value if provided
      if (options.value && options.currency) {
        conversionEvent.conversion_value = {
          currency_code: options.currency.toUpperCase(),
          amount: options.value.toString(),
        };
      }

      // Add event ID for deduplication
      if (options.eventId) {
        conversionEvent.event_id = options.eventId;
      }

      const payload: LinkedInConversionPayload = {
        elements: [conversionEvent],
      };

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
          "LinkedIn-Version": "202310",
          "X-Restli-Protocol-Version": "2.0.0",
        },
        body: JSON.stringify(payload),
      });

      const responseData = (await response.json()) as LinkedInAPIResponse;

      if (!response.ok) {
        console.error("LinkedIn Conversion API Error:", responseData);
        return {
          success: false,
          error: `LinkedIn API Error: ${response.status} - ${
            responseData.message || "Unknown error"
          }`,
          response: responseData,
        };
      }

      return {
        success: true,
        response: responseData,
      };
    } catch (error) {
      console.error("LinkedIn Conversion API Exception:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Predefined conversion tracking methods for common events
   */
  async trackContactFormSubmission(
    request: NextRequest,
    email?: string,
    firstName?: string,
    lastName?: string
  ) {
    const conversionRuleId = process.env.LINKEDIN_CONTACT_CONVERSION_ID || "";

    if (!conversionRuleId) {
      console.warn("LinkedIn Contact Conversion ID not configured");
      return { success: false, error: "Conversion rule not configured" };
    }

    return this.trackConversion(conversionRuleId, request, {
      email,
      firstName,
      lastName,
      eventId: `contact_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
    });
  }

  async trackQuoteRequest(
    request: NextRequest,
    email?: string,
    firstName?: string,
    lastName?: string,
    projectValue?: number
  ) {
    const conversionRuleId = process.env.LINKEDIN_QUOTE_CONVERSION_ID || "";

    if (!conversionRuleId) {
      console.warn("LinkedIn Quote Conversion ID not configured");
      return { success: false, error: "Conversion rule not configured" };
    }

    return this.trackConversion(conversionRuleId, request, {
      email,
      firstName,
      lastName,
      value: projectValue,
      currency: "USD",
      eventId: `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });
  }

  async trackNewsletterSignup(
    request: NextRequest,
    email?: string,
    firstName?: string,
    lastName?: string
  ) {
    const conversionRuleId =
      process.env.LINKEDIN_NEWSLETTER_CONVERSION_ID || "";

    if (!conversionRuleId) {
      console.warn("LinkedIn Newsletter Conversion ID not configured");
      return { success: false, error: "Conversion rule not configured" };
    }

    return this.trackConversion(conversionRuleId, request, {
      email,
      firstName,
      lastName,
      eventId: `newsletter_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
    });
  }

  async trackPageView(
    request: NextRequest,
    email?: string,
    conversionRuleId?: string
  ) {
    const ruleId =
      conversionRuleId || process.env.LINKEDIN_PAGEVIEW_CONVERSION_ID || "";

    if (!ruleId) {
      console.warn("LinkedIn PageView Conversion ID not configured");
      return { success: false, error: "Conversion rule not configured" };
    }

    return this.trackConversion(ruleId, request, {
      email,
      eventId: `pageview_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
    });
  }
}

// Export singleton instance
export const linkedInConversionAPI = new LinkedInConversionAPI();

// Export class for custom implementations
export { LinkedInConversionAPI };
