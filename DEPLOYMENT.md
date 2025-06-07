# GitHub Pages Deployment Guide

This guide will help you deploy your personal webpage to GitHub Pages using GitHub Actions.

## Prerequisites

1. **GitHub Repository**: Make sure your code is in a GitHub repository
2. **Repository Settings**: You need to configure GitHub Pages in your repository settings

## Step 1: Push Your Code to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Personal webpage with blog system"

# Add your GitHub repository as remote (replace with your actual repo URL)
git remote add origin https://github.com/fassousa/personal-page.git

# Push to main branch
git push -u origin main
```

## Step 2: Configure GitHub Pages in Repository Settings

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

## Step 3: GitHub Actions Workflow (Already Created)

The GitHub Actions workflow file has been created at `.github/workflows/deploy.yml`. This workflow will:

- Trigger on every push to the `main` branch
- Install Node.js and dependencies
- Build your Next.js site with static export
- Deploy the built files to GitHub Pages

## Step 4: Repository Permissions

Make sure your repository has the correct permissions:

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**

## Step 5: Deploy

Once everything is set up:

1. Push any changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Add deployment workflow"
   git push
   ```

2. GitHub Actions will automatically:
   - Build your site
   - Deploy it to GitHub Pages
   - Make it available at: `https://fassousa.github.io/personal-page/`

## Step 6: Custom Domain (Optional)

If you want to use a custom domain:

1. In your repository, go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain name
3. Create a `CNAME` file in your repository root with your domain
4. Configure your domain's DNS to point to GitHub Pages

## Monitoring Deployments

- Go to the **Actions** tab in your repository to see deployment status
- Each push will trigger a new deployment
- Green checkmark = successful deployment
- Red X = failed deployment (check logs for errors)

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check the Actions logs for detailed error messages
2. **404 Errors**: Make sure `basePath` in `next.config.ts` matches your repository name
3. **Missing Files**: Ensure all files are committed and pushed to the repository

### Useful Commands:

```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run lint

# View git status
git status

# View commit history
git log --oneline
```

## Next Steps

After successful deployment:

1. **Update About Page**: Add your personal information and skills
2. **Create Blog Posts**: Use the `/admin` interface to write your first posts
3. **Customize Styling**: Modify components and styles as needed
4. **Add Analytics**: Consider adding Google Analytics or similar
5. **SEO Optimization**: Update meta tags and add sitemap

Your personal webpage will be live at: `https://fassousa.github.io/personal-page/`

## File Structure for GitHub Pages

```
personal-page/
├── .github/workflows/deploy.yml  # GitHub Actions workflow
├── next.config.ts               # Next.js config with static export
├── package.json                 # Updated build script
└── src/                        # Your application code
```
