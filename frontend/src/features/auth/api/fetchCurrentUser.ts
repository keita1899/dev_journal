import axiosInstance from '@/lib/axios'

export const fetchCurrentUser = async () => {
  const res = await axiosInstance.get('/api/v1/auth/validate_token')
  return res.data.data
}
