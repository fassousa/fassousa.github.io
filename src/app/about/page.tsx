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
              I started my journey in technology several years ago, and since then, 
              I&apos;ve been constantly learning and evolving. I believe in the power of 
              continuous learning and staying up-to-date with the latest technologies 
              and best practices.
            </p>

            <h2 className="text-2xl font-semibold mb-4">What I Do</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I specialize in full-stack web development, with expertise in modern 
              frameworks like Next.js, React, and TypeScript. I&apos;m passionate about 
              creating responsive, accessible, and performant web applications.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Skills & Technologies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {[
                'JavaScript', 'TypeScript', 'React', 'Next.js',
                'Node.js', 'Python', 'HTML/CSS', 'Tailwind CSS',
                'Git', 'Docker', 'PostgreSQL', 'MongoDB'
              ].map((skill) => (
                <div
                  key={skill}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-center text-sm"
                >
                  {skill}
                </div>
              ))}
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
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
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
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Let&apos;s Connect</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/fassousa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="h-5 w-5 mr-3" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/fagnnersousa/?locale=en_US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
