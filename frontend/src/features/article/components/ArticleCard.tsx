import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale/ja'
import Link from 'next/link'

import { Article } from '../types/article'

export const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link href={`/articles/${article.id}`} className="block">
      <div
        className="
          rounded-md bg-gray-100 
          p-5 opacity-95 
          shadow-md transition-all
          duration-500 ease-in-out hover:-translate-y-2
          hover:opacity-100 hover:shadow-2xl
        "
      >
        <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
        <p className="mt-2 text-sm text-gray-600">
          {formatDistanceToNow(new Date(article.created_at), { addSuffix: true, locale: ja })}
        </p>
        <p className="mt-1 text-sm text-gray-700">{article.user?.email}</p>
      </div>
    </Link>
  )
}
