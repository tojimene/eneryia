import Image from "next/image";

import { cn } from "@/lib/utils";

const SIZE_MAP = {
  sm: { wrapper: "h-7 w-7", img: 22 },
  md: { wrapper: "h-9 w-9", img: 28 },
  lg: { wrapper: "h-11 w-11", img: 34 },
  xl: { wrapper: "h-14 w-14", img: 44 },
};

// Logo con círculo + glow neon. Útil en headers compactos, mobile y 404.
export function BrandLogo({ size = "md", className }) {
  const cfg = SIZE_MAP[size] ?? SIZE_MAP.md;
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/40 bg-primary/10 animate-pulse-neon",
        cfg.wrapper,
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent" />
      <Image
        src="/brand/logo-eneryia.png"
        alt="Agencia Eneryia"
        width={cfg.img}
        height={cfg.img}
        priority
        className="relative z-10 h-auto w-[80%] object-contain"
      />
    </span>
  );
}

// Logo plano, sin contenedor. Para variantes apiladas en sidebar / login hero.
export function BrandLogoFlat({ width = 180, className }) {
  return (
    <Image
      src="/brand/logo-eneryia.png"
      alt="Agencia Eneryia"
      width={width}
      height={Math.round(width * 0.42)}
      priority
      className={cn("h-auto w-full object-contain", className)}
    />
  );
}

export function BrandMark({
  variant = "default",
  size = "md",
  subtitle = "Portal",
  className,
}) {
  if (variant === "logo-only") {
    return <BrandLogo size={size} className={className} />;
  }

  if (variant === "stacked") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-3 text-center",
          className
        )}
      >
        <BrandLogoFlat width={200} className="max-w-[180px]" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-muted-foreground/80">
          Agencia Eneryia · {subtitle}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandLogo size={size} />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          Agencia
        </p>
        <p className="truncate text-sm font-semibold neon-text leading-tight">
          Eneryia · {subtitle}
        </p>
      </div>
    </div>
  );
}
