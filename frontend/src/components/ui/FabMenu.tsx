'use client'

import { Plus, Calendar, FileText, Edit } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { useModal } from '@/provider/ModalProvider'

export const FabMenu = () => {
  const { openModal } = useModal()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-3">
      {isMenuOpen && (
        <div className="flex flex-col items-end gap-3">
          <Link
            href="/daily_reports/new"
            className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-gray-800 shadow-md transition hover:bg-gray-100"
          >
            <Calendar size={18} />
            <span>日報作成</span>
          </Link>
          <Link
            href="/articles/new"
            className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-gray-800 shadow-md transition hover:bg-gray-100"
          >
            <FileText size={18} />
            <span>記事作成</span>
          </Link>
          <button
            onClick={() => {
              openModal()
              setIsMenuOpen(false)
            }}
            className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-gray-800 shadow-md transition hover:bg-gray-100"
          >
            <Edit size={18} />
            <span>メモ作成</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="group flex size-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700"
      >
        <Plus
          className={`size-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-45' : ''}`}
        />
        <span className="absolute bottom-full mb-2 hidden w-max whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
          新規作成
        </span>
      </button>
    </div>
  )
}
