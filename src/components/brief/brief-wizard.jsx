"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CornerDownLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBrief } from "@/context/brief-context";
import { getOverallProgress } from "@/lib/brief-questions";
import { cn } from "@/lib/utils";

import { BriefIntro } from "./brief-intro";
import { BriefFinish } from "./brief-finish";
import { BriefStep } from "./brief-step";
import { BriefUpload } from "./brief-upload";
import { BriefSummary } from "./brief-summary";

function StepperDots() {
  const { steps, stepIndex, questionIndex, goToStep, answers } = useBrief();

  return (
    <div className="flex w-full items-center gap-1 overflow-x-auto scrollbar-hide">
      {steps.map((step, idx) => {
        const isPast = idx < stepIndex;
        const isCurrent = idx === stepIndex;
        const hasQuestions = step.questions.length > 0;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => goToStep(idx)}
            className={cn(
              "group relative flex flex-1 shrink-0 items-center gap-2 rounded-lg border px-3 py-2 transition-all",
              "min-w-[120px]",
              isCurrent
                ? "border-primary/60 bg-primary/10"
                : isPast
                  ? "border-primary/30 bg-primary/5"
                  : "border-border/50 bg-card/30 hover:border-primary/30"
            )}
            title={step.title}
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[10px] font-mono",
                isCurrent
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : isPast
                    ? "border-primary/30 bg-primary/10 text-primary/80"
                    : "border-border/60 bg-card/40 text-muted-foreground"
              )}
            >
              {`0${idx + 1}`.slice(-2)}
            </span>
            <div className="min-w-0 flex-1 text-left">
              <p
                className={cn(
                  "truncate text-[11px] font-medium leading-tight",
                  isCurrent ? "text-primary" : "text-foreground/80"
                )}
              >
                {step.title}
              </p>
              {hasQuestions && (
                <p className="truncate text-[9px] text-muted-foreground">
                  {step.questions.length} preg.
                </p>
              )}
            </div>
            {isCurrent && hasQuestions && (
              <span className="absolute -bottom-0.5 left-2 right-2 h-0.5 rounded-full bg-border/70">
                <span
                  className="block h-full rounded-full bg-primary shadow-[0_0_8px_rgba(0,229,255,0.6)] transition-all"
                  style={{
                    width: `${
                      ((questionIndex + 1) / step.questions.length) * 100
                    }%`,
                  }}
                />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function BriefWizard() {
  const {
    step,
    steps,
    stepIndex,
    questionIndex,
    answers,
    isHydrated,
    lastSavedAt,
    next,
    prev,
    reset,
  } = useBrief();

  const overall = getOverallProgress(answers);

  const totalQuestions = step.questions?.length ?? 0;
  const isLastStep = stepIndex === steps.length - 1;
  const isFirstStep = stepIndex === 0;
  const isLastQuestionOfStep =
    totalQuestions === 0 || questionIndex >= totalQuestions - 1;

  const counter = useMemo(() => {
    if (step.intro) return "Bienvenida";
    if (step.upload) return "Materia prima";
    if (step.summary) return "Avatar generado";
    if (step.finish) return "Generación final";
    return `Pregunta ${questionIndex + 1} de ${totalQuestions}`;
  }, [step, questionIndex, totalQuestions]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onKey(event) {
      const target = event.target;
      const tag = target?.tagName?.toLowerCase();
      const isEditable =
        tag === "input" ||
        tag === "textarea" ||
        target?.isContentEditable;

      if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        next();
        return;
      }

      if (isEditable) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIndex, questionIndex]);

  if (!isHydrated) {
    return (
      <div className="flex items-center gap-3 text-muted-foreground">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
        Cargando brief…
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-7rem)] flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-border/60 bg-card/50 glass p-4 lg:p-5"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 animate-pulse-neon">
              <Sparkles className="h-5 w-5 text-primary" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                Brief Eneryia · cerebro central
              </p>
              <p className="text-sm font-semibold text-foreground">
                {step.title}
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  · {counter}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span>{overall.percent}% completo</span>
                <span>
                  · {overall.completed}/{overall.total}
                </span>
              </div>
              <div className="h-1.5 w-44 overflow-hidden rounded-full bg-secondary/60">
                <motion.span
                  className="block h-full bg-gradient-to-r from-[#00e5ff] via-[#4f8cff] to-[#8a5cff]"
                  initial={false}
                  animate={{ width: `${overall.percent}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
            <Badge variant={lastSavedAt ? "success" : "outline"}>
              <Save className="h-3 w-3" />
              {lastSavedAt
                ? new Date(lastSavedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Sin guardar"}
            </Badge>
          </div>
        </div>

        <div className="mt-4">
          <StepperDots />
        </div>
      </motion.div>

      <div className="flex-1 px-0">
        {step.intro && <BriefIntro />}
        {step.upload && <BriefUpload />}
        {step.summary && <BriefSummary />}
        {step.finish && <BriefFinish />}
        {!step.intro && !step.upload && !step.summary && !step.finish && (
          <BriefStep />
        )}
      </div>

      <motion.footer
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky bottom-0 z-20 -mx-4 mt-2 border-t border-border/60 bg-background/80 px-4 py-3 backdrop-blur-md lg:-mx-8 lg:px-8"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={prev}
              disabled={isFirstStep && questionIndex === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Anterior</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:inline-flex"
              onClick={() => {
                if (window.confirm("¿Reiniciar todo el brief?")) reset();
              }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reiniciar
            </Button>
          </div>

          <div className="hidden flex-col items-center text-[11px] text-muted-foreground sm:flex">
            <span>
              Paso {stepIndex + 1} / {steps.length}
              {totalQuestions > 0 && (
                <span className="text-foreground/70">
                  {" "}
                  · Pregunta {questionIndex + 1} / {totalQuestions}
                </span>
              )}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground/70">
              <kbd className="rounded border border-border/60 bg-card/50 px-1 font-mono">
                ←
              </kbd>
              <kbd className="rounded border border-border/60 bg-card/50 px-1 font-mono">
                →
              </kbd>
              navegar ·{" "}
              <kbd className="rounded border border-border/60 bg-card/50 px-1 font-mono">
                ⌘
              </kbd>
              <kbd className="rounded border border-border/60 bg-card/50 px-1 font-mono">
                <CornerDownLeft className="inline h-2.5 w-2.5" />
              </kbd>
              avanzar
            </span>
          </div>

          <Button size="lg" onClick={next} disabled={isLastStep}>
            <span className="hidden sm:inline">
              {step.intro
                ? "Empezar"
                : step.summary
                  ? "Generar"
                  : step.upload
                    ? "Continuar"
                    : isLastQuestionOfStep
                      ? "Siguiente paso"
                      : "Siguiente"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.footer>
    </div>
  );
}
