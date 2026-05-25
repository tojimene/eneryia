"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Hash,
  Video,
  Mail,
  PlaySquare,
  Copy,
  Check,
  Star,
  RefreshCw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SURFACE_ICONS = {
  linkedin: Briefcase,
  twitter: Hash,
  "reel-hook": Video,
  "email-subject": Mail,
  "youtube-title": PlaySquare,
};

const SURFACE_LABEL = {
  linkedin: "LinkedIn",
  twitter: "X / Twitter",
  "reel-hook": "Reel Hook",
  "email-subject": "Asunto email",
  "youtube-title": "Título YouTube",
};

const SCORE_VARIANT = (score) => {
  if (score >= 90) return "success";
  if (score >= 85) return "neon";
  return "violet";
};

export function HookCard({ hook, onRemove, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const SurfaceIcon = SURFACE_ICONS[hook.surface] ?? Linkedin;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(hook.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.22 }}
      className={cn(
        "relative flex flex-col gap-3 overflow-hidden rounded-2xl border bg-card/55 glass p-4",
        favorited ? "border-primary/40" : "border-border/60"
      )}
    >
      {favorited && (
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}

      <header className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/40 bg-primary/10">
            <SurfaceIcon className="h-3.5 w-3.5 text-primary" />
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {SURFACE_LABEL[hook.surface] ?? hook.surface}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="text-[10px] font-mono">
            {hook.id}
          </Badge>
          <Badge variant={SCORE_VARIANT(hook.score)}>{hook.score}</Badge>
        </div>
      </header>

      <p className="text-sm leading-snug text-foreground/90">{hook.text}</p>

      <footer className="mt-auto flex items-center justify-between gap-2 border-t border-border/40 pt-3">
        <Badge variant="outline" className="text-[10px]">
          {hook.angle}
        </Badge>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="h-7 w-7"
            onClick={() => setFavorited((v) => !v)}
            title={favorited ? "Quitar de favoritos" : "Guardar"}
          >
            <Star
              className={
                favorited
                  ? "h-3.5 w-3.5 fill-primary text-primary"
                  : "h-3.5 w-3.5 text-muted-foreground"
              }
            />
          </Button>
          {onRegenerate && (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="h-7 w-7"
              onClick={() => onRegenerate(hook.id)}
              title="Regenerar variante"
            >
              <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          )}
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(hook.id)}
              title="Descartar"
            >
              ×
            </Button>
          )}
          <Button
            variant={copied ? "neon" : "outline"}
            size="sm"
            type="button"
            onClick={handleCopy}
            className="ml-1"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copiar
              </>
            )}
          </Button>
        </div>
      </footer>
    </motion.article>
  );
}
