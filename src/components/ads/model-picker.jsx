"use client";

import { motion } from "framer-motion";
import { Cpu, Gauge, Image as ImageIcon, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { IMAGE_MODELS, ASPECT_RATIOS } from "@/lib/ads-frameworks";
import { cn } from "@/lib/utils";

export function ModelPicker({ modelId, ratioId, onModelChange, onRatioChange }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5 text-primary" />
            <p className="text-sm font-medium text-foreground">
              Motor de imagen
            </p>
          </div>
          <Badge variant="violet">{IMAGE_MODELS.length} modelos</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {IMAGE_MODELS.map((m, idx) => {
            const active = m.id === modelId;
            return (
              <motion.button
                key={m.id}
                type="button"
                onClick={() => onModelChange(m.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileHover={{ y: -2 }}
                className={cn(
                  "relative overflow-hidden rounded-2xl border p-4 text-left transition-all",
                  active
                    ? "border-primary/60 bg-primary/10 shadow-[0_0_24px_rgba(0,229,255,0.18)]"
                    : "border-border/60 bg-card/40 hover:border-primary/40"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </span>
                  {m.badge && <Badge variant="neon">{m.badge}</Badge>}
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {m.name}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                  {m.description}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <div>
                    <p>Vel.</p>
                    <p className="font-mono text-foreground/80">{m.speed}</p>
                  </div>
                  <div>
                    <p>Cal.</p>
                    <p className="font-mono text-foreground/80">{m.quality}</p>
                  </div>
                  <div>
                    <p>Cost</p>
                    <p className="font-mono text-foreground/80">{m.cost}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <ImageIcon className="h-3.5 w-3.5 text-primary" />
          <p className="text-sm font-medium text-foreground">Aspect ratio</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {ASPECT_RATIOS.map((r) => {
            const active = r.id === ratioId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => onRatioChange(r.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3 py-2 text-xs transition-all",
                  active
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40"
                )}
              >
                <span
                  className={cn(
                    "block rounded-sm border",
                    active ? "border-primary/70" : "border-border/70"
                  )}
                  style={{
                    width: 22,
                    height: (22 * r.h) / r.w,
                  }}
                />
                <div className="text-left">
                  <p className="font-mono text-[11px] text-foreground/85">
                    {r.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {r.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
