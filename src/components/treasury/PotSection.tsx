'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { PotTransaction } from '@/lib/types'

interface PotSectionProps {
  balance: number
  transactions: PotTransaction[]
  isAdmin: boolean
  onUpdate: () => void
}

export function PotSection({ balance, transactions, isAdmin, onUpdate }: PotSectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [type, setType] = useState<'income' | 'expense'>('income')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const addTransaction = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()
    await supabase.from('pot_transactions').insert({
      type,
      amount: parseFloat(amount),
      description,
    })
    setSaving(false)
    setModalOpen(false)
    setAmount('')
    setDescription('')
    onUpdate()
  }

  return (
    <>
      <Card>
        <CardContent className="space-y-1 text-center py-6">
          <p className="text-sm text-[#666666]">Saldo de la pota</p>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-[#333333]' : 'text-[#C00000]'}`}>
            {formatCurrency(balance)}
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#333333]">Moviments</h2>
        {isAdmin && (
          <Button size="sm" onClick={() => setModalOpen(true)}>+ Afegir</Button>
        )}
      </div>

      <div className="space-y-2">
        {transactions.length === 0 ? (
          <p className="text-sm text-[#666666] text-center py-4">
            No hi ha moviments registrats.
          </p>
        ) : (
          transactions.map((tx) => (
            <Card key={tx.id}>
              <CardContent className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-[#333333]">{tx.description}</p>
                  <div className="flex items-center gap-2 text-xs text-[#666666]">
                    <Badge status={tx.type} />
                    <span>{formatDate(tx.created_at)}</span>
                  </div>
                </div>
                <span className={`font-semibold ${
                  tx.type === 'income' ? 'text-[#333333]' : 'text-[#C00000]'
                }`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nou moviment">
        <form onSubmit={addTransaction} className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={type === 'income' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setType('income')}
              className="flex-1"
            >
              + Ingrés
            </Button>
            <Button
              type="button"
              variant={type === 'expense' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setType('expense')}
              className="flex-1"
            >
              - Despesa
            </Button>
          </div>
          <Input
            id="amount"
            label="Import (€)"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="10.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <Input
            id="description"
            label="Descripció"
            placeholder="Samarretes, lloguer camp..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" loading={saving}>
            Afegir moviment
          </Button>
        </form>
      </Modal>
    </>
  )
}