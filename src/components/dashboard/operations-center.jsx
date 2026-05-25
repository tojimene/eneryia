"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlignLeft,
  ArrowRight,
  Bot,
  Brain,
  ClipboardList,
  FileStack,
  GraduationCap,
  Globe,
  Image as ImageIcon,
  Mail,
  Megaphone,
  PlusSquare,
  ScrollText,
  Send,
  ShoppingCart,
  Sparkles,
  Type,
  Wand2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useBrief } from "@/context/brief-context";
import { useAuth } from "@/context/auth-context";
import { getOverallProgress } from "@/lib/brief-questions";
import {
  ECOSYSTEM_ACTIVITY,
  ECOSYSTEM_METRICS,
  MODULE_CARDS,
  QUICK_ACTIONS,
} from "@/lib/operations-mock";
import { cn } from "@/lib/utils";

const ICONS = {
  AlignLeft,
  Type,
  ImageIcon,
  Send,
  GraduationCap,
  Sparkles,
  ScrollText,
  FileStack,
  Mail,
  PlusSquare,
  ShoppingCart,
  Megaphone,
  Globe,
  Wand2,
};

const PILLAR_ORDER = ["Contenido", "Ads", "Funnels"];

const DEMO_TARGET =
  "Fundadores B2B de +5K/mes con ticket de +3.000€ que quieren escalar sin equipo extra";
const DEMO_PROBLEM =
  "Agenda inconsistente y captación dependiente del fundador. No hay sistema, hay esfuerzo.";
const DEMO_MECHANISM =
  "Brief estratégico + 4 canales alineados + cohortes que escalan mes a mes";

function asText(value, fallback) {
  if (Array.isArray(value)) return value.filter(Boolean).join(" · ") || fallback;
  if (typeof value === "string" && value.trim().length > 0) return value;
  return fallback;
}

export function OperationsCenter() {
  const { user } = useAuth();
  const { answers, lastSavedAt } = useBrief();
  const overall = getOverallProgress(answers);
  const percent = overall.percent > 0 ? overall.percent : 62;

  const target = asText(answers.target, DEMO_TARGET);
  const problem = asText(answers.coreProblem, DEMO_PROBLEM);
  const mechanism = asText(answers.uniqueMechanism, DEMO_MECHANISM);

  const totalGenerated = MODULE_CARDS.reduce((acc, m) => acc + m.generated, 0);

  return (
    <div className="space-y-6">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 glass p-6 lg:p-8"
      >
        <div className="pointer-events-none absolute -top-24 -left-12 h-72 w-72 rounded-full bg-[#00e5ff] opacity-15 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#8a5cff] opacity-15 blur-[140px]" />

        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="neon">Centro de mando</Badge>
              <Badge variant={percent >= 80 ? "success" : "violet"}>
                Brief · {percent}%
              </Badge>
              <span className="text-xs text-muted-foreground">
                Última edición ·{" "}
                {lastSavedAt
                  ? new Date(lastSavedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "hace 5h"}
              </span>
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-foreground lg:text-4xl">
              Hola{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.{" "}
              <span className="neon-text">Tu ecosistema está vivo.</span>
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              {totalGenerated} piezas generadas con tu Brief en los 14 módulos.
              Pulsa cualquier bloque para entrar a editarlo o regenerar
              variantes.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild>
                <Link href="/dashboard/funnels/landings/compra/vsl">
                  <Sparkles className="h-4 w-4" />
                  Ver landing VSL
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <ClipboardList className="h-4 w-4" />
                  Volver al Brief
                </Link>
              </Button>
            </div>
          </div>

          {/* Cerebro · brief snapshot */}
          <div className="rounded-2xl border border-primary/30 bg-card/50 p-4 lg:p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 animate-pulse-neon">
                <Brain className="h-4 w-4 text-primary" />
              </span>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary/80">
                  Cerebro · Brief
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {overall.completed} de {overall.total} preguntas cubiertas
                </p>
                <Progress value={percent} className="mt-2 h-1.5" />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <BriefRow label="ICP" value={target} />
              <BriefRow label="Problema central" value={problem} />
              <BriefRow label="Mecanismo único" value={mechanism} />
            </div>
          </div>
        </div>
      </motion.section>

      {/* MÉTRICAS GLOBALES */}
      <div className="grid gap-3 md:grid-cols-4">
        {ECOSYSTEM_METRICS.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-4"
          >
            <div
              className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${m.accent}`}
            />
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {m.label}
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {m.value}
            </p>
            <p
              className={cn(
                "mt-1 text-[11px]",
                m.deltaTone === "up" ? "text-emerald-300" : "text-red-300"
              )}
            >
              {m.delta}
            </p>
          </motion.div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid gap-3 md:grid-cols-3">
        {QUICK_ACTIONS.map((qa, idx) => {
          const Icon = ICONS[qa.icon] ?? Sparkles;
          return (
            <motion.div
              key={qa.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/5 p-4 transition-all hover:border-primary/60"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <Wand2 className="h-3.5 w-3.5 text-primary/60" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">
                {qa.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {qa.description}
              </p>
              <Button asChild size="sm" variant="neon" className="mt-4 w-full">
                <Link href={qa.href}>
                  {qa.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* GRID + ACTIVIDAD */}
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* MÓDULOS POR PILAR */}
        <div className="space-y-5">
          {PILLAR_ORDER.map((pillar) => {
            const items = MODULE_CARDS.filter((c) => c.pillar === pillar);
            return (
              <section key={pillar} className="space-y-3">
                <header className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Pilar
                    </p>
                    <h2 className="text-xl font-semibold text-foreground">
                      {pillar}
                    </h2>
                  </div>
                  <Badge variant="violet">
                    {items.reduce((acc, m) => acc + m.generated, 0)} piezas
                  </Badge>
                </header>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((card, idx) => (
                    <ModuleCard key={card.id} card={card} idx={idx} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* TIMELINE DE ACTIVIDAD */}
        <aside className="lg:sticky lg:top-4 lg:self-start">
          <div className="space-y-3 rounded-2xl border border-border/60 bg-card/40 p-4">
            <header className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/40 bg-primary/10 animate-pulse-neon">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </span>
                <p className="text-sm font-semibold text-foreground">
                  Actividad en vivo
                </p>
              </div>
              <Badge variant="neon">{ECOSYSTEM_ACTIVITY.length}</Badge>
            </header>

            <ol className="relative space-y-1.5 pl-3">
              <span className="absolute left-1 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
              {ECOSYSTEM_ACTIVITY.map((event, idx) => (
                <motion.li
                  key={event.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="relative pl-4"
                >
                  <span
                    className={cn(
                      "absolute left-[-2px] top-1.5 h-2 w-2 rounded-full",
                      event.tone === "neon"
                        ? "bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)]"
                        : event.tone === "success"
                          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                          : "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]"
                    )}
                  />
                  <div className="rounded-md border border-border/60 bg-card/30 px-2.5 py-2">
                    <p className="text-[11px] text-foreground">
                      <span className="font-semibold">{event.actor}</span>{" "}
                      <span className="text-muted-foreground">
                        {event.action}
                      </span>
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-foreground/85">
                      {event.target}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-2 text-[10px] text-muted-foreground">
                      <span className="rounded-full border border-border/60 px-1.5 py-0.5 uppercase tracking-widest">
                        {event.module}
                      </span>
                      <span className="font-mono">{event.time}</span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}

function BriefRow({ label, value }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="line-clamp-2 text-xs text-foreground/85">{value}</p>
    </div>
  );
}

function ModuleCard({ card, idx }) {
  const Icon = ICONS[card.icon] ?? Sparkles;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.04 }}
    >
      <Link
        href={card.href}
        className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40"
      >
        <div
          className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${card.accent}`}
        />
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </span>
          <Badge variant={card.statusTone}>{card.status}</Badge>
        </div>
        <p className="mt-3 text-sm font-semibold text-foreground">
          {card.title}
        </p>
        <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
          {card.description}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
          <div>
            <p className="text-[10px] uppercase tracking-widest">Generadas</p>
            <p className="font-mono text-sm font-bold text-foreground">
              {card.generated}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest">
              Métrica clave
            </p>
            <p className="line-clamp-1 text-[11px] text-foreground/85">
              {card.metric}
            </p>
          </div>
        </div>

        <span className="absolute right-3 top-3 hidden text-primary group-hover:block">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    </motion.div>
  );
}
