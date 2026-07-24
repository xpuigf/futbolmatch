'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDate, formatTime, formatCurrency } from '@/lib/utils'
import type { Match } from '@/lib/types'

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const matchDate = new Date(match.date)

  return (
    <Link href={`/matches/${match.id}`}>
      <Card className="hover:border-primary/30 transition-colors cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {formatDate(match.date)}
              </span>
              <Badge status={match.status} />
            </div>
            <p className="font-semibold">{match.location}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>🕐 {formatTime(match.date)}</span>
              <span>👥 {match.max_players} jug.</span>
              <span>💶 {formatCurrency(match.price_per_player)}</span>
            </div>
          </div>
          <svg className="size-5 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Card>
    </Link>
  )
}