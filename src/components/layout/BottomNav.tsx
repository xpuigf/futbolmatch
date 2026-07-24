'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/constants'

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#DDDDDD] safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {NAV_ITEMS.map(({ href, label }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 text-xs font-medium transition-colors ${
                isActive ? 'text-[#C00000]' : 'text-[#666666] hover:text-[#333333]'
              }`}
            >
              <span className="text-lg">
                {href === '/dashboard' ? '⚽' : href === '/treasury' ? '💰' : '👤'}
              </span>
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}