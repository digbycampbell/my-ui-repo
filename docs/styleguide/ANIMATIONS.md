# Digio Animation & Transition Standards

> **Version**: 3.1.0
> **Last updated**: 2026-04-06

---

## 1. Two-Tier Transition System

All animations follow a two-tier system. Pick the tier that matches the interaction scope.

| Tier | Duration | Tailwind Class | Use |
|------|----------|----------------|-----|
| **Fast** (micro) | 200ms | `duration-200` | Button hover/press, icon hover, color changes, micro-interactions |
| **Slow** (layout) | 500ms | `duration-500` | Sidebar collapse, page transitions, layout shifts, card hover elevation |

### Entry Animation Easing

Use the Apple-inspired cubic bezier for all entry animations:

- **Framer Motion**: `ease: [0.16, 1, 0.3, 1]`
- **CSS / Tailwind**: `ease-[cubic-bezier(0.16,1,0.3,1)]`

---

## 2. Marketing vs Tool Apps

| Capability | Marketing Pages | Tool Apps |
|------------|----------------|-----------|
| Scroll-triggered entry (`whileInView`) | Yes | **No** |
| Stagger effects | Yes | **No** |
| Card hover elevation | Yes | Yes |
| Button press feedback | Yes | Yes |
| Micro-interactions (color, icon) | Yes | Yes |
| Modal overlay | Yes | Yes |

**Rule of thumb**: Marketing pages use scroll-triggered and stagger animations to create visual interest. Tool apps skip those entirely and rely on micro-interactions for feedback.

---

## 3. Specific Patterns

### Card Hover

```tsx
<div className="hover:shadow-md transition-all duration-500">
```

Shadow elevation on hover. Use `group` for child elements that react to the card hover.

### Image Zoom (inside card)

```tsx
<img className="group-hover:scale-105 transition-transform duration-500" />
```

### Button Press

```tsx
<button className="transition-colors duration-200 active:scale-[0.98]">
```

### Sidebar Collapse

```tsx
<aside className="transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
```

Text inside the sidebar fades with the collapse:

```tsx
<span className="transition-all duration-500 opacity-0 group-[.expanded]:opacity-100">
```

### Modal Overlay

```tsx
<div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" />
```

### Framer Motion Entry

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ ease: [0.16, 1, 0.3, 1] }}
/>
```

### Scroll-Triggered (marketing pages only)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ ease: [0.16, 1, 0.3, 1] }}
/>
```

---

## 4. Hover Effects Summary

| Element | Effect | Tier |
|---------|--------|------|
| Card | Shadow elevation change (`hover:shadow-md`) | Slow |
| Button | Background color shift + scale (`active:scale-[0.98]`) | Fast |
| Icon | Color transition | Fast |
| Nav item | Background + text color change | Fast |
| Table row | Subtle background change | Fast |
| Link | Color change to cyan | Fast |

---

## 5. Reduced Motion

Respect the user's motion preferences. Add this to the shared CSS base:

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

All apps must respect `prefers-reduced-motion`.
