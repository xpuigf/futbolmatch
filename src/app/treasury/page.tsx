'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { PotSection } from '@/components/treasury/PotSection'
import { DebtList } from '@/components/treasury/DebtList'
import { useUser } from '@/hooks/useUser'
import { useTreasury, usePendingDebts } from '@/hooks/useTreasury'

export default function TreasuryPage() {
  const { isAdmin } = useUser()
  const { transactions, balance, loading, refetch } = useTreasury()
  const { debts } = usePendingDebts()

  return (
    <AppLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Tresoreria</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <PotSection
              balance={balance}
              transactions={transactions}
              isAdmin={isAdmin}
              onUpdate={refetch}
            />

            <div>
              <h2 className="font-semibold mb-3">
                Deutes pendents ({debts.length})
              </h2>
              <DebtList debts={debts} isAdmin={isAdmin} onUpdate={refetch} />
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}