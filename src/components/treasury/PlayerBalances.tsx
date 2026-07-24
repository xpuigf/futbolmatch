'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'

interface PlayerBalancesProps {
  players: any[]
}

export function PlayerBalances({ players }: PlayerBalancesProps) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <h3 className="font-semibold text-[#333333]">Saldo per jugador</h3>
        {players.length === 0 ? (
          <p className="text-sm text-[#666666]">No hi ha jugadors.</p>
        ) : (
          <div className="space-y-2">
            {players.map((p: any) => (
              <div key={p.id} className="flex items-center justify-between py-1 border-b border-[#DDDDDD] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#333333]">{p.name}</p>
                  <p className="text-xs text-[#666666]">
                    Deu: {formatCurrency(p.total_owed)} · Pagat: {formatCurrency(p.total_paid)}
                  </p>
                </div>
                <span className={`font-semibold text-sm ${
                  p.balance >= 0 ? 'text-green-600' : 'text-[#C00000]'
                }`}>
                  {p.balance >= 0 ? '+' : ''}{formatCurrency(p.balance)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
