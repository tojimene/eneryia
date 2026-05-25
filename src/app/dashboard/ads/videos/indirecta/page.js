"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Download,
  RefreshCcw,
  Sparkles,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { BriefContextPill } from "@/components/content/brief-context-pill";
import { GenerationOverlay } from "@/components/content/generation-overlay";
import { AngleEditor } from "@/components/ads/angle-editor";
import { IndirectaFrameworkPicker } from "@/components/ads/indirecta-framework-picker";
import { SceneCard } from "@/components/ads/scene-card";
import { StoryboardTimeline } from "@/components/ads/storyboard-timeline";
import {
  INDIRECTA_DURATIONS,
  INDIRECTA_GENERATION_STAGES,
  getIndirectaDurationById,
  getIndirectaFrameworkById,
} from "@/lib/video-indirecta-frameworks";
import {
  buildIndirectaStoryboard,
  regenerateIndirectaScene,
} from "@/lib/video-indirecta-mock";
import { storyboardToScript } from "@/lib/video-mock";
import { useBrief } from "@/context/brief-context";
import { cn } from "@/lib/utils";

function toText(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join("\n");
  if (typeof value === "string") return value;
  return "";
}

function toLines(value) {
  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/\n|·|-/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

const STEPS = [
  { id: "angle", label: "Ángulo + duración" },
  { id: "framework", label: "Estructura educativa" },
  { id: "storyboard", label: "Guion + lessons" },
];

const DEFAULT_ANGLE = {
  hook: "El sistema que llevó a Arnau de 28K a 102K mensuales en 4 meses.",
  benefits: [
    "Brief estratégico instalado en 7 días",
    "Contenido + Ads + Funnels alineados al avatar",
    "Cohortes que escalan mes a mes",
  ],
  qualifier: "Fundadores B2B de +5K/mes con ticket de +3.000€",
  cta: "Reserva tu plaza · Eneryia.net",
};

export default function VideosIndirectaPage() {
  const { answers } = useBrief();
  const briefReady = true;

  const [stage, setStage] = useState("angle");
  const [angle, setAngle] = useState(DEFAULT_ANGLE);
  const [durationId, setDurationId] = useState("180s");
  const [frameworkId, setFrameworkId] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [storyboard, setStoryboard] = useState(null);
  const [activeSceneId, setActiveSceneId] = useState(null);
  const [scriptCopied, setScriptCopied] = useState(false);

  const stepIndex = STEPS.findIndex((s) => s.id === stage);
  const duration = getIndirectaDurationById(durationId);
  const framework = getIndirectaFrameworkById(frameworkId);

  const angleValid =
    (angle.hook || "").trim().length > 0 &&
    (angle.benefits || []).some((b) => b.trim().length > 0) &&
    (angle.qualifier || "").trim().length > 0 &&
    (angle.cta || "").trim().length > 0;

  function handleAutoFillFromBrief() {
    const hookSeed =
      toText(answers.coreProblem) ||
      "El sistema que llevó a Arnau de 28K a 102K mensuales en 4 meses.";
    const benefitsSeed = toLines(answers.uniqueMechanism).slice(0, 3);

    setAngle({
      hook: hookSeed.slice(0, 140),
      benefits:
        benefitsSeed.length >= 2
          ? benefitsSeed
          : [
              "Brief estratégico instalado en 7 días",
              "Contenido + Ads + Funnels alineados al avatar",
              "Cohortes que escalan mes a mes",
            ],
      qualifier:
        toText(answers.target) ||
        "Fundadores B2B de +5K/mes con ticket de +3.000€",
      cta: "Reserva tu plaza · Eneryia.net",
    });
  }

  function runGeneration() {
    setGenerating(true);
    setStage("framework");
    setTimeout(() => {
      const next = buildIndirectaStoryboard({
        frameworkId,
        durationId,
        angle,
      });
      setStoryboard(next);
      setActiveSceneId(next?.scenes?.[0]?.id ?? null);
    }, 100);
  }

  function handleGenerationComplete() {
    setTimeout(() => {
      setGenerating(false);
      setStage("storyboard");
    }, 500);
  }

  function handleRegenerateScene(sceneId) {
    setStoryboard((prev) =>
      prev ? regenerateIndirectaScene(prev, sceneId, angle) : prev
    );
  }

  function handleRegenerateAll() {
    setGenerating(true);
    setTimeout(() => {
      const next = buildIndirectaStoryboard({
        frameworkId,
        durationId,
        angle,
      });
      setStoryboard(next);
      setActiveSceneId(next?.scenes?.[0]?.id ?? null);
    }, 100);
  }

  async function handleCopyScript() {
    if (!storyboard) return;
    try {
      await navigator.clipboard.writeText(storyboardToScript(storyboard));
      setScriptCopied(true);
      setTimeout(() => setScriptCopied(false), 1800);
    } catch (err) {
      console.error(err);
    }
  }

  function handleDownloadScript() {
    if (!storyboard) return;
    const blob = new Blob([storyboardToScript(storyboard)], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${storyboard.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleReset() {
    setStage("angle");
    setStoryboard(null);
    setFrameworkId(null);
    setActiveSceneId(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Ads · Vídeos · Of. Indirecta"
        title="Guion educativo listo para grabar"
        description="Vídeos formativos que educan y precalifican. Aportan valor antes de pedir conversión. Ideales para LinkedIn, YouTube y VSL pre-frame."
        badges={[
          { label: "Of. Indirecta · Educa + vende" },
          { label: "Pre-fill desde Brief", variant: "violet" },
          {
            label: duration ? `Target · ${duration.label}` : "Target · 3 min",
            variant: "success",
          },
        ]}
        action={
          stage !== "angle" && (
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCcw className="h-4 w-4" />
              Nuevo guion
            </Button>
          )
        }
      />

      <BriefContextPill />

      {/* Stepper */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-2 lg:flex-row"
      >
        {STEPS.map((step, idx) => {
          const isCurrent = idx === stepIndex;
          const isPast = idx < stepIndex;
          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-1 items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-all",
                isCurrent
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : isPast
                    ? "border-primary/30 bg-primary/5 text-foreground/80"
                    : "border-border/50 bg-card/30 text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[10px] font-mono",
                  isCurrent || isPast
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-border/60 bg-card/40"
                )}
              >
                {`0${idx + 1}`.slice(-2)}
              </span>
              <span className="truncate">{step.label}</span>
            </div>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        {stage === "angle" && (
          <motion.section
            key="angle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <AngleEditor
              angle={angle}
              onChange={setAngle}
              onAutoFill={handleAutoFillFromBrief}
              briefReady={briefReady}
            />

            {/* Duración */}
            <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Duración objetivo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Mini-lesson, masterclass corta o VSL educativo.
                  </p>
                </div>
                <Badge variant="violet">
                  {INDIRECTA_DURATIONS.length} formatos
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                {INDIRECTA_DURATIONS.map((d) => {
                  const active = d.id === durationId;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDurationId(d.id)}
                      className={cn(
                        "flex flex-col items-start rounded-xl border p-3 text-left transition-all",
                        active
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : "border-border/60 bg-card/30 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="font-mono text-base font-semibold text-foreground">
                        {d.seconds >= 60
                          ? `${Math.round(d.seconds / 60)}m`
                          : `${d.seconds}s`}
                      </span>
                      <span className="line-clamp-2 text-[10px] leading-tight">
                        {d.surface}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <Button
                variant="neon"
                onClick={() => setStage("framework")}
                disabled={!angleValid}
              >
                Siguiente · elegir estructura
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.section>
        )}

        {stage === "framework" && (
          <motion.section
            key="framework"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <header className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                  <BookOpen className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Estructura educativa
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Cada estructura es un guion narrativo distinto. Aporta valor,
                    instala creencia, llama a la acción al final.
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setStage("angle")}>
                <ArrowLeft className="h-3.5 w-3.5" />
                Volver
              </Button>
            </header>

            <IndirectaFrameworkPicker
              value={frameworkId}
              onSelect={setFrameworkId}
            />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <Button
                variant="neon"
                onClick={runGeneration}
                disabled={!frameworkId}
              >
                <Zap className="h-4 w-4" />
                Generar guion
              </Button>
            </div>
          </motion.section>
        )}

        {stage === "storyboard" && storyboard && (
          <motion.section
            key="storyboard"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Header */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                  <BookOpen className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary/80">
                    Guion educativo generado
                  </p>
                  <h3 className="text-base font-semibold text-foreground">
                    {storyboard.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {storyboard.framework.name} · {storyboard.duration.label} ·
                    {" "}
                    {storyboard.scenes.length} lessons
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyScript}>
                  {scriptCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-primary" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copiar guion
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadScript}>
                  <Download className="h-3.5 w-3.5" />
                  Descargar .md
                </Button>
                <Button variant="neon" size="sm" onClick={handleRegenerateAll}>
                  <RefreshCcw className="h-3.5 w-3.5" />
                  Regenerar
                </Button>
              </div>
            </div>

            <StoryboardTimeline
              storyboard={storyboard}
              activeSceneId={activeSceneId}
              onSelect={setActiveSceneId}
            />

            {/* Stats */}
            <div className="grid gap-3 md:grid-cols-4">
              <StatTile
                label="Duración"
                value={
                  storyboard.totalSeconds >= 60
                    ? `${Math.round(storyboard.totalSeconds / 60)}m ${storyboard.totalSeconds % 60}s`
                    : `${storyboard.totalSeconds}s`
                }
              />
              <StatTile label="Lessons" value={storyboard.scenes.length} />
              <StatTile
                label="Estructura"
                value={storyboard.framework.name.split(" ")[0]}
              />
              <StatTile
                label="Win rate"
                value={`${storyboard.framework.winRate}%`}
                accent
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {storyboard.scenes.map((scene) => (
                <div
                  key={scene.id}
                  onClick={() => setActiveSceneId(scene.id)}
                  className="cursor-pointer"
                >
                  <SceneCard
                    scene={scene}
                    isActive={scene.id === activeSceneId}
                    onRegenerate={handleRegenerateScene}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="ghost" onClick={() => setStage("framework")}>
                <ArrowLeft className="h-4 w-4" />
                Cambiar estructura
              </Button>
              <Button variant="neon" onClick={handleReset}>
                <Sparkles className="h-4 w-4" />
                Nuevo guion
              </Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <GenerationOverlay
        open={generating}
        title="Generando guion educativo"
        subtitle={
          framework
            ? `Aplicando ${framework.name} en ${duration?.label ?? ""}`
            : "Aplicando estructura educativa con tu Brief"
        }
        stages={INDIRECTA_GENERATION_STAGES}
        onComplete={handleGenerationComplete}
        resultBadge={duration ? duration.label : undefined}
      />
    </div>
  );
}

function StatTile({ label, value, accent }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card/40 p-4",
        accent ? "border-primary/40" : "border-border/60"
      )}
    >
      {accent && (
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}
