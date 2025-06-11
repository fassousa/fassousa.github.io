import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { Github, Calendar, Tag, Edit } from 'lucide-react';
import { format } from 'date-fns';

export default async function GitHubAdminPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-8">
            <Github className="h-8 w-8 mr-3" />
            <div>
              <h1 className="text-3xl font-bold">GitHub Blog Admin</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Edit your blog posts directly via GitHub API - works on production!
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Github className="h-5 w-5 text-blue-400 mt-0.5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Production-Ready Editing
                  </h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    <p>
                      This GitHub integration allows you to edit posts directly on your live website.
                      Changes are committed to your repository and automatically deployed via GitHub Pages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Your Blog Posts</h2>
            
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No blog posts found.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <time dateTime={post.date}>
                              {format(new Date(post.date), 'MMM d, yyyy')}
                            </time>
                          </div>
                          
                          {post.updatedDate && post.updatedDate !== post.date && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                Updated {format(new Date(post.updatedDate), 'MMM d, yyyy')}
                              </span>
                            </div>
                          )}
                          
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 mr-1" />
                              <span>{post.tags.length} tags</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Link
                          href={`/admin/github/${post.slug}`}
                          className="inline-flex items-center px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-md transition-colors duration-200"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit with GitHub
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Tip:</strong> You can also access GitHub editing from any blog post page using the GitHub edit buttons.
                </p>
              </div>
              
              <Link
                href="/admin"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Back to Regular Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
