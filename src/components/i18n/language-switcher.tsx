'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { languages, Language, getLocalizedPath, removeLanguageFromPath } from '@/lib/i18n/config';
import { useTranslations } from '@/lib/i18n/hooks';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, t } = useTranslations();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLanguage: Language) => {
    const basePath = removeLanguageFromPath(pathname) || '/';
    const newPath = getLocalizedPath(basePath, newLanguage);
    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-9 items-center gap-1.5 rounded-full border border-line/10 bg-surface/60 pl-2.5 pr-2 text-muted transition-colors duration-300 ease-smooth hover:border-line/25 hover:text-ink"
        aria-label={t('common.switchLanguage')}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] leading-none" aria-hidden="true">
          {languages[language].flag}
        </span>
        <span className="text-[11.5px] font-semibold tracking-[0.08em]">
          {languages[language].code.toUpperCase()}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            role="menu"
            aria-label={t('common.language')}
            className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-line/10 bg-canvas/95 p-1 shadow-lift backdrop-blur-xl"
          >
            {Object.entries(languages).map(([code, lang]) => {
              const active = code === language;
              return (
                <button
                  key={code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => handleLanguageChange(code as Language)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                    active ? 'bg-line/5 text-ink' : 'text-muted hover:bg-line/5 hover:text-ink'
                  }`}
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <span className="flex-1 font-medium">{lang.name}</span>
                  {active && <Check className="h-3.5 w-3.5 text-accent" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
