'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'

import { FabButton } from '@/components/ui/FabButton'
import { MonthlyCalendar } from '@/features/calendar/components/MonthlyCalendar'
import { useRedirectIfUnauthenticated } from '@/hooks/useRedirectIfUnauthenticated'
import { fetcher } from '@/lib/fetcher'

const CalendarPage = () => {
  useRedirectIfUnauthenticated()

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth() + 1

  const { data: dailyReports } = useSWR(
    `/api/v1/daily_reports?year=${year}&month=${month}`,
    fetcher,
    {
      onError: (err) => {
        if (err.response?.status === 400) {
          toast.error('不正な日付の指定です')
        } else {
          toast.error('データの取得に失敗しました')
        }
      },
    }
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <FabButton href="/daily_reports/new" tooltip="日報を作成" />
      <MonthlyCalendar
        dailyReports={dailyReports ?? []}
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />
    </div>
  )
}
export default CalendarPage
