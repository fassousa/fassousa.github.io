import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import UnifiedEditButton from '@/components/unified-edit-button';
import { translations } from '@/lib/i18n/translations';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts('pt');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'pt');
  const t = translations.pt;

  if (!post) {
    return {
      title: 'Post não encontrado',
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
  const post = await getPostBySlug(slug, 'pt');
  const t = translations.pt;

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Navigation */}
      <nav className="mb-8">
        <Link 
          href="/pt/blog" 
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← {t.blog.backToBlog}
        </Link>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-4xl font-bold leading-tight flex-1">
            {post.title}
          </h1>
          <UnifiedEditButton slug={post.slug} mode="external" />
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <time dateTime={post.date}>
            {t.blog.publishedOn} {new Date(post.date).toLocaleDateString('pt-BR')}
          </time>
          {post.updatedDate && post.updatedDate !== post.date && (
            <time dateTime={post.updatedDate}>
              {t.blog.updatedOn} {new Date(post.updatedDate).toLocaleDateString('pt-BR')}
            </time>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-500 dark:text-gray-400">{t.blog.tags}:</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Article content */}
      <article 
        className="prose prose-gray dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Edit button for mobile */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <UnifiedEditButton slug={post.slug} mode="inline" />
      </div>
    </div>
  );
}
