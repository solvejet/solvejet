// src/app/api/csrf-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface CSRFTokenResponse {
  token: string;
  message: string;
}

interface CSRFErrorResponse {
  error: string;
}

function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<CSRFTokenResponse | CSRFErrorResponse>> {
  try {
    const token = generateCSRFToken();

    // Create response with token
    const responseData: CSRFTokenResponse = {
      token,
      message: "CSRF token generated successfully",
    };

    const response = NextResponse.json(responseData);

    // Set secure cookie with the token
    response.cookies.set("csrf-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    // Add CORS headers
    const origin = request.headers.get("origin");
    const allowedOrigins =
      process.env.NODE_ENV === "production"
        ? ["https://solvejet.net", "https://www.solvejet.net"]
        : ["http://localhost:3000", "http://127.0.0.1:3000"];

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );

    return response;
  } catch (error) {
    console.error("Error generating CSRF token:", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" } as CSRFErrorResponse,
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get("origin");
  const allowedOrigins =
    process.env.NODE_ENV === "production"
      ? ["https://solvejet.net", "https://www.solvejet.net"]
      : ["http://localhost:3000", "http://127.0.0.1:3000"];

  const response = new NextResponse(null, { status: 200 });

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
}
