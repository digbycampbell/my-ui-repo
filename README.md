# Digio Shared UI

Shared components, theme CSS, and design system documentation for the Digio ecosystem.

> **Repo**: `github.com/digbycampbell/my-ui-repo`
> **Consumed as**: git submodule (`shared-ui/`) in each app repo
> **Version**: `2.0.0`

---

## Contents

```
my-ui-repo/
├── components/           # Consumable React components
│   ├── index.ts          # Barrel export
│   ├── AppHeader.tsx
│   ├── LockButton.tsx
│   ├── ReadOnlyBar.tsx
│   ├── DateNavigator.tsx
│   ├── Card.tsx
│   ├── IconBadge.tsx
│   └── ModalOverlay.tsx
├── css/                  # Consumable theme & utilities
│   ├── theme-digio.css   # Digio theme CSS variables
│   ├── theme-kereone.css # Kereone theme CSS variables
│   └── digio-base.css    # Shared utilities + font variables
├── fonts.html            # Google Fonts preload snippet
├── docs/                 # Design documentation
│   ├── DESIGN-STANDARDS.md
│   └── styleguide/
├── examples/             # Reference implementations (not consumed)
│   ├── digio-reimagined/ # Full design system showcase
│   └── digio-receipts/   # Example app integration
├── package.json          # Module metadata + peer deps
├── tsconfig.json         # TypeScript config for components
├── LICENSE
└── README.md
```

### What consuming apps use

Only these directories are imported by consuming apps:

- **`components/`** — React + TypeScript shared components
- **`css/`** — Theme CSS variables and utility classes
- **`fonts.html`** — Google Fonts `<link>` tags to copy into `index.html`

The `examples/`, `docs/`, and root config files are for development reference only.

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
`index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

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

### 5. TypeScript path alias (optional)

If your app uses path aliases, add to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@shared-ui/*": ["./shared-ui/*"]
    }
  }
}
```

Then import as: `import { AppHeader } from "@shared-ui/components";`

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
