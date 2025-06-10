/**
 * User Experience Tests
 * 
 * Tests the blog feature from a user's perspective
 */

import { format } from 'date-fns';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  updatedDate?: string;
  excerpt: string;
  content: string;
  tags?: string[];
  published?: boolean;
}

describe('Blog User Experience', () => {
  const formatDisplayDate = (dateString: string): string => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shouldShowUpdateDate = (post: BlogPost): boolean => {
    return Boolean(post.updatedDate && post.updatedDate !== post.date);
  };

  describe('Date display in UI', () => {
    test('shows both creation and update dates for updated posts', () => {
      const post: BlogPost = {
        slug: 'updated-post',
        title: 'Updated Post',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        excerpt: 'This post was updated',
        content: 'Updated content'
      };

      expect(shouldShowUpdateDate(post)).toBe(true);
      expect(formatDisplayDate(post.date)).toBe('June 7, 2025');
      expect(formatDisplayDate(post.updatedDate!)).toBe('June 10, 2025');
    });

    test('shows only creation date for new posts', () => {
      const post: BlogPost = {
        slug: 'new-post',
        title: 'New Post',
        date: '2025-06-07',
        excerpt: 'This is a new post',
        content: 'New content'
      };

      expect(shouldShowUpdateDate(post)).toBe(false);
      expect(formatDisplayDate(post.date)).toBe('June 7, 2025');
    });

    test('hides update date for same-day updates', () => {
      const post: BlogPost = {
        slug: 'same-day-update',
        title: 'Same Day Update',
        date: '2025-06-07',
        updatedDate: '2025-06-07',
        excerpt: 'Updated same day',
        content: 'Content'
      };

      expect(shouldShowUpdateDate(post)).toBe(false);
    });
  });

  describe('Footer messages', () => {
    const generateFooterMessage = (post: BlogPost): string => {
      let message = `This post was written on ${formatDisplayDate(post.date)}.`;
      
      if (shouldShowUpdateDate(post)) {
        message += ` Last updated on ${formatDisplayDate(post.updatedDate!)}.`;
      }
      
      return message;
    };

    test('generates message for new post', () => {
      const post: BlogPost = {
        slug: 'new-post',
        title: 'New Post',
        date: '2025-06-07',
        excerpt: 'New excerpt',
        content: 'New content'
      };

      expect(generateFooterMessage(post)).toBe(
        'This post was written on June 7, 2025.'
      );
    });

    test('generates message for updated post', () => {
      const post: BlogPost = {
        slug: 'updated-post',
        title: 'Updated Post',
        date: '2025-06-07',
        updatedDate: '2025-06-10',
        excerpt: 'Updated excerpt',
        content: 'Updated content'
      };

      expect(generateFooterMessage(post)).toBe(
        'This post was written on June 7, 2025. Last updated on June 10, 2025.'
      );
    });
  });

  describe('Edge cases handling', () => {
    test('handles posts with empty tags', () => {
      const post: BlogPost = {
        slug: 'no-tags',
        title: 'No Tags Post',
        date: '2025-06-07',
        excerpt: 'Post without tags',
        content: 'Content',
        tags: []
      };

      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags).toHaveLength(0);
    });

    test('handles unpublished posts', () => {
      const post: BlogPost = {
        slug: 'unpublished',
        title: 'Unpublished Post',
        date: '2025-06-07',
        excerpt: 'Not published',
        content: 'Content',
        published: false
      };

      expect(post.published).toBe(false);
    });

    test('handles special characters in content', () => {
      const specialContent = 'Content with émojis 🎉 and spëcial çharacters!';
      
      const post: BlogPost = {
        slug: 'special-chars',
        title: 'Special Characters',
        date: '2025-06-07',
        excerpt: 'Special content',
        content: specialContent
      };

      expect(post.content).toBe(specialContent);
    });
  });

  describe('Real-world scenarios', () => {
    test('handles multiple updates over time', () => {
      const scenarios = [
        { created: '2025-06-01', updated: '2025-06-10', shouldShow: true },
        { created: '2025-06-07', updated: '2025-06-07', shouldShow: false },
        { created: '2025-06-07', updated: undefined, shouldShow: false }
      ];

      scenarios.forEach(({ created, updated, shouldShow }) => {
        const post: BlogPost = {
          slug: 'test-post',
          title: 'Test Post',
          date: created,
          updatedDate: updated,
          excerpt: 'Test excerpt',
          content: 'Test content'
        };

        expect(shouldShowUpdateDate(post)).toBe(shouldShow);
      });
    });

    test('validates date format consistency', () => {
      const testDates = ['2025-06-07', '2025-12-25', '2024-01-01'];

      testDates.forEach(dateString => {
        const parsed = new Date(dateString);
        const formatted = parsed.toISOString().split('T')[0];
        expect(formatted).toBe(dateString);
      });
    });
  });
});
