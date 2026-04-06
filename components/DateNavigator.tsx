/**
 * DateNavigator — Shared date stepping control for the Digio ecosystem.
 *
 * Placement: Center of AppHeader, or standalone above content.
 *
 * Features:
 *   - Single step (chevrons): always visible
 *   - Period jump (double chevrons): hidden on mobile, optional via props
 *   - Today button: label highlights in cyan when viewing today
 *   - Outlined button group with dividers
 *
 * @example
 * <DateNavigator
 *   label="Mon 31 Mar"
 *   isToday={true}
 *   onPrev={() => stepDay(-1)}
 *   onNext={() => stepDay(1)}
 *   onToday={() => goToToday()}
 * />
 */

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export interface DateNavigatorProps {
  label: string;
  isToday?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPrevPeriod?: () => void;
  onNextPeriod?: () => void;
  onToday: () => void;
  className?: string;
}

export function DateNavigator({
  label,
  isToday = false,
  onPrev,
  onNext,
  onPrevPeriod,
  onNextPeriod,
  onToday,
  className = "",
}: DateNavigatorProps) {
  return (
    <div
      className={[
        "flex items-center border border-slate-200 rounded-full bg-white shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {onPrevPeriod && (
        <>
          <NavButton onClick={onPrevPeriod} className="hidden md:flex" aria-label="Previous period">
            <ChevronsLeft className="w-4 h-4" />
          </NavButton>
          <Divider className="hidden md:block" />
        </>
      )}

      <NavButton onClick={onPrev} aria-label="Previous">
        <ChevronLeft className="w-4 h-4" />
      </NavButton>

      <Divider />

      <button
        type="button"
        onClick={onToday}
        className="h-8 px-3 text-xs font-medium hover:bg-slate-100 transition-colors duration-200 rounded-full"
        aria-label="Go to today"
      >
        <span className={isToday ? "text-cyan-600 font-semibold" : "text-slate-900"}>
          {label}
        </span>
        {isToday && (
          <span className="block text-[9px] text-cyan-600 font-medium leading-none -mt-0.5">
            Today
          </span>
        )}
      </button>

      <Divider />

      <NavButton onClick={onNext} aria-label="Next">
        <ChevronRight className="w-4 h-4" />
      </NavButton>

      {onNextPeriod && (
        <>
          <Divider className="hidden md:block" />
          <NavButton onClick={onNextPeriod} className="hidden md:flex" aria-label="Next period">
            <ChevronsRight className="w-4 h-4" />
          </NavButton>
        </>
      )}
    </div>
  );
}

function NavButton({
  onClick,
  className = "",
  children,
  "aria-label": ariaLabel,
}: {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "h-8 w-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      className={["w-px h-4 bg-slate-200", className].filter(Boolean).join(" ")}
    />
  );
}
