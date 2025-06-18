import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fagnner Sousa - Developer & Blog",
  description: "Personal website of Fagnner Sousa - passionate developer creating amazing web experiences. Welcome to my space where I share thoughts, projects, and journey.",
  keywords: ["Fagnner Sousa", "developer", "web development", "blog", "personal website"],
  authors: [{ name: "Fagnner Sousa" }],
  creator: "Fagnner Sousa",
  openGraph: {
    title: "Fagnner Sousa - Developer & Blog",
    description: "Personal website of Fagnner Sousa - passionate developer creating amazing web experiences.",
    url: "https://fassousa.github.io",
    siteName: "Fagnner Sousa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fagnner Sousa - Developer & Blog",
    description: "Personal website of Fagnner Sousa - passionate developer creating amazing web experiences.",
  },
  alternates: {
    languages: {
      'en': '/',
      'pt': '/pt',
    },
  },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
