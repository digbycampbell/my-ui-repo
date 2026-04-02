# Digio Shared UI

Shared components, theme CSS, and design system documentation for the Digio ecosystem.

> **Repo**: `github.com/digbycampbell/my-ui-repo`
> **Consumed as**: git submodule (`shared-ui/`) in each app repo

---

## Contents

```
my-ui-repo/
├── components/
│   ├── index.ts           # Barrel export
│   ├── AppHeader.tsx       # Top navigation bar
│   ├── LockButton.tsx      # Lock/edit toggle
│   ├── ReadOnlyBar.tsx     # Bottom warning bar (locked state)
│   ├── DateNavigator.tsx   # Date stepping control
│   ├── Card.tsx            # Standard card with hover lift
│   ├── IconBadge.tsx       # Icon container (standard + small)
│   └── ModalOverlay.tsx    # Full-attention overlay
├── css/
│   ├── theme-digio.css     # Digio theme CSS variables
│   ├── theme-kereone.css   # Kereone theme CSS variables
│   └── digio-base.css      # Shared utilities + font variables
├── fonts.html              # Google Fonts preload snippet
├── docs/
│   ├── DESIGN-STANDARDS.md # Unified style guide overview
│   └── styleguide/
│       ├── COLOURS.md      # Colour system
│       ├── TYPOGRAPHY.md   # Font stack and type scale
│       ├── COMPONENTS.md   # Component patterns and specs
│       ├── ANIMATIONS.md   # Transition tiers
│       ├── APP-THEMING.md  # New app setup guide
│       └── KEREONE-THEME.md# Kereone-specific theme
├── LICENSE
└── README.md               # This file
```

---

## Setup (add as submodule to your app)

### 1. Add as submodule

```bash
git submodule add https://github.com/digbycampbell/my-ui-repo.git shared-ui
```

### 2. Import CSS

In your app's `index.css`, import the theme and base utilities:

```css
/* Pick ONE theme */
@import "../shared-ui/css/theme-digio.css";
/* OR */
@import "../shared-ui/css/theme-kereone.css";

/* Always import base utilities */
@import "../shared-ui/css/digio-base.css";
```

### 3. Add fonts

Copy the contents of `fonts.html` into your app's `<head>` tag in
`index.html`.

### 4. Import components

```tsx
import {
  AppHeader,
  LockButton,
  ReadOnlyBar,
  DateNavigator,
  Card,
  IconBadge,
  ModalOverlay,
} from "../shared-ui/components";
```

---

## Dependencies

These components expect the following to be available in the consuming app:

- **React** 18+ (JSX runtime)
- **Lucide React** (icon imports)
- **Tailwind CSS 4** (utility classes)

The components do NOT depend on shadcn/ui or Radix UI — they use plain
Tailwind classes so they work in any React + Tailwind project.

---

## Theme Families

| Theme | File | Primary Colour | Apps |
|-------|------|---------------|------|
| Digio | `theme-digio.css` | Magic Mint `#AAF0D1` | digio-website, digio-receipts, digio-invoices |
| Kereone | `theme-kereone.css` | Blue-Teal `#4A7E8F` | kereone-roster, kereone-map |

Both themes share the same structural colours (Bright Gray `#3C4151`),
border values, and neutral tones. Only the `--primary`, `--secondary`,
`--accent`, and `--ring` values differ.

---

## Updating

When consumed as a submodule, update across all repos:

```bash
cd shared-ui
git pull origin main
cd ..
git add shared-ui
git commit -m "Update shared-ui to latest"
```

---

## Full Documentation

See the complete styleguide in `docs/`:

- [DESIGN-STANDARDS.md](docs/DESIGN-STANDARDS.md) — Unified style guide overview
- [COLOURS.md](docs/styleguide/COLOURS.md) — Colour system
- [TYPOGRAPHY.md](docs/styleguide/TYPOGRAPHY.md) — Font stack and type scale
- [COMPONENTS.md](docs/styleguide/COMPONENTS.md) — Component patterns and specs
- [ANIMATIONS.md](docs/styleguide/ANIMATIONS.md) — Transition tiers
- [APP-THEMING.md](docs/styleguide/APP-THEMING.md) — New app setup guide
- [KEREONE-THEME.md](docs/styleguide/KEREONE-THEME.md) — Kereone-specific theme

---

## License

MIT — see [LICENSE](LICENSE).
