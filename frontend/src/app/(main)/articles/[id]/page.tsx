'use client'

import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

import { Loading } from '@/components/ui/Loading'
import { Article } from '@/features/article/types/article'
import { fetcher } from '@/lib/fetcher'

const ArticlePage = () => {
  const params = useParams()
  const id = params.id as string
  const { data, error, isLoading } = useSWR<Article>(`/api/v1/articles/${id}`, fetcher)

  if (error) return <div>記事の取得に失敗しました</div>
  if (isLoading) return <Loading />
  if (!data) return null

  return (
    <div className="container mx-auto max-w-3xl space-y-8 px-4 py-12">
      <header className="mb-10 w-full break-words text-center">
        <h1 className="mb-3 text-4xl font-bold">{data.title}</h1>
      </header>
      <p className="text-right text-sm text-gray-500">
        {formatDistanceToNow(new Date(data.created_at), { addSuffix: true, locale: ja })}に公開
      </p>

      <article className="rounded-lg bg-white p-6 shadow-md">
        <div
          className="prose prose-gray max-w-none break-words text-gray-800"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </article>

      <section className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="mb-1 text-sm font-semibold text-gray-600">投稿者</h2>
        <p className="text-gray-800">{data?.user?.email}</p>
      </section>
    </div>
  )
}

export default ArticlePage
