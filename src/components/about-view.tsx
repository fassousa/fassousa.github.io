import Image from 'next/image';
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Clock3,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Workflow,
  Wrench,
} from 'lucide-react';
import type { Language } from '@/lib/i18n/config';
import type { ServiceIcon, SkillTone } from '@/lib/i18n/content';
import { getLinkedInUrl, getSiteContent, mailtoLink, socialLinks } from '@/lib/i18n/content';
import { ConnectCta } from './connect-cta';

const serviceIcons: Record<ServiceIcon, typeof Wrench> = {
  wrench: Wrench,
  database: Database,
  workflow: Workflow,
  sparkles: Sparkles,
};

const skillTones: Record<SkillTone, { dot: string; chip: string }> = {
  indigo: {
    dot: 'bg-indigo-500',
    chip: 'border-indigo-500/20 bg-indigo-500/5 text-indigo-700 dark:text-indigo-300',
  },
  emerald: {
    dot: 'bg-emerald-500',
    chip: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300',
  },
  violet: {
    dot: 'bg-violet-500',
    chip: 'border-violet-500/20 bg-violet-500/5 text-violet-700 dark:text-violet-300',
  },
  amber: {
    dot: 'bg-amber-500',
    chip: 'border-amber-500/20 bg-amber-500/5 text-amber-700 dark:text-amber-300',
  },
  orange: {
    dot: 'bg-orange-500',
    chip: 'border-orange-500/20 bg-orange-500/5 text-orange-700 dark:text-orange-300',
  },
  sky: {
    dot: 'bg-sky-500',
    chip: 'border-sky-500/20 bg-sky-500/5 text-sky-700 dark:text-sky-300',
  },
  rose: {
    dot: 'bg-rose-500',
    chip: 'border-rose-500/20 bg-rose-500/5 text-rose-700 dark:text-rose-300',
  },
  teal: {
    dot: 'bg-teal-500',
    chip: 'border-teal-500/20 bg-teal-500/5 text-teal-700 dark:text-teal-300',
  },
};

function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10.5px] tracking-[0.2em] text-faint">{number}</span>
        <span className="h-px w-7 bg-line/15" />
        <h2 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">{title}</h2>
      </div>
      {subtitle && <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}

function ConnectRow({
  href,
  label,
  icon: Icon,
  external = true,
}: {
  href: string;
  label: string;
  icon: typeof Github;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'me noopener noreferrer' } : {})}
      className="group flex items-center justify-between rounded-xl border border-line/10 bg-canvas/50 px-3 py-2.5 transition-colors duration-300 hover:border-accent/30 hover:bg-surface"
    >
      <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
        <Icon className="h-4 w-4 text-muted" />
        {label}
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 text-faint transition-colors duration-300 group-hover:text-accent" />
    </a>
  );
}

export function AboutView({ language }: { language: Language }) {
  const content = getSiteContent(language);
  const about = content.about;

  return (
    <>
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-grid opacity-50 mask-fade-b"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/[0.08] to-transparent blur-[100px]"
        />

        <div className="container-page relative pb-8 pt-12 sm:pt-16">
          <header className="max-w-3xl animate-rise">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {about.eyebrow}
            </span>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.04em] sm:text-5xl">
              {about.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-muted sm:text-lg">
              {about.lead}
            </p>
          </header>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_288px] lg:gap-14">
            <div className="min-w-0 space-y-10">
              <section>
                <SectionHeading number="01" title={about.sections.journey.title} />
                <p className="mt-4 max-w-[70ch] text-pretty text-[15px] leading-7 text-muted">
                  {about.sections.journey.body}
                </p>
              </section>

              <section>
                <SectionHeading
                  number="02"
                  title={about.sections.services.title}
                  subtitle={about.sections.services.subtitle}
                />
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {about.sections.services.items.map((item) => {
                    const Icon = serviceIcons[item.icon];
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-line/10 bg-surface/50 p-4 transition-colors duration-300 hover:border-line/20 hover:bg-surface/80"
                      >
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line/10 bg-gradient-to-br from-accent/15 to-fuchsia-500/[0.06] text-accent">
                          <Icon className="h-4 w-4" />
                        </div>
                        <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section>
                <SectionHeading
                  number="03"
                  title={about.sections.principles.title}
                  subtitle={about.sections.principles.subtitle}
                />
                <div className="mt-5 rounded-2xl border border-line/10 bg-surface/50 p-5">
                  <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    {about.sections.principles.items.map((item) => (
                      <li key={item.title} className="flex gap-2.5">
                        <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        <div>
                          <h3 className="text-[13px] font-semibold tracking-tight text-ink">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-muted">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section>
                <SectionHeading
                  number="04"
                  title={about.sections.skills.title}
                  subtitle={about.sections.skills.subtitle}
                />
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {about.sections.skills.groups.map((group) => {
                    const tone = skillTones[group.tone];
                    return (
                      <div
                        key={group.name}
                        className="rounded-2xl border border-line/10 bg-surface/50 p-4 transition-colors duration-300 hover:border-line/20 hover:bg-surface/80"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                          <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                            {group.name}
                          </h3>
                        </div>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className={`rounded-lg border px-2.5 py-1 text-[12.5px] font-medium ${tone.chip}`}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </section>

            </div>

            <aside aria-label={about.eyebrow}>
              <div className="grid gap-4 sm:grid-cols-2 lg:block lg:space-y-4">
                <div className="relative overflow-hidden rounded-2xl border border-line/10 bg-surface/70 p-5 backdrop-blur-sm">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-accent/10 to-transparent"
                  />
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 opacity-70 blur-[3px]"
                      />
                      <Image
                        src="/profile-pixel.webp"
                        alt="Portrait of Fagnner Sousa"
                        width={192}
                        height={192}
                        className="relative h-24 w-24 rounded-full object-cover ring-4 ring-surface"
                      />
                    </div>

                    <h2 className="mt-4 text-lg font-semibold tracking-tight text-ink">
                      Fagnner Sousa
                    </h2>
                    <p className="mt-0.5 text-sm text-muted">{about.profile.role}</p>

                    <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-faint">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {about.profile.current}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11.5px] font-medium text-emerald-700 dark:text-emerald-300">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      {about.profile.availability}
                    </div>

                    <dl className="mt-5 w-full space-y-2.5 border-t border-line/10 pt-5 text-left text-sm">
                      <div className="flex items-center gap-2.5 text-muted">
                        <MapPin className="h-4 w-4 flex-shrink-0 text-faint" />
                        <span>{about.profile.location}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-muted">
                        <Clock3 className="h-4 w-4 flex-shrink-0 text-faint" />
                        <span>{about.profile.timezone}</span>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="rounded-2xl border border-line/10 bg-surface/70 p-5 backdrop-blur-sm">
                  <h2 className="text-sm font-semibold tracking-tight text-ink">
                    {about.connectCard.title}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {about.connectCard.subtitle}
                  </p>

                  <div className="mt-4 space-y-2">
                    <ConnectRow href={socialLinks.upwork} label="Upwork" icon={Briefcase} />
                    <ConnectRow href={getLinkedInUrl(language)} label="LinkedIn" icon={Linkedin} />
                    <ConnectRow href={socialLinks.github} label="GitHub" icon={Github} />
                    <ConnectRow href={mailtoLink} label="Email" icon={Mail} external={false} />
                  </div>
                </div>

                <div className="rounded-2xl border border-line/10 bg-surface/70 p-5 backdrop-blur-sm">
                  <h2 className="text-sm font-semibold tracking-tight text-ink">
                    {about.bestFit.title}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {about.bestFit.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-line/10 bg-surface/70 p-5 backdrop-blur-sm">
                  <h2 className="text-sm font-semibold tracking-tight text-ink">
                    {about.sections.beyond.title}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {about.sections.beyond.body}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {about.sections.beyond.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full border border-line/10 bg-canvas/50 px-2 py-0.5 text-[10px] font-medium text-faint"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <ConnectCta language={language} />
    </>
  );
}
