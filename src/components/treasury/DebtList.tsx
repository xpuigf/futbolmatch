'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface DebtListProps {
  debts: any[]
  isAdmin: boolean
  onUpdate: () => void
}

export function DebtList({ debts, isAdmin, onUpdate }: DebtListProps) {
  const markPaid = async (paymentId: string) => {
    const supabase = createClient()
    await supabase
      .from('payments')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', paymentId)
    onUpdate()
  }

  if (debts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-6">
          <p className="text-2xl mb-2">🎉</p>
          <p className="text-sm text-muted-foreground">No hi ha deutes pendents!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      {debts.map((debt: any) => (
        <Card key={debt.id}>
          <CardContent className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">
                {debt.users?.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{debt.matches?.location}</span>
                <span>·</span>
                <span>{formatDate(debt.matches?.date)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-danger">
                {formatCurrency(debt.amount)}
              </span>
              {isAdmin && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => markPaid(debt.id)}
                >
                  Cobrat
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}