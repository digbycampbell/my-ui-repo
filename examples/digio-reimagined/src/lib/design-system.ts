/**
 * Digio Design System - Style Assets
 * Single source of truth for branding, colors, and typography.
 */

export const BRAND = {
  name: 'Digio',
  fullName: 'Digio NZ Limited',
  tagline: 'Power + Digital',
  colors: {
    primary: '#0f172a', // Slate 950
    accent: '#0891b2',  // Cyan 600 (Better for light mode)
    secondary: '#4f46e5', // Indigo 600
    surface: '#ffffff',
    border: '#e2e8f0',
    text: {
      high: '#0f172a',   // Slate 950
      medium: '#475569', // Slate 600
      low: '#94a3b8',    // Slate 400
    },
    dark: {
      primary: '#0f172a',
      accent: '#22d3ee',
      secondary: '#6366f1',
      surface: '#1e293b',
      border: '#334155',
      text: {
        high: '#f8fafc',
        medium: '#94a3b8',
        low: '#475569',
      }
    }
  },
  typography: {
    sans: 'Inter, sans-serif',
    display: 'Outfit, sans-serif',
    serif: 'Instrument Serif, serif',
    mono: 'JetBrains Mono, monospace',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    glow: '0 0 20px rgba(34, 211, 238, 0.2)',
    soft: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  }
};

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ToolTheme {
  primaryColor: string;
  accentColor: string;
  logoIcon: string;
}

export const TOOL_THEMES: Record<string, ToolTheme> = {
  default: {
    primaryColor: BRAND.colors.primary,
    accentColor: BRAND.colors.accent,
    logoIcon: 'Zap',
  },
  kereone: {
    primaryColor: '#064e3b', // Deep Emerald
    accentColor: '#fbbf24',  // Amber
    logoIcon: 'Users',
  },
  receipts: {
    primaryColor: '#1e1b4b', // Deep Indigo
    accentColor: '#f472b6',  // Pink
    logoIcon: 'Receipt',
  }
};
