'use client'

import { useRedirectIfUnauthenticated } from "@/hooks/useRedirectIfUnauthenticated"

const Calendar = () => {
  useRedirectIfUnauthenticated()
  return (
    <>
      <h1>カレンダー</h1>
    </>
  )
}
export default Calendar
