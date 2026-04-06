/**
 * ReadOnlyBar — Bottom-of-viewport warning when the app is in locked/read-only mode.
 *
 * Non-interactive (pointerEvents: none) so it doesn't block underlying UI.
 * Uses the same amber palette as .btn-status-locked for consistency.
 *
 * @example
 * <ReadOnlyBar visible={isLocked && !hasActiveModal} />
 */

import { Lock } from "lucide-react";

export interface ReadOnlyBarProps {
  visible: boolean;
  message?: string;
}

export function ReadOnlyBar({
  visible,
  message = "View Only Mode \u2014 Click the lock button to enable editing",
}: ReadOnlyBarProps) {
  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-[1000] bg-[#FFFBEB]/90 backdrop-blur-sm border-t border-[#FCD34D] px-4 py-1.5 text-center text-xs text-[#B45309] font-medium"
      style={{ pointerEvents: "none" }}
    >
      <Lock className="w-3 h-3 inline mr-1" />
      {message}
    </div>
  );
}
