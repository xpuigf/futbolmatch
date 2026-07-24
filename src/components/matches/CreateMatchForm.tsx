'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function CreateMatchForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    date: '',
    time: '',
    location: '',
    max_players: 14,
    price_per_player: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.from('matches').insert({
      date: `${form.date}T${form.time}:00`,
      location: form.location,
      max_players: form.max_players,
      price_per_player: form.price_per_player,
      status: 'scheduled',
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="date"
        label="Data"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <Input
        id="time"
        label="Hora"
        type="time"
        value={form.time}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
        required
      />
      <Input
        id="location"
        label="Lloc"
        placeholder="Camp Municipal, Camp de futbol..."
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        required
      />
      <Input
        id="max_players"
        label="Màxim de jugadors"
        type="number"
        min={2}
        max={30}
        value={form.max_players}
        onChange={(e) => setForm({ ...form, max_players: parseInt(e.target.value) || 14 })}
        required
      />
      <Input
        id="price_per_player"
        label="Preu per jugador (€)"
        type="number"
        step="0.50"
        min={0}
        value={form.price_per_player}
        onChange={(e) => setForm({ ...form, price_per_player: parseFloat(e.target.value) || 0 })}
        required
      />
      {error && <p className="text-sm text-[#C00000]">{error}</p>}
      <Button type="submit" className="w-full" loading={loading}>
        Crear partit
      </Button>
    </form>
  )
}