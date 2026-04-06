/**
 * Digio Shared UI Components
 *
 * Import from this barrel file:
 *   import { AppNavbar, SidebarShell, LockButton, ModalOverlay } from "../shared-ui/components";
 */

// Layout
export { AppNavbar } from "./AppNavbar";
export type { AppNavbarProps } from "./AppNavbar";

export { SidebarShell, sidebarNavItemClasses, sidebarNavIconClasses, sidebarNavLabelClasses } from "./SidebarShell";
export type { SidebarShellProps } from "./SidebarShell";

// Lock / Read-only
export { LockButton } from "./LockButton";
export type { LockButtonProps } from "./LockButton";

export { ReadOnlyBar } from "./ReadOnlyBar";
export type { ReadOnlyBarProps } from "./ReadOnlyBar";

// Date navigation
export { DateNavigator } from "./DateNavigator";
export type { DateNavigatorProps } from "./DateNavigator";

// Cards & display
export { Card } from "./Card";
export type { CardProps } from "./Card";

export { IconBadge } from "./IconBadge";
export type { IconBadgeProps } from "./IconBadge";

// Modal
export { ModalOverlay } from "./ModalOverlay";
export type { ModalOverlayProps } from "./ModalOverlay";

// Legacy — use AppNavbar instead for new apps
export { AppHeader } from "./AppHeader";
export type { AppHeaderProps } from "./AppHeader";
