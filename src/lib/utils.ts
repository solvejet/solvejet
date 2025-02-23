// src/lib/utils.ts
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Type-safe class name utility that combines clsx and tailwind-merge
 * @param inputs - Class names or conditional class name objects
 */
export function cn(...inputs: ClassValue[]): string {
  // Filter out null and undefined values
  const validInputs = inputs.filter((input): input is NonNullable<ClassValue> => 
    input !== null && input !== undefined
  );

  // clsx and twMerge both return strings, so no type assertions needed
  return twMerge(clsx(validInputs));
}