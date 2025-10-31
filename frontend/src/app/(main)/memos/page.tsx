'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite from 'swr/infinite'

import { FabMenu } from '@/components/ui/FabMenu'
import { Loading } from '@/components/ui/Loading'
import { MemoCard } from '@/features/memo/components/MemoCard'
import { Memo } from '@/features/memo/types/memo'
import { useRedirectIfUnauthenticated } from '@/hooks/useRedirectIfUnauthenticated'
import { fetcher } from '@/lib/fetcher'

type MemosResponse = {
  memos: Memo[]
  pagy: {
    next: number | null
  }
}

const MemosPage = () => {
  useRedirectIfUnauthenticated()

  const getKey = (pageIndex: number, previousPageData: MemosResponse | null) => {
    if (previousPageData && previousPageData.pagy.next === null) return null
    if (!previousPageData) return `/api/v1/memos?page=1`
    return `/api/v1/memos?page=${pageIndex + 1}`
  }

  const { data, size, setSize, isLoading, isValidating, error } = useSWRInfinite<MemosResponse>(
    getKey,
    fetcher
  )

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  const memos = data ? data.flatMap((page) => page.memos) : []

  const hasNextPage = (data: MemosResponse[] | undefined) => {
    if (!data || data.length === 0) return false
    const lastPage = data[data.length - 1]
    return lastPage.pagy.next !== null
  }

  useEffect(() => {
    if (inView && !isLoading && !isValidating && hasNextPage(data)) {
      setSize(size + 1)
    }
  }, [inView, isLoading, isValidating, setSize, size, data])

  if (error) return <div>メモの取得に失敗しました</div>
  if (!data) return <Loading />

  return (
    <>
      <FabMenu />
      <div className={`mx-auto max-w-lg p-4 ${memos.length > 0 ? 'divide-y divide-gray-500' : ''}`}>
        {memos.length === 0 && !isLoading && (
          <div className="py-8 text-center text-gray-500">
            <p>メモがまだありません</p>
            <p className="mt-2 text-sm">右下のボタンから新しいメモを作成できます</p>
          </div>
        )}
        {memos.map((memo) => (
          <MemoCard key={memo.id} memo={memo} />
        ))}

        <div ref={ref} className="flex h-10 items-center justify-center">
          {isLoading || isValidating ? <Loading /> : null}
        </div>
      </div>
    </>
  )
}
export default MemosPage
