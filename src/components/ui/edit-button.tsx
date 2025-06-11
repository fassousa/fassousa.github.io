// Reusable button component with consistent styling
import Link from 'next/link';
import { ReactNode } from 'react';

interface EditButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'dev' | 'github';
  mode?: 'inline' | 'external';
  onClick?: () => void;
}

const buttonStyles = {
  dev: {
    inline: "inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-lg transition-colors duration-200",
    external: "inline-flex items-center px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 hover:border-blue-700 dark:hover:border-blue-300 rounded-md transition-colors duration-200"
  },
  github: {
    inline: "inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg transition-colors duration-200",
    external: "inline-flex items-center px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-400 dark:border-gray-600 hover:border-gray-600 dark:hover:border-gray-400 rounded-md transition-colors duration-200"
  }
};

export function EditButton({ href, children, variant = 'dev', mode = 'external', onClick }: EditButtonProps) {
  const className = buttonStyles[variant][mode];
  
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
