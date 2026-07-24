import { cn } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'

interface BadgeProps {
  status: string
  className?: string
}

const colorMap: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  declined: 'bg-red-100 text-red-700',
  paid: 'bg-green-100 text-green-700',
  cash: 'bg-orange-100 text-orange-700',
  bizum: 'bg-purple-100 text-purple-700',
  income: 'bg-green-100 text-green-700',
  expense: 'bg-red-100 text-red-700',
}

export function Badge({ status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        colorMap[status] || 'bg-gray-100 text-gray-700',
        className
      )}
    >
      {STATUS_LABELS[status] || status}
    </span>
  )
}