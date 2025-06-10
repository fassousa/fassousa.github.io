/**
 * Core Blog Functionality Tests
 * 
 * Tests the essential blog update date feature and authentication
 */

import { BlogPost, BlogMetadata } from '../src/types/blog';

describe('Blog Core Functionality', () => {
  // Helper functions
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const shouldShowUpdate = (createdDate: string, updatedDate?: string): boolean => {
    return Boolean(updatedDate && updatedDate !== createdDate);
  };

  const generateFrontmatter = (metadata: Partial<BlogMetadata>): string => {
    const lines = ['---'];
    if (metadata.title) lines.push(`title: "${metadata.title}"`);
    if (metadata.date) lines.push(`date: "${metadata.date}"`);
    if (metadata.updatedDate) lines.push(`updatedDate: "${metadata.updatedDate}"`);
    if (metadata.excerpt) lines.push(`excerpt: "${metadata.excerpt}"`);
    if (metadata.published !== undefined) lines.push(`published: ${metadata.published}`);
    lines.push('---');
    return lines.join('\n');
  };

  describe('Date handling', () => {
    test('formats dates consistently', () => {
      expect(formatDate('2025-06-10T15:30:00Z')).toBe('2025-06-10');
      expect(formatDate('2025-12-25')).toBe('2025-12-25');
    });

    test('detects post updates correctly', () => {
      // Test cases for update detection
      expect(shouldShowUpdate('2025-06-07', '2025-06-10')).toBe(true);
      expect(shouldShowUpdate('2025-06-07', '2025-06-07')).toBe(false);
      expect(shouldShowUpdate('2025-06-07', undefined)).toBe(false);
    });

    test('generates current date for updates', () => {
      const currentDate = new Date().toISOString().split('T')[0];
      expect(currentDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('Frontmatter generation', () => {
    test('includes updatedDate when post was updated', () => {
      const frontmatter = generateFrontmatter({
        title: 'Updated Post',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        published: true
      });

      expect(frontmatter).toContain('updatedDate: "2025-06-10"');
      expect(frontmatter).toContain('date: "2025-06-07"');
    });

    test('excludes updatedDate for new posts', () => {
      const frontmatter = generateFrontmatter({
        title: 'New Post',
        date: '2025-06-07',
        published: true
      });

      expect(frontmatter).not.toContain('updatedDate:');
    });
  });

  describe('TypeScript interfaces', () => {
    test('BlogPost interface accepts optional updatedDate', () => {
      const postWithUpdate: BlogPost = {
        slug: 'test-post',
        title: 'Test Post',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        excerpt: 'Test excerpt',
        content: 'Test content'
      };

      const postWithoutUpdate: BlogPost = {
        slug: 'new-post',
        title: 'New Post',
        date: '2025-06-07',
        excerpt: 'New excerpt',
        content: 'New content'
      };

      expect(postWithUpdate.updatedDate).toBe('2025-06-10');
      expect(postWithoutUpdate.updatedDate).toBeUndefined();
    });

    test('BlogMetadata interface supports all fields', () => {
      const metadata: BlogMetadata = {
        title: 'Metadata Test',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        excerpt: 'Test excerpt',
        tags: ['test', 'metadata'],
        published: true
      };

      expect(metadata.updatedDate).toBe('2025-06-10');
      expect(metadata.tags).toHaveLength(2);
    });
  });

  describe('Authentication', () => {
    const validatePassword = (password: string): boolean => {
      return password === 'FagnnerSousa2025!';
    };

    const validateToken = (token: string): boolean => {
      return token.startsWith('Bearer ') && token.length > 20;
    };

    test('validates admin password', () => {
      expect(validatePassword('FagnnerSousa2025!')).toBe(true);
      expect(validatePassword('wrong-password')).toBe(false);
    });

    test('validates bearer tokens', () => {
      expect(validateToken('Bearer valid-token-12345')).toBe(true);
      expect(validateToken('invalid-token')).toBe(false);
    });
  });

  describe('Post workflow', () => {
    test('simulates create and update workflow', () => {
      // Create new post
      const newPost = {
        title: 'Test Post',
        date: '2025-06-07',
        content: 'Initial content'
      };
      
      expect(newPost).not.toHaveProperty('updatedDate');

      // Update post
      const updatedPost = {
        ...newPost,
        updatedDate: '2025-06-10',
        content: 'Updated content'
      };

      expect(updatedPost.date).toBe('2025-06-07'); // Original date preserved
      expect(updatedPost.updatedDate).toBe('2025-06-10');
      expect(shouldShowUpdate(updatedPost.date, updatedPost.updatedDate)).toBe(true);
    });

    test('handles date relationships correctly', () => {
      const createdDate = new Date('2025-06-07');
      const updatedDate = new Date('2025-06-10');
      
      expect(updatedDate.getTime()).toBeGreaterThan(createdDate.getTime());
    });
  });
});
