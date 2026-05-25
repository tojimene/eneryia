"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Copy,
  Download,
  RefreshCcw,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { BriefContextPill } from "@/components/content/brief-context-pill";
import { GenerationOverlay } from "@/components/content/generation-overlay";
import { AngleEditor } from "@/components/ads/angle-editor";
import { LandingConfigForm } from "@/components/funnels/landing-config-form";
import { LandingTemplatePicker } from "@/components/funnels/landing-template-picker";
import { LandingPreview } from "@/components/funnels/landing-preview";
import { LandingSectionList } from "@/components/funnels/landing-section-list";
import {
  LANDING_GENERATION_STAGES,
  getTemplateById,
  getTemplatesByMode,
} from "@/lib/landing-templates";
import {
  buildLanding,
  landingToMarkdown,
  regenerateSection,
} from "@/lib/landing-mock";
import { useBrief } from "@/context/brief-context";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "angle", label: "Ángulo y oferta" },
  { id: "template", label: "Plantilla ganadora" },
  { id: "preview", label: "Preview y copy listo" },
];

function toText(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join("\n");
  if (typeof value === "string") return value;
  return "";
}

function toLines(value) {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string") {
    return value.split(/\n|·|-/).map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

export function LandingWizard({
  mode,
  eyebrow,
  title,
  description,
  badge,
  defaultAngle,
  defaultConfig,
  defaultTemplateId,
}) {
  const { answers } = useBrief();

  const templatesForMode = useMemo(() => getTemplatesByMode(mode), [mode]);
  const initialTemplateId =
    defaultTemplateId && templatesForMode.some((t) => t.id === defaultTemplateId)
      ? defaultTemplateId
      : templatesForMode[0]?.id;

  const [stage, setStage] = useState("angle");
  const [angle, setAngle] = useState(defaultAngle);
  const [config, setConfig] = useState(defaultConfig);
  const [templateId, setTemplateId] = useState(initialTemplateId);
  const [generating, setGenerating] = useState(false);
  const [landing, setLanding] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const stepIndex = STEPS.findIndex((s) => s.id === stage);
  const template = getTemplateById(templateId);
  const isOptin = mode.startsWith("optin");

  function handleAutoFillFromBrief() {
    const hookSeed =
      toText(answers.coreProblem) || defaultAngle.hook;
    const benefitsSeed = toLines(answers.uniqueMechanism).slice(0, 3);
    setAngle({
      hook: hookSeed.slice(0, 140),
      benefits:
        benefitsSeed.length >= 2 ? benefitsSeed : defaultAngle.benefits,
      qualifier: toText(answers.target) || defaultAngle.qualifier,
      cta: defaultAngle.cta,
    });
  }

  function runGeneration() {
    setGenerating(true);
    setStage("template");
    setTimeout(() => {
      const built = buildLanding({
        templateId,
        config,
        angle,
        brief: { target: answers.target, coreProblem: answers.coreProblem },
        mode,
      });
      setLanding(built);
      setActiveSectionId(built?.sections?.[0]?.content?.id ?? null);
    }, 100);
  }

  function handleGenerationComplete() {
    setTimeout(() => {
      setGenerating(false);
      setStage("preview");
    }, 400);
  }

  function handleRegenerateSection(sectionId) {
    setLanding((prev) =>
      regenerateSection(
        prev,
        sectionId,
        { target: answers.target, coreProblem: answers.coreProblem },
        angle
      )
    );
  }

  function handleReset() {
    setStage("angle");
    setLanding(null);
    setActiveSectionId(null);
  }

  function handleCopyMarkdown() {
    if (!landing) return;
    const md = landingToMarkdown(landing);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(md);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownloadMarkdown() {
    if (!landing || typeof window === "undefined") return;
    const md = landingToMarkdown(landing);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `landing-${landing.templateId}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const angleValid =
    (angle.hook || "").trim().length > 0 &&
    (angle.benefits || []).some((b) => b.trim().length > 0) &&
    (angle.qualifier || "").trim().length > 0 &&
    (angle.cta || "").trim().length > 0;

  const configValid = isOptin
    ? (config.leadMagnetName || "").trim().length > 0
    : (config.offerName || "").trim().length > 0 &&
      (config.price || "").trim().length > 0;

  const markdown = useMemo(
    () => (landing ? landingToMarkdown(landing) : ""),
    [landing]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        badges={[
          { label: badge },
          { label: "Pre-relleno desde Brief", variant: "violet" },
          {
            label: template ? `Plantilla · ${template.name}` : "Plantilla · IA",
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
            className="space-y-5"
          >
            <AngleEditor
              angle={angle}
              onChange={setAngle}
              onAutoFill={handleAutoFillFromBrief}
              briefReady
            />

            <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {isOptin ? "Lead magnet y captación" : "Oferta y precios"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {isOptin
                      ? "Lo que reciben al dejar el email."
                      : "Lo que se imprime en el value stack y en la sección de oferta."}
                  </p>
                </div>
              </div>
              <LandingConfigForm
                config={config}
                onChange={setConfig}
                mode={mode}
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <Button
                variant="neon"
                onClick={() => setStage("template")}
                disabled={!angleValid || !configValid}
              >
                Siguiente · elegir plantilla
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.section>
        )}

        {stage === "template" && (
          <motion.section
            key="template"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                    <Wand2 className="h-4 w-4 text-primary" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Plantillas ganadoras
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {templatesForMode.length} plantillas validadas para este preset.
                    </p>
                  </div>
                </div>
                <Badge variant="violet">
                  {template?.sections?.length ?? 0} bloques
                </Badge>
              </div>

              <LandingTemplatePicker
                value={templateId}
                onSelect={setTemplateId}
                templates={templatesForMode}
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="ghost" onClick={() => setStage("angle")}>
                <ArrowLeft className="h-4 w-4" />
                Volver al ángulo
              </Button>
              <Button variant="neon" onClick={runGeneration}>
                <Zap className="h-4 w-4" />
                Generar landing completa
              </Button>
            </div>
          </motion.section>
        )}

        {stage === "preview" && landing && (
          <motion.section
            key="preview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div className="grid gap-3 md:grid-cols-4">
              <StatTile label="Bloques" value={landing.sections.length} />
              <StatTile label="Plantilla" value={landing.template.name} />
              <StatTile
                label="Win-rate"
                value={`${landing.template.winRate}%`}
                accent
              />
              <StatTile
                label={isOptin ? "Lead magnet" : "Precio"}
                value={
                  isOptin
                    ? landing.config.leadMagnetName.split("·")[0].trim()
                    : landing.config.price
                }
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card/40 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono">{landing.id}</span>
                <span className="hidden lg:inline">·</span>
                <span className="hidden lg:inline">
                  Cada bloque es regenerable y editable
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMarkdown((v) => !v)}
                >
                  <Code2 className="h-4 w-4" />
                  {showMarkdown ? "Ver preview" : "Ver Markdown"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyMarkdown}
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Copiado" : "Copiar copy"}
                </Button>
                <Button variant="neon" size="sm" onClick={handleDownloadMarkdown}>
                  <Download className="h-4 w-4" />
                  Descargar .md
                </Button>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
              <aside className="space-y-3">
                <div className="rounded-2xl border border-border/60 bg-card/40 p-3">
                  <p className="mb-2 px-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Secciones · {landing.sections.length}
                  </p>
                  <LandingSectionList
                    sections={landing.sections}
                    activeId={activeSectionId}
                    onSelect={setActiveSectionId}
                    onRegenerate={handleRegenerateSection}
                  />
                </div>
              </aside>

              <div>
                {showMarkdown ? (
                  <pre className="max-h-[640px] overflow-auto rounded-2xl border border-border/60 bg-card/40 p-4 font-mono text-xs leading-relaxed text-foreground/85">
                    {markdown}
                  </pre>
                ) : (
                  <LandingPreview
                    landing={landing}
                    onSelectSection={setActiveSectionId}
                    activeSectionId={activeSectionId}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="ghost" onClick={() => setStage("template")}>
                <ArrowLeft className="h-4 w-4" />
                Cambiar plantilla
              </Button>
              <Button variant="neon" onClick={runGeneration}>
                <Sparkles className="h-4 w-4" />
                Regenerar la landing entera
              </Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <GenerationOverlay
        open={generating}
        title="Generando landing"
        subtitle={`Plantilla ${template?.name ?? ""} · brief inyectado`}
        stages={LANDING_GENERATION_STAGES}
        onComplete={handleGenerationComplete}
        resultBadge={`${template?.sections?.length ?? 0} bloques`}
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
      <p className="mt-1 truncate text-xl font-semibold text-foreground">
        {value}
      </p>
    </div>
  );
}
