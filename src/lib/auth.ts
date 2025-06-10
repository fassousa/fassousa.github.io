'use client';

// Simple client-side authentication for demo purposes
// In production, use proper authentication with secure backend

const ADMIN_PASSWORD = 'FagnnerSousa2025!'; // Change this to your secure password!

export function checkAuth(token?: string): boolean {
  if (typeof window === 'undefined') {
    // Server-side check with token
    return token === ADMIN_PASSWORD;
  }
  // Client-side check
  return localStorage.getItem('adminAuth') === 'authenticated';
}

export function authenticate(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem('adminAuth', 'authenticated');
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem('adminAuth');
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminAuth') === 'authenticated' ? ADMIN_PASSWORD : null;
}
