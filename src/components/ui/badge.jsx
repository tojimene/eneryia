import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/15 text-primary border-primary/30",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive/20 text-destructive",
        outline: "text-foreground border-border",
        neon: "border-primary/40 text-primary bg-primary/10 shadow-[0_0_12px_rgba(0,229,255,0.25)]",
        violet: "border-[#8a5cff]/40 text-[#b495ff] bg-[#8a5cff]/10",
        success: "border-[#00ffd1]/40 text-[#00ffd1] bg-[#00ffd1]/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
