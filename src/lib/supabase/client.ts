import { createBrowserClient } from '@supabase/ssr'
import { createMockClient } from './mock'

function shouldUseMock(): boolean {
  if (process.env.NEXT_PUBLIC_MOCK_MODE === 'true') return true
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url || url === 'placeholder' || url.includes('placeholder')) return true
  return false
}

export function createClient() {
  if (shouldUseMock()) return createMockClient()

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}