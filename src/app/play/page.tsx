import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
    title: 'Play My Games',
    description:
        'Try interactive demos of my game development and software engineering projects — playable right in your browser.',
};

export default function PlayPage() {
    const playable = projects.filter(
        (p) => p.embed?.type === 'canvas' || p.embed?.type === 'iframe'
    );
    const videoOnly = projects.filter(
        (p) => p.embed?.type === 'video-only'
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                        Play My Games
                    </span>
                </h1>
                <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                    Jump right in — these projects are playable directly in your browser.
                    No downloads, no installs.
                </p>
            </div>

            {/* Playable projects */}
            {playable.length > 0 && (
                <section className="mb-16">
                    <h2 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                        Playable Now
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {playable.map((project) => (
                            <Link
                                key={project.slug}
                                href={`/projects/${project.slug}`}
                                className="group relative block bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm rounded-xl border border-[var(--color-primary)]/20 overflow-hidden hover:border-[var(--color-primary)]/60 hover:shadow-lg hover:shadow-[var(--color-primary)]/10 transition-all duration-300"
                            >
                                <div className="relative h-48 bg-[var(--color-bg-secondary)]">
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/90 to-transparent" />
                                    <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold bg-[var(--color-primary)] text-[var(--color-bg-primary)] rounded-full shadow-lg">
                                        PLAY
                                    </span>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition">
                                        {project.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-2">
                                        {project.tagline}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 text-xs bg-[var(--color-bg-secondary)]/80 text-[var(--color-text-secondary)] rounded border border-[var(--color-border)]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Video-only projects */}
            {videoOnly.length > 0 && (
                <section>
                    <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-text-secondary)]" />
                        Video Showcases
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {videoOnly.map((project) => (
                            <Link
                                key={project.slug}
                                href={`/projects/${project.slug}`}
                                className="group block bg-[var(--color-bg-secondary)]/30 rounded-xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-text-secondary)] transition-all duration-300"
                            >
                                <div className="relative h-40 bg-[var(--color-bg-secondary)]">
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-secondary)] transition">
                                        {project.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-[var(--color-text-secondary)] line-clamp-2">
                                        {project.tagline}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
