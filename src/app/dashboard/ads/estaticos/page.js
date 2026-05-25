"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Filter,
  Heart,
  RefreshCcw,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/dashboard/page-header";
import { BriefContextPill } from "@/components/content/brief-context-pill";
import { GenerationOverlay } from "@/components/content/generation-overlay";
import { AngleEditor } from "@/components/ads/angle-editor";
import { ModelPicker } from "@/components/ads/model-picker";
import { CreativeCard } from "@/components/ads/creative-card";
import {
  GENERATION_STAGES,
  STATIC_FORMATS,
  getModelById,
} from "@/lib/ads-frameworks";
import { generateCreativeBatch } from "@/lib/ads-mock";
import { useBrief } from "@/context/brief-context";
import { getOverallProgress } from "@/lib/brief-questions";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "angle", label: "Ángulo (140c + 4 checkpoints)" },
  { id: "model", label: "Motor + formato" },
  { id: "result", label: "Manada de creativos" },
];

// Normaliza un valor del Brief (puede venir como string o array) a un string plano.
function toText(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join("\n");
  if (typeof value === "string") return value;
  return "";
}

// Convierte un valor (string o array) en una lista de líneas no vacías.
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

const DEFAULT_ANGLE = {
  hook: "Tu agenda no es predecible. Tu sistema sí puede serlo.",
  benefits: [
    "Brief estratégico instalado en 7 días",
    "Contenido + Ads + Funnels alineados al avatar",
    "Primer cierre extra en menos de 30 días",
  ],
  qualifier: "Fundadores B2B de +5K/mes con ticket de +3.000€",
  cta: "Reserva tu plaza · Eneryia.net",
};

export default function AdsEstaticosPage() {
  const { answers } = useBrief();
  const overall = getOverallProgress(answers);
  const briefReady = true; // siempre permitimos pre-fill: usa Brief si existe, mock si no

  const [stage, setStage] = useState("angle");
  const [angle, setAngle] = useState(DEFAULT_ANGLE);
  const [modelId, setModelId] = useState("nano-banana");
  const [ratioId, setRatioId] = useState("1:1");
  const [activeFormats, setActiveFormats] = useState(
    STATIC_FORMATS.map((f) => f.id)
  );
  const [batchSize, setBatchSize] = useState(9);

  const [generating, setGenerating] = useState(false);
  const [creatives, setCreatives] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [query, setQuery] = useState("");
  const [filterFormat, setFilterFormat] = useState("all");
  const [showFavOnly, setShowFavOnly] = useState(false);

  const stepIndex = STEPS.findIndex((s) => s.id === stage);
  const model = getModelById(modelId);

  function handleAutoFillFromBrief() {
    const hookSeed =
      toText(answers.coreProblem) ||
      "Tu agenda no es predecible. Tu sistema sí puede serlo.";
    const benefitsSeed = toLines(answers.uniqueMechanism).slice(0, 3);

    setAngle({
      hook: hookSeed.slice(0, 140),
      benefits:
        benefitsSeed.length >= 2
          ? benefitsSeed
          : [
              "Brief estratégico instalado en 7 días",
              "Contenido + Ads + Funnels alineados al avatar",
              "Primer cierre extra en menos de 30 días",
            ],
      qualifier:
        toText(answers.target) ||
        "Fundadores B2B de +5K/mes con ticket de +3.000€",
      cta: "Reserva tu plaza · Eneryia.net",
    });
  }

  function runGeneration() {
    setGenerating(true);
    setStage("model");
    setTimeout(() => {
      const batch = generateCreativeBatch({
        hook: angle.hook,
        benefits: (angle.benefits || []).filter(Boolean),
        qualifier: angle.qualifier,
        cta: angle.cta,
        modelId,
        ratio: ratioId,
        size: batchSize,
      }).filter((c) => activeFormats.includes(c.formatId));
      setCreatives(batch);
    }, 100);
  }

  function handleGenerationComplete() {
    setTimeout(() => {
      setGenerating(false);
      setStage("result");
    }, 500);
  }

  function handleRegenerate(id) {
    setCreatives((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx < 0) return prev;
      const replacement = generateCreativeBatch({
        hook: angle.hook,
        benefits: (angle.benefits || []).filter(Boolean),
        qualifier: angle.qualifier,
        cta: angle.cta,
        modelId,
        ratio: ratioId,
        size: 1,
      })[0];
      const next = [...prev];
      next[idx] = { ...replacement, id };
      return next;
    });
  }

  function handleRemove(id) {
    setCreatives((prev) => prev.filter((c) => c.id !== id));
  }

  function handleToggleFavorite(id) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleGenerateMore() {
    const more = generateCreativeBatch({
      hook: angle.hook,
      benefits: (angle.benefits || []).filter(Boolean),
      qualifier: angle.qualifier,
      cta: angle.cta,
      modelId,
      ratio: ratioId,
      size: 6,
    }).filter((c) => activeFormats.includes(c.formatId));
    setCreatives((prev) => [...prev, ...more]);
  }

  function handleReset() {
    setStage("angle");
    setCreatives([]);
    setFavorites(new Set());
  }

  function toggleFormat(id) {
    setActiveFormats((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  const filtered = useMemo(() => {
    return creatives.filter((c) => {
      if (showFavOnly && !favorites.has(c.id)) return false;
      if (filterFormat !== "all" && c.formatId !== filterFormat) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        c.hook.toLowerCase().includes(q) ||
        c.qualifier.toLowerCase().includes(q) ||
        c.benefits.some((b) => b.toLowerCase().includes(q))
      );
    });
  }, [creatives, query, filterFormat, showFavOnly, favorites]);

  const angleValid =
    (angle.hook || "").trim().length > 0 &&
    (angle.benefits || []).some((b) => b.trim().length > 0) &&
    (angle.qualifier || "").trim().length > 0 &&
    (angle.cta || "").trim().length > 0;

  const avgScore = creatives.length
    ? Math.round(
        creatives.reduce((acc, c) => acc + c.score, 0) / creatives.length
      )
    : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Ads · Estáticos"
        title="Manada de creativos lista para testear"
        description="1 ángulo · 4 checkpoints · 6 formatos ganadores. Cada batch genera variantes listas para descargar y subir a Meta/Google."
        badges={[
          { label: "140c · validado" },
          { label: "Pre-fill desde Brief", variant: "violet" },
          {
            label: model ? `Motor · ${model.name}` : "Motor · IA",
            variant: "success",
          },
        ]}
        action={
          stage !== "angle" && (
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCcw className="h-4 w-4" />
              Nuevo ángulo
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

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <Button
                variant="neon"
                onClick={() => setStage("model")}
                disabled={!angleValid}
              >
                Siguiente · elegir motor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.section>
        )}

        {stage === "model" && (
          <motion.section
            key="model"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <ModelPicker
              modelId={modelId}
              ratioId={ratioId}
              onModelChange={setModelId}
              onRatioChange={setRatioId}
            />

            <div className="space-y-3 rounded-2xl border border-border/60 bg-card/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Formatos a incluir en el batch
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activeFormats.length} de {STATIC_FORMATS.length} activos
                  </p>
                </div>
                <Badge variant="violet">{batchSize} variantes</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {STATIC_FORMATS.map((f) => {
                  const active = activeFormats.includes(f.id);
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFormat(f.id)}
                      className={cn(
                        "flex items-center justify-between gap-2 rounded-xl border p-3 text-left text-xs transition-all",
                        active
                          ? "border-primary/60 bg-primary/10 text-foreground"
                          : "border-border/60 bg-card/30 text-muted-foreground opacity-70 hover:opacity-100"
                      )}
                    >
                      <div>
                        <p className="font-semibold">{f.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {f.winRate}% win-rate
                        </p>
                      </div>
                      <span
                        className={cn(
                          "h-4 w-4 rounded-md border",
                          active
                            ? "border-primary bg-primary"
                            : "border-border/60"
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <span>Cantidad por batch</span>
                <div className="flex items-center gap-1">
                  {[6, 9, 12, 18].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setBatchSize(n)}
                      className={cn(
                        "rounded-md border px-2 py-0.5 font-mono text-[11px] transition-all",
                        batchSize === n
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : "border-border/60 bg-card/30 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="ghost" onClick={() => setStage("angle")}>
                <ArrowLeft className="h-4 w-4" />
                Volver al ángulo
              </Button>
              <Button
                variant="neon"
                onClick={runGeneration}
                disabled={activeFormats.length === 0}
              >
                <Zap className="h-4 w-4" />
                Generar {batchSize} creativos
              </Button>
            </div>
          </motion.section>
        )}

        {stage === "result" && (
          <motion.section
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Stats bar */}
            <div className="grid gap-3 md:grid-cols-4">
              <StatTile label="Creativos" value={creatives.length} />
              <StatTile
                label="Score medio"
                value={avgScore}
                accent={avgScore >= 85}
              />
              <StatTile label="Favoritos" value={favorites.size} />
              <StatTile
                label="Formato top"
                value={
                  creatives.length
                    ? creatives[0]?.formatName?.split(" ")[0] ?? "—"
                    : "—"
                }
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar dentro de los creativos…"
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto">
                <Filter className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setFilterFormat("all")}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1 text-[11px] transition-all",
                    filterFormat === "all"
                      ? "border-primary/60 bg-primary/10 text-primary"
                      : "border-border/60 bg-card/30 text-muted-foreground hover:text-foreground"
                  )}
                >
                  Todos
                </button>
                {STATIC_FORMATS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilterFormat(f.id)}
                    className={cn(
                      "shrink-0 rounded-full border px-3 py-1 text-[11px] transition-all",
                      filterFormat === f.id
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-border/60 bg-card/30 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {f.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setShowFavOnly((v) => !v)}
                  className={cn(
                    "ml-2 flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-[11px] transition-all",
                    showFavOnly
                      ? "border-pink-400/40 bg-pink-400/10 text-pink-300"
                      : "border-border/60 bg-card/30 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Heart
                    className="h-3 w-3"
                    fill={showFavOnly ? "currentColor" : "none"}
                  />
                  Favoritos
                </button>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No hay creativos con esos filtros. Cambia el filtro o genera
                  más variantes.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence>
                  {filtered.map((c) => (
                    <CreativeCard
                      key={c.id}
                      creative={c}
                      favorite={favorites.has(c.id)}
                      onRegenerate={handleRegenerate}
                      onRemove={handleRemove}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="ghost" onClick={() => setStage("angle")}>
                <ArrowLeft className="h-4 w-4" />
                Ajustar ángulo
              </Button>
              <Button variant="neon" onClick={handleGenerateMore}>
                <Sparkles className="h-4 w-4" />
                Generar 6 más con este ángulo
              </Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <GenerationOverlay
        open={generating}
        title="Generando manada de creativos"
        subtitle={`Aplicando ${activeFormats.length} formatos · motor ${model?.name ?? ""}`}
        stages={GENERATION_STAGES}
        onComplete={handleGenerationComplete}
        resultBadge={`${batchSize} variantes`}
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
