import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { format } from 'date-fns';
import { Calendar, Tag } from 'lucide-react';

export const metadata = {
  title: 'Blog - Your Personal Website',
  description: 'Read my latest thoughts and articles about development, technology, and more.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          My thoughts, insights, and experiences in development and technology.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </time>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    <div className="flex space-x-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            No blog posts yet. Check back soon for new content!
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Write First Post
          </Link>
        </div>
      )}
    </div>
  );
}
