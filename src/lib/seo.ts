import type { Language } from './i18n/config';

export const SITE_URL = 'https://fassousa.github.io';

export const ogImages = {
  en: {
    url: '/og/og-en.png',
    width: 1200,
    height: 630,
    alt: 'Fagnner Sousa — Backend & Infrastructure Engineer',
  },
  pt: {
    url: '/og/og-pt.png',
    width: 1200,
    height: 630,
    alt: 'Fagnner Sousa — Engenheiro Backend & Infraestrutura',
  },
} as const;

export function getOgImage(language: Language) {
  return ogImages[language];
}
