"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { VIDEO_FRAMEWORKS } from "@/lib/video-frameworks";
import { cn } from "@/lib/utils";

export function VideoFrameworkPicker({ value, onSelect }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {VIDEO_FRAMEWORKS.map((fw, idx) => {
        const active = fw.id === value;
        return (
          <motion.button
            key={fw.id}
            type="button"
            onClick={() => onSelect(fw.id)}
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
              className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${fw.accent}`}
            />
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {fw.name}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">
                    {fw.description}
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
                  {fw.winRate}% win
                </Badge>
                {fw.bestFor.slice(0, 2).map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-border/60 px-1.5 py-0.5 text-[9px] uppercase tracking-widest"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <span className="font-mono">{fw.beats.length} beats</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
