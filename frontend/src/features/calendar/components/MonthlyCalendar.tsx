'use client'

import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { DayPicker } from 'react-day-picker'

import { DailyReport } from '@/features/dailyReport/types/dailyReport'

type MonthlyCalendarProps = {
  dailyReports: DailyReport[]
  currentMonth: Date
  onMonthChange: (month: Date) => void
}

export const MonthlyCalendar = ({
  dailyReports,
  currentMonth,
  onMonthChange,
}: MonthlyCalendarProps) => {
  const router = useRouter()

  const handleDayClick = (day: Date) => {
    const clickedDate = format(day, 'yyyy-MM-dd')
    const existingDailyReport = dailyReports.find((r) => r.date === clickedDate)

    if (existingDailyReport) {
      router.push(`/daily_reports/${existingDailyReport.id}/edit`)
    } else {
      router.push(`/daily_reports/new?date=${clickedDate}`)
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-lg bg-white p-4 shadow-lg sm:p-8 dark:bg-slate-800">
      <DayPicker
        mode="single"
        month={currentMonth}
        navLayout="around"
        onMonthChange={onMonthChange}
        locale={ja}
        showOutsideDays
        onDayClick={handleDayClick}
        modifiers={{
          hasReport: dailyReports.map((dailyReport) => new Date(dailyReport.date)),
        }}
        modifiersClassNames={{
          hasReport: 'text-slate-800 bg-slate-300 rounded-full',
        }}
        className="w-full"
        classNames={{
          months: 'grid place-items-center',
          chevron: 'fill-slate-200',
          weekdays: 'grid grid-cols-7',
          weekday: 'aspect-square flex justify-center items-center',
          week: 'grid grid-cols-7 flex',
          day: 'aspect-square sm:p-4 flex justify-center items-center transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95',
          today: 'text-emerald-600 font-bold',
          outside: 'opacity-70',
        }}
        footer={
          <div className="mt-4 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <span className="inline-block size-4 rounded-full bg-slate-300"></span>
              日報あり
            </span>
          </div>
        }
      />
    </div>
  )
}
