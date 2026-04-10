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
 *   userName="Digby Campbell"
 *   userEmail="user@digio.nz"
 *   onSignOut={() => { sessionStorage.clear(); window.location.reload(); }}
 * />
 */

import { motion } from "framer-motion";
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
  /** User's display name (used for avatar initial, falls back to email) */
  userName?: string;
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
  userName,
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

      {/* Left: Digio logo + tool label — matches Logo.jsx from digio-website */}
      <div className="flex items-center gap-3 py-1">
        <motion.div
          className="relative flex items-center justify-center h-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-auto fill-current text-cyan-600 transition-colors duration-500"
          >
            <path
              d="M30,20 L60,20 C80,20 85,35 85,50 C85,65 80,80 60,80 L30,80 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            <motion.path
              d="M30,50 L45,50 L47,30 L50,70 L53,40 L56,60 L60,50 L75,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            />
          </svg>
        </motion.div>
        <span className="text-lg font-display font-bold tracking-tight text-slate-900">
          Digio<span className="text-cyan-600">.</span>
        </span>
        {toolLabel && (
          <span className="text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-slate-400">{toolLabel}</span>
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
            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white uppercase">
              {(userName || userEmail)[0]}
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
