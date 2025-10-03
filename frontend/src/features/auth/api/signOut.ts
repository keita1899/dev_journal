import axiosInstance from '@/lib/axios'

export const signOut = async () => {
  await axiosInstance.delete('/api/v1/auth/sign_out')
}
