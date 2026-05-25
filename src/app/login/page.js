"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrandMark } from "@/components/brand/brand-mark";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isHydrated } = useAuth();

  const [email, setEmail] = useState("admin@eneryia.io");
  const [password, setPassword] = useState("admin123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isHydrated, isAuthenticated, router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await login({ email, password });
      router.replace("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-[#00e5ff] opacity-20 blur-[120px]" />
      <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#8a5cff] opacity-20 blur-[140px]" />

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <section className="hidden flex-col justify-between lg:flex">
          <BrandMark size="lg" subtitle="Portal Brief" />

          <div className="space-y-6">
            <Badge variant="neon">v1.0 · build futurista</Badge>
            <h1 className="text-4xl font-semibold leading-tight text-foreground lg:text-5xl">
              Opera toda la <span className="neon-text">hoja de ruta</span> de
              contenido, ads y funnels desde un solo portal.
            </h1>
            <p className="max-w-md text-base text-muted-foreground">
              Coordina briefs largos y cortos, planifica ads estáticos y
              vídeos, y lanza landings de compra, opt-in y upsells sin perder
              foco.
            </p>

            <div className="grid gap-3">
              {[
                "Hoja de ruta unificada por brief",
                "Funnels con landings VSL, Dossier y Largo",
                "Upsells y bumps automatizados",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-md border border-border/60 bg-card/40 px-3 py-2 text-sm text-foreground/90"
                >
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Agencia Eneryia. Built with neon
            energy.
          </p>
        </section>

        <Card className="neon-border w-full max-w-md justify-self-center">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-3 lg:hidden">
              <BrandMark size="sm" subtitle="Portal" />
            </div>
            <CardTitle className="text-2xl">Acceso al portal</CardTitle>
            <CardDescription>
              Entra con tus credenciales para acceder al panel de control.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@eneryia.io"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <button
                    type="button"
                    className="text-xs text-primary/80 hover:text-primary"
                    onClick={() => alert("Recuperación de contraseña mock")}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              {errorMessage && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errorMessage}
                </div>
              )}

              <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
                <p className="mb-1 text-foreground/90">Cuentas demo</p>
                <p>
                  <span className="text-primary">admin@eneryia.io</span> /
                  admin123
                </p>
                <p>
                  <span className="text-primary">demo@eneryia.io</span> /
                  demo123
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Conectando…
                  </>
                ) : (
                  <>
                    Acceder
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Acceso seguro · datos simulados para entorno de desarrollo
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
