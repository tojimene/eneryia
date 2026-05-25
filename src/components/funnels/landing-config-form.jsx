"use client";

import { motion } from "framer-motion";
import { Tag, Euro, ShieldCheck, Clock, Gift, CalendarClock } from "lucide-react";

import { Input } from "@/components/ui/input";

const FIELDS_BY_MODE = {
  compra: [
    { id: "offerName", label: "Nombre del programa / oferta", icon: Tag, placeholder: "Programa Eneryia Loop" },
    { id: "price", label: "Precio principal", icon: Euro, placeholder: "2.997€" },
    { id: "oldPrice", label: "Precio anterior · tachado", icon: Euro, placeholder: "6.997€" },
    { id: "guaranteeDays", label: "Días de garantía", icon: ShieldCheck, placeholder: "30", type: "number" },
    { id: "deadline", label: "Texto de urgencia / cierre", icon: Clock, placeholder: "Plazas abiertas hasta el viernes", fullWidth: true },
  ],
  optin: [
    { id: "leadMagnetName", label: "Nombre del lead magnet", icon: Gift, placeholder: "Dossier Eneryia Loop · 14 páginas", fullWidth: true },
    { id: "offerName", label: "Programa al que conduce (opcional)", icon: Tag, placeholder: "Programa Eneryia Loop" },
    { id: "webinarDate", label: "Fecha del webinar / sesión", icon: CalendarClock, placeholder: "Jueves 19:00h · directo en Zoom" },
    { id: "deadline", label: "Texto de urgencia / cierre inscripciones", icon: Clock, placeholder: "Inscripciones abiertas hasta el martes", fullWidth: true },
  ],
};

export function LandingConfigForm({ config, onChange, mode = "compra-vsl" }) {
  const isOptin = mode.startsWith("optin");
  const fields = FIELDS_BY_MODE[isOptin ? "optin" : "compra"];

  function patch(partial) {
    onChange({ ...config, ...partial });
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {fields.map((field, idx) => {
        const Icon = field.icon;
        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className={`relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-4 ${
              field.fullWidth ? "md:col-span-2" : ""
            }`}
          >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </span>
              <div className="flex-1 space-y-2">
                <label
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
                  htmlFor={field.id}
                >
                  {field.label}
                </label>
                <Input
                  id={field.id}
                  type={field.type ?? "text"}
                  value={config[field.id] ?? ""}
                  onChange={(e) => patch({ [field.id]: e.target.value })}
                  placeholder={field.placeholder}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
