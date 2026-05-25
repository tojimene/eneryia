import { Badge } from "@/components/ui/badge";

export function PageHeader({ eyebrow, title, description, badges, action }) {
  return (
    <div className="flex flex-col gap-4 border-b border-border/60 pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-semibold text-foreground lg:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-sm text-muted-foreground lg:text-base">
            {description}
          </p>
        )}
        {badges?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {badges.map((badge) => (
              <Badge key={badge.label} variant={badge.variant ?? "neon"}>
                {badge.label}
              </Badge>
            ))}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}
