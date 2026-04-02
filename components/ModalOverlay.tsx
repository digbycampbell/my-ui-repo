/**
 * ModalOverlay — Full-attention overlay for the Digio ecosystem.
 *
 * Use for actions that require the user's full focus: export dialogs,
 * API key entry, autofill confirmation, destructive confirmations.
 *
 * This is a lightweight wrapper. For apps using shadcn/ui, prefer
 * AlertDialog or Dialog from Radix — they include this pattern plus
 * focus trapping, ESC handling, and accessibility.
 *
 * This component is provided for apps that don't use shadcn/ui or need
 * a simpler overlay.
 *
 * @example
 * <ModalOverlay open={showExport} onClose={() => setShowExport(false)}>
 *   <h2 className="text-lg font-semibold">Export PDF</h2>
 *   <p className="text-sm text-muted-foreground">Choose export format.</p>
 *   <div className="flex gap-2 mt-4">
 *     <button onClick={exportA4}>A4 Landscape</button>
 *     <button onClick={() => setShowExport(false)}>Cancel</button>
 *   </div>
 * </ModalOverlay>
 */

import { useEffect, useCallback } from "react";

export interface ModalOverlayProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ModalOverlay({
  open,
  onClose,
  children,
  className = "",
}: ModalOverlayProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={[
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg bg-card rounded-xl border border-border p-6 shadow-xl",
          "animate-in fade-in-0 zoom-in-95",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </>
  );
}
