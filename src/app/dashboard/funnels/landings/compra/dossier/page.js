"use client";

import { LandingWizard } from "@/components/funnels/landing-wizard";

const DEFAULT_ANGLE = {
  hook: "Dossier ejecutivo Eneryia Loop · cómo instalamos el sistema en 30 días.",
  benefits: [
    "Diagnóstico, mecanismo y entregables explicados al detalle",
    "Casos reales con cifras auditables y cronograma",
    "Pensado para que lo enseñes a tu equipo directivo",
  ],
  qualifier: "Para fundadores y CMOs B2B con ticket de servicio +5.000€",
  cta: "Solicita el onboarding ejecutivo",
};

const DEFAULT_CONFIG = {
  offerName: "Eneryia Loop · Implementación Premium",
  price: "12.000€",
  oldPrice: "18.000€",
  guaranteeDays: "60",
  deadline: "Cohorte trimestral · plazas limitadas a 6 empresas",
};

export default function CompraDossierPage() {
  return (
    <LandingWizard
      mode="compra-dossier"
      eyebrow="Funnels · Landings · Compra"
      title="Dossier premium para ticket alto"
      description="Estética editorial · single column · documento serio para tickets de 5K+. Perfecto para mostrar a comités de compra y equipos directivos."
      badge="Dossier · Ticket alto"
      defaultAngle={DEFAULT_ANGLE}
      defaultConfig={DEFAULT_CONFIG}
      defaultTemplateId="premium-dossier"
    />
  );
}
