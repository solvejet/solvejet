// src/lib/utils/date.ts

/**
 * Format a date string into a human-readable format
 * @param dateString ISO date string
 * @param options Formatting options
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const date = new Date(dateString);

  // If date is invalid, return the original string
  if (isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Format a date as a relative time (e.g. "2 days ago")
 * @param dateString ISO date string
 * @returns Relative time string
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);

  // If date is invalid, return the original string
  if (isNaN(date.getTime())) {
    return dateString;
  }

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSecs < 60) {
    return 'just now';
  } else if (diffInMins < 60) {
    return `${String(diffInMins)} ${diffInMins === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInHours < 24) {
    return `${String(diffInHours)} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInDays < 30) {
    return `${String(diffInDays)} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffInMonths < 12) {
    return `${String(diffInMonths)} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  } else {
    return `${String(diffInYears)} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  }
}

/**
 * Format a date for the datetime attribute in HTML elements
 * @param dateString ISO date string
 * @returns ISO formatted date string
 */
export function formatISODate(dateString: string): string {
  const date = new Date(dateString);

  // If date is invalid, return the original string
  if (isNaN(date.getTime())) {
    return dateString;
  }

  return date.toISOString();
}

/**
 * Check if a date is in the future
 * @param dateString ISO date string
 * @returns Boolean indicating if the date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();

  // If date is invalid, return false
  if (isNaN(date.getTime())) {
    return false;
  }

  return date > now;
}

/**
 * Check if a date is within a certain number of days from now
 * @param dateString ISO date string
 * @param days Number of days
 * @returns Boolean indicating if the date is within the specified number of days
 */
export function isWithinDays(dateString: string, days: number): boolean {
  const date = new Date(dateString);
  const now = new Date();

  // If date is invalid, return false
  if (isNaN(date.getTime())) {
    return false;
  }

  const diffInMs = Math.abs(now.getTime() - date.getTime());
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays <= days;
}

/**
 * Format a date for SEO structured data
 * @param dateString ISO date string
 * @returns Formatted date string for structured data
 */
export function formatDateForStructuredData(dateString: string): string {
  const date = new Date(dateString);

  // If date is invalid, return the original string
  if (isNaN(date.getTime())) {
    return dateString;
  }

  // Format as YYYY-MM-DD
  return date.toISOString().split('T')[0] ?? '';
}
