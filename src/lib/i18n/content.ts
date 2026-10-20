import type { Language } from './config';

export type SkillTone =
  | 'indigo'
  | 'emerald'
  | 'violet'
  | 'amber'
  | 'orange'
  | 'sky'
  | 'rose'
  | 'teal';

export type HighlightIcon = 'rescue' | 'database' | 'ai';
export type ServiceIcon = 'wrench' | 'database' | 'workflow' | 'sparkles';

export interface SkillGroup {
  name: string;
  tone: SkillTone;
  items: string[];
}

export interface ServiceItem {
  icon: ServiceIcon;
  title: string;
  description: string;
}

export interface PrincipleItem {
  title: string;
  description: string;
}

export interface SiteContent {
  role: string;
  availability: string;
  location: string;
  hero: {
    greeting: string;
    name: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    cardRole: string;
    statusShort: string;
    experienceBadge: { label: string; value: string };
  };
  highlights: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      icon: HighlightIcon;
      title: string;
      description: string;
      tags: string[];
    }[];
  };
  writing: {
    eyebrow: string;
    title: string;
    all: string;
    empty: string;
    readMore: string;
  };
  connect: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    primary: string;
    secondary: string;
  };
  footer: {
    tagline: string;
    builtWith: string;
    backToTop: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    metaDescription: string;
    sections: {
      journey: { title: string; body: string };
      services: { title: string; subtitle: string; items: ServiceItem[] };
      principles: { title: string; subtitle: string; items: PrincipleItem[] };
      skills: { title: string; subtitle: string; groups: SkillGroup[] };
      beyond: { title: string; body: string; chips: string[] };
    };
    profile: {
      role: string;
      availability: string;
      location: string;
      timezone: string;
      current: string;
    };
    connectCard: { title: string; subtitle: string };
    bestFit: { title: string; items: string[] };
  };
}

export const socialLinks = {
  github: 'https://github.com/fassousa',
  linkedin: 'https://www.linkedin.com/in/fagnnersousa/',
  upwork: 'https://www.upwork.com/freelancers/~017991772983c9f0b7',
  email: 'sousafagnner@gmail.com',
} as const;

export const mailtoLink = `mailto:${socialLinks.email}`;

export function getLinkedInUrl(language: Language): string {
  const locale = language === 'pt' ? 'pt-BR' : 'en-US';
  return `${socialLinks.linkedin}?isSelfProfile=true&locale=${locale}`;
}

const skillGroupsEn: SkillGroup[] = [
  {
    name: 'Languages',
    tone: 'indigo',
    items: ['Ruby', 'JavaScript', 'TypeScript', 'Python', 'SQL'],
  },
  { name: 'Frameworks & libraries', tone: 'emerald', items: ['Ruby on Rails 7', 'React', 'Node.js', 'NestJS'] },
  {
    name: 'Databases',
    tone: 'violet',
    items: ['PostgreSQL', 'PostGIS', 'MySQL', 'Redis', 'PgBouncer'],
  },
  {
    name: 'Queues & workflows',
    tone: 'orange',
    items: ['RabbitMQ', 'Sidekiq', 'n8n', 'Webhooks'],
  },
  {
    name: 'Cloud & DevOps',
    tone: 'sky',
    items: ['Docker', 'Compose', 'Caddy', 'Nginx', 'AWS', 'Google Cloud'],
  },
  {
    name: 'AI & automation',
    tone: 'rose',
    items: ['Claude', 'OpenAI', 'Gemini', 'RAG', 'Prompt Engineering', 'Evals'],
  },
  {
    name: 'Testing & observability',
    tone: 'teal',
    items: ['RSpec', 'Capybara', 'Jest', 'Datadog', 'Sentry', 'Rollbar'],
  },
];

const skillGroupsPt: SkillGroup[] = [
  {
    name: 'Linguagens',
    tone: 'indigo',
    items: ['Ruby', 'JavaScript', 'TypeScript', 'Python', 'SQL'],
  },
  { name: 'Frameworks & bibliotecas', tone: 'emerald', items: ['Ruby on Rails 7', 'React', 'Node.js', 'NestJS'] },
  {
    name: 'Bancos de dados',
    tone: 'violet',
    items: ['PostgreSQL', 'PostGIS', 'MySQL', 'Redis', 'PgBouncer'],
  },
  {
    name: 'Filas & workflows',
    tone: 'orange',
    items: ['RabbitMQ', 'Sidekiq', 'n8n', 'Webhooks'],
  },
  {
    name: 'Cloud & DevOps',
    tone: 'sky',
    items: ['Docker', 'Compose', 'Caddy', 'Nginx', 'AWS', 'Google Cloud'],
  },
  {
    name: 'IA & automação',
    tone: 'rose',
    items: ['Claude', 'OpenAI', 'Gemini', 'RAG', 'Prompt Engineering', 'Evals'],
  },
  {
    name: 'Testes & observabilidade',
    tone: 'teal',
    items: ['RSpec', 'Capybara', 'Jest', 'Datadog', 'Sentry', 'Rollbar'],
  },
];

export const siteContent: Record<Language, SiteContent> = {
  en: {
    role: 'Backend & Infrastructure Engineer',
    availability: 'Available for new projects',
    location: 'Rio de Janeiro, Brazil · UTC-3',
    hero: {
      greeting: "Hi, I'm",
      name: 'Fagnner Sousa',
      description:
        "I'm a backend and infrastructure engineer with 6+ years building — and rescuing — production systems. I help teams unblock critical databases, queues, webhooks and AI pipelines without breaking production.",
      primaryCta: { label: 'Work with me', href: socialLinks.upwork },
      secondaryCta: { label: 'More about me', href: '/about' },
      cardRole: 'Backend & Infrastructure',
      statusShort: 'Available',
      experienceBadge: { label: 'Experience', value: '6+ years' },
    },
    highlights: {
      eyebrow: 'What I do',
      title: 'Production systems, unblocked.',
      description:
        'Backend fundamentals, reliable infrastructure and AI automation — treated as mission-critical layers.',
      items: [
        {
          icon: 'rescue',
          title: 'n8n, Docker & workflow rescues',
          description:
            'Migrating crashing instances to Redis queue mode, fixing memory leaks and webhook bottlenecks, and shipping production-grade Compose deployments.',
          tags: ['n8n', 'Docker', 'Redis'],
        },
        {
          icon: 'database',
          title: 'PostgreSQL performance',
          description:
            'Diagnosing CPU spikes and slow queries with EXPLAIN (ANALYZE, BUFFERS), fixing pool saturation with PgBouncer and designing geospatial schemas with PostGIS.',
          tags: ['PostgreSQL', 'PostGIS', 'PgBouncer'],
        },
        {
          icon: 'ai',
          title: 'Resilient backends & AI',
          description:
            'Idempotent webhooks, dead-letter queues and hardened LLM pipelines built to survive real traffic — from Rails APIs to RAG workflows.',
          tags: ['Rails', 'Python', 'LLM'],
        },
      ],
    },
    writing: {
      eyebrow: 'Writing',
      title: 'Recent posts',
      all: 'View all posts',
      empty: 'No posts yet — the first one is on its way.',
      readMore: 'Read post',
    },
    connect: {
      eyebrow: 'Contact',
      title: 'Have a system to',
      titleAccent: 'unblock?',
      description:
        "I work with a limited number of clients at a time. Send me your logs, specs or error traces and let's get it resolved.",
      primary: 'Invite me on Upwork',
      secondary: 'Send an email',
    },
    footer: {
      tagline: 'Backend & infrastructure engineer for mission-critical systems.',
      builtWith: 'Built with Next.js',
      backToTop: 'Back to top',
    },
    about: {
      eyebrow: 'About me',
      title: 'Production systems, built to stay up.',
      lead:
        "I'm Fagnner Sousa, a backend and infrastructure engineer with 6+ years in consumer-facing products. I help teams stabilize what's already on fire and design what comes next — with rigorous backend fundamentals and a bias for root causes, not patches.",
      metaDescription:
        'Fagnner Sousa — backend and infrastructure engineer. 6+ years building and rescuing production systems: PostgreSQL, Docker, queues, webhooks and AI automation.',
      sections: {
        journey: {
          title: 'My journey',
          body:
            "My journey started in 2019, building e-commerce end to end. Since then I've worked across parking, mass communication (SMS, email and chatbots), education data, fintech payments at Grafeno with PIX and TED, and governance/billing at Pipefy. Today I'm a backend developer at Syngenta Digital, migrating legacy Python services to Rails 7 while processing geospatial data with PostgreSQL/PostGIS, Redis and RabbitMQ. I also work as an LLM evaluator and prompt engineering specialist at micro1, which keeps me close to how AI systems actually behave in production.",
        },
        services: {
          title: 'How I can help',
          subtitle: 'Surgical remediation, fractional architecture and automation that holds up.',
          items: [
            {
              icon: 'wrench',
              title: 'n8n, Docker & workflow rescues',
              description:
                'Migrating n8n to Redis queue mode, fixing container memory leaks and webhook payload bottlenecks in production.',
            },
            {
              icon: 'database',
              title: 'PostgreSQL engineering',
              description:
                'High-CPU diagnosis, slow-query tuning with EXPLAIN, PgBouncer pooling and PostGIS schema design.',
            },
            {
              icon: 'workflow',
              title: 'Resilient backends & webhooks',
              description:
                'Idempotent webhooks, rate limits and dead-letter queues for payments; async jobs with Redis and RabbitMQ.',
            },
            {
              icon: 'sparkles',
              title: 'Production AI integration',
              description:
                'Hardened LLM wrappers, strict JSON schemas, RAG ingestion and automated evaluations for real traffic.',
            },
          ],
        },
        principles: {
          title: 'How I work',
          subtitle: 'A clear process, no guesswork.',
          items: [
            {
              title: 'Read-only diagnosis first',
              description:
                'Logs, query plans and container configs reviewed before touching production.',
            },
            {
              title: 'Post-mortem included',
              description:
                'A one-page root-cause report plus three latent risks found along the way.',
            },
            {
              title: 'Direct communication',
              description:
                'Clear async updates and no disappearing acts — you always know the next step.',
            },
            {
              title: 'Timezone overlap',
              description:
                'Full overlap with North American and European teams.',
            },
          ],
        },
        skills: {
          title: 'Skills & technologies',
          subtitle: 'The stack I reach for to diagnose, build and ship.',
          groups: skillGroupsEn,
        },
        beyond: {
          title: 'Beyond code',
          body:
            "When I'm not in production, you'll find me exploring new technologies, reading tech blogs or building side projects. I also enjoy sharing what I learn through posts and contributing to open source.",
          chips: ['Videogames', 'Tech blogs', 'Open source', 'Side projects'],
        },
      },
      profile: {
        role: 'Backend & Infrastructure Engineer',
        availability: 'Available for projects',
        location: 'Rio de Janeiro, Brazil',
        timezone: 'UTC-3 · Remote friendly',
        current: 'Backend @ Syngenta Digital',
      },
      connectCard: {
        title: "Let's connect",
        subtitle: 'The fastest way to reach me:',
      },
      bestFit: {
        title: 'Best fit',
        items: ['Seed-to-growth startups', 'Founders & product teams', 'Fractional architecture'],
      },
    },
  },
  pt: {
    role: 'Engenheiro Backend & Infraestrutura',
    availability: 'Disponível para novos projetos',
    location: 'Rio de Janeiro, Brasil · UTC-3',
    hero: {
      greeting: 'Olá, eu sou',
      name: 'Fagnner Sousa',
      description:
        'Sou engenheiro de backend e infraestrutura com 6+ anos construindo — e resgatando — sistemas em produção. Ajudo times a desbloquear bancos de dados, filas, webhooks e pipelines de IA sem quebrar a produção.',
      primaryCta: { label: 'Trabalhar comigo', href: socialLinks.upwork },
      secondaryCta: { label: 'Sobre mim', href: '/pt/about' },
      cardRole: 'Backend & Infraestrutura',
      statusShort: 'Disponível',
      experienceBadge: { label: 'Experiência', value: '6+ anos' },
    },
    highlights: {
      eyebrow: 'O que eu faço',
      title: 'Sistemas em produção, desbloqueados.',
      description:
        'Fundamentos de backend, infraestrutura confiável e automação com IA — tratados como camadas críticas, não como detalhe.',
      items: [
        {
          icon: 'rescue',
          title: 'Resgates de n8n, Docker & workflows',
          description:
            'Migração de instâncias quebradas para Redis queue mode, correção de vazamentos de memória e gargalos de webhook, e deploys de produção com Compose.',
          tags: ['n8n', 'Docker', 'Redis'],
        },
        {
          icon: 'database',
          title: 'Performance em PostgreSQL',
          description:
            'Picos de CPU e queries lentas diagnosticados com EXPLAIN (ANALYZE, BUFFERS), ajuste de pool com PgBouncer e modelagem geoespacial com PostGIS.',
          tags: ['PostgreSQL', 'PostGIS', 'PgBouncer'],
        },
        {
          icon: 'ai',
          title: 'Backends e IA resilientes',
          description:
            'Webhooks idempotentes, dead-letter queues e pipelines de LLM endurecidos para tráfego real — de APIs Rails a fluxos de RAG.',
          tags: ['Rails', 'Python', 'LLM'],
        },
      ],
    },
    writing: {
      eyebrow: 'Escrita',
      title: 'Posts recentes',
      all: 'Ver todos os posts',
      empty: 'Ainda não há posts — o primeiro está a caminho.',
      readMore: 'Ler post',
    },
    connect: {
      eyebrow: 'Contato',
      title: 'Tem um sistema para',
      titleAccent: 'desbloquear?',
      description:
        'Trabalho com um número limitado de clientes por vez. Me mande logs, specs ou traces de erro e vamos resolver.',
      primary: 'Convidar no Upwork',
      secondary: 'Enviar um e-mail',
    },
    footer: {
      tagline: 'Engenheiro de backend e infraestrutura para sistemas críticos.',
      builtWith: 'Feito com Next.js',
      backToTop: 'Voltar ao topo',
    },
    about: {
      eyebrow: 'Sobre mim',
      title: 'Sistemas em produção feitos para ficar no ar.',
      lead:
        'Sou Fagnner Sousa, engenheiro de backend e infraestrutura com 6+ anos em produtos digitais. Ajudo times a estabilizar o que já está em chamas e a desenhar o que vem depois — com fundamentos sólidos de backend e foco na causa raiz, não em paliativos.',
      metaDescription:
        'Fagnner Sousa — engenheiro de backend e infraestrutura. 6+ anos construindo e resgatando sistemas em produção: PostgreSQL, Docker, filas, webhooks e automação com IA.',
      sections: {
        journey: {
          title: 'Minha jornada',
          body:
            'Minha jornada começou em 2019, construindo e-commerce de ponta a ponta. Desde então passei por estacionamento, comunicação em massa (SMS, e-mail e chatbots), dados para educação, fintech com PIX e TED na Grafeno, e governança/billing na Pipefy. Hoje sou backend developer na Syngenta Digital, migrando serviços legados de Python para Rails 7 e processando geodados com PostgreSQL/PostGIS, Redis e RabbitMQ. Também atuo como avaliador de LLMs e especialista em engenharia de prompt na micro1, o que me mantém perto de como sistemas de IA realmente se comportam em produção.',
        },
        services: {
          title: 'Como posso ajudar',
          subtitle: 'Remediação cirúrgica, arquitetura fracionada e automação que se sustenta.',
          items: [
            {
              icon: 'wrench',
              title: 'Resgates de n8n, Docker & workflows',
              description:
                'Migração do n8n para Redis queue mode, correção de memory leaks e gargalos de payload em webhooks de produção.',
            },
            {
              icon: 'database',
              title: 'Engenharia de PostgreSQL',
              description:
                'Diagnóstico de CPU alta, tuning de queries com EXPLAIN, pooling com PgBouncer e modelagem com PostGIS.',
            },
            {
              icon: 'workflow',
              title: 'Backends e webhooks resilientes',
              description:
                'Webhooks idempotentes, rate limit e dead-letter queues para pagamentos; jobs assíncronos com Redis e RabbitMQ.',
            },
            {
              icon: 'sparkles',
              title: 'IA em produção',
              description:
                'Wrappers de LLM endurecidos, JSON schema, ingestão de RAG e avaliações automatizadas para tráfego real.',
            },
          ],
        },
        principles: {
          title: 'Como eu trabalho',
          subtitle: 'Processo claro, sem achismo.',
          items: [
            {
              title: 'Diagnóstico somente leitura primeiro',
              description:
                'Logs, planos de execução e configs revisados antes de tocar em produção.',
            },
            {
              title: 'Post-mortem incluído',
              description:
                'Relatório de causa raiz de uma página e três riscos latentes encontrados.',
            },
            {
              title: 'Comunicação direta',
              description:
                'Atualizações assíncronas claras e sem sumiço — você sempre sabe o próximo passo.',
            },
            {
              title: 'Fuso horário alinhado',
              description:
                'Sobreposição total com times da América do Norte e Europa.',
            },
          ],
        },
        skills: {
          title: 'Habilidades & tecnologias',
          subtitle: 'A stack que uso para diagnosticar, construir e publicar.',
          groups: skillGroupsPt,
        },
        beyond: {
          title: 'Além do código',
          body:
            'Quando não estou em produção, você me encontra explorando novas tecnologias, lendo blogs de tecnologia ou tocando projetos pessoais. Também gosto de compartilhar o que aprendo em posts e contribuir com código aberto.',
          chips: ['Videogames', 'Blogs de tecnologia', 'Código aberto', 'Projetos pessoais'],
        },
      },
      profile: {
        role: 'Engenheiro Backend & Infraestrutura',
        availability: 'Disponível para projetos',
        location: 'Rio de Janeiro, Brasil',
        timezone: 'UTC-3 · Aberto a remoto',
        current: 'Backend @ Syngenta Digital',
      },
      connectCard: {
        title: 'Vamos nos conectar',
        subtitle: 'O caminho mais rápido para falar comigo:',
      },
      bestFit: {
        title: 'Melhor encaixe',
        items: ['Startups em início e crescimento', 'Fundadores e times de produto', 'Arquitetura fracionada'],
      },
    },
  },
};

export function getSiteContent(language: Language): SiteContent {
  return siteContent[language];
}
