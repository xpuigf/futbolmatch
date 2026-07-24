'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { AppLayout } from '@/components/layout/AppLayout'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { AttendanceToggle } from '@/components/matches/AttendanceToggle'
import { PaymentSection } from '@/components/matches/PaymentSection'
import { useUser } from '@/hooks/useUser'
import { createClient } from '@/lib/supabase/client'
import { formatDate, formatTime, formatCurrency } from '@/lib/utils'
import type { Match } from '@/lib/types'

export default function MatchDetailClient() {
  const params = useParams()
  const matchId = params.id as string
  const { user, isAdmin } = useUser()

  const [match, setMatch] = useState<Match | null>(null)
  const [attendance, setAttendance] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    const supabase = createClient()
    const [matchRes, attendanceRes, paymentsRes] = await Promise.all([
      supabase.from('matches').select('*').eq('id', matchId).single(),
      supabase.from('attendance').select('*, users(name, email)').eq('match_id', matchId).then((r: any) => r.data || []),
      supabase.from('payments').select('*, users(name, email)').eq('match_id', matchId).then((r: any) => r.data || []),
    ])
    setMatch(matchRes.data)
    setAttendance(attendanceRes)
    setPayments(paymentsRes)
    setLoading(false)
  }, [matchId])

  useEffect(() => { fetchData() }, [fetchData])

  const myAttendance = attendance.find((a: any) => a.user_id === user?.id)
  const confirmed = attendance.filter((a: any) => a.status === 'confirmed')
  const pending = attendance.filter((a: any) => a.status === 'pending')
  const declined = attendance.filter((a: any) => a.status === 'declined')

  if (loading || !match) {
    return (
      <AppLayout>
        <div className="flex justify-center py-12">
          <div className="size-8 border-2 border-[#C00000] border-t-transparent rounded-full animate-spin" />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-4">
        <Card>
          <CardContent className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold text-[#333333]">{match.location}</h1>
                <p className="text-[#666666]">
                  {formatDate(match.date)} · {formatTime(match.date)}
                </p>
              </div>
              <Badge status={match.status} />
            </div>
            <div className="flex gap-4 text-sm text-[#666666]">
              <span>👥 Fins a {match.max_players} jug.</span>
              <span>💶 {formatCurrency(match.price_per_player)}/jug.</span>
            </div>
          </CardContent>
        </Card>

        <AttendanceToggle
          matchId={matchId}
          currentStatus={myAttendance?.status || null}
          onUpdate={fetchData}
        />

        <Card>
          <CardContent className="space-y-3">
            <h3 className="font-semibold text-[#333333]">Assistències</h3>
            <div className="flex gap-4 text-sm text-[#666666]">
              <span>✅ {confirmed.length} confirmats</span>
              <span>🤷 {pending.length} pendents</span>
              <span>❌ {declined.length} rebutjats</span>
            </div>
            {attendance.length > 0 ? (
              <div className="space-y-1">
                {attendance.map((a: any) => (
                  <div key={a.id} className="flex items-center justify-between py-1">
                    <span className="text-sm text-[#333333]">{a.users?.name}</span>
                    <Badge status={a.status} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#666666]">Ningú ha respost encara.</p>
            )}
          </CardContent>
        </Card>

        <PaymentSection
          match={match}
          payments={payments}
          isAdmin={isAdmin}
          onUpdate={fetchData}
        />

        {isAdmin && match.status === 'scheduled' && (
          <Button
            variant="danger"
            className="w-full"
            onClick={async () => {
              const supabase = createClient()
              await supabase.from('matches').update({ status: 'cancelled' }).eq('id', matchId)
              fetchData()
            }}
          >
            Cancel·lar partit
          </Button>
        )}
      </div>
    </AppLayout>
  )
}