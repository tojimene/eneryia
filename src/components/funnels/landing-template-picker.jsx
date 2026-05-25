"use client";

import { motion } from "framer-motion";
import { ArrowRight, LayoutTemplate } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LANDING_TEMPLATES } from "@/lib/landing-templates";
import { cn } from "@/lib/utils";

export function LandingTemplatePicker({ value, onSelect, templates }) {
  const list = templates && templates.length ? templates : LANDING_TEMPLATES;
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {list.map((tpl, idx) => {
        const active = tpl.id === value;
        return (
          <motion.button
            key={tpl.id}
            type="button"
            onClick={() => onSelect(tpl.id)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            whileHover={{ y: -3 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border p-4 text-left transition-all",
              active
                ? "border-primary/60 bg-primary/10 shadow-[0_0_28px_rgba(0,229,255,0.18)]"
                : "border-border/60 bg-card/40 hover:border-primary/40"
            )}
          >
            <div
              className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${tpl.accent}`}
            />

            {/* Preview chip de la paleta */}
            <div
              className="mb-3 flex h-14 items-end gap-1 overflow-hidden rounded-lg border p-2"
              style={{
                background: tpl.palette.bg,
                borderColor: `${tpl.palette.accent}44`,
              }}
            >
              <span
                className="h-3 w-8 rounded-sm"
                style={{ background: tpl.palette.surface }}
              />
              <span
                className="h-6 flex-1 rounded-sm"
                style={{ background: tpl.palette.surfaceAlt }}
              />
              <span
                className="h-10 w-10 rounded-sm"
                style={{ background: tpl.palette.accent }}
              />
              <span
                className="h-4 w-6 rounded-sm"
                style={{ background: tpl.palette.accentSoft }}
              />
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                  <LayoutTemplate className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {tpl.name}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">
                    {tpl.description}
                  </p>
                </div>
              </div>
              <ArrowRight
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  active ? "text-primary" : "text-muted-foreground/70"
                )}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Badge variant="violet" className="font-mono text-[9px]">
                  {tpl.winRate}% win
                </Badge>
                {tpl.bestFor.slice(0, 2).map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-border/60 px-1.5 py-0.5 text-[9px] uppercase tracking-widest"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <span className="font-mono">{tpl.sections.length} bloques</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
