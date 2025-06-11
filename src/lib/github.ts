// GitHub API constants and utilities
export const GITHUB_CONFIG = {
  REPO_OWNER: 'fassousa',
  REPO_NAME: 'fassousa.github.io',
  BRANCH: 'main',
  ENVIRONMENT: 'github-pages',
  TOKEN_KEY: 'githubToken', // Standardized key
} as const

export const GITHUB_ENDPOINTS = {
  WORKFLOW_RUNS: `https://api.github.com/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/actions/runs`,
  DEPLOYMENTS: `https://api.github.com/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/deployments`,
  USER: 'https://api.github.com/user',
  CONTENTS: (path: string) => 
    `https://api.github.com/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/contents/${path}`,
} as const

// Types
export type WorkflowStatus = 'queued' | 'in_progress' | 'completed'
export type WorkflowConclusion = 'success' | 'failure' | 'cancelled' | 'skipped' | null
export type DeploymentState = 'success' | 'failure' | 'pending' | 'in_progress' | 'queued' | 'unknown'

export interface WorkflowRun {
  id: number
  status: WorkflowStatus
  conclusion: WorkflowConclusion
  created_at: string
  updated_at: string
  html_url: string
  head_sha: string
}

export interface DeploymentStatus {
  state: DeploymentState
  environment: string
  created_at: string
  updated_at: string
  target_url?: string
  environment_url?: string
  description?: string
}

// Utility functions
export const getGitHubToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(GITHUB_CONFIG.TOKEN_KEY)
}

export const setGitHubToken = (token: string): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(GITHUB_CONFIG.TOKEN_KEY, token)
}

export const removeGitHubToken = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(GITHUB_CONFIG.TOKEN_KEY)
}

export const createGitHubHeaders = (token: string) => ({
  'Authorization': `token ${token}`,
  'Accept': 'application/vnd.github.v3+json',
})

export const getDisplayStatus = (run: WorkflowRun | null): {
  status: string
  icon: 'success' | 'failure' | 'loading' | 'pending'
  text: string
  color: string
} => {
  if (!run) {
    return {
      status: 'unknown',
      icon: 'pending',
      text: 'Unknown',
      color: 'text-gray-400'
    }
  }

  const status = run.status === 'completed' ? run.conclusion : run.status
  
  switch (status) {
    case 'success':
      return {
        status: 'success',
        icon: 'success',
        text: 'Live',
        color: 'text-green-500'
      }
    case 'failure':
      return {
        status: 'failure',
        icon: 'failure',
        text: 'Failed',
        color: 'text-red-500'
      }
    case 'in_progress':
      return {
        status: 'in_progress',
        icon: 'loading',
        text: 'Building',
        color: 'text-yellow-500'
      }
    case 'queued':
      return {
        status: 'queued',
        icon: 'pending',
        text: 'Queued',
        color: 'text-yellow-500'
      }
    default:
      return {
        status: 'pending',
        icon: 'pending',
        text: 'Pending',
        color: 'text-yellow-500'
      }
  }
}

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
  return `${Math.floor(diffInMinutes / 1440)}d ago`
}

// GitHub API functions
export const fetchLatestWorkflowRun = async (token: string): Promise<WorkflowRun | null> => {
  const response = await fetch(
    `${GITHUB_ENDPOINTS.WORKFLOW_RUNS}?per_page=1&branch=${GITHUB_CONFIG.BRANCH}`,
    { headers: createGitHubHeaders(token) }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch workflow runs: ${response.statusText}`)
  }

  const data = await response.json()
  return data.workflow_runs?.[0] || null
}

export const fetchLatestDeployment = async (token: string): Promise<DeploymentStatus | null> => {
  const deploymentsResponse = await fetch(
    `${GITHUB_ENDPOINTS.DEPLOYMENTS}?per_page=1&environment=${GITHUB_CONFIG.ENVIRONMENT}`,
    { headers: createGitHubHeaders(token) }
  )

  if (!deploymentsResponse.ok) {
    throw new Error(`Failed to fetch deployments: ${deploymentsResponse.statusText}`)
  }

  const deploymentsData = await deploymentsResponse.json()
  const latestDeployment = deploymentsData[0]

  if (!latestDeployment) return null

  const statusResponse = await fetch(
    `${GITHUB_ENDPOINTS.DEPLOYMENTS}/${latestDeployment.id}/statuses`,
    { headers: createGitHubHeaders(token) }
  )

  if (!statusResponse.ok) return null

  const statusData = await statusResponse.json()
  const latestStatus = statusData[0]

  return latestStatus || null
}
