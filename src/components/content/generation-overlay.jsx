"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Sparkles, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GenerationOverlay({
  open,
  title = "Generando con IA",
  subtitle = "Eneryia construye tu pieza con el brief inyectado",
  stages = [],
  onClose,
  onComplete,
  resultBadge,
}) {
  const [activeStage, setActiveStage] = useState(-1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setActiveStage(-1);
      setDone(false);
      return undefined;
    }
    setActiveStage(0);

    let cancelled = false;

    async function run() {
      for (let i = 0; i < stages.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) =>
          setTimeout(resolve, stages[i]?.ms ?? 700)
        );
        if (cancelled) return;
        setActiveStage(i + 1);
      }
      if (cancelled) return;
      setDone(true);
      onComplete?.();
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [open, stages, onComplete]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md"
          aria-modal
          role="dialog"
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
          <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-[#00e5ff] opacity-20 blur-[140px]" />
          <div className="pointer-events-none absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-[#8a5cff] opacity-20 blur-[140px]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-primary/30 bg-card/80 glass p-6 lg:p-8"
          >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 animate-pulse-neon">
                  <Sparkles className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-primary/80">
                    Motor Eneryia
                  </p>
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {subtitle}
                  </p>
                </div>
              </div>
              {onClose && (
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <ol className="mt-5 space-y-2">
              {stages.map((stage, idx) => {
                const isPast = idx < activeStage || done;
                const isCurrent = idx === activeStage && !done;
                return (
                  <motion.li
                    key={stage.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 p-3"
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-[10px] font-mono",
                        isPast
                          ? "border-primary/40 bg-primary/15 text-primary"
                          : isCurrent
                            ? "border-primary/60 bg-primary/20 text-primary"
                            : "border-border/50 bg-card/40 text-muted-foreground"
                      )}
                    >
                      {isPast ? (
                        <Check className="h-4 w-4" />
                      ) : isCurrent ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        `0${idx + 1}`.slice(-2)
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        isPast || isCurrent
                          ? "text-foreground"
                          : "text-muted-foreground/80"
                      )}
                    >
                      {stage.label}
                    </span>
                  </motion.li>
                );
              })}
            </ol>

            {done && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-3"
              >
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Check className="h-4 w-4" />
                  Listo · pieza generada
                </div>
                {resultBadge && <Badge variant="neon">{resultBadge}</Badge>}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
