/**
 * Digio Design System — The Reimagined Brand Identity
 *
 * Single source of truth for branding, colors, and typography.
 * Import this in consuming apps for consistent design tokens.
 *
 * @example
 * import { BRAND, TOOL_THEMES } from "../shared-ui/lib/design-system";
 */

export const BRAND = {
  name: 'Digio',
  fullName: 'Digio NZ Limited',
  tagline: 'Power + Digital',
  colors: {
    primary: '#0f172a',   // Slate 950 — deep professional
    accent: '#0891b2',    // Cyan 600 — digital energy (light mode)
    secondary: '#4f46e5', // Indigo 600 — tech-forward
    surface: '#ffffff',
    border: '#e2e8f0',
    text: {
      high: '#0f172a',    // Slate 950
      medium: '#475569',  // Slate 600
      low: '#94a3b8',     // Slate 400
    },
  },
  typography: {
    sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
    display: 'Outfit, sans-serif',
    serif: 'Instrument Serif, serif',
    mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    bento: '2.5rem',  // 40px — bento grid cards
    full: '9999px',   // pill shape
  },
  shadows: {
    soft: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    premium: '0 8px 30px rgba(0, 0, 0, 0.04)',
  },
};

export type ThemeMode = 'light';

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
    primaryColor: '#064e3b',  // Deep Emerald
    accentColor: '#fbbf24',   // Amber
    logoIcon: 'Users',
  },
  receipts: {
    primaryColor: '#1e1b4b',  // Deep Indigo
    accentColor: '#f472b6',   // Pink
    logoIcon: 'Receipt',
  },
};
