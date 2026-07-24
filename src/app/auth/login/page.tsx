'use client'

import { useState } from 'react'
import { LoginForm, RegisterForm } from '@/components/auth/LoginForm'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

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
      </div>
    </main>
  )
}