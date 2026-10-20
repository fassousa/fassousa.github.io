import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Database,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { format } from 'date-fns';
import { getAllPosts } from '@/lib/blog';
import type { BlogPost } from '@/types/blog';
import type { HighlightIcon } from '@/lib/i18n/content';
import type { Language } from '@/lib/i18n/config';
import { getLinkedInUrl, getSiteContent, socialLinks } from '@/lib/i18n/content';
import { ConnectCta } from './connect-cta';

const highlightIcons: Record<HighlightIcon, typeof Wrench> = {
  rescue: Wrench,
  database: Database,
  ai: Sparkles,
};

function formatPostDate(date: string, language: Language) {
  return format(new Date(date), language === 'pt' ? 'dd/MM/yyyy' : 'MMM d, yyyy');
}

function getPostHref(language: Language, slug: string) {
  return language === 'pt' ? `/pt/blog/${slug}` : `/blog/${slug}`;
}

function PostCard({
  post,
  language,
  featured,
  readMore,
}: {
  post: BlogPost;
  language: Language;
  featured: boolean;
  readMore: string;
}) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line/10 bg-surface/60 p-6 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-accent/25 hover:bg-surface hover:shadow-card ${
        featured ? 'md:col-span-2 md:p-8' : ''
      }`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent transition-opacity duration-500 ${
          featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
        <time dateTime={post.date}>{formatPostDate(post.date, language)}</time>
        {post.tags?.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line/10 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className={
          featured
            ? 'mt-5 grid gap-5 md:grid-cols-[1fr_auto] md:items-end'
            : 'mt-5 flex flex-1 flex-col'
        }
      >
        <div>
          <h3
            className={`text-balance font-semibold tracking-tight text-ink ${
              featured ? 'text-2xl sm:text-[1.75rem]' : 'text-lg'
            }`}
          >
            <Link
              href={getPostHref(language, post.slug)}
              className="before:absolute before:inset-0 focus-visible:outline-none"
            >
              {post.title}
            </Link>
          </h3>
          <p
            className={`mt-2 text-pretty leading-relaxed text-muted ${
              featured ? 'max-w-2xl text-[15px]' : 'text-sm'
            }`}
          >
            {post.excerpt}
          </p>
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent md:mt-0">
          {readMore}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

export async function HomeView({ language }: { language: Language }) {
  const content = getSiteContent(language);
  const posts = await getAllPosts(language);
  const recentPosts = posts.slice(0, 3);
  const blogHref = language === 'pt' ? '/pt/blog' : '/blog';

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-grid opacity-50 mask-fade-b"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 left-1/2 h-[34rem] w-[56rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/10 to-transparent blur-[110px]"
        />

        <div className="container-page relative pb-8 pt-10 sm:pb-10 sm:pt-16 lg:pb-10 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="animate-rise">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.07] px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                {content.availability}
              </div>

              <h1 className="mt-6 text-balance text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.03] tracking-[-0.04em]">
                <span className="block text-ink/85">{content.hero.greeting}</span>
                <span className="text-gradient block">{content.hero.name}</span>
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-[16.5px] leading-relaxed text-muted sm:text-[17.5px]">
                {content.hero.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={content.hero.primaryCta.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="btn-primary group"
                >
                  {content.hero.primaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <Link href={content.hero.secondaryCta.href} className="btn-secondary">
                  {content.hero.secondaryCta.label}
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
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
                <span className="hidden h-4 w-px bg-line/15 sm:block" />
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                  <MapPin className="h-3.5 w-3.5 text-faint" />
                  {content.location}
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[280px] animate-rise animation-delay-2 sm:max-w-[320px] lg:max-w-[380px]">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/10 to-amber-400/20 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-line/10 bg-surface p-2 shadow-lift">
                <div className="relative aspect-square overflow-hidden rounded-[1.6rem]">
                  <Image
                    src="/profile-pixel.webp"
                    alt="Portrait of Fagnner Sousa"
                    width={720}
                    height={720}
                    priority
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/70 px-3.5 py-3 backdrop-blur-md">
                    <div>
                      <p className="text-[13.5px] font-semibold text-white">Fagnner Sousa</p>
                      <p className="text-[11px] text-white/65">{content.hero.cardRole}</p>
                    </div>
                    <span className="hidden items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-1 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-emerald-300 ring-1 ring-emerald-400/25 sm:inline-flex">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      {content.hero.statusShort}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -left-5 top-10 hidden animate-float rounded-2xl border border-line/10 bg-canvas/90 px-3.5 py-2.5 shadow-card backdrop-blur sm:block">
                <p className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-faint">
                  {content.hero.experienceBadge.label}
                </p>
                <p className="mt-0.5 text-sm font-semibold tracking-tight text-ink">
                  {content.hero.experienceBadge.value}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="container-page pb-12 pt-8 sm:pb-20 sm:pt-12">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {content.highlights.eyebrow}
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {content.highlights.title}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {content.highlights.description}
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {content.highlights.items.map((item) => {
            const Icon = highlightIcons[item.icon];
            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-line/10 bg-surface/60 p-6 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-accent/25 hover:bg-surface hover:shadow-card"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line/10 bg-gradient-to-br from-accent/15 to-fuchsia-500/[0.06] text-accent">
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  <h3 className="mt-5 text-[15.5px] font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-line/10 bg-canvas/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-faint"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-page pb-12 sm:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line/10 pt-10">
          <div>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {content.writing.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {content.writing.title}
            </h2>
          </div>

          <Link
            href={blogHref}
            className="group inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-surface/60 px-4 py-2 text-xs font-medium text-muted transition-colors duration-300 hover:border-line/25 hover:text-ink"
          >
            {content.writing.all}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {recentPosts.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                language={language}
                featured={index === 0}
                readMore={content.writing.readMore}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-line/15 bg-surface/40 px-6 py-12 text-center">
            <p className="text-sm text-muted">{content.writing.empty}</p>
          </div>
        )}
      </section>

      <ConnectCta language={language} />
    </>
  );
}
