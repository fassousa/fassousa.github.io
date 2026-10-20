'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUp, Briefcase, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/hooks';
import { getLocalizedPath } from '@/lib/i18n/config';
import { getLinkedInUrl, getSiteContent, mailtoLink, socialLinks } from '@/lib/i18n/content';

export function SiteFooter() {
  const pathname = usePathname();
  const { t, language } = useTranslations();
  const content = getSiteContent(language);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const links = [
    { name: t('nav.home'), href: getLocalizedPath('/', language) },
    { name: t('nav.blog'), href: getLocalizedPath('/blog', language) },
    { name: t('nav.about'), href: getLocalizedPath('/about', language) },
  ];

  return (
    <footer className="mt-24 border-t border-line/10">
      <div className="container-page flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-sm">
          <Link
            href={getLocalizedPath('/', language)}
            className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-ink"
          >
            <Image
              src="/profile-pixel.webp"
              alt=""
              width={64}
              height={64}
              className="h-8 w-8 rounded-full object-cover ring-1 ring-line/15"
            />
            Fagnner Sousa
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-muted">{content.footer.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted transition-colors duration-300 hover:text-ink"
            >
              {link.name}
            </Link>
          ))}

          <span className="hidden h-4 w-px bg-line/15 sm:block" />

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
            <a href={mailtoLink} className="icon-btn" aria-label="Email">
              <Mail className="h-[17px] w-[17px]" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Fagnner Sousa · {content.footer.builtWith}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-ink"
          >
            {content.footer.backToTop}
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
