'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/theme-store';
import { getThemeById, type ThemeConfig } from '@/lib/themes';

function applyTheme(theme: ThemeConfig) {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  const { colors } = theme;

  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-tertiary', colors.tertiary);
  root.style.setProperty('--color-bg-primary', colors.bgPrimary);
  root.style.setProperty('--color-bg-secondary', colors.bgSecondary);
  root.style.setProperty('--color-text-primary', colors.textPrimary);
  root.style.setProperty('--color-text-secondary', colors.textSecondary);
  root.style.setProperty('--color-accent', colors.accent);
  root.style.setProperty('--color-border', colors.border);

  document.body.style.backgroundColor = colors.bgPrimary;
  document.body.style.color = colors.textPrimary;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeId = useThemeStore((s) => s.themeId);

  useEffect(() => {
    const theme = getThemeById(themeId);
    applyTheme(theme);
  }, [themeId]);

  return <>{children}</>;
}
