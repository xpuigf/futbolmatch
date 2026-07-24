import { createBrowserClient } from '@supabase/ssr'
import { createMockClient } from './mock'

const isMock = process.env.NEXT_PUBLIC_MOCK_MODE === 'true'

export function createClient() {
  if (isMock) return createMockClient()

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}