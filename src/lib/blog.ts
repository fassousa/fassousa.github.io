import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, BlogMetadata } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = await Promise.all(
      fileNames
        .filter((name) => name.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          
          const processedContent = await remark().use(html).process(content);
          const contentHtml = processedContent.toString();

          return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            updatedDate: data.updatedDate,
            excerpt: data.excerpt || '',
            content: contentHtml,
            tags: data.tags || [],
            published: data.published !== false,
          } as BlogPost;
        })
    );

    return allPostsData
      .filter((post) => post.published)
      .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      updatedDate: data.updatedDate,
      excerpt: data.excerpt || '',
      content: contentHtml,
      tags: data.tags || [],
      published: data.published !== false,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function createPost(slug: string, metadata: BlogMetadata, content: string): void {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const frontmatter = `---
title: "${metadata.title}"
date: "${metadata.date}"${metadata.updatedDate ? `\nupdatedDate: "${metadata.updatedDate}"` : ''}
excerpt: "${metadata.excerpt}"
tags: [${metadata.tags?.map(tag => `"${tag}"`).join(', ') || ''}]
published: ${metadata.published !== false}
---

${content}`;

  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, frontmatter);
}

export function updatePost(slug: string, metadata: BlogMetadata, content: string): void {
  // When updating a post, always set the updatedDate to current date
  const updatedMetadata = {
    ...metadata,
    updatedDate: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
  };
  
  createPost(slug, updatedMetadata, content);
}
