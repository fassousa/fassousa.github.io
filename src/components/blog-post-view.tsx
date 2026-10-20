import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Calendar, Github, Linkedin } from 'lucide-react';
import { format } from 'date-fns';
import type { BlogPost } from '@/types/blog';
import type { Language } from '@/lib/i18n/config';
import { getLinkedInUrl, getSiteContent, socialLinks } from '@/lib/i18n/content';
import { translations } from '@/lib/i18n/translations';
import UnifiedEditButton from './unified-edit-button';

export function BlogPostView({
  language,
  post,
  slug,
}: {
  language: Language;
  post: BlogPost;
  slug: string;
}) {
  const t = translations[language];
  const content = getSiteContent(language);
  const basePath = language === 'pt' ? '/pt/blog' : '/blog';
  const dateFormat = language === 'pt' ? 'dd/MM/yyyy' : 'MMMM d, yyyy';
  const updatedLabel = language === 'pt' ? 'Atualizado em' : 'Updated';
  const contentHtml = post.content.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/, '').trimStart();

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-grid opacity-40 mask-fade-b"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[24rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/[0.06] to-transparent blur-[100px]"
      />

      <div className="container-page relative pb-8 pt-10 sm:pt-14">
        <Link
          href={basePath}
          className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors duration-300 hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          {t.blog.backToBlog}
        </Link>

        <article className="mx-auto mt-8 max-w-3xl">
          <header className="animate-rise">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line/10 bg-surface/60 px-2.5 py-1 text-[11px] font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-start justify-between gap-4">
              <h1 className="text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-ink sm:text-5xl">
                {post.title}
              </h1>
              <UnifiedEditButton slug={slug} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-line/10 py-4 text-xs text-faint">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.date}>{format(new Date(post.date), dateFormat)}</time>
              </span>
              {post.updatedDate && post.updatedDate !== post.date && (
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true">·</span>
                  {updatedLabel} {format(new Date(post.updatedDate), dateFormat)}
                </span>
              )}
            </div>
          </header>

          <div
            className="prose prose-neutral dark:prose-invert prose-site mt-10 max-w-[68ch]"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="flex flex-col gap-4 rounded-2xl border border-line/10 bg-surface/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/profile-pixel.webp"
                alt=""
                width={80}
                height={80}
                className="h-11 w-11 rounded-full object-cover ring-1 ring-line/15"
              />
              <div>
                <p className="text-sm font-semibold tracking-tight text-ink">Fagnner Sousa</p>
                <p className="text-xs text-muted">{content.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="me noopener noreferrer"
                className="icon-btn"
                aria-label="GitHub"
              >
                <Github className="h-[17px] w-[17px]" />
              </a>
              <a
                href={getLinkedInUrl(language)}
                target="_blank"
                rel="me noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-[17px] w-[17px]" />
              </a>
              <a
                href={socialLinks.upwork}
                target="_blank"
                rel="me noopener noreferrer"
                className="icon-btn"
                aria-label="Upwork"
              >
                <Briefcase className="h-[17px] w-[17px]" />
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-line/10 pt-8">
            <Link
              href={basePath}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              {t.blog.backToBlog}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
