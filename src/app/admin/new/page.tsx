import BlogEditor from '@/components/blog-editor';

export const metadata = {
  title: 'New Post - Admin',
  description: 'Create a new blog post',
};

export default function NewPostPage() {
  return <BlogEditor mode="new" />;
}
