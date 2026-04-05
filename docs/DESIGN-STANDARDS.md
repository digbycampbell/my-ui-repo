# Digio Design Standards — The Reimagined Design System

> **Purpose**: Defines the visual and technical standards for all applications
> in the Digio ecosystem. Based on the digio-reimagined design language — a
> sophisticated, minimalist, Apple-inspired interface for the intersection of
> power infrastructure and digital intelligence.
>
> **Version**: `3.0.0`
> **Last updated**: 2026-04-05

---

## What Changed in v3.0

- **Complete redesign**: Adopted the digio-reimagined aesthetic as canonical
- **New color palette**: Slate 950 / Cyan 600 / Indigo 600 (replaces Magic Mint)
- **The Harmonized Method**: 4-font typographic system (Outfit, Inter, Instrument Serif, JetBrains Mono)
- **Light mode exclusive**: Dark mode removed per April 2026 iteration
- **Pill-shaped UI**: All buttons, nav items, and tags use `rounded-full`
- **Bento grid layout**: Cards use `rounded-[40px]` with generous padding
- **Glassmorphism**: Translucent navbar and sidebar with `backdrop-blur-xl`
- **Standardized button system**: `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost`, `.btn-status-locked/unlocked`, `.btn-icon-dark/standard`
- **Design tokens file**: `lib/design-system.ts` as single source of truth

---

## Quick Reference

| Concern | Standard |
|---------|----------|
| **Primary color** | Slate 950 `#0f172a` |
| **Accent color** | Cyan 600 `#0891b2` |
| **Secondary color** | Indigo 600 `#4f46e5` |
| **Display font** | Outfit |
| **Body font** | Inter |
| **Serif accents** | Instrument Serif |
| **Mono font** | JetBrains Mono |
| **Icons** | Lucide React |
| **Card radius** | `rounded-[40px]` (bento) or `rounded-[32px]` |
| **Button shape** | `rounded-full` (pill) |
| **Transitions** | `duration-300` with `ease: [0.16, 1, 0.3, 1]` |
| **Theme mode** | Light only |

---

## Design Philosophy — "The Digio Method"

1. **Minimalism over Decoration**: No unnecessary glows, gradients, or neon.
2. **High Contrast**: Solid black on white for primary actions.
3. **Spacious Layouts**: Generous white space and bento-style grids.
4. **Pill-Shaped UI**: All interactive elements use `rounded-full`.

---

## Typography — The Harmonized Method

| Layer | Font | Usage | Vibe |
|:------|:-----|:------|:-----|
| **Display** | `Outfit` | Headings, Hero titles, Branding | Geometric, Bold, Modern |
| **Sans** | `Inter` | Body text, UI elements, Navigation | Neutral, Highly Legible |
| **Serif** | `Instrument Serif` | Editorial accents, Hero subtitles | Modern-Academic |
| **Mono** | `JetBrains Mono` | Data, Code, Technical metadata | Precise, System-level |

### Key Patterns

- **Hero titles**: `text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight`
- **Section headers**: `text-3xl md:text-5xl font-display font-bold tracking-tight`
- **Metadata labels**: `text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400`
- **Body text**: `text-sm text-slate-500 leading-relaxed font-medium`

---

## Color Palette

### Brand Colors

| Color | Hex | Role |
|-------|-----|------|
| Primary | `#0f172a` | Slate 950 — Structure, headings, primary buttons |
| Accent | `#0891b2` | Cyan 600 — Digital energy, links, highlights |
| Secondary | `#4f46e5` | Indigo 600 — Tech-forward, secondary accents |
| Surface | `#ffffff` | White — Component backgrounds |
| Border | `#e2e8f0` | Slate 200 — Subtle separators |

### Text Hierarchy

| Level | Hex | Tailwind |
|-------|-----|----------|
| High | `#0f172a` | `text-slate-900` |
| Medium | `#475569` | `text-slate-600` |
| Low | `#94a3b8` | `text-slate-400` |

### Tool Themes

Each tool gets a unique accent color applied sparingly:

| Tool | Primary | Accent |
|------|---------|--------|
| Default (Digio) | `#0f172a` | `#0891b2` (Cyan) |
| Kereone | `#064e3b` | `#fbbf24` (Amber) |
| Receipts | `#1e1b4b` | `#f472b6` (Pink) |

---

## Button System

All buttons are pill-shaped (`rounded-full`) with `active:scale-[0.98]`:

| Class | Style |
|-------|-------|
| `.btn-primary` | Solid black, white text |
| `.btn-secondary` | Slate 100 bg, slate 900 text |
| `.btn-outline` | Transparent, slate border |
| `.btn-ghost` | Transparent, no border |
| `.btn-status-locked` | Amber/warm — locked state |
| `.btn-status-unlocked` | Green — editing state |
| `.btn-icon-dark` | Icon button with dark border |
| `.btn-icon-standard` | Icon button with light border |

---

## Component Patterns

### Bento Cards
```jsx
<div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10">
  {/* Content */}
</div>
```

### Glassmorphism Navbar
```jsx
<nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
```

### Metadata Label
```jsx
<span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">
  Label Text
</span>
```

### Status Badge
```jsx
<span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
  Active
</span>
```

---

## Shared UI Repository (`my-ui-repo`)

### Consumable Files

| Path | Contents |
|------|----------|
| `css/theme-digio.css` | Brand colors + shadcn/ui CSS variables |
| `css/digio-base.css` | Button system, glassmorphism, typography, inputs |
| `lib/design-system.ts` | BRAND tokens, TOOL_THEMES, TypeScript types |
| `components/` | Shared React components (AppHeader, LockButton, etc.) |
| `fonts.html` | Google Fonts preload snippet |

### Usage

```bash
git submodule add https://github.com/digbycampbell/my-ui-repo.git shared-ui
```

```css
@import "../shared-ui/css/theme-digio.css";
@import "../shared-ui/css/digio-base.css";
```

```tsx
import { BRAND, TOOL_THEMES } from "../shared-ui/lib/design-system";
import { AppHeader } from "../shared-ui/components";
```

---

## AI Development Rules

When extending this design system:

1. **Adhere to the Grid**: Use bento grid pattern. Cards = `rounded-[40px]`.
2. **Maintain Typographic Hierarchy**: Display (Outfit) for headings, Inter for body, Mono for metadata.
3. **Color Usage**: Primary = solid high-contrast. Accent = sparingly for highlights.
4. **No custom CSS files**: Use Tailwind utilities and the CSS classes from `digio-base.css`.
5. **No dark mode**: Light mode exclusive.
6. **Use motion**: Prefer `y: 20` to `y: 0` with `ease: [0.16, 1, 0.3, 1]` for entry animations.

---

## Versioning

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-03-25 | Initial design standards extracted from digio-website |
| 2.0.0 | 2026-04-02 | Unified styleguide: two theme families, Outfit + JetBrains Mono |
| 3.0.0 | 2026-04-05 | **Reimagined design system**: New palette (Slate/Cyan/Indigo), 4-font harmonized method, light mode exclusive, pill UI, bento grids, glassmorphism, standardized button system |
