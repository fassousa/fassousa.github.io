'use client';

import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

interface GitHubEditButtonProps {
  slug: string;
  mode?: 'inline' | 'external';
}

export default function GitHubEditButton({ slug, mode = 'external' }: GitHubEditButtonProps) {
  const editUrl = `/admin/github/${slug}`;

  if (mode === 'inline') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href={editUrl}
          className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg transition-colors duration-200"
        >
          <Github className="h-4 w-4 mr-2" />
          Edit via GitHub
        </Link>
      </div>
    );
  }

  return (
    <Link
      href={editUrl}
      className="inline-flex items-center px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-400 dark:border-gray-600 hover:border-gray-600 dark:hover:border-gray-400 rounded-md transition-colors duration-200"
    >
      <Github className="h-4 w-4 mr-1" />
      Edit
      <ExternalLink className="h-3 w-3 ml-1" />
    </Link>
  );
}
