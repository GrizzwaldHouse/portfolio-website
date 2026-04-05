import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portfolio Architecture: Observer Pattern and Three-Layer Fallback',
  description:
    'A technical walkthrough of the architecture decisions behind this portfolio — the Observer pattern with re-entrancy guard, three-layer error fallback, and ISR-powered GitHub enrichment.',
};

export default function PortfolioArchitecturePost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900">
      <article className="container mx-auto px-6 py-20 max-w-3xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FFCC00] transition-colors mb-10"
        >
          <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFCC00] to-[#D50032] bg-clip-text text-transparent leading-tight">
            Portfolio Architecture: Observer Pattern and Three-Layer Fallback
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <time dateTime="2026-03">March 2026</time>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>10 min read</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Next.js 15', 'TypeScript', 'Observer Pattern', 'ISR', 'Architecture'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full text-sm border border-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">
          {/* Intro */}
          <p className="text-lg">
            A portfolio site should be the simplest thing a developer builds. Mine is not. Not
            because I over-engineered it for the sake of complexity, but because a portfolio is the
            one project where every architectural decision is visible to the people evaluating your
            work. This post walks through three patterns I chose and why.
          </p>

          {/* Why Architecture Matters */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Why a Portfolio Needs Architecture
          </h2>
          <p>
            Most portfolio sites are static pages with some CSS. That works fine if you are
            showcasing design. When your specialty is systems engineering and tool programming,
            the portfolio itself needs to demonstrate those skills. Hiring managers looking for
            someone who can architect game systems want to see architectural thinking — even in a
            web project.
          </p>
          <p>
            This site runs on Next.js 15 with React 19, TypeScript, Tailwind CSS 4, Three.js for
            the 3D hub, and Framer Motion for animations. It deploys to both Vercel and Netlify for
            redundancy. Under that stack, three patterns define the architecture.
          </p>

          {/* Observer Pattern */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Pattern 1: Observer with Re-Entrancy Guard
          </h2>
          <p>
            The deployment observer manages events like build status changes, configuration updates,
            and theme switches. Subscribers register handlers, and the observer dispatches events to
            all of them using <code className="font-mono text-[#FFCC00] bg-slate-800 px-1.5 py-0.5 rounded text-sm">Promise.allSettled</code> so
            a single failing handler does not block the rest.
          </p>
          <p>
            The re-entrancy guard solves a subtle problem. If an observer handler emits another
            event during processing (for example, a theme change triggers a config update), the
            naive approach would recurse into the emit function and potentially deadlock or
            process events out of order.
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 my-6 overflow-x-auto">
            <pre className="font-mono text-sm text-gray-300 whitespace-pre">
{`// Re-entrancy guard in the DeploymentObserver
async emit(event: PortfolioEvent): Promise<ObserverResult[]> {
  // If we're already emitting, queue instead of recursing
  if (this.emitting) {
    this.eventQueue.push(event);
    return [];
  }

  this.emitting = true;
  try {
    // Dispatch to all observers with Promise.allSettled
    // Failed observers get one automatic retry
    const settled = await Promise.allSettled(
      observerList.map(observer => observer(event))
    );
    // ... process results
  } finally {
    this.emitting = false;
  }

  // Drain queued events after current emission completes
  while (this.eventQueue.length > 0) {
    const queued = this.eventQueue.shift();
    if (queued) await this.emit(queued);
  }
}`}
            </pre>
          </div>

          <p>
            The guard sets a boolean flag during emission. Events arriving while the flag is set
            go into a queue. Once the current emission completes, the queue drains sequentially.
            This guarantees every event is processed exactly once, in order, without recursion.
          </p>
          <p>
            This is the same pattern I use in Unreal Engine for delegate-based event systems. The
            domain changed (web instead of game engine), but the problem — safe asynchronous event
            dispatching — is identical.
          </p>

          {/* Three-Layer Fallback */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Pattern 2: Three-Layer Error Fallback
          </h2>
          <p>
            A portfolio that crashes during a hiring manager&apos;s visit is worse than having no
            portfolio. The fallback strategy has three layers, each catching failures the previous
            layer cannot handle.
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 my-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFCC00]/20 border border-[#FFCC00]/40 flex items-center justify-center text-[#FFCC00] font-bold text-sm">1</span>
                <div>
                  <h4 className="text-white font-semibold">Route-level error boundary</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    <code className="font-mono text-[#FFCC00] bg-slate-800 px-1 py-0.5 rounded text-xs">error.tsx</code> catches
                    exceptions within any route segment. It renders a styled error page inside the
                    existing layout (Navbar and Footer remain visible) with a &quot;Try Again&quot;
                    button that calls React&apos;s <code className="font-mono text-[#FFCC00] bg-slate-800 px-1 py-0.5 rounded text-xs">reset()</code> to
                    re-render the segment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFCC00]/20 border border-[#FFCC00]/40 flex items-center justify-center text-[#FFCC00] font-bold text-sm">2</span>
                <div>
                  <h4 className="text-white font-semibold">Root layout crash handler</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    <code className="font-mono text-[#FFCC00] bg-slate-800 px-1 py-0.5 rounded text-xs">global-error.tsx</code> activates
                    when the root layout itself fails. Because the layout (and its CSS, fonts, and
                    components) may be broken, this file renders standalone HTML with inline styles.
                    No external dependencies — it works even if the entire component tree is down.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFCC00]/20 border border-[#FFCC00]/40 flex items-center justify-center text-[#FFCC00] font-bold text-sm">3</span>
                <div>
                  <h4 className="text-white font-semibold">Static maintenance page</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    <code className="font-mono text-[#FFCC00] bg-slate-800 px-1 py-0.5 rounded text-xs">public/maintenance.html</code> is
                    a zero-dependency static file served directly by the CDN. If Next.js itself
                    fails to boot — a bad deployment, a runtime crash in the server — the CDN can
                    serve this page with contact information and a professional message.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p>
            Each layer is independent. Layer 2 does not import from Layer 1. Layer 3 does not use
            React at all. This isolation means a failure in one layer cannot cascade into the next.
          </p>

          {/* ISR Strategy */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Pattern 3: ISR-Powered GitHub Enrichment
          </h2>
          <p>
            The projects page displays live data from GitHub — stars, last push date, primary
            language — alongside curated descriptions. This data is fetched at build time using
            Next.js Incremental Static Regeneration (ISR) with a one-hour revalidation window.
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 my-6 overflow-x-auto">
            <pre className="font-mono text-sm text-gray-300 whitespace-pre">
{`// GitHub fetch with ISR revalidation
export async function fetchGitHubRepos(
  username: string
): Promise<GitHubRepo[]> {
  const res = await fetch(
    \`https://api.github.com/users/\${username}/repos\`,
    {
      headers,
      next: { revalidate: 3600 }, // Re-fetch every hour
    }
  );
  return res.json();
}

// Enrichment merges live GitHub data with curated project data
export function enrichProjectWithGitHub(
  project: { repoName?: string },
  repos: GitHubRepo[]
): EnrichedGitHub {
  const repo = repos.find(
    r => r.name.toLowerCase() === project.repoName?.toLowerCase()
  );
  return {
    lastPushed: repo?.pushed_at ?? null,
    stars: repo?.stargazers_count ?? 0,
    liveLanguage: repo?.language ?? null,
  };
}`}
            </pre>
          </div>

          <p>
            The key design decision was separating curated content from live data. Project
            descriptions, roles, and technical highlights are authored in a TypeScript data file
            that I control. GitHub stars and activity come from the API. ISR means visitors see
            fresh data without runtime API calls on every page load, and the site remains fully
            functional even if GitHub&apos;s API is temporarily unavailable — it just serves the
            last cached version.
          </p>

          {/* Takeaway */}
          <h2 className="text-2xl font-bold text-[#FFCC00] mt-10 mb-4">
            Architectural Thinking Transfers
          </h2>
          <p>
            None of these patterns are web-specific. The Observer pattern with a re-entrancy guard
            works the same way in Unreal Engine delegates. The three-layer fallback mirrors how
            game engines handle crash recovery (in-game error screen, engine-level crash reporter,
            OS-level crash dump). ISR is conceptually similar to asset caching in game builds.
          </p>
          <p>
            That transferability is the point. The technology stack changes between projects, but
            architectural principles — event-driven decoupling, defense-in-depth error handling,
            smart caching — stay constant. This portfolio is built to demonstrate that thinking
            as much as any individual project in it.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-3">See It in Action</h3>
          <p className="text-gray-400 mb-6">
            The full portfolio source code is available on GitHub. The Observer implementation,
            error boundaries, and ISR configuration are all in the repository.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/GrizzwaldHouse/portfolio-website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFCC00] hover:bg-[#D50032] text-slate-900 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              View on GitHub
              <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
