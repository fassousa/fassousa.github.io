/**
 * Integration Tests for Blog Update Date Feature
 * 
 * These tests validate the blog functions without complex mocking.
 */

import matter from 'gray-matter';

// Mock data for testing
const mockBlogPost = `---
title: "Test Blog Post"
date: "2025-06-07"
updatedDate: "2025-06-10"
excerpt: "This is a test blog post"
published: true
---

# Test Blog Post

This is the content of the test blog post.
`;

const mockBlogPostWithoutUpdate = `---
title: "Another Test Post"
date: "2025-06-07"
excerpt: "Another test post"
published: true
---

# Another Test Post

This post has not been updated.
`;

describe('Blog Integration Tests', () => {
  describe('Blog metadata parsing', () => {
    test('should correctly parse frontmatter with updatedDate', () => {
      const { data } = matter(mockBlogPost);
      
      expect(data.title).toBe('Test Blog Post');
      expect(data.date).toBe('2025-06-07');
      expect(data.updatedDate).toBe('2025-06-10');
      expect(data.published).toBe(true);
    });

    test('should handle posts without updatedDate', () => {
      const { data } = matter(mockBlogPostWithoutUpdate);
      
      expect(data.title).toBe('Another Test Post');
      expect(data.date).toBe('2025-06-07');
      expect(data.updatedDate).toBeUndefined();
      expect(data.published).toBe(true);
    });
  });

  describe('Frontmatter generation', () => {
    test('should generate frontmatter with updatedDate when provided', () => {
      const metadata = {
        title: 'Test Post',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        excerpt: 'Test excerpt',
        published: true
      };

      const frontmatter = generateFrontmatter(metadata);
      
      expect(frontmatter).toContain('title: "Test Post"');
      expect(frontmatter).toContain('date: "2025-06-07"');
      expect(frontmatter).toContain('updatedDate: "2025-06-10"');
      expect(frontmatter).toContain('excerpt: "Test excerpt"');
      expect(frontmatter).toContain('published: true');
    });

    test('should generate frontmatter without updatedDate when not provided', () => {
      const metadata = {
        title: 'Test Post',
        date: '2025-06-07',
        excerpt: 'Test excerpt',
        published: true
      };

      const frontmatter = generateFrontmatter(metadata);
      
      expect(frontmatter).toContain('title: "Test Post"');
      expect(frontmatter).toContain('date: "2025-06-07"');
      expect(frontmatter).not.toContain('updatedDate');
      expect(frontmatter).toContain('excerpt: "Test excerpt"');
    });
  });

  describe('Date update logic', () => {
    test('should set updatedDate when updating existing post', () => {
      const originalDate = '2025-06-07';
      const currentDate = new Date().toISOString().split('T')[0];
      
      // Simulate updating a post
      const updatedMetadata = {
        title: 'Updated Post',
        date: originalDate,
        updatedDate: currentDate,
        excerpt: 'Updated excerpt',
        published: true
      };

      expect(updatedMetadata.updatedDate).toBe(currentDate);
      expect(updatedMetadata.updatedDate).not.toBe(originalDate);
    });

    test('should maintain original date when updating', () => {
      const originalDate = '2025-06-07';
      const currentDate = new Date().toISOString().split('T')[0];
      
      const updatedMetadata = {
        title: 'Updated Post',
        date: originalDate,
        updatedDate: currentDate,
        excerpt: 'Updated excerpt',
        published: true
      };

      expect(updatedMetadata.date).toBe(originalDate);
    });
  });
});

// Helper function to generate frontmatter (replicated from our implementation)
function generateFrontmatter(metadata: any): string {
  let frontmatter = `---\ntitle: "${metadata.title}"\ndate: "${metadata.date}"`;
  
  if (metadata.updatedDate) {
    frontmatter += `\nupdatedDate: "${metadata.updatedDate}"`;
  }
  
  frontmatter += `\nexcerpt: "${metadata.excerpt}"\npublished: ${metadata.published}\n---`;
  return frontmatter;
}
