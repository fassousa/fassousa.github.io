'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit2, ExternalLink } from 'lucide-react';
import { checkAuth } from '@/lib/auth';

interface EditPostButtonProps {
  slug: string;
  mode?: 'inline' | 'external';
}

export default function EditPostButton({ slug, mode = 'external' }: EditPostButtonProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const editUrl = `/admin/edit/${slug}`;

  if (mode === 'inline') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href={editUrl}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-lg transition-colors duration-200"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit Post
        </Link>
      </div>
    );
  }

  return (
    <Link
      href={editUrl}
      className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 hover:border-blue-700 dark:hover:border-blue-300 rounded-md transition-colors duration-200"
    >
      <Edit2 className="h-4 w-4 mr-1" />
      Edit
      <ExternalLink className="h-3 w-3 ml-1" />
    </Link>
  );
}
