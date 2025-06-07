import { Github, Linkedin, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'About - Fagnner Sousa',
  description: 'Learn more about Fagnner Sousa, his background, and what he does.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Hello! I&apos;m Fagnner Sousa, a passionate developer who loves creating digital experiences 
              that make a difference. With a background in web development and a keen 
              eye for design, I enjoy bringing ideas to life through code.
            </p>

            <h2 className="text-2xl font-semibold mb-4">My Journey</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              My journey in tech began years ago, fueled by a lifelong passion for videogames and all things technological. 
              I&apos;m always drawn to the ever-evolving landscape of innovation, a drive that complements my academic background 
              with a major in International Relations and a specialization in Software Engineering. This unique blend allows 
              me to approach technology with a global perspective, constantly seeking to learn, evolve, and stay ahead of the curve.
            </p>

            <h2 className="text-2xl font-semibold mb-4">What I Do</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I&apos;m a web developer with 5 years of experience building user-friendly online products and services. 
              I&apos;ve worked with startups and growing businesses across diverse industries like e-commerce, communication platforms, 
              and financial services. My focus is on creating scalable solutions that deliver real value.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Skills & Technologies</h2>
            
            {/* Languages */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Languages</h3>
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
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Frameworks/Libraries</h3>
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
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Databases</h3>
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
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Testing</h3>
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
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Tools</h3>
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
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Monitoring</h3>
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

            <h2 className="text-2xl font-semibold mb-4">Beyond Code</h2>
            <p className="text-gray-600 dark:text-gray-300">
              When I&apos;m not coding, you can find me exploring new technologies, 
              reading tech blogs, or working on personal projects. I also enjoy 
              sharing knowledge through blog posts and contributing to open-source 
              projects.
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
                Full-Stack Developer
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  Brazil
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  Available for projects
                </div>
              </div>
            </div>

            {/* Contact Links */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Let&apos;s Connect</h3>
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
                  href="https://www.linkedin.com/in/fagnnersousa/?locale=en_US"
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
