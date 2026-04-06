# Digio Component Patterns

> **Version**: 3.1.0
> **Last updated**: 2026-04-06
> **Mode**: Light mode only

---

## 1. Shared Components

All shared components live in `my-ui-repo/components/`.

### AppHeader

Top navigation bar. Three-column grid layout, glassmorphism background, sticky positioning.

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] App Name          [Center Slot]   [Lock] [User] [≡] │
└─────────────────────────────────────────────────────────────┘
```

- Layout: `grid grid-cols-[1fr_auto_1fr]`
- Height: `h-14`
- Position: `sticky top-0 z-50`
- Background: glassmorphism (see Glassmorphism section)

### LockButton

Lock/edit toggle. Sits in the header beside user info.

| State | Palette | Icon | Label |
|-------|---------|------|-------|
| **Locked** | Amber (`bg-amber-100 border-amber-300 text-amber-800`) | `Lock` | "Locked" |
| **Editing** | Green (`bg-green-600 border-green-700 text-white`) | `Unlock` | "Editing" |
| **Validating** | Amber | Spinner | "Checking..." |

### DateNavigator

Date stepping control with chevron arrows and a "Today" button. When viewing today, the label receives a cyan highlight (`text-cyan-500 font-semibold`).

```
[‹]  [Today: Mon 6 Apr]  [›]
```

### Card

Three variants:

| Variant | Classes | Use case |
|---------|---------|----------|
| **Default** | `card-standard` + `hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200` | Interactive cards |
| **Static** | `card-standard` (no hover) | Display-only cards |
| **Dashed** | `border border-dashed border-slate-200 rounded-lg` | Empty / unassigned state |

### ReadOnlyBar

Bottom-of-viewport warning bar displayed when the app is locked.

- Position: `fixed bottom-0 left-0 w-full`
- Style: `bg-amber-100/90 backdrop-blur-sm border-t border-amber-300 text-amber-800 text-xs`
- Icon: `Lock` (Lucide) inline before text
- Non-interactive (`pointer-events: none`)

### IconBadge

Icon container with two sizes:

| Size | Dimensions | Classes |
|------|------------|---------|
| Default | 48x48 | `w-12 h-12 rounded-xl` |
| Small | 40x40 | `w-10 h-10 rounded-lg` |

### ModalOverlay

Full-screen modal for actions requiring full attention.

- Overlay: `fixed inset-0 z-50 bg-black/80`
- Content: `rounded-[40px]` (uses `card-bento` radius)
- Dismissal: Escape key closes modal
- Body scroll lock enabled while open

---

## 2. Button System

All buttons are pill-shaped with high-contrast styling.

### Action Buttons

| Class | Classes |
|-------|---------|
| `.btn-primary` | `bg-slate-900 text-white hover:bg-black rounded-full px-6 py-2.5 duration-300 active:scale-[0.98]` |
| `.btn-secondary` | `bg-slate-100 text-slate-900 hover:bg-slate-200 rounded-full` |
| `.btn-outline` | `border border-slate-200 bg-transparent hover:bg-slate-50 rounded-full` |
| `.btn-ghost` | `bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full` |

### Status Buttons

| Class | Style |
|-------|-------|
| `.btn-status-locked` | Amber palette, `rounded-xl`, `duration-200` |
| `.btn-status-unlocked` | Green palette, `rounded-xl`, `duration-200` |

### Icon Buttons

| Class | Style |
|-------|-------|
| `.btn-icon-dark` | White bg, dark border, `rounded-xl`, `p-2` |
| `.btn-icon-standard` | White bg, slate border, `rounded-xl`, `p-2` |

---

## 3. Form Inputs

| Class | Shape | Focus |
|-------|-------|-------|
| `.input-field` | `rounded-full` (pill) | `border border-slate-200 focus:ring-2 focus:ring-slate-400/50` |
| `.input-textarea` | `rounded-2xl` (not pill) | Same focus treatment as `.input-field` |

---

## 4. Card Radius System

| Class | Radius | Use case |
|-------|--------|----------|
| `.card-bento` | `rounded-[40px]` | Large feature cards, hero cards, modals |
| `.card-standard` | `rounded-[32px]` | Project cards, info cards, form cards |

---

## 5. Glassmorphism

```css
.glass {
  @apply bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-sm;
}
```

Used on the AppHeader, sidebar, and any floating surface that sits over content.

---

## 6. Table Pattern

| Element | Classes |
|---------|---------|
| Header row | `bg-slate-50 border-b border-slate-100` |
| Header cells | `section-label text-slate-400` |
| Row hover | `hover:bg-slate-50/50 transition-colors duration-200` |
| Data cells | `text-sm`; monetary amounts use `mono-data` |

---

## 7. Icon System

**Library**: Lucide React exclusively.

| Context | Size | strokeWidth |
|---------|------|-------------|
| Inline | 16px (`w-4 h-4`) | 2 (default) |
| Buttons | 18px (`w-[18px] h-[18px]`) | 2 |
| Features | 24px (`w-6 h-6`) | 2 |
| Bold variant | any | 2.5 |

---

## 8. Sidebar Pattern

Reference: digio-website gold standard.

| Property | Value |
|----------|-------|
| Background | Glassmorphism (`.glass`) |
| Width (expanded) | `w-72` |
| Width (collapsed) | `w-[64px]` |
| Nav item height | `h-10` |
| Nav item shape | `rounded-full` |
| Active nav item | `bg-slate-900 text-white shadow-lg` |
| Collapse animation | `500ms` with `cubic-bezier(0.16, 1, 0.3, 1)` |
| Settings position | Bottom of sidebar, above collapse toggle |
| Section labels | None -- use whitespace between groups |
