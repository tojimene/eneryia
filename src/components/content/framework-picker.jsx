"use client";

import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LONG_FRAMEWORKS } from "@/lib/content-frameworks";
import { cn } from "@/lib/utils";

const INTENSITY_VARIANT = {
  Alto: "destructive",
  Medio: "violet",
  Bajo: "outline",
};

export function FrameworkPicker({ value, onSelect }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {LONG_FRAMEWORKS.map((framework, idx) => {
        const active = framework.id === value;
        return (
          <motion.button
            key={framework.id}
            type="button"
            onClick={() => onSelect(framework.id)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -3 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all",
              active
                ? "border-primary/60 bg-primary/10 shadow-[0_0_28px_rgba(0,229,255,0.18)]"
                : "border-border/60 bg-card/50 hover:border-primary/40"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                  <Flame className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {framework.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {framework.summary}
                  </p>
                </div>
              </div>
              <Badge variant={INTENSITY_VARIANT[framework.intensity] ?? "neon"}>
                {framework.intensity}
              </Badge>
            </div>

            <div className="mt-4 space-y-1">
              {framework.beats.map((beat, beatIdx) => (
                <div
                  key={beat}
                  className="flex items-center gap-2 text-[11px] text-foreground/80"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-[9px] text-primary">
                    {beatIdx + 1}
                  </span>
                  <span className="truncate">{beat}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <Zap className="h-3 w-3 text-primary/70" />
              {framework.bestFor.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
