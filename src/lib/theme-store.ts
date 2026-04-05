'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type ThemeId, DEFAULT_THEME_ID, THEME_IDS, themes, type ThemeConfig } from './themes';

interface ThemeState {
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  getTheme: () => ThemeConfig;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themeId: DEFAULT_THEME_ID,
      setTheme: (id: ThemeId) => {
        if (THEME_IDS.includes(id)) {
          set({ themeId: id });
        }
      },
      getTheme: () => themes[get().themeId],
    }),
    {
      name: 'portfolio-theme',
    }
  )
);
