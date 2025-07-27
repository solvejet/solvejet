// src/lib/conversions/meta.ts
import { NextRequest } from "next/server";
import crypto from "crypto";
import { extractClientIP } from "@/lib/utils/ip-extraction";

export interface MetaUserData {
  em?: string[]; // Email addresses (hashed)
  ph?: string[]; // Phone numbers (hashed)
  fn?: string[]; // First names (hashed)
  ln?: string[]; // Last names (hashed)
  db?: string[]; // Date of birth (hashed, format: YYYYMMDD)
  ge?: string[]; // Gender (hashed, 'm' or 'f')
  ct?: string[]; // City (hashed)
  st?: string[]; // State (hashed)
  zp?: string[]; // Zip code (hashed)
  country?: string[]; // Country (hashed, ISO 3166-1 alpha-2)
  external_id?: string[]; // External ID (hashed)
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string; // Facebook click ID
  fbp?: string; // Facebook browser ID
}

export interface MetaCustomData {
  currency?: string;
  value?: number;
  content_ids?: string[];
  content_type?: string;
  content_name?: string;
  content_category?: string;
  num_items?: number;
  search_string?: string;
  status?: string;
  [key: string]: unknown; // Allow custom parameters
}

export interface MetaServerEvent {
  event_name: string;
  event_time: number;
  event_id?: string;
  event_source_url?: string;
  user_data: MetaUserData;
  custom_data?: MetaCustomData;
  action_source:
    | "website"
    | "email"
    | "app"
    | "phone_call"
    | "chat"
    | "physical_store"
    | "system_generated"
    | "other";
  opt_out?: boolean;
  data_processing_options?: string[];
  data_processing_options_country?: number;
  data_processing_options_state?: number;
}

export interface MetaConversionPayload {
  data: MetaServerEvent[];
  test_event_code?: string;
  partner_agent?: string;
}

interface MetaAPIResponse {
  error?: {
    message?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

class MetaConversionAPI {
  private readonly baseUrl = "https://graph.facebook.com/v18.0";
  private readonly pixelId: string;
  private readonly accessToken: string;
  private readonly testEventCode?: string;

  constructor() {
    this.pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "";
    this.accessToken = process.env.META_CONVERSION_ACCESS_TOKEN || "";
    this.testEventCode = process.env.META_TEST_EVENT_CODE;

    if (!this.pixelId || !this.accessToken) {
      console.warn(
        "Meta Conversion API: Missing required environment variables"
      );
    }
  }

  /**
   * Hash string using SHA-256
   */
  private hashSHA256(value: string): string {
    return crypto
      .createHash("sha256")
      .update(value.toLowerCase().trim())
      .digest("hex");
  }

  /**
   * Normalize and hash phone number
   */
  private normalizeAndHashPhone(phone: string): string {
    // Remove all non-digits
    const normalized = phone.replace(/\D/g, "");

    // If it doesn't start with country code, assume US (+1)
    const withCountryCode = normalized.startsWith("1")
      ? normalized
      : `1${normalized}`;

    return this.hashSHA256(withCountryCode);
  }

  /**
   * Extract user data from request
   */
  private extractUserData(
    request: NextRequest,
    email?: string,
    phone?: string,
    firstName?: string,
    lastName?: string,
    dateOfBirth?: string,
    gender?: string,
    city?: string,
    state?: string,
    zipCode?: string,
    country?: string,
    externalId?: string
  ): MetaUserData {
    const userAgent = request.headers.get("user-agent") || "";

    // Use the utility function to extract IP address
    const ipAddress = extractClientIP(request);

    const userData: MetaUserData = {
      client_ip_address: ipAddress,
      client_user_agent: userAgent,
    };

    // Hash and add PII data
    if (email) {
      userData.em = [this.hashSHA256(email)];
    }

    if (phone) {
      userData.ph = [this.normalizeAndHashPhone(phone)];
    }

    if (firstName) {
      userData.fn = [this.hashSHA256(firstName)];
    }

    if (lastName) {
      userData.ln = [this.hashSHA256(lastName)];
    }

    if (dateOfBirth) {
      // Expecting format YYYY-MM-DD or YYYYMMDD
      const normalized = dateOfBirth.replace(/-/g, "");
      userData.db = [this.hashSHA256(normalized)];
    }

    if (
      gender &&
      (gender.toLowerCase() === "m" || gender.toLowerCase() === "f")
    ) {
      userData.ge = [this.hashSHA256(gender.toLowerCase())];
    }

    if (city) {
      userData.ct = [this.hashSHA256(city)];
    }

    if (state) {
      userData.st = [this.hashSHA256(state)];
    }

    if (zipCode) {
      userData.zp = [this.hashSHA256(zipCode)];
    }

    if (country) {
      userData.country = [this.hashSHA256(country)];
    }

    if (externalId) {
      userData.external_id = [this.hashSHA256(externalId)];
    }

    // Extract Facebook tracking parameters from cookies
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      // Facebook Browser ID
      if (cookies._fbp) {
        userData.fbp = cookies._fbp;
      }

      // Facebook Click ID
      if (cookies._fbc) {
        userData.fbc = cookies._fbc;
      }
    }

    // Extract fbclid from URL parameters
    const url = new URL(request.url);
    const fbclid = url.searchParams.get("fbclid");
    if (fbclid && !userData.fbc) {
      userData.fbc = `fb.1.${Date.now()}.${fbclid}`;
    }

    return userData;
  }

  /**
   * Send conversion event to Meta
   */
  async trackEvent(
    eventName: string,
    request: NextRequest,
    options: {
      email?: string;
      phone?: string;
      firstName?: string;
      lastName?: string;
      dateOfBirth?: string;
      gender?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
      externalId?: string;
      customData?: MetaCustomData;
      eventId?: string;
      eventSourceUrl?: string;
      actionSource?: MetaServerEvent["action_source"];
    } = {}
  ): Promise<{
    success: boolean;
    error?: string;
    response?: Record<string, unknown>;
  }> {
    if (!this.pixelId || !this.accessToken) {
      return {
        success: false,
        error: "Meta Conversion API not configured",
      };
    }

    try {
      const userData = this.extractUserData(
        request,
        options.email,
        options.phone,
        options.firstName,
        options.lastName,
        options.dateOfBirth,
        options.gender,
        options.city,
        options.state,
        options.zipCode,
        options.country,
        options.externalId
      );

      const serverEvent: MetaServerEvent = {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000), // Unix timestamp
        user_data: userData,
        action_source: options.actionSource || "website",
      };

      // Add optional fields
      if (options.eventId) {
        serverEvent.event_id = options.eventId;
      }

      if (options.eventSourceUrl) {
        serverEvent.event_source_url = options.eventSourceUrl;
      } else {
        // Use referrer or current URL
        const referer = request.headers.get("referer");
        if (referer) {
          serverEvent.event_source_url = referer;
        } else {
          serverEvent.event_source_url = request.url;
        }
      }

      if (options.customData) {
        serverEvent.custom_data = options.customData;
      }

      const payload: MetaConversionPayload = {
        data: [serverEvent],
        partner_agent: "SolveJet-ConversionsAPI-1.0",
      };

      // Add test event code if in development
      if (this.testEventCode) {
        payload.test_event_code = this.testEventCode;
      }

      const url = `${this.baseUrl}/${this.pixelId}/events`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = (await response.json()) as MetaAPIResponse;

      if (!response.ok) {
        console.error("Meta Conversion API Error:", responseData);
        return {
          success: false,
          error: `Meta API Error: ${response.status} - ${
            responseData.error?.message || "Unknown error"
          }`,
          response: responseData,
        };
      }

      // Log successful test events
      if (this.testEventCode && responseData.test_event_code) {
        console.warn("Meta Test Event Sent Successfully:", responseData);
      }

      return {
        success: true,
        response: responseData,
      };
    } catch (error) {
      console.error("Meta Conversion API Exception:", error);
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
  async trackLead(
    request: NextRequest,
    email?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    value?: number,
    currency: string = "USD"
  ) {
    const customData: MetaCustomData = {
      currency,
      content_name: "Contact Form Submission",
      content_category: "lead_generation",
    };

    if (value) {
      customData.value = value;
    }

    return this.trackEvent("Lead", request, {
      email,
      firstName,
      lastName,
      phone,
      customData,
      eventId: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      actionSource: "website",
    });
  }

  async trackCompleteRegistration(
    request: NextRequest,
    email?: string,
    firstName?: string,
    lastName?: string,
    phone?: string
  ) {
    const customData: MetaCustomData = {
      content_name: "User Registration",
      content_category: "registration",
      status: "completed",
    };

    return this.trackEvent("CompleteRegistration", request, {
      email,
      firstName,
      lastName,
      phone,
      customData,
      eventId: `registration_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      actionSource: "website",
    });
  }

  async trackContact(
    request: NextRequest,
    email?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    enquiryType?: string
  ) {
    const customData: MetaCustomData = {
      content_name: "Contact Form",
      content_category: "contact",
      status: "submitted",
    };

    if (enquiryType) {
      customData.content_type = enquiryType;
    }

    return this.trackEvent("Contact", request, {
      email,
      firstName,
      lastName,
      phone,
      customData,
      eventId: `contact_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      actionSource: "website",
    });
  }

  async trackSubscribe(
    request: NextRequest,
    email?: string,
    firstName?: string,
    lastName?: string
  ) {
    const customData: MetaCustomData = {
      content_name: "Newsletter Subscription",
      content_category: "newsletter",
      status: "subscribed",
    };

    return this.trackEvent("Subscribe", request, {
      email,
      firstName,
      lastName,
      customData,
      eventId: `subscribe_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      actionSource: "website",
    });
  }

  async trackPageView(
    request: NextRequest,
    email?: string,
    contentName?: string,
    contentCategory?: string
  ) {
    const customData: MetaCustomData = {};

    if (contentName) {
      customData.content_name = contentName;
    }

    if (contentCategory) {
      customData.content_category = contentCategory;
    }

    return this.trackEvent("PageView", request, {
      email,
      customData,
      eventId: `pageview_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      actionSource: "website",
    });
  }

  async trackViewContent(
    request: NextRequest,
    contentIds: string[],
    contentType: string,
    contentName?: string,
    email?: string,
    value?: number,
    currency: string = "USD"
  ) {
    const customData: MetaCustomData = {
      content_ids: contentIds,
      content_type: contentType,
      currency,
    };

    if (contentName) {
      customData.content_name = contentName;
    }

    if (value) {
      customData.value = value;
    }

    return this.trackEvent("ViewContent", request, {
      email,
      customData,
      eventId: `view_content_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      actionSource: "website",
    });
  }

  async trackInitiateCheckout(
    request: NextRequest,
    contentIds: string[],
    numItems: number,
    value: number,
    currency: string = "USD",
    email?: string
  ) {
    const customData: MetaCustomData = {
      content_ids: contentIds,
      content_type: "product",
      num_items: numItems,
      value,
      currency,
    };

    return this.trackEvent("InitiateCheckout", request, {
      email,
      customData,
      eventId: `initiate_checkout_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      actionSource: "website",
    });
  }

  async trackPurchase(
    request: NextRequest,
    contentIds: string[],
    value: number,
    currency: string = "USD",
    email?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    numItems?: number
  ) {
    const customData: MetaCustomData = {
      content_ids: contentIds,
      content_type: "product",
      value,
      currency,
    };

    if (numItems) {
      customData.num_items = numItems;
    }

    return this.trackEvent("Purchase", request, {
      email,
      firstName,
      lastName,
      phone,
      customData,
      eventId: `purchase_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      actionSource: "website",
    });
  }
}

// Export singleton instance
export const metaConversionAPI = new MetaConversionAPI();

// Export class for custom implementations
export { MetaConversionAPI };
