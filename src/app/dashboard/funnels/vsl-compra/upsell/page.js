"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Copy,
  RefreshCcw,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { BriefContextPill } from "@/components/content/brief-context-pill";
import { GenerationOverlay } from "@/components/content/generation-overlay";
import { UPSELL_OFFERS, UPSELL_GENERATION_STAGES } from "@/lib/upsell-mock";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "pick", label: "Elige el upsell ganador" },
  { id: "preview", label: "Preview interactivo" },
];

function formatTimer(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${`0${m}`.slice(-2)}:${`0${s}`.slice(-2)}`;
}

export default function UpsellPage() {
  const [stage, setStage] = useState("pick");
  const [selectedId, setSelectedId] = useState(UPSELL_OFFERS[0].id);
  const [generating, setGenerating] = useState(false);
  const [decision, setDecision] = useState(null);
  const [copied, setCopied] = useState(false);

  const offer = useMemo(
    () => UPSELL_OFFERS.find((o) => o.id === selectedId),
    [selectedId]
  );

  const [timerLeft, setTimerLeft] = useState(offer?.timer ?? 600);

  useEffect(() => {
    setTimerLeft(offer?.timer ?? 600);
    setDecision(null);
  }, [offer?.id, offer?.timer]);

  useEffect(() => {
    if (stage !== "preview" || decision) return undefined;
    if (timerLeft <= 0) return undefined;
    const t = setInterval(() => {
      setTimerLeft((v) => Math.max(0, v - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [stage, decision, timerLeft]);

  function runGeneration() {
    setGenerating(true);
  }

  function handleGenerationComplete() {
    setTimeout(() => {
      setGenerating(false);
      setStage("preview");
    }, 400);
  }

  function handleReset() {
    setStage("pick");
    setDecision(null);
  }

  function handleCopyCopy() {
    if (!offer) return;
    const text = [
      `# ${offer.name}`,
      offer.summary,
      "",
      "Qué incluye:",
      ...offer.bullets.map((b) => `- ${b}`),
      "",
      `Precio: ${offer.price} (antes ${offer.oldPrice})`,
      `CTA: ${offer.cta}`,
    ].join("\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Funnels · VSL Compra · Upsell"
        title="Upsell post-compra de un clic"
        description="Después de que el cliente paga el programa, le presentamos una oferta complementaria de un solo clic. Probado en 14 funnels: +31% de AOV medio."
        badges={[
          { label: "Post-compra · 1 clic" },
          { label: "AOV +31% medio", variant: "success" },
          { label: offer ? `Take rate · ${offer.conversion}%` : "Take rate · —", variant: "violet" },
        ]}
        action={
          stage === "preview" && (
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCcw className="h-4 w-4" />
              Probar otro upsell
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
          const stepIndex = STEPS.findIndex((s) => s.id === stage);
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
        {stage === "pick" && (
          <motion.section
            key="pick"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div className="grid gap-3 md:grid-cols-3">
              {UPSELL_OFFERS.map((o, idx) => {
                const active = o.id === selectedId;
                return (
                  <motion.button
                    key={o.id}
                    type="button"
                    onClick={() => setSelectedId(o.id)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -3 }}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border p-5 text-left transition-all",
                      active
                        ? "border-primary/60 bg-primary/10 shadow-[0_0_28px_rgba(0,229,255,0.18)]"
                        : "border-border/60 bg-card/40 hover:border-primary/40"
                    )}
                  >
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant={o.badgeTone}>{o.badge}</Badge>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {o.framework}
                      </span>
                    </div>
                    <p className="mt-3 text-base font-semibold text-foreground">
                      {o.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {o.summary}
                    </p>

                    <div className="mt-4 flex items-end justify-between gap-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          Precio upsell
                        </p>
                        <p className="font-mono text-lg font-bold text-primary">
                          {o.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          Take rate
                        </p>
                        <p className="font-mono text-sm font-bold text-foreground">
                          {o.conversion}%
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              <StatTile label="Upsells activos" value={UPSELL_OFFERS.length} />
              <StatTile
                label="Take rate medio"
                value={`${Math.round(UPSELL_OFFERS.reduce((acc, o) => acc + o.conversion, 0) / UPSELL_OFFERS.length)}%`}
                accent
              />
              <StatTile
                label="AOV uplift medio"
                value={`+${Math.round(UPSELL_OFFERS.reduce((acc, o) => acc + o.avgRevenue, 0) / UPSELL_OFFERS.length)}€`}
              />
              <StatTile label="Refunds" value="1.2%" />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <Button variant="neon" onClick={runGeneration}>
                <Zap className="h-4 w-4" />
                Generar página de upsell
              </Button>
            </div>
          </motion.section>
        )}

        {stage === "preview" && offer && (
          <motion.section
            key="preview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
              {/* Preview de la pantalla upsell tal y como la ve el cliente */}
              <div className="overflow-hidden rounded-2xl border border-primary/30 bg-[#050816]">
                <div className="flex items-center gap-2 border-b border-primary/10 bg-[#0a1128] px-3 py-2">
                  <span className="flex gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                  </span>
                  <span className="ml-3 flex-1 rounded-md border border-primary/20 bg-[#050816] px-3 py-1 font-mono text-[10px] text-muted-foreground">
                    https://eneryia.net/upsell · 1/1
                  </span>
                  <Badge variant="neon">Upsell post-compra</Badge>
                </div>

                <div className="space-y-5 px-6 py-10 text-[#e6f1ff]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00ffd1]" />
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#00ffd1]">
                      Pago confirmado · pedido #ENR-{Math.floor(2000 + Math.random() * 7999)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#00e5ff]">
                      Espera · oferta única para este pedido
                    </p>
                    <h2 className="mt-2 text-3xl font-black leading-tight">
                      {offer.name}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-[#a0aec0]">
                      {offer.summary}
                    </p>
                  </div>

                  <ul className="grid gap-2 md:grid-cols-2">
                    {offer.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 rounded-lg border border-[#00e5ff22] bg-[#0a1128] p-3"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00e5ff]" />
                        <span className="text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#00e5ff33] bg-[#0a1128] p-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#a0aec0]">
                        {offer.discountLabel}
                      </p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-mono text-sm text-[#a0aec0] line-through">
                          {offer.oldPrice}
                        </span>
                        <span className="font-mono text-3xl font-black text-[#00e5ff]">
                          {offer.price}
                        </span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-sm",
                        timerLeft < 60
                          ? "border-[#ff3d71]/40 bg-[#ff3d71]/10 text-[#ff3d71]"
                          : "border-[#00e5ff33] bg-[#0a1128] text-[#00e5ff]"
                      )}
                    >
                      <Clock className="h-4 w-4" />
                      {formatTimer(timerLeft)}
                    </div>
                  </div>

                  <div className="grid gap-2 md:grid-cols-[1fr_auto]">
                    <button
                      type="button"
                      onClick={() => setDecision("accept")}
                      disabled={decision === "accept"}
                      className={cn(
                        "flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-bold transition-all",
                        decision === "accept"
                          ? "bg-[#00ffd1] text-[#050816]"
                          : "bg-[#00e5ff] text-[#050816] hover:brightness-110"
                      )}
                    >
                      {decision === "accept" ? (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          Añadido al pedido
                        </>
                      ) : (
                        <>
                          {offer.cta}
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDecision("decline")}
                      disabled={decision === "decline"}
                      className={cn(
                        "rounded-lg border px-4 py-3 text-xs font-semibold transition-all",
                        decision === "decline"
                          ? "border-muted-foreground bg-[#0a1128] text-muted-foreground"
                          : "border-[#0e1733] text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {offer.declineCta}
                    </button>
                  </div>

                  <AnimatePresence>
                    {decision && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-lg border border-[#00ffd133] bg-[#0a1410] p-3 text-sm text-[#00ffd1]"
                      >
                        {decision === "accept"
                          ? `Listo · cargamos ${offer.price} a tu método de pago. AOV de este pedido: +${offer.price}`
                          : "Pedido finalizado sin upsell · te enviamos los accesos al programa base por email."}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar con métricas + copy + controles */}
              <aside className="space-y-3">
                <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Performance histórica
                  </p>
                  <div className="mt-3 space-y-3">
                    <Metric label="Take rate" value={`${offer.conversion}%`} icon={TrendingUp} />
                    <Metric label="Revenue medio / pedido" value={`+${offer.avgRevenue}€`} icon={Sparkles} />
                    <Metric label="Timer scarcity" value={formatTimer(offer.timer)} icon={Clock} />
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Acciones
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopyCopy}>
                      <Copy className="h-4 w-4" />
                      {copied ? "Copiado" : "Copiar copy"}
                    </Button>
                    <Button variant="neon" size="sm" onClick={runGeneration}>
                      <Sparkles className="h-4 w-4" />
                      Regenerar variantes
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleReset}>
                      <ArrowLeft className="h-4 w-4" />
                      Cambiar upsell
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <GenerationOverlay
        open={generating}
        title="Generando página de upsell"
        subtitle={offer ? `Optimizando ${offer.name} con tu Brief` : "Optimizando con tu Brief"}
        stages={UPSELL_GENERATION_STAGES}
        onComplete={handleGenerationComplete}
        resultBadge="1 clic · post-pago"
      />
    </div>
  );
}

function Metric({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/30 p-2.5">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/40 bg-primary/10">
          <Icon className="h-3.5 w-3.5 text-primary" />
        </span>
        <p className="text-xs text-foreground/85">{label}</p>
      </div>
      <p className="font-mono text-sm font-bold text-foreground">{value}</p>
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
