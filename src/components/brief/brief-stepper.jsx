"use client";

import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useBrief } from "@/context/brief-context";
import { getStepProgress } from "@/lib/brief-questions";

export function BriefStepper() {
  const { steps, stepIndex, goToStep, answers } = useBrief();

  return (
    <ol className="space-y-2">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCurrent = index === stepIndex;
        const isPast = index < stepIndex;
        const progress = getStepProgress(step, answers);
        const isDone =
          (progress.total > 0 && progress.completed === progress.total) ||
          (progress.total === 0 && isPast);
        const isFuture = index > stepIndex;

        return (
          <li key={step.id}>
            <button
              type="button"
              onClick={() => goToStep(index)}
              className={cn(
                "group relative flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all",
                isCurrent
                  ? "border-primary/50 bg-primary/10 shadow-[inset_0_0_0_1px_rgba(0,229,255,0.2)]"
                  : "border-border/50 bg-card/30 hover:border-primary/30"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-xs font-mono",
                  isCurrent
                    ? "border-primary/60 bg-primary/15 text-primary"
                    : isDone
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border/60 bg-card/40 text-muted-foreground"
                )}
              >
                {isDone ? (
                  <Check className="h-4 w-4" />
                ) : isFuture && step.optional ? (
                  <Lock className="h-3.5 w-3.5" />
                ) : (
                  Icon && <Icon className="h-4 w-4" />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "truncate text-sm font-medium",
                      isCurrent ? "text-primary" : "text-foreground/90"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.optional && (
                    <Badge variant="outline" className="text-[9px]">
                      OPC
                    </Badge>
                  )}
                </div>
                <p className="truncate text-[11px] text-muted-foreground">
                  {step.subtitle}
                </p>

                {step.questions.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <Progress value={progress.percent} className="h-1" />
                    <p className="text-[10px] text-muted-foreground">
                      {progress.completed}/{progress.total} preguntas
                    </p>
                  </div>
                )}
              </div>

              {isCurrent && (
                <motion.span
                  layoutId="brief-stepper-active"
                  className="absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 -translate-x-1.5 rounded-r bg-primary shadow-[0_0_12px_rgba(0,229,255,0.7)]"
                />
              )}

              {isPast && !isDone && (
                <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-yellow-400/70 shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
