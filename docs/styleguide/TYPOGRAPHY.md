# Digio Typography — The Harmonized Method

> **Version**: 3.1.0
> **Last updated**: 2026-04-06

---

## 1. Font Stack

The Harmonized Method uses a 4-font stack, each assigned to a distinct layer.

| Layer | Font | Usage | Weights |
|-------|------|-------|---------|
| **Display** | Outfit | Headings, hero titles, branding | 400, 500, 600, 700 |
| **Sans** | Inter | Body text, UI elements, navigation | 400, 500, 600, 700 |
| **Serif** | Instrument Serif | Editorial accents (sparingly) | 400, 400i |
| **Mono** | JetBrains Mono | Data, code, metadata labels | 400, 500 |

---

## 2. CSS Variables

```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
--font-display: "Outfit", sans-serif;
--font-serif: "Instrument Serif", serif;
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
```

Map these to Tailwind utilities: `font-sans`, `font-display`, `font-serif`, `font-mono`.

---

## 3. Loading Fonts

### HTML (recommended — add to `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### CSS (alternative)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
```

---

## 4. Type Patterns

### Headings

| Pattern | Tailwind Classes |
|---------|-----------------|
| **Hero title** | `text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight` |
| **Section header** | `text-3xl md:text-5xl font-display font-bold tracking-tight` |
| **App heading** | `text-2xl sm:text-3xl font-display font-bold tracking-tight` |

### Body & Data

| Pattern | Tailwind Classes |
|---------|-----------------|
| **Body text** | `text-sm text-slate-500 leading-relaxed` |
| **Mono data** | `font-mono text-sm tabular-nums` |
| **Section label** | `text-[10px] font-mono font-bold uppercase tracking-[0.2em]` |
| **Metadata** | `font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400` |

---

## 5. Font Weights

### Outfit (Display)

| Weight | CSS | Tailwind | Usage |
|--------|-----|----------|-------|
| 400 | `font-weight: 400` | `font-normal` | Soft display text |
| 500 | `font-weight: 500` | `font-medium` | Secondary headings |
| 600 | `font-weight: 600` | `font-semibold` | Card headings |
| 700 | `font-weight: 700` | `font-bold` | Hero titles, page headings |

### Inter (Sans)

| Weight | CSS | Tailwind | Usage |
|--------|-----|----------|-------|
| 400 | `font-weight: 400` | `font-normal` | Body text, descriptions |
| 500 | `font-weight: 500` | `font-medium` | Labels, nav items, buttons |
| 600 | `font-weight: 600` | `font-semibold` | Emphasized UI text |
| 700 | `font-weight: 700` | `font-bold` | Strong emphasis |

### Instrument Serif

| Weight | CSS | Tailwind | Usage |
|--------|-----|----------|-------|
| 400 | `font-weight: 400` | `font-normal` | Editorial accents |
| 400i | `font-style: italic` | `italic` | Pull quotes, stylistic emphasis |

### JetBrains Mono

| Weight | CSS | Tailwind | Usage |
|--------|-----|----------|-------|
| 400 | `font-weight: 400` | `font-normal` | Code, data values |
| 500 | `font-weight: 500` | `font-medium` | Section labels, metadata |

---

## 6. Shared CSS Utility Classes

```css
@layer components {
  /* Body text */
  .body-text {
    @apply text-sm text-slate-500 leading-relaxed;
  }

  /* Section label — small mono uppercase */
  .section-label {
    @apply text-[10px] font-mono font-bold uppercase tracking-[0.2em];
  }

  /* Mono data — fixed-width values */
  .mono-data {
    @apply font-mono text-sm tabular-nums;
  }
}
```

---

## 7. Responsive Examples

```jsx
{/* Hero title */}
<h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight">
  Hero Title
</h1>

{/* Section header */}
<h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
  Section Header
</h2>

{/* App heading */}
<h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
  App Heading
</h3>

{/* Body text */}
<p className="text-sm text-slate-500 leading-relaxed">
  Description text here.
</p>

{/* Section label */}
<span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
  AI Settings
</span>
```

---

## 8. Migration from v2.0.0

### Font stack changes

v2.0.0 used Outfit as the sole sans font. v3.1.0 splits responsibilities:

- **Outfit** moves to the `font-display` layer (headings only).
- **Inter** takes over `font-sans` (body text and UI).
- **Instrument Serif** is new — use sparingly for editorial accents.
- **JetBrains Mono** remains for data and code; weight 600 is dropped.

### Update Google Fonts link

```diff
- <link href="...?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" ...>
+ <link href="...?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500&display=swap" ...>
```

### Update CSS variables

```diff
- --font-sans: "Outfit", "Inter", ui-sans-serif, system-ui, sans-serif;
- --font-mono: "JetBrains Mono", monospace;
+ --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
+ --font-display: "Outfit", sans-serif;
+ --font-serif: "Instrument Serif", serif;
+ --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
```
