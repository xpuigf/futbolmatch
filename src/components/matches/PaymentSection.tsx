'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import type { Match } from '@/lib/types'

interface PaymentSectionProps {
  match: Match
  payments: any[]
  isAdmin: boolean
  onUpdate: () => void
}

export function PaymentSection({ match, payments, isAdmin, onUpdate }: PaymentSectionProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const markPaid = async (userId: string, method: 'cash' | 'bizum') => {
    setLoading(userId)
    const supabase = createClient()

    const existing = payments.find((p) => p.user_id === userId)
    if (existing) {
      await supabase
        .from('payments')
        .update({ status: 'paid', method, paid_at: new Date().toISOString() })
        .eq('id', existing.id)
    } else {
      await supabase.from('payments').insert({
        match_id: match.id,
        user_id: userId,
        amount: match.price_per_player,
        method,
        status: 'paid',
        paid_at: new Date().toISOString(),
      })
    }

    setLoading(null)
    onUpdate()
  }

  const markPending = async (paymentId: string) => {
    setLoading(paymentId)
    const supabase = createClient()
    await supabase
      .from('payments')
      .update({ status: 'pending', paid_at: null })
      .eq('id', paymentId)
    setLoading(null)
    onUpdate()
  }

  const totalCollected = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum: number, p: any) => sum + p.amount, 0)

  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Pagaments</h3>
          <span className="text-sm text-muted-foreground">
            Cobrat: {formatCurrency(totalCollected)}
          </span>
        </div>

        {payments.length === 0 ? (
          <p className="text-sm text-muted-foreground">Encara no hi ha pagaments.</p>
        ) : (
          payments.map((p: any) => (
            <div key={p.id} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{p.users?.name}</span>
                <Badge status={p.status} />
                {p.status === 'paid' && <Badge status={p.method} />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{formatCurrency(p.amount)}</span>
                {isAdmin && p.status === 'paid' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markPending(p.id)}
                    loading={loading === p.id}
                  >
                    Desfer
                  </Button>
                )}
              </div>
            </div>
          ))
        )}

        {isAdmin && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Marca pagament per a jugadors confirmats:
            </p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const userId = prompt('ID de l\'usuari:')
                  if (userId) markPaid(userId, 'bizum')
                }}
                className="flex-1"
              >
                💳 Bizum
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const userId = prompt('ID de l\'usuari:')
                  if (userId) markPaid(userId, 'cash')
                }}
                className="flex-1"
              >
                💵 Efectiu
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}