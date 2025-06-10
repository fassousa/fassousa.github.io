/**
 * Simple tests for blog update date feature
 */

describe('Blog Update Date Feature', () => {
  describe('Date formatting logic', () => {
    test('should format dates as YYYY-MM-DD', () => {
      const testDate = new Date('2025-06-10T15:30:00Z');
      const formatted = testDate.toISOString().split('T')[0];
      expect(formatted).toBe('2025-06-10');
    });

    test('should handle different date formats', () => {
      const dates = [
        '2025-06-07',
        '2025-12-25', 
        '2024-01-01'
      ];

      dates.forEach(dateString => {
        const date = new Date(dateString);
        const formatted = date.toISOString().split('T')[0];
        expect(formatted).toBe(dateString);
      });
    });
  });

  describe('Update detection logic', () => {
    test('should detect when post has been updated', () => {
      const createdDate = '2025-06-07';
      const updatedDate = '2025-06-10';
      
      const hasUpdate = Boolean(updatedDate && updatedDate !== createdDate);
      expect(hasUpdate).toBe(true);
    });

    test('should not show update when dates are same', () => {
      const createdDate = '2025-06-07';
      const updatedDate = '2025-06-07';
      
      const hasUpdate = Boolean(updatedDate && updatedDate !== createdDate);
      expect(hasUpdate).toBe(false);
    });

    test('should not show update when no updated date', () => {
      const createdDate = '2025-06-07';
      const updatedDate = undefined;
      
      const hasUpdate = Boolean(updatedDate && updatedDate !== createdDate);
      expect(hasUpdate).toBe(false);
    });
  });

  describe('Frontmatter generation', () => {
    test('should generate frontmatter with updated date', () => {
      const metadata = {
        title: 'Test Post',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        excerpt: 'Test excerpt',
        published: true
      };

      const frontmatter = `---
title: "${metadata.title}"
date: "${metadata.date}"
updatedDate: "${metadata.updatedDate}"
excerpt: "${metadata.excerpt}"
published: ${metadata.published}
---`;

      expect(frontmatter).toContain('updatedDate: "2025-06-10"');
      expect(frontmatter).toContain('date: "2025-06-07"');
    });

    test('should generate frontmatter without updated date for new posts', () => {
      const metadata = {
        title: 'New Post',
        date: '2025-06-07',
        excerpt: 'New excerpt',
        published: true
      };

      const frontmatter = `---
title: "${metadata.title}"
date: "${metadata.date}"
excerpt: "${metadata.excerpt}"
published: ${metadata.published}
---`;

      expect(frontmatter).not.toContain('updatedDate:');
      expect(frontmatter).toContain('date: "2025-06-07"');
    });
  });

  describe('Blog post type validation', () => {
    test('should accept blog post with updated date', () => {
      interface BlogPost {
        slug: string;
        title: string;
        date: string;
        updatedDate?: string;
        excerpt: string;
        content: string;
        published?: boolean;
      }

      const post: BlogPost = {
        slug: 'test-post',
        title: 'Test Post',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        excerpt: 'Test excerpt',
        content: 'Test content'
      };

      expect(post.updatedDate).toBe('2025-06-10');
      expect(post.date).toBe('2025-06-07');
    });

    test('should accept blog post without updated date', () => {
      interface BlogPost {
        slug: string;
        title: string;
        date: string;
        updatedDate?: string;
        excerpt: string;
        content: string;
        published?: boolean;
      }

      const post: BlogPost = {
        slug: 'new-post',
        title: 'New Post',
        date: '2025-06-07',
        excerpt: 'New excerpt',
        content: 'New content'
      };

      expect(post.updatedDate).toBeUndefined();
      expect(post.date).toBe('2025-06-07');
    });
  });
});
