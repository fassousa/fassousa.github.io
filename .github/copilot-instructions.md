# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js personal webpage project with the following features:

## Project Structure
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Features**: Dark mode toggle, blog functionality, private admin editor
- **Deployment**: GitHub Pages with static site generation (SSG)

## Key Components
- Home page with personal introduction
- Blog section with dynamic post loading from markdown files
- Dark/light theme toggle with system preference detection
- Private admin panel for blog post editing (password protected)
- Responsive design for mobile and desktop

## Coding Guidelines
- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Use Tailwind CSS classes for styling
- Implement proper SEO with metadata API
- Use static generation for optimal performance
- Keep components modular and reusable
- Implement proper error handling and loading states

## Blog System
- Blog posts stored as markdown files in `/content/blog/`
- Support for frontmatter metadata (title, date, excerpt, tags)
- Dynamic routing for individual blog posts
- Admin interface for creating/editing posts (password protected)

## Deployment
- Configure for GitHub Pages static export
- Use `next export` for static site generation
- Implement proper base path configuration for GitHub Pages
