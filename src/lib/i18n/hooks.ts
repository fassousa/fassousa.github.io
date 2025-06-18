'use client';

import { usePathname } from 'next/navigation';
import { Language, getLanguageFromPath } from './config';
import { NestedTranslationKey, getTranslation } from './translations';

export const useLanguage = (): Language => {
  const pathname = usePathname();
  return getLanguageFromPath(pathname);
};

export const useTranslations = () => {
  const language = useLanguage();
  
  const t = (key: NestedTranslationKey): string => {
    return getTranslation(language, key);
  };
  
  return { t, language };
};
