"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Search,
  PlusCircle,
  Menu,
  X,
  Settings,
  LifeBuoy,
  LogOut,
  User,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BrandLogo } from "@/components/brand/brand-mark";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-context";

export function Topbar({ onToggleMobileNav, isMobileNavOpen }) {
  const [query, setQuery] = useState("");
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/60 bg-background/70 px-4 backdrop-blur-md lg:px-8">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onToggleMobileNav}
        aria-label="Abrir menú"
      >
        {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div className="flex items-center gap-2 text-sm text-muted-foreground lg:hidden">
        <BrandLogo size="sm" />
        <span className="font-medium text-foreground">Agencia Eneryia</span>
      </div>

      <div className="hidden items-center gap-2 text-sm text-muted-foreground lg:flex">
        <span>Agencia Eneryia</span>
        <span className="opacity-50">/</span>
        <span className="font-medium text-foreground">Brief</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar briefs, funnels, ads…"
            className="h-10 w-72 pl-9"
          />
        </div>

        <Button
          variant="neon"
          size="sm"
          type="button"
          onClick={() => router.push("/dashboard")}
        >
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Nuevo proyecto</span>
        </Button>

        <Button variant="ghost" size="icon" type="button" className="relative">
          <Bell className="h-5 w-5" />
          <Badge
            variant="neon"
            className="absolute -right-1 -top-1 h-4 min-w-4 justify-center px-1 text-[10px]"
          >
            3
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="group flex items-center gap-2 rounded-full border border-border/70 bg-card/50 p-1 pr-3 transition-colors hover:border-primary/40 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user?.avatar ?? "EN"}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium text-foreground/90 sm:inline">
                {user?.name?.split(" ")[0] ?? "Usuario"}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-semibold normal-case tracking-normal text-foreground">
                  {user?.name}
                </span>
                <span className="truncate text-[11px] font-normal normal-case tracking-normal text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => alert("Perfil (mock)")}>
              <User />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert("Configuración (mock)")}>
              <Settings />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert("Centro de ayuda (mock)")}>
              <LifeBuoy />
              Ayuda
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => setTimeout(logout, 0)}
              className="text-destructive focus:text-destructive"
            >
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
