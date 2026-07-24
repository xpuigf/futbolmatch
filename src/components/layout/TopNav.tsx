'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@/hooks/useUser'

export function TopNav() {
  const { user, isAdmin } = useUser()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#DDDDDD] px-4 h-14 flex items-center justify-between">
      <Link href="/dashboard" className="font-bold text-lg flex items-center gap-2 text-[#C00000]">
        <span>⚽</span>
        <span className="hidden sm:inline font-bold">FutbolMatch</span>
      </Link>

      <div className="flex items-center gap-3">
        {isAdmin && (
          <Link
            href="/matches/new"
            className="size-9 flex items-center justify-center rounded bg-[#C00000] text-white text-lg hover:bg-[#990000] transition-colors"
            title="Nou partit"
          >
            +
          </Link>
        )}
        <Link
          href="/profile"
          className={`size-9 flex items-center justify-center rounded transition-colors text-sm font-regular ${
            pathname === '/profile' ? 'bg-[#C00000]/10 text-[#C00000]' : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#DDDDDD]'
          }`}
          title={user?.name || 'Perfil'}
        >
          {user?.name?.charAt(0).toUpperCase() || '?'}
        </Link>
      </div>
    </header>
  )
}