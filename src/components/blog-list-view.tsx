import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { getAllPosts } from '@/lib/blog';
import type { Language } from '@/lib/i18n/config';
import { getSiteContent } from '@/lib/i18n/content';
import { translations } from '@/lib/i18n/translations';

export async function BlogListView({ language }: { language: Language }) {
  const posts = await getAllPosts(language);
  const t = translations[language];
  const content = getSiteContent(language);
  const basePath = language === 'pt' ? '/pt/blog' : '/blog';
  const dateFormat = language === 'pt' ? 'dd/MM/yyyy' : 'MMMM d, yyyy';

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-grid opacity-50 mask-fade-b"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/[0.08] to-transparent blur-[100px]"
      />

      <div className="container-page relative pb-8 pt-12 sm:pt-16">
        <header className="max-w-2xl animate-rise">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {content.writing.eyebrow}
          </span>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            {t.blog.title}
          </h1>
          <p className="mt-4 text-pretty text-[17px] leading-relaxed text-muted sm:text-lg">
            {t.blog.subtitle}
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="mt-10 space-y-4 sm:mt-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative grid gap-4 rounded-2xl border border-line/10 bg-surface/60 p-6 transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:border-accent/25 hover:bg-surface hover:shadow-card sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                    <time dateTime={post.date}>{format(new Date(post.date), dateFormat)}</time>
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line/10 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-3 text-balance text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    <Link
                      href={`${basePath}/${post.slug}`}
                      className="before:absolute before:inset-0 focus-visible:outline-none"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                  {t.blog.readMore}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-line/15 bg-surface/40 px-6 py-16 text-center">
            <p className="text-sm text-muted">{t.blog.noPosts}</p>
          </div>
        )}
      </div>
    </div>
  );
}
