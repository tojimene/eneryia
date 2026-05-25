"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RefreshCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { FormatPicker } from "@/components/content/format-picker";
import { FrameworkPicker } from "@/components/content/framework-picker";
import { GenerationOverlay } from "@/components/content/generation-overlay";
import { ContentResult } from "@/components/content/content-result";
import { BriefContextPill } from "@/components/content/brief-context-pill";
import {
  GENERATION_STAGES,
  getFormatById,
  getLongFrameworkById,
} from "@/lib/content-frameworks";
import { getLongPiece } from "@/lib/content-mock";

const STEPS = [
  { id: "format", label: "Elige el formato" },
  { id: "framework", label: "Elige la estructura" },
  { id: "result", label: "Pieza generada" },
];

export default function ContenidoLargoPage() {
  const [stage, setStage] = useState("format");
  const [formatId, setFormatId] = useState(null);
  const [frameworkId, setFrameworkId] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [piece, setPiece] = useState(null);
  const [regenSeed, setRegenSeed] = useState(0);

  const stepIndex = STEPS.findIndex((s) => s.id === stage);

  function handlePickFormat(id) {
    setFormatId(id);
    setStage("framework");
  }

  function handlePickFramework(id) {
    setFrameworkId(id);
    runGeneration(formatId, id);
  }

  function runGeneration(fId, frId) {
    setGenerating(true);
    setStage("framework");

    setTimeout(() => {
      const next = getLongPiece(fId, frId);
      setPiece(next);
    }, 100);
  }

  function handleComplete() {
    setTimeout(() => {
      setGenerating(false);
      setStage("result");
    }, 600);
  }

  function handleRegenerate() {
    setRegenSeed((s) => s + 1);
    setPiece(null);
    runGeneration(formatId, frameworkId);
  }

  function handleReset() {
    setFormatId(null);
    setFrameworkId(null);
    setPiece(null);
    setStage("format");
  }

  const format = getFormatById(formatId);
  const framework = getLongFrameworkById(frameworkId);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Contenido · Largo"
        title="Pieza larga generada con tu Brief"
        description="Posts largos, artículos, guiones de VSL y dossieres. Cada salida consume el avatar, el mecanismo único y los problemas que has cargado en el Brief."
        badges={[
          { label: "Motor IA · v1" },
          { label: "Consume del Brief", variant: "violet" },
        ]}
        action={
          (stage !== "format" || piece) && (
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCcw className="h-4 w-4" />
              Nueva pieza
            </Button>
          )
        }
      />

      <BriefContextPill />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-3 lg:flex-row lg:items-center lg:gap-1 lg:p-2"
      >
        {STEPS.map((step, idx) => {
          const isCurrent = idx === stepIndex;
          const isPast = idx < stepIndex;
          return (
            <div
              key={step.id}
              className={`flex flex-1 items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-all ${
                isCurrent
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : isPast
                    ? "border-primary/30 bg-primary/5 text-foreground/80"
                    : "border-border/50 bg-card/30 text-muted-foreground"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[10px] font-mono ${
                  isCurrent || isPast
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-border/60 bg-card/40"
                }`}
              >
                {`0${idx + 1}`.slice(-2)}
              </span>
              <span className="truncate">{step.label}</span>
            </div>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        {stage === "format" && (
          <motion.section
            key="format"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <header className="flex items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Elige el formato
                </h2>
                <p className="text-sm text-muted-foreground">
                  Cada formato cambia la longitud, el tono y el destino.
                </p>
              </div>
              <Badge variant="neon">
                <Sparkles className="h-3 w-3" />
                4 formatos
              </Badge>
            </header>
            <FormatPicker value={formatId} onSelect={handlePickFormat} />
          </motion.section>
        )}

        {stage === "framework" && (
          <motion.section
            key="framework"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <header className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Elige la estructura ganadora
                </h2>
                <p className="text-sm text-muted-foreground">
                  Son swipes maestros validados. Cada uno tiene su beat narrativo.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => setStage("format")}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Cambiar formato
              </Button>
            </header>
            <FrameworkPicker
              value={frameworkId}
              onSelect={handlePickFramework}
            />
          </motion.section>
        )}

        {stage === "result" && piece && (
          <motion.section
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ContentResult
              key={regenSeed}
              piece={piece}
              formatTitle={format?.title}
              frameworkName={framework?.name}
              onRegenerate={handleRegenerate}
            />

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="outline" onClick={() => setStage("framework")}>
                <ArrowLeft className="h-4 w-4" />
                Cambiar estructura
              </Button>
              <Button variant="neon" onClick={handleReset}>
                Generar nueva pieza
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <GenerationOverlay
        open={generating}
        title="Generando contenido largo"
        subtitle={
          framework
            ? `Aplicando ${framework.name} con tu Brief Eneryia`
            : "Aplicando estructura ganadora con tu Brief Eneryia"
        }
        stages={GENERATION_STAGES}
        onComplete={handleComplete}
        resultBadge={format?.surface}
      />
    </div>
  );
}
