"use client";

import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebarNavOptional } from "@/context/sidebar-nav-context";
import { cn } from "@/lib/utils";

export function SidebarCollapseControl({ className }) {
  const nav = useSidebarNavOptional();

  if (!nav?.hasAnyOpen) return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={nav.collapseAll}
      className={cn(
        "h-8 w-full gap-2 border-primary/30 bg-primary/5 text-xs text-primary hover:bg-primary/10",
        className
      )}
      aria-label="Colapsar menú"
    >
      <ChevronsUpDown className="h-3.5 w-3.5 rotate-180" />
      {nav.allExpanded ? "Colapsar menú" : "Colapsar secciones abiertas"}
    </Button>
  );
}
