export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3200'

export const API_ENDPOINTS = {
  auth: {
    signup: '/api/v1/signup',
  },
  health: '/api/v1/health',
} as const

export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`
}
