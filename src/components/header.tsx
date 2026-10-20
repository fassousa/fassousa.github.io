'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import QuickDeploymentCheck from './quick-deployment-check';
import LanguageSwitcher from './i18n/language-switcher';
import { useTranslations } from '@/lib/i18n/hooks';
import { getLocalizedPath } from '@/lib/i18n/config';
import { getSiteContent } from '@/lib/i18n/content';
import { useEffect, useState } from 'react';
import { Briefcase, Menu, X } from 'lucide-react';

function normalizePath(path: string) {
  const clean = path.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export function Header() {
  const pathname = usePathname();
  const { t, language } = useTranslations();
  const content = getSiteContent(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const homeHref = getLocalizedPath('/', language);
  const currentPath = normalizePath(pathname);

  const navigationItems = [
    { name: t('nav.home'), href: getLocalizedPath('/', language) },
    { name: t('nav.blog'), href: getLocalizedPath('/blog', language) },
    { name: t('nav.about'), href: getLocalizedPath('/about', language) },
  ];

  const isActiveLink = (href: string) => normalizePath(href) === currentPath;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-canvas via-canvas/85 to-transparent"
      />

      <div className="container-page relative">
        <div className="mt-3 flex h-14 items-center justify-between gap-3 rounded-2xl border border-line/10 bg-canvas/75 px-3 shadow-[0_12px_32px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-4">
          {/* Identity */}
          <Link
            href={homeHref}
            className="group -m-1 flex items-center gap-2.5 rounded-xl p-1"
            aria-label="Fagnner Sousa — Home"
          >
            <span className="relative flex-shrink-0">
              <Image
                src="/profile-pixel.webp"
                alt=""
                width={72}
                height={72}
                className="h-9 w-9 rounded-full object-cover ring-1 ring-line/15 transition-transform duration-300 ease-smooth group-hover:scale-[1.04]"
              />
              <span
                className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-emerald-500"
                title={content.availability}
              />
              <span className="sr-only">{content.availability}</span>
            </span>
            <span className="leading-tight">
              <span className="block text-[14px] font-semibold tracking-tight text-ink">
                Fagnner Sousa
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-faint sm:block">
                {content.hero.cardRole}
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden flex-1 items-center justify-center md:flex"
          >
            <div className="flex items-center gap-0.5 rounded-full border border-line/10 bg-surface/50 p-1">
              {navigationItems.map((item) => {
                const active = isActiveLink(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 ease-smooth ${
                      active
                        ? 'bg-ink text-canvas shadow-sm'
                        : 'text-muted hover:bg-line/5 hover:text-ink'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <QuickDeploymentCheck className="hidden lg:flex" />
            <a
              href={content.hero.primaryCta.href}
              target="_blank"
              rel="me noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-[11.5px] font-medium text-canvas transition-transform duration-300 ease-smooth hover:-translate-y-0.5 lg:inline-flex"
            >
              <Briefcase className="h-3.5 w-3.5" />
              {content.hero.primaryCta.label}
            </a>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            <button
              type="button"
              className="icon-btn md:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? (
                <X className="h-[18px] w-[18px]" />
              ) : (
                <Menu className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="mt-2 overflow-hidden rounded-2xl border border-line/10 bg-canvas/95 p-2 shadow-lift backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {navigationItems.map((item) => {
                const active = isActiveLink(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active ? 'bg-line/5 text-ink' : 'text-muted hover:bg-line/5 hover:text-ink'
                    }`}
                  >
                    {item.name}
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-line/10 px-2 pt-3">
              <span className="text-xs text-faint">{t('common.language')}</span>
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
