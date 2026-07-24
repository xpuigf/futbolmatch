'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Match } from '@/lib/types'

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMatches = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: false })
    if (data) setMatches(data)
    setLoading(false)
  }

  useEffect(() => { fetchMatches() }, [])

  return { matches, loading, refetch: fetchMatches }
}

export function useMatch(id: string) {
  const [match, setMatch] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('matches').select('*').eq('id', id).single().then(({ data }: any) => {
      setMatch(data)
      setLoading(false)
    })
  }, [id])

  return { match, loading }
}

export function useAttendance(matchId: string) {
  const [attendance, setAttendance] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('attendance')
      .select('*, users(name, email)')
      .eq('match_id', matchId)
    if (data) setAttendance(data)
    setLoading(false)
  }

  useEffect(() => { fetch() }, [matchId])

  return { attendance, loading, refetch: fetch }
}

export function usePayments(matchId: string) {
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('payments')
      .select('*, users(name, email)')
      .eq('match_id', matchId)
    if (data) setPayments(data)
    setLoading(false)
  }

  useEffect(() => { fetch() }, [matchId])

  return { payments, loading, refetch: fetch }
}