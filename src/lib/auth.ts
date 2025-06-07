'use client';

// Simple client-side authentication for demo purposes
// In production, use proper authentication with secure backend

const ADMIN_PASSWORD = 'FagnnerSousa2025!'; // Change this to your secure password!

export function checkAuth(): boolean {
  if (typeof window === 'undefined') return false;
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
