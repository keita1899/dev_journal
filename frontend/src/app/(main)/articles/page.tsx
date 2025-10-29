'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import useSWR from 'swr'

import { FabMenu } from '@/components/ui/FabMenu'
import { Loading } from '@/components/ui/Loading'
import { PageIndicator } from '@/components/ui/PageIndicator'
import { Pagination } from '@/components/ui/Pagination'
import { ArticleCard } from '@/features/article/components/ArticleCard'
import { Article } from '@/features/article/types/article'
import { fetcher } from '@/lib/fetcher'

type ArticlesResponse = {
  articles: Article[]
  pagy: {
    page: number
    pages: number
    prev: number | null
    next: number | null
  }
}

const ArticlesPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ArticlesContent />
    </Suspense>
  )
}

const ArticlesContent = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const { data, error, isLoading } = useSWR<ArticlesResponse>(
    `/api/v1/articles?page=${page}`,
    fetcher
  )

  if (error) return <div>記事の取得に失敗しました</div>
  if (isLoading) return <Loading />

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <FabMenu />
      <PageIndicator current={data?.pagy.page ?? 1} total={data?.pagy.pages ?? 1} />
      <div className="mt-6 grid gap-4">
        {data?.articles.map((article: Article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <div className="mt-8">
        <Pagination meta={data?.pagy ?? { page: 1, pages: 1, prev: null, next: null }} />
      </div>
    </div>
  )
}

export default ArticlesPage
