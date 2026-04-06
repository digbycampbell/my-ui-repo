/**
 * ModalOverlay — Full-attention overlay for the Digio ecosystem.
 *
 * Uses the bento card radius (rounded-[40px]) per the reimagined design.
 * Backdrop uses slate-900/40 with blur for the glassmorphism effect.
 *
 * @example
 * <ModalOverlay open={showExport} onClose={() => setShowExport(false)}>
 *   <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Export PDF</h2>
 *   <p className="body-text mt-2">Choose export format.</p>
 *   <div className="flex gap-3 mt-6">
 *     <button className="btn-primary" onClick={exportA4}>A4 Landscape</button>
 *     <button className="btn-outline" onClick={() => setShowExport(false)}>Cancel</button>
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
        className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={[
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg bg-white rounded-[40px] border border-slate-200 p-8 shadow-2xl",
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
