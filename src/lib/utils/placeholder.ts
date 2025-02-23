// src/lib/utils/placeholder.ts

/**
 * Generate a placeholder image URL with specified dimensions
 */
export const getPlaceholderImage = (width: number, height: number): string => {
  // Validate dimensions
  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    throw new TypeError('Width and height must be finite numbers');
  }

  if (width <= 0 || height <= 0) {
    throw new RangeError('Width and height must be positive numbers');
  }

  // Convert dimensions to integers and then to strings
  const safeWidth = String(Math.floor(width));
  const safeHeight = String(Math.floor(height));

  // Generate URL
  return `/api/placeholder/${safeWidth}/${safeHeight}`;
};

/**
 * Common aspect ratio dimensions
 */
export const placeholderSizes = {
  square: (size: number): string => getPlaceholderImage(size, size),
  landscape: (width: number): string => getPlaceholderImage(width, Math.floor(width * 0.75)), // 4:3
  portrait: (height: number): string => getPlaceholderImage(Math.floor(height * 0.75), height), // 3:4
  widescreen: (width: number): string => getPlaceholderImage(width, Math.floor(width * 0.5625)), // 16:9
  banner: (width: number): string => getPlaceholderImage(width, Math.floor(width * 0.25)), // 4:1
} as const;

/**
 * Type for placeholder aspect ratios
 */
export type PlaceholderAspectRatio = keyof typeof placeholderSizes;
