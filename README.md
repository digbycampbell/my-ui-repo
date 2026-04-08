# Digio Shared UI — The Reimagined Design System

Shared components, theme CSS, design tokens, and documentation for the Digio ecosystem.
Based on the Apple-inspired digio-reimagined design language.

> **Repo**: `github.com/digbycampbell/my-ui-repo`
> **Version**: `3.0.0`

---

## Design Philosophy

- **Minimalism over Decoration**: No unnecessary glows or gradients
- **High Contrast**: Solid black on white for primary actions
- **Spacious Layouts**: Generous white space and bento-style grids
- **Pill-Shaped UI**: All buttons and interactive elements use `rounded-full`
- **Light Mode Exclusive**: No dark mode

---

## Contents

```
my-ui-repo/
├── components/           # Shared React components (source of truth)
│   ├── index.ts          # Barrel export
│   ├── AppNavbar.tsx     # Fixed glassmorphism top navbar
│   ├── SidebarShell.tsx  # Collapsible sidebar container
│   ├── LockButton.tsx    # Lock/edit toggle button
│   ├── ReadOnlyBar.tsx   # Bottom warning bar (locked mode)
│   ├── ModalOverlay.tsx  # Full-screen modal with backdrop blur
│   ├── DateNavigator.tsx # Date stepping control
│   ├── Card.tsx          # Standard card component
│   └── IconBadge.tsx     # Icon container
├── css/                  # Theme & utility CSS (source of truth)
│   ├── theme-digio.css   # Digio brand (Slate/Cyan/Indigo)
│   ├── theme-kereone.css # Kereone brand (Blue-Teal)
│   └── digio-base.css    # Buttons, glass, typography, inputs
├── lib/
│   └── design-system.ts  # BRAND tokens, TOOL_THEMES, types
├── fonts.html            # Google Fonts preload snippet
├── docs/                 # Design documentation
│   ├── DESIGN-STANDARDS.md
│   └── styleguide/
├── package.json
├── tsconfig.json
└── README.md
```

---

## How This Repo Is Used

This repo is the **source of truth** for the Digio design system. It is
**not** consumed as a runtime dependency (no npm package, no submodule
imports at build time). Instead, assets are **manually copied** into each
consuming app.

### Why not git submodules?

Git submodules do not work reliably on Replit. Replit does shallow clones
without submodule recursion, so the `shared-ui/` directory is empty at
build time. Any CSS `@import` or TypeScript `import` referencing files
inside the submodule fails with resolution errors. The `predev` hooks
(`git submodule update --init`) only work when the environment has
network access to GitHub, which is not guaranteed.

### Rollout model

When a change is made in this repo (new component, CSS update, design
token change), it must be **manually rolled out** to each consuming app:

1. Make the change here (source of truth)
2. Ask an agent to copy the updated assets into each app repo
3. Each app keeps a local copy with a comment noting the source file

This is intentional — it keeps each app self-contained and deployable
without external dependencies.

---

## Rollout Guide — Copying Assets to App Repos

### CSS: Theme + Base Utilities

Each app's `client/src/index.css` should contain an **inline copy** of:
- The relevant **theme file** (`css/theme-digio.css` or `css/theme-kereone.css`)
- The **base utilities** (`css/digio-base.css`)

Mark each section with a comment noting the source:

```css
/* ================================================================== */
/* Digio Theme — from my-ui-repo/css/theme-digio.css                   */
/* ================================================================== */
:root { ... }

/* ================================================================== */
/* Digio Base — from my-ui-repo/css/digio-base.css                     */
/* ================================================================== */
.glass { ... }
```

After the inlined CSS, add the **Tailwind theme bindings** (`@theme inline`)
block. This block is the same across all apps — it maps CSS variables to
Tailwind utility classes.

### Components

Copy any needed components from `components/` into the app's local
`client/src/components/` directory. Add a header comment:

```tsx
/**
 * LockButton — ported from my-ui-repo/components/LockButton.tsx
 */
```

Currently shared components:
| Component | Used by | Local path in app |
|-----------|---------|-------------------|
| `LockButton` | receipts, kereone-map | `components/lock-button.tsx` |
| `ModalOverlay` | receipts | `components/modal-overlay.tsx` |
| `ReadOnlyBar` | receipts | `components/read-only-bar.tsx` |

### Fonts

All apps use the same Google Fonts snippet in `client/index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Tailwind @theme Block

All apps need this block in `index.css` (after the inlined CSS, before
`@layer base`). It maps CSS custom properties to Tailwind utilities:

```css
@theme inline {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Outfit", sans-serif;
  --font-serif: "Instrument Serif", serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-sidebar: hsl(var(--sidebar));
  --color-sidebar-foreground: hsl(var(--sidebar-foreground));
  --color-sidebar-border: hsl(var(--sidebar-border));
  --color-sidebar-accent: hsl(var(--sidebar-accent));
  --color-sidebar-accent-foreground: hsl(var(--sidebar-accent-foreground));
}
```

---

## Current Rollout Status

| App | Theme | Base CSS | LockButton | ModalOverlay | ReadOnlyBar | Fonts |
|-----|-------|----------|------------|--------------|-------------|-------|
| digio-receipts | `theme-digio.css` (inlined) | `digio-base.css` (inlined) | local copy | local copy | local copy | matching |
| digio-invoices | `theme-digio.css` (inlined) | `digio-base.css` (inlined) | local copy | n/a | local copy | matching |
| kereone-map | `theme-kereone.css` (inlined) | `digio-base.css` (inlined) | local copy | n/a | n/a | matching |

---

## Typography — The Harmonized Method

| Layer | Font | Usage |
|:------|:-----|:------|
| **Display** | Outfit | Headings, hero titles, branding |
| **Sans** | Inter | Body text, UI elements, navigation |
| **Serif** | Instrument Serif | Editorial accents (sparingly) |
| **Mono** | JetBrains Mono | Data, code, metadata labels |

---

## Color Palette

### Shared (Digio brand)
| Color | Hex | Role |
|-------|-----|------|
| Primary | `#0f172a` | Slate 950 — structure, headings, buttons |
| Accent | `#0891b2` | Cyan 600 — highlights, links, Digio logo dot |
| Secondary | `#4f46e5` | Indigo 600 — secondary accents |

### Per-tool accents
| Tool | Accent | Hex |
|------|--------|-----|
| Receipts | Pink | `#f472b6` |
| Kereone Map | Amber | `#fbbf24` |

---

## CSS Classes (from digio-base.css)

| Class | Description |
|-------|-------------|
| `.btn-primary` | Solid black pill button |
| `.btn-secondary` | Light grey pill button |
| `.btn-outline` | Bordered pill button |
| `.btn-ghost` | Transparent pill button |
| `.btn-status-locked` | Amber lock state |
| `.btn-status-unlocked` | Green editing state |
| `.btn-icon-dark` | Dark-bordered icon button |
| `.btn-icon-standard` | Light-bordered icon button |
| `.input-field` | Rounded-full input with focus ring |
| `.input-textarea` | Rounded-2xl textarea with focus ring |
| `.glass` | Glassmorphism with backdrop-blur |
| `.section-label` | Mono uppercase metadata label |
| `.body-text` | Standard body paragraph |
| `.mono-data` | Monospace tabular data |
| `.card-bento` | 40px radius for feature cards/modals |
| `.card-standard` | 32px radius for info cards |

---

## Dependencies

Consuming apps need:

- **React** 18+
- **Lucide React** (icons)
- **Tailwind CSS 4** (utility classes)

---

## Full Documentation

- [DESIGN-STANDARDS.md](docs/DESIGN-STANDARDS.md) — Complete design system specification
- [styleguide/](docs/styleguide/) — Detailed component and pattern docs

---

## License

MIT — see [LICENSE](LICENSE).
