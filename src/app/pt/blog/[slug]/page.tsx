import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { BlogPostView } from '@/components/blog-post-view';
import { translations } from '@/lib/i18n/translations';
import type { Metadata } from 'next';
import { ogImages } from '@/lib/seo';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts('pt');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'pt');
  const t = translations.pt;

  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: `${post.title} | ${t.meta.defaultTitle}`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedDate,
      tags: post.tags,
      images: [{ ...ogImages.pt }],
    },
    alternates: {
      languages: {
        en: `/blog/${slug}`,
        pt: `/pt/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'pt');

  if (!post) {
    notFound();
  }

  return <BlogPostView language="pt" post={post} slug={slug} />;
}
