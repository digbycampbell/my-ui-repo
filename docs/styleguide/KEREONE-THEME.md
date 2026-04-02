# Kereone Theme Specification

> **Version**: 2.0.0
> **Last updated**: 2026-04-02
>
> Theme specification for kereone-branded apps (kereone-roster, kereone-map).
> These apps serve an external farm client and have a distinct visual identity
> from the digio-branded tools.

---

## 1. Kereone Primary Colour

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| **Primary** | `#4A7E8F` | `196 33% 42%` | Links, active states, focus rings, header accents |
| **Primary (light)** | `#dceef3` | `196 40% 91%` | Light backgrounds, card highlights, hover states |
| **Primary (dark)** | `#3a6573` | `196 33% 34%` | Stronger accents, pressed states |

This blue-teal was chosen to:
- Avoid conflict with staff roster colours (red, yellow, green, blue)
- Avoid conflict with farm map region colours (purple, yellow, teal, green)
- Feel professional and distinct from the digio mint branding

---

## 2. Protected Colours — DO NOT CHANGE

### Staff Roster Colours (kereone-roster)

These colours represent individual staff members and are in active use.
Changing them would confuse users who have learned the colour associations.

| Staff | Fill | Text | Border | CSS Variable |
|-------|------|------|--------|-------------|
| **Kobe** | `#fecaca` | `#7f1d1d` | `#f87171` | `--roster-kobe` |
| **Wiki** | `#fef08a` | `#713f12` | `#facc15` | `--roster-wiki` |
| **Mark** | `#bbf7d0` | `#064e3b` | `#4ade80` | `--roster-mark` |
| **Arby** | `#bfdbfe` | `#1e3a8a` | `#60a5fa` | `--roster-arby` |

> **Conflict note**: Arby's blue (`#bfdbfe` / `#60a5fa`) is a lighter,
> more saturated blue than the kereone primary (`#4A7E8F`). They are
> sufficiently distinct (colour distance ~38) but should not be placed
> directly adjacent without a clear visual separator.

### Farm Map Region Colours (kereone-map)

These colours represent physical farm regions and are tied to the
client's understanding of their property.

| Region | Fill | Hover | Selected |
|--------|------|-------|----------|
| **Lennox** | `#B89AB7` (purple) | `#CAADCA` | `#D6BFD6` |
| **Parsons** | `#E2D98F` (yellow) | `#EBE4A8` | `#F0EABD` |
| **Beach** | `#8CC1C8` (teal) | `#A3D0D6` | `#B8DCE1` |
| **Number One** | `#8DBF92` (green) | `#A5CEA9` | `#BBDCBE` |

> **Conflict note**: Beach teal (`#8CC1C8`) is lighter and more saturated
> than the kereone primary (`#4A7E8F`). They share a similar hue family
> but the primary is darker and more muted, providing sufficient contrast.

### Grazing Readiness Gradient (kereone-map)

| State | Colour | Notes |
|-------|--------|-------|
| Active today (Day 0) | `#5C9E62` | Vibrant green |
| Just grazed (Days 1-4) | `#FFB0B7` | Soft pink |
| Growing (Days 5-13) | `#D1E8B3` → `#46641E` | Light to dark green gradient |
| Ready (Days 14-20) | Continuation of gradient | |
| Overdue (21+ days) | `#344A16` | Very dark green |
| Out of rotation | `#FFFFFF` | White |

---

## 3. Kereone CSS Variables

### Full Theme (for shadcn/ui apps)

```css
:root {
  /* Structure (shared with digio) */
  --background: 0 0% 100%;
  --foreground: 222 15% 28%;
  --card: 0 0% 100%;
  --card-foreground: 222 15% 28%;
  --popover: 0 0% 100%;
  --popover-foreground: 222 15% 28%;

  /* Kereone blue-teal */
  --primary: 196 33% 42%;
  --primary-foreground: 0 0% 100%;
  --secondary: 196 40% 91%;
  --secondary-foreground: 222 15% 28%;

  /* Neutrals (shared with digio) */
  --muted: 220 13% 95%;
  --muted-foreground: 220 9% 46%;
  --accent: 196 40% 91%;
  --accent-foreground: 222 15% 28%;

  /* States (shared with digio) */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  /* Chrome (shared with digio) */
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 196 33% 42%;

  /* Sidebar */
  --sidebar: 0 0% 100%;
  --sidebar-foreground: 222 15% 28%;
  --sidebar-border: 220 13% 91%;
  --sidebar-accent: 196 40% 91%;
  --sidebar-accent-foreground: 222 15% 28%;

  --radius: 0.625rem;

  /* Roster staff colours */
  --roster-kobe: #fecaca;
  --roster-kobe-text: #7f1d1d;
  --roster-kobe-border: #f87171;
  --roster-wiki: #fef08a;
  --roster-wiki-text: #713f12;
  --roster-wiki-border: #facc15;
  --roster-mark: #bbf7d0;
  --roster-mark-text: #064e3b;
  --roster-mark-border: #4ade80;
  --roster-arby: #bfdbfe;
  --roster-arby-text: #1e3a8a;
  --roster-arby-border: #60a5fa;

  /* Elevation utilities (shared) */
  --shadow-xs: 0px 1px 2px 0px rgba(0,0,0,0.04), 0 1px 3px 0 rgba(0,0,0,0.06);
  --shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.04), 0 1px 3px 0 rgba(0,0,0,0.06);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.06), 0 4px 6px -4px rgba(0,0,0,0.06);
  --shadow-premium: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
}
```

### Tailwind `@theme` (for non-shadcn apps)

```css
@theme {
  --color-dark: #3C4151;
  --color-dark-dark: #1a1c1e;
  --color-primary-light: #dceef3;
  --color-primary: #4A7E8F;
  --color-primary-dark: #3a6573;
  --color-accent: #6b7280;
  --color-accent-light: #9ca3af;
  --font-sans: "Outfit", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --shadow-premium: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
}
```

---

## 4. Kereone-Specific UI Patterns

### Lock/Edit Button

Already harmonised between roster and map. Uses the shared `LockButton`
component with amber (locked) and green (editing) states. No change needed
— this pattern is theme-independent.

### Date Navigator

Both apps use date navigation but with different contexts:

| App | Default View | Step Size | Period Jump |
|-----|-------------|-----------|-------------|
| **Roster** | 7-day week | 1 day | 1 week |
| **Map (day)** | Single day | 1 day | N/A |
| **Map (plan)** | 7-day week | 1 week | N/A |

The shared `DateNavigator` component handles all cases via props.

### Paddock Hover (map-specific)

```css
/* Map paddock hover — keep these values fixed */
transition: fill 0.15s ease, fill-opacity 0.15s ease, stroke 0.15s ease, stroke-width 0.15s ease;

/* Default state */
opacity: 0.85;
stroke: #777;
stroke-width: 0.8;

/* Hover state */
opacity: 0.9;
stroke: #555;
stroke-width: 1.5;

/* Selected state */
stroke: #4a7dbd;
stroke-width: 2;
```

### AM/PM Indicators (map-specific)

```tsx
<Sun className="h-3.5 w-3.5 text-amber-500" />   {/* AM */}
<Moon className="h-3.5 w-3.5 text-indigo-400" />  {/* PM */}
```

These are functional indicators and should not change with the theme.

---

## 5. Migration Plan

### kereone-map (currently partially aligned)

The map app already uses `Outfit` + `Space Grotesk` and has a primary at
`HSL 152 48% 55%`. Changes needed:

1. **Font**: Replace Space Grotesk with JetBrains Mono
2. **Primary colour**: Change from `152 48% 55%` to `196 33% 42%`
3. **Secondary/accent**: Update to kereone theme values
4. **Ring colour**: Update to match new primary

> **Risk**: Low. The primary colour change is the most visible — test on
> the farm hub dashboard cards and paddock info popup to ensure readability.

### kereone-roster (needs more work)

The roster uses `Inter` only and has a generic dark primary. Changes needed:

1. **Font**: Add Outfit, update font-sans variable
2. **Mono font**: Already JetBrains Mono — no change
3. **Primary colour**: Change from `240 5.9% 10%` to `196 33% 42%`
4. **Secondary/accent**: Update to kereone theme values
5. **Ring colour**: Update to match new primary
6. **Header**: Implement shared `AppHeader` pattern

> **Risk**: Medium. The primary colour change will affect buttons and
> interactive elements throughout the app. The roster is in production —
> test thoroughly before deploying. Staff colours are defined separately
> and will not be affected.

---

## 6. Future Considerations

### Kereone Logo

The kereone apps currently use a letter icon ("K") in the header. A proper
logo should be created and managed alongside the digio logo system. The
logo should:

- Work at 32x32px (mobile) and 40x40px (desktop)
- Use the kereone primary colour (`#4A7E8F`) or white on teal background
- Be stored in the `my-ui-repo` shared package
- Be referenced in the tools dashboard for the app cards

### Dashboard Harmonisation

The kereone app cards on the digio tools dashboard should eventually use
the kereone primary colour (`#4A7E8F`) for their icon backgrounds, replacing
the current arbitrary amber and violet assignments. This creates a visual
grouping — all kereone apps are teal, all digio apps are mint-family.
