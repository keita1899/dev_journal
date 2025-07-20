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

export interface SignInData {
  email: string
  password: string
}

export interface AuthResponse {
  status: string
  message: string
  user: User
  token: string
}

export interface AuthError {
  status: string
  message: string
  errors?: string[]
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

    return {
      ...response.data,
      token,
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData: AuthError = error.response.data
      const errorMessage = errorData.errors?.join(', ') || errorData.message || 'Sign up failed'
      const customError = new Error(errorMessage)
      ;(customError as any).errors = errorData.errors
      throw customError
    }
    throw error
  }
}

export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  try {
    const response = await authApi.post(API_ENDPOINTS.auth.signin, {
      user: {
        email: data.email,
        password: data.password,
      },
    })

    const token = response.headers['authorization']?.replace('Bearer ', '')
    if (!token) {
      throw new Error('No authentication token received')
    }

    return {
      ...response.data,
      token,
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData: AuthError = error.response.data
      const errorMessage = errorData.errors?.join(', ') || errorData.message || 'Sign in failed'
      const customError = new Error(errorMessage)
      ;(customError as any).errors = errorData.errors
      throw customError
    }
    throw error
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await authApi.delete(API_ENDPOINTS.auth.signout)
  } catch (error) {
    console.error('Logout failed:', error)
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
