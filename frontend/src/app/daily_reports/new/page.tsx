'use client'

import { format, isValid, parseISO } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import toast from 'react-hot-toast'

import { DailyReportEditor } from '@/features/dailyReport/components/DailyReportEditor'
import { useRedirectIfUnauthenticated } from '@/hooks/useRedirectIfUnauthenticated'

const DailyReportNewPage = () => {
  useRedirectIfUnauthenticated()
  const searchParams = useSearchParams()

  const dateParam = searchParams.get('date')
  const today = format(new Date(), 'yyyy-MM-dd')

  const parsed = dateParam ? parseISO(dateParam) : null
  const date = dateParam && isValid(parsed!) ? dateParam : today

  useEffect(() => {
    if (parsed && !isValid(parsed)) {
      toast.error('不正な日付が指定されました。')
    }
  }, [parsed])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DailyReportEditor date={date} content="" />
    </Suspense>
  )
}
export default DailyReportNewPage
