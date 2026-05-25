"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  Filter,
  Plus,
  Search,
} from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HookCard } from "@/components/content/hook-card";
import { GenerationOverlay } from "@/components/content/generation-overlay";
import { BriefContextPill } from "@/components/content/brief-context-pill";
import { SHORT_SURFACES, GENERATION_STAGES } from "@/lib/content-frameworks";
import { generateHookBatch } from "@/lib/content-mock";

const HOOK_STAGES = [
  { label: "Mapeando avatar + dolores del Brief", ms: 600 },
  { label: "Aplicando 6 estructuras ganadoras", ms: 700 },
  { label: "Generando 8 variantes en paralelo", ms: 800 },
  { label: "Scoreando hooks por intención y plataforma", ms: 600 },
];

export default function ContenidoCortoPage() {
  const [hooks, setHooks] = useState(() => generateHookBatch(0));
  const [seed, setSeed] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [pendingBatch, setPendingBatch] = useState(null);
  const [surfaceFilter, setSurfaceFilter] = useState("all");
  const [query, setQuery] = useState("");

  function runGeneration() {
    const next = generateHookBatch(seed);
    setPendingBatch(next);
    setGenerating(true);
  }

  function handleComplete() {
    setTimeout(() => {
      if (pendingBatch) {
        setHooks((prev) => [...pendingBatch, ...prev].slice(0, 24));
        setPendingBatch(null);
        setSeed((s) => s + 1);
      }
      setGenerating(false);
    }, 500);
  }

  function removeHook(id) {
    setHooks((prev) => prev.filter((hook) => hook.id !== id));
  }

  function regenerateOne(id) {
    setHooks((prev) =>
      prev.map((hook) => {
        if (hook.id !== id) return hook;
        return {
          ...hook,
          text: `${hook.text} (v${Math.floor(Math.random() * 9) + 2})`,
          score: Math.max(70, Math.min(99, hook.score + (Math.random() > 0.5 ? 1 : -2))),
        };
      })
    );
  }

  const filtered = useMemo(() => {
    return hooks.filter((hook) => {
      const matchSurface =
        surfaceFilter === "all" || hook.surface === surfaceFilter;
      const matchQuery =
        !query ||
        hook.text.toLowerCase().includes(query.toLowerCase()) ||
        hook.angle.toLowerCase().includes(query.toLowerCase());
      return matchSurface && matchQuery;
    });
  }, [hooks, query, surfaceFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Contenido · Corto"
        title="Fábrica de hooks alimentada por tu Brief"
        description="Genera 8 hooks en cada ciclo, aplicando estructuras ganadoras y puntuados por intención. Pensados para LinkedIn, Reels, X, asuntos de email y títulos de YouTube."
        badges={[
          { label: "Motor IA · v1" },
          { label: "Multi-superficie", variant: "violet" },
        ]}
        action={
          <Button variant="neon" size="sm" onClick={runGeneration}>
            <Wand2 className="h-4 w-4" />
            Generar 8 hooks
          </Button>
        }
      />

      <BriefContextPill />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-3 sm:grid-cols-3"
      >
        <Stat label="Hooks generados" value={hooks.length.toString()} />
        <Stat
          label="Favoritos top"
          value={hooks.filter((hook) => hook.score >= 90).length.toString()}
        />
        <Stat
          label="Plataformas activas"
          value={new Set(hooks.map((hook) => hook.surface)).size.toString()}
        />
      </motion.div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/45 glass p-3 lg:flex-row lg:items-center lg:justify-between lg:p-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por hook o ángulo…"
              className="h-9 pl-9"
            />
          </div>
          <Button variant="ghost" size="sm" type="button">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        <Tabs value={surfaceFilter} onValueChange={setSurfaceFilter}>
          <TabsList className="flex-wrap">
            <TabsTrigger value="all" className="text-xs">
              Todas
            </TabsTrigger>
            {SHORT_SURFACES.map((surface) => (
              <TabsTrigger
                key={surface.id}
                value={surface.id}
                className="text-xs"
              >
                {surface.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence initial={false}>
          {filtered.map((hook) => (
            <HookCard
              key={hook.id}
              hook={hook}
              onRemove={removeHook}
              onRegenerate={regenerateOne}
            />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-muted-foreground">
          <p className="text-sm">
            No hay hooks que coincidan con el filtro actual.
          </p>
          <Button
            variant="neon"
            size="sm"
            className="mt-3"
            onClick={() => {
              setQuery("");
              setSurfaceFilter("all");
            }}
          >
            <Plus className="h-3.5 w-3.5" />
            Limpiar filtros
          </Button>
        </div>
      )}

      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-sm text-foreground/85">
            <Sparkles className="h-4 w-4 text-primary" />
            ¿Quieres otro batch? Cada generación reutiliza el Brief y aplica 6
            frameworks distintos en paralelo.
          </div>
          <Button variant="neon" onClick={runGeneration}>
            <Wand2 className="h-4 w-4" />
            Generar 8 hooks más
          </Button>
        </div>
      </div>

      <GenerationOverlay
        open={generating}
        title="Generando hooks"
        subtitle="Eneryia produce 8 variantes con tu Brief"
        stages={HOOK_STAGES}
        onComplete={handleComplete}
        resultBadge="8 hooks listos"
      />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold neon-text">{value}</p>
    </div>
  );
}
