'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth, getAuthToken } from '@/lib/auth';
import { Save, ArrowLeft, Eye } from 'lucide-react';
import Link from 'next/link';

interface BlogEditorProps {
  initialData?: {
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    published: boolean;
  };
  mode: 'new' | 'edit';
  slug?: string; // Add slug for edit mode
}

export default function BlogEditor({ initialData, mode, slug }: BlogEditorProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    tags: initialData?.tags?.join(', ') || '',
    published: initialData?.published || false,
  });
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authStatus = checkAuth();
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Not authenticated');
      }

      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        published: formData.published,
      };

      const url = mode === 'edit' && slug 
        ? `/api/posts/${slug}` 
        : '/api/posts';
      
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save post');
      }

      const result = await response.json();
      
      // Redirect to the blog post or admin page
      if (mode === 'new') {
        router.push(`/blog/${result.slug}`);
      } else {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setError(error instanceof Error ? error.message : 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Admin
          </Link>
          <h1 className="text-3xl font-bold">
            {mode === 'new' ? 'New Post' : 'Edit Post'}
          </h1>
        </div>
        <button
          onClick={() => setPreview(!preview)}
          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          <Eye className="h-4 w-4 mr-2" />
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
          {error}
        </div>
      )}

      {preview ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          <h1 className="text-4xl font-bold mb-4">{formData.title || 'Untitled'}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{formData.excerpt}</p>
          {formData.tags && (
            <div className="flex space-x-2 mb-6">
              {formData.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap">{formData.content}</pre>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="tech, web development, next.js"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
              placeholder="Write your blog post content here using Markdown..."
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm">
              Publish immediately
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
