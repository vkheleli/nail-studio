import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ServiceType } from "../types";

const SERVICE_ICONS: Record<string, string> = {
  "gel-nails": "💅",
  acrylics: "✨",
  "nail-art": "🎨",
  pedicures: "🌸",
  "gel-x": "💎",
  "french-tips": "🤍",
};

const SERVICE_COLORS: string[] = [
  "from-primary/10 to-primary/5",
  "from-accent/10 to-accent/5",
  "from-secondary to-secondary/60",
  "from-primary/8 to-accent/8",
  "from-accent/12 to-primary/8",
];

interface ServiceCardProps {
  service: ServiceType;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export function ServiceCard({
  service,
  isActive,
  onClick,
  index,
}: ServiceCardProps) {
  const icon = SERVICE_ICONS[service.slug] ?? "💅";
  const gradientClass = SERVICE_COLORS[index % SERVICE_COLORS.length];

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={onClick}
      data-ocid={`service-card-${service.slug}`}
      className={cn(
        "group relative flex flex-col items-start gap-3 p-5 rounded-2xl border text-left transition-smooth cursor-pointer w-full",
        isActive
          ? "border-primary bg-gradient-to-br from-primary/15 to-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5",
      )}
      aria-pressed={isActive}
    >
      {isActive && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/30 pointer-events-none" />
      )}

      {/* Icon */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br transition-smooth",
          isActive ? "from-primary/20 to-primary/10" : gradientClass,
        )}
      >
        <span role="img" aria-hidden="true">
          {icon}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-base font-semibold text-foreground leading-tight">
            {service.name}
          </h3>
          {isActive && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 bg-primary/15 text-primary border-0 shrink-0"
            >
              Active
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {service.description}
        </p>
      </div>
    </motion.button>
  );
}

// Skeleton version for loading state
export function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-muted" />
      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-3/4 rounded bg-muted" />
      </div>
    </div>
  );
}
