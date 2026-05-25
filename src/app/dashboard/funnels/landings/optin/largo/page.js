"use client";

import { LandingWizard } from "@/components/funnels/landing-wizard";

const DEFAULT_ANGLE = {
  hook: "Los 7 fallos que están dejando a tu agencia estancada en 5K MRR.",
  benefits: [
    "Diagnóstico paso a paso del cuello de botella real",
    "Acceso al PDF descargable con el plan de acción de 30 días",
    "Plantilla Notion para clonar el sistema completo",
  ],
  qualifier: "Para fundadores que ya facturan algo pero no consiguen estabilizar",
  cta: "Descargar el plan de 30 días",
};

const DEFAULT_CONFIG = {
  leadMagnetName: "Plan 30 días Eneryia · PDF + Notion",
  offerName: "Programa Eneryia Loop",
  webinarDate: "Lección 1 al instante por email",
  deadline: "Acceso inmediato · revisado cada trimestre",
};

export default function OptinLargoPage() {
  return (
    <LandingWizard
      mode="optin-largo"
      eyebrow="Funnels · Landings · Opt-in"
      title="Opt-in long-form para tráfico SEO"
      description="Artículo educativo extendido con CTA repartido. Ideal para tráfico orgánico que llega buscando soluciones puntuales. Sticky form al hacer scroll."
      badge="Opt-in · Long-form"
      defaultAngle={DEFAULT_ANGLE}
      defaultConfig={DEFAULT_CONFIG}
      defaultTemplateId="optin-longform"
    />
  );
}
