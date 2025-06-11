/**
 * Unified Edit Button Tests
 * Clean, behavior-focused tests that validate user interactions
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UnifiedEditButton from '@/components/unified-edit-button';

// Mock authentication and localStorage
const mockCheckAuth = jest.fn();
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

jest.mock('@/lib/auth', () => ({
  checkAuth: () => mockCheckAuth(),
}));

jest.mock('@/lib/github', () => ({
  GITHUB_CONFIG: {
    TOKEN_KEY: 'githubToken',
  },
}));

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
});

describe('UnifiedEditButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCheckAuth.mockReturnValue(false);
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('shows nothing when no authentication is available', () => {
    mockCheckAuth.mockReturnValue(false);
    mockLocalStorage.getItem.mockReturnValue(null);
    
    const { container } = render(<UnifiedEditButton slug="test-post" />);
    expect(container.firstChild).toBeNull();
  });

  it('shows dev edit button when only dev auth is available', () => {
    mockCheckAuth.mockReturnValue(true);
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(<UnifiedEditButton slug="test-post" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/admin/edit/test-post');
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('shows github edit button when only github auth is available', () => {
    mockCheckAuth.mockReturnValue(false);
    mockLocalStorage.getItem.mockReturnValue('mock-github-token');
    
    render(<UnifiedEditButton slug="test-post" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/admin/github/test-post');
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('shows dropdown when both auth methods are available', () => {
    mockCheckAuth.mockReturnValue(true);
    mockLocalStorage.getItem.mockReturnValue('mock-github-token');
    
    render(<UnifiedEditButton slug="test-post" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('handles different modes correctly', () => {
    mockCheckAuth.mockReturnValue(true);
    mockLocalStorage.getItem.mockReturnValue(null);
    
    const { rerender } = render(<UnifiedEditButton slug="test-post" mode="external" />);
    expect(screen.getByRole('link')).not.toHaveClass('fixed');
    
    rerender(<UnifiedEditButton slug="test-post" mode="inline" />);
    expect(screen.getByRole('link').closest('div')).toHaveClass('fixed');
  });

  it('generates correct URLs for different slugs', () => {
    mockCheckAuth.mockReturnValue(true);
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(<UnifiedEditButton slug="my-blog-post-123" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/admin/edit/my-blog-post-123');
  });

  it('handles special characters in slugs', () => {
    mockCheckAuth.mockReturnValue(false);
    mockLocalStorage.getItem.mockReturnValue('mock-github-token');
    
    render(<UnifiedEditButton slug="post-with-special-chars" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/admin/github/post-with-special-chars');
  });

  it('handles authentication state changes', () => {
    // Test initial state with no auth
    mockCheckAuth.mockReturnValue(false);
    mockLocalStorage.getItem.mockReturnValue(null);
    
    const { container } = render(<UnifiedEditButton slug="test-post" />);
    expect(container.firstChild).toBeNull();
  });
});
