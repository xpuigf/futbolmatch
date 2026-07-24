'use client'

import { useState } from 'react'

interface BizumLinkProps {
  phone: string
  amount?: number
  concepte?: string
}

export function BizumLink({ phone, amount, concepte }: BizumLinkProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(phone)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-mono text-[#666666]">{phone}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="text-xs text-[#C00000] hover:underline whitespace-nowrap font-medium"
      >
        {copied ? 'Copiat!' : 'Copiar'}
      </button>
    </div>
  )
}
