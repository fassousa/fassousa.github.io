// Language configuration for multilingual support
export const languages = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    dir: 'ltr',
  },
  pt: {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷',
    dir: 'ltr',
  },
} as const;

export type Language = keyof typeof languages;
export const defaultLanguage: Language = 'en';
export const supportedLanguages = Object.keys(languages) as Language[];

// URL structure configuration
export const getLanguageFromPath = (pathname: string): Language => {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] as Language;
  
  if (supportedLanguages.includes(firstSegment)) {
    return firstSegment;
  }
  
  return defaultLanguage;
};

export const getLocalizedPath = (path: string, language: Language): string => {
  if (language === defaultLanguage) {
    return path;
  }
  
  // Remove existing language prefix if present
  const cleanPath = path.replace(/^\/[a-z]{2}\//, '/');
  return `/${language}${cleanPath}`;
};

export const removeLanguageFromPath = (path: string): string => {
  return path.replace(/^\/[a-z]{2}\//, '/');
};
