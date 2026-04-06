/**
 * Card — Standard card component for the Digio ecosystem.
 *
 * Uses the reimagined card radius system:
 *   - default: card-standard (rounded-[32px]) with hover lift + shadow
 *   - static: card-standard, no hover effects
 *   - dashed: dashed border for empty/unassigned states
 *
 * @example
 * <Card>
 *   <h3 className="font-display font-bold text-slate-900">Title</h3>
 *   <p className="body-text">Description</p>
 * </Card>
 *
 * <Card variant="dashed">
 *   <span className="section-label text-slate-400">Not assigned</span>
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
    "bg-white rounded-[32px] border border-slate-100 p-6 sm:p-8 shadow-sm",
    "hover:shadow-lg hover:-translate-y-1 transition-all duration-500",
    "group",
  ].join(" "),

  static: "bg-white rounded-[32px] border border-slate-100 p-6 sm:p-8 shadow-sm",

  dashed: [
    "border border-dashed border-slate-200 rounded-[32px]",
    "flex items-center justify-center",
    "text-slate-400",
    "hover:text-cyan-600 hover:border-cyan-600/30 transition-colors duration-200",
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
