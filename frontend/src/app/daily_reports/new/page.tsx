'use client'

import { DailyReportEditor } from '@/features/dailyReport/components/DailyReportEditor'
import { useRedirectIfUnauthenticated } from '@/hooks/useRedirectIfUnauthenticated'

const DailyReportNewPage = () => {
  useRedirectIfUnauthenticated()

  return (
    <>
      <DailyReportEditor />
    </>
  )
}
export default DailyReportNewPage
