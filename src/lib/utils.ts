// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";

/**
 * Utility function to merge class names conditionally
 * Uses clsx for robust class name handling
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// Lightweight alternative without clsx dependency
export function cnLite(
  ...classes: (string | undefined | null | false | 0)[]
): string {
  return classes.filter(Boolean).join(" ");
}
