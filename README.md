# Personal Website & Blog

A modern, fast, and beautiful personal website built with Next.js, featuring a blog with an admin interface and dark mode support. Optimized for GitHub Pages deployment with Static Site Generation (SSG).

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
git clone <your-repo-url>
cd personal-page
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
personal-page/
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
   - Enter password: `your-secure-password`
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

## 🎨 Customization

### Personal Information

Update the following files with your information:

1. **src/app/page.tsx** - Hero section and social links
2. **src/app/about/page.tsx** - About page content
3. **src/components/header.tsx** - Navigation and site name
4. **src/app/layout.tsx** - Site metadata

### Admin Password

⚠️ **Important**: Change the admin password in `src/lib/auth.ts`:

```typescript
const ADMIN_PASSWORD = 'your-secure-password'; // Change this!
```

### GitHub Pages Configuration

Update `next.config.ts` for your repository:

```typescript
const nextConfig = {
  // ... other config
  basePath: '/your-repo-name',        // Your GitHub repository name
  assetPrefix: '/your-repo-name/',
};
```

## 🚀 Deployment

### GitHub Pages

1. Update the repository name in `next.config.ts`
2. Build and export:
   ```bash
   npm run export
   ```
3. Deploy the `out` folder to GitHub Pages
4. Or use GitHub Actions for automatic deployment

### Other Platforms

This static site can be deployed to:
- Vercel
- Netlify  
- Cloudflare Pages
- Any static hosting service

## 🛡️ Security Notes

- The admin interface uses client-side authentication for demo purposes
- For production, implement proper server-side authentication
- Change the default admin password before deployment
- Consider adding rate limiting for the admin interface

## 🤝 Contributing

This is a personal website template. Feel free to fork and customize it for your own use!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Markdown processing with [remark](https://remark.js.org/)

---

**Happy blogging!** 🎉
