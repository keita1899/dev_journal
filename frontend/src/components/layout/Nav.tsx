'use client'

import { Calendar, FileText, Edit, Layers } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Nav = () => {
  const pathname = usePathname()

  const navItems = [
    { label: '日報', href: '/calendar', icon: Calendar },
    { label: '記事', href: '/articles', icon: FileText },
    { label: 'メモ', href: '/memos', icon: Edit },
    { label: 'テンプレート', href: '/templates', icon: Layers },
  ]

  return (
    <nav className='mt-2'>
      <ul className="flex justify-center gap-12 p-4 text-slate-700 dark:text-slate-300">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname.startsWith(href)

          return (
            <li key={label}>
              <Link
                href={href}
                className={`flex cursor-pointer flex-col items-center text-sm transition-colors
      ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-indigo-600 dark:hover:text-indigo-400'}`}
              >
                <Icon className="mb-1 size-6" />
                <span className="min-h-5">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
