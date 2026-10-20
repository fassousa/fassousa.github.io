import type { Metadata } from 'next';
import { AboutView } from '@/components/about-view';
import { getSiteContent } from '@/lib/i18n/content';
import { translations } from '@/lib/i18n/translations';
import { ogImages } from '@/lib/seo';

const content = getSiteContent('pt');

export const metadata: Metadata = {
  title: `Sobre - ${translations.pt.meta.defaultTitle}`,
  description: content.about.metaDescription,
  openGraph: {
    title: `Sobre - ${translations.pt.meta.defaultTitle}`,
    description: content.about.metaDescription,
    url: 'https://fassousa.github.io/pt/about',
    type: 'profile',
    locale: 'pt_BR',
    images: [{ ...ogImages.pt }],
  },
  alternates: {
    languages: {
      en: '/about',
      pt: '/pt/about',
    },
  },
};

export default function AboutPage() {
  return <AboutView language="pt" />;
}
