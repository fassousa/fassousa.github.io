import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { format } from 'date-fns';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import UnifiedEditButton from '@/components/unified-edit-button';
import { translations } from '@/lib/i18n/translations';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts('en');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'en');
  const t = translations.en;
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | ${t.meta.defaultTitle}`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedDate,
      tags: post.tags,
    },
    alternates: {
      languages: {
        'en': `/blog/${slug}`,
        'pt': `/pt/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'en');

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Blog
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-start justify-between">
            <h1 className="text-4xl font-bold mb-4 flex-1">{post.title}</h1>
            <div className="flex items-center">
              <UnifiedEditButton slug={slug} />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
            </div>
            {post.updatedDate && post.updatedDate !== post.date && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Updated {format(new Date(post.updatedDate), 'MMMM d, yyyy')}
                </span>
              </div>
            )}
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
        </header>

        <div
          className="prose prose-gray dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Post metadata footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400 italic">
            <p>This post was written on {format(new Date(post.date), 'MMMM d, yyyy')}</p>
            {post.updatedDate && post.updatedDate !== post.date && (
              <p>Last updated on {format(new Date(post.updatedDate), 'MMMM d, yyyy')}</p>
            )}
          </div>
        </div>
      </article>

      {/* Floating Edit Button for Mobile/Better UX */}
      <UnifiedEditButton slug={slug} mode="inline" />

      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to all posts
        </Link>
      </footer>
    </div>
  );
}
