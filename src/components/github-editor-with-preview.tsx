'use client';

import { useState, useEffect } from 'react';
import { Save, Github, Loader2, AlertCircle, CheckCircle, Eye, Code, SplitSquareHorizontal } from 'lucide-react';
import { marked } from 'marked';
import DeploymentStatus from './deployment-status';
import { GITHUB_CONFIG, GITHUB_ENDPOINTS, createGitHubHeaders } from '@/lib/github';
import { usePathname } from 'next/navigation';
import { getLanguageFromPath } from '@/lib/i18n/config';

// UTF-8 safe base64 encoding/decoding functions
const utf8ToBase64 = (str: string): string => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
};

const base64ToUtf8 = (str: string): string => {
  return decodeURIComponent(Array.prototype.map.call(atob(str), (c: string) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
};

interface GitHubEditorWithPreviewProps {
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

type ViewMode = 'editor' | 'preview' | 'split';

export default function GitHubEditorWithPreview({ slug, initialContent }: GitHubEditorWithPreviewProps) {
  const pathname = usePathname();
  const language = getLanguageFromPath(pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [viewMode, setViewMode] = useState<ViewMode>('editor');
  
  const [formData, setFormData] = useState({
    title: initialContent?.title || '',
    excerpt: initialContent?.excerpt || '',
    content: initialContent?.content || '',
    tags: initialContent?.tags?.join(', ') || '',
  });

  // GitHub repository information - use detected language
  const FILE_PATH = `content/blog/${language}/${slug}.md`;

  useEffect(() => {
    // Check if GitHub token exists in localStorage
    const token = localStorage.getItem(GITHUB_CONFIG.TOKEN_KEY);
    if (token) {
      setGithubToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  // Configure marked for better rendering
  useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
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
        const userData = await response.json();
        localStorage.setItem(GITHUB_CONFIG.TOKEN_KEY, githubToken);
        setIsAuthenticated(true);
        setMessage(`Successfully authenticated with GitHub as ${userData.login}!`);
        setMessageType('success');
        
        // Load existing file content
        await loadFileContent();
      } else {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        console.error('GitHub Auth Error:', errorData);
        setMessage(`Invalid GitHub token: ${errorData.message || response.statusText} (Status: ${response.status})`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Auth error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setMessage(`Error connecting to GitHub: ${errorMessage}`);
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
        const content = base64ToUtf8(fileData.content.replace(/\s/g, ''));
        
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
      let existingDate = new Date().toISOString().split('T')[0]; // Default to today
      
      if (getResponse.ok) {
        const fileData = await getResponse.json();
        sha = fileData.sha;
        
        // Extract existing date from the file content
        try {
          const content = base64ToUtf8(fileData.content.replace(/\s/g, ''));
          const dateMatch = content.match(/date:\s*"([^"]+)"/);
          if (dateMatch) {
            existingDate = dateMatch[1]; // Preserve original date
          } else {
            // If no date found, keep the default (today)
            console.log('No existing date found, using current date');
          }
        } catch (error) {
          console.warn('Could not extract existing date:', error);
        }
      } else if (getResponse.status !== 404) {
        // If it's not a 404 (file not found), there's an actual error
        const errorData = await getResponse.json().catch(() => ({ message: getResponse.statusText }));
        console.error('GitHub API Error (GET):', errorData);
        throw new Error(`Failed to fetch file: ${errorData.message || getResponse.statusText} (Status: ${getResponse.status})`);
      }

      // Create markdown content with frontmatter
      const currentDate = new Date().toISOString().split('T')[0];
      
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
            content: utf8ToBase64(markdownContent),
            sha: sha || undefined,
          }),
        }
      );

      if (commitResponse.ok) {
        setMessage('Post successfully saved to GitHub! Changes will be deployed shortly.');
        setMessageType('success');
      } else {
        const errorData = await commitResponse.json().catch(() => ({ message: commitResponse.statusText }));
        console.error('GitHub API Error (PUT):', errorData);
        
        // Provide more specific error messages
        let errorMessage = errorData.message || commitResponse.statusText;
        if (commitResponse.status === 401) {
          errorMessage = 'Authentication failed. Please check your GitHub token permissions.';
        } else if (commitResponse.status === 403) {
          errorMessage = 'Access denied. Make sure your token has write access to this repository.';
        } else if (commitResponse.status === 422) {
          errorMessage = 'Invalid request. The file might have been modified by someone else.';
        }
        
        setMessage(`Error saving to GitHub: ${errorMessage} (Status: ${commitResponse.status})`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Save error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setMessage(`Error saving to GitHub: ${errorMessage}. Please try again.`);
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

  const renderPreview = () => {
    if (!formData.content.trim()) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
          Start typing in the editor to see the preview
        </div>
      );
    }

    try {
      const html = marked(formData.content);
      return (
        <div className="h-full overflow-auto">
          <div className="p-4">
            {/* Preview header with post metadata */}
            <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-3xl font-bold mb-2">{formData.title || 'Untitled Post'}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{formData.excerpt}</p>
              {formData.tags && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* Rendered markdown content */}
            <div
              className="prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      );
    } catch (error) {
      return (
        <div className="flex items-center justify-center h-full text-red-500">
          Error rendering preview: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      );
    }
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Github className="h-6 w-6 mr-2" />
            <h2 className="text-2xl font-bold">Edit Post via GitHub</h2>
          </div>
          <div className="flex items-center gap-4">
            {/* View mode toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('editor')}
                className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${
                  viewMode === 'editor'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Code className="h-4 w-4 mr-1" />
                Editor
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${
                  viewMode === 'split'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <SplitSquareHorizontal className="h-4 w-4 mr-1" />
                Split
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </button>
            </div>
            <button
              onClick={logout}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Form fields */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="mt-4">
            <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              required
            />
          </div>
        </div>

        {/* Editor/Preview area */}
        <div className="relative h-96 lg:h-[600px]">
          {viewMode === 'editor' && (
            <div className="h-full p-6">
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content (Markdown) *
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full h-[calc(100%-3rem)] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 font-mono text-sm resize-none"
                placeholder="Write your blog post content in Markdown..."
                required
              />
            </div>
          )}

          {viewMode === 'preview' && (
            <div className="h-full border border-gray-300 dark:border-gray-600 rounded-md m-6 mt-0 bg-white dark:bg-gray-900">
              {renderPreview()}
            </div>
          )}

          {viewMode === 'split' && (
            <div className="h-full flex gap-4 p-6">
              <div className="flex-1">
                <label htmlFor="content-split" className="block text-sm font-medium mb-2">
                  Content (Markdown) *
                </label>
                <textarea
                  id="content-split"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full h-[calc(100%-3rem)] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 font-mono text-sm resize-none"
                  placeholder="Write your blog post content in Markdown..."
                  required
                />
              </div>
              <div className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900">
                {renderPreview()}
              </div>
            </div>
          )}
        </div>

        {/* Footer with actions */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
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
    </div>
  );
}
