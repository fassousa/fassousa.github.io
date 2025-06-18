'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import QuickDeploymentCheck from './quick-deployment-check';
import LanguageSwitcher from './i18n/language-switcher';
import { useTranslations } from '@/lib/i18n/hooks';
import { getLocalizedPath } from '@/lib/i18n/config';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { t, language } = useTranslations();
  const isAboutPage = pathname.startsWith('/about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items with translations
  const navigationItems = [
    { name: t('nav.home'), href: getLocalizedPath('/', language) },
    { name: t('nav.blog'), href: getLocalizedPath('/blog', language) },
    { name: t('nav.about'), href: getLocalizedPath('/about', language) },
  ];
  const isActiveLink = (href: string) => pathname === href;

  // Helper function to get nav link classes
  const getNavLinkClasses = (href: string, isMobile = false) => {
    const baseClasses = isMobile 
      ? 'block py-2 px-2 rounded text-base font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
      : 'text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400';
    
    const activeClasses = 'text-blue-600 dark:text-blue-400';
    const inactiveClasses = isMobile 
      ? 'text-gray-700 dark:text-gray-200'
      : 'text-gray-600 dark:text-gray-300';
    
    return `${baseClasses} ${isActiveLink(href) ? activeClasses : inactiveClasses}`;
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and profile */}
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
            <div className="flex items-center gap-3">
              <span>Fagnner Sousa</span>
              {!isAboutPage && (
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src="/profile.webp"
                    alt="Fagnner Sousa"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={getNavLinkClasses(item.href)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button and theme toggle */}
          <div className="flex items-center space-x-4">
            <QuickDeploymentCheck className="hidden sm:flex" />
            <LanguageSwitcher className="hidden sm:flex" />
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile navigation dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 pb-4">
            <ul className="flex flex-col gap-2 mt-2">
              {navigationItems.slice(1).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={getNavLinkClasses(item.href, true)}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <LanguageSwitcher />
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
