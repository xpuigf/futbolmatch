import type { User, Match, Attendance, Payment, PotTransaction } from '@/lib/types'

const mockUser: User = {
  id: 'mock-user-1',
  email: 'admin@futbolmatch.cat',
  name: 'Admin Prova',
  role: 'admin',
  created_at: new Date().toISOString(),
}

const mockPlayers: User[] = [
  mockUser,
  { id: 'mock-user-2', email: 'player1@test.cat', name: 'Gerard Piqué', role: 'player', created_at: new Date().toISOString() },
  { id: 'mock-user-3', email: 'player2@test.cat', name: 'Leo Messi', role: 'player', created_at: new Date().toISOString() },
  { id: 'mock-user-4', email: 'player3@test.cat', name: 'Pedri González', role: 'player', created_at: new Date().toISOString() },
  { id: 'mock-user-5', email: 'player4@test.cat', name: 'Gavi', role: 'player', created_at: new Date().toISOString() },
]

const now = new Date()
const addDays = (d: number) => new Date(now.getTime() + d * 86400000).toISOString()
const subDays = (d: number) => new Date(now.getTime() - d * 86400000).toISOString()

const mockMatches: Match[] = [
  { id: 'match-1', date: addDays(3), location: 'Camp Municipal de futbol', max_players: 14, price_per_player: 5, status: 'scheduled', created_at: subDays(5) },
  { id: 'match-2', date: subDays(4), location: 'Camp de la Vila', max_players: 12, price_per_player: 3.50, status: 'completed', created_at: subDays(10) },
  { id: 'match-3', date: subDays(11), location: 'Poliesportiu Municipal', max_players: 10, price_per_player: 4, status: 'completed', created_at: subDays(18) },
  { id: 'match-4', date: subDays(18), location: 'Camp de Can Roca', max_players: 14, price_per_player: 5, status: 'cancelled', created_at: subDays(25) },
]

const mockAttendance: Record<string, any[]> = {
  'match-1': [
    { id: 'a1', match_id: 'match-1', user_id: 'mock-user-1', status: 'confirmed', created_at: subDays(1), users: { name: 'Admin Prova', email: 'admin@futbolmatch.cat' } },
    { id: 'a2', match_id: 'match-1', user_id: 'mock-user-2', status: 'confirmed', created_at: subDays(1), users: { name: 'Gerard Piqué', email: 'player1@test.cat' } },
    { id: 'a3', match_id: 'match-1', user_id: 'mock-user-3', status: 'confirmed', created_at: subDays(1), users: { name: 'Leo Messi', email: 'player2@test.cat' } },
    { id: 'a4', match_id: 'match-1', user_id: 'mock-user-4', status: 'pending', created_at: subDays(1), users: { name: 'Pedri González', email: 'player3@test.cat' } },
    { id: 'a5', match_id: 'match-1', user_id: 'mock-user-5', status: 'declined', created_at: subDays(1), users: { name: 'Gavi', email: 'player4@test.cat' } },
  ],
  'match-2': [
    { id: 'a6', match_id: 'match-2', user_id: 'mock-user-1', status: 'confirmed', created_at: subDays(7), users: { name: 'Admin Prova', email: 'admin@futbolmatch.cat' } },
    { id: 'a7', match_id: 'match-2', user_id: 'mock-user-2', status: 'confirmed', created_at: subDays(7), users: { name: 'Gerard Piqué', email: 'player1@test.cat' } },
    { id: 'a8', match_id: 'match-2', user_id: 'mock-user-3', status: 'confirmed', created_at: subDays(7), users: { name: 'Leo Messi', email: 'player2@test.cat' } },
    { id: 'a9', match_id: 'match-2', user_id: 'mock-user-4', status: 'confirmed', created_at: subDays(7), users: { name: 'Pedri González', email: 'player3@test.cat' } },
  ],
  'match-3': [
    { id: 'a10', match_id: 'match-3', user_id: 'mock-user-1', status: 'confirmed', created_at: subDays(14), users: { name: 'Admin Prova', email: 'admin@futbolmatch.cat' } },
    { id: 'a11', match_id: 'match-3', user_id: 'mock-user-2', status: 'confirmed', created_at: subDays(14), users: { name: 'Gerard Piqué', email: 'player1@test.cat' } },
    { id: 'a12', match_id: 'match-3', user_id: 'mock-user-5', status: 'confirmed', created_at: subDays(14), users: { name: 'Gavi', email: 'player4@test.cat' } },
  ],
  'match-4': [],
}

const mockPayments: Record<string, any[]> = {
  'match-1': [
    { id: 'p1', match_id: 'match-1', user_id: 'mock-user-1', amount: 5, method: 'bizum', status: 'paid', paid_at: subDays(1), created_at: subDays(2), users: { name: 'Admin Prova', email: 'admin@futbolmatch.cat' } },
    { id: 'p2', match_id: 'match-1', user_id: 'mock-user-2', amount: 5, method: 'cash', status: 'paid', paid_at: subDays(1), created_at: subDays(2), users: { name: 'Gerard Piqué', email: 'player1@test.cat' } },
    { id: 'p3', match_id: 'match-1', user_id: 'mock-user-3', amount: 5, method: 'bizum', status: 'pending', paid_at: null, created_at: subDays(2), users: { name: 'Leo Messi', email: 'player2@test.cat' } },
    { id: 'p4', match_id: 'match-1', user_id: 'mock-user-4', amount: 5, method: 'bizum', status: 'pending', paid_at: null, created_at: subDays(2), users: { name: 'Pedri González', email: 'player3@test.cat' } },
  ],
  'match-2': [
    { id: 'p5', match_id: 'match-2', user_id: 'mock-user-1', amount: 3.50, method: 'bizum', status: 'paid', paid_at: subDays(6), created_at: subDays(7), users: { name: 'Admin Prova', email: 'admin@futbolmatch.cat' } },
    { id: 'p6', match_id: 'match-2', user_id: 'mock-user-2', amount: 3.50, method: 'cash', status: 'paid', paid_at: subDays(6), created_at: subDays(7), users: { name: 'Gerard Piqué', email: 'player1@test.cat' } },
    { id: 'p7', match_id: 'match-2', user_id: 'mock-user-3', amount: 3.50, method: 'cash', status: 'paid', paid_at: subDays(6), created_at: subDays(7), users: { name: 'Leo Messi', email: 'player2@test.cat' } },
    { id: 'p8', match_id: 'match-2', user_id: 'mock-user-4', amount: 3.50, method: 'bizum', status: 'pending', paid_at: null, created_at: subDays(7), users: { name: 'Pedri González', email: 'player3@test.cat' } },
  ],
  'match-3': [],
  'match-4': [],
}

const mockTransactions: PotTransaction[] = [
  { id: 'tx1', type: 'income', amount: 13.50, description: 'Pagaments partit 2 (Camp de la Vila)', created_at: subDays(6) },
  { id: 'tx2', type: 'income', amount: 10, description: 'Pagaments partit 1', created_at: subDays(1) },
  { id: 'tx3', type: 'expense', amount: 15, description: 'Samarretes noves', created_at: subDays(3) },
  { id: 'tx4', type: 'income', amount: 10, description: 'Pagaments partit 3', created_at: subDays(12) },
]

function delay(ms = 150): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

// Build a fluent filter chain
class MockQueryBuilder {
  [key: string]: any
  data: any[]
  filters: Array<(row: any) => boolean> = []
  singleResult = false
  orderField = ''
  orderAsc = true
  limitCount = 0
  selectStr = '*'

  constructor(data: any[]) {
    this.data = data
  }

  select(columns: string) {
    this.selectStr = columns
    return this
  }

  eq(field: string, value: any) {
    this.filters.push((row: any) => row[field] === value)
    return this
  }

  order(field: string, opts?: { ascending?: boolean }) {
    this.orderField = field
    this.orderAsc = opts?.ascending ?? true
    return this
  }

  limit(count: number) {
    this.limitCount = count
    return this
  }

  single() {
    this.singleResult = true
    return this
  }

  async then(resolve: (val: any) => any, reject?: (err: any) => any) {
    await delay()
    let result = this.data.filter((row) => this.filters.every((f) => f(row)))

    if (this.orderField) {
      result = [...result].sort((a, b) => {
        const av = a[this.orderField], bv = b[this.orderField]
        return this.orderAsc ? (av < bv ? -1 : 1) : (av > bv ? -1 : 1)
      })
    }

    if (this.limitCount > 0) result = result.slice(0, this.limitCount)

    const value = this.singleResult ? (result[0] ?? null) : result
    return resolve({ data: value, error: null, count: null, status: 200, statusText: 'OK' })
  }

  catch(_reject?: (err: any) => any) {
    return this
  }
}

class MockMutationBuilder {
  private table: string
  private idField = 'id'

  constructor(table: string) {
    this.table = table
  }

  private async addRow(row: any) {
    await delay()
    if (this.table === 'matches') {
      row.id = `match-${Date.now()}`
      mockMatches.unshift(row)
    }
    return { data: row, error: null }
  }

  insert(values: any) {
    return { then: (resolve: any) => resolve(this.addRow(values)) }
  }

  update(values: any) {
    const sb: any = { eq: (f: string, v: any) => { this.idField = f; return sb }, then: async (resolve: any) => { await delay(); return resolve({ data: values, error: null }) } }
    return sb
  }
}

class MockFromBuilder {
  private table: string

  constructor(table: string) {
    this.table = table
  }

  select(columns = '*') {
    let data: any[] = []
    switch (this.table) {
      case 'users':
        data = mockPlayers
        break
      case 'matches':
        data = mockMatches
        break
      case 'attendance':
        return new MockQueryBuilder([])
      case 'payments':
        return new MockQueryBuilder([])
      case 'pot_transactions':
        data = mockTransactions
        break
    }
    const qb = new MockQueryBuilder(data)
    qb.select(columns)
    return qb
  }

  insert(values: any) {
    if (this.table === 'attendance') {
      return {
        then: async (resolve: any) => {
          await delay()
          const entry = { id: `a-${Date.now()}`, match_id: values.match_id, user_id: values.user_id, status: values.status, created_at: new Date().toISOString(), users: { name: 'Admin Prova', email: 'admin@futbolmatch.cat' } }
          if (!mockAttendance[values.match_id]) mockAttendance[values.match_id] = []
          const existing = mockAttendance[values.match_id].findIndex((a: any) => a.user_id === values.user_id)
          if (existing >= 0) mockAttendance[values.match_id][existing] = entry
          else mockAttendance[values.match_id].push(entry)
          return resolve({ data: entry, error: null })
        }
      }
    }
    if (this.table === 'payments') {
      return {
        then: async (resolve: any) => {
          await delay()
          const entry = { id: `p-${Date.now()}`, ...values, users: { name: 'Admin Prova' } }
          if (!mockPayments[values.match_id]) mockPayments[values.match_id] = []
          mockPayments[values.match_id].push(entry)
          return resolve({ data: entry, error: null })
        }
      }
    }
    return new MockMutationBuilder(this.table).insert(values)
  }

  update(values: any) {
    return new MockMutationBuilder(this.table).update(values)
  }
}

// Module-level auth state shared across all mock client instances
let authCallback: ((event: string, session: any) => void) | null = null
let currentUser: User | null = null

export function createMockClient() {

  return {
    auth: {
      getUser: async () => {
        await delay()
        const u = currentUser
        return { data: { user: u ? { id: u.id, email: u.email, user_metadata: { name: u.name } } : null }, error: null }
      },
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        await delay(500)
        let found = mockPlayers.find((u) => u.email === email)
        if (!found) {
          found = { id: `mock-user-${Date.now()}`, email, name: email.split('@')[0], role: email.includes('admin') ? 'admin' : 'player', created_at: new Date().toISOString() }
          mockPlayers.push(found)
        }
        currentUser = found
        if (authCallback) authCallback('SIGNED_IN', { user: found })
        return { data: { user: found, session: { access_token: 'mock', refresh_token: 'mock' } }, error: null }
      },
      signInWithOAuth: async () => {
        await delay(500)
        return { data: { provider: 'google', url: window.location.origin + '/auth/callback?code=mock' }, error: null }
      },
      signOut: async () => {
        await delay()
        currentUser = null
        if (authCallback) authCallback('SIGNED_OUT', null)
        return { error: null }
      },
      signUp: async ({ email, password, options }: any) => {
        await delay(500)
        const newUser: User = { id: `mock-user-${Date.now()}`, email, name: options?.data?.name || email, role: 'player', created_at: new Date().toISOString() }
        mockPlayers.push(newUser)
        currentUser = newUser
        return { data: { user: newUser, session: { access_token: 'mock', refresh_token: 'mock' } }, error: null }
      },
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        authCallback = callback
        return { data: { subscription: { unsubscribe: () => { authCallback = null } } } }
      },
      exchangeCodeForSession: async () => {
        await delay()
        if (!currentUser) currentUser = mockUser
        if (authCallback) authCallback('SIGNED_IN', { user: currentUser })
        return { data: { user: currentUser, session: {} }, error: null }
      },
    },
    from: (table: string) => {
      const fb = new MockFromBuilder(table)
      // Dynamically pass attendance/payments filters to the right data
      if (table === 'attendance') {
        const origSelect = fb.select.bind(fb)
        fb.select = (columns = '*') => {
          const qb = new MockQueryBuilder([])
          qb.select = (c: string) => qb
          qb.eq = (field: string, value: any) => {
            if (field === 'match_id') {
              qb['_matchIdFilter'] = value
              const data = mockAttendance[value] || []
              const innerQb = new MockQueryBuilder(data)
              innerQb.select = () => innerQb
              innerQb.eq = () => innerQb
              innerQb.single = () => { innerQb.singleResult = true; return innerQb }
              innerQb.order = () => innerQb
              innerQb.limit = () => innerQb
              return innerQb
            }
            return qb
          }
          return qb
        }
      }
      if (table === 'payments') {
        fb.select = (columns = '*') => {
          const qb = new MockQueryBuilder([])
          qb.select = (c: string) => qb
          qb.eq = (field: string, value: any) => {
            if (field === 'match_id') {
              const data = mockPayments[value] || []
              const innerQb = new MockQueryBuilder(data)
              innerQb.select = () => innerQb
              innerQb.eq = () => innerQb
              innerQb.single = () => { innerQb.singleResult = true; return innerQb }
              innerQb.order = () => innerQb
              innerQb.limit = () => innerQb
              return innerQb
            }
            return qb
          }
          return qb
        }
      }
      return fb
    },
    rpc: () => ({ then: async (r: any) => r({ data: null, error: null }) }),
  } as any
}