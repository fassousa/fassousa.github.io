'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getLocalizedPath } from '@/lib/i18n/config';

export default function LanguageRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect on the home page and if no language is specified
    if (pathname === '/' && typeof window !== 'undefined') {
      const browserLanguage = navigator.language.toLowerCase();
      
      // Check if user prefers Portuguese
      if (browserLanguage.startsWith('pt')) {
        const localizedPath = getLocalizedPath('/', 'pt');
        router.replace(localizedPath);
      }
    }
  }, [pathname, router]);

  return null;
}
