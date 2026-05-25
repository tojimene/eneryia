"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Crown,
  Gift,
  HelpCircle,
  Layers,
  ListChecks,
  MailPlus,
  PlayCircle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Tag,
  Trophy,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { LANDING_SECTIONS } from "@/lib/landing-templates";
import { cn } from "@/lib/utils";

const ICONS = {
  Crown,
  PlayCircle,
  Award,
  AlertTriangle,
  BookOpen,
  Sparkles,
  CheckCircle,
  Trophy,
  Workflow,
  Layers,
  Tag,
  ShieldCheck,
  Clock,
  ArrowRight,
  HelpCircle,
  Gift,
  MailPlus,
  ListChecks,
};

export function LandingSectionList({
  sections,
  activeId,
  onSelect,
  onRegenerate,
}) {
  return (
    <div className="space-y-2">
      {sections.map(({ id, content }, idx) => {
        const meta = LANDING_SECTIONS[id] ?? { label: id, icon: "Sparkles" };
        const Icon = ICONS[meta.icon] ?? Sparkles;
        const active = content.id === activeId;

        function handleKeyDown(event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect?.(content.id);
          }
        }

        return (
          <motion.div
            key={content.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect?.(content.id)}
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.03 }}
            className={cn(
              "group flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/60",
              active
                ? "border-primary/60 bg-primary/10"
                : "border-border/60 bg-card/40 hover:border-primary/40"
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                active
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-border/60 bg-background/40 text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-foreground">
                {meta.label}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                {content.title ||
                  content.headline ||
                  content.label ||
                  content.eyebrow ||
                  "Bloque generado"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onRegenerate?.(content.id);
              }}
              title="Regenerar este bloque"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
