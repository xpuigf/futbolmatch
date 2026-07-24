'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard')
  }, [router])

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="size-8 border-2 border-[#C00000] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}