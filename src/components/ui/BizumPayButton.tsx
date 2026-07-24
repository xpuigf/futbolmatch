'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface BizumPayButtonProps {
  adminPhone: string
  amount: number
  concepte: string
  onPaid?: () => void
}

export function BizumPayButton({ adminPhone, amount, concepte }: BizumPayButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'opening'>('idle')

  const handlePay = async () => {
    setStatus('opening')

    // 1. Copy admin phone to clipboard
    try {
      await navigator.clipboard.writeText(adminPhone)
      setStatus('copied')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      // clipboard not available
    }

    // 2. Try to open Revolut app
    const revolutUrl = `revolut://bizum`
    const fallbackUrl = 'https://app.revolut.com/'

    const opened = window.open(revolutUrl, '_blank')
    if (!opened) {
      window.open(fallbackUrl, '_blank')
    }
  }

  return (
    <div className="space-y-1.5">
      <Button
        size="sm"
        className="w-full"
        onClick={handlePay}
        loading={status === 'opening'}
      >
        {status === 'copied' ? '✓ Número copiat!' : `Pagar ${amount.toFixed(2)}€ amb Bizum`}
      </Button>
      <p className="text-xs text-[#666666] text-center">
        Al administrador · {adminPhone}
      </p>
    </div>
  )
}
