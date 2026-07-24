export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'player'
  created_at: string
}

export interface Match {
  id: string
  date: string
  location: string
  max_players: number
  price_per_player: number
  status: 'scheduled' | 'completed' | 'cancelled'
  created_at: string
}

export interface Attendance {
  id: string
  match_id: string
  user_id: string
  status: 'confirmed' | 'pending' | 'declined'
  created_at: string
}

export type PaymentMethod = 'cash' | 'bizum'
export type PaymentStatus = 'pending' | 'paid' | 'cancelled'

export interface Payment {
  id: string
  match_id: string
  user_id: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  paid_at: string | null
  created_at: string
}

export type PotTransactionType = 'income' | 'expense'

export interface PotTransaction {
  id: string
  type: PotTransactionType
  amount: number
  description: string
  created_at: string
}

// View models (joined queries)
export interface AttendanceWithUser extends Attendance {
  users: Pick<User, 'name' | 'email'>
}

export interface PaymentWithUser extends Payment {
  users: Pick<User, 'name' | 'email'>
}

export interface MatchWithDetails extends Match {
  attendance_count: number
  payment_count: number
  total_collected: number
}