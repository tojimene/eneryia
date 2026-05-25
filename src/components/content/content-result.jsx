"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  RefreshCw,
  Star,
  Download,
  Pencil,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export function ContentResult({
  piece,
  onRegenerate,
  formatTitle,
  frameworkName,
}) {
  const [body, setBody] = useState(piece.body);
  const [title, setTitle] = useState(piece.title);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);

  async function handleCopy() {
    try {
      const payload = `${title}\n\n${body}\n\n${piece.cta ?? ""}`.trim();
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  function handleDownload() {
    const payload = `${title}\n\n${body}\n\n${piece.cta ?? ""}`.trim();
    const blob = new Blob([payload], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="rounded-2xl border border-primary/30 bg-card/60 glass p-5 lg:p-8">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="neon">
                <Sparkles className="h-3 w-3" />
                Generado
              </Badge>
              {formatTitle && (
                <Badge variant="outline">{formatTitle}</Badge>
              )}
              {frameworkName && (
                <Badge variant="violet">{frameworkName}</Badge>
              )}
              {piece.metaTags?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
            {isEditing ? (
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none focus:border-b focus:border-primary/40 lg:text-3xl"
              />
            ) : (
              <h2 className="text-2xl font-semibold leading-tight text-foreground lg:text-3xl">
                {title}
              </h2>
            )}
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => setFavorited((v) => !v)}
            >
              <Star
                className={
                  favorited
                    ? "h-4 w-4 fill-primary text-primary"
                    : "h-4 w-4 text-muted-foreground"
                }
              />
              {favorited ? "Guardado" : "Guardar"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setIsEditing((v) => !v)}
            >
              <Pencil className="h-3.5 w-3.5" />
              {isEditing ? "Listo" : "Editar"}
            </Button>
            <Button variant="outline" size="sm" type="button" onClick={onRegenerate}>
              <RefreshCw className="h-3.5 w-3.5" />
              Regenerar
            </Button>
            <Button variant="outline" size="sm" type="button" onClick={handleDownload}>
              <Download className="h-3.5 w-3.5" />
              .md
            </Button>
            <Button
              variant={copied ? "neon" : "default"}
              size="sm"
              type="button"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copiar todo
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-6">
          {isEditing ? (
            <Textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={18}
              className="font-mono text-sm leading-relaxed"
            />
          ) : (
            <article className="prose prose-invert max-w-none whitespace-pre-line text-sm leading-relaxed text-foreground/90 lg:text-base">
              {body}
            </article>
          )}
        </div>

        {piece.cta && (
          <div className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-3">
            <p className="text-[10px] uppercase tracking-widest text-primary/80">
              CTA sugerido
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {piece.cta}
            </p>
          </div>
        )}

        <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4 text-[11px] text-muted-foreground">
          <span>
            {body.split(/\s+/).filter(Boolean).length} palabras
          </span>
          <span className="opacity-50">·</span>
          <span>{Math.ceil(body.split(/\s+/).filter(Boolean).length / 220)} min lectura</span>
          <span className="opacity-50">·</span>
          <span>v1.0 · {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
}
