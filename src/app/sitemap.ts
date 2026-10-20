import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postsEn, postsPt] = await Promise.all([getAllPosts('en'), getAllPosts('pt')]);
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: { en: `${SITE_URL}/`, pt: `${SITE_URL}/pt/` } },
    },
    {
      url: `${SITE_URL}/about/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: { en: `${SITE_URL}/about/`, pt: `${SITE_URL}/pt/about/` } },
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { en: `${SITE_URL}/blog/`, pt: `${SITE_URL}/pt/blog/` } },
    },
    {
      url: `${SITE_URL}/pt/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: { en: `${SITE_URL}/`, pt: `${SITE_URL}/pt/` } },
    },
    {
      url: `${SITE_URL}/pt/about/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: { en: `${SITE_URL}/about/`, pt: `${SITE_URL}/pt/about/` } },
    },
    {
      url: `${SITE_URL}/pt/blog/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { en: `${SITE_URL}/blog/`, pt: `${SITE_URL}/pt/blog/` } },
    },
  ];

  const postPages: MetadataRoute.Sitemap = [
    ...postsEn.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${SITE_URL}/blog/${post.slug}/`,
          pt: `${SITE_URL}/pt/blog/${post.slug}/`,
        },
      },
    })),
    ...postsPt.map((post) => ({
      url: `${SITE_URL}/pt/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${SITE_URL}/blog/${post.slug}/`,
          pt: `${SITE_URL}/pt/blog/${post.slug}/`,
        },
      },
    })),
  ];

  return [...staticPages, ...postPages];
}
