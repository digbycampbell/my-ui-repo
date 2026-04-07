/**
 * LockButton — Shared lock/edit toggle for the Digio ecosystem.
 *
 * Uses the standardized .btn-status-locked / .btn-status-unlocked classes.
 *
 * States:
 *   - Locked (amber): read-only mode, click to authenticate and unlock
 *   - Editing (green): editable mode, click to lock
 *   - Validating (amber + spinner): checking auth before unlocking
 *
 * @example
 * <LockButton isLocked={true} onToggle={() => requestUnlock()} />
 */

import { Lock, Unlock } from "lucide-react";

export interface LockButtonProps {
  isLocked?: boolean;
  isValidating?: boolean;
  onToggle: () => void;
  className?: string;
}

export function LockButton({
  isLocked = true,
  isValidating = false,
  onToggle,
  className = "",
}: LockButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={isValidating}
      className={[
        isLocked ? "btn-status-locked" : "btn-status-unlocked",
        "h-7 sm:h-9 px-2 sm:px-4 text-[11px] sm:text-xs",
        "flex-shrink-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isValidating ? (
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : isLocked ? (
        <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      ) : (
        <Unlock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      )}
      <span className="hidden sm:inline font-semibold">
        {isValidating ? "Checking..." : isLocked ? "Locked" : "Editing"}
      </span>
    </button>
  );
}
