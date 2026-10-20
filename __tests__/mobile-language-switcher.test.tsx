import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/components/header';

const push = jest.fn();
let pathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => pathname,
  useRouter: () => ({ push }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) =>
    React.createElement('img', { src: typeof src === 'string' ? src : '', alt }),
}));

jest.mock('@/components/theme-toggle', () => ({
  ThemeToggle: () => React.createElement('button', { type: 'button' }, 'theme'),
}));

jest.mock('@/components/quick-deployment-check', () => () => null);

function openMobileMenu() {
  fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
  const navigation = screen.getByRole('navigation', { name: /mobile navigation/i });
  return navigation.closest('#mobile-navigation') as HTMLElement;
}

describe('Mobile language switcher', () => {
  beforeEach(() => {
    push.mockClear();
    pathname = '/';
  });

  it('does not render the language menu inside a clipping container', () => {
    render(<Header />);
    const panel = openMobileMenu();

    fireEvent.click(within(panel).getByRole('button', { name: /switch language/i }));

    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    // Regression: the mobile panel used overflow-hidden, which clipped the
    // dropdown and made the language options impossible to tap. The menu itself
    // may clip its own rounded corners, so only ancestors are relevant.
    expect(menu.parentElement?.closest('.overflow-hidden')).toBeNull();
  });

  it('navigates to the Portuguese home when Portuguese is selected', () => {
    render(<Header />);
    const panel = openMobileMenu();

    fireEvent.click(within(panel).getByRole('button', { name: /switch language/i }));
    fireEvent.click(screen.getByRole('menuitemradio', { name: /português/i }));

    expect(push).toHaveBeenCalledWith('/pt/');
  });

  it('returns to the matching English page when English is selected', () => {
    pathname = '/pt/about/';
    render(<Header />);
    const panel = openMobileMenu();

    fireEvent.click(within(panel).getByRole('button', { name: /mudar idioma/i }));
    fireEvent.click(screen.getByRole('menuitemradio', { name: /english/i }));

    expect(push).toHaveBeenCalledWith('/about/');
  });
});
