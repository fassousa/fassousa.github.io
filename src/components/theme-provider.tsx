'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme';

function getSystemTheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeToDOM(resolvedTheme: 'dark' | 'light') {
  const htmlElement = document.documentElement;
  htmlElement.classList.remove('dark', 'light');
  
  if (resolvedTheme === 'dark') {
    htmlElement.classList.add('dark');
  }
  
  htmlElement.style.colorScheme = resolvedTheme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light');
  const [mounted, setMounted] = useState(false);

  const resolveAndApplyTheme = (currentTheme: Theme) => {
    const resolved = currentTheme === 'system' ? getSystemTheme() : currentTheme;
    setResolvedTheme(resolved);
    applyThemeToDOM(resolved);
    return resolved;
  };

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    const stored = (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || 'light';
    setTheme(stored);
  }, []);

  // Handle theme changes and system preference updates
  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    resolveAndApplyTheme(theme);

    // Listen for system theme changes only when using system theme
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemChange = () => resolveAndApplyTheme('system');
      
      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }
  }, [theme, mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'light', setTheme: () => {}, resolvedTheme: 'light' }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
