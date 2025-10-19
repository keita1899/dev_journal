'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'

type FabButtonProps = {
  href: string
  tooltip?: string
}

export const FabButton = ({ href, tooltip = '新規作成' }: FabButtonProps) => {
  return (
    <Link
      href={href}
      className="group fixed bottom-10 right-10 z-50 flex size-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-colors hover:bg-indigo-700"
    >
      <Plus className="size-6" />
      <span className="absolute bottom-full mb-2 hidden w-max whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
        {tooltip}
      </span>
    </Link>
  )
}
