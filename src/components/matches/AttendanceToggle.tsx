'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { ATTENDANCE_STATUS } from '@/lib/constants'

interface AttendanceToggleProps {
  matchId: string
  currentStatus: string | null
  onUpdate: () => void
}

export function AttendanceToggle({ matchId, currentStatus, onUpdate }: AttendanceToggleProps) {
  const [loading, setLoading] = useState(false)

  const setAttendance = async (status: string) => {
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (currentStatus) {
      await supabase
        .from('attendance')
        .update({ status })
        .eq('match_id', matchId)
        .eq('user_id', user.id)
    } else {
      await supabase
        .from('attendance')
        .insert({ match_id: matchId, user_id: user.id, status })
    }

    setLoading(false)
    onUpdate()
  }

  const options = [
    { value: ATTENDANCE_STATUS.CONFIRMED, emoji: '✅', label: 'Hi vaig' },
    { value: ATTENDANCE_STATUS.PENDING, emoji: '🤷', label: 'No ho sé' },
    { value: ATTENDANCE_STATUS.DECLINED, emoji: '❌', label: 'No vaig' },
  ]

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-[#333333]">La teva assistència</p>
      <div className="flex gap-2">
        {options.map(({ value, emoji, label }) => {
          const isActive = currentStatus === value
          return (
            <Button
              key={value}
              variant={isActive ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setAttendance(value)}
              loading={loading}
              className="flex-1"
            >
              {emoji} {label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}