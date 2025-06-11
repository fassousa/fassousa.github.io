import { CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react'

interface StatusIconProps {
  type: 'success' | 'failure' | 'loading' | 'pending'
  className?: string
  animate?: boolean
}

export function StatusIcon({ type, className = 'h-4 w-4', animate = false }: StatusIconProps) {
  const baseClasses = animate && type === 'loading' ? `${className} animate-spin` : className

  switch (type) {
    case 'success':
      return <CheckCircle className={`${baseClasses} text-green-500`} />
    case 'failure':
      return <AlertCircle className={`${baseClasses} text-red-500`} />
    case 'loading':
      return <RefreshCw className={baseClasses} />
    case 'pending':
    default:
      return <Clock className={`${baseClasses} text-yellow-500`} />
  }
}
