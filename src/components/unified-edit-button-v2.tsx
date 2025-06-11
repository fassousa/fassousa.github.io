// Simplified unified edit button - much cleaner and easier to understand
'use client';

import { Edit2, Github, ExternalLink, ChevronDown } from 'lucide-react';
import { useAuthState } from '@/hooks/use-auth-state';
import { EditButton } from '@/components/ui/edit-button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';

interface UnifiedEditButtonProps {
  slug: string;
  mode?: 'inline' | 'external';
}

interface EditOption {
  type: 'dev' | 'github';
  label: string;
  url: string;
  icon: typeof Edit2;
  variant: 'dev' | 'github';
}

function createEditOptions(slug: string, devAuth: boolean, githubAuth: boolean): EditOption[] {
  const options: EditOption[] = [];

  if (devAuth) {
    options.push({
      type: 'dev',
      label: 'Development Editor',
      url: `/admin/edit/${slug}`,
      icon: Edit2,
      variant: 'dev',
    });
  }

  if (githubAuth) {
    options.push({
      type: 'github',
      label: 'GitHub Editor',
      url: `/admin/github/${slug}`,
      icon: Github,
      variant: 'github',
    });
  }

  return options;
}

function SingleButton({ option, mode }: { option: EditOption; mode: 'inline' | 'external' }) {
  const Icon = option.icon;
  const content = (
    <>
      <Icon className="h-4 w-4 mr-2" />
      {mode === 'inline' ? option.label : 'Edit'}
      {mode === 'external' && <ExternalLink className="h-3 w-3 ml-1" />}
    </>
  );

  if (mode === 'inline') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <EditButton href={option.url} variant={option.variant} mode={mode}>
          {content}
        </EditButton>
      </div>
    );
  }

  return (
    <EditButton href={option.url} variant={option.variant} mode={mode}>
      {content}
    </EditButton>
  );
}

function DropdownButton({ options, mode }: { options: EditOption[]; mode: 'inline' | 'external' }) {
  const trigger = (
    <button className={mode === 'inline' 
      ? "inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-lg transition-colors duration-200"
      : "inline-flex items-center px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 hover:border-blue-700 dark:hover:border-blue-300 rounded-md transition-colors duration-200"
    }>
      <Edit2 className="h-4 w-4 mr-2" />
      {mode === 'inline' ? 'Edit Post' : 'Edit'}
      <ChevronDown className="h-4 w-4 ml-1" />
    </button>
  );

  const dropdownContent = (
    <>
      {options.map((option, index) => {
        const Icon = option.icon;
        return (
          <EditButton
            key={option.type}
            href={option.url}
            variant={option.variant}
            mode="external"
          >
            <div className={`flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 ${
              index === 0 ? 'rounded-t-lg' : ''
            } ${index === options.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-200 dark:border-gray-700'}`}>
              <Icon className="h-4 w-4 mr-3" />
              {option.label}
              <ExternalLink className="h-3 w-3 ml-auto" />
            </div>
          </EditButton>
        );
      })}
    </>
  );

  const dropdown = <DropdownMenu trigger={trigger}>{dropdownContent}</DropdownMenu>;

  if (mode === 'inline') {
    return <div className="fixed bottom-6 right-6 z-50">{dropdown}</div>;
  }

  return dropdown;
}

export default function UnifiedEditButton({ slug, mode = 'external' }: UnifiedEditButtonProps) {
  const { devAuth, githubAuth, loading } = useAuthState();

  if (loading) return null;

  const options = createEditOptions(slug, devAuth, githubAuth);

  if (options.length === 0) return null;
  if (options.length === 1) return <SingleButton option={options[0]} mode={mode} />;
  return <DropdownButton options={options} mode={mode} />;
}
