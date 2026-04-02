/**
 * AppHeader — Shared top navigation bar for the Digio ecosystem.
 *
 * Layout: [Logo + Name]  [Center slot]  [Lock + User + Menu]
 *
 * The center slot is flexible — pass a DateNavigator, search bar, or nothing.
 * The right section always shows (in order): lock button, user email, burger menu.
 *
 * @example
 * <AppHeader
 *   appName="digio receipts"
 *   centerSlot={<DateNavigator {...dateNavProps} />}
 *   isLocked={isLocked}
 *   onToggleLock={handleToggleLock}
 *   userEmail="user@example.com"
 *   onMenuClick={() => setMenuOpen(true)}
 * />
 */

import { Menu } from "lucide-react";
import { LockButton } from "./LockButton";

export interface AppHeaderProps {
  /** App display name, e.g. "digio receipts" or "kereone roster" */
  appName: string;
  /** Custom logo element. Defaults to a letter icon using the first character of appName. */
  logoSlot?: React.ReactNode;
  /** Center content — typically a DateNavigator or search bar. */
  centerSlot?: React.ReactNode;
  /** Whether the app is in locked/read-only mode. Omit to hide the lock button entirely. */
  isLocked?: boolean;
  /** Whether auth is being validated before unlocking. */
  isValidating?: boolean;
  /** Called when the user clicks the lock/unlock button. Omit to hide the lock button. */
  onToggleLock?: () => void;
  /** Signed-in user's email. Shown on desktop, hidden on mobile. */
  userEmail?: string;
  /** Called when the burger menu icon is clicked. Omit to hide the menu button. */
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
        "border-b bg-card px-3 md:px-6 py-2",
        "grid grid-cols-[1fr_auto_1fr] items-center",
        "sticky top-0 z-50 shadow-sm gap-2 md:gap-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Left: Logo + App Name */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        {logoSlot ?? (
          <div className="w-8 h-8 md:w-9 md:h-9 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-sm md:text-base flex-shrink-0">
            {appName[0]?.toUpperCase()}
          </div>
        )}
        <h1 className="hidden sm:block text-sm md:text-base font-semibold tracking-tight truncate">
          {appName}
        </h1>
      </div>

      {/* Center: Optional slot (date nav, search, etc.) */}
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
          <span className="hidden md:block text-xs text-muted-foreground truncate max-w-[180px]">
            {userEmail}
          </span>
        )}

        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors duration-150"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
}
