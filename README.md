# Digio Shared UI — The Reimagined Design System

Shared components, theme CSS, design tokens, and documentation for the Digio ecosystem.
Based on the Apple-inspired digio-reimagined design language.

> **Repo**: `github.com/digbycampbell/my-ui-repo`
> **Consumed as**: git submodule (`shared-ui/`) in each app repo
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
├── components/           # Shared React components
│   ├── index.ts          # Barrel export
│   ├── AppHeader.tsx
│   ├── LockButton.tsx
│   ├── ReadOnlyBar.tsx
│   ├── DateNavigator.tsx
│   ├── Card.tsx
│   ├── IconBadge.tsx
│   └── ModalOverlay.tsx
├── css/                  # Theme & utility CSS
│   ├── theme-digio.css   # Brand colors + shadcn/ui variables
│   ├── theme-kereone.css # Kereone theme variant
│   └── digio-base.css    # Buttons, glass, typography, inputs
├── lib/
│   └── design-system.ts  # BRAND tokens, TOOL_THEMES, types
├── fonts.html            # Google Fonts preload (4 fonts)
├── docs/                 # Design documentation
│   ├── DESIGN-STANDARDS.md
│   └── styleguide/
├── examples/             # Reference implementations
│   ├── digio-reimagined/ # Full design system showcase
│   └── digio-receipts/   # Example tool app
├── package.json
├── tsconfig.json
├── .gitattributes
├── LICENSE
└── README.md
```

---

## Setup

### 1. Add as submodule

```bash
git submodule add https://github.com/digbycampbell/my-ui-repo.git shared-ui
```

### 2. Import CSS

```css
@import "../shared-ui/css/theme-digio.css";
@import "../shared-ui/css/digio-base.css";
```

> **⚠ Replit submodule caveat**
>
> Git submodules do **not** auto-initialise on Replit. When Replit clones
> a repo it does a shallow clone without submodule recursion, so the
> `shared-ui/` directory will be **empty** on first run. Any CSS
> `@import` or TypeScript `import` that references files inside the
> submodule will fail at build/dev time with errors like:
>
> ```
> Can't resolve '../../shared-ui/css/theme-kereone.css'
> ```
>
> **Recommended approach — inline the CSS:**
>
> Copy the contents of the relevant theme file (`theme-digio.css` or
> `theme-kereone.css`) and `digio-base.css` directly into your app's
> `index.css`. Add a comment noting the source so it can be kept in sync:
>
> ```css
> /* From shared-ui/css/theme-kereone.css — keep in sync */
> :root { ... }
>
> /* From shared-ui/css/digio-base.css — keep in sync */
> .glass { ... }
> ```
>
> Do the same for any shared components you need (e.g. `LockButton`) —
> copy them into your app's local `components/` directory rather than
> importing from the submodule path.
>
> This keeps the submodule in the repo as a **design reference** (for
> docs, tokens, and the source of truth) without making it a
> **build-time dependency** that breaks on Replit.
>
> If you still want the `@import` approach for non-Replit environments,
> add pre-hooks to `package.json` to attempt submodule init before
> dev/build (this is what `digio-receipts` does, but it only works when
> git has network access to GitHub):
>
> ```json
> "predev": "git submodule update --init --recursive 2>/dev/null || true",
> "prebuild": "git submodule update --init --recursive 2>/dev/null || true"
> ```

### 3. Add fonts (copy to `<head>` of index.html)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 4. Import design tokens

```tsx
import { BRAND, TOOL_THEMES } from "../shared-ui/lib/design-system";
```

### 5. Import components

```tsx
import { AppHeader, LockButton, DateNavigator } from "../shared-ui/components";
```

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

| Color | Hex | Role |
|-------|-----|------|
| Primary | `#0f172a` | Slate 950 — structure, headings, buttons |
| Accent | `#0891b2` | Cyan 600 — highlights, links |
| Secondary | `#4f46e5` | Indigo 600 — secondary accents |
| Surface | `#ffffff` | Backgrounds |
| Border | `#e2e8f0` | Separators |

---

## CSS Classes

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
| `.glass` | Glassmorphism with backdrop-blur |
| `.section-label` | Mono uppercase metadata label |
| `.body-text` | Standard body paragraph |
| `.mono-data` | Monospace tabular data |

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
