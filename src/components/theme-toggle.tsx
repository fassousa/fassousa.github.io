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

const THEME_LABELS = {
  light: 'Light theme',
  dark: 'Dark theme',
  system: 'System theme',
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
      <button className="icon-btn h-9 w-9" aria-label="Toggle theme" disabled>
        <Sun className="h-[18px] w-[18px]" />
      </button>
    );
  }

  const IconComponent = THEME_ICONS[theme];

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="icon-btn"
      aria-label={`${THEME_LABELS[theme]} — switch theme`}
      title={THEME_LABELS[theme]}
    >
      <IconComponent className="h-[18px] w-[18px]" />
    </button>
  );
}
