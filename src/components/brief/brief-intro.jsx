"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Megaphone,
  Filter,
  FileText,
  UploadCloud,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBrief } from "@/context/brief-context";
import { useAuth } from "@/context/auth-context";
import { getOverallProgress } from "@/lib/brief-questions";

const PILLARS = [
  {
    icon: UploadCloud,
    title: "Materia prima",
    description: "Llamada + oferta · la IA pre-rellena el brief",
  },
  {
    icon: FileText,
    title: "Contenido",
    description: "Hooks largos y cortos generados con tu brief",
  },
  {
    icon: Megaphone,
    title: "Ads",
    description: "Estáticos y vídeos · oferta directa o indirecta",
  },
  {
    icon: Filter,
    title: "Funnels",
    description: "Landings VSL, dossier, upsells y bumps",
  },
];

export function BriefIntro() {
  const { next, answers, lastSavedAt } = useBrief();
  const { user } = useAuth();
  const overall = getOverallProgress(answers);
  const hasProgress = overall.completed > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 glass p-8 lg:p-12"
    >
      <div className="absolute -top-32 -left-12 h-64 w-64 rounded-full bg-[#00e5ff] opacity-15 blur-[120px]" />
      <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#8a5cff] opacity-15 blur-[140px]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl flex-1 space-y-4">
          <Badge variant="neon">Onboarding · Brief Eneryia</Badge>
          <h1 className="text-3xl font-semibold leading-tight text-foreground lg:text-5xl">
            Hola{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.{" "}
            <span className="neon-text">Construyamos tu ecosistema.</span>
          </h1>
          <p className="max-w-xl text-base text-muted-foreground lg:text-lg">
            Sube tu llamada y tu oferta. La IA pre-rellena el brief, tú
            confirmas el avatar, y Eneryia genera contenido, ads y funnels
            listos para implantar.
          </p>
          <p className="max-w-xl text-xs text-muted-foreground/80">
            Pensado para agencias, coaching y consultorías con ticket de
            servicio +3.000€ que quieren escalar con equipo minimalista.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <Button size="lg" onClick={next}>
              {hasProgress ? "Continuar brief" : "Empezar"}
              <ArrowRight className="h-4 w-4" />
            </Button>
            {hasProgress && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
                {overall.percent}% completado
                {lastSavedAt && (
                  <span className="hidden sm:inline">
                    · guardado {new Date(lastSavedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid w-full flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-md">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.08, duration: 0.3 }}
                className="rounded-xl border border-border/60 bg-card/50 p-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {pillar.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
