import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { format } from 'date-fns';
import { Calendar, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import { translations } from '@/lib/i18n/translations';

export const metadata: Metadata = {
  title: `${translations.pt.blog.title} - ${translations.pt.meta.defaultTitle}`,
  description: 'Saiba mais sobre Fagnner Sousa, sua trajetória e o que ele faz.',
  alternates: {
    languages: {
      'en': '/blog',
      'pt': '/pt/blog',
    },
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts('pt');
  const t = translations.pt;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{t.blog.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {t.blog.subtitle}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-purple-500/10 transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-3">
                <Link
                  href={`/pt/blog/${post.slug}`}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'dd/MM/yyyy')}
                  </time>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    <div className="flex space-x-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs border border-gray-200 dark:border-gray-600"
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
                href={`/pt/blog/${post.slug}`}
                className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              >
                Ler mais →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Ainda não há posts no blog. Volte em breve para novo conteúdo!
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-md hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
          >
            Escrever Primeiro Post
          </Link>
        </div>
      )}
    </div>
  );
}
