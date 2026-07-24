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
      .select('*, users!inner(name, email, phone), matches!inner(date, location, price_per_player)')
      .eq('status', 'pending')
      .then(({ data }: any) => {
        if (data) setDebts(data)
        setLoading(false)
      })
  }, [])

  return { debts, loading }
}

export function usePlayerBalances() {
  const [players, setPlayers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from('users').select('*'),
      supabase.from('matches').select('*'),
      supabase.from('attendance').select('*, users(name, email, phone)'),
      supabase.from('payments').select('*, users(name, email, phone)'),
    ]).then(([usersRes, matchesRes, attendanceRes, paymentsRes]) => {
      const users = usersRes.data || []
      const matches: any[] = matchesRes.data || []
      const allAttendance: any[] = attendanceRes.data || []
      const allPayments: any[] = paymentsRes.data || []

      const result = users.map((u: any) => {
        let totalOwed = 0
        let totalPaid = 0

        matches.forEach((m: any) => {
          const attended = allAttendance.find(
            (a: any) => a.user_id === u.id && a.match_id === m.id && a.status === 'confirmed'
          )
          if (attended) {
            if (m.status !== 'cancelled') {
              totalOwed += m.price_per_player
            }
          }
        })

        allPayments
          .filter((p: any) => p.user_id === u.id && p.status === 'paid')
          .forEach((p: any) => {
            totalPaid += p.amount
          })

        const balance = totalPaid - totalOwed

        return {
          ...u,
          total_owed: totalOwed,
          total_paid: totalPaid,
          balance,
        }
      })

      setPlayers(result)
      setLoading(false)
    })
  }, [])

  return { players, loading }
}