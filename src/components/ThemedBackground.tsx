// src/components/ThemedBackground.tsx
// Applies themed gradient backgrounds to project sections
// Creates immersive visual experience for each project type

'use client';

interface ThemeConfig {
  gradient: string;
  glowColor: string;
}

const themes: Record<string, ThemeConfig> = {
  hogwarts: {
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    glowColor: 'rgba(212, 175, 55, 0.3)',
  },
  cyberpunk: {
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 50%, #0a1628 100%)',
    glowColor: 'rgba(0, 255, 136, 0.3)',
  },
  nature: {
    gradient: 'linear-gradient(135deg, #1a2a1a 0%, #0d3d0d 50%, #0a2a2a 100%)',
    glowColor: 'rgba(76, 175, 80, 0.3)',
  },
  default: {
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  }
};

interface ThemedBackgroundProps {
  theme?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ThemedBackground({ theme, children, className = '' }: ThemedBackgroundProps) {
  const themeConfig = themes[theme || 'default'] || themes.default;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: themeConfig.gradient }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${themeConfig.glowColor} 0%, transparent 50%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
