export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      blog: 'Blog',
      about: 'About',
    },
    
    // Blog
    blog: {
      title: 'Blog',
      subtitle: 'Thoughts, tutorials, and insights',
      readMore: 'Read more',
      readingTime: 'min read',
      publishedOn: 'Published on',
      updatedOn: 'Updated on',
      tags: 'Tags',
      allPosts: 'All Posts',
      noPosts: 'No posts available.',
      backToBlog: 'Back to Blog',
    },
    
    // Admin/Editor
    admin: {
      edit: 'Edit',
      editPost: 'Edit Post',
      editViaGithub: 'Edit via GitHub',
      newPost: 'New Post',
      save: 'Save',
      saving: 'Saving...',
      title: 'Title',
      excerpt: 'Excerpt',
      content: 'Content',
      tags: 'Tags',
      published: 'Published',
      draft: 'Draft',
    },
    
    // Common
    common: {
      language: 'Language',
      switchLanguage: 'Switch language',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
      open: 'Open',
      skipToContent: 'Skip to content',
    },
    
    // Metadata
    meta: {
      defaultTitle: 'Fagnner Sousa — Backend & Infrastructure Engineer',
      defaultDescription: 'Backend and infrastructure engineer with 6+ years building and rescuing production systems. PostgreSQL, Docker, queues, webhooks and AI automation.',
      keywords: 'Fagnner Sousa, backend engineer, infrastructure engineer, PostgreSQL, n8n, Docker, Ruby on Rails, AI automation',
    },
  },
  
  pt: {
    // Navigation
    nav: {
      home: 'Início',
      blog: 'Blog',
      about: 'Sobre',
    },
    
    // Blog
    blog: {
      title: 'Blog',
      subtitle: 'Pensamentos, tutoriais e insights',
      readMore: 'Leia mais',
      readingTime: 'min de leitura',
      publishedOn: 'Publicado em',
      updatedOn: 'Atualizado em',
      tags: 'Tags',
      allPosts: 'Todos os Posts',
      noPosts: 'Nenhum post disponível.',
      backToBlog: 'Voltar ao Blog',
    },
    
    // Admin/Editor
    admin: {
      edit: 'Editar',
      editPost: 'Editar Post',
      editViaGithub: 'Editar via GitHub',
      newPost: 'Novo Post',
      save: 'Salvar',
      saving: 'Salvando...',
      title: 'Título',
      excerpt: 'Resumo',
      content: 'Conteúdo',
      tags: 'Tags',
      published: 'Publicado',
      draft: 'Rascunho',
    },
    
    // Common
    common: {
      language: 'Idioma',
      switchLanguage: 'Mudar idioma',
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      close: 'Fechar',
      open: 'Abrir',
      skipToContent: 'Pular para o conteúdo',
    },
    
    // Metadata
    meta: {
      defaultTitle: 'Fagnner Sousa — Engenheiro Backend & Infraestrutura',
      defaultDescription: 'Engenheiro de backend e infraestrutura com 6+ anos construindo e resgatando sistemas em produção. PostgreSQL, Docker, filas, webhooks e automação com IA.',
      keywords: 'Fagnner Sousa, engenheiro backend, infraestrutura, PostgreSQL, n8n, Docker, Ruby on Rails, automação com IA',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export type NestedTranslationKey = 
  | `nav.${keyof typeof translations.en.nav}`
  | `blog.${keyof typeof translations.en.blog}`
  | `admin.${keyof typeof translations.en.admin}`
  | `common.${keyof typeof translations.en.common}`
  | `meta.${keyof typeof translations.en.meta}`;

export const getTranslation = (
  language: keyof typeof translations,
  key: NestedTranslationKey
): string => {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};
