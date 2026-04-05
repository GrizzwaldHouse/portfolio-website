# Portfolio Website — Tools & Commands Reference

Quick-reference for build tools, deployment configs, CI/CD, and debugging.
Prevents Claude Code from re-discovering these each session.

## Build Commands

| Command | Purpose | Expected Output |
|---------|---------|-----------------|
| `npm run dev` | Start dev server (port 3000) | "Ready in ~1200ms" |
| `npm run build` | Production build | "Generating static pages (30/30)" |
| `npm run start` | Serve production build | Serves .next output |
| `npm run lint` | ESLint check | May show warnings (builds ignore lint) |
| `npx tsc --noEmit` | TypeScript type check only | Exit 0 = no errors |

## Build Configuration

### next.config.ts
```
eslint.ignoreDuringBuilds: true       ← Skip ESLint during build (avoids circular structure error)
typescript.ignoreBuildErrors: false    ← TypeScript errors DO fail the build
images.remotePatterns:                 ← GitHub avatars + YouTube thumbnails
headers:                               ← CSP, X-Frame-Options, X-Content-Type-Options
```

### Known Build Issues

**Stale .next cache (MODULE_NOT_FOUND)**
- Symptom: `Cannot find module './586.js'` or `./vendor-chunks/nuqs.js`
- Cause: Dev server populates .next with chunks that go stale after code changes
- Fix:
  ```bash
  # Stop dev server first!
  powershell -Command "Remove-Item -Recurse -Force 'D:\portfolio-website\.next'"
  npm run build
  npm run dev
  ```

**ESLint circular structure**
- Symptom: `Converting circular structure to JSON` during `npm run build`
- Cause: eslint-config-next 16.x + ESLint 9 flat config interaction
- Fix: `eslint.ignoreDuringBuilds: true` in next.config.ts (already set)

**Port 3000 in use**
- Symptom: `EADDRINUSE` when starting dev server
- Fix:
  ```bash
  netstat -ano | findstr :3000 | findstr LISTENING
  powershell -Command "Stop-Process -Id <PID> -Force"
  ```

## Deployment

### Vercel (Primary)
- **Config**: `vercel.json` in repo root
- **Trigger**: Auto-deploys on push to `main`
- **Route**: `/maintenance` → `maintenance.html`
- **Caching**: Static assets 1 year, images 1 day

### Netlify (Secondary)
- **Config**: `netlify.toml` in repo root
- **Plugin**: `@netlify/plugin-nextjs`
- **Node**: v20 (set in `[build.environment]`)
- **Publish**: `.next` directory
- **Team**: https://app.netlify.com/teams/daleym12/projects

### GitHub Actions
- **File**: `.github/workflows/build-check.yml`
- **Trigger**: Push to `main`
- **Steps**: Checkout → Node 20 → `npm ci` → `npm run build`
- **Purpose**: Early warning — if this fails, Vercel deploy will also fail

## Security Headers (next.config.ts)

| Header | Value |
|--------|-------|
| X-Frame-Options | DENY |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | origin-when-cross-origin |
| CSP default-src | 'self' |
| CSP img-src | 'self' data: https: |
| CSP script-src | 'self' 'unsafe-eval' 'unsafe-inline' |
| CSP style-src | 'self' 'unsafe-inline' |
| CSP font-src | 'self' https://fonts.gstatic.com |
| CSP connect-src | 'self' https://api.github.com |
| CSP frame-src | 'self' https://www.youtube.com https://play.unity.com |

**Known security issues (from Red/Blue team audit):**
- `unsafe-eval` + `unsafe-inline` in CSP (needed for Next.js dev, should tighten for production)
- YouTube iframes lack `sandbox` attribute
- No HSTS or Permissions-Policy headers in next.config.ts (Netlify has them in netlify.toml)

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `YOUTUBE_API_KEY` | Optional | YouTube Data API v3 for dev log automation |
| `YOUTUBE_CHANNEL_ID` | Optional | YouTube channel for video fetching |
| `NEXT_PUBLIC_SITE_URL` | Optional | Production URL for OG meta tags |
| `GITHUB_TOKEN` | Optional | Higher GitHub API rate limits (60/hr → 5000/hr) |

Copy `.env.example` to `.env.local` to set these locally.

## Dependencies

### Runtime
| Package | Version | Purpose |
|---------|---------|---------|
| next | ^15.1.6 | Framework |
| react / react-dom | ^19.0.0 | UI library |
| three / @types/three | ^0.182.0 | 3D hero (hub page) |
| framer-motion | ^12.29.2 | Animations |
| zustand | ^5.0.11 | State management |
| recharts | ^3.7.0 | Charts in project details |
| nuqs | ^2.8.8 | URL search params state (project filters) |
| lucide-react | ^0.563.0 | Icons |
| @radix-ui/react-tabs | ^1.1.13 | Accessible tab components |
| @radix-ui/react-slot | ^1.2.4 | Slot component |
| clsx + tailwind-merge | latest | Class name utilities |
| class-variance-authority | ^0.7.1 | Component variant system |

### Dev
| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5.7.3 | Type checking |
| tailwindcss | ^4.0.0 | Styling |
| @tailwindcss/postcss | ^4.1.18 | PostCSS plugin |
| eslint | ^9.39.2 | Linting |
| eslint-config-next | ^16.1.2 | Next.js ESLint rules |

### Not Yet Installed (tests)
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```
Test file exists at `tests/portfolio.test.ts` (50 tests, 9 suites) but deps aren't installed yet.

## File System Layout

```
D:\portfolio-website\
├── .github/workflows/build-check.yml   # CI: build verification on push
├── .claude/                             # Claude Code config + skills
├── public/
│   ├── maintenance.html                 # Layer 1 fallback (standalone)
│   ├── images/projects/placeholder.webp # Default project thumbnail
│   ├── resume/                          # Resume PDF
│   └── hub.html                         # Static hub page
├── src/
│   ├── app/                             # Next.js App Router pages
│   │   ├── layout.tsx                   # Root layout (Navbar + Footer)
│   │   ├── globals.css                  # Tailwind + theme effects
│   │   ├── error.tsx                    # Route error boundary
│   │   ├── global-error.tsx             # Root error boundary
│   │   ├── not-found.tsx                # Custom 404
│   │   └── [route]/page.tsx             # Page components
│   ├── components/                      # React components
│   │   ├── layout/                      # Navbar, Footer
│   │   ├── sections/                    # HeroSection, FeaturedProjects, CTA
│   │   ├── projects/                    # ProjectGrid, ProjectCard, CategoryFilter
│   │   ├── demos/                       # GameOfLife, Calculator, DemoEmbed
│   │   └── ui/                          # Button, Card, Nav, Tabs
│   ├── data/                            # Static data (projects, skills, config)
│   └── lib/                             # Utilities, GitHub API, types
│       └── observers/                   # DeploymentObserver (Observer pattern)
├── tests/portfolio.test.ts              # 50 test methods (vitest)
├── scripts/                             # Build helper scripts
├── CLAUDE.md                            # Claude Code project instructions
├── SKILL.md                             # Skills & patterns quick-reference
├── TOOL.md                              # This file
├── ARCHITECTURE.pdf                     # Full platform vision document
├── next.config.ts                       # Next.js configuration
├── vercel.json                          # Vercel deployment config
├── netlify.toml                         # Netlify deployment config
├── tsconfig.json                        # TypeScript config
└── package.json                         # Dependencies & scripts
```

## Windows-Specific Notes (Git Bash sandbox)

| Task | Command |
|------|---------|
| Delete directory | `powershell -Command "Remove-Item -Recurse -Force 'path'"` |
| Kill process by PID | `powershell -Command "Stop-Process -Id <PID> -Force"` |
| Find process on port | `netstat -ano \| findstr :3000 \| findstr LISTENING` |
| Create directory | `mkdir -p path` (Git Bash) or `powershell -Command "New-Item -ItemType Directory -Path 'path'"` |
| Run PowerShell script | `powershell -ExecutionPolicy Bypass -File script.ps1` |

**Do NOT use**: `rd`, `rmdir`, `taskkill /PID` — these fail in Git Bash.
**Do NOT use**: `$variable` in inline powershell commands via bash — bash interprets `$` first. Write a `.ps1` script file instead.

## Audit Results (Last Session)

| Metric | Score |
|--------|-------|
| Security | B+ (2 High, 4 Medium, 3 Low issues) |
| Functionality | A (all 50+ buttons verified working) |
| Accessibility | A (proper focus rings, aria labels, semantic HTML) |
| UI Design | 8.2/10 (production ready) |
| Build | 30/30 pages, zero errors |
| Bundle | 102 kB shared JS, largest page 7.27 kB (hub) |
