'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { CreateMatchForm } from '@/components/matches/CreateMatchForm'
import Link from 'next/link'

export default function NewMatchPage() {
  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-[#C00000] hover:text-[#990000] text-sm font-medium">
            ← Tornar
          </Link>
          <h1 className="text-xl font-bold text-[#333333]">Nou partit</h1>
        </div>
        <CreateMatchForm />
      </div>
    </AppLayout>
  )
}