"use client";

import { motion } from "framer-motion";
import { Target, Sparkles, Crosshair, Megaphone, Wand2, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const HOOK_MAX = 140;

const CHECKPOINTS = [
  {
    id: "hook",
    label: "Hook · ángulo (140c)",
    description: "La promesa nuclear. Debe parar el scroll y prometer un cambio claro.",
    icon: Target,
    type: "hook",
  },
  {
    id: "benefits",
    label: "Beneficios fundamentales",
    description: "3 a 5 beneficios concretos y medibles. Uno por línea.",
    icon: Sparkles,
    type: "list",
  },
  {
    id: "qualifier",
    label: "Calificador",
    description: "¿A quién va dirigido? Filtra y atrae solo al ICP correcto.",
    icon: Crosshair,
    type: "line",
  },
  {
    id: "cta",
    label: "Call to action",
    description: "Acción única, sin fricciones. Verbo + beneficio + lugar.",
    icon: Megaphone,
    type: "line",
  },
];

export function AngleEditor({ angle, onChange, onAutoFill, briefReady }) {
  function patch(partial) {
    onChange({ ...angle, ...partial });
  }

  function addBenefit() {
    patch({ benefits: [...(angle.benefits || []), ""] });
  }

  function updateBenefit(idx, value) {
    const next = [...(angle.benefits || [])];
    next[idx] = value;
    patch({ benefits: next });
  }

  function removeBenefit(idx) {
    const next = (angle.benefits || []).filter((_, i) => i !== idx);
    patch({ benefits: next });
  }

  const hookLen = (angle.hook || "").length;
  const hookOver = hookLen > HOOK_MAX;
  const hookNear = hookLen > HOOK_MAX - 20;

  const filled =
    (angle.hook || "").trim().length > 0 &&
    (angle.benefits || []).some((b) => b.trim().length > 0) &&
    (angle.qualifier || "").trim().length > 0 &&
    (angle.cta || "").trim().length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card/40 p-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-primary/80">
            Ángulo de ataque
          </p>
          <h3 className="text-base font-semibold text-foreground">
            4 checkpoints · materia prima del creativo
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Estos 4 campos viajan a cada uno de los 6 formatos ganadores.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {filled && <Badge variant="success">Ángulo listo</Badge>}
          <Button
            variant="neon"
            size="sm"
            type="button"
            onClick={onAutoFill}
            disabled={!briefReady}
          >
            <Wand2 className="h-3.5 w-3.5" />
            Pre-fill desde Brief
          </Button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {CHECKPOINTS.map((cp, idx) => {
          const Icon = cp.icon;
          return (
            <motion.div
              key={cp.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-4 lg:p-5"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {cp.label}
                    </p>
                    {cp.type === "hook" && (
                      <span
                        className={cn(
                          "font-mono text-[11px]",
                          hookOver
                            ? "text-destructive"
                            : hookNear
                              ? "text-amber-400"
                              : "text-muted-foreground"
                        )}
                      >
                        {hookLen}/{HOOK_MAX}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{cp.description}</p>

                  {cp.type === "hook" && (
                    <div className="space-y-1.5">
                      <Textarea
                        value={angle.hook || ""}
                        onChange={(e) => patch({ hook: e.target.value })}
                        placeholder="Ej: Tu agenda no es predecible. Tu sistema sí puede serlo."
                        rows={3}
                        maxLength={HOOK_MAX + 40}
                        className={cn(
                          "resize-none",
                          hookOver && "border-destructive/60 focus-visible:ring-destructive/40"
                        )}
                      />
                      <div className="h-1 w-full overflow-hidden rounded-full bg-card/60">
                        <motion.div
                          className={cn(
                            "h-full rounded-full",
                            hookOver
                              ? "bg-destructive"
                              : hookNear
                                ? "bg-amber-400"
                                : "bg-primary"
                          )}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(100, (hookLen / HOOK_MAX) * 100)}%`,
                          }}
                          transition={{ type: "spring", stiffness: 180, damping: 22 }}
                        />
                      </div>
                    </div>
                  )}

                  {cp.type === "line" && (
                    <Input
                      value={angle[cp.id] || ""}
                      onChange={(e) => patch({ [cp.id]: e.target.value })}
                      placeholder={
                        cp.id === "qualifier"
                          ? "Fundadores B2B de +5K/mes con ticket de +3.000€"
                          : "Reserva tu plaza · Eneryia.net"
                      }
                    />
                  )}

                  {cp.type === "list" && (
                    <div className="space-y-2">
                      {(angle.benefits || []).map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {`0${bIdx + 1}`.slice(-2)}
                          </span>
                          <Input
                            value={b}
                            onChange={(e) => updateBenefit(bIdx, e.target.value)}
                            placeholder="Ej: 30 días para ver el primer cierre"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            onClick={() => removeBenefit(bIdx)}
                            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={addBenefit}
                        className="w-full justify-center"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Añadir beneficio
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
