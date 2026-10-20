import type { Metadata } from 'next';
import { AboutView } from '@/components/about-view';
import { getSiteContent } from '@/lib/i18n/content';
import { ogImages } from '@/lib/seo';

const content = getSiteContent('en');

export const metadata: Metadata = {
  title: 'About - Fagnner Sousa',
  description: content.about.metaDescription,
  openGraph: {
    title: 'About - Fagnner Sousa',
    description: content.about.metaDescription,
    url: 'https://fassousa.github.io/about',
    type: 'profile',
    images: [{ ...ogImages.en }],
  },
  alternates: {
    languages: {
      en: '/about',
      pt: '/pt/about',
    },
  },
};

export default function AboutPage() {
  return <AboutView language="en" />;
}
