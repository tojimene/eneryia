"use client";

import { LogOut, Settings, LifeBuoy } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrandMark } from "@/components/brand/brand-mark";
import { navigation } from "@/lib/navigation";
import { useAuth } from "@/context/auth-context";

import { SidebarNavProvider } from "@/context/sidebar-nav-context";

import { SidebarCollapseControl } from "./sidebar-collapse-control";
import { SidebarItem } from "./sidebar-item";

function SidebarNav() {
  return (
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
  );
}

export function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="relative hidden w-80 shrink-0 flex-col border-r border-sidebar-border/70 bg-sidebar/80 lg:flex">
      <div className="absolute inset-y-0 left-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

      <div className="flex items-center justify-center border-b border-sidebar-border/60 px-5 py-6">
        <BrandMark variant="stacked" subtitle="Portal" />
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <SidebarNavProvider>
          <SidebarNav />
        </SidebarNavProvider>
      </ScrollArea>

      <Separator />

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3 rounded-lg border border-sidebar-border/70 bg-card/60 p-3">
          <Avatar>
            <AvatarFallback>{user?.avatar ?? "EN"}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {user?.name ?? "Usuario"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.role ?? "Editor"} · {user?.email ?? ""}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="justify-center text-xs"
            type="button"
            onClick={() => alert("Configuración (mock)")}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-center text-xs"
            type="button"
            onClick={() => alert("Centro de ayuda (mock)")}
          >
            <LifeBuoy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-center text-xs text-destructive hover:text-destructive"
            type="button"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
