import axios from 'axios'

import { getAuthToken, saveAuthToken } from '@/lib/authToken'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers['access-token'] = token.accessToken
    config.headers['client'] = token.client
    config.headers['uid'] = token.uid
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    const accessToken = response.headers['access-token']
    const client = response.headers['client']
    const uid = response.headers['uid']

    if (accessToken && client && uid) {
      saveAuthToken(response.headers as Record<string, string>)
    }

    return response
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      saveAuthToken(error.response.headers as Record<string, string>)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
