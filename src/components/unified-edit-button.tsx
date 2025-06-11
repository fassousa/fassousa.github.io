'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit2, Github, ExternalLink, ChevronDown } from 'lucide-react';
import { checkAuth } from '@/lib/auth';
import { GITHUB_CONFIG } from '@/lib/github';

interface UnifiedEditButtonProps {
  slug: string;
  mode?: 'inline' | 'external';
}

export default function UnifiedEditButton({ slug, mode = 'external' }: UnifiedEditButtonProps) {
  const [isDevAuthenticated, setIsDevAuthenticated] = useState(false);
  const [hasGitHubToken, setHasGitHubToken] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setIsDevAuthenticated(checkAuth());
    const token = localStorage.getItem(GITHUB_CONFIG.TOKEN_KEY);
    setHasGitHubToken(!!token);
  }, []);

  // If neither editing option is available, don't show the button
  if (!isDevAuthenticated && !hasGitHubToken) {
    return null;
  }

  const devEditUrl = `/admin/edit/${slug}`;
  const githubEditUrl = `/admin/github/${slug}`;

  // If only one option is available, show a simple button
  if (isDevAuthenticated && !hasGitHubToken) {
    return mode === 'inline' ? (
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href={devEditUrl}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-lg transition-colors duration-200"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit Post
        </Link>
      </div>
    ) : (
      <Link
        href={devEditUrl}
        className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 hover:border-blue-700 dark:hover:border-blue-300 rounded-md transition-colors duration-200"
      >
        <Edit2 className="h-4 w-4 mr-1" />
        Edit
        <ExternalLink className="h-3 w-3 ml-1" />
      </Link>
    );
  }

  if (!isDevAuthenticated && hasGitHubToken) {
    return mode === 'inline' ? (
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href={githubEditUrl}
          className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg transition-colors duration-200"
        >
          <Github className="h-4 w-4 mr-2" />
          Edit via GitHub
        </Link>
      </div>
    ) : (
      <Link
        href={githubEditUrl}
        className="inline-flex items-center px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-400 dark:border-gray-600 hover:border-gray-600 dark:hover:border-gray-400 rounded-md transition-colors duration-200"
      >
        <Github className="h-4 w-4 mr-1" />
        Edit
        <ExternalLink className="h-3 w-3 ml-1" />
      </Link>
    );
  }

  // Both options are available - show dropdown
  if (mode === 'inline') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-lg transition-colors duration-200"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Post
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
          
          {showDropdown && (
            <div className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg min-w-[180px]">
              <Link
                href={devEditUrl}
                className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg"
                onClick={() => setShowDropdown(false)}
              >
                <Edit2 className="h-4 w-4 mr-3" />
                Development Editor
              </Link>
              <Link
                href={githubEditUrl}
                className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 last:rounded-b-lg border-t border-gray-200 dark:border-gray-700"
                onClick={() => setShowDropdown(false)}
              >
                <Github className="h-4 w-4 mr-3" />
                GitHub Editor
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 hover:border-blue-700 dark:hover:border-blue-300 rounded-md transition-colors duration-200"
      >
        <Edit2 className="h-4 w-4 mr-1" />
        Edit
        <ChevronDown className="h-4 w-4 ml-1" />
      </button>
      
      {showDropdown && (
        <div className="absolute top-full mt-1 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg min-w-[180px] z-10">
          <Link
            href={devEditUrl}
            className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg"
            onClick={() => setShowDropdown(false)}
          >
            <Edit2 className="h-4 w-4 mr-3" />
            Development Editor
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Link>
          <Link
            href={githubEditUrl}
            className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 last:rounded-b-lg border-t border-gray-200 dark:border-gray-700"
            onClick={() => setShowDropdown(false)}
          >
            <Github className="h-4 w-4 mr-3" />
            GitHub Editor
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Link>
        </div>
      )}
    </div>
  );
}
