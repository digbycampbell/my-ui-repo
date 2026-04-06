# App Theming Guide

> **Version**: 3.2.0
> **Last updated**: 2026-04-06
>
> How to theme a new child app for the Digio design system.

---

## 1. Theme Families

Every app belongs to one of two theme families:

| Family | Primary | Accent | CSS File |
|--------|---------|--------|----------|
| **Digio** (primary) | Slate 950 `#0f172a` | Cyan 600 `#0891b2` | `theme-digio.css` |
| **Kereone** (secondary) | Emerald 900 `#064e3b` | Amber 400 `#fbbf24` | `theme-kereone.css` |

Kereone uses blue-teal variants from `theme-kereone.css`. Structural styles
(backgrounds, borders, semantic states) are shared across both families via
`digio-base.css`.

### Tool Themes

Imported from `TOOL_THEMES` in `shared-ui/lib/design-system.ts`:

| Tool | Primary | Accent |
|------|---------|--------|
| Default (Digio) | `#0f172a` | `#0891b2` (Cyan) |
| Kereone | `#064e3b` | `#fbbf24` (Amber) |
| Receipts | `#1e1b4b` | `#f472b6` (Pink) |

---

## 2. Setting Up a New App

### Step 1: Add shared-ui submodule

```bash
git submodule add https://github.com/digbycampbell/my-ui-repo.git shared-ui
```

### Step 2: Import CSS

In your `index.css`:

```css
@import "../shared-ui/css/theme-digio.css";
@import "../shared-ui/css/digio-base.css";
```

Replace `theme-digio.css` with `theme-kereone.css` for Kereone apps.

### Step 3: Import fonts

Add the font snippet from `shared-ui/fonts.html` to your `index.html`:

```html
<!-- See shared-ui/fonts.html for the full snippet -->
<!-- Fonts: Inter, Outfit, Instrument Serif, JetBrains Mono -->
```

### Step 4: Import shared components

```tsx
import { AppNavbar, LockButton, DateNavigator } from "../shared-ui/components";
```

### Step 5: Import design tokens

```tsx
import { BRAND, TOOL_THEMES } from "../shared-ui/lib/design-system";
```

---

## 3. App Structure

### Layout Components

Every tool app uses three shared layout components:

```tsx
import { AppNavbar, SidebarShell, LockButton, ReadOnlyBar, ModalOverlay } from "../shared-ui/components";
```

### Minimal App Shell

```tsx
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNavbar
        toolLabel="MyTool"
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isLocked={isLocked}
        onToggleLock={() => setIsLocked(!isLocked)}
        userEmail="user@digio.nz"
        onSignOut={() => { sessionStorage.clear(); window.location.reload(); }}
      />

      <SidebarShell
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      >
        {/* Sidebar nav items */}
      </SidebarShell>

      <main className={`pt-14 transition-all duration-300 ${
        sidebarCollapsed ? "lg:pl-16" : "lg:pl-72"
      }`}>
        <div className="p-8 lg:p-12">
          {/* Page content */}
        </div>
      </main>

      <ReadOnlyBar visible={isLocked} />
    </div>
  );
}
```

### Tool Accent Usage

The tool accent color (from `TOOL_THEMES`) should only be used for:
- App name branding ("digio" in slate-900, tool name in accent)
- Logo/icon badge background (e.g. `bg-[#f472b6]/10`)
- Sparkles/feature icons

NOT for:
- Monetary amounts → use `text-emerald-600`
- Data badges/counts → use `bg-cyan-50 text-cyan-600` (website accent)
- Interactive borders → use `border-slate-200`

### Shape Language

- **Buttons and inputs**: Pill-shaped (fully rounded)
- **card-bento**: 40px radius
- **card-standard**: 32px radius

---

## 4. Recommended Tech Stack

| Concern | Tool | Notes |
|---------|------|-------|
| **UI Framework** | shadcn/ui | Radix UI primitives |
| **Styling** | Tailwind CSS 4 + `@tailwindcss/vite` | |
| **Icons** | Lucide React | Consistent across all apps |
| **Toasts** | Sonner | |
| **Forms** | React Hook Form + Zod | Validation + type safety |
| **State** | TanStack React Query | Server state management |
| **Routing** | Wouter | Lightweight client-side routing |
| **Animation** | Framer Motion | Include reduced motion support |
| **Theme** | next-themes | Only if needed; light-only by default |

---

## 5. Responsive Breakpoints

Tailwind CSS defaults:

| Prefix | Min Width |
|--------|-----------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

---

## 6. Authentication

- Auth is delegated to digio-website
- Token stored in `kereone_auth_token` localStorage key
- Auto-lock after 5 minutes of inactivity
- Use `LockButton` component from shared-ui for edit gating

---

## 7. CLAUDE.md Integration

Add this to any app's `CLAUDE.md`:

```markdown
## UI Standards

This app follows the Digio Design Standards v3.2.0.
Styleguide: https://github.com/digbycampbell/digio-website/tree/main/docs/styleguide

Theme family: [digio|kereone]
Shared UI repo: https://github.com/digbycampbell/my-ui-repo
```

---

## 8. Common Pitfalls

### Pitfall: Modals inside sidebar
Never render `ModalOverlay`, `AlertDialog`, or any `position:fixed` element inside the sidebar. CSS transitions create a new containing block that traps fixed children. Render all dialogs at the app root level.

### Pitfall: Framer Motion for sidebar
Don't use `<motion.aside>` for sidebar animation. The transform property traps fixed descendants. Use CSS `transition-[width]` instead (already handled by `SidebarShell`).

### Pitfall: Stock shadcn/ui radii
shadcn components default to `rounded-md` or `rounded-lg`. Override them:
- Popover → `rounded-2xl`
- AlertDialog content → `rounded-[32px]`
- Progress indicator → `bg-slate-900` (not `bg-primary`)
- Checkbox → `rounded` with `bg-slate-900` checked state

### Pitfall: Using tool accent for data
Monetary values and counts should use `text-emerald-600`, not the tool accent. The accent is for branding only.

---

## 9. New App Checklist

- [ ] Choose theme family (digio/kereone)
- [ ] Add shared-ui submodule
- [ ] Import theme CSS + base CSS
- [ ] Add Google Fonts (Inter, Outfit, Instrument Serif, JetBrains Mono)
- [ ] Use AppNavbar with LockButton and sign out
- [ ] Use SidebarShell for collapsible sidebar
- [ ] Use pill-shaped buttons and inputs
- [ ] Use card-bento (40px) and card-standard (32px) radii
- [ ] Override stock shadcn/ui component radii
- [ ] Add glassmorphism to header/sidebar
- [ ] Implement reduced motion support
- [ ] Add CLAUDE.md with UI Standards section
- [ ] Register app in digio-website apps registry
