'use client';

import { useTheme } from './theme-provider';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

const THEME_CYCLE = ['light', 'dark', 'system'] as const;

const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentIndex = THEME_CYCLE.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
    setTheme(THEME_CYCLE[nextIndex]);
  };

  // Prevent hydration mismatch with consistent placeholder
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-md h-9 w-9"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  const IconComponent = THEME_ICONS[theme];

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      <IconComponent className="h-5 w-5" />
    </button>
  );
}
