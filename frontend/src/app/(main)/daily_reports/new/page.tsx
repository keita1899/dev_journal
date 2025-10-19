'use client'

import { Suspense } from 'react'

import { DailyReportWrapper } from '@/features/dailyReport/components/DailyReportWrapper'
import { useRedirectIfUnauthenticated } from '@/hooks/useRedirectIfUnauthenticated'

const DailyReportNewPage = () => {
  useRedirectIfUnauthenticated()
  return (
    <Suspense>
      <DailyReportWrapper />
    </Suspense>
  )
}

export default DailyReportNewPage
