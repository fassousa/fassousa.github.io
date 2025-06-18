import Link from 'next/link';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { translations } from '@/lib/i18n/translations';
import { format } from 'date-fns';
import React from 'react';

export default async function PtHomePage() {
  const posts = await getAllPosts('pt');
  const t = translations.pt;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide leading-tight pb-2">
          Olá, eu sou Fagnner Sousa
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Sou um desenvolvedor apaixonado que adora criar experiências web incríveis. 
          Bem-vindo ao meu espaço pessoal onde compartilho meus pensamentos, projetos e jornada.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/fassousa"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/fagnnersousa/?locale=pt_BR"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Posts Recentes</h2>
          <Link
            href="/pt/blog"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t.blog.allPosts}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/pt/blog/${post.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'dd/MM/yyyy')}
                  </time>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex space-x-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Ainda não há posts no blog. Comece escrevendo seu primeiro post!
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Criar Primeiro Post
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
