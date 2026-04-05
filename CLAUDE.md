# Portfolio Website - Marcus Daley

## Quick Start
```bash
npm run dev      # Dev server on port 3000
npm run build    # Production build (must show 30/30 pages)
npm run lint     # ESLint check
```

## Project Overview
Professional portfolio for a Navy veteran (9 years submarine service) and Full Sail University graduate (Feb 2026) specializing in game development, tool programming, and graphics engineering. Built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, Three.js, and Framer Motion.

**See also**: `SKILL.md` (patterns, components, design system) and `TOOL.md` (build tools, deployment, debugging)

## Tech Stack
- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript 5.7 (strict)
- **Styling**: Tailwind CSS 4.0 (dark theme, glassmorphism)
- **Animation**: Framer Motion 12, Three.js (3D hero on /hub)
- **Components**: Radix UI primitives, Lucide React icons
- **State**: Zustand 5, nuqs (URL search params)
- **Charts**: Recharts 3
- **Deployment**: Vercel (primary) + Netlify (secondary), GitHub Actions CI

## Design System (Full Sail branded)
- **Gold**: `#FFCC00` (primary — headings, accents, active states)
- **Red**: `#D50032` (secondary — gradient endpoints, CTAs)
- **Blue**: `#3B82F6` (tertiary — tool programming badges only)
- **Backgrounds**: `slate-900` (#0f172a), `slate-800` (#1e293b)
- **NEVER** use generic `blue-400`, `blue-500`, `blue-900`, or `purple-*` — always use the hex values above
- **Fonts**: Cinzel (display), Raleway (body), JetBrains Mono (code) — loaded via `next/font/google`
- **Pattern**: Glassmorphism (`bg-slate-800/50 backdrop-blur-sm border border-slate-700`)
- **Path alias**: `@/*` maps to `./src/*`

## Project Structure
```
src/
  app/                    # 12 pages (30 static paths total)
    layout.tsx            # Root layout: Navbar + Footer + fonts
    page.tsx              # Home: HeroSection, FeaturedProjects, CTASection
    about/                # Journey, education, skills
    projects/             # Filterable grid with GitHub enrichment (ISR 1h)
    projects/[slug]/      # Detail pages (15 slugs via generateStaticParams)
    blog/                 # Blog posts (2 "Coming Soon" placeholders)
    contact/              # Email, GitHub, LinkedIn, availability
    play/                 # Interactive demos (Game of Life, Calculator)
    hub/                  # Three.js 3D hero + mission selector
    service-animal-game/  # Tamagotchi-style care sim
    service-dog-portfolio/# Dog selection experience
    error.tsx             # Route-level error boundary
    global-error.tsx      # Root layout crash handler (standalone HTML)
    not-found.tsx         # Custom 404 with suggested routes
  components/
    layout/               # Navbar.tsx, Footer.tsx
    sections/             # HeroSection, FeaturedProjects, CTASection
    projects/             # ProjectGrid, ProjectCard, CategoryFilter
    demos/                # GameOfLife, Calculator, DemoEmbed
    ui/                   # Button, Card, Nav, Tabs
  data/
    projects.ts           # 15 projects (Project interface + featuredProjects)
    site-config.ts        # Name, URLs, social links
    skills.ts             # Skill categories and proficiency
    approved-games.ts     # Approved playable games list
    projectVideos.ts      # YouTube video ID mapping
  lib/
    github.ts             # GitHub API: fetchGitHubRepos, enrichProjectWithGitHub, fetchRepoReadme
    github-readme.ts      # README parser: extractFirstParagraph, extractSection
    types.ts              # GitHubRepo, EnrichedGitHub interfaces
    utils.ts              # General utilities
    observers/
      deployment-observer.ts  # Observer pattern with re-entrancy guard
public/
  maintenance.html        # Layer 1 fallback (standalone, zero deps)
  images/projects/        # Project thumbnails (placeholder.webp default)
  resume/                 # Marcus_Daley_Resume.pdf
```

## Key Files for Common Tasks
- **Add project**: Add to `src/data/projects.ts`, set `repoName` for GitHub enrichment, add thumbnail
- **Add page**: Create `src/app/{route}/page.tsx`, add to `navLinks` in `src/components/layout/Navbar.tsx`
- **Add blog post**: Edit `src/app/blog/page.tsx` blog post array
- **Update resume**: Replace `public/resume/Marcus_Daley_Resume.pdf`
- **SEO**: Edit `src/data/site-config.ts` for site-wide, or page-level `metadata` export
- **Fix build**: See "Known Issues" section in `TOOL.md`

## Architecture Patterns
- **Observer Pattern**: `src/lib/observers/deployment-observer.ts` — singleton with re-entrancy guard, Promise.allSettled, event queue
- **GitHub ISR**: Build-time enrichment via `fetchGitHubRepos` with 1-hour revalidation
- **Three-Layer Fallback**: maintenance.html (static) + error.tsx (route) + global-error.tsx (root)
- **URL State**: nuqs for project category filters (shareable URLs)

## Deployment
- **Vercel**: Auto-deploys on push to `main`. Config in `vercel.json`
- **Netlify**: Secondary target. Config in `netlify.toml` with `@netlify/plugin-nextjs`
- **CI**: `.github/workflows/build-check.yml` runs `npm run build` on push
- **IMPORTANT**: Deploy to BOTH — keep both config files

## Environment Variables
Copy `.env.example` to `.env.local`:
```
YOUTUBE_API_KEY=         # YouTube Data API v3 (optional)
YOUTUBE_CHANNEL_ID=      # YouTube channel (optional)
NEXT_PUBLIC_SITE_URL=    # Production URL
GITHUB_TOKEN=            # GitHub API rate limits (optional, 60→5000/hr)
```

## Available Skills & Patterns
- `/orchestrate portfolio-build` — Build features (researcher + frontend-builder + reviewer)
- `/orchestrate content-pipeline` — Blog posts and content (researcher + content-creator + reviewer)
- `/orchestrate client-acquisition` — Proposals (researcher + content-creator + business-advisor)
- `/orchestrate business-setup` — Business planning and strategy

## Available Agents
| Agent | Use For |
|-------|---------|
| researcher | Explore codebase patterns before changes |
| frontend-builder | Build pages, components, animations |
| content-creator | Write blog posts, proposals, marketing copy |
| business-advisor | Pricing, client strategy, business decisions |
| reviewer | Code review, build verification, accessibility check |

## Content Guidelines
- Voice: Professional but approachable, technically credible, authentic Navy vet perspective
- Blog posts should showcase technical depth and problem-solving ability
- Project descriptions need: challenge, approach, tech stack, results, video demos
- Marcus has GRADUATED (Feb 2026) — always use past tense for education
- Keep "Available for hire" status accurate via AvailabilityStatus component

## Business Context
Marcus is a freelancer and business owner specializing in:
- Unreal Engine 5 tool programming
- Graphics engineering (Vulkan, GLSL)
- Technical QA and automation
- Game and software development
- AI-assisted development workflows
