'use client';

import dynamic from 'next/dynamic';

// Lazy-load demo components to keep bundle size down
const GameOfLife = dynamic(() => import('@/components/demos/GameOfLife'), {
    loading: () => (
        <div className="flex items-center justify-center h-64 bg-slate-800/50 rounded-xl border border-slate-700 text-gray-500">
            Loading Game of Life…
        </div>
    ),
});

const Calculator = dynamic(() => import('@/components/demos/Calculator'), {
    loading: () => (
        <div className="flex items-center justify-center h-64 bg-slate-800/50 rounded-xl border border-slate-700 text-gray-500">
            Loading Calculator…
        </div>
    ),
});

interface DemoEmbedProps {
    slug: string;
    embedType: string;
    demoUrl?: string;
    title: string;
    width?: number;
    height?: number;
}

export default function DemoEmbed({
    slug,
    embedType,
    demoUrl,
    title,
    width = 960,
    height = 600,
}: DemoEmbedProps) {
    if (embedType === 'canvas') {
        if (slug === 'game-of-life') return <GameOfLife />;
        if (slug === 'calculator') return <Calculator />;
    }

    if (embedType === 'iframe' && demoUrl) {
        return (
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                <iframe
                    src={demoUrl}
                    title={`${title} — Playable Demo`}
                    width="100%"
                    height={height}
                    className="w-full border-0"
                    allow="autoplay; fullscreen; gamepad"
                    allowFullScreen
                    loading="lazy"
                    style={{ maxWidth: width }}
                />
            </div>
        );
    }

    return null;
}
