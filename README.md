# Portfolio Platform

A production-grade portfolio system designed for game developers, graphics engineers, and technical professionals. Features interactive project demos, automated GitHub sync, and a configurable template system.

[![Runtime Build Check](https://github.com/GrizzwaldHouse/portfolio-website/actions/workflows/runtime-build-check.yml/badge.svg)](https://github.com/GrizzwaldHouse/portfolio-website/actions/workflows/runtime-build-check.yml)
[![Template Integrity](https://github.com/GrizzwaldHouse/portfolio-website/actions/workflows/template-integrity-check.yml/badge.svg)](https://github.com/GrizzwaldHouse/portfolio-website/actions/workflows/template-integrity-check.yml)

---

## Features

### For Portfolio Owners

- **Interactive Demos** - Play games directly in the browser via itch.io embeds
- **Terminal Simulations** - Demonstrate CLI tools with interactive terminal emulators
- **Video Galleries** - Showcase development progress with embedded YouTube videos
- **Automatic Project Discovery** - Sync projects from GitHub with intelligent classification
- **Professional Presentation** - Recruiter-ready UI with clear technical communication

### For Template Users

- **Single Config File** - Customize everything via `template.config.ts`
- **Client Mode** - Switch between developer portfolio and business/freelance presentation
- **Commercial-Safe Hosting** - Deploy to Cloudflare Pages (free tier, commercial allowed)
- **GitHub Actions** - Automated validation and build checks

---

## Quick Start

### Use as Template

1. Click "Use this template" on GitHub
2. Clone your new repository
3. Edit `template.config.ts` with your information
4. Run `npm install && npm run dev`
5. Deploy to Cloudflare Pages

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve out
```

---

## Configuration

All customization happens in `template.config.ts`:

```typescript
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Title',
  tagline: 'Your tagline here',
  // ...
};

export const brandConfig = {
  colors: {
    primary: '#3B82F6',
    accent: '#FFCC00',
    // ...
  },
};

export const featureFlags = {
  mode: 'developer', // or 'client' for business mode
  demos: {
    enabled: true,
    staticEmbed: true,
    terminal: true,
  },
};
```

See [template.config.ts](./template.config.ts) for all options.

---

## Project Structure

```
portfolio-website/
├── src/
│   ├── app/                    # Next.js pages
│   ├── components/
│   │   └── demos/              # Interactive demo components
│   ├── data/
│   │   └── projects.ts         # Project definitions
│   └── lib/
│       ├── project-discovery/  # GitHub sync system
│       └── renderer-service/   # 3D renderer (coming soon)
├── docs/
│   ├── DEPLOYMENT.md           # Deployment guide
│   ├── BRAND_IDENTITY.md       # Visual design system
│   └── DOMAIN_SETUP.md         # Domain configuration
├── .github/workflows/          # CI/CD automation
├── template.config.ts          # Template customization
└── wrangler.toml               # Cloudflare Pages config
```

---

## Demo Types

| Type | Description | Status |
|------|-------------|--------|
| Static Embed | itch.io games, CodePen, etc. | ✅ Available |
| Terminal | CLI tool simulations | ✅ Available |
| Video | YouTube galleries | ✅ Available |
| WebGL Viewer | 3D model inspection | 🔜 Coming Soon |
| WASM Games | Full browser games | 🔜 Coming Soon |

---

## Deployment

This portfolio deploys to **Cloudflare Pages** (free tier, commercial use allowed).

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login
wrangler login

# Build & Deploy
npm run build
wrangler pages deploy out --project-name=your-portfolio
```

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

---

## GitHub Actions

Three automated checks run on every push:

1. **Portfolio Sync Validator** - Validates project data structure
2. **Runtime Build Check** - Ensures the site builds successfully
3. **Template Integrity Check** - Verifies template customization points

---

## Roadmap

### Current (v1.0)

- [x] Interactive demo system (embeds, terminal)
- [x] GitHub project discovery
- [x] Template configuration layer
- [x] Commercial-safe deployment
- [x] Automated CI/CD

### Planned (v2.0)

- [ ] WebGL 3D model viewer
- [ ] WASM game runtime
- [ ] Blog/writing section
- [ ] Project filtering and search
- [ ] Analytics integration (privacy-respecting)

### Future (v3.0)

- [ ] 3D Renderer service (paid feature)
- [ ] AI portfolio assistant
- [ ] Custom integrations API

---

## Documentation

| Document | Description |
|----------|-------------|
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | How to deploy to Cloudflare Pages |
| [BRAND_IDENTITY.md](./docs/BRAND_IDENTITY.md) | Visual design system and image prompts |
| [DOMAIN_SETUP.md](./docs/DOMAIN_SETUP.md) | Custom domain configuration |
| [EMBEDDED_PROJECT_RUNTIME.md](./docs/EMBEDDED_PROJECT_RUNTIME.md) | Demo runtime architecture |

---

## License

This project is available as a template for personal and commercial use.

- **Portfolio Content:** Specific to the original author
- **Template Code:** MIT License - free to use, modify, and distribute

---

## Credits

Built with:
- [Next.js 15](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

---

*For questions or issues, please open a GitHub issue.*
