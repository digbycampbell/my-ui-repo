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
        "h-7 md:h-8 px-2 md:px-3 text-[11px]",
        "flex-shrink-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isValidating ? (
        <div className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : isLocked ? (
        <Lock className="w-3.5 h-3.5" />
      ) : (
        <Unlock className="w-3.5 h-3.5" />
      )}
      <span className="hidden md:inline font-semibold">
        {isValidating ? "Checking..." : isLocked ? "Locked" : "Editing"}
      </span>
    </button>
  );
}
