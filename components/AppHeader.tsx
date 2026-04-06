/**
 * @deprecated Use `AppNavbar` instead for new apps.
 *
 * AppNavbar uses `fixed` positioning and a flex layout matching the digio-website
 * gold standard. AppHeader uses `sticky` with a 3-column grid which doesn't match
 * the website pattern.
 *
 * Migration:
 *   - Replace `<AppHeader appName="digio receipts" ...>` with
 *     `<AppNavbar toolLabel="Receipts" ...>`
 *   - AppNavbar includes the Digio logo and sign out button automatically
 *   - Pass custom action buttons via the `actions` prop
 *
 * AppHeader — Legacy top navigation bar for the Digio ecosystem.
 * Kept for backwards compatibility with existing apps.
 */

import { PanelLeft } from "lucide-react";
import { LockButton } from "./LockButton";

export interface AppHeaderProps {
  appName: string;
  logoSlot?: React.ReactNode;
  centerSlot?: React.ReactNode;
  isLocked?: boolean;
  isValidating?: boolean;
  onToggleLock?: () => void;
  userEmail?: string;
  onMenuClick?: () => void;
  className?: string;
}

export function AppHeader({
  appName,
  logoSlot,
  centerSlot,
  isLocked,
  isValidating,
  onToggleLock,
  userEmail,
  onMenuClick,
  className = "",
}: AppHeaderProps) {
  return (
    <header
      className={[
        "border-b border-slate-200/50 bg-white/70 backdrop-blur-xl px-3 md:px-6 py-2",
        "grid grid-cols-[1fr_auto_1fr] items-center",
        "sticky top-0 z-50 gap-2 md:gap-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Left: Logo + App Name */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        {logoSlot ?? (
          <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-sm md:text-base flex-shrink-0">
            {appName[0]?.toUpperCase()}
          </div>
        )}
        <h1 className="hidden sm:block text-sm md:text-base font-display font-bold tracking-tight truncate text-slate-900">
          {appName}
        </h1>
      </div>

      {/* Center: Optional slot */}
      <div className="flex items-center justify-center">
        {centerSlot}
      </div>

      {/* Right: Lock + User + Menu */}
      <div className="flex items-center gap-1.5 md:gap-2 justify-end min-w-0">
        {onToggleLock && (
          <LockButton
            isLocked={isLocked}
            isValidating={isValidating}
            onToggle={onToggleLock}
          />
        )}

        {userEmail && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
            <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[9px] font-bold text-white">
              {userEmail[0]?.toUpperCase()}
            </div>
            <span className="text-xs font-medium text-slate-600 truncate max-w-[160px]">
              {userEmail}
            </span>
          </div>
        )}

        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
}
