import type { Metadata } from "next";
import { translations } from '@/lib/i18n/translations';
import React from 'react';

export const metadata: Metadata = {
  title: translations.pt.meta.defaultTitle,
  description: translations.pt.meta.defaultDescription,
  keywords: translations.pt.meta.keywords,
  authors: [{ name: "Fagnner Sousa" }],
  creator: "Fagnner Sousa",
  openGraph: {
    title: translations.pt.meta.defaultTitle,
    description: translations.pt.meta.defaultDescription,
    url: "https://fassousa.github.io/pt",
    siteName: "Fagnner Sousa",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: translations.pt.meta.defaultTitle,
    description: translations.pt.meta.defaultDescription,
  },
  alternates: {
    languages: {
      'en': '/',
      'pt': '/pt',
    },
  },
};

export default function PtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
