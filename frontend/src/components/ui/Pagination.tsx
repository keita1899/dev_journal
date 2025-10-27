'use client'

import { useRouter } from 'next/navigation'

type PaginationProps = {
  meta: {
    page: number
    pages: number
    prev: number | null
    next: number | null
  }
}

export const Pagination = ({ meta }: PaginationProps) => {
  const router = useRouter()
  const { page: currentPage, pages, prev, next } = meta

  const goToPage = (page: number) => {
    router.push(`/articles?page=${page}`)
  }

  if (pages <= 1) return null

  const btnClass =
    'min-w-[2.5rem] h-10 px-3 py-2 rounded-full font-medium text-sm md:text-base text-center transition-colors'

  const visiblePages = []
  const delta = 2

  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= currentPage - delta && i <= currentPage + delta)) {
      visiblePages.push(i)
    } else if (i === currentPage - delta - 1 || i === currentPage + delta + 1) {
      visiblePages.push('...')
    }
  }

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      {prev && (
        <button
          onClick={() => goToPage(prev)}
          className={`${btnClass} bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white`}
        >
          {'<'}
        </button>
      )}

      {visiblePages.map((p, idx) =>
        p === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(Number(p))}
            className={`${btnClass} ${
              p === currentPage
                ? 'bg-indigo-600 font-bold text-white'
                : 'bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            {p}
          </button>
        )
      )}

      {next && (
        <button
          onClick={() => goToPage(next)}
          className={`${btnClass} bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white`}
        >
          {'>'}
        </button>
      )}
    </div>
  )
}
