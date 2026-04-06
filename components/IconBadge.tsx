/**
 * IconBadge — Consistent icon container for the Digio ecosystem.
 *
 * Two sizes:
 *   - default (48x48px): Dashboard cards, feature sections — slate bg, dark icon
 *   - sm (40x40px): Info cards, inline badges — light slate bg
 *
 * @example
 * <IconBadge><Receipt className="h-5 w-5" /></IconBadge>
 * <IconBadge size="sm"><MapPin className="h-4 w-4" /></IconBadge>
 */

export interface IconBadgeProps {
  size?: "default" | "sm";
  className?: string;
  children: React.ReactNode;
}

export function IconBadge({
  size = "default",
  className = "",
  children,
}: IconBadgeProps) {
  const base =
    size === "default"
      ? "w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900"
      : "w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900";

  return (
    <div className={[base, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
