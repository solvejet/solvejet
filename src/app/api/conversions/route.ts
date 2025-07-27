// src/app/api/conversions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { linkedInConversionAPI } from "@/lib/conversions/linkedin";
import { metaConversionAPI } from "@/lib/conversions/meta";

interface ConversionRequestBody {
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

interface ConversionResult {
  success: boolean;
  error?: string;
  response?: Record<string, unknown>;
}

interface CombinedConversionResult {
  success: boolean;
  results?: {
    linkedin?: ConversionResult;
    meta?: ConversionResult;
  };
  warning?: string;
  error?: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<CombinedConversionResult>> {
  try {
    const body = (await request.json()) as ConversionRequestBody;

    const {
      event,
      platform,
      userData,
      customData,
      eventId: _eventId,
      eventSourceUrl: _eventSourceUrl,
    } = body;

    // Validate required fields
    if (!event || !platform) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: event and platform",
        },
        { status: 400 }
      );
    }

    const results: CombinedConversionResult["results"] = {};
    let hasSuccess = false;
    const errors: string[] = [];

    // Track LinkedIn conversions
    if (platform === "linkedin" || platform === "both") {
      try {
        let linkedinResult: ConversionResult;

        switch (event) {
          case "contact":
            linkedinResult =
              await linkedInConversionAPI.trackContactFormSubmission(
                request,
                userData.email,
                userData.firstName,
                userData.lastName
              );
            break;
          case "quote":
            linkedinResult = await linkedInConversionAPI.trackQuoteRequest(
              request,
              userData.email,
              userData.firstName,
              userData.lastName,
              customData?.projectValue
            );
            break;
          case "subscribe":
            linkedinResult = await linkedInConversionAPI.trackNewsletterSignup(
              request,
              userData.email,
              userData.firstName,
              userData.lastName
            );
            break;
          case "page_view":
            linkedinResult = await linkedInConversionAPI.trackPageView(
              request,
              userData.email
            );
            break;
          default:
            linkedinResult = {
              success: false,
              error: `Unsupported LinkedIn event type: ${event}`,
            };
        }

        results.linkedin = linkedinResult;
        if (linkedinResult.success) {
          hasSuccess = true;
        } else {
          errors.push(`LinkedIn: ${linkedinResult.error}`);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown LinkedIn error";
        results.linkedin = {
          success: false,
          error: errorMessage,
        };
        errors.push(`LinkedIn: ${errorMessage}`);
      }
    }

    // Track Meta conversions
    if (platform === "meta" || platform === "both") {
      try {
        let metaResult: ConversionResult;

        switch (event) {
          case "contact":
            metaResult = await metaConversionAPI.trackContact(
              request,
              userData.email,
              userData.firstName,
              userData.lastName,
              userData.phone,
              customData?.enquiryType
            );
            break;
          case "lead":
            metaResult = await metaConversionAPI.trackLead(
              request,
              userData.email,
              userData.firstName,
              userData.lastName,
              userData.phone,
              customData?.value,
              customData?.currency
            );
            break;
          case "quote":
            metaResult = await metaConversionAPI.trackLead(
              request,
              userData.email,
              userData.firstName,
              userData.lastName,
              userData.phone,
              customData?.projectValue,
              customData?.currency
            );
            break;
          case "subscribe":
            metaResult = await metaConversionAPI.trackSubscribe(
              request,
              userData.email,
              userData.firstName,
              userData.lastName
            );
            break;
          case "complete_registration":
            metaResult = await metaConversionAPI.trackCompleteRegistration(
              request,
              userData.email,
              userData.firstName,
              userData.lastName,
              userData.phone
            );
            break;
          case "page_view":
            metaResult = await metaConversionAPI.trackPageView(
              request,
              userData.email,
              customData?.contentName,
              customData?.contentCategory
            );
            break;
          case "view_content":
            metaResult = await metaConversionAPI.trackViewContent(
              request,
              customData?.contentIds || [],
              customData?.contentType || "page",
              customData?.contentName,
              userData.email,
              customData?.value,
              customData?.currency
            );
            break;
          case "initiate_checkout":
            metaResult = await metaConversionAPI.trackInitiateCheckout(
              request,
              customData?.contentIds || [],
              customData?.numItems || 1,
              customData?.value || 0,
              customData?.currency || "USD",
              userData.email
            );
            break;
          case "purchase":
            metaResult = await metaConversionAPI.trackPurchase(
              request,
              customData?.contentIds || [],
              customData?.value || 0,
              customData?.currency || "USD",
              userData.email,
              userData.firstName,
              userData.lastName,
              userData.phone,
              customData?.numItems
            );
            break;
          default:
            metaResult = {
              success: false,
              error: `Unsupported Meta event type: ${event}`,
            };
        }

        results.meta = metaResult;
        if (metaResult.success) {
          hasSuccess = true;
        } else {
          errors.push(`Meta: ${metaResult.error}`);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown Meta error";
        results.meta = {
          success: false,
          error: errorMessage,
        };
        errors.push(`Meta: ${errorMessage}`);
      }
    }

    // Return response based on results
    if (hasSuccess) {
      const response: CombinedConversionResult = {
        success: true,
        results,
      };

      // Add warning if some platforms failed
      if (errors.length > 0) {
        response.warning = `Some platforms failed: ${errors.join(", ")}`;
      }

      return NextResponse.json(response);
    } else {
      return NextResponse.json(
        {
          success: false,
          error: `All platforms failed: ${errors.join(", ")}`,
          results,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Conversion API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
