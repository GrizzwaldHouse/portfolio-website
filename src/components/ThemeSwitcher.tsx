'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { useThemeStore } from '@/lib/theme-store';
import { themes, THEME_IDS, type ThemeId } from '@/lib/themes';

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const themeId = useThemeStore((s) => s.themeId);
  const setTheme = useThemeStore((s) => s.setTheme);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  function handleSelect(id: ThemeId) {
    setTheme(id);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function handleKeyNavigation(e: React.KeyboardEvent, id: ThemeId, index: number) {
    const ids = [...THEME_IDS];
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = ids[(index + 1) % ids.length];
      document.getElementById(`theme-option-${next}`)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = ids[(index - 1 + ids.length) % ids.length];
      document.getElementById(`theme-option-${prev}`)?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(id);
    }
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]"
        aria-label="Change theme"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Palette className="w-5 h-5" />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="listbox"
          aria-label="Theme selection"
          aria-activedescendant={`theme-option-${themeId}`}
          className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/95 backdrop-blur-sm shadow-xl overflow-hidden z-50"
        >
          <div className="p-2">
            <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Theme
            </p>
            {THEME_IDS.map((id, index) => {
              const theme = themes[id];
              const isActive = id === themeId;
              return (
                <button
                  key={id}
                  id={`theme-option-${id}`}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(id)}
                  onKeyDown={(e) => handleKeyNavigation(e, id, index)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                    isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                      : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-primary)]/50'
                  }`}
                >
                  {/* Color swatches */}
                  <div className="flex gap-1 shrink-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.colors.bgPrimary }}
                    />
                  </div>

                  {/* Name + description */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{theme.name}</p>
                    <p className="text-xs truncate opacity-60">{theme.description}</p>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <span
                      className="ml-auto shrink-0 w-2 h-2 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
