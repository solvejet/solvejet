// data/country-codes.ts
export const countryCodes: CountryCodeType[] = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+39', country: 'Italy' },
  { code: '+7', country: 'Russia' },
  // Add more as needed
] as const

export const subjectOptions: SubjectOptionType[] = [
  { value: 'software-development', label: 'Software Development' },
  { value: 'it-consulting', label: 'IT Consulting' },
  { value: 'it-staffing', label: 'IT Staffing' },
  { value: 'careers', label: 'Careers' },
  { value: 'others', label: 'Others' },
] as const

export type CountryCode = (typeof countryCodes)[number]['code']
export type SubjectType = (typeof subjectOptions)[number]['value']

export interface CountryCodeType {
  code: string
  country: string
}

export interface SubjectOptionType {
  value: string
  label: string
}
