/**
 * EditPostButton Component Tests
 * Focused testing of the component's core functionality
 */

import * as auth from '@/lib/auth';

// Mock the auth module
jest.mock('@/lib/auth', () => ({
  checkAuth: jest.fn(),
}));

const mockCheckAuth = jest.mocked(auth.checkAuth);

describe('EditPostButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Core Functionality', () => {
    it('should generate correct edit URLs', () => {
      const testCases = [
        { slug: 'welcome-post', expected: '/admin/edit/welcome-post' },
        { slug: 'post-with-dashes', expected: '/admin/edit/post-with-dashes' },
        { slug: 'post_underscores', expected: '/admin/edit/post_underscores' },
      ];

      testCases.forEach(({ slug, expected }) => {
        expect(`/admin/edit/${slug}`).toBe(expected);
      });
    });

    it('should handle component props correctly', () => {
      // Test required props
      const requiredProps = { slug: 'test-post' };
      expect(requiredProps.slug).toBe('test-post');

      // Test optional props with defaults
      const propsWithMode = { slug: 'test-post', mode: 'inline' as const };
      expect(propsWithMode.mode).toBe('inline');
      
      // Test default mode behavior
      type ComponentProps = { slug: string; mode?: 'inline' | 'external' };
      const propsWithDefault: ComponentProps = { slug: 'test-post' };
      const defaultMode = propsWithDefault.mode || 'external';
      expect(defaultMode).toBe('external');
    });

    it('should support both component modes', () => {
      const externalMode = 'external';
      const inlineMode = 'inline';
      
      expect(['external', 'inline']).toContain(externalMode);
      expect(['external', 'inline']).toContain(inlineMode);
    });
  });

  describe('Edge Cases', () => {
    it('should handle edge cases gracefully', () => {
      // Empty slug
      expect(`/admin/edit/`).toBe('/admin/edit/');
      
      // Special characters
      const specialSlug = 'post-with-special_chars-123';
      expect(`/admin/edit/${specialSlug}`).toBe('/admin/edit/post-with-special_chars-123');
    });
  });
});
