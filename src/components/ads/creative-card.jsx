"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Download,
  Heart,
  RefreshCcw,
  Trash2,
  Check,
  ExternalLink,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreativeCanvas } from "./creative-canvas";
import { cn } from "@/lib/utils";

export function CreativeCard({
  creative,
  onRegenerate,
  onRemove,
  onToggleFavorite,
  favorite,
}) {
  const [copied, setCopied] = useState(false);

  async function copyCopy() {
    const blob = [
      `Hook: ${creative.hook}`,
      "",
      "Beneficios:",
      ...creative.benefits.map((b) => `· ${b}`),
      "",
      `Qualifier: ${creative.qualifier}`,
      `CTA: ${creative.cta}`,
      "",
      `Prueba: ${creative.trust}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(blob);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      console.error(err);
    }
  }

  function fakeDownload() {
    // En demo: descarga el copy del creativo como .txt (mock del JPG real).
    const payload = JSON.stringify(creative, null, 2);
    const blobObj = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blobObj);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${creative.id}-${creative.formatId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 transition-colors hover:border-primary/40"
    >
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <header className="flex items-start justify-between gap-2 border-b border-border/60 p-3">
        <div className="flex items-center gap-2">
          <Badge variant="violet" className="font-mono text-[10px]">
            {creative.id}
          </Badge>
          <p className="text-xs font-semibold text-foreground">
            {creative.formatName}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 font-mono text-[10px]",
              creative.score >= 90
                ? "border-primary/40 bg-primary/10 text-primary"
                : creative.score >= 80
                  ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                  : "border-border/60 bg-card/40 text-muted-foreground"
            )}
          >
            {creative.score}
          </span>
        </div>
      </header>

      <div className="p-3">
        <CreativeCanvas creative={creative} />
      </div>

      <footer className="space-y-2 border-t border-border/60 p-3">
        <p className="line-clamp-2 text-[11px] text-muted-foreground">
          {creative.hook}
        </p>

        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={copyCopy}
              title="Copiar copy"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={fakeDownload}
              title="Descargar"
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => onRegenerate?.(creative.id)}
              title="Regenerar variante"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className={cn(
                "h-8 w-8",
                favorite
                  ? "text-pink-400 hover:text-pink-300"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => onToggleFavorite?.(creative.id)}
              title="Favorito"
            >
              <Heart
                className="h-3.5 w-3.5"
                fill={favorite ? "currentColor" : "none"}
              />
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove?.(creative.id)}
              title="Eliminar"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title="Abrir en editor"
              disabled
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </footer>
    </motion.article>
  );
}
