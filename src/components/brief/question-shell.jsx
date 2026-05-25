"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuestionShell({
  index,
  total,
  question,
  isComplete,
  onAssist,
  children,
}) {
  const [isAssisting, setIsAssisting] = useState(false);

  async function handleAssist() {
    if (!onAssist) return;
    setIsAssisting(true);
    try {
      await onAssist();
    } finally {
      setIsAssisting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card/60 glass p-6 lg:p-8 transition-colors",
        isComplete ? "border-primary/40" : "border-border/60"
      )}
    >
      {isComplete && (
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}

      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-xs font-mono",
              isComplete
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border/60 bg-card/40 text-muted-foreground"
            )}
          >
            {isComplete ? <Check className="h-4 w-4" /> : `0${index + 1}`.slice(-2)}
          </span>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Pregunta {index + 1} de {total}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-foreground lg:text-xl">
              {question.label}
            </h3>
            {question.helper && (
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {question.helper}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isComplete && <Badge variant="success">Listo</Badge>}
          {onAssist && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleAssist}
              disabled={isAssisting}
              className="shrink-0"
            >
              {isAssisting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              {isAssisting ? "Pensando…" : "Asistir con IA"}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-5">{children}</div>
    </motion.div>
  );
}
