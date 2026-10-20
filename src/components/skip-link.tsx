'use client';

import { useTranslations } from '@/lib/i18n/hooks';

export function SkipLink() {
  const { t } = useTranslations();

  return (
    <a
      href="#main-content"
      className="sr-only rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas shadow-lift focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
    >
      {t('common.skipToContent')}
    </a>
  );
}
