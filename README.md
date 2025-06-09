# Personal Website & Blog

A modern, fast, and beautiful personal website built with Next.js, featuring a blog with an admin interface and dark mode support. Optimized for GitHub Pages deployment with Static Site Generation (SSG).

🌐 **Live Site**: [https://fassousa.github.io/](https://fassousa.github.io/)

## ✨ Features

- **🚀 Fast & Modern**: Built with Next.js 15 and TypeScript
- **📱 Responsive Design**: Beautiful UI with Tailwind CSS
- **🌙 Dark Mode**: Automatic theme switching with system preference detection
- **📝 Blog System**: Markdown-based blog with dynamic routing
- **👨‍💻 Admin Interface**: Password-protected editor for creating and editing posts
- **🔍 SEO Optimized**: Built-in metadata and Open Graph support
- **📊 Static Site Generation**: Pre-rendered pages for optimal performance
- **🆓 Free Hosting**: Configured for GitHub Pages deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fassousa/fassousa.github.io.git
cd fassousa.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
fassousa.github.io/
├── content/
│   └── blog/                 # Markdown blog posts
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── admin/           # Admin interface
│   │   ├── blog/            # Blog pages
│   │   └── about/           # About page
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript definitions
├── public/                  # Static assets
└── .github/                 # GitHub workflows and config
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run export` - Build and export static files
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Content Management

### Creating Blog Posts

1. **Using the Admin Interface** (Recommended):
   - Navigate to `/admin`
   - Enter the admin password
   - Click "New Post" to create content with live preview

2. **Manual Creation**:
   - Add markdown files to `content/blog/`
   - Include frontmatter with title, date, excerpt, and tags

### Blog Post Format

```markdown
---
title: "Your Post Title"
date: "2025-06-07"
excerpt: "A brief description of your post"
tags: ["tag1", "tag2"]
published: true
---

# Your Content Here

Write your blog post content using Markdown syntax.
```

## 🎨 Development

### Local Development

To work on this project locally:

1. **Clone and Setup**:
   ```bash
   git clone https://github.com/fassousa/fassousa.github.io.git
   cd fassousa.github.io
   npm install
   ```

2. **Development Server**:
   ```bash
   npm run dev
   ```

3. **Build and Test**:
   ```bash
   npm run build
   npm run export
   ```

## 🚀 Deployment

### GitHub Pages

This site is automatically deployed to GitHub Pages:

1. Push changes to the main branch
2. GitHub Actions automatically builds and deploys
3. Site is available at [https://fassousa.github.io/](https://fassousa.github.io/)

### Alternative Platforms

This static site can also be deployed to:
- Vercel
- Netlify  
- Cloudflare Pages
- Any static hosting service

## 🛡️ Security

- Admin interface uses client-side authentication
- Password-protected content management
- Static site generation for optimal security

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Markdown**: remark & remark-html
- **Deployment**: GitHub Pages with Static Site Generation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Fagnner Sousa**
