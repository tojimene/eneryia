"use client";

// Renderiza una composición visual diferente por layout.
// El "ratio" controla el aspect ratio; el copy viene del ángulo.

import { ArrowRight, Quote, TrendingUp, Sparkles } from "lucide-react";

import { ASPECT_RATIOS } from "@/lib/ads-frameworks";

function getRatio(ratioId) {
  return ASPECT_RATIOS.find((r) => r.id === ratioId) || ASPECT_RATIOS[0];
}

export function CreativeCanvas({ creative }) {
  const ratio = getRatio(creative.ratio);
  const aspect = `${ratio.w} / ${ratio.h}`;
  const palette = creative.palette;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border"
      style={{
        aspectRatio: aspect,
        background: palette.base,
        borderColor: `${palette.accent}33`,
      }}
    >
      {/* Glow ambiente */}
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: palette.accent }}
      />
      <div
        className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
        style={{ background: palette.accent }}
      />

      {creative.layout === "split" && <SplitLayout c={creative} />}
      {creative.layout === "magazine" && <MagazineLayout c={creative} />}
      {creative.layout === "quote" && <QuoteLayout c={creative} />}
      {creative.layout === "stat" && <StatLayout c={creative} />}
      {creative.layout === "compare" && <CompareLayout c={creative} />}
      {creative.layout === "minimal" && <MinimalLayout c={creative} />}
    </div>
  );
}

function Logo({ palette }) {
  return (
    <div
      className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.3em]"
      style={{ color: palette.contrast }}
    >
      <span
        className="flex h-3.5 w-3.5 items-center justify-center rounded-sm"
        style={{ background: palette.accent }}
      >
        <Sparkles className="h-2 w-2" style={{ color: palette.base }} />
      </span>
      Eneryia
    </div>
  );
}

function CtaPill({ text, palette }) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[8px] font-bold uppercase tracking-widest"
      style={{
        background: palette.accent,
        color: palette.base,
      }}
    >
      {text}
      <ArrowRight className="h-2.5 w-2.5" />
    </div>
  );
}

function Qualifier({ text, palette }) {
  return (
    <div
      className="inline-block rounded-full border px-2 py-0.5 text-[8px] uppercase tracking-widest"
      style={{
        borderColor: `${palette.accent}66`,
        color: palette.accent,
      }}
    >
      {text}
    </div>
  );
}

/* ---------- Split Bold ---------- */
function SplitLayout({ c }) {
  return (
    <div className="absolute inset-0 flex">
      <div
        className="flex flex-1 flex-col justify-between p-4"
        style={{ background: c.palette.surface }}
      >
        <Logo palette={c.palette} />
        <div>
          <Qualifier text={c.qualifier} palette={c.palette} />
          <h3
            className="mt-2 text-lg font-black leading-tight"
            style={{ color: c.palette.contrast }}
          >
            {c.hook}
          </h3>
        </div>
        <CtaPill text={c.cta} palette={c.palette} />
      </div>
      <div
        className="flex w-2/5 flex-col justify-between border-l p-4"
        style={{
          borderColor: `${c.palette.accent}33`,
          background: c.palette.base,
        }}
      >
        <div>
          <p
            className="text-[8px] uppercase tracking-[0.3em]"
            style={{ color: c.palette.accent }}
          >
            Prueba real
          </p>
          <p
            className="mt-1 text-[10px] font-semibold leading-snug"
            style={{ color: c.palette.contrast }}
          >
            {c.trust}
          </p>
        </div>
        <ul className="space-y-1.5">
          {c.benefits.slice(0, 3).map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-1.5 text-[9px] leading-tight"
              style={{ color: c.palette.contrast }}
            >
              <span
                className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-sm"
                style={{ background: c.palette.accent }}
              />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Magazine Headline ---------- */
function MagazineLayout({ c }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-5">
      <div className="flex items-center justify-between">
        <Logo palette={c.palette} />
        <p
          className="font-mono text-[8px] uppercase tracking-[0.3em]"
          style={{ color: c.palette.accent }}
        >
          ISSUE · 01
        </p>
      </div>
      <div>
        <div
          className="mb-2 h-px w-full"
          style={{ background: `${c.palette.accent}66` }}
        />
        <h2
          className="text-3xl font-black leading-[0.95]"
          style={{ color: c.palette.contrast }}
        >
          {c.hook}
        </h2>
        <div
          className="mt-3 h-px w-1/3"
          style={{ background: c.palette.accent }}
        />
      </div>
      <div className="flex items-end justify-between gap-3">
        <Qualifier text={c.qualifier} palette={c.palette} />
        <CtaPill text={c.cta} palette={c.palette} />
      </div>
    </div>
  );
}

/* ---------- Testimonial Quote ---------- */
function QuoteLayout({ c }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-5">
      <div className="flex items-center justify-between">
        <Logo palette={c.palette} />
        <Quote
          className="h-5 w-5"
          style={{ color: c.palette.accent }}
        />
      </div>
      <div>
        <p
          className="text-[11px] leading-tight"
          style={{ color: c.palette.accent }}
        >
          “
        </p>
        <p
          className="text-base font-bold leading-snug"
          style={{ color: c.palette.contrast }}
        >
          {c.hook}
        </p>
        <p
          className="mt-3 text-[9px] font-semibold uppercase tracking-widest"
          style={{ color: c.palette.accent }}
        >
          — {c.trust}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Qualifier text={c.qualifier} palette={c.palette} />
        <CtaPill text={c.cta} palette={c.palette} />
      </div>
    </div>
  );
}

/* ---------- Stat Drop ---------- */
function StatLayout({ c }) {
  // Extrae primer número del hook o usa fallback
  const match = (c.hook || "").match(/\d+[\.,]?\d*[%KMx]?/);
  const stat = match ? match[0] : "102K";
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-5">
      <div className="flex items-center justify-between">
        <Logo palette={c.palette} />
        <TrendingUp className="h-4 w-4" style={{ color: c.palette.accent }} />
      </div>
      <div>
        <p
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: c.palette.accent }}
        >
          El número que importa
        </p>
        <p
          className="mt-1 text-6xl font-black leading-none"
          style={{ color: c.palette.contrast }}
        >
          {stat}
        </p>
        <p
          className="mt-3 max-w-[90%] text-xs font-semibold leading-snug"
          style={{ color: c.palette.contrast }}
        >
          {c.hook}
        </p>
      </div>
      <div className="flex items-end justify-between gap-3">
        <Qualifier text={c.qualifier} palette={c.palette} />
        <CtaPill text={c.cta} palette={c.palette} />
      </div>
    </div>
  );
}

/* ---------- Before / After ---------- */
function CompareLayout({ c }) {
  return (
    <div className="absolute inset-0 flex flex-col p-4">
      <div className="flex items-center justify-between">
        <Logo palette={c.palette} />
        <CtaPill text={c.cta} palette={c.palette} />
      </div>
      <div className="my-3 grid flex-1 grid-cols-2 gap-2">
        <div
          className="flex flex-col justify-between rounded-lg p-3"
          style={{
            background: `${c.palette.base}`,
            border: `1px solid ${c.palette.accent}22`,
          }}
        >
          <p
            className="text-[8px] font-bold uppercase tracking-[0.3em]"
            style={{ color: `${c.palette.contrast}80` }}
          >
            Antes
          </p>
          <ul className="space-y-1">
            <li className="text-[9px]" style={{ color: `${c.palette.contrast}99` }}>
              · Manada de creativos al azar
            </li>
            <li className="text-[9px]" style={{ color: `${c.palette.contrast}99` }}>
              · Bot que no para a tiempo
            </li>
            <li className="text-[9px]" style={{ color: `${c.palette.contrast}99` }}>
              · ROAS sin patrón claro
            </li>
          </ul>
        </div>
        <div
          className="flex flex-col justify-between rounded-lg p-3"
          style={{
            background: c.palette.accent,
            color: c.palette.base,
          }}
        >
          <p className="text-[8px] font-bold uppercase tracking-[0.3em]">
            Con Eneryia
          </p>
          <ul className="space-y-1">
            {c.benefits.slice(0, 3).map((b, i) => (
              <li key={i} className="text-[9px] font-medium">
                · {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p
          className="text-[11px] font-bold leading-tight"
          style={{ color: c.palette.contrast }}
        >
          {c.hook}
        </p>
      </div>
    </div>
  );
}

/* ---------- Minimal Promise ---------- */
function MinimalLayout({ c }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center">
      <Logo palette={c.palette} />
      <div className="space-y-3">
        <div
          className="mx-auto h-px w-12"
          style={{ background: c.palette.accent }}
        />
        <p
          className="text-xl font-black leading-tight"
          style={{ color: c.palette.contrast }}
        >
          {c.hook}
        </p>
        <p
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: c.palette.accent }}
        >
          {c.qualifier}
        </p>
      </div>
      <CtaPill text={c.cta} palette={c.palette} />
    </div>
  );
}
