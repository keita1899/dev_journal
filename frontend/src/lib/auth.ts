import axios from 'axios'
import { API_BASE_URL, API_ENDPOINTS } from './api-config'

export const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/signup'
    }
    return Promise.reject(error)
  },
)

export interface User {
  id: number
  email: string
  created_at: string
}

export interface SignUpData {
  email: string
  password: string
  password_confirmation: string
}

export interface AuthResponse {
  status: string
  message: string
  user: User
}

export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  try {
    const response = await authApi.post(API_ENDPOINTS.auth.signup, {
      user: {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      },
    })

    const token = response.headers['authorization']?.replace('Bearer ', '')
    if (!token) {
      throw new Error('No authentication token received')
    }
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(response.data.user))

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Sign up failed')
    }
    throw error
  }
}
