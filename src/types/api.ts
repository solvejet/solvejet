// src/types/api.ts
export interface APIResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  error?: {
    message: string
    details?: unknown
  }
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  consent: boolean
  marketingConsent?: boolean
}

export interface ContactResponse extends APIResponse {
  data?: {
    id: string
    createdAt: string
  }
}
