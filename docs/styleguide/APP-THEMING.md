# App Theming Guide

> **Version**: 2.0.0
> **Last updated**: 2026-04-02
>
> How to theme a new child app for the Digio ecosystem.

---

## 1. Theme Families

Every app belongs to one of two theme families:

| Family | Primary Accent | Apps | Logo |
|--------|---------------|------|------|
| **Digio** | Magic Mint `#AAF0D1` | digio-website, digio-receipts, digio-invoices, chemical-inventory | Digio logo |
| **Kereone** | Blue-Teal `#4A7E8F` | kereone-roster, kereone-map | Kereone logo (TBD) |

The theme family determines the primary colour, but the structural colours
(Bright Gray `#3C4151`, border, background, semantic states) are shared
across both families.

---

## 2. Setting Up a New App

### Step 1: Choose Your Theme Family

Determine whether this app is a digio-branded tool or a kereone-branded tool.

### Step 2: Add Fonts

Add the standard font preload to your `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### Step 3: Copy CSS Variables

Copy the appropriate theme block from [COLOURS.md](./COLOURS.md) Section 4
into your `index.css`.

### Step 4: Add Shared Utilities

Add the shared CSS component classes from [TYPOGRAPHY.md](./TYPOGRAPHY.md)
Section 7 and [COMPONENTS.md](./COMPONENTS.md).

### Step 5: Add Shared Components

If using the `my-ui-repo` submodule:

```bash
git submodule add https://github.com/digbycampbell/my-ui-repo.git shared-ui
```

Import the shared components:

```tsx
import { AppHeader, LockButton, DateNavigator } from "../shared-ui/components";
```

### Step 6: Register the App

Add your app to `digio-website/src/data/apps.js` with the appropriate
accent colour from the brand palette.

---

## 3. App Structure Conventions

### Header

All tools must use the shared `AppHeader` component (or follow its pattern):

- Logo or letter icon in top-left
- App name visible on desktop, hidden on mobile
- Lock/edit button beside user email (if app has editable content)
- User email display on desktop
- Burger menu on the right

See [COMPONENTS.md](./COMPONENTS.md) Section 1 for the reference
implementation.

### App Naming

Display the app name as:

```
digio <name>    (for digio apps)
kereone <name>  (for kereone apps)
```

In code, the brand word uses `text-foreground` and the app name uses
`text-primary`.

### Navigation

- **Burger menu**: Always present in header, right side
- **Date navigator**: Center of header (when applicable)
- **Sidebar**: Optional, for sub-navigation within the app
- **Bottom nav**: Acceptable for mobile-only (kereone-map pattern)

### Content Area

```tsx
<main className="min-h-[calc(100vh-3.5rem)] bg-background">
  <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
    {/* Page content */}
  </div>
</main>
```

---

## 4. UI Framework

### Recommended Stack

| Concern | Tool | Notes |
|---------|------|-------|
| **Components** | shadcn/ui (New York style) | Radix UI primitives |
| **Styling** | Tailwind CSS 4 | With `@theme` or CSS variables |
| **Icons** | Lucide React | Consistent across all apps |
| **Toasts** | Sonner | Bottom-right desktop, top mobile |
| **Forms** | React Hook Form + Zod | Validation + type safety |
| **Queries** | TanStack React Query | Server state management |
| **Routing** | Wouter | Lightweight client-side routing |

### shadcn/ui Configuration

```json
{
  "style": "new-york",
  "baseColor": "neutral",
  "cssVariables": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "client/src/index.css",
    "baseColor": "neutral"
  },
  "iconLibrary": "lucide"
}
```

---

## 5. Responsive Design

### Breakpoints

| Prefix | Min Width | Usage |
|--------|-----------|-------|
| (none) | 0px | Mobile-first base styles |
| `sm:` | 640px | Small tablets, landscape phones |
| `md:` | 768px | Tablets, small laptops |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Wide desktop |

### Mobile Detection

```tsx
const MOBILE_BREAKPOINT = 768;
const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
```

### Mobile-First Principles

1. Design for mobile first, then add desktop enhancements
2. All UI elements must be usable on 320px screens
3. Touch targets: minimum 32x32px (`h-8 w-8`)
4. Minimise logo/icon sizes on mobile (32px) vs desktop (36-40px)
5. Hide secondary text (app name, email) on mobile, show on `sm:` or `md:`
6. Use `truncate` for text that may overflow on small screens

---

## 6. Authentication

All apps follow the auth contract defined in
[AUTH-CONTRACT.md](../AUTH-CONTRACT.md).

### Key Points

- Auth is delegated to digio-website (`digio.nz/login`)
- The login page UI (form fields, styling) should match the digio website
  login aesthetic — centered card, minimal, clean
- Token stored in `kereone_auth_token` localStorage key
- User email displayed in header bar on desktop
- Lock/edit button validates auth on unlock attempt

### Auth-Gated Editing

Apps that have editable content should:

1. Start in locked (read-only) mode
2. Require authentication to unlock
3. Auto-lock after 5 minutes of inactivity
4. Show the `ReadOnlyBar` when locked

---

## 7. GSD Framework Integration

When building apps using the GSD framework, the styleguide documents map
to GSD's documentation structure as follows:

| GSD Document | Styleguide Reference |
|-------------|---------------------|
| `.planning/codebase/CONVENTIONS.md` | Reference this styleguide for UI conventions |
| `.planning/codebase/STACK.md` | Include shadcn/ui, Lucide, Tailwind 4 from Section 4 |
| `.planning/phases/{NN}-CONTEXT.md` | Link to specific styleguide sections for UI phases |
| `CLAUDE.md` | Add styleguide reference in conventions section |

### CLAUDE.md Addition

Add this to any app's `CLAUDE.md`:

```markdown
## UI Standards

This app follows the Digio Design Standards v2.0.0.
Styleguide: https://github.com/digbycampbell/digio-website/tree/main/docs/styleguide

Theme family: [digio|kereone]
Shared UI repo: https://github.com/digbycampbell/my-ui-repo
```

---

## 8. PDF Export Styling

Apps that export PDFs should follow a consistent banner style:

### Banner

- Background: Bright Gray `#3C4151`
- Text: White
- Font: Helvetica (jsPDF built-in — closest to Outfit)
- Height: 38mm on A4

### Content

- Clean, minimal layout
- One item per page (receipts) or structured tables (roster)
- Include app branding in banner (app name, not logo)

> The kereone-roster "Day Off Calendar" PDF is the quality benchmark for
> styled PDF exports. Other apps should aim for similar clarity.

---

## 9. Checklist for New Child Apps

- [ ] Choose theme family (digio or kereone)
- [ ] Add Outfit + JetBrains Mono fonts
- [ ] Copy CSS variables from COLOURS.md
- [ ] Add shared CSS utilities (`.section-label`, `.meta-label`, `.body-text`)
- [ ] Use Lucide React for all icons
- [ ] Use shadcn/ui (New York) or Tailwind with brand `@theme`
- [ ] Implement `AppHeader` with lock button and user display
- [ ] Implement `ReadOnlyBar` for locked state (if editable)
- [ ] Follow animation tiers from ANIMATIONS.md
- [ ] Test on mobile (320px minimum)
- [ ] Implement auth per AUTH-CONTRACT.md
- [ ] Add app to digio-website `src/data/apps.js`
- [ ] Add app origin to digio-website CORS whitelist
- [ ] Add styleguide reference to app's `CLAUDE.md`
- [ ] Create `docs/ARCHITECTURE.md` and `docs/INTEGRATION.md`
