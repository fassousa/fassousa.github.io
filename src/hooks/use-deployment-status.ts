'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  getGitHubToken, 
  fetchLatestWorkflowRun, 
  getDisplayStatus,
  type WorkflowRun 
} from '@/lib/github'

export interface UseDeploymentStatusOptions {
  autoFetch?: boolean
  pollInterval?: number
}

export interface UseDeploymentStatusReturn {
  workflowRun: WorkflowRun | null
  isLoading: boolean
  error: string | null
  lastChecked: Date | null
  refresh: () => Promise<void>
  hasToken: boolean
}

export function useDeploymentStatus(options: UseDeploymentStatusOptions = {}): UseDeploymentStatusReturn {
  const { autoFetch = true, pollInterval } = options
  
  const [workflowRun, setWorkflowRun] = useState<WorkflowRun | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [hasToken, setHasToken] = useState(false)

  // Check for token on mount
  useEffect(() => {
    const token = getGitHubToken()
    setHasToken(!!token)
  }, [])

  const refresh = useCallback(async () => {
    const token = getGitHubToken()
    if (!token) {
      setError('GitHub token not found. Please authenticate first.')
      setHasToken(false)
      return
    }

    setHasToken(true)
    setIsLoading(true)
    setError(null)

    try {
      const run = await fetchLatestWorkflowRun(token)
      setWorkflowRun(run)
      setLastChecked(new Date())
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch deployment status'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Auto-fetch on mount if enabled and token exists
  useEffect(() => {
    if (autoFetch && hasToken) {
      refresh()
    }
  }, [autoFetch, hasToken, refresh])

  // Set up polling if interval is provided
  useEffect(() => {
    if (!pollInterval || !hasToken) return

    const interval = setInterval(refresh, pollInterval)
    return () => clearInterval(interval)
  }, [pollInterval, hasToken, refresh])

  return {
    workflowRun,
    isLoading,
    error,
    lastChecked,
    refresh,
    hasToken,
  }
}
