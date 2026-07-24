// Rols d'usuari
export const ROLES = {
  ADMIN: 'admin' as const,
  PLAYER: 'player' as const,
}

// Estats dels partits
export const MATCH_STATUS = {
  SCHEDULED: 'scheduled' as const,
  COMPLETED: 'completed' as const,
  CANCELLED: 'cancelled' as const,
}

// Estats de confirmació d'assistència
export const ATTENDANCE_STATUS = {
  CONFIRMED: 'confirmed' as const,
  PENDING: 'pending' as const,
  DECLINED: 'declined' as const,
}

// Mètodes de pagament
export const PAYMENT_METHODS = {
  CASH: 'cash' as const,
  BIZUM: 'bizum' as const,
}

// Estats de pagament
export const PAYMENT_STATUS = {
  PENDING: 'pending' as const,
  PAID: 'paid' as const,
  CANCELLED: 'cancelled' as const,
}

// Tipus de transacció de la pota
export const TX_TYPE = {
  INCOME: 'income' as const,
  EXPENSE: 'expense' as const,
}

// Textos en català per a la UI
export const STATUS_LABELS: Record<string, string> = {
  scheduled: 'Programat',
  completed: 'Finalitzat',
  cancelled: 'Cancel·lat',
  confirmed: 'Confirmat',
  pending: 'Pendents',
  declined: 'Rebutjat',
  paid: 'Pagat',
  cash: 'Efectiu',
  bizum: 'Bizum',
  income: 'Ingrés',
  expense: 'Despesa',
}

export const NAV_ITEMS = [
  { href: '/dashboard', label: 'Partits' },
  { href: '/treasury', label: 'Tresoreria' },
  { href: '/profile', label: 'Perfil' },
] as const