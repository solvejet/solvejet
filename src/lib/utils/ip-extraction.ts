// src/lib/utils/ip-extraction.ts
import { NextRequest } from "next/server";

/**
 * Extract client IP address from NextRequest headers
 * Works with various hosting providers and proxy setups
 */
export function extractClientIP(request: NextRequest): string {
  // Priority order for IP extraction
  const headers = [
    "x-forwarded-for", // Most common proxy header
    "x-real-ip", // Nginx proxy
    "cf-connecting-ip", // Cloudflare
    "x-vercel-forwarded-for", // Vercel
    "x-client-ip", // Apache
    "x-cluster-client-ip", // Cluster
    "forwarded-for", // RFC 7239
    "forwarded", // RFC 7239
  ];

  for (const header of headers) {
    const value = request.headers.get(header);
    if (value) {
      // x-forwarded-for can contain multiple IPs (client, proxy1, proxy2)
      // The first IP is usually the original client IP
      const ip = value.split(",")[0]?.trim();
      if (ip && isValidIP(ip)) {
        return cleanIP(ip);
      }
    }
  }

  // Fallback: extract from URL if available (not recommended for production)
  const url = new URL(request.url);
  const ipFromUrl = url.searchParams.get("client_ip");
  if (ipFromUrl && isValidIP(ipFromUrl)) {
    return cleanIP(ipFromUrl);
  }

  // Return empty string if no valid IP found
  return "";
}

/**
 * Basic IP address validation
 */
function isValidIP(ip: string): boolean {
  // Remove any port numbers
  const cleanedIp = ip.split(":")[0];

  // IPv4 pattern
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;

  // IPv6 pattern (simplified)
  const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::/;

  // Check for private/local IPs that we should exclude
  const privatePatterns = [
    /^127\./, // localhost
    /^10\./, // private class A
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // private class B
    /^192\.168\./, // private class C
    /^169\.254\./, // link-local
    /^::1$/, // IPv6 localhost
    /^fe80:/, // IPv6 link-local
  ];

  if (!ipv4Pattern.test(cleanedIp) && !ipv6Pattern.test(cleanedIp)) {
    return false;
  }

  // For development, allow private IPs
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // In production, exclude private IPs
  return !privatePatterns.some((pattern) => pattern.test(cleanedIp));
}

/**
 * Clean IP address (remove IPv6 prefix, port numbers, etc.)
 */
function cleanIP(ip: string): string {
  return ip
    .replace(/^::ffff:/, "") // Remove IPv6-mapped IPv4 prefix
    .split(":")[0] // Remove port number if present
    .trim();
}

/**
 * Get geographical info about IP (for advanced use cases)
 * Note: This would require a geo IP service integration
 */
export function getIPGeolocation(_ip: string): {
  country?: string;
  region?: string;
  city?: string;
} {
  // Placeholder for geo IP integration
  // You could integrate with services like:
  // - MaxMind GeoIP2
  // - ipapi.co
  // - ipgeolocation.io

  return {};
}

/**
 * Enhanced IP extraction with additional context
 */
export function extractClientIPWithContext(request: NextRequest): {
  ip: string;
  source: string;
  isValid: boolean;
  isPrimary: boolean;
} {
  const headers = [
    { name: "x-forwarded-for", isPrimary: true },
    { name: "x-real-ip", isPrimary: true },
    { name: "cf-connecting-ip", isPrimary: true },
    { name: "x-vercel-forwarded-for", isPrimary: true },
    { name: "x-client-ip", isPrimary: false },
    { name: "x-cluster-client-ip", isPrimary: false },
    { name: "forwarded-for", isPrimary: false },
    { name: "forwarded", isPrimary: false },
  ];

  for (const header of headers) {
    const value = request.headers.get(header.name);
    if (value) {
      const ip = value.split(",")[0]?.trim();
      if (ip) {
        return {
          ip: cleanIP(ip),
          source: header.name,
          isValid: isValidIP(ip),
          isPrimary: header.isPrimary,
        };
      }
    }
  }

  return {
    ip: "",
    source: "none",
    isValid: false,
    isPrimary: false,
  };
}

/**
 * Debug IP extraction (useful for development)
 */
export function debugIPExtraction(
  request: NextRequest
): Record<string, string> {
  const headers = [
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip",
    "x-vercel-forwarded-for",
    "x-client-ip",
    "x-cluster-client-ip",
    "forwarded-for",
    "forwarded",
  ];

  const debug: Record<string, string> = {};

  headers.forEach((header) => {
    const value = request.headers.get(header);
    if (value) {
      debug[header] = value;
    }
  });

  debug.extracted_ip = extractClientIP(request);
  debug.url = request.url;

  return debug;
}
