/**
 * Card — Standard card component for the Digio ecosystem.
 *
 * Based on the kereone-map farm hub cards — the agreed standard.
 * Includes hover lift + shadow effect (T1 micro animation).
 *
 * Variants:
 *   - default: hover lift + shadow (interactive cards, dashboard)
 *   - static: no hover effects (info display, form containers)
 *   - dashed: dashed border for empty/unassigned states
 *
 * @example
 * <Card>
 *   <h3 className="font-semibold">Title</h3>
 *   <p className="text-sm text-muted-foreground">Description</p>
 * </Card>
 *
 * <Card variant="dashed">
 *   <span className="text-[10px] text-muted-foreground/40">Not assigned</span>
 * </Card>
 */

export interface CardProps {
  variant?: "default" | "static" | "dashed";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variantClasses = {
  default: [
    "bg-card rounded-xl border border-border p-5 sm:p-6",
    "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150",
    "group",
  ].join(" "),

  static: "bg-card rounded-xl border border-border p-5 sm:p-6",

  dashed: [
    "border border-dashed border-border rounded-lg",
    "flex items-center justify-center",
    "text-[10px] text-muted-foreground/40",
    "hover:text-primary hover:border-primary/30 transition-colors duration-150",
  ].join(" "),
};

export function Card({
  variant = "default",
  className = "",
  children,
  onClick,
}: CardProps) {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      onClick={onClick}
      className={[variantClasses[variant], className].filter(Boolean).join(" ")}
    >
      {children}
    </Tag>
  );
}
