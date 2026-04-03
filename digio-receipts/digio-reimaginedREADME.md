# Digio Design System & Brand Identity

This repository contains the reimagined brand identity and design system for **Digio NZ Limited**. The aesthetic is a sophisticated, minimalist, Apple-inspired interface designed for the intersection of high-voltage power infrastructure and digital intelligence.

## 🎨 Design Philosophy

The "Digio Method" prioritizes clarity, high-end professional aesthetics, and "smart" modernism. 

- **Minimalism over Decoration**: No unnecessary glows, gradients, or "cyberpunk" neon.
- **High Contrast**: Pure white backgrounds in light mode, deep black in dark mode.
- **Spacious Layouts**: Generous white space and "Bento-style" grids for content organization.
- **Pill-Shaped UI**: All buttons, navigation items, and tags use `rounded-full` for a modern, premium feel.

## 🔡 Typography: The Harmonized Method

We use a multi-layered typographic system to balance technical precision with editorial elegance.

| Layer | Font | Usage | Vibe |
| :--- | :--- | :--- | :--- |
| **Display** | `Outfit` | Headings, Hero titles, Branding | Geometric, Bold, Modern |
| **Sans** | `Inter` | Body text, UI elements, Navigation | Neutral, Highly Legible |
| **Serif** | `Instrument Serif` | Editorial accents, Hero subtitles | Modern-Academic, Aspirational |
| **Mono** | `JetBrains Mono` | Data, Code, Technical metadata | Precise, System-level |

### Implementation Note
Always pair **Outfit** (Display) with **Inter** (Sans) for structural consistency. Use **Instrument Serif** (often in *italics*) sparingly to "soften" tech-heavy sections.

## 🛠️ Technical Implementation

### 1. Design Tokens (`/src/lib/design-system.ts`)
This is the single source of truth for the brand. Future projects should import the `BRAND` object to ensure consistency in colors, typography, and spacing.

### 2. Global Styles (`/src/index.css`)
Tailwind CSS 4.0 is used with custom theme variables. 
- **Glassmorphism**: Use the `.glass` utility for translucent overlays. It uses `backdrop-blur-xl` and subtle borders.
- **Transitions**: All theme-aware elements should use `transition-colors duration-500` for a smooth Apple-like mode switch.

### 3. Core Components
- **Logo (`/src/components/ui/Logo.tsx`)**: A minimalist geometric "D" with an integrated electrical transient impulse animation.
- **Button (`/src/components/ui/Button.tsx`)**: Pill-shaped, high-contrast buttons. `primary` variant is solid black (light) or solid white (dark).
- **Header (`/src/components/ui/Header.tsx`)**: A slim (h-14), translucent navigation bar.

---

## 🤖 Instructions for Future AI Development Agents

When extending this design system to new "sub-tools" or projects, follow these rules strictly:

### 1. Adhere to the Grid
Use the **Bento Grid** pattern for dashboards and feature showcases. Cards should have large border radii (`rounded-[40px]`) and subtle shadows.

### 2. Maintain Typographic Hierarchy
- **Hero Titles**: `text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight`.
- **Section Headers**: `text-3xl md:text-5xl font-display font-bold tracking-tight`.
- **Metadata**: `font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400`.

### 3. Color Usage
- **Primary Action**: Solid high-contrast (Black on White / White on Black).
- **Secondary Action**: Subtle grey/translucent backgrounds (`bg-slate-100` or `bg-white/10`).
- **Accents**: Use the `accentColor` from `TOOL_THEMES` sparingly (e.g., for status dots or small icons).

### 4. Component Re-use
- **DO NOT** create new button styles. Use the existing `Button` component with its defined variants.
- **DO NOT** add custom CSS files. Use Tailwind utility classes and the theme variables defined in `index.css`.
- **DO** use `motion` (from `motion/react`) for subtle entry animations (prefer `y: 20` to `y: 0` with `ease: [0.16, 1, 0.3, 1]`).

### 5. Theme Support
Every component **MUST** support both Light and Dark modes. Test transitions by toggling the theme switch in the header.

---

## 🆕 April 2026 Updates (Appended Rules)

*Note: The following rules supersede conflicting instructions above based on recent design iterations.*

### 1. Light Mode Exclusive
- **Update**: We have removed the concept of dark mode to focus entirely on a pristine, high-contrast, and airy light mode experience. Future apps should **only** implement the light mode aesthetic. (This supersedes the "High Contrast" and "Theme Support" rules above).

### 2. Standardized Action Buttons
To maintain consistent sign-in and locked/unlocked behavior across all apps, use the following standardized CSS classes (defined in `index.css`):
- **Locked State (`.btn-status-locked`)**: Amber/Yellow theme (`bg-[#FFFBEB]`, `border-[#FCD34D]`, `text-[#B45309]`). Indicates read-only or requires sign-in.
- **Unlocked/Editing State (`.btn-status-unlocked`)**: Emerald/Green theme (`bg-[#ECFDF5]`, `border-[#6EE7B7]`, `text-[#047857]`). Indicates authenticated/editing state.
- **Dark Icon Button (`.btn-icon-dark`)**: White background, dark slate border (`border-slate-900`), dark icon. Used for primary icon actions like the Burger Menu.
- **Standard Icon Button (`.btn-icon-standard`)**: White background, light slate border (`border-slate-200`).

### 3. Collapsible Sidebar Pattern
- **Behavior**: The sidebar should animate between full width (`288px`) and collapsed width (`88px`), rather than disappearing.
- **Burger Menu**: Positioned at the top right of the sidebar. Remains visible and centered when collapsed.
- **Bottom Section**: Contains the **Locked/Editing** toggle button and the **User Profile** indicator.
- **Collapsed State**: When collapsed, the Locked/Editing button shrinks to a square showing *only* the padlock icon (mobile-style). Text labels for navigation items are hidden, leaving only the icons centered.

### 4. 📦 Reusable Code Assets (Reference Guide)
To easily port these designs to other Digio apps, future agents should copy the code directly from the following files in this repository:

- **Global Styles & Standard Buttons (`/src/index.css`)**:
  - Contains all `@theme` variables (fonts, brand colors).
  - Contains all standardized button classes (`.btn-status-locked`, `.btn-status-unlocked`, `.btn-icon-dark`, `.btn-icon-standard`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.input-field`) and the `.glass` utility.
- **Collapsible Sidebar & Transitions (`/src/App.tsx`)**:
  - Look for the `<motion.aside>` element. It contains the exact `framer-motion` properties (`animate={{ width: isSidebarOpen ? 288 : 88 }}`) and Tailwind classes for the smooth collapse effect.
  - Demonstrates how to conditionally render text and center icons when collapsed using `isSidebarOpen` state.
- **Digio Logo Implementation (`/src/App.tsx`)**:
  - Look for the `<h1>Digio<span className="text-[#f472b6]">.</span></h1>` block in the sidebar. It shows the exact sizing, colors, and icon pairing (e.g., the pink `Receipt` icon box) used for the app's branding.
- **Glassmorphism Header (`/src/App.tsx`)**:
  - Look for the `<header>` element. It contains the exact classes (`h-20 bg-white/70 backdrop-blur-xl sticky top-0 z-10`) for the premium floating header.
- **Animated Modals (`/src/App.tsx`)**:
  - Look for the `<AnimatePresence>` blocks (e.g., Settings Modal, Clear Modal). They provide the perfect boilerplate for smooth fade-in/scale-up modal animations with blurred backdrops (`bg-slate-900/40 backdrop-blur-sm`).

---
*Generated by AI Studio Build — April 2026*
