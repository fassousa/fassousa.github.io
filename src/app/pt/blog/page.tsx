import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { translations } from '@/lib/i18n/translations';

export default async function BlogPage() {
  const posts = await getAllPosts('pt');
  const t = translations.pt;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{t.blog.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {t.blog.subtitle}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {t.blog.noPosts}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <Link href={`/pt/blog/${post.slug}`} className="group block">
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date}>
                    {t.blog.publishedOn} {new Date(post.date).toLocaleDateString('pt-BR')}
                  </time>
                  {post.updatedDate && post.updatedDate !== post.date && (
                    <time dateTime={post.updatedDate}>
                      {t.blog.updatedOn} {new Date(post.updatedDate).toLocaleDateString('pt-BR')}
                    </time>
                  )}
                  {post.tags && post.tags.length > 0 && (                      <div className="flex items-center gap-2">
                        <span>{t.blog.tags}:</span>
                        <div className="flex gap-1">
                          {post.tags.map((tag, index) => (
                            <span key={tag} className="text-blue-600 dark:text-blue-400">
                              {tag}{index < (post.tags?.length || 0) - 1 ? ',' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
