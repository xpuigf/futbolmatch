'use client'

import { TopNav } from './TopNav'
import { BottomNav } from './BottomNav'
import { AuthGuard } from '@/components/auth/AuthGuard'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <TopNav />
      <main className="flex-1 pb-20">
        <div className="max-w-lg mx-auto px-4 py-4">
          {children}
        </div>
      </main>
      <BottomNav />
    </AuthGuard>
  )
}