# App Theming Guide

> **Version**: 3.1.0
> **Last updated**: 2026-04-06
>
> How to theme a new child app for the Digio design system.

---

## 1. Theme Families

Every app belongs to one of two theme families:

| Family | Primary | Accent | CSS File |
|--------|---------|--------|----------|
| **Digio** (primary) | Slate 950 `#0f172a` | Cyan 600 `#0891b2` | `theme-digio.css` |
| **Kereone** (secondary) | Emerald 900 `#064e3b` | Amber 400 `#fbbf24` | `theme-kereone.css` |

Kereone uses blue-teal variants from `theme-kereone.css`. Structural styles
(backgrounds, borders, semantic states) are shared across both families via
`digio-base.css`.

### Tool Themes

Imported from `TOOL_THEMES` in `shared-ui/lib/design-system.ts`:

| Tool | Primary | Accent |
|------|---------|--------|
| Default (Digio) | `#0f172a` | `#0891b2` (Cyan) |
| Kereone | `#064e3b` | `#fbbf24` (Amber) |
| Receipts | `#1e1b4b` | `#f472b6` (Pink) |

---

## 2. Setting Up a New App

### Step 1: Add shared-ui submodule

```bash
git submodule add https://github.com/digbycampbell/my-ui-repo.git shared-ui
```

### Step 2: Import CSS

In your `index.css`:

```css
@import "../shared-ui/css/theme-digio.css";
@import "../shared-ui/css/digio-base.css";
```

Replace `theme-digio.css` with `theme-kereone.css` for Kereone apps.

### Step 3: Import fonts

Add the font snippet from `shared-ui/fonts.html` to your `index.html`:

```html
<!-- See shared-ui/fonts.html for the full snippet -->
<!-- Fonts: Inter, Outfit, Instrument Serif, JetBrains Mono -->
```

### Step 4: Import shared components

```tsx
import { AppHeader, LockButton, DateNavigator } from "../shared-ui/components";
```

### Step 5: Import design tokens

```tsx
import { BRAND, TOOL_THEMES } from "../shared-ui/lib/design-system";
```

---

## 3. App Structure

### Header

All apps use the shared `AppHeader` component with:

- Logo in top-left
- App name: "digio [tool]" -- "digio" in `slate-900`, tool name in accent color
- `LockButton` for edit gating

### Sidebar

Collapsible sidebar:

- Expanded: 288px
- Collapsed: 64px
- Glassmorphism styling on header and sidebar

### Content Area

```tsx
<main className="min-h-screen bg-slate-50">
  <div className="p-8 lg:p-12">
    {/* Page content */}
  </div>
</main>
```

Background: `bg-slate-50`. Light mode only -- no dark mode support needed.

### Shape Language

- **Buttons and inputs**: Pill-shaped (fully rounded)
- **card-bento**: 40px radius
- **card-standard**: 32px radius

---

## 4. Recommended Tech Stack

| Concern | Tool | Notes |
|---------|------|-------|
| **UI Framework** | shadcn/ui | Radix UI primitives |
| **Styling** | Tailwind CSS 4 + `@tailwindcss/vite` | |
| **Icons** | Lucide React | Consistent across all apps |
| **Toasts** | Sonner | |
| **Forms** | React Hook Form + Zod | Validation + type safety |
| **State** | TanStack React Query | Server state management |
| **Routing** | Wouter | Lightweight client-side routing |
| **Animation** | Framer Motion | Include reduced motion support |
| **Theme** | next-themes | Only if needed; light-only by default |

---

## 5. Responsive Breakpoints

Tailwind CSS defaults:

| Prefix | Min Width |
|--------|-----------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

---

## 6. Authentication

- Auth is delegated to digio-website
- Token stored in `kereone_auth_token` localStorage key
- Auto-lock after 5 minutes of inactivity
- Use `LockButton` component from shared-ui for edit gating

---

## 7. CLAUDE.md Integration

Add this to any app's `CLAUDE.md`:

```markdown
## UI Standards

This app follows the Digio Design Standards v3.1.0.
Styleguide: https://github.com/digbycampbell/digio-website/tree/main/docs/styleguide

Theme family: [digio|kereone]
Shared UI repo: https://github.com/digbycampbell/my-ui-repo
```

---

## 8. New App Checklist

- [ ] Choose theme family (digio/kereone)
- [ ] Add shared-ui submodule
- [ ] Import theme CSS + base CSS
- [ ] Add Google Fonts (Inter, Outfit, Instrument Serif, JetBrains Mono)
- [ ] Use AppHeader with LockButton
- [ ] Implement collapsible sidebar
- [ ] Use pill-shaped buttons and inputs
- [ ] Use card-bento (40px) and card-standard (32px) radii
- [ ] Add glassmorphism to header/sidebar
- [ ] Implement reduced motion support
- [ ] Add CLAUDE.md with UI Standards section
- [ ] Register app in digio-website apps registry
