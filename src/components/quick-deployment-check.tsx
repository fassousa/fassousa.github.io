'use client'

import { ExternalLink } from 'lucide-react'
import { useDeploymentStatus } from '@/hooks/use-deployment-status'
import { getDisplayStatus, formatTimeAgo } from '@/lib/github'
import { StatusIcon } from './status-icon'

interface QuickDeploymentCheckProps {
  className?: string
}

export default function QuickDeploymentCheck({ className = '' }: QuickDeploymentCheckProps) {
  const { workflowRun, isLoading, refresh, hasToken } = useDeploymentStatus({ autoFetch: false })
  
  const { icon, text, color } = getDisplayStatus(workflowRun)

  if (!hasToken) {
    return null // Don't show anything if no token
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={refresh}
        disabled={isLoading}
        className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
        title="Check deployment status"
      >
        <StatusIcon 
          type={isLoading ? 'loading' : icon} 
          className="h-3 w-3" 
          animate={isLoading}
        />
        <span className={color}>
          {isLoading ? 'Checking...' : text}
        </span>
      </button>
      
      {workflowRun && (
        <>
          <span className="text-xs text-gray-500">
            {formatTimeAgo(workflowRun.updated_at)}
          </span>
          <a
            href={workflowRun.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="View in GitHub"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </>
      )}
    </div>
  )
}
