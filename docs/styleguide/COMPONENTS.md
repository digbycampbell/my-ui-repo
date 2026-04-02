# Digio Component Patterns

> **Version**: 2.0.0
> **Last updated**: 2026-04-02
>
> Components marked with `[shared]` are candidates for the `my-ui-repo`
> package to be shared between repos via git submodules.

---

## 1. App Header Bar `[shared]`

The top bar is the primary shared navigation element across all tools. It
provides branding, authentication status, and the lock/edit toggle in a
consistent location.

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] App Name          [Date Nav?]    [Lock] [User] [≡] │
└─────────────────────────────────────────────────────────────┘
```

Three-column grid: `grid-cols-[1fr_auto_1fr]`

### Reference Implementation

```tsx
// AppHeader.tsx [shared]
import { Lock, Unlock, Menu, User } from "lucide-react";

interface AppHeaderProps {
  appName: string;
  logoSlot?: React.ReactNode;      // App logo or letter icon
  centerSlot?: React.ReactNode;    // Date navigator, search, etc.
  isLocked?: boolean;
  onToggleLock?: () => void;
  userEmail?: string;
  onMenuClick?: () => void;
}

export function AppHeader({
  appName, logoSlot, centerSlot,
  isLocked, onToggleLock, userEmail, onMenuClick
}: AppHeaderProps) {
  return (
    <header className="border-b bg-card px-3 md:px-6 py-2 grid grid-cols-[1fr_auto_1fr] items-center sticky top-0 z-50 shadow-sm gap-2 md:gap-4">
      {/* Left: Logo + App Name */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        {logoSlot ?? (
          <div className="w-8 h-8 md:w-9 md:h-9 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-sm md:text-base flex-shrink-0">
            {appName[0]}
          </div>
        )}
        <h1 className="hidden sm:block text-sm md:text-base font-semibold tracking-tight truncate">
          {appName}
        </h1>
      </div>

      {/* Center: Optional (date nav, etc.) */}
      <div className="flex items-center justify-center">
        {centerSlot}
      </div>

      {/* Right: Lock + User + Menu */}
      <div className="flex items-center gap-1.5 md:gap-2 justify-end min-w-0">
        {onToggleLock && (
          <LockButton isLocked={isLocked} onToggle={onToggleLock} />
        )}
        {userEmail && (
          <span className="hidden md:block text-xs text-muted-foreground truncate max-w-[180px] font-sans">
            {userEmail}
          </span>
        )}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
}
```

### Responsive Behaviour

| Element | Mobile (<768px) | Desktop (>=768px) |
|---------|----------------|-------------------|
| Logo icon | 32x32px | 36x36px |
| App name | Hidden | Visible, truncated |
| Lock button | Icon only | Icon + label text |
| User email | Hidden | Visible, truncated |
| Burger menu | Always visible | Always visible |
| Padding | `px-3 py-2` | `px-6 py-2` |

---

## 2. Lock/Edit Toggle `[shared]`

The lock button provides a consistent editing toggle across all tools. It
sits in the header bar beside the user's sign-in status.

### States

| State | Background | Border | Text | Icon | Label |
|-------|-----------|--------|------|------|-------|
| **Locked** | `bg-amber-100` | `border-amber-300` | `text-amber-800` | `Lock` | "Locked" |
| **Editing** | `bg-green-600` | `border-green-700` | `text-white` | `Unlock` | "Editing" |
| **Validating** | `bg-amber-100` | `border-amber-300` | `text-amber-800` | Spinner | "Checking..." |

### Reference Implementation

```tsx
// LockButton.tsx [shared]
import { Lock, Unlock } from "lucide-react";

interface LockButtonProps {
  isLocked?: boolean;
  isValidating?: boolean;
  onToggle: () => void;
}

export function LockButton({ isLocked = true, isValidating, onToggle }: LockButtonProps) {
  return (
    <button
      onClick={onToggle}
      disabled={isValidating}
      className={cn(
        "h-7 md:h-8 px-2 md:px-3 rounded-lg text-[11px] font-medium border shadow-sm",
        "transition-colors active:scale-95 flex items-center gap-1 md:gap-1.5 flex-shrink-0",
        isLocked
          ? "bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200"
          : "bg-green-600 border-green-700 text-white hover:bg-green-700"
      )}
    >
      {isValidating ? (
        <div className="w-3.5 h-3.5 border-2 border-amber-800/30 border-t-amber-800 rounded-full animate-spin" />
      ) : isLocked ? (
        <Lock className="w-3.5 h-3.5" />
      ) : (
        <Unlock className="w-3.5 h-3.5" />
      )}
      <span className="hidden md:inline">
        {isValidating ? "Checking..." : isLocked ? "Locked" : "Editing"}
      </span>
    </button>
  );
}
```

### Read-Only Warning Bar

When the app is locked, display a non-interactive warning bar at the bottom
of the viewport.

```tsx
// ReadOnlyBar.tsx [shared]
import { Lock } from "lucide-react";

export function ReadOnlyBar({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="fixed bottom-0 left-0 w-full z-[1000] bg-amber-100/90 backdrop-blur-sm border-t border-amber-300 px-4 py-1.5 text-center text-xs text-amber-800"
      style={{ pointerEvents: "none" }}
    >
      <Lock className="w-3 h-3 inline mr-1" />
      View Only Mode — Click the lock button to enable editing
    </div>
  );
}
```

---

## 3. Date Navigator `[shared]`

A shared navigation control for stepping through dates. Used in roster
(week view), map (day/plan view), and potentially receipts (date filtering).

### Layout

```
┌───────────────────────────────────────────┐
│  [«] │ [‹] │ [Today] │ [›] │ [»]        │
└───────────────────────────────────────────┘
```

Outlined button group with dividers. Double arrows (jump period) hidden on
mobile.

### Reference Implementation

```tsx
// DateNavigator.tsx [shared]
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DateNavigatorProps {
  label: string;              // e.g. "Mon 31 Mar" or "Week 14"
  isToday?: boolean;          // Highlight label in primary colour
  onPrev: () => void;
  onNext: () => void;
  onPrevPeriod?: () => void;  // Jump (hidden on mobile if undefined)
  onNextPeriod?: () => void;
  onToday: () => void;
}

export function DateNavigator({
  label, isToday, onPrev, onNext, onPrevPeriod, onNextPeriod, onToday
}: DateNavigatorProps) {
  return (
    <div className="flex items-center border rounded-lg bg-background shadow-sm">
      {onPrevPeriod && (
        <>
          <NavButton onClick={onPrevPeriod} className="hidden md:flex">
            <ChevronsLeft className="w-4 h-4" />
          </NavButton>
          <Divider className="hidden md:block" />
        </>
      )}
      <NavButton onClick={onPrev}>
        <ChevronLeft className="w-4 h-4" />
      </NavButton>
      <Divider />
      <button
        onClick={onToday}
        className="h-8 px-3 text-xs font-medium hover:bg-muted/50 transition-colors"
      >
        <span className={isToday ? "text-primary font-semibold" : ""}>
          {label}
        </span>
      </button>
      <Divider />
      <NavButton onClick={onNext}>
        <ChevronRight className="w-4 h-4" />
      </NavButton>
      {onNextPeriod && (
        <>
          <Divider className="hidden md:block" />
          <NavButton onClick={onNextPeriod} className="hidden md:flex">
            <ChevronsRight className="w-4 h-4" />
          </NavButton>
        </>
      )}
    </div>
  );
}

function NavButton({ onClick, className, children }: {
  onClick: () => void; className?: string; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-8 w-8 flex items-center justify-center hover:bg-muted/50 rounded-md transition-colors",
        className
      )}
    >
      {children}
    </button>
  );
}

function Divider({ className }: { className?: string }) {
  return <div className={cn("w-px h-4 bg-border", className)} />;
}
```

### Today Highlight

When viewing today's date, the label text uses `text-primary font-semibold`.
On the kereone-map, a small "Today" sub-label appears below in
`text-[10px] text-primary font-medium`.

---

## 4. Cards

Cards are the most common UI pattern across all apps. All tools should use
the same base card style.

### Standard Card

Derived from the kereone-map farm hub cards — the agreed-upon standard.

```tsx
// Card base pattern
<div className="bg-card rounded-xl border border-border p-5 sm:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 group">
  {/* Card content */}
</div>
```

| Property | Value | Notes |
|----------|-------|-------|
| Background | `bg-card` (white) | Consistent across themes |
| Border radius | `rounded-xl` (12px) | Standard for all cards |
| Border | `border border-border` | Subtle gray outline |
| Padding | `p-5 sm:p-6` | 20px mobile, 24px desktop |
| Hover shadow | `hover:shadow-lg` | Elevation on interaction |
| Hover lift | `hover:-translate-y-0.5` | 2px upward shift |
| Transition | `transition-all duration-150` | Micro tier (150ms) |

### Card with Icon Badge

Used for dashboard app cards and feature cards.

```tsx
<div className="bg-card rounded-xl border border-border p-5 sm:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 group">
  <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors duration-150 flex items-center justify-center mb-4">
    <Icon className="h-5 w-5 text-primary" />
  </div>
  <h3 className="font-semibold tracking-tight flex items-center gap-1">
    Card Title
    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
  </h3>
  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
    Card description text here.
  </p>
</div>
```

### Info Popup Card

Used for contextual information overlays (paddock info, receipt details).
Fixed position, dismissable.

```tsx
<div className="fixed bottom-20 sm:bottom-4 right-4 w-72 bg-card rounded-xl shadow-lg border border-border p-4 z-50">
  {/* Header */}
  <div className="flex items-center gap-2">
    <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
      [CODE]
    </span>
    <span className="font-semibold text-base">Item Name</span>
  </div>
  {/* Content */}
  <div className="mt-2 space-y-1.5 text-sm">
    {/* Key-value rows */}
  </div>
</div>
```

### Empty State / Unassigned Card

Dashed outline indicating where content can be assigned.

```tsx
<div className="border border-dashed border-border rounded-lg h-7 flex items-center justify-center text-[10px] text-muted-foreground/40 hover:text-primary hover:border-primary/30 transition-colors">
  Not assigned
</div>
```

---

## 5. Buttons

### Variants

| Variant | Classes | Usage |
|---------|---------|-------|
| **Primary** | `bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm` | Main actions |
| **Secondary** | `bg-secondary text-secondary-foreground hover:bg-secondary/80` | Secondary actions |
| **Outline** | `border border-border bg-background hover:bg-muted` | Tertiary actions |
| **Ghost** | `hover:bg-muted text-foreground` | Subtle actions, nav items |
| **Destructive** | `bg-destructive text-destructive-foreground hover:bg-destructive/90` | Delete, danger |

### Base Styles (all variants)

```css
rounded-lg text-sm font-medium transition-colors active:scale-95
h-9 px-4          /* default */
h-8 px-3 text-xs  /* sm */
h-7 px-2 text-xs  /* xs */
w-8 h-8           /* icon */
```

### Press Feedback

All buttons use `active:scale-95` for tactile press feedback. This is
lightweight and works well on both desktop and mobile.

---

## 6. Icon System

### Library

**Lucide React** — used consistently across all apps.

### Icon Sizing

| Context | Size | Tailwind |
|---------|------|----------|
| Navigation | 20px | `w-5 h-5` |
| Buttons | 16px | `w-4 h-4` |
| Inline text | 14px | `w-3.5 h-3.5` |
| Small badges | 12px | `w-3 h-3` |
| Map badges (SVG) | 6.5px | Via SVG `fontSize` |

### Icon Badges

```css
/* Standard icon badge — used in cards and features */
.icon-badge {
  @apply w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground;
}

/* Small icon badge — lighter background */
.icon-badge-sm {
  @apply w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary;
}
```

### AM/PM Indicators (kereone-map specific)

```tsx
<Sun className="h-3.5 w-3.5 text-amber-500" />   {/* AM */}
<Moon className="h-3.5 w-3.5 text-indigo-400" />  {/* PM */}
```

---

## 7. Burger Menu

The burger menu uses the standard Radix UI `DropdownMenu` with consistent
animation (see [ANIMATIONS.md](./ANIMATIONS.md)).

### Trigger Button

```tsx
<button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
  <Menu className="w-4 h-4" />
</button>
```

### Menu Content

```tsx
<DropdownMenuContent align="end" className="w-52">
  {/* Items */}
</DropdownMenuContent>
```

The `Menu` icon from Lucide React is the standard burger icon across all apps.

---

## 8. Modal Overlay (Full-Attention Actions)

For actions that require the user's full attention — export dialogs, API key
entry, autofill confirmation, destructive confirmations.

### Overlay

```tsx
<div className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
```

### Modal Content

```tsx
<div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card rounded-xl border border-border p-6 shadow-xl">
  {/* Header, content, footer */}
</div>
```

Use `AlertDialog` from shadcn/ui for destructive confirmations. Use `Dialog`
for non-destructive modals.

---

## 9. Toast Notifications

Info popup cards (bottom-right) using Sonner or shadcn/ui toast.

### Positioning

- **Desktop**: Fixed bottom-right, `max-w-[420px]`
- **Mobile**: Fixed top, full width

### Usage

- Success: Green left border or icon
- Error: Red left border or icon
- Info: Primary colour border or icon
- Duration: 4 seconds default, 8 seconds for errors

---

## 10. Forms & Inputs

### Input Base

```tsx
<input className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
```

### Focus Ring

All interactive elements use `focus:ring-2 focus:ring-primary/30` for
consistent focus indication. The ring colour inherits from the app's theme
(mint for digio, teal for kereone).

---

## 11. Tables

Tables should use a clean, minimal style with clear row separation.

### Guidelines

- Use `border border-border rounded-lg overflow-hidden` on the table container
- Header rows: `bg-muted/30` with `font-mono text-xs uppercase tracking-widest text-muted-foreground`
- Data rows: `h-10 md:h-11 border-b` with `hover:bg-muted/20 transition-colors`
- Use sticky left column with shadow for horizontal scroll tables
- Weekend/holiday shading: Use distinct background colours + text indicators (not just shading alone)
- Today column: `bg-blue-50/30` with `border-b-2 border-blue-400` on header

### Row State Colours

| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | `bg-card` | `border-b` | `text-foreground` |
| Hover | `bg-muted/20` | — | — |
| Weekend | `bg-gray-50` | — | — |
| Holiday | `bg-red-50/70` | — | `text-red-800` (with label) |
| Today | `bg-blue-50/30` | `border-b-2 border-blue-400` | `text-blue-600` |
| Selected | `bg-amber-50/80` | `ring-1 ring-amber-300` | `text-amber-800` |

> **Note on shading**: Colour shading alone is insufficient to communicate
> meaning (weekends, holidays). Always pair shading with a text label,
> icon, or border treatment for accessibility.

---

## 12. `my-ui-repo` Shared Component Candidates

The following components should be extracted into the `my-ui-repo` package
for sharing via git submodules:

| Component | File | Priority | Notes |
|-----------|------|----------|-------|
| `AppHeader` | `AppHeader.tsx` | High | Top bar with logo, lock, user, menu |
| `LockButton` | `LockButton.tsx` | High | Lock/edit toggle |
| `ReadOnlyBar` | `ReadOnlyBar.tsx` | High | Bottom warning bar |
| `DateNavigator` | `DateNavigator.tsx` | High | Date stepping with period jumps |
| `Card` | `Card.tsx` | Medium | Standard card with hover lift |
| `IconBadge` | `IconBadge.tsx` | Medium | Icon container (standard + small) |
| `ModalOverlay` | `ModalOverlay.tsx` | Medium | Full-attention overlay pattern |
| CSS utilities | `digio-base.css` | High | `.section-label`, `.meta-label`, `.body-text`, `.mono-data` |
| Theme variables | `theme-digio.css` | High | CSS variables for digio theme |
| Theme variables | `theme-kereone.css` | High | CSS variables for kereone theme |
| Font preload | `fonts.html` | Medium | Google Fonts snippet |

### Submodule Usage

```bash
# Add to any app repo
git submodule add https://github.com/digbycampbell/my-ui-repo.git shared-ui

# Import CSS
@import "../shared-ui/css/theme-digio.css";
@import "../shared-ui/css/digio-base.css";

# Import components
import { AppHeader, LockButton, DateNavigator } from "../shared-ui/components";
```
