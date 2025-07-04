import { apiClient } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

export function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => apiClient.get('/api/v1/health').then(({ data }) => data),
  })
}
