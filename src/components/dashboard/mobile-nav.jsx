"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrandMark } from "@/components/brand/brand-mark";
import { navigation } from "@/lib/navigation";

import { SidebarNavProvider } from "@/context/sidebar-nav-context";

import { SidebarCollapseControl } from "./sidebar-collapse-control";
import { SidebarItem } from "./sidebar-item";

export function MobileNav({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <aside className="absolute left-0 top-0 flex h-full w-80 max-w-[85%] flex-col border-r border-sidebar-border/80 bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-sidebar-border/70 px-4 py-4">
          <BrandMark size="sm" subtitle="Portal" />
          <Button variant="ghost" size="icon" type="button" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1 px-3 py-4">
          <SidebarNavProvider>
            <nav className="flex flex-col gap-5">
              <SidebarCollapseControl className="mb-1" />
              {navigation.map((section) => (
                <div key={section.label} className="flex flex-col gap-1.5">
                  <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                    {section.label}
                  </p>
                  <div className="flex flex-col gap-1">
                    {section.items.map((item) => (
                      <SidebarItem
                        key={`${item.title}-${item.href ?? "group"}`}
                        item={item}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </SidebarNavProvider>
        </ScrollArea>
      </aside>
    </div>
  );
}
