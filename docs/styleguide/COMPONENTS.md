# Digio Component Patterns

> **Version**: 3.2.0
> **Last updated**: 2026-04-06
> **Mode**: Light mode only

---

## 1. Shared Components

All shared components live in `my-ui-repo/components/`.

### AppNavbar (NEW — replaces AppHeader)

Fixed top navigation bar. Matches the digio-website gold standard.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [≡] [D̄] Digio.  TOOLS  >  [icon] Tool     [Actions] [Lock] [User] [→] │
└──────────────────────────────────────────────────────────────────────────┘
```

- Position: `fixed top-0 left-0 right-0 h-14 z-40`
- Background: glassmorphism (`bg-white/70 backdrop-blur-xl border-b border-slate-200/50`)
- Left: Mobile toggle (`PanelLeft`, `lg:hidden`) → Animated Digio logo SVG (geometric D with electrical transient, Framer Motion) → "Digio." branding (`text-lg font-display font-bold`) → "TOOLS" label (`text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-slate-400`)
- Right: Custom action buttons → `LockButton` → User email badge (indigo-500 avatar) → Sign out button (`LogOut` icon)

**Logo**: The Digio logo is an inline SVG (geometric D outline with an animated electrical transient waveform inside), not a plain text letter. It uses `motion.path` from Framer Motion to animate the waveform on loop. See `Logo.jsx` in digio-website for the canonical implementation.

**"TOOLS" label**: Uses `font-medium` (not `font-bold`). Do NOT use the `.section-label` utility here — it includes `font-bold` which is too heavy next to the Digio branding. Spell out the classes explicitly: `text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-slate-400`.

**Breadcrumb pattern** (for tool-specific apps): After "TOOLS", add a chevron separator and tool identity:
```tsx
<ChevronRight size={14} className="text-slate-300 shrink-0" />
<div className="flex items-center gap-2">
  <Receipt size={14} className="text-[#f472b6] shrink-0" />
  <span className="text-sm font-medium text-slate-900">Receipts</span>
</div>
```

Props:
| Prop | Type | Description |
|------|------|-------------|
| `toolLabel` | `string` | Label shown after "Digio." (e.g. "Receipts", "TOOLS") |
| `onMenuToggle` | `() => void` | Mobile sidebar toggle handler |
| `actions` | `ReactNode` | Custom buttons between tool label and lock |
| `isLocked` / `isValidating` / `onToggleLock` | lock state | Passed to internal LockButton |
| `userEmail` | `string` | Displayed in user badge |
| `onSignOut` | `() => void` | Sign out handler |

### AppHeader (LEGACY)

Still exported for backwards compatibility. New apps should use `AppNavbar` instead. The key difference: AppHeader uses a 3-column grid with `sticky` positioning, while AppNavbar uses a simple flex with `fixed` positioning matching the website.

### LockButton

Lock/edit toggle. Sits in the header beside user info.

| State | Palette | Icon | Label |
|-------|---------|------|-------|
| **Locked** | Amber (`bg-amber-100 border-amber-300 text-amber-800`) | `Lock` | "Locked" |
| **Editing** | Green (`bg-green-600 border-green-700 text-white`) | `Unlock` | "Editing" |
| **Validating** | Amber | Spinner | "Checking..." |

### SidebarShell (NEW)

Fixed sidebar container with collapse animation, mobile overlay, and toggle button.

- Position: `fixed top-14 left-0 bottom-0 z-50`
- Background: glassmorphism
- Width: `w-72` (expanded) → `w-[64px]` (collapsed)
- Animation: `transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`
- Mobile: `-translate-x-full` when closed, overlay with `bg-slate-900/30 backdrop-blur-sm`
- Bottom: PanelLeft/PanelLeftClose collapse toggle (desktop), Close button (mobile)

Props:
| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Whether sidebar is visible on mobile |
| `collapsed` | `boolean` | Whether sidebar shows icons only |
| `onClose` | `() => void` | Close handler (mobile) |
| `onToggleCollapse` | `() => void` | Collapse toggle handler |
| `children` | `ReactNode` | Sidebar content (nav items, settings) |
| `footer` | `ReactNode` | Optional content above collapse toggle |

#### Nav Item Helper Functions

```tsx
import { sidebarNavItemClasses, sidebarNavIconClasses, sidebarNavLabelClasses } from "../shared-ui/components";

<button className={sidebarNavItemClasses(collapsed, isActive, isDisabled)}>
  <span className={sidebarNavIconClasses(collapsed)}>
    <MyIcon size={16} />
  </span>
  <span className={sidebarNavLabelClasses(collapsed)}>
    Label
  </span>
</button>
```

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

> **Warning**: Never render ModalOverlay inside a sidebar or any element with CSS transforms. Always render at the root level of your app.

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

Used on the AppNavbar, SidebarShell, and any floating surface that sits over content.

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

Use the `SidebarShell` component (see Section 1) for all sidebar implementations. It provides collapse animation, mobile overlay, and the toggle button out of the box, matching the digio-website gold standard.

For nav item styling, use the exported helper functions `sidebarNavItemClasses`, `sidebarNavIconClasses`, and `sidebarNavLabelClasses` rather than hand-rolling class strings.

| Property | Value |
|----------|-------|
| Nav item height | `h-10` |
| Nav item shape | `rounded-full` |
| Active nav item | `bg-slate-900 text-white shadow-lg` |
| Settings position | Bottom of sidebar, above collapse toggle |
| Section labels | None -- use whitespace between groups |
