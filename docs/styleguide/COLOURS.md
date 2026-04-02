# Digio Colour System

> **Version**: 2.0.0
> **Last updated**: 2026-04-02

---

## 1. Brand Colours

Digio uses a minimal palette derived from the original brand guide. These are
the foundation colours that all platform apps inherit.

### Core Brand Palette

| Role | Token | Hex | HSL | Usage |
|------|-------|-----|-----|-------|
| **Bright Gray** | `--color-dark` | `#3C4151` | `222 15% 28%` | Structure, headings, primary button fills, card headers, navbar backgrounds |
| **Bright Gray (deep)** | `--color-dark-dark` | `#1a1c1e` | `210 7% 11%` | Extra-dark variant — hero sections, footer, emphasis text |
| **Magic Mint** | `--color-primary` | `#AAF0D1` | `152 76% 81%` | Brand signal — links, hover states, active indicators, badges, focus rings |
| **Magic Mint (light)** | `--color-primary-light` | `#e0f7ef` | `152 68% 93%` | Light backgrounds, secondary fills, card highlights |
| **Magic Mint (dark)** | `--color-primary-dark` | `#6fd6a8` | `152 56% 64%` | Icon badges, section labels, stronger accents, CTA text |
| **Accent (Gray)** | `--color-accent` | `#6b7280` | `220 9% 46%` | Body text, metadata, muted descriptions |
| **Accent (light)** | `--color-accent-light` | `#9ca3af` | `220 9% 64%` | Placeholder text, disabled states |

### Semantic Colours

These are shared across all apps and should not be changed per-app.

| Role | Hex | HSL | Usage |
|------|-----|-----|-------|
| **Destructive** | `#ef4444` | `0 84% 60%` | Delete buttons, error states, danger alerts |
| **Warning** | `#f59e0b` | `38 92% 50%` | Caution states, locked indicators |
| **Success** | `#22c55e` | `142 71% 45%` | Confirmation, active/editing states |
| **Info** | `#3b82f6` | `217 91% 60%` | Informational badges, today highlights |
| **Background** | `#ffffff` | `0 0% 100%` | Page background |
| **Card** | `#ffffff` | `0 0% 100%` | Card and popover surfaces |
| **Border** | `#e5e7eb` | `220 13% 91%` | Dividers, input borders, card outlines |

---

## 2. Platform Themes

The Digio ecosystem has two distinct theme families. Apps belong to one or
the other.

### Digio Theme (default)

Used by: digio-website, digio-receipts, digio-invoices, and all future
digio-branded tools.

The brand Magic Mint is the primary accent colour. Each digio app may define
a unique **app accent** for its dashboard card icon and in-app highlights
(see Section 3), but the overall palette remains mint-based.

```css
/* Digio theme — primary accent */
--primary: 152 76% 81%;        /* Magic Mint #AAF0D1 */
--primary-foreground: 222 15% 28%; /* Bright Gray text on mint */
```

### Kereone Theme

Used by: kereone-roster, kereone-map, and future kereone-branded tools.

These apps serve an external farm client and use a distinct blue-teal accent
that does not conflict with farm worker colours or paddock region colours.

```css
/* Kereone theme — primary accent */
--primary: 196 33% 42%;        /* Blue-Teal #4A7E8F */
--primary-foreground: 0 0% 100%;  /* White text on teal */
```

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| **Kereone Primary** | `#4A7E8F` | `196 33% 42%` | Links, active states, focus rings, header accents |
| **Kereone Primary (light)** | `#dceef3` | `196 40% 91%` | Light backgrounds, card highlights |
| **Kereone Primary (dark)** | `#3a6573` | `196 33% 34%` | Stronger accents, hover states |

> **Important**: Kereone apps have additional fixed colours that must NOT be
> changed. See [KEREONE-THEME.md](./KEREONE-THEME.md) for the complete list
> of protected roster and map colours.

---

## 3. App Accent Colours (Dashboard Cards)

Each app on the digio tools dashboard has an accent colour used for its icon
background and card highlight. These are drawn from the brand palette family
rather than arbitrary Tailwind defaults.

### Digio Apps

| App | Accent Hex | Token | Notes |
|-----|-----------|-------|-------|
| Receipts | `#6fd6a8` | `primary-dark` | Mint-dark — finance/trust |
| Invoices | `#AAF0D1` | `primary` | Brand mint |
| Chemical Inventory | `#3C4151` | `dark` | Bright Gray — utility feel |
| Settings | `#6b7280` | `accent` | Neutral gray |

### Kereone Apps

| App | Accent Hex | Token | Notes |
|-----|-----------|-------|-------|
| Roster | `#4A7E8F` | `kereone-primary` | Blue-teal |
| Map | `#4A7E8F` | `kereone-primary` | Blue-teal (shared branding) |

> App accents are defined in `digio-website/src/data/apps.js`. When adding a
> new app, choose an accent from the brand palette above — do not introduce
> new arbitrary colours.

---

## 4. CSS Variable Mapping (shadcn/ui apps)

Apps using shadcn/ui should map the brand colours in their `index.css`.

### Digio Theme — Light Mode

```css
:root {
  /* Structure */
  --background: 0 0% 100%;
  --foreground: 222 15% 28%;

  --card: 0 0% 100%;
  --card-foreground: 222 15% 28%;

  --popover: 0 0% 100%;
  --popover-foreground: 222 15% 28%;

  /* Brand mint */
  --primary: 152 56% 64%;
  --primary-foreground: 0 0% 100%;

  /* Mint light */
  --secondary: 152 68% 93%;
  --secondary-foreground: 222 15% 28%;

  /* Neutrals */
  --muted: 220 13% 95%;
  --muted-foreground: 220 9% 46%;

  --accent: 152 68% 93%;
  --accent-foreground: 222 15% 28%;

  /* States */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  /* Chrome */
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 152 56% 64%;

  /* Sidebar */
  --sidebar: 0 0% 100%;
  --sidebar-foreground: 222 15% 28%;
  --sidebar-border: 220 13% 91%;
  --sidebar-accent: 152 68% 93%;
  --sidebar-accent-foreground: 222 15% 28%;

  --radius: 0.625rem;
}
```

### Digio Theme — Dark Mode

```css
.dark {
  --background: 222 15% 11%;
  --foreground: 220 13% 95%;

  --card: 222 15% 14%;
  --card-foreground: 220 13% 95%;

  --popover: 222 15% 14%;
  --popover-foreground: 220 13% 95%;

  --primary: 152 76% 81%;
  --primary-foreground: 222 15% 28%;

  --secondary: 222 15% 18%;
  --secondary-foreground: 220 13% 95%;

  --muted: 222 15% 18%;
  --muted-foreground: 220 9% 65%;

  --accent: 222 15% 18%;
  --accent-foreground: 220 13% 95%;

  --destructive: 0 60% 50%;
  --destructive-foreground: 220 13% 95%;

  --border: 222 15% 20%;
  --input: 222 15% 20%;
  --ring: 152 76% 81%;
}
```

### Kereone Theme — Light Mode

```css
:root {
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

  --muted: 220 13% 95%;
  --muted-foreground: 220 9% 46%;

  --accent: 196 40% 91%;
  --accent-foreground: 222 15% 28%;

  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 196 33% 42%;

  --sidebar: 0 0% 100%;
  --sidebar-foreground: 222 15% 28%;
  --sidebar-border: 220 13% 91%;
  --sidebar-accent: 196 40% 91%;
  --sidebar-accent-foreground: 222 15% 28%;

  --radius: 0.625rem;
}
```

---

## 5. Tailwind CSS 4 (non-shadcn apps)

Apps using Tailwind directly (without shadcn/ui) should define the palette
in a `@theme` block.

### Digio Theme

```css
@theme {
  --color-dark: #3C4151;
  --color-dark-dark: #1a1c1e;
  --color-primary-light: #e0f7ef;
  --color-primary: #AAF0D1;
  --color-primary-dark: #6fd6a8;
  --color-accent: #6b7280;
  --color-accent-light: #9ca3af;
}
```

### Kereone Theme

```css
@theme {
  --color-dark: #3C4151;
  --color-dark-dark: #1a1c1e;
  --color-primary-light: #dceef3;
  --color-primary: #4A7E8F;
  --color-primary-dark: #3a6573;
  --color-accent: #6b7280;
  --color-accent-light: #9ca3af;
}
```

---

## 6. Colour Usage Guidelines

### Do

- Use `--color-dark` / `--foreground` for headings and structural text
- Use `--color-primary` for interactive elements (links, focus rings, badges)
- Use `--color-accent` for body text and secondary content
- Use semantic colours (destructive, warning, success) for their intended states
- Draw app accent colours from the defined palette in Section 3

### Don't

- Don't introduce new brand colours without updating this document
- Don't use arbitrary Tailwind colour classes (`bg-cyan-400`) for brand elements
- Don't mix Digio and Kereone theme colours within the same app
- Don't change the kereone-roster staff colours or kereone-map region colours
- Don't use primary mint for destructive or warning actions

---

## 7. Readability Notes

When placing text on coloured backgrounds, ensure sufficient contrast:

| Background | Minimum text colour | WCAG | Notes |
|-----------|-------------------|------|-------|
| Magic Mint (`#AAF0D1`) | `#3C4151` (Bright Gray) | AA | Brand combo — always use dark text on mint |
| Bright Gray (`#3C4151`) | `#ffffff` (White) | AAA | High contrast — use for primary buttons |
| Kereone Teal (`#4A7E8F`) | `#ffffff` (White) | AA | Sufficient — use white text on teal |
| White (`#ffffff`) | `#3C4151` (Bright Gray) | AAA | Default body text on white background |
| White (`#ffffff`) | `#6b7280` (Accent) | AA | Muted body text — minimum acceptable |

> **Rule of thumb**: If text on a coloured background looks hard to read,
> it probably is. Use the Bright Gray or white as text colour depending on
> the background lightness.
