"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2, X, Building2, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TextareaInput({ value, onChange, placeholder, rows = 4 }) {
  return (
    <Textarea
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  );
}

export function ListInput({ value, onChange, placeholder, min = 1 }) {
  const items = Array.isArray(value) && value.length ? value : [""];

  function updateItem(index, next) {
    const copy = [...items];
    copy[index] = next;
    onChange(copy);
  }

  function addItem() {
    onChange([...items, ""]);
  }

  function removeItem(index) {
    if (items.length <= 1) {
      onChange([""]);
      return;
    }
    onChange(items.filter((_, idx) => idx !== index));
  }

  const validCount = items.filter((item) => item.trim().length > 0).length;

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2"
          >
            <span className="mt-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/60 bg-card/40 font-mono text-[10px] text-muted-foreground">
              {`0${index + 1}`.slice(-2)}
            </span>
            <Textarea
              value={item}
              onChange={(event) => updateItem(index, event.target.value)}
              placeholder={placeholder}
              rows={2}
              className="min-h-[60px] flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              className="shrink-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
          className="border-dashed"
        >
          <Plus className="h-3.5 w-3.5" />
          Añadir otro
        </Button>
        <Badge variant={validCount >= min ? "success" : "outline"}>
          {validCount} / mínimo {min}
        </Badge>
      </div>
    </div>
  );
}

export function CompetitorsInput({ value, onChange, min = 3 }) {
  const items =
    Array.isArray(value) && value.length ? value : [{ name: "", reason: "" }];

  function update(index, key, next) {
    const copy = items.map((item, idx) =>
      idx === index ? { ...item, [key]: next } : item
    );
    onChange(copy);
  }

  function add() {
    onChange([...items, { name: "", reason: "" }]);
  }

  function remove(index) {
    if (items.length <= 1) {
      onChange([{ name: "", reason: "" }]);
      return;
    }
    onChange(items.filter((_, idx) => idx !== index));
  }

  const validCount = items.filter((item) => item.name?.trim()).length;

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-border/60 bg-card/40 p-3"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                Competidor {`0${index + 1}`.slice(-2)}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="grid gap-2 lg:grid-cols-[1fr_2fr]">
              <Input
                value={item.name ?? ""}
                onChange={(event) => update(index, "name", event.target.value)}
                placeholder="Nombre o URL · ej. flows.es"
              />
              <Input
                value={item.reason ?? ""}
                onChange={(event) => update(index, "reason", event.target.value)}
                placeholder="¿Por qué destaca? · ej. branding premium + metodología"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={add}
          className="border-dashed"
        >
          <Plus className="h-3.5 w-3.5" />
          Añadir competidor
        </Button>
        <Badge variant={validCount >= min ? "success" : "outline"}>
          {validCount} / mínimo {min}
        </Badge>
      </div>
    </div>
  );
}

export function ChipsInput({ value, onChange, suggestions = [], max }) {
  const items = Array.isArray(value) ? value : [];
  const [draft, setDraft] = useState("");

  function add(chip) {
    const clean = chip.trim();
    if (!clean) return;
    if (items.includes(clean)) return;
    if (max && items.length >= max) return;
    onChange([...items, clean]);
    setDraft("");
  }

  function remove(chip) {
    onChange(items.filter((item) => item !== chip));
  }

  const remaining = suggestions.filter((suggestion) => !items.includes(suggestion));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {items.map((chip) => (
            <motion.button
              key={chip}
              type="button"
              onClick={() => remove(chip)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="group inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary"
            >
              {chip}
              <X className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
            </motion.button>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Elige entre las sugerencias o escribe libremente.
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add(draft);
            }
          }}
          placeholder={max ? `Hasta ${max} canales…` : "Escribe y pulsa Enter"}
        />
        <Button type="button" size="sm" onClick={() => add(draft)}>
          <Plus className="h-3.5 w-3.5" />
          Añadir
        </Button>
      </div>

      {remaining.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {remaining.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => add(suggestion)}
              className="rounded-full border border-border/70 bg-card/40 px-3 py-1 text-xs text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
              disabled={Boolean(max && items.length >= max)}
            >
              + {suggestion}
            </button>
          ))}
        </div>
      )}

      {max && (
        <p className="text-[11px] text-muted-foreground">
          {items.length} / {max} seleccionados
        </p>
      )}
    </div>
  );
}

export function ScaleInput({ value, onChange, labels }) {
  const current = typeof value === "number" ? value : 0;

  return (
    <div className="space-y-3">
      <div className="grid gap-2 lg:grid-cols-5">
        {labels.map((label, idx) => {
          const level = idx + 1;
          const isActive = level === current;
          return (
            <motion.button
              key={label}
              type="button"
              onClick={() => onChange(level)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-colors",
                isActive
                  ? "border-primary/60 bg-primary/10 shadow-[0_0_18px_rgba(0,229,255,0.25)]"
                  : "border-border/60 bg-card/40 hover:border-primary/30"
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-mono uppercase tracking-widest",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                Stage {level}
              </span>
              <span
                className={cn(
                  "text-sm font-medium leading-snug",
                  isActive ? "text-primary" : "text-foreground/90"
                )}
              >
                {label.replace(/^\d+\s·\s/, "")}
              </span>
            </motion.button>
          );
        })}
      </div>
      {current > 0 && (
        <div className="flex items-start gap-2 rounded-md border border-primary/20 bg-primary/5 p-2 text-xs text-foreground/85">
          <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          <span>
            Mercado <span className="font-semibold text-primary">Stage {current}</span>:
            ajustaremos el mecanismo y los hooks en consecuencia.
          </span>
        </div>
      )}
    </div>
  );
}
