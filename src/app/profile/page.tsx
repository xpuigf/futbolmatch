'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useUser } from '@/hooks/useUser'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, isAdmin } = useUser()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <AppLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-[#333333]">Perfil</h1>

        <Card>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded bg-[#C00000]/10 flex items-center justify-center text-xl font-bold text-[#C00000]">
                {user?.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <p className="font-semibold text-lg text-[#333333]">{user?.name}</p>
                <p className="text-sm text-[#666666]">{user?.email}</p>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-[#C00000]/10 text-[#C00000] font-semibold">
                  {isAdmin ? 'Administrador' : 'Jugador'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <h3 className="font-semibold text-[#333333]">Informació del compte</h3>
            <div className="text-sm space-y-1">
              <p className="text-[#666666]">Rol: {isAdmin ? 'Admin' : 'Jugador'}</p>
              <p className="text-[#666666]">ID: {user?.id}</p>
            </div>
          </CardContent>
        </Card>

        <Button
          variant="danger"
          className="w-full"
          onClick={handleSignOut}
        >
          Tancar sessió
        </Button>
      </div>
    </AppLayout>
  )
}