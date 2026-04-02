/**
 * LockButton — Shared lock/edit toggle for the Digio ecosystem.
 *
 * Placement: In the AppHeader, beside the signed-in user display.
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
        "h-7 md:h-8 px-2 md:px-3 rounded-lg text-[11px] font-medium border shadow-sm",
        "transition-colors duration-150 active:scale-95",
        "flex items-center gap-1 md:gap-1.5 flex-shrink-0",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        isLocked
          ? "bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200"
          : "bg-green-600 border-green-700 text-white hover:bg-green-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isValidating ? (
        <div className="w-3.5 h-3.5 border-2 border-amber-800/30 border-t-amber-800 rounded-full animate-spin" />
      ) : isLocked ? (
        <Lock className="w-3.5 h-3.5" />
      ) : (
        <Unlock className="w-3.5 h-3.5" />
      )}
      <span className="hidden md:inline">
        {isValidating ? "Checking..." : isLocked ? "Locked" : "Editing"}
      </span>
    </button>
  );
}
