"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  Film,
  Mic,
  Monitor,
  Quote,
  RefreshCcw,
  Type,
  Volume2,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getShotType } from "@/lib/video-frameworks";
import { formatTimestamp } from "@/lib/video-mock";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  Mic,
  Film,
  Type,
  Monitor,
  Zap,
  Quote,
  ArrowRight,
};

export function SceneCard({ scene, onRegenerate, isActive }) {
  const [copied, setCopied] = useState(false);
  const shot = getShotType(scene.shotType);
  const Icon = ICON_MAP[shot.icon] || Film;

  async function copyScene() {
    const text = [
      `[${scene.order}. ${scene.role}] ${formatTimestamp(scene.start)} - ${formatTimestamp(scene.end)} (${scene.seconds}s)`,
      `Toma: ${shot.label}`,
      `Visual: ${scene.visual}`,
      `B-roll: ${scene.broll.join(", ")}`,
      "",
      `Voz-over: ${scene.voiceover}`,
      scene.onScreen ? `On-screen: ${scene.onScreen}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card/40 transition-all",
        isActive
          ? "border-primary/60 shadow-[0_0_28px_rgba(0,229,255,0.18)]"
          : "border-border/60 hover:border-primary/40"
      )}
    >
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Header */}
      <header className="flex items-start justify-between gap-3 border-b border-border/60 p-3 lg:p-4">
        <div className="flex items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
            style={{
              borderColor: `${shot.color}55`,
              background: `${shot.color}15`,
            }}
          >
            <Icon className="h-4 w-4" style={{ color: shot.color }} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground">
                {`0${scene.order}`.slice(-2)}
              </span>
              <p className="text-sm font-semibold text-foreground">
                {scene.role}
              </p>
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {shot.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant="violet" className="font-mono text-[10px]">
            {formatTimestamp(scene.start)}–{formatTimestamp(scene.end)}
          </Badge>
          <span className="text-[10px] text-muted-foreground">
            {scene.seconds}s
          </span>
        </div>
      </header>

      {/* Visual frame mock */}
      <div className="border-b border-border/60 p-3 lg:p-4">
        <div
          className="relative overflow-hidden rounded-xl border"
          style={{
            aspectRatio: "9 / 16",
            maxHeight: 200,
            borderColor: `${shot.color}33`,
            background: "#050816",
          }}
        >
          <div
            className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full opacity-40 blur-2xl"
            style={{ background: shot.color }}
          />
          <div
            className="pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full opacity-25 blur-2xl"
            style={{ background: shot.color }}
          />
          <div className="absolute inset-0 flex flex-col justify-between p-3">
            <div className="flex items-center justify-between">
              <span
                className="font-mono text-[8px] uppercase tracking-[0.3em]"
                style={{ color: shot.color }}
              >
                {shot.label}
              </span>
              <span
                className="rounded-sm px-1.5 py-0.5 font-mono text-[8px]"
                style={{
                  background: `${shot.color}25`,
                  color: shot.color,
                }}
              >
                REC
              </span>
            </div>
            <div className="text-center">
              {scene.onScreen && (
                <p
                  className="mx-auto max-w-[90%] text-sm font-black uppercase leading-tight text-white"
                  style={{
                    textShadow: `0 0 18px ${shot.color}, 0 0 2px rgba(0,0,0,0.6)`,
                  }}
                >
                  {scene.onScreen}
                </p>
              )}
            </div>
            <div>
              <p className="line-clamp-2 text-[9px] italic text-white/70">
                {scene.visual}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Voiceover */}
      <div className="space-y-2 border-b border-border/60 p-3 lg:p-4">
        <div className="flex items-center gap-2">
          <Volume2 className="h-3 w-3 text-primary" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary/80">
            Voz-over
          </span>
        </div>
        <p className="text-sm leading-snug text-foreground/90">
          {scene.voiceover}
        </p>
      </div>

      {/* Meta */}
      <div className="space-y-2 p-3 lg:p-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            B-roll sugerido
          </span>
          <ul className="mt-1 space-y-0.5">
            {scene.broll.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[11px] text-foreground/80"
              >
                <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-primary" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-1 border-t border-border/60 pt-2">
          <p className="line-clamp-1 flex-1 text-[10px] italic text-muted-foreground">
            {scene.copyHint}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={copyScene}
              title="Copiar escena"
            >
              {copied ? (
                <Check className="h-3 w-3 text-primary" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => onRegenerate?.(scene.id)}
              title="Regenerar escena"
            >
              <RefreshCcw className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
