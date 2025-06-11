'use client'

import { ExternalLink, RefreshCw } from 'lucide-react'
import { useDeploymentStatus } from '@/hooks/use-deployment-status'
import { getDisplayStatus, formatTimeAgo } from '@/lib/github'
import { StatusIcon } from './status-icon'

interface DeploymentStatusProps {
  className?: string
  showDetails?: boolean
  autoRefresh?: boolean
  compact?: boolean
}

export default function DeploymentStatus({ 
  className = '', 
  showDetails = false,
  autoRefresh = false,
  compact = false
}: DeploymentStatusProps) {
  const { 
    workflowRun, 
    isLoading, 
    error, 
    lastChecked, 
    refresh, 
    hasToken 
  } = useDeploymentStatus({ 
    autoFetch: true,
    pollInterval: autoRefresh ? 30000 : undefined // 30 seconds if auto-refresh enabled
  })

  const { icon, text, color } = getDisplayStatus(workflowRun)

  if (!hasToken) {
    return (
      <div className={`text-sm text-gray-500 ${className}`}>
        {compact ? 'Auth required' : 'GitHub token required for deployment status'}
      </div>
    )
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <StatusIcon 
          type={isLoading ? 'loading' : icon} 
          className="h-3 w-3" 
          animate={isLoading}
        />
        <span className={`text-xs ${color}`}>{isLoading ? 'Checking...' : text}</span>
        {workflowRun?.html_url && (
          <a
            href={workflowRun.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="View workflow run"
          >
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        <StatusIcon 
          type={isLoading ? 'loading' : icon} 
          className="h-4 w-4" 
          animate={isLoading}
        />
        <span className={`text-sm font-medium ${color}`}>
          {isLoading ? 'Checking...' : text}
        </span>
      </div>
      
      {workflowRun && lastChecked && (
        <span className="text-xs text-gray-500">
          {formatTimeAgo(workflowRun.updated_at)}
        </span>
      )}
      
      {workflowRun?.html_url && (
        <a
          href={workflowRun.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="View workflow run"
        >
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
      
      <button
        onClick={refresh}
        disabled={isLoading}
        className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        title="Refresh status"
      >
        <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
      </button>
      
      {showDetails && error && (
        <div className="text-xs text-red-500 mt-1">
          {error}
        </div>
      )}
    </div>
  )
}
