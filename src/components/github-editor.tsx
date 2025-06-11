'use client';

import { useState, useEffect } from 'react';
import { Save, Github, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import DeploymentStatus from './deployment-status';
import { GITHUB_CONFIG, GITHUB_ENDPOINTS, createGitHubHeaders } from '@/lib/github';

interface GitHubEditorProps {
  slug: string;
  initialContent?: {
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
  };
}

interface GitHubFile {
  content: string;
  sha: string;
}

export default function GitHubEditor({ slug, initialContent }: GitHubEditorProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  
  const [formData, setFormData] = useState({
    title: initialContent?.title || '',
    excerpt: initialContent?.excerpt || '',
    content: initialContent?.content || '',
    tags: initialContent?.tags?.join(', ') || '',
  });

  // GitHub repository information
  const FILE_PATH = `content/blog/${slug}.md`;

  useEffect(() => {
    // Check if GitHub token exists in localStorage
    const token = localStorage.getItem(GITHUB_CONFIG.TOKEN_KEY);
    if (token) {
      setGithubToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const authenticateWithGitHub = async () => {
    if (!githubToken.trim()) {
      setMessage('Please enter a valid GitHub token');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    try {
      // Test the token by making a simple API call
      const response = await fetch(GITHUB_ENDPOINTS.USER, {
        headers: createGitHubHeaders(githubToken),
      });

      if (response.ok) {
        localStorage.setItem(GITHUB_CONFIG.TOKEN_KEY, githubToken);
        setIsAuthenticated(true);
        setMessage('Successfully authenticated with GitHub!');
        setMessageType('success');
        
        // Load existing file content
        await loadFileContent();
      } else {
        setMessage('Invalid GitHub token. Please check your token and try again.');
        setMessageType('error');
      }
    } catch {
      setMessage('Error connecting to GitHub. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFileContent = async () => {
    try {
      const response = await fetch(
        GITHUB_ENDPOINTS.CONTENTS(FILE_PATH),
        {
          headers: createGitHubHeaders(githubToken),
        }
      );

      if (response.ok) {
        const fileData: GitHubFile = await response.json();
        const content = atob(fileData.content.replace(/\s/g, ''));
        
        // Parse frontmatter and content
        const parts = content.split('---\n');
        if (parts.length >= 3) {
          const frontmatter = parts[1];
          const postContent = parts.slice(2).join('---\n').trim();
          
          // Extract title, excerpt, tags from frontmatter
          const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
          const excerptMatch = frontmatter.match(/excerpt:\s*"([^"]+)"/);
          const tagsMatch = frontmatter.match(/tags:\s*\[([^\]]+)\]/);
          
          setFormData({
            title: titleMatch ? titleMatch[1] : '',
            excerpt: excerptMatch ? excerptMatch[1] : '',
            content: postContent,
            tags: tagsMatch ? tagsMatch[1].replace(/"/g, '') : '',
          });
        }
      }
    } catch (error) {
      console.error('Error loading file:', error);
    }
  };

  const saveToGitHub = async () => {
    if (!githubToken || !isAuthenticated) {
      setMessage('Please authenticate with GitHub first');
      setMessageType('error');
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      // Get current file to get its SHA
      const getResponse = await fetch(
        GITHUB_ENDPOINTS.CONTENTS(FILE_PATH),
        {
          headers: createGitHubHeaders(githubToken),
        }
      );

      let sha = '';
      if (getResponse.ok) {
        const fileData = await getResponse.json();
        sha = fileData.sha;
      }

      // Create markdown content with frontmatter
      const currentDate = new Date().toISOString().split('T')[0];
      const existingDate = initialContent ? new Date().toISOString().split('T')[0] : currentDate;
      
      const markdownContent = `---
title: "${formData.title}"
date: "${existingDate}"
updatedDate: "${currentDate}"
excerpt: "${formData.excerpt}"
tags: [${formData.tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
published: true
---

${formData.content}`;

      // Commit the file
      const commitResponse = await fetch(
        GITHUB_ENDPOINTS.CONTENTS(FILE_PATH),
        {
          method: 'PUT',
          headers: {
            ...createGitHubHeaders(githubToken),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Update blog post: ${formData.title}`,
            content: btoa(markdownContent),
            sha: sha || undefined,
          }),
        }
      );

      if (commitResponse.ok) {
        setMessage('Post successfully saved to GitHub! Changes will be deployed shortly.');
        setMessageType('success');
      } else {
        const errorData = await commitResponse.json();
        setMessage(`Error saving to GitHub: ${errorData.message}`);
        setMessageType('error');
      }
    } catch {
      setMessage('Error saving to GitHub. Please try again.');
      setMessageType('error');
    } finally {
      setIsSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(GITHUB_CONFIG.TOKEN_KEY);
    setIsAuthenticated(false);
    setGithubToken('');
    setMessage('Logged out from GitHub');
    setMessageType('success');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Github className="h-6 w-6 mr-2" />
            <h2 className="text-2xl font-bold">GitHub Authentication</h2>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              To edit posts on production, you need to authenticate with GitHub using a Personal Access Token.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
              <h3 className="font-semibold mb-2">How to create a GitHub token:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Go to GitHub Settings → Developer settings → Personal access tokens</li>
                <li>Click &quot;Generate new token&quot; (classic)</li>
                <li>Select scopes: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">repo</code> (full repository access)</li>
                <li>Copy the generated token</li>
              </ol>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="token" className="block text-sm font-medium mb-2">
                GitHub Personal Access Token
              </label>
              <input
                id="token"
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>
            
            <button
              onClick={authenticateWithGitHub}
              disabled={isLoading || !githubToken.trim()}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Github className="h-4 w-4 mr-2" />
              )}
              Authenticate with GitHub
            </button>
          </div>
          
          {message && (
            <div className={`mt-4 p-3 rounded-md flex items-center ${
              messageType === 'error' 
                ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' 
                : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
            }`}>
              {messageType === 'error' ? (
                <AlertCircle className="h-4 w-4 mr-2" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Github className="h-6 w-6 mr-2" />
            <h2 className="text-2xl font-bold">Edit Post via GitHub</h2>
          </div>
          <button
            onClick={logout}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Logout
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="welcome, introduction, blog"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content (Markdown) *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 font-mono text-sm"
              placeholder="Write your blog post content in Markdown..."
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={saveToGitHub}
              disabled={isSaving || !formData.title || !formData.excerpt || !formData.content}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isSaving ? 'Saving to GitHub...' : 'Save to GitHub'}
            </button>
            
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Changes will trigger automatic deployment
            </span>
            
            <div className="ml-auto">
              <DeploymentStatus />
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded-md flex items-center ${
              messageType === 'error' 
                ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' 
                : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
            }`}>
              {messageType === 'error' ? (
                <AlertCircle className="h-4 w-4 mr-2" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}