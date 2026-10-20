import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/footer";
import { SkipLink } from "@/components/skip-link";
import { PersonSchema } from "@/components/person-schema";
import { ogImages, SITE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Fagnner Sousa — Backend & Infrastructure Engineer",
  description: "Backend and infrastructure engineer with 6+ years building and rescuing production systems. PostgreSQL, Docker, queues, webhooks and AI automation.",
  keywords: ["Fagnner Sousa", "backend engineer", "infrastructure engineer", "PostgreSQL", "n8n", "Docker", "Ruby on Rails", "AI automation"],
  authors: [{ name: "Fagnner Sousa" }],
  creator: "Fagnner Sousa",
  openGraph: {
    title: "Fagnner Sousa — Backend & Infrastructure Engineer",
    description: "Backend and infrastructure engineer building and rescuing production systems.",
    url: "https://fassousa.github.io",
    siteName: "Fagnner Sousa",
    type: "website",
    images: [{ ...ogImages.en }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fagnner Sousa — Backend & Infrastructure Engineer",
    description: "Backend and infrastructure engineer building and rescuing production systems.",
    images: [ogImages.en.url],
  },
  alternates: {
    languages: {
      'en': '/',
      'pt': '/pt',
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F3" },
    { media: "(prefers-color-scheme: dark)", color: "#090B11" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Remove any existing theme classes
                  document.documentElement.classList.remove('dark', 'light');
                  
                  const theme = localStorage.getItem('theme') || 'light';
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'system') {
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    }
                  }
                  // For 'light' theme, we don't add any class (default state)
                } catch (e) {
                  console.error('Theme initialization error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        id="top"
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-canvas font-sans text-ink antialiased`}
      >
        <PersonSchema />
        <ThemeProvider>
          <SkipLink />
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
