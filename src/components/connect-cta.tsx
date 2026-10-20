import { ArrowUpRight, Briefcase, Mail } from 'lucide-react';
import type { Language } from '@/lib/i18n/config';
import { getSiteContent, mailtoLink, socialLinks } from '@/lib/i18n/content';

export function ConnectCta({ language }: { language: Language }) {
  const content = getSiteContent(language);

  return (
    <section className="container-page pt-4 sm:pt-8">
      <div className="relative overflow-hidden rounded-3xl border border-line/10 bg-surface/80 px-6 py-10 text-center sm:px-12 sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-radial"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-44 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-accent/[0.1] blur-[140px]"
        />

        <div className="relative">
          <div className="flex justify-center">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {content.connect.eyebrow}
            </span>
          </div>

          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {content.connect.title}{' '}
            <span className="text-gradient">{content.connect.titleAccent}</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-muted">
            {content.connect.description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={socialLinks.upwork}
              target="_blank"
              rel="me noopener noreferrer"
              className="btn-primary group w-full sm:w-auto"
            >
              <Briefcase className="h-4 w-4" />
              {content.connect.primary}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={mailtoLink} className="btn-secondary w-full sm:w-auto">
              <Mail className="h-4 w-4" />
              {content.connect.secondary}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
