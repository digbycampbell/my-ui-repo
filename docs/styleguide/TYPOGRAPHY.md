# Digio Typography

> **Version**: 2.0.0
> **Last updated**: 2026-04-02

---

## 1. Font Stack

All apps in the Digio ecosystem use two font families.

### Primary (Body & Display)

**Outfit** — a geometric sans-serif with a modern, clean feel. Used for all
headings, body text, labels, and UI controls.

Fallback chain: `"Outfit", "Inter", ui-sans-serif, system-ui, sans-serif`

### Monospace (Technical Content)

**JetBrains Mono** — a developer-focused monospace font. Used for amounts,
dates in compact format, shift codes, paddock labels, zoom percentages,
section labels, and any data that benefits from fixed-width alignment.

Fallback chain: `"JetBrains Mono", monospace`

---

## 2. Loading Fonts

### HTML (recommended — add to `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### CSS (alternative — add to main stylesheet)

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
```

---

## 3. CSS Variables

```css
--font-sans: "Outfit", "Inter", ui-sans-serif, system-ui, sans-serif;
--font-mono: "JetBrains Mono", monospace;
```

These are applied globally via Tailwind's `font-sans` and `font-mono`
utilities.

---

## 4. Type Scale

### Headings

| Level | Tailwind Classes | Weight | Size | Tracking | Usage |
|-------|-----------------|--------|------|----------|-------|
| **h1** | `text-2xl sm:text-4xl font-bold tracking-tight` | 700 | 24px / 36px | -0.025em | Page titles |
| **h2** | `text-xl sm:text-2xl font-bold tracking-tight` | 700 | 20px / 24px | -0.025em | Section headings |
| **h3** | `text-lg font-semibold` | 600 | 18px | default | Card headings, dialog titles |
| **h4** | `text-base font-semibold` | 600 | 16px | default | Sub-section headings |

### Body Text

| Role | Tailwind Classes | Size | Usage |
|------|-----------------|------|-------|
| **Body** | `text-sm leading-relaxed` | 14px | Default paragraph text |
| **Body large** | `text-base leading-relaxed` | 16px | Feature descriptions, hero text |
| **Small** | `text-xs` | 12px | Metadata, timestamps, badges |
| **Tiny** | `text-[10px]` | 10px | Map labels, compact UI only |

### Special Labels

| Role | Tailwind Classes | Font | Usage |
|------|-----------------|------|-------|
| **Section label** | `text-xs font-medium tracking-widest uppercase font-mono` | JetBrains Mono | Category headers (e.g. "AI SETTINGS", "EXPERTISE") |
| **Meta label** | `text-xs font-medium tracking-wider uppercase` | Outfit | Status labels, form field labels |
| **Mono data** | `font-mono text-sm` | JetBrains Mono | Amounts (`$1,234.56`), codes (`[L3]`), percentages (`125%`) |

---

## 5. Font Weights

### Outfit

| Weight | CSS Value | Tailwind | Usage |
|--------|-----------|----------|-------|
| Light | 300 | `font-light` | Decorative headings (marketing site only) |
| Regular | 400 | `font-normal` | Body text, descriptions |
| Medium | 500 | `font-medium` | Labels, nav items, button text |
| Semibold | 600 | `font-semibold` | Card headings, sub-headers |
| Bold | 700 | `font-bold` | Page headings, strong emphasis |

### JetBrains Mono

| Weight | CSS Value | Tailwind | Usage |
|--------|-----------|----------|-------|
| Regular | 400 | `font-normal` | Code snippets, data values |
| Medium | 500 | `font-medium` | Section labels |
| Semibold | 600 | `font-semibold` | Emphasized mono data |

---

## 6. Responsive Typography

Use Tailwind responsive prefixes for size adjustments:

```jsx
{/* Page title — grows on larger screens */}
<h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
  Page Title
</h1>

{/* Card heading — consistent size, hidden on very small screens */}
<h3 className="text-base sm:text-lg font-semibold tracking-tight">
  Card Title
</h3>

{/* Body text — same size everywhere */}
<p className="text-sm text-muted-foreground leading-relaxed">
  Description text here.
</p>
```

### Mobile Considerations

- Minimum touch-target text: `text-sm` (14px) for interactive elements
- Minimum readable text: `text-xs` (12px) for non-interactive labels
- Avoid `text-[9px]` or smaller except inside SVG map labels
- Truncate long text with `truncate` rather than shrinking font size

---

## 7. Shared CSS Utility Classes

All apps should include these in their stylesheet. These are candidates for
the shared `my-ui-repo` package.

```css
@layer components {
  /* Section label — small mono uppercase (e.g. "AI SETTINGS") */
  .section-label {
    @apply text-xs font-medium tracking-widest text-primary uppercase font-mono;
  }

  /* Metadata label — small uppercase (e.g. "Status", "Date") */
  .meta-label {
    @apply text-xs font-medium tracking-wider text-muted-foreground uppercase;
  }

  /* Body text — readable muted paragraph */
  .body-text {
    @apply text-sm text-muted-foreground leading-relaxed;
  }

  /* Mono data — fixed-width values */
  .mono-data {
    @apply font-mono text-sm tabular-nums;
  }
}
```

---

## 8. Migration Notes

### Apps currently using Inter only (kereone-roster, digio-receipts)

Replace the Google Fonts link:

```diff
- <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
+ <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

Update CSS variables:

```diff
- --font-sans: 'Inter', sans-serif;
+ --font-sans: "Outfit", "Inter", ui-sans-serif, system-ui, sans-serif;
```

> **Note**: Inter remains in the fallback chain, so the visual change is
> graceful — Outfit loads and replaces Inter, but if Outfit fails to load
> the app still looks correct with Inter.

### Apps currently using Space Grotesk (digio-website, kereone-map)

Replace Space Grotesk with JetBrains Mono:

```diff
- --font-mono: "Space Grotesk", monospace;
+ --font-mono: "JetBrains Mono", monospace;
```

Update Google Fonts link to include JetBrains Mono instead of Space Grotesk.
