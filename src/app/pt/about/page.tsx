import { Github, Linkedin, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import { translations } from '@/lib/i18n/translations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Sobre - ${translations.pt.meta.defaultTitle}`,
  description: 'Saiba mais sobre Fagnner Sousa, sua trajetória e o que ele faz.',
  alternates: {
    languages: {
      'en': '/about',
      'pt': '/pt/about',
    },
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-6">Sobre Mim</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Olá! Eu sou Fagnner Sousa, um desenvolvedor apaixonado que adora criar experiências digitais 
              que fazem a diferença. Com experiência em desenvolvimento web e um olhar atento para design, 
              gosto de dar vida às ideias através do código.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Minha Jornada</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Minha jornada na tecnologia começou há anos, alimentada por uma paixão de toda a vida por videogames 
              e tudo relacionado à tecnologia. Sempre me senti atraído pelo cenário em constante evolução da inovação, 
              uma força que complementa minha formação acadêmica em Relações Internacionais e especialização em 
              Engenharia de Software. Essa combinação única me permite abordar a tecnologia com uma perspectiva global, 
              sempre buscando aprender, evoluir e me manter à frente da curva.
            </p>

            <h2 className="text-2xl font-semibold mb-4">O Que Faço</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sou um desenvolvedor web com 5 anos de experiência criando produtos e serviços online fáceis de usar. 
              Trabalhei com startups e empresas em crescimento em diversos setores como e-commerce, plataformas de 
              comunicação e serviços financeiros. Meu foco está em criar soluções escaláveis que entregam valor real.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Habilidades & Tecnologias</h2>
            
            {/* Languages */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Linguagens</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Ruby', 'JavaScript', 'SQL'].map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md text-center text-sm text-blue-800 dark:text-blue-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Frameworks/Libraries */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Frameworks/Bibliotecas</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Ruby on Rails', 'React'].map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md text-center text-sm text-green-800 dark:text-green-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Bancos de Dados</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['PostgreSQL', 'MySQL'].map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-md text-center text-sm text-purple-800 dark:text-purple-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Testing */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Testes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['RSpec', 'Jest'].map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-md text-center text-sm text-yellow-800 dark:text-yellow-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Ferramentas</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Git', 'GitHub', 'GitLab', 'Docker', 'Redis', 'Sidekiq'].map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-md text-center text-sm text-orange-800 dark:text-orange-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* CI/CD */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">CI/CD</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['CircleCI', 'Capistrano'].map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-md text-center text-sm text-indigo-800 dark:text-indigo-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Monitoring */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Monitoramento</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Rollbar', 'Sentry', 'Datadog', 'Elastic', 'New Relic'].map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-pink-50 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800 rounded-md text-center text-sm text-pink-800 dark:text-pink-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Cloud & DevOps</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['AWS (EC2, S3, RDS, DynamoDB)', 'Docker', 'Cloudinary'].map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded-md text-center text-sm text-teal-800 dark:text-teal-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Além do Código</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Quando não estou programando, você pode me encontrar explorando novas tecnologias, 
              lendo blogs de tecnologia ou trabalhando em projetos pessoais. Também gosto de 
              compartilhar conhecimento através de posts no blog e contribuir para projetos de 
              código aberto.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {/* Profile Card */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <Image
                  src="/profile.webp"
                  alt="Fagnner Sousa"
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Fagnner Sousa</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                Desenvolvedor Full-Stack
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  Brasil
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  Disponível para projetos
                </div>
              </div>
            </div>

            {/* Contact Links */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Vamos nos Conectar</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/fassousa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Github className="h-5 w-5 mr-3" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/fagnnersousa/?locale=pt_BR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5 mr-3" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
