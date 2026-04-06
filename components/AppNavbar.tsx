/**
 * AppNavbar — Fixed top navigation bar for the Digio ecosystem.
 *
 * Matches the digio-website AppNavbar pattern exactly:
 *   [Mobile toggle]  [Logo + Brand]  [Tool label]  ...  [actions]  [Lock]  [User badge]  [Sign out]
 *
 * Fixed position at top of viewport (`fixed top-0 left-0 right-0 h-14 z-40`).
 * Uses glassmorphism (bg-white/70 backdrop-blur-xl).
 *
 * @example
 * <AppNavbar
 *   toolLabel="Receipts"
 *   toolIcon={<Receipt className="w-3.5 h-3.5" />}
 *   toolIconBg="bg-[#f472b6]/10 text-[#f472b6]"
 *   onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
 *   actions={<button className="btn-primary py-2 px-4 text-sm">Analyze</button>}
 *   isLocked={isLocked}
 *   onToggleLock={handleToggleLock}
 *   userEmail="user@digio.nz"
 *   onSignOut={() => { sessionStorage.clear(); window.location.reload(); }}
 * />
 */

import { PanelLeft, LogOut } from "lucide-react";
import { LockButton } from "./LockButton";

export interface AppNavbarProps {
  /** Tool label shown after the Digio logo (e.g. "Receipts", "Roster") */
  toolLabel?: string;
  /** Optional icon element rendered in a small badge left of the tool label */
  toolIcon?: React.ReactNode;
  /** Background classes for the tool icon badge (e.g. "bg-[#f472b6]/10 text-[#f472b6]") */
  toolIconBg?: string;
  /** Called when the mobile sidebar toggle is clicked (PanelLeft icon, lg:hidden) */
  onMenuToggle?: () => void;
  /** Optional action buttons rendered between the tool label and lock button */
  actions?: React.ReactNode;
  /** Lock state for the LockButton */
  isLocked?: boolean;
  /** Validating state for the LockButton */
  isValidating?: boolean;
  /** Called when the lock button is toggled */
  onToggleLock?: () => void;
  /** User email displayed in the badge */
  userEmail?: string;
  /** Called when the sign out button is clicked */
  onSignOut?: () => void;
}

export function AppNavbar({
  toolLabel,
  toolIcon,
  toolIconBg = "bg-slate-100 text-slate-500",
  onMenuToggle,
  actions,
  isLocked,
  isValidating,
  onToggleLock,
  userEmail,
  onSignOut,
}: AppNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 z-40 flex items-center px-4 lg:px-6">
      {/* Mobile sidebar toggle */}
      {onMenuToggle && (
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all mr-3"
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={18} />
        </button>
      )}

      {/* Left: Digio logo + tool label */}
      <div className="flex items-center gap-3 py-1">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-cyan-600 shrink-0">
          <span className="text-white text-xs font-bold">D</span>
        </div>
        <span className="text-lg font-display font-bold text-slate-900 tracking-tight">
          Digio<span className="text-cyan-600">.</span>
        </span>
        {toolLabel && (
          <span className="section-label text-slate-400">{toolLabel}</span>
        )}
      </div>

      {/* Right: Actions + Lock + User + Sign out */}
      <div className="ml-auto flex items-center gap-4">
        {actions}

        {onToggleLock && (
          <LockButton
            isLocked={isLocked}
            isValidating={isValidating}
            onToggle={onToggleLock}
          />
        )}

        {userEmail && (
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
              {userEmail[0]?.toUpperCase()}
            </div>
            <span className="text-xs font-medium text-slate-600">
              {userEmail}
            </span>
          </div>
        )}

        {onSignOut && (
          <button
            onClick={onSignOut}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-100"
            title="Sign out"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        )}
      </div>
    </nav>
  );
}
