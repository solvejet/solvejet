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
  countryCode: string
  phone: string
  subject: string
  message: string
  consent: boolean
  marketingConsent?: boolean
  files?: Array<{
    fileName: string
    fileUrl: string
    fileType: string
  }>
  voiceNote?: {
    fileName: string
    fileUrl: string
  }
}

export interface ContactResponse extends APIResponse {
  data?: {
    id: string
    createdAt: string
  }
}
