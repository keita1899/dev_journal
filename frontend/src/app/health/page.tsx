'use client'

import { useHealth } from '@/hooks/useHealth'

export default function HealthPage() {
  const { data, isLoading, error } = useHealth()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">System Health Status</h1>
      <pre className="rounded bg-gray-100 p-4">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
