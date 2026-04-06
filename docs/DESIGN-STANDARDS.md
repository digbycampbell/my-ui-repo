# Digio Design Standards — The Reimagined Design System

> **Purpose**: Defines the visual and technical standards for all applications
> in the Digio ecosystem. Based on the digio-reimagined design language — a
> sophisticated, minimalist, Apple-inspired interface for the intersection of
> power infrastructure and digital intelligence.
>
> **Version**: `3.2.0`
> **Last updated**: 2026-04-06

---

## What Changed in v3.2

- **App Layout Recipe**: Full three-layer layout pattern (Navbar → Sidebar → Main Content) with exact component usage
- **AppNavbar component**: Fixed navbar with glassmorphism, tool label, lock button, user badge
- **SidebarShell component**: Documented shared sidebar shell with open/collapsed/close props and nav item classes
- **Layout offset pattern**: `pt-14` for navbar, `lg:pl-72` / `lg:pl-16` for sidebar, `p-8 lg:p-12` for content
- **Common pitfalls**: Modal-inside-sidebar trap, Framer Motion transform issue, shadcn override list, accent vs data colors
- **Background colors**: Documented `bg-slate-50` as acceptable for app areas, dashboards, and section contrast
- **Card radius system**: Two classes — `.card-bento` (`rounded-[40px]`) for large/feature cards, `.card-standard` (`rounded-[32px]`) for project/info/form cards
- **Textarea input**: Added `.input-textarea` class with `rounded-2xl` instead of pill shape
- **Transition speeds**: Two tiers — `duration-200` for micro-interactions, `duration-500` for layout/page transitions
- **Link hover**: Standardized to cyan color change (no underline). Logo links have no color change.
- **Sidebar pattern**: Documented collapsible sidebar (288px → 88px), Settings at bottom, no section labels
- **Disabled state**: Standardized to `opacity-50`
- **CSS utility classes**: `.section-label`, `.body-text`, `.mono-data` now implemented across website

---

## Quick Reference

| Concern | Standard |
|---------|----------|
| **Primary color** | Slate 950 `#0f172a` |
| **Accent color** | Cyan 600 `#0891b2` |
| **Secondary color** | Indigo 600 `#4f46e5` (reserved for future use) |
| **Display font** | Outfit |
| **Body font** | Inter |
| **Serif accents** | Instrument Serif (editorial use, sparingly) |
| **Mono font** | JetBrains Mono |
| **Icons** | Lucide React |
| **Bento card radius** | `.card-bento` / `rounded-[40px]` |
| **Standard card radius** | `.card-standard` / `rounded-[32px]` |
| **Button shape** | `rounded-full` (pill) |
| **Fast transition** | `duration-200` (hover, press, micro) |
| **Slow transition** | `duration-500` (layout, page, sidebar) |
| **Entry animation** | `ease: [0.16, 1, 0.3, 1]` |
| **Theme mode** | Light only |
| **Disabled opacity** | `opacity-50` |

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
- **Metadata labels**: `.section-label text-slate-400` (or `text-cyan-600` for accent)
- **Body text**: `.body-text` or `text-sm text-slate-500 leading-relaxed`
- **Mono data**: `.mono-data` for amounts, codes, percentages

---

## Color Palette

### Brand Colors

| Color | Hex | Tailwind | Role |
|-------|-----|----------|------|
| Primary | `#0f172a` | `text-slate-900` | Structure, headings, primary buttons |
| Accent | `#0891b2` | `text-cyan-600` | Links, highlights, section labels |
| Secondary | `#4f46e5` | `text-indigo-600` | Reserved for future use |
| Surface | `#ffffff` | `bg-white` | Primary component backgrounds |
| Surface Alt | `#f8fafc` | `bg-slate-50` | App areas, dashboards, section contrast |
| Border | `#e2e8f0` | `border-slate-200` | Subtle separators |

### Text Hierarchy

| Level | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| High | `#0f172a` | `text-slate-900` | Headings, bold values, primary text |
| Medium | `#475569` | `text-slate-600` | Secondary text, descriptions |
| Low | `#94a3b8` | `text-slate-400` | Metadata labels, muted text |
| Accent | `#0891b2` | `text-cyan-600` | Section labels, links, highlights |

### Tool Themes

Each tool gets a unique accent color applied sparingly (via `TOOL_THEMES` in `design-system.ts`):

| Tool | Primary | Accent |
|------|---------|--------|
| Default (Digio) | `#0f172a` | `#0891b2` (Cyan) |
| Kereone | `#064e3b` | `#fbbf24` (Amber) |
| Receipts | `#1e1b4b` | `#f472b6` (Pink) |

---

## Card Radius System

Two standard card radii for consistent visual hierarchy:

| Class | Radius | Usage |
|-------|--------|-------|
| `.card-bento` | `rounded-[40px]` | Large feature cards, hero cards, modals, tool launcher cards |
| `.card-standard` | `rounded-[32px]` | Project cards, info cards, form cards, timeline cards |

Additional radii used contextually:
- `rounded-2xl` (16px) — icon containers, textareas, small panels
- `rounded-xl` (12px) — icon buttons, status buttons
- `rounded-full` — all pill-shaped elements (buttons, inputs, tags, nav items)

---

## Button System

All buttons are pill-shaped (`rounded-full`) with `active:scale-[0.98]` and `duration-200`:

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

### Disabled State

All disabled buttons use `opacity-50 cursor-not-allowed`.

---

## Form Inputs

| Class | Shape | Usage |
|-------|-------|-------|
| `.input-field` | `rounded-full` (pill) | Text inputs, email, select |
| `.input-textarea` | `rounded-2xl` | Multi-line text areas |

Both share: white bg, slate-200 border, `focus:ring-2 focus:ring-slate-400/50`,
disabled state with `opacity-50 bg-slate-50`.

### Form Labels

Use `.section-label text-slate-400` for form field labels:

```jsx
<label className="section-label text-slate-400">Email</label>
<input className="input-field w-full" />
```

### Validation Errors

```jsx
<p className="text-red-500 text-xs">{error}</p>
```

---

## Transition & Animation

### Two-Tier System

| Tier | Duration | Usage |
|------|----------|-------|
| **Fast** | `duration-200` | Button hover/press, icon hover, color changes, micro-interactions |
| **Slow** | `duration-500` | Sidebar collapse, page transitions, layout shifts, card hover elevation |

### Entry Animations (Framer Motion)

```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```

### Card Hover

Cards use `hover:shadow-lg` with `duration-500`. Image zoom uses
`group-hover:scale-105 transition-transform duration-1000`.

---

## Link Behavior

- **Text links**: Color change to `text-cyan-600` on hover. No underline.
- **Card links**: Heading text changes to `text-cyan-600` on hover via `group-hover`.
- **Logo links**: `hover:opacity-80` only. No color change, no underline.
- **Footer links**: Color change to `text-slate-900` on hover.

---

## Sidebar Pattern

Collapsible sidebar for all tool/app layouts:

| State | Width |
|-------|-------|
| Expanded | `w-72` (288px) |
| Collapsed | `w-16` (64px) |

### Rules

- **No section labels** (Workspace, Your Tools, etc.) — use whitespace (`pt-2`) between groups
- **Settings** always at the bottom, above the collapse toggle
- **Collapse toggle** (`PanelLeft` / `PanelLeftClose` icon) at the very bottom
- **Glass effect**: `bg-white/70 backdrop-blur-xl border-r border-slate-200/50`
- **Nav items**: pill-shaped (`rounded-full`), fixed `h-10`, active state = `bg-slate-900 text-white shadow-lg`
- **Collapsed state**: icons centered (`justify-center`), tooltips via `title` attribute
- **Logo**: NOT in sidebar — logo lives in the top navbar only

### Collapse Animation

Icons must stay vertically fixed during collapse. Achieve this by:

1. **Fixed row height** (`h-10`) on all nav items
2. **Text hidden via CSS** (`w-0 opacity-0 overflow-hidden`) not conditional rendering
3. **Icons centered when collapsed** (`justify-center px-0`), left-aligned when expanded (`px-2`)
4. **Sidebar width transition**: `transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`

```jsx
{/* NavItem pattern — icons stay in place during collapse */}
<Link className={`h-10 flex items-center ${collapsed ? 'justify-center px-0' : 'px-2'} rounded-full`}>
  <span className={`${collapsed ? 'w-auto' : 'w-10'} flex items-center justify-center shrink-0`}>
    <Icon size={16} />
  </span>
  <span className={`whitespace-nowrap overflow-hidden transition-all duration-500
    ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
    {label}
  </span>
</Link>
```
- **Transition**: `duration-500` for width change
- **Mobile**: opens via `PanelLeft` icon in navbar, closes with `PanelLeftClose` at bottom

---

## Component Patterns

### Glassmorphism Navbar
```jsx
<nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
```

### Section Label (accent)
```jsx
<div className="section-label text-cyan-600 mb-6">About</div>
```

### Section Label (meta)
```jsx
<p className="section-label text-slate-400 mb-1">Base</p>
```

### Status Badge
```jsx
<span className="section-label px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
  Active
</span>
```

### Heading with Cyan Dot
```jsx
<h1 className="font-display font-bold text-slate-900 tracking-tight">
  Title<span className="text-cyan-600">.</span>
</h1>
```

---

## Spacing

### Section Padding

| Context | Padding |
|---------|---------|
| Marketing sections | `py-20` to `py-32` |
| Page top (below fixed nav) | `pt-40` |
| App content area | `p-8 lg:p-12` |

### Grid Gaps

| Context | Gap |
|---------|-----|
| Large section grids | `gap-12` to `gap-16` |
| Card grids | `gap-6` to `gap-8` |
| Inline elements | `gap-2` to `gap-4` |

---

## Shared UI Repository (`my-ui-repo`)

### Consumable Files

| Path | Contents |
|------|----------|
| `css/theme-digio.css` | Brand colors + shadcn/ui CSS variables |
| `css/theme-kereone.css` | Kereone theme variant (retained for future use) |
| `css/digio-base.css` | Buttons, glass, typography, cards, inputs |
| `lib/design-system.ts` | BRAND tokens, TOOL_THEMES, TypeScript types |
| `components/` | Shared React components (AppHeader, LockButton, etc.) |
| `fonts.html` | Google Fonts preload snippet (4 fonts) |

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

## App Layout Recipe

### The Three-Layer Layout

Every Digio tool app uses this exact structure:

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR (fixed top-0, h-14, z-40, glassmorphism)        │
├──────┬──────────────────────────────────────────────────┤
│      │                                                  │
│  S   │   MAIN CONTENT                                   │
│  I   │   (pt-14 for navbar offset)                      │
│  D   │   (lg:pl-72 or lg:pl-16 for sidebar offset)     │
│  E   │   (p-8 lg:p-12 for content padding)              │
│  B   │                                                  │
│  A   │                                                  │
│  R   │                                                  │
│      │                                                  │
├──────┴──────────────────────────────────────────────────┤
│  ReadOnlyBar (fixed bottom-0, when locked)              │
└─────────────────────────────────────────────────────────┘
```

### Navbar (`AppNavbar` component)

```tsx
import { AppNavbar } from "../shared-ui/components";

<AppNavbar
  toolLabel="Receipts"
  onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
  actions={<button className="btn-primary py-2 px-4 text-sm">Action</button>}
  isLocked={isLocked}
  onToggleLock={handleToggleLock}
  userEmail="user@digio.nz"
  onSignOut={() => { sessionStorage.clear(); window.location.reload(); }}
/>
```

- Fixed: `fixed top-0 left-0 right-0 h-14 z-40`
- Left: Mobile toggle (PanelLeft, `lg:hidden`) → Digio logo (cyan D badge) → "Digio." text → tool label
- Right: Custom actions → LockButton → User badge (indigo avatar + email) → Sign out

### Sidebar (`SidebarShell` component)

```tsx
import { SidebarShell, sidebarNavItemClasses, sidebarNavIconClasses, sidebarNavLabelClasses } from "../shared-ui/components";

<SidebarShell
  open={sidebarOpen}
  collapsed={sidebarCollapsed}
  onClose={() => setSidebarOpen(false)}
  onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
>
  {/* Your nav items here */}
</SidebarShell>
```

- Fixed: `fixed top-14 left-0 bottom-0 z-50`
- Width: `w-72` expanded / `w-[64px]` collapsed
- PanelLeft/PanelLeftClose toggle at bottom

### Main Content Offset

```tsx
<main className={`pt-14 transition-all duration-300 ${
  sidebarCollapsed ? "lg:pl-16" : "lg:pl-72"
}`}>
  <div className="p-8 lg:p-12">
    {/* Page content */}
  </div>
</main>
```

### State Management

The parent component must own these three state values:
```tsx
const [sidebarOpen, setSidebarOpen] = useState(false);      // mobile
const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop
const [isLocked, setIsLocked] = useState(true);             // edit gating
```

### Common Pitfalls

1. **Never render modals inside the sidebar.** CSS transforms (from `transition-[width]`) create a new containing block — `position: fixed` children will be positioned relative to the sidebar, not the viewport. Always render `ModalOverlay`, `AlertDialog`, or any portal at the root level.

2. **Don't use Framer Motion for the sidebar width.** Framer Motion applies CSS `transform` for animations, which traps fixed-position descendants. Use CSS `transition-[width]` instead.

3. **shadcn/ui components need explicit overrides.** Stock shadcn components use rounded-md/rounded-lg. Override these to match the design system:
   - `Popover`: `rounded-md` → `rounded-2xl`
   - `AlertDialog`: `sm:rounded-lg` → `rounded-[32px]`
   - `Progress indicator`: `bg-primary` → `bg-slate-900`
   - `Checkbox`: `rounded-sm` → `rounded`, checked state `bg-slate-900`

4. **Amount/data colors use emerald, not tool accent.** Monetary values in cards and tables should use `text-emerald-600`, not the tool's accent color. The tool accent is for branding elements only (app name, logo icon, sparkles).

---

## AI Development Rules

When extending this design system:

1. **Adhere to the Grid**: Use bento grid pattern. Large cards = `.card-bento`, standard = `.card-standard`.
2. **Maintain Typographic Hierarchy**: Display (Outfit) for headings, Inter for body, Mono for labels.
3. **Use CSS utility classes**: `.section-label`, `.body-text`, `.mono-data`, `.btn-*`, `.input-field`.
4. **Color Usage**: Primary = solid high-contrast. Accent (cyan) = sparingly for highlights and links.
5. **No dark mode**: Light mode exclusive.
6. **Transitions**: `duration-200` for micro, `duration-500` for layout. Entry animations use `ease: [0.16, 1, 0.3, 1]`.
7. **Sidebar**: Collapsible, no section labels, Settings + collapse toggle at bottom.
8. **Links**: Color change to cyan on hover. No underline. Logo = opacity change only.

---

## Versioning

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-03-25 | Initial design standards extracted from digio-website |
| 2.0.0 | 2026-04-02 | Unified styleguide: two theme families, Outfit + JetBrains Mono |
| 3.0.0 | 2026-04-05 | Reimagined design system: Slate/Cyan/Indigo, 4-font harmonized method, pill UI, bento grids, glassmorphism |
| 3.1.0 | 2026-04-06 | Gap analysis fixes: backgrounds, card radii, sidebar spec, transitions, links, forms, spacing, CSS utility adoption |
| 3.2.0 | 2026-04-06 | App Layout Recipe: AppNavbar, SidebarShell components, layout offset pattern, common pitfalls |
