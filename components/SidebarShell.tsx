/**
 * SidebarShell — Fixed sidebar container for the Digio ecosystem.
 *
 * Provides the structural shell matching the digio-website AppSidebar:
 * - Fixed position below the navbar (`fixed top-14 left-0 bottom-0`)
 * - Glassmorphism background
 * - Collapse/expand animation with CSS transitions
 * - Mobile overlay with backdrop blur
 * - PanelLeft/PanelLeftClose toggle at the bottom
 *
 * Pass your app's sidebar content (nav items, settings, etc.) as children.
 * Use the NavItem pattern from the sidebar docs for consistent item styling.
 *
 * IMPORTANT: Do NOT render modals or dialogs inside this component.
 * The sidebar uses CSS transitions that can trap position:fixed children.
 * Render all dialogs at the root level of your app instead.
 *
 * @example
 * <SidebarShell
 *   open={sidebarOpen}
 *   collapsed={sidebarCollapsed}
 *   onClose={() => setSidebarOpen(false)}
 *   onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
 * >
 *   <SidebarNavItem icon={Receipt} label="Receipts" active />
 *   <SidebarNavItem icon={Settings} label="Settings" />
 * </SidebarShell>
 */

import { PanelLeft, PanelLeftClose } from "lucide-react";

export interface SidebarShellProps {
  /** Whether the sidebar is open on mobile */
  open: boolean;
  /** Whether the sidebar is collapsed (icons only) */
  collapsed: boolean;
  /** Close handler for mobile overlay */
  onClose: () => void;
  /** Toggle collapse handler */
  onToggleCollapse: () => void;
  /** Sidebar content (nav items, settings sections, etc.) */
  children: React.ReactNode;
  /** Optional footer content rendered above the collapse toggle */
  footer?: React.ReactNode;
}

export function SidebarShell({
  open,
  collapsed,
  onClose,
  onToggleCollapse,
  children,
  footer,
}: SidebarShellProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-14 left-0 bottom-0 bg-white/70 backdrop-blur-xl border-r border-slate-200/50 z-50 flex flex-col overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          collapsed ? "w-[64px]" : "w-72"
        } ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Content area */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 pt-4">
          {children}
        </nav>

        {/* Bottom: optional footer + collapse toggle */}
        <div className="border-t border-slate-200/50 px-2 py-3 space-y-0.5 shrink-0">
          {footer}

          {/* Desktop: collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className={`w-full flex items-center h-10 ${
              collapsed ? "justify-center px-0" : "px-2"
            } rounded-full text-sm font-medium text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200 hidden lg:flex`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span
              className={`${
                collapsed ? "w-auto" : "w-10"
              } flex items-center justify-center shrink-0`}
            >
              {collapsed ? (
                <PanelLeft size={16} />
              ) : (
                <PanelLeftClose size={16} />
              )}
            </span>
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-500 ${
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              Collapse
            </span>
          </button>

          {/* Mobile: close button */}
          <button
            onClick={onClose}
            className={`w-full flex items-center h-10 ${
              collapsed ? "justify-center px-0" : "px-2"
            } rounded-full text-sm font-medium text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200 lg:hidden`}
          >
            <span
              className={`${
                collapsed ? "w-auto" : "w-10"
              } flex items-center justify-center shrink-0`}
            >
              <PanelLeftClose size={16} />
            </span>
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-500 ${
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              Close
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

/**
 * Helper: Standard sidebar nav item styling.
 *
 * Use this pattern for consistent sidebar items that animate properly
 * during collapse (icons stay fixed, text fades).
 *
 * @example
 * <button className={sidebarNavItemClasses(collapsed, isActive, isDisabled)}>
 *   <span className={sidebarNavIconClasses(collapsed)}>
 *     <MyIcon size={16} />
 *   </span>
 *   <span className={sidebarNavLabelClasses(collapsed)}>
 *     Label text
 *   </span>
 * </button>
 */
export function sidebarNavItemClasses(
  collapsed: boolean,
  active = false,
  disabled = false,
): string {
  const base = `w-full flex items-center h-10 ${
    collapsed ? "justify-center px-0" : "px-2"
  } rounded-full text-sm font-medium transition-colors duration-200`;

  if (disabled) return `${base} text-slate-300 cursor-not-allowed select-none`;
  if (active) return `${base} bg-slate-900 text-white shadow-lg shadow-slate-200`;
  return `${base} text-slate-500 hover:text-slate-900 hover:bg-slate-100`;
}

export function sidebarNavIconClasses(collapsed: boolean): string {
  return `${collapsed ? "w-auto" : "w-10"} flex items-center justify-center shrink-0`;
}

export function sidebarNavLabelClasses(collapsed: boolean): string {
  return `whitespace-nowrap overflow-hidden transition-all duration-500 ${
    collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
  }`;
}
