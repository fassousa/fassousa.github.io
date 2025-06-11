/**
 * Deployment Status Tests - Simple logic tests for refactored components
 */

import { 
  GITHUB_CONFIG, 
  GITHUB_ENDPOINTS, 
  getDisplayStatus, 
  formatTimeAgo,
  createGitHubHeaders,
  type WorkflowRun 
} from '../src/lib/github'

describe('GitHub Configuration and Utilities', () => {
  test('should have correct repository configuration', () => {
    expect(GITHUB_CONFIG.REPO_OWNER).toBe('fassousa')
    expect(GITHUB_CONFIG.REPO_NAME).toBe('fassousa.github.io')
    expect(GITHUB_CONFIG.BRANCH).toBe('main')
    expect(GITHUB_CONFIG.TOKEN_KEY).toBe('githubToken')
  })

  test('should generate correct API endpoints', () => {
    const expectedWorkflow = 'https://api.github.com/repos/fassousa/fassousa.github.io/actions/runs'
    const expectedContents = 'https://api.github.com/repos/fassousa/fassousa.github.io/contents/test-path'
    
    expect(GITHUB_ENDPOINTS.WORKFLOW_RUNS).toBe(expectedWorkflow)
    expect(GITHUB_ENDPOINTS.CONTENTS('test-path')).toBe(expectedContents)
    expect(GITHUB_ENDPOINTS.USER).toBe('https://api.github.com/user')
  })

  test('should create correct GitHub headers', () => {
    const token = 'ghp_test_token'
    const headers = createGitHubHeaders(token)
    
    expect(headers).toEqual({
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    })
  })
})

describe('Deployment Status Display Logic', () => {
  test('should map workflow status to correct display properties', () => {
    const successRun: WorkflowRun = {
      id: 1,
      status: 'completed',
      conclusion: 'success',
      created_at: '2024-01-01T10:00:00Z',
      updated_at: '2024-01-01T10:05:00Z',
      html_url: 'https://github.com/test/repo/actions/runs/1',
      head_sha: 'abc123'
    }
    
    const result = getDisplayStatus(successRun)
    expect(result.status).toBe('success')
    expect(result.text).toBe('Live')
    expect(result.color).toBe('text-green-500')
    expect(result.icon).toBe('success')
  })

  test('should handle in-progress workflow correctly', () => {
    const inProgressRun: WorkflowRun = {
      id: 2,
      status: 'in_progress',
      conclusion: null,
      created_at: '2024-01-01T10:00:00Z',
      updated_at: '2024-01-01T10:02:00Z',
      html_url: 'https://github.com/test/repo/actions/runs/2',
      head_sha: 'def456'
    }
    
    const result = getDisplayStatus(inProgressRun)
    expect(result.status).toBe('in_progress')
    expect(result.text).toBe('Building')
    expect(result.color).toBe('text-yellow-500')
    expect(result.icon).toBe('loading')
  })

  test('should handle null workflow run', () => {
    const result = getDisplayStatus(null)
    expect(result.status).toBe('unknown')
    expect(result.text).toBe('Unknown')
    expect(result.color).toBe('text-gray-400')
    expect(result.icon).toBe('pending')
  })
})

describe('Time Formatting', () => {
  test('should format time differences correctly', () => {
    // Test with a time 30 minutes ago
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()
    expect(formatTimeAgo(thirtyMinutesAgo)).toBe('30m ago')
    
    // Test with current time
    const now = new Date().toISOString()
    expect(formatTimeAgo(now)).toBe('just now')
    
    // Test with 2 hours ago
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    expect(formatTimeAgo(twoHoursAgo)).toBe('2h ago')
  })
})
