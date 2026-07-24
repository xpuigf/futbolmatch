import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-[#333333]">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          'w-full px-3 py-2.5 rounded border border-[#DDDDDD] bg-white text-sm text-[#333333] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#C00000]/50 focus:border-[#C00000] transition-colors',
          error && 'border-[#C00000] focus:ring-[#C00000]/50',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-[#C00000]">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'

export { Input }