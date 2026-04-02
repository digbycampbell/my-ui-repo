/**
 * IconBadge — Consistent icon container for the Digio ecosystem.
 *
 * Two sizes:
 *   - default (40x40px): Dashboard cards, feature sections
 *   - sm (36x36px): Info cards, inline badges
 *
 * The default variant uses a solid primary background with white icon.
 * The sm variant uses a light primary background with primary-coloured icon.
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
      ? "w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground"
      : "w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary";

  return (
    <div className={[base, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
