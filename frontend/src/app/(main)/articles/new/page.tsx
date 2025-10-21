'use client'

import { ArticleForm } from '@/features/article/components/ArticleForm'
import { useRedirectIfUnauthenticated } from '@/hooks/useRedirectIfUnauthenticated'

const ArticleNewPage = () => {
  useRedirectIfUnauthenticated()
  return (
    <>
      <ArticleForm />
    </>
  )
}

export default ArticleNewPage
