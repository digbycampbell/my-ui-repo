# Digio Animation & Transition Standards

> **Version**: 2.0.0
> **Last updated**: 2026-04-02

---

## 1. Transition Tiers

All animations in the Digio ecosystem follow a 3-tier system. Use the
appropriate tier based on the type of interaction.

| Tier | Name | Duration | Easing | Usage |
|------|------|----------|--------|-------|
| **T1** | Micro | `150ms` | `ease` | Hover states, focus rings, colour changes, opacity toggles |
| **T2** | Standard | `250ms` | `ease-out` | Panels opening, cards sliding, menus appearing, date navigation |
| **T3** | Page | `400ms` | `ease-out` | Route transitions, large reveals, first-load animations |

### Tailwind Utility Classes

```css
/* T1 — Micro */
.transition-micro { @apply transition-all duration-150 ease-in-out; }

/* T2 — Standard */
.transition-standard { @apply transition-all duration-250 ease-out; }

/* T3 — Page */
.transition-page { @apply transition-all duration-400 ease-out; }
```

> **Note**: `duration-250` and `duration-400` are not default Tailwind values.
> Add them to your Tailwind config or use inline `style={{ transitionDuration: '250ms' }}`.
> Alternatively, use `duration-200` and `duration-500` as close approximations.

---

## 2. Marketing Site vs Tools

| Animation Type | Marketing Site | Tools Apps |
|---------------|---------------|------------|
| Page route transitions (fade + slide) | Yes (Framer Motion) | **No** |
| Scroll-triggered entry (`whileInView`) | Yes (Framer Motion) | **No** |
| Staggered card entry delays | Yes (`delay: index * 0.05`) | **No** |
| Float animation (decorative) | Yes (`6s ease-in-out infinite`) | **No** |
| Card hover lift + shadow | Yes | **Yes** |
| Menu open/close (zoom + fade) | Yes | **Yes** |
| Button press feedback (`active:scale-95`) | Yes | **Yes** |
| Toast slide-in | Yes | **Yes** |
| Modal overlay fade | Yes | **Yes** |
| Date navigation card slide | N/A | **Yes** |
| Lock button colour transition | N/A | **Yes** |

**Rationale**: Tools are task-focused — users interact with them repeatedly
and page transitions become friction. Keep micro-interactions (which provide
feedback) but remove cinematic animations (which add load time).

---

## 3. Shared Animations (All Apps)

### Card Hover

**Tier**: T1 (Micro)

```tsx
<div className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
```

The card lifts 2px and gains a shadow on hover. Uses `group` class for
child elements that react to the card hover (e.g. chevron appearing).

### Button Press

**Tier**: T1 (Micro)

```tsx
<button className="transition-colors active:scale-95">
```

Scales to 95% on press, returns immediately on release. Lightweight tactile
feedback.

### Menu Open/Close (Radix UI)

**Tier**: T2 (Standard)

```tsx
className={cn(
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2",
  "data-[side=top]:slide-in-from-bottom-2"
)}
```

This is the standard shadcn/ui dropdown animation. All apps using Radix UI
get this for free. Duration is controlled by `tw-animate-css` defaults (~200ms).

### Modal Overlay

**Tier**: T2 (Standard)

```tsx
{/* Backdrop */}
<div className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

{/* Content */}
<div className="fixed left-1/2 top-1/2 z-50 ... duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95" />
```

Overlay fades in, content zooms from 95%. Used for export dialogs, settings,
destructive confirmations, and any full-attention action.

### Toast Notifications

**Tier**: T2 (Standard)

Toasts slide in from the bottom-right (desktop) or top (mobile). Duration
is handled by the toast library (Sonner). No custom animation needed.

### Focus Ring

**Tier**: T1 (Micro)

```tsx
className="transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
```

Smooth ring appearance on focus. Uses the theme's primary colour at 30%
opacity.

---

## 4. Date Navigation Card Slide

When the date navigator steps forward or backward, content cards should
slide in the direction of travel. This is a lightweight CSS transition, not
a Framer Motion animation.

**Tier**: T2 (Standard)

### Implementation

```tsx
// Track slide direction
const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

function goNext() {
  setSlideDirection('left');
  setDate(addDays(date, 1));
}

function goPrev() {
  setSlideDirection('right');
  setDate(subDays(date, 1));
}

// Apply to card container
<div
  className="transition-transform duration-200 ease-out"
  style={{
    transform: slideDirection === 'left'
      ? 'translateX(-8px)' : slideDirection === 'right'
      ? 'translateX(8px)' : 'translateX(0)'
  }}
  onTransitionEnd={() => setSlideDirection(null)}
>
  {/* Date-dependent content */}
</div>
```

The cards shift 8px in the travel direction and snap back, giving a subtle
sense of movement without heavy animation. The `onTransitionEnd` callback
resets the transform.

### Alternative: CSS `@starting-style` (modern browsers)

For a more elegant approach without state tracking:

```css
.date-card {
  transition: opacity 200ms ease-out, transform 200ms ease-out;
}

.date-card[data-direction="left"] {
  animation: slide-left 200ms ease-out;
}

.date-card[data-direction="right"] {
  animation: slide-right 200ms ease-out;
}

@keyframes slide-left {
  from { opacity: 0.8; transform: translateX(12px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slide-right {
  from { opacity: 0.8; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}
```

---

## 5. Loading States

### Spinner

```tsx
<div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
```

Tailwind's built-in `animate-spin` — continuous rotation. Adapt border
colour to context (e.g. `border-t-amber-800` inside the lock button).

### Pulse

```tsx
<div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
```

Tailwind's built-in `animate-pulse` — opacity oscillation. Used for
"processing" indicators.

---

## 6. Selection & Overlay Highlights

### Selection Overlay (roster/table)

**Tier**: T1 (Micro)

```tsx
<div className="pointer-events-none absolute z-10 rounded-lg border-2 border-amber-500 bg-amber-100/30 transition-all duration-150 ease-out" />
```

Smooth position/size transitions as the user drags or extends a selection.

### Paste Preview Overlay

```tsx
<div className="pointer-events-none absolute z-10 rounded-lg border-2 border-dashed border-blue-400 bg-blue-100/20 transition-all duration-150 ease-out" />
```

Dashed blue border indicates where content will be pasted.

---

## 7. Hover Effects Summary

| Element | Effect | Duration | Tier |
|---------|--------|----------|------|
| Card | `shadow-lg` + `-translate-y-0.5` | 150ms | T1 |
| Card icon | `bg-primary/10` → `bg-primary/15` | 150ms | T1 |
| Card chevron | `opacity-0` → `opacity-100` | 150ms | T1 |
| Button | Colour change (`hover:bg-*`) | 150ms | T1 |
| Nav item | `hover:bg-muted/50` | 150ms | T1 |
| Table row | `hover:bg-muted/20` | 150ms | T1 |
| Link | Colour change to primary-dark | 150ms | T1 |
| Map paddock | Fill + stroke colour change | 150ms | T1 |

---

## 8. Reduced Motion

Respect the user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Add this to the shared CSS base. All apps should respect `prefers-reduced-motion`.
