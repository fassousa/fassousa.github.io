import { socialLinks } from '@/lib/i18n/content';
import { SITE_URL } from '@/lib/seo';

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Fagnner Sousa',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/profile-pixel.webp`,
  jobTitle: 'Backend & Infrastructure Engineer',
  description:
    'Backend and infrastructure engineer with 6+ years building and rescuing production systems. PostgreSQL, Docker, queues, webhooks and AI automation.',
  email: socialLinks.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rio de Janeiro',
    addressCountry: 'BR',
  },
  knowsLanguage: ['English', 'Portuguese'],
  sameAs: [socialLinks.linkedin, socialLinks.github, socialLinks.upwork],
  knowsAbout: [
    'Backend engineering',
    'Infrastructure',
    'PostgreSQL',
    'PostGIS',
    'Docker',
    'Ruby on Rails',
    'Redis',
    'RabbitMQ',
    'n8n',
    'AI automation',
  ],
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: 'Fagnner Sousa',
  inLanguage: ['en', 'pt-BR'],
  publisher: { '@id': `${SITE_URL}/#person` },
};

export function PersonSchema() {
  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [person, website],
  }).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
