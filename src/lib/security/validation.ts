// src/lib/security/validation.ts
import { z } from 'zod';

export const secureInputValidation = {
  // Common validation schemas
  email: z.string().email(),
  password: z.string()
    .min(12)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/),
  username: z.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_-]+$/),
  
  // Sanitization helpers
  sanitizeHTML: (input: string): string => {
    return input
      .replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char] ?? char));
  }
};