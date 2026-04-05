'use client';

import { useQueryState, parseAsString } from 'nuqs';

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'games', label: 'Games' },
  { value: 'engine', label: 'Engine & Rendering' },
  { value: 'tools', label: 'Tools & Desktop' },
  { value: 'ai-automation', label: 'AI & Automation' },
] as const;

// URL-synced category filter buttons for the /projects page; uses nuqs for shareable filter state.
export default function CategoryFilter() {
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault('all'),
  );

  return (
    <nav aria-label="Project categories" className="mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value === 'all' ? null : cat.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:ring-offset-2 focus:ring-offset-slate-900 ${
              category === cat.value
                ? 'bg-gradient-to-r from-[#FFCC00] to-[#D50032] text-slate-900 shadow-sm'
                : 'bg-slate-800 text-gray-300 border border-slate-700 hover:border-slate-600 hover:text-white'
            }`}
            aria-pressed={category === cat.value}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
