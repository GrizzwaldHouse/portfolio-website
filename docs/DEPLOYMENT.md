# Deployment Guide

> How to deploy the portfolio to Cloudflare Pages (or alternative platforms)

**Last Updated:** 2026-01-22

---

## Why Cloudflare Pages?

The portfolio migrated from Vercel to Cloudflare Pages for the following reasons:

| Concern | Vercel Free | Cloudflare Pages |
|---------|-------------|------------------|
| Commercial use | Restricted on free tier | Allowed |
| Bandwidth | 100GB/month | Unlimited |
| Build minutes | 6000/month | 500/month |
| Custom domains | Yes | Yes |
| HTTPS | Yes | Yes (automatic) |
| Global CDN | Yes | Yes |

**Bottom line:** Cloudflare Pages allows commercial use, freelance templates, and product demos without upgrading to a paid tier.

---

## Quick Start

### Option 1: Cloudflare Pages Dashboard

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your GitHub account
3. Select the `portfolio-website` repository
4. Configure build settings:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
5. Deploy

### Option 2: Wrangler CLI

```bash
# Install wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy to Pages
wrangler pages deploy out --project-name=portfolio
```

### Option 3: GitHub Actions (Automated)

The repository includes a GitHub Action that deploys on push to `main`. To enable:

1. Add `CLOUDFLARE_API_TOKEN` to your repository secrets
2. Add `CLOUDFLARE_ACCOUNT_ID` to your repository secrets
3. Push to `main` branch

---

## Build Configuration

### Next.js Static Export

The portfolio uses Next.js static export (`output: 'export'`) for maximum hosting compatibility.

```javascript
// next.config.js
module.exports = {
  output: 'export',        // Static HTML export
  trailingSlash: true,     // Required for static hosting
  images: {
    unoptimized: true,     // No image optimization API
  },
};
```

### Build Output

After running `npm run build`, the `out/` directory contains:

```
out/
├── index.html           # Homepage
├── about/
│   └── index.html       # About page
├── projects/
│   └── index.html       # Projects page
├── contact/
│   └── index.html       # Contact page
├── _next/
│   └── static/          # JS/CSS bundles
└── images/              # Static images
```

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Base URL for the site | Yes (for SEO) |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token (CI only) | For automated deploys |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID (CI only) | For automated deploys |

### Setting Environment Variables

**Cloudflare Dashboard:**
1. Go to Pages → your project → Settings → Environment variables
2. Add variables for Production and Preview environments

**GitHub Actions:**
1. Go to Settings → Secrets and variables → Actions
2. Add repository secrets

---

## Custom Domain Setup

### Add Domain in Cloudflare

1. Go to Pages → your project → Custom domains
2. Click "Set up a custom domain"
3. Enter your domain (e.g., `marcusdaley.dev`)
4. Follow DNS configuration instructions

### DNS Configuration

If your domain is on Cloudflare:
- DNS records are configured automatically

If your domain is elsewhere:
- Add a CNAME record pointing to `your-project.pages.dev`

### SSL/HTTPS

Cloudflare Pages provides automatic SSL certificates. No configuration needed.

---

## Alternative Platforms

If you prefer a different platform, the static export works with:

### GitHub Pages

```yaml
# .github/workflows/deploy-gh-pages.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### Netlify

1. Connect repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out`

### Render

1. Create a new Static Site
2. Connect repository
3. Build command: `npm run build`
4. Publish directory: `out`

---

## Troubleshooting

### Build Fails with Font Error

The build requires network access to fetch Google Fonts. If building in an isolated environment:

```bash
# Skip font optimization
NEXT_FONT_GOOGLE_SKIP=true npm run build
```

### 404 on Page Refresh

Static hosting requires proper routing configuration. With `trailingSlash: true`, ensure:
- URLs end with `/` (e.g., `/about/` not `/about`)
- Server is configured to serve `index.html` for directory paths

### Images Not Loading

With static export, images must use `unoptimized: true`:

```javascript
// next.config.js
images: {
  unoptimized: true,
}
```

---

## Performance Verification

After deployment, verify:

1. **SSL Certificate:** Check padlock icon in browser
2. **Page Speed:** Run Lighthouse audit (target: 90+ performance)
3. **All Pages Load:** Test each route directly
4. **Assets Load:** Check network tab for 404s
5. **Embeds Work:** Test YouTube and itch.io embeds

---

## Rollback

### Cloudflare Pages

1. Go to Pages → your project → Deployments
2. Find the previous working deployment
3. Click "..." → "Rollback to this deployment"

### Manual

```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

---

*For more information, see the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/).*
