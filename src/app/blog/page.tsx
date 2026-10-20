import { BlogListView } from '@/components/blog-list-view';
import { translations } from '@/lib/i18n/translations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${translations.en.blog.title} - ${translations.en.meta.defaultTitle}`,
  description: translations.en.blog.subtitle,
  alternates: {
    languages: {
      en: '/blog',
      pt: '/pt/blog',
    },
  },
};

export default function BlogPage() {
  return <BlogListView language="en" />;
}
