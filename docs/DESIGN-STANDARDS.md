# Digio Design Standards — Unified Style Guide

> **Purpose**: Defines the visual and technical standards for all applications
> in the Digio ecosystem. This ensures consistent branding, familiar UX, and
> seamless integration across the platform dashboard and child apps.
>
> **Version**: `2.0.0`
> **Last updated**: 2026-04-02

---

## What Changed in v2.0

- **Two theme families**: Digio (Magic Mint) and Kereone (Blue-Teal)
- **Unified font stack**: Outfit (body) + JetBrains Mono (monospace)
- **3-tier animation system**: Micro (150ms), Standard (250ms), Page (400ms)
- **Shared component specs**: AppHeader, LockButton, DateNavigator with
  copy-paste reference implementations
- **`my-ui-repo` plan**: Shared UI components via git submodules
- **Marketing vs Tools split**: Page-level animations for marketing site
  only; micro-interactions preserved in all tools
- **GSD framework alignment**: Documentation integrates with GSD planning

---

## Quick Reference

| Concern | Digio Apps | Kereone Apps |
|---------|-----------|-------------|
| **Primary colour** | Magic Mint `#AAF0D1` | Blue-Teal `#4A7E8F` |
| **Structure colour** | Bright Gray `#3C4151` | Bright Gray `#3C4151` |
| **Body font** | Outfit | Outfit |
| **Mono font** | JetBrains Mono | JetBrains Mono |
| **Icons** | Lucide React | Lucide React |
| **UI framework** | shadcn/ui (New York) | shadcn/ui (New York) |
| **Card radius** | `rounded-xl` (12px) | `rounded-xl` (12px) |
| **Card hover** | shadow-lg + translate-y | shadow-lg + translate-y |
| **Animations** | 3-tier (T1/T2/T3) | 3-tier (T1/T2/T3) |

---

## Detailed Specifications

The full styleguide is split into focused documents:

### [styleguide/COLOURS.md](./styleguide/COLOURS.md)
Brand colour system, theme families (Digio/Kereone), semantic colours,
app accent colours, CSS variable mappings for shadcn/ui and Tailwind,
readability guidelines.

### [styleguide/TYPOGRAPHY.md](./styleguide/TYPOGRAPHY.md)
Font stack (Outfit + JetBrains Mono), type scale, font weights, responsive
typography, shared CSS utility classes, migration notes for existing apps.

### [styleguide/COMPONENTS.md](./styleguide/COMPONENTS.md)
Reference implementations for shared components: AppHeader (with lock
button and user display), LockButton, ReadOnlyBar, DateNavigator, Cards,
Buttons, Icon system, Burger menu, Modal overlay, Toast notifications,
Forms, Tables. Includes `my-ui-repo` extraction candidates.

### [styleguide/ANIMATIONS.md](./styleguide/ANIMATIONS.md)
3-tier transition system, marketing vs tools animation split, date
navigation card sliding, loading states, hover effects, selection overlays,
reduced motion support.

### [styleguide/APP-THEMING.md](./styleguide/APP-THEMING.md)
Step-by-step guide for theming a new child app, app structure conventions,
responsive design breakpoints, authentication integration, GSD framework
alignment, PDF export styling, new app checklist.

### [styleguide/KEREONE-THEME.md](./styleguide/KEREONE-THEME.md)
Kereone-specific theme specification, protected colours (staff roster,
farm regions, grazing readiness), CSS variables, kereone-specific UI
patterns, migration plan for roster and map apps.

---

## Architecture Decisions

### Why Two Themes?

The Digio platform serves two audiences: Digby's own business tools
(receipts, invoices) and farm management tools provided to an external
client (Kereone). A shared structure colour (Bright Gray) and shared
components (header, lock button, date nav) keep the platform cohesive,
while distinct primary accents (mint vs teal) let each audience feel the
tools are "theirs."

### Why Outfit Over Inter?

Outfit is a geometric sans-serif that gives the platform a modern,
distinctive feel. Inter is an excellent fallback (it remains in the font
chain) but Outfit provides more visual identity. The logged-in email
display in the tools dashboard header — where Outfit is most visible — was
the deciding factor.

### Why JetBrains Mono Over Space Grotesk?

JetBrains Mono is a true monospace font designed for code and data display.
Space Grotesk is a proportional font that was being used in monospace
contexts. JetBrains Mono provides better alignment for tabular data
(amounts, dates, codes) and is already used in the production roster and
receipts apps.

### Why No Per-App Accent Colours?

Per-app accents (emerald for receipts, blue for invoices, etc.) were
considered but rejected in favour of theme-family coherence. All digio
apps share the mint accent; all kereone apps share the teal accent. This
simplifies the palette and strengthens brand recognition. The dashboard
card icons use the theme primary colour.

### Why Shared Components via Submodule?

A `my-ui-repo` git submodule provides shared components (AppHeader,
LockButton, DateNavigator, theme CSS) across repos without a package
registry. This is pragmatic for a small team — no npm publishing, no
version conflicts, just `git submodule update`.

---

## Shared UI Repository (`my-ui-repo`)

The shared components and files live in this repository
(`github.com/digbycampbell/my-ui-repo`) for sharing across all app repos:

### Components (React + TypeScript)

| Component | Source Spec |
|-----------|------------|
| `AppHeader.tsx` | [COMPONENTS.md Section 1](./styleguide/COMPONENTS.md#1-app-header-bar-shared) |
| `LockButton.tsx` | [COMPONENTS.md Section 2](./styleguide/COMPONENTS.md#2-lockedit-toggle-shared) |
| `ReadOnlyBar.tsx` | [COMPONENTS.md Section 2](./styleguide/COMPONENTS.md#2-lockedit-toggle-shared) |
| `DateNavigator.tsx` | [COMPONENTS.md Section 3](./styleguide/COMPONENTS.md#3-date-navigator-shared) |

### CSS

| File | Contents |
|------|----------|
| `theme-digio.css` | Digio CSS variables (light + dark mode) |
| `theme-kereone.css` | Kereone CSS variables (light mode) |
| `digio-base.css` | Shared utilities (`.section-label`, `.meta-label`, `.body-text`, `.mono-data`) |
| `fonts.html` | Google Fonts preload snippet |

### Usage

```bash
# Add to any app repo
git submodule add https://github.com/digbycampbell/my-ui-repo.git shared-ui

# In index.css
@import "../shared-ui/css/theme-digio.css";   /* or theme-kereone.css */
@import "../shared-ui/css/digio-base.css";

# In components
import { AppHeader, LockButton, DateNavigator } from "../shared-ui/components";
```

---

## Child App Registry

| App | Repo | Theme | Standards | Notes |
|-----|------|-------|-----------|-------|
| Kereone Map | `digbycampbell/kereone-map` | Kereone | Pending v2.0 | Needs primary colour + mono font change |
| Kereone Roster | `digbycampbell/kereone-roster` | Kereone | Pending v2.0 | Needs font + primary colour + header change |
| Digio Receipts | `digbycampbell/digio-receipts` | Digio | Pending v2.0 | Needs font change + lock button + header |
| Digio Invoices | `digbycampbell/digio-invoices` | Digio | Pending v2.0 | Standalone deployment |
| Chemical Inventory | `digbycampbell/chemical-inventory` | Digio | v1.0.0 | Needs v2.0 migration |

---

## Versioning

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-03-25 | Initial design standards extracted from digio-website |
| 2.0.0 | 2026-04-02 | Unified styleguide: two theme families, standardised fonts (Outfit + JetBrains Mono), 3-tier animations, shared component specs, my-ui-repo plan, marketing/tools split, GSD alignment |
