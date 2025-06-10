import { NextRequest, NextResponse } from 'next/server';
import { updatePost, getPostBySlug } from '@/lib/blog';
import { checkAuth } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !checkAuth(authHeader.replace('Bearer ', ''))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();
    const { title, excerpt, content, tags, published } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get existing post to preserve original date
    const existingPost = await getPostBySlug(slug);
    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const metadata = {
      title,
      date: existingPost.date, // Keep original creation date
      excerpt,
      tags: tags || [],
      published: published !== false,
    };

    // updatePost will automatically set the updatedDate
    updatePost(slug, metadata, content);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
