import { BlogPost, BlogMetadata } from '../src/types/blog';

describe('Blog Types and Data Structures', () => {
  describe('BlogPost interface', () => {
    it('should accept valid blog post with updatedDate', () => {
      const blogPost: BlogPost = {
        slug: 'test-post',
        title: 'Test Post',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        excerpt: 'This is a test post',
        content: '<h1>Test Content</h1>',
        tags: ['test', 'blog'],
        published: true,
      };

      expect(blogPost.slug).toBe('test-post');
      expect(blogPost.updatedDate).toBe('2025-06-10');
    });

    it('should accept valid blog post without updatedDate', () => {
      const blogPost: BlogPost = {
        slug: 'new-post',
        title: 'New Post',
        date: '2025-06-07',
        excerpt: 'This is a new post',
        content: '<h1>New Content</h1>',
        tags: ['new'],
        published: true,
      };

      expect(blogPost.slug).toBe('new-post');
      expect(blogPost.updatedDate).toBeUndefined();
    });

    it('should handle optional fields correctly', () => {
      const minimalPost: BlogPost = {
        slug: 'minimal',
        title: 'Minimal Post',
        date: '2025-06-07',
        excerpt: 'Minimal excerpt',
        content: 'Minimal content',
      };

      expect(minimalPost.tags).toBeUndefined();
      expect(minimalPost.published).toBeUndefined();
      expect(minimalPost.updatedDate).toBeUndefined();
    });
  });

  describe('BlogMetadata interface', () => {
    it('should accept metadata with updatedDate', () => {
      const metadata: BlogMetadata = {
        title: 'Updated Post',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        excerpt: 'This post was updated',
        tags: ['updated'],
        published: true,
      };

      expect(metadata.updatedDate).toBe('2025-06-10');
      expect(metadata.date).toBe('2025-06-07');
    });

    it('should accept metadata without updatedDate', () => {
      const metadata: BlogMetadata = {
        title: 'New Post',
        date: '2025-06-07',
        excerpt: 'This is a new post',
        tags: ['new'],
        published: true,
      };

      expect(metadata.updatedDate).toBeUndefined();
    });

    it('should handle date format validation conceptually', () => {
      // These tests verify that our types accept expected date formats
      const validDates = [
        '2025-06-07',
        '2024-12-31',
        '2026-01-01',
      ];

      validDates.forEach(date => {
        const metadata: BlogMetadata = {
          title: 'Date Test',
          date: date,
          updatedDate: date,
          excerpt: 'Testing date format',
          published: true,
        };

        expect(metadata.date).toBe(date);
        expect(metadata.updatedDate).toBe(date);
      });
    });
  });

  describe('Data consistency', () => {
    it('should maintain date relationship (updatedDate >= date)', () => {
      const post: BlogPost = {
        slug: 'date-test',
        title: 'Date Relationship Test',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        excerpt: 'Testing date relationship',
        content: 'Content',
      };

      // Convert to Date objects for comparison
      const createdDate = new Date(post.date);
      const updatedDate = new Date(post.updatedDate!);

      expect(updatedDate.getTime()).toBeGreaterThanOrEqual(createdDate.getTime());
    });

    it('should handle same creation and update dates', () => {
      const post: BlogPost = {
        slug: 'same-date',
        title: 'Same Date Test',
        date: '2025-06-07',
        updatedDate: '2025-06-07',
        excerpt: 'Same creation and update date',
        content: 'Content',
      };

      expect(post.date).toBe(post.updatedDate);
    });

    it('should convert BlogMetadata to BlogPost structure', () => {
      const metadata: BlogMetadata = {
        title: 'Conversion Test',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        excerpt: 'Testing conversion',
        tags: ['test', 'conversion'],
        published: true,
      };

      const blogPost: BlogPost = {
        slug: 'conversion-test',
        ...metadata,
        content: '<h1>Generated Content</h1>',
      };

      expect(blogPost.title).toBe(metadata.title);
      expect(blogPost.date).toBe(metadata.date);
      expect(blogPost.updatedDate).toBe(metadata.updatedDate);
      expect(blogPost.excerpt).toBe(metadata.excerpt);
      expect(blogPost.tags).toEqual(metadata.tags);
      expect(blogPost.published).toBe(metadata.published);
    });
  });

  describe('Edge cases and validation', () => {
    it('should handle empty tags array', () => {
      const post: BlogPost = {
        slug: 'no-tags',
        title: 'No Tags Post',
        date: '2025-06-07',
        excerpt: 'Post without tags',
        content: 'Content',
        tags: [],
      };

      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags).toHaveLength(0);
    });

    it('should handle published false explicitly', () => {
      const post: BlogPost = {
        slug: 'unpublished',
        title: 'Unpublished Post',
        date: '2025-06-07',
        excerpt: 'This post is not published',
        content: 'Content',
        published: false,
      };

      expect(post.published).toBe(false);
    });

    it('should handle long titles and excerpts', () => {
      const longTitle = 'A'.repeat(200);
      const longExcerpt = 'B'.repeat(500);

      const post: BlogPost = {
        slug: 'long-content',
        title: longTitle,
        date: '2025-06-07',
        excerpt: longExcerpt,
        content: 'Content',
      };

      expect(post.title).toHaveLength(200);
      expect(post.excerpt).toHaveLength(500);
    });

    it('should handle special characters in content', () => {
      const specialContent = 'Content with émojis 🎉 and spëcial çharacters & symbols!';
      
      const post: BlogPost = {
        slug: 'special-chars',
        title: 'Special Characters Test',
        date: '2025-06-07',
        excerpt: 'Testing special characters',
        content: specialContent,
      };

      expect(post.content).toBe(specialContent);
    });
  });
});
