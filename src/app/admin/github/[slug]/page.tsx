import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import GitHubEditor from '@/components/github-editor';

interface GitHubEditPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function GitHubEditPage({ params }: GitHubEditPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const initialContent = {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content.replace(/<[^>]*>/g, ''), // Strip HTML tags for markdown editing
    tags: post.tags || [],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <GitHubEditor slug={slug} initialContent={initialContent} />
    </div>
  );
}
