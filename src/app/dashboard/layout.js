"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { useAuth } from "@/context/auth-context";
import { BriefProvider } from "@/context/brief-context";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isHydrated } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isHydrated, router]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
          Verificando sesión…
        </div>
      </div>
    );
  }

  return (
    <BriefProvider>
      <div className="relative flex min-h-screen flex-1 bg-background">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
        <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-[#00e5ff] opacity-10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#8a5cff] opacity-10 blur-[160px]" />

        <Sidebar />

        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <Topbar
            onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
            isMobileNavOpen={isMobileNavOpen}
          />
          <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>

        <MobileNav
          open={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
        />
      </div>
    </BriefProvider>
  );
}
