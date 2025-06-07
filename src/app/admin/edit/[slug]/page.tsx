import BlogEditor from '@/components/blog-editor';
import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: EditPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  return {
    title: post ? `Edit: ${post.title} - Admin` : 'Post Not Found',
    description: 'Edit blog post',
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const initialData = {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content.replace(/<[^>]*>/g, ''), // Strip HTML for editing
    tags: post.tags || [],
    published: post.published !== false,
  };

  return <BlogEditor mode="edit" initialData={initialData} />;
}
