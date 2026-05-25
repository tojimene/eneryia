"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Check,
  Loader2,
  Sparkles,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useBrief } from "@/context/brief-context";
import { getOverallProgress, BRIEF_STEPS } from "@/lib/brief-questions";

const GENERATION_STAGES = [
  { label: "Analizando posicionamiento y nicho", ms: 900 },
  { label: "Mapeando dolores y deseos del avatar", ms: 1100 },
  { label: "Estudiando competidores y mecanismos", ms: 1100 },
  { label: "Generando hooks de contenido largo y corto", ms: 1300 },
  { label: "Creando ángulos de ads estáticos y vídeo", ms: 1300 },
  { label: "Construyendo funnels VSL, dossier y upsells", ms: 1500 },
  { label: "Sincronizando ecosistema en tu portal", ms: 900 },
];

export function BriefFinish() {
  const { answers, goToStep, reset, steps } = useBrief();
  const overall = getOverallProgress(answers);
  const [stage, setStage] = useState(-1);
  const [done, setDone] = useState(false);

  const incompleteSteps = steps.filter((step) => {
    if (!step.questions.length || step.optional) return false;
    const filled = step.questions.filter((question) => {
      const value = answers[question.id];
      if (Array.isArray(value)) return value.filter(Boolean).length > 0;
      return Boolean(value);
    }).length;
    return filled < step.questions.length;
  });

  useEffect(() => {
    if (stage < 0 || done) return;
    if (stage >= GENERATION_STAGES.length) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => {
      setStage((prev) => prev + 1);
    }, GENERATION_STAGES[stage]?.ms ?? 900);
    return () => clearTimeout(timer);
  }, [stage, done]);

  function startGeneration() {
    setDone(false);
    setStage(0);
  }

  function regenerate() {
    setStage(-1);
    setDone(false);
    setTimeout(() => setStage(0), 200);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 glass p-8 lg:p-10"
    >
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#00e5ff] opacity-15 blur-[140px]" />
      <div className="absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-[#8a5cff] opacity-15 blur-[140px]" />

      <div className="relative space-y-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="neon">Paso final</Badge>
            <Badge variant={overall.percent === 100 ? "success" : "violet"}>
              {overall.percent}% del brief
            </Badge>
          </div>
          <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
            {done
              ? "Tu ecosistema está listo."
              : stage >= 0
                ? "Generando tu ecosistema con IA…"
                : "¿Listo para activar tu portal?"}
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground lg:text-base">
            {done
              ? "Tu contenido, ads y funnels iniciales ya están preparados. Puedes revisarlos en cada sección del portal."
              : "Con tu brief, nuestra IA producirá contenido, ads y funnels listos para usar. Esto es una demo: la generación se simula para mostrar el flujo completo."}
          </p>
        </div>

        {incompleteSteps.length > 0 && stage < 0 && (
          <div className="rounded-lg border border-yellow-400/30 bg-yellow-400/5 p-4">
            <p className="text-sm font-medium text-yellow-200">
              Te faltan {incompleteSteps.length} sección
              {incompleteSteps.length === 1 ? "" : "es"} por completar
            </p>
            <p className="mt-1 text-xs text-yellow-100/70">
              Podemos generar igual, pero la calidad mejora si lo completas todo.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {incompleteSteps.map((step) => {
                const index = BRIEF_STEPS.findIndex((s) => s.id === step.id);
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => goToStep(index)}
                    className="rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-[11px] text-yellow-100 transition-colors hover:bg-yellow-400/20"
                  >
                    {step.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {stage < 0 && (
          <div className="space-y-3">
            <Progress value={overall.percent} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {overall.completed} de {overall.total} preguntas obligatorias
              completadas
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {stage >= 0 && (
            <motion.ol
              key="stages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {GENERATION_STAGES.map((stageData, idx) => {
                const isPast = idx < stage || done;
                const isCurrent = idx === stage && !done;
                return (
                  <motion.li
                    key={stageData.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 p-3"
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${
                        isPast
                          ? "border-primary/40 bg-primary/15 text-primary"
                          : isCurrent
                            ? "border-primary/60 bg-primary/20 text-primary animate-pulse-neon"
                            : "border-border/50 bg-card/40 text-muted-foreground"
                      }`}
                    >
                      {isPast ? (
                        <Check className="h-4 w-4" />
                      ) : isCurrent ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <span className="text-[10px] font-mono">
                          {`0${idx + 1}`.slice(-2)}
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-sm ${
                        isPast || isCurrent
                          ? "text-foreground"
                          : "text-muted-foreground/80"
                      }`}
                    >
                      {stageData.label}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ol>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {stage < 0 && (
            <Button size="lg" onClick={startGeneration} className="sm:flex-1">
              <Sparkles className="h-4 w-4" />
              Generar ecosistema con IA
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}

          {done && (
            <>
              <Button size="lg" variant="neon" onClick={regenerate}>
                <RefreshCw className="h-4 w-4" />
                Regenerar
              </Button>
              <Button size="lg" asChild>
                <a href="/dashboard/contenido/largo">
                  <Rocket className="h-4 w-4" />
                  Ver ecosistema
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </>
          )}

          {stage < 0 && (
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                if (window.confirm("¿Reiniciar todo el brief?")) reset();
              }}
            >
              Reiniciar brief
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
