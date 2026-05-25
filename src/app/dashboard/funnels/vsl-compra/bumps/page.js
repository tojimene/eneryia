"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  Lock,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { BriefContextPill } from "@/components/content/brief-context-pill";
import { BUMP_OFFERS } from "@/lib/bumps-mock";
import { cn } from "@/lib/utils";

const BASE_PRODUCT = {
  name: "Programa Eneryia Loop",
  description: "Acceso completo al sistema · 30 días de implementación",
  price: 2997,
};

function eur(n) {
  return n.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function BumpsPage() {
  const [enabledIds, setEnabledIds] = useState(BUMP_OFFERS.map((b) => b.id));
  const [activeIds, setActiveIds] = useState(new Set());

  const enabledBumps = useMemo(
    () => BUMP_OFFERS.filter((b) => enabledIds.includes(b.id)),
    [enabledIds]
  );

  function toggleEnabled(id) {
    setEnabledIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setActiveIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function toggleBump(id) {
    setActiveIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearCart() {
    setActiveIds(new Set());
  }

  const bumpsTotal = Array.from(activeIds).reduce((acc, id) => {
    const b = BUMP_OFFERS.find((x) => x.id === id);
    return acc + (b?.price ?? 0);
  }, 0);
  const grandTotal = BASE_PRODUCT.price + bumpsTotal;
  const aovUplift = BASE_PRODUCT.price
    ? Math.round((bumpsTotal / BASE_PRODUCT.price) * 100)
    : 0;

  const avgTakeRate = enabledBumps.length
    ? Math.round(
        enabledBumps.reduce((acc, b) => acc + b.takeRate, 0) /
          enabledBumps.length
      )
    : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Funnels · VSL Compra · Order Bumps"
        title="Order bumps dentro del checkout"
        description="Microofertas que aparecen como checkbox justo antes de pagar. Sumá ticket sin fricción: el cliente solo marca la casilla."
        badges={[
          { label: "Order bumps · checkout" },
          { label: "AOV +18% medio", variant: "success" },
          { label: `Bumps activos · ${enabledBumps.length}`, variant: "violet" },
        ]}
      />

      <BriefContextPill />

      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Bumps activos" value={enabledBumps.length} />
        <StatTile label="Take rate medio" value={`${avgTakeRate}%`} accent />
        <StatTile label="AOV uplift" value={`+${aovUplift}%`} />
        <StatTile label="Refunds" value="0.8%" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_400px]">
        {/* Checkout simulado */}
        <div className="overflow-hidden rounded-2xl border border-primary/30 bg-[#050816]">
          <div className="flex items-center gap-2 border-b border-primary/10 bg-[#0a1128] px-3 py-2">
            <span className="flex gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </span>
            <span className="ml-3 flex-1 rounded-md border border-primary/20 bg-[#050816] px-3 py-1 font-mono text-[10px] text-muted-foreground">
              https://eneryia.net/checkout · paso 3/3
            </span>
            <Badge variant="neon">Checkout</Badge>
          </div>

          <div className="grid gap-6 px-6 py-8 text-[#e6f1ff] md:grid-cols-2">
            {/* Resumen del pedido */}
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#a0aec0]">
                  Tu pedido
                </p>
                <p className="mt-1 text-lg font-bold">
                  {BASE_PRODUCT.name}
                </p>
                <p className="text-xs text-[#a0aec0]">
                  {BASE_PRODUCT.description}
                </p>
              </div>

              <div className="space-y-2">
                {enabledBumps.map((bump) => {
                  const active = activeIds.has(bump.id);
                  return (
                    <label
                      key={bump.id}
                      className={cn(
                        "block cursor-pointer rounded-xl border-2 border-dashed p-3 transition-all",
                        active
                          ? "border-[#00e5ff] bg-[#00e5ff10]"
                          : "border-[#00e5ff44] bg-[#0a1128] hover:border-[#00e5ff77]"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggleBump(bump.id)}
                          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#00e5ff]"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-bold text-[#00e5ff]">
                              ¡SÍ! Añadir {bump.name} por solo {eur(bump.price)}
                            </p>
                            <span className="shrink-0 rounded-full bg-[#00e5ff] px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-[#050816]">
                              {bump.badge}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#a0aec0]">
                            {bump.summary}
                          </p>
                          <ul className="mt-2 space-y-1">
                            {bump.bullets.slice(0, 2).map((b, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-1.5 text-[11px] text-[#a0aec0]"
                              >
                                <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-[#00ffd1]" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </label>
                  );
                })}
                {enabledBumps.length === 0 && (
                  <div className="rounded-xl border border-dashed border-[#0e1733] bg-[#0a1128] p-4 text-center text-xs text-muted-foreground">
                    Activa bumps en el panel de la derecha para verlos aquí.
                  </div>
                )}
              </div>
            </div>

            {/* Pago y total */}
            <div className="space-y-4">
              <div className="rounded-xl border border-[#00e5ff33] bg-[#0a1128] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#a0aec0]">
                  Datos de pago
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 rounded-md border border-[#00e5ff22] bg-[#050816] px-3 py-2 text-xs">
                    <CreditCard className="h-3.5 w-3.5 text-[#00e5ff]" />
                    <span className="font-mono">**** 4242</span>
                    <span className="ml-auto text-[#a0aec0]">12/28</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#a0aec0]">
                    <Lock className="h-3 w-3" />
                    Pago seguro · cifrado SSL · Stripe
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#00e5ff33] bg-[#0a1128] p-4">
                <Row label={BASE_PRODUCT.name} value={eur(BASE_PRODUCT.price)} />
                {Array.from(activeIds).map((id) => {
                  const b = BUMP_OFFERS.find((x) => x.id === id);
                  if (!b) return null;
                  return <Row key={id} label={b.name} value={eur(b.price)} accent />;
                })}
                <div className="my-2 border-t border-[#00e5ff22]" />
                <Row label="Total" value={eur(grandTotal)} large />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00e5ff] px-6 py-4 text-base font-bold text-[#050816] transition-all hover:brightness-110"
              >
                Pagar {eur(grandTotal)}
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="text-center text-[10px] text-muted-foreground">
                30 días de garantía · cancelación con un clic
              </p>
            </div>
          </div>
        </div>

        {/* Panel de control de bumps */}
        <aside className="space-y-3">
          <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Catálogo de bumps
              </p>
              {activeIds.size > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-[11px]"
                  onClick={clearCart}
                >
                  <Trash2 className="h-3 w-3" />
                  Vaciar
                </Button>
              )}
            </div>

            <div className="mt-3 space-y-2">
              {BUMP_OFFERS.map((bump) => {
                const enabled = enabledIds.includes(bump.id);
                return (
                  <motion.div
                    key={bump.id}
                    layout
                    className={cn(
                      "rounded-xl border p-3 transition-all",
                      enabled
                        ? "border-primary/40 bg-primary/5"
                        : "border-border/60 bg-card/30 opacity-60"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">
                            {bump.name}
                          </p>
                          <Badge variant={bump.badgeTone}>{bump.badge}</Badge>
                        </div>
                        <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                          {bump.summary}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                          <span>
                            Take rate ·{" "}
                            <span className="font-mono text-foreground">
                              {bump.takeRate}%
                            </span>
                          </span>
                          <span>
                            Precio ·{" "}
                            <span className="font-mono text-primary">
                              {eur(bump.price)}
                            </span>
                          </span>
                        </div>
                      </div>
                      <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={() => toggleEnabled(bump.id)}
                          className="peer sr-only"
                        />
                        <div className="h-5 w-9 rounded-full bg-card/60 transition-colors peer-checked:bg-primary/40" />
                        <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-muted-foreground transition-transform peer-checked:translate-x-4 peer-checked:bg-primary" />
                      </label>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Estado del carrito
            </p>
            <div className="mt-3 space-y-2 text-xs text-foreground/85">
              <div className="flex items-center justify-between">
                <span>Producto base</span>
                <span className="font-mono">{eur(BASE_PRODUCT.price)}</span>
              </div>
              <div className="flex items-center justify-between text-primary">
                <span>Bumps añadidos · {activeIds.size}</span>
                <span className="font-mono">+{eur(bumpsTotal)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border/60 pt-2 text-base font-bold text-foreground">
                <span>Total</span>
                <span className="font-mono">{eur(grandTotal)}</span>
              </div>
              <p className="pt-1 text-[10px] text-muted-foreground">
                AOV uplift de este pedido: +{aovUplift}%
              </p>
            </div>
          </div>

          <Button variant="neon" size="sm" className="w-full">
            <Wand2 className="h-4 w-4" />
            Sugerir bumps con IA
            <Sparkles className="h-3.5 w-3.5" />
          </Button>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, accent, large }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className={cn("text-foreground/85", accent && "text-[#00e5ff]")}>
        {label}
      </span>
      <span
        className={cn(
          "font-mono",
          large && "text-lg font-bold text-[#00e5ff]",
          !large && accent && "text-[#00e5ff]",
          !large && !accent && "text-foreground/85"
        )}
      >
        {value}
      </span>
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
