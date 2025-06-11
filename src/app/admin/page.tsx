'use client';

import { useState, useEffect } from 'react';
import { checkAuth, authenticate, logout } from '@/lib/auth';
import { Lock, LogOut, Plus, Edit, Trash2, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  published: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(checkAuth());
    if (checkAuth()) {
      loadPosts();
    } else {
      setLoading(false);
    }
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts');
      if (response.ok) {
        const allPosts = await response.json();
        setPosts(allPosts);
      } else {
        console.error('Failed to load posts');
        setPosts([]);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticate(password)) {
      setIsAuthenticated(true);
      setError('');
      loadPosts();
    } else {
      setError('Invalid password');
    }
    setPassword('');
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setPosts([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold">Admin Access</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Enter your password to access the blog editor
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Demo Password:</strong> FagnnerSousa2025!
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Change this in src/lib/auth.ts for production use
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Admin</h1>
        <div className="flex space-x-4">
          <Link
            href="/admin/github"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
          >
            <Github className="h-4 w-4 mr-2" />
            GitHub Editor
          </Link>
          <Link
            href="/admin/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">Your Blog Posts</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map((post) => (
              <div key={post.slug} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString()} • 
                    {post.published ? ' Published' : ' Draft'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                    title="View Post"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/edit/${post.slug}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                    title="Edit Post"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button 
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                    title="Delete Post"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            No blog posts yet. Create your first post to get started!
          </p>
          <Link
            href="/admin/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Post
          </Link>
        </div>
      )}
    </div>
  );
}
