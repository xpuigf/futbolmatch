'use client'

import { useState, useEffect } from 'react'
import { LoginForm, RegisterForm } from '@/components/auth/LoginForm'
import { Button } from '@/components/ui/Button'
import { signInWithEmail } from '@/components/auth/AuthGuard'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [isMock, setIsMock] = useState(false)
  const [mockLoginLoading, setMockLoginLoading] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setIsMock(
      process.env.NEXT_PUBLIC_MOCK_MODE === 'true' ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL
    )
  }, [])

  const mockLogin = async (email: string) => {
    setMockLoginLoading(email)
    await signInWithEmail(email, 'password')
    router.push('/dashboard')
  }

  const mockAccounts = [
    { email: 'admin@futbolmatch.cat', label: 'Admin' },
    { email: 'player1@test.cat', label: 'Gerard Piqué' },
    { email: 'player2@test.cat', label: 'Leo Messi' },
  ]

  return (
    <main className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {mode === 'login' ? <LoginForm /> : <RegisterForm />}
        <p className="text-center text-sm text-muted-foreground mt-6">
          {mode === 'login' ? (
            <>No tens compte?{' '}
              <button onClick={() => setMode('register')} className="text-primary font-medium hover:underline">
                Registra't
              </button>
            </>
          ) : (
            <>Ja tens compte?{' '}
              <button onClick={() => setMode('login')} className="text-primary font-medium hover:underline">
                Inicia sessió
              </button>
            </>
          )}
        </p>
        {isMock && (
          <div className="mt-8 space-y-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#DDDDDD]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-[#666666]">Accés de prova (mock)</span>
              </div>
            </div>
            {mockAccounts.map((acc) => (
              <Button
                key={acc.email}
                variant="secondary"
                className="w-full justify-start font-normal"
                onClick={() => mockLogin(acc.email)}
                loading={mockLoginLoading === acc.email}
              >
                {acc.label} — <span className="text-muted-foreground">{acc.email}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}