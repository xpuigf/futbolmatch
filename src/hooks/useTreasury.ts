'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { PotTransaction } from '@/lib/types'

export function useTreasury() {
  const [transactions, setTransactions] = useState<PotTransaction[]>([])
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('pot_transactions')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setTransactions(data)
      const bal = data.reduce(
        (acc: number, tx: PotTransaction) => acc + (tx.type === 'income' ? tx.amount : -tx.amount),
        0
      )
      setBalance(bal)
    }
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  return { transactions, balance, loading, refetch: fetch }
}

export function usePendingDebts() {
  const [debts, setDebts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('payments')
      .select('*, users!inner(name, email), matches!inner(date, location, price_per_player)')
      .eq('status', 'pending')
      .then(({ data }: any) => {
        if (data) setDebts(data)
        setLoading(false)
      })
  }, [])

  return { debts, loading }
}