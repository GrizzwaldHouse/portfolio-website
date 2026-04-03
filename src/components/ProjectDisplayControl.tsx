// ProjectDisplayControl.tsx
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Recruiter-facing toggle to control how many projects are visible.
//          Stores preference in localStorage for persistence across visits.
//          Demonstrates UX thoughtfulness — avoids overwhelming the viewer.

'use client';

import { useState, useEffect } from 'react';
import { DISPLAY_CONFIG } from '@/types/project';

const STORAGE_KEY = 'portfolio_project_display_count';

interface ProjectDisplayControlProps {
  totalCount: number;
  onCountChange: (count: number) => void;
}

export default function ProjectDisplayControl({
  totalCount,
  onCountChange,
}: ProjectDisplayControlProps) {
  const [selectedCount, setSelectedCount] = useState(DISPLAY_CONFIG.defaultCount);
  const [isOpen, setIsOpen] = useState(false);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const count = parseInt(saved, 10);
      if (!isNaN(count)) {
        setSelectedCount(count);
        onCountChange(count);
      }
    }
  }, [onCountChange]);

  const handleSelect = (count: number) => {
    setSelectedCount(count);
    onCountChange(count);
    localStorage.setItem(STORAGE_KEY, count.toString());
    setIsOpen(false);
  };

  const displayOptions = [...DISPLAY_CONFIG.options.filter((n) => n <= totalCount)];
  if (totalCount > DISPLAY_CONFIG.options[DISPLAY_CONFIG.options.length - 1]) {
    displayOptions.push(totalCount);
  }

  return (
    <div className="relative inline-flex items-center gap-2 text-sm">
      <span className="text-gray-400 font-mono text-xs">SHOWING</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1.5 bg-slate-800/80 border border-cyan-500/30 rounded-lg text-cyan-400 font-mono text-sm hover:border-cyan-500/60 transition-colors"
      >
        {selectedCount >= totalCount ? 'ALL' : selectedCount}
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <span className="text-gray-400 font-mono text-xs">
        OF {totalCount} PROJECTS
      </span>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-8 mt-1 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-xl overflow-hidden z-10">
          {displayOptions.map((count) => (
            <button
              key={count}
              onClick={() => handleSelect(count)}
              className={`block w-full px-4 py-2 text-left text-sm font-mono transition-colors ${
                selectedCount === count
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
              }`}
            >
              {count >= totalCount ? `ALL (${totalCount})` : count}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
