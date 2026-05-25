"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebarNavOptional } from "@/context/sidebar-nav-context";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function isChildActive(item, pathname) {
  if (!item) return false;
  if (item.href && pathname.startsWith(item.href)) return true;
  if (!item.children) return false;
  return item.children.some((child) => isChildActive(child, pathname));
}

export function SidebarItem({ item, depth = 0, path = "" }) {
  const pathname = usePathname();
  const nav = useSidebarNavOptional();
  const Icon = item.icon;
  const hasChildren = Boolean(item.children?.length);
  const active = useMemo(() => isChildActive(item, pathname), [item, pathname]);
  const itemId = path ? `${path}/${item.title}` : item.title;

  const isOpen = nav?.isItemOpen(itemId) ?? active;

  function handleOpenChange(open) {
    nav?.setItemOpen(itemId, open);
  }

  const paddingLeft = `${0.75 + depth * 0.9}rem`;

  if (!hasChildren) {
    const isExactActive = item.href === pathname;
    return (
      <Link
        href={item.href ?? "#"}
        className={cn(
          "group relative flex items-center justify-between gap-2 rounded-md py-2 pr-3 text-sm transition-all",
          "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
          isExactActive
            ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(0,229,255,0.25)]"
            : "text-sidebar-foreground/85"
        )}
        style={{ paddingLeft }}
      >
        <span className="flex items-center gap-2.5 truncate">
          {Icon && (
            <Icon
              className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                isExactActive
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-primary/80"
              )}
            />
          )}
          <span className="truncate">{item.title}</span>
        </span>
        {item.badge && (
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            {item.badge}
          </span>
        )}
        {isExactActive && (
          <span className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.7)]" />
        )}
      </Link>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
      <CollapsibleTrigger
        className={cn(
          "group flex w-full items-center justify-between gap-2 rounded-md py-2 pr-3 text-sm transition-all",
          "hover:bg-sidebar-accent/60",
          active ? "text-primary" : "text-sidebar-foreground/85"
        )}
        style={{ paddingLeft }}
      >
        <span className="flex items-center gap-2.5 truncate">
          {Icon && (
            <Icon
              className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-primary/80"
              )}
            />
          )}
          <span className="truncate">{item.title}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent forceMount className="collapsible-content overflow-hidden">
        <div
          className={cn(
            "mt-1 flex flex-col gap-1 border-l border-sidebar-border/80",
            depth === 0 ? "ml-3" : "ml-4",
            !isOpen && "hidden"
          )}
        >
          {item.children.map((child) => (
            <SidebarItem
              key={`${child.title}-${child.href ?? "group"}`}
              item={child}
              depth={depth + 1}
              path={itemId}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
