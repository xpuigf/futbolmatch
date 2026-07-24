import { cn } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'

interface BadgeProps {
  status: string
  className?: string
}

const colorMap: Record<string, string> = {
  scheduled: 'bg-[#F5F5F5] text-[#666666] border border-[#DDDDDD]',
  completed: 'bg-[#F5F5F5] text-[#333333] border border-[#DDDDDD]',
  cancelled: 'bg-[#C00000]/10 text-[#C00000]',
  confirmed: 'bg-[#F5F5F5] text-[#333333] border border-[#DDDDDD]',
  pending: 'bg-[#F5F5F5] text-[#666666] border border-[#DDDDDD]',
  declined: 'bg-[#C00000]/10 text-[#C00000]',
  paid: 'bg-[#F5F5F5] text-[#333333] border border-[#DDDDDD]',
  cash: 'bg-[#F5F5F5] text-[#666666] border border-[#DDDDDD]',
  bizum: 'bg-[#F5F5F5] text-[#666666] border border-[#DDDDDD]',
  income: 'bg-[#F5F5F5] text-[#333333] border border-[#DDDDDD]',
  expense: 'bg-[#C00000]/10 text-[#C00000]',
}

export function Badge({ status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold',
        colorMap[status] || 'bg-[#F5F5F5] text-[#666666]',
        className
      )}
    >
      {STATUS_LABELS[status] || status}
    </span>
  )
}