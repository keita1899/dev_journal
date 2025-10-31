import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Copy, MoreHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'

import { Memo } from '../types/memo'

export const MemoCard = ({ memo }: { memo: Memo }) => {
  const createdAtLabel = formatDistanceToNow(new Date(memo.created_at), {
    addSuffix: true,
    locale: ja,
  })

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(memo.content)
      toast.success('メモをコピーしました')
    } catch (err) {
      console.error('コピーに失敗しました', err)
    }
  }

  return (
    <div className="p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs tracking-wide text-gray-500">{createdAtLabel}</span>
        <button
          onClick={handleCopy}
          className="rounded-md p-1.5 text-gray-500 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-700"
          aria-label="コピー"
        >
          <Copy size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="mb-3 whitespace-pre-wrap text-[15px] leading-relaxed">{memo.content}</div>

      <div className="flex justify-end">
        <button
          className="rounded-full p-1.5 text-gray-500 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-700"
          aria-label="メニューを開く"
        >
          <MoreHorizontal size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
