// Simplified hook for authentication state
'use client';

import { useState, useEffect } from 'react';
import { checkAuth } from '@/lib/auth';
import { GITHUB_CONFIG } from '@/lib/github';

interface AuthState {
  devAuth: boolean;
  githubAuth: boolean;
  loading: boolean;
}

export function useAuthState(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({
    devAuth: false,
    githubAuth: false,
    loading: true,
  });

  useEffect(() => {
    const devAuth = checkAuth();
    const githubToken = localStorage.getItem(GITHUB_CONFIG.TOKEN_KEY);
    const githubAuth = !!githubToken;

    setAuthState({
      devAuth,
      githubAuth,
      loading: false,
    });
  }, []);

  return authState;
}
