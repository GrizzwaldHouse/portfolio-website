# Marcus Daley — Game Developer & Systems Engineer

Professional portfolio showcasing game development, tool programming, graphics engineering, and AI-driven automation. Built with Next.js 15, React 19, TypeScript, Three.js, and Tailwind CSS 4.

[![Build Check](https://github.com/GrizzwaldHouse/portfolio-website/actions/workflows/build-check.yml/badge.svg)](https://github.com/GrizzwaldHouse/portfolio-website/actions/workflows/build-check.yml)

## About

U.S. Navy veteran with 9 years of submarine service. Full Sail University graduate (Game Development, February 2026, 3.8+ GPA). Specializing in:

- **Unreal Engine 5** tool programming, behavior trees, and gameplay systems
- **Graphics engineering** with Vulkan API, GLSL shaders, and PBR rendering
- **AI-assisted development** with MCP integration, autonomous agents, and LLM orchestration
- **Full-stack web development** with Next.js, React, and TypeScript

## Featured Projects

| Project | Tech | Description |
|---------|------|-------------|
| **Quidditch AI Flight System** | C++, UE5.4, Behavior Trees | AI agents with autonomous flight navigation and Blackboard-driven decision making |
| **IslandEscape Survival Game** | C++, UE5.4, Blueprints | Teleporter systems, voxel weapons, modular health components |
| **MCP Command Panel** | C++, Python, FastAPI | Bridge between AI models (Claude, Gemini) and Unreal Editor via HTTP/TCP |
| **Vulkan 3D Renderer** | C++, Vulkan, GLSL, CMake | Custom PBR renderer with 35% performance optimization |
| **BrightForge** | Node.js, Python, Ollama | Hybrid CLI agent with local/cloud LLM orchestration |
| **HoneyBadgerVault** | Python, AI Agents, Security | Autonomous agent for secure vault management and intelligent automation |
| **Developer Productivity Tracker** | C++, UE5, Editor Plugin | Real-time coding session and build metrics dashboard |

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript 5.7 (strict mode)
- **Styling**: Tailwind CSS 4.0 (Full Sail branded dark theme)
- **3D/Animation**: Three.js, Framer Motion 12
- **Components**: Radix UI, Lucide React, Recharts 3
- **State**: Zustand 5, nuqs (URL search params)
- **Deployment**: Vercel (primary) + Netlify (secondary)
- **CI**: GitHub Actions (build verification on push)

## Design System

Full Sail University branded with a game-dev aesthetic:

| Element | Value |
|---------|-------|
| Primary | `#FFCC00` (gold) |
| Secondary | `#D50032` (red) |
| Accent | `#3B82F6` (blue) |
| Background | `slate-900` / `slate-800` |
| Display font | Cinzel |
| Body font | Raleway |
| Code font | JetBrains Mono |
| Effects | Scanline overlay, CRT vignette, neon glow, glassmorphism |

## Architecture Highlights

- **Observer Pattern** with re-entrancy guard for deployment event system
- **Three-layer error fallback**: static HTML + error boundaries + CI/CD monitoring
- **GitHub ISR enrichment**: project cards auto-update with stars, language, last push
- **README parsing**: GitHub READMEs auto-populate project descriptions at build time

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```
YOUTUBE_API_KEY=           # YouTube Data API v3 key (optional)
YOUTUBE_CHANNEL_ID=        # Your YouTube channel ID (optional)
NEXT_PUBLIC_SITE_URL=      # Production URL
GITHUB_TOKEN=              # GitHub API token for higher rate limits (optional)
```

## Deployment

| Platform | Config | Trigger |
|----------|--------|---------|
| Vercel | `vercel.json` | Auto-deploy on push to `main` |
| Netlify | `netlify.toml` | Auto-deploy on push to `main` |
| GitHub Actions | `.github/workflows/build-check.yml` | Build verification on push |

Both Vercel and Netlify are configured for redundancy. Vercel keeps the last successful deployment live if a build fails.

## Project Structure

```
src/
  app/              # 12 pages (30 static paths)
  components/       # Layout, sections, projects, demos, UI
  data/             # Projects (15), skills, site config
  lib/              # GitHub API, README parser, Observer, types
public/
  maintenance.html  # Standalone fallback page
  images/           # Project thumbnails, profile photos
  resume/           # Downloadable resume PDF
tests/
  portfolio.test.ts # 50 test methods across 9 suites
```

## Connect

- [Portfolio](https://marcusdaley.dev)
- [LinkedIn](https://www.linkedin.com/in/marcusdaley-gamedev)
- [GitHub](https://github.com/GrizzwaldHouse)
- [YouTube](https://www.youtube.com/@marcusldaley)
- Email: daleym12@gmail.com

## License

All rights reserved. This portfolio and its content are proprietary.
