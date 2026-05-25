import Link from "next/link";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/brand-mark";

export default function NotFoundPage() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#00e5ff] opacity-20 blur-[160px]" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#8a5cff] opacity-15 blur-[180px]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <BrandLogo size="xl" className="mb-6" />

        <p className="text-xs uppercase tracking-[0.5em] text-primary/80">
          Error 404
        </p>
        <h1 className="mt-4 text-[6rem] font-bold leading-none neon-text">
          404
        </h1>
        <p className="mt-2 text-2xl font-semibold text-foreground">
          Esta ruta no existe en la hoja de ruta
        </p>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          El brief que estás buscando no está en el portal. Volvé al dashboard
          y seguí orquestando contenido, ads y funnels.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              Volver al dashboard
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Ir al login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
