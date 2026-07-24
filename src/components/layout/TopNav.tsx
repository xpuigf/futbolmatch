'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@/hooks/useUser'

export function TopNav() {
  const { user, isAdmin } = useUser()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border px-4 h-14 flex items-center justify-between">
      <Link href="/dashboard" className="font-bold text-lg flex items-center gap-2">
        <span>⚽</span>
        <span className="hidden sm:inline">FutbolMatch</span>
      </Link>

      <div className="flex items-center gap-3">
        {isAdmin && (
          <Link
            href="/matches/new"
            className="size-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-lg hover:opacity-90 transition-opacity"
            title="Nou partit"
          >
            +
          </Link>
        )}
        <Link
          href="/profile"
          className={`size-9 flex items-center justify-center rounded-full transition-colors ${
            pathname === '/profile' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground hover:bg-border'
          }`}
          title={user?.name || 'Perfil'}
        >
          <span className="text-sm font-medium">
            {user?.name?.charAt(0).toUpperCase() || '?'}
          </span>
        </Link>
      </div>
    </header>
  )
}