'use client'

import Link from 'next/link'
import { AppLayout } from '@/components/layout/AppLayout'
import { MatchCard } from '@/components/matches/MatchCard'
import { Button } from '@/components/ui/Button'
import { useMatches } from '@/hooks/useMatches'
import { useUser } from '@/hooks/useUser'

export default function DashboardPage() {
  const { matches, loading } = useMatches()
  const { isAdmin } = useUser()

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#333333]">Partits</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#666666]">
              {matches.length} partits
            </span>
            {isAdmin && (
              <Link href="/matches/new">
                <Button size="sm">+ Nou</Button>
              </Link>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="size-8 border-2 border-[#C00000] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <p className="text-4xl">⚽</p>
            <p className="text-[#666666]">Encara no hi ha partits.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}