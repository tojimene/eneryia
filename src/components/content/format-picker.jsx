"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  ScrollText,
  Video,
  FileStack,
  ArrowRight,
} from "lucide-react";

import { LONG_FORMATS } from "@/lib/content-frameworks";
import { cn } from "@/lib/utils";

const ICONS = { Linkedin: Briefcase, ScrollText, Video, FileStack };

export function FormatPicker({ value, onSelect }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {LONG_FORMATS.map((format, idx) => {
        const Icon = ICONS[format.icon] ?? FileStack;
        const active = format.id === value;
        return (
          <motion.button
            key={format.id}
            type="button"
            onClick={() => onSelect(format.id)}
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
            <div
              className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${format.accent}`}
            />
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {format.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {format.description}
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
            <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{format.surface}</span>
              <span className="font-mono">{format.target}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
