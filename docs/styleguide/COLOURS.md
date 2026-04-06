# Digio Colour System

> **Version**: 3.1.0
> **Last updated**: 2026-04-06

---

## 1. Brand Palette

| Colour | Hex | Tailwind | Role |
|--------|-----|----------|------|
| **Primary** | `#0f172a` | `slate-950` | Structure, headings, primary buttons |
| **Accent** | `#0891b2` | `cyan-600` | Highlights, links, interactive accents |
| **Secondary** | `#4f46e5` | `indigo-600` | Reserved for tech-forward elements |
| **Surface** | `#ffffff` | `white` | Component backgrounds |
| **Border** | `#e2e8f0` | `slate-200` | Subtle separators |

---

## 2. Text Hierarchy

| Level | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| **High** | `#0f172a` | `slate-950` | Headings, primary text |
| **Medium** | `#475569` | `slate-600` | Secondary text, descriptions |
| **Low** | `#94a3b8` | `slate-400` | Metadata, placeholders |

---

## 3. Tool Themes

Each app has a unique accent colour for its dashboard card and in-app highlights. Cyan remains the default website accent; tool-specific accents are for tool highlights only.

| App | Accent Colour | Hex |
|-----|--------------|-----|
| Digio (default) | Cyan | `#0891b2` |
| Kereone | Amber | `#fbbf24` |
| Receipts | Pink | `#f472b6` |

---

## 4. Status Colours

| State | Foreground | Background | Usage |
|-------|-----------|------------|-------|
| **Success** | `emerald-500`/`emerald-600` | `emerald-50` | Confirmation, active states |
| **Error** | `red-500`/`red-600` | `red-50` | Validation errors, failure alerts |
| **Warning** | `amber-500` | `amber-50` | Caution states, locked indicators |
| **Destructive** | `red-500` | -- | Delete buttons, danger actions |

---

## 5. CSS Variables (shadcn/ui)

All values are in HSL format for Tailwind integration.

```css
:root {
  /* Structure */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;

  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;

  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;

  /* Brand */
  --primary: 222 47% 11%;
  --primary-foreground: 0 0% 100%;

  --secondary: 239 84% 67%;
  --secondary-foreground: 0 0% 100%;

  /* Neutrals */
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;

  --accent: 192 91% 36%;
  --accent-foreground: 0 0% 100%;

  /* States */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  /* Chrome */
  --border: 210 40% 93%;
  --input: 210 40% 93%;
  --ring: 192 91% 36%;

  /* Sidebar */
  --sidebar: 0 0% 100%;
  --sidebar-foreground: 222 47% 11%;
  --sidebar-border: 210 40% 93%;
  --sidebar-accent: 192 91% 36%;
  --sidebar-accent-foreground: 0 0% 100%;

  --radius: 0.625rem;
}
```

---

## 6. Usage Guidelines

### Do

- Use the **slate** palette for all neutral/structural colours
- Use `cyan-600` (`#0891b2`) as the website accent for links, focus rings, and interactive elements
- Use tool-specific accents (amber, pink) only within their respective tool UIs
- Maintain WCAG AA minimum contrast between text and backgrounds
- Keep to light mode only -- no dark mode

### Don't

- Don't introduce new brand colours without updating this document
- Don't use arbitrary Tailwind colour classes for brand elements
- Don't apply tool-specific accents outside their designated app
- Don't use accent colours for destructive or warning actions
- Don't implement dark mode variants
