export interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  border: string;
}

export interface ThemeFonts {
  display: string;
  body: string;
  code: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
}

export const THEME_IDS = [
  'full-sail-gold',
  'arcane-scholar',
  'unreal-chrome',
  'unity-gradient',
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const DEFAULT_THEME_ID: ThemeId = 'full-sail-gold';

const sharedFonts: ThemeFonts = {
  display: 'var(--font-cinzel), serif',
  body: 'var(--font-raleway), system-ui, sans-serif',
  code: 'var(--font-jetbrains), monospace',
};

export const themes: Record<ThemeId, ThemeConfig> = {
  'full-sail-gold': {
    id: 'full-sail-gold',
    name: 'Full Sail Gold',
    description: 'Default gold and red theme inspired by Full Sail University',
    colors: {
      primary: '#FFCC00',
      secondary: '#D50032',
      tertiary: '#3B82F6',
      bgPrimary: '#0f172a',
      bgSecondary: '#1e293b',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      accent: '#FFCC00',
      border: '#334155',
    },
    fonts: sharedFonts,
  },
  'arcane-scholar': {
    id: 'arcane-scholar',
    name: 'Arcane Scholar',
    description: 'Deep purples with amber accents and parchment tones',
    colors: {
      primary: '#C9A84C',
      secondary: '#7B2D8E',
      tertiary: '#2D5F8E',
      bgPrimary: '#1a1128',
      bgSecondary: '#241835',
      textPrimary: '#E8DCC8',
      textSecondary: '#9B8DB3',
      accent: '#C9A84C',
      border: '#3D2E50',
    },
    fonts: sharedFonts,
  },
  'unreal-chrome': {
    id: 'unreal-chrome',
    name: 'Unreal Chrome',
    description: 'UE5-inspired metallic blues with chrome accents',
    colors: {
      primary: '#4FC3F7',
      secondary: '#1565C0',
      tertiary: '#B0BEC5',
      bgPrimary: '#0D1117',
      bgSecondary: '#161B22',
      textPrimary: '#E6EDF3',
      textSecondary: '#8B949E',
      accent: '#4FC3F7',
      border: '#30363D',
    },
    fonts: sharedFonts,
  },
  'unity-gradient': {
    id: 'unity-gradient',
    name: 'Unity Gradient',
    description: 'Unity-inspired teal and coral with a modern clean look',
    colors: {
      primary: '#00BFA5',
      secondary: '#FF6E40',
      tertiary: '#7C4DFF',
      bgPrimary: '#121212',
      bgSecondary: '#1E1E1E',
      textPrimary: '#FAFAFA',
      textSecondary: '#A0A0A0',
      accent: '#00BFA5',
      border: '#2D2D2D',
    },
    fonts: sharedFonts,
  },
};

export function getThemeById(id: string): ThemeConfig {
  if (id in themes) {
    return themes[id as ThemeId];
  }
  return themes[DEFAULT_THEME_ID];
}
