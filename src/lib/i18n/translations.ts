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
    },
    
    // Metadata
    meta: {
      defaultTitle: 'Fagnner Sousa - Developer & Blog',
      defaultDescription: 'Personal website of Fagnner Sousa - passionate developer creating amazing web experiences. Welcome to my space where I share thoughts, projects, and journey.',
      keywords: 'Fagnner Sousa, developer, web development, blog, personal website',
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
    },
    
    // Metadata
    meta: {
      defaultTitle: 'Fagnner Sousa - Desenvolvedor & Blog',
      defaultDescription: 'Site pessoal de Fagnner Sousa - desenvolvedor apaixonado criando experiências web incríveis. Bem-vindo ao meu espaço onde compartilho pensamentos, projetos e jornada.',
      keywords: 'Fagnner Sousa, desenvolvedor, desenvolvimento web, blog, site pessoal',
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
