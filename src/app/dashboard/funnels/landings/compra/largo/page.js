"use client";

import { LandingWizard } from "@/components/funnels/landing-wizard";

const DEFAULT_ANGLE = {
  hook: "Cómo escalar tu agencia sin contratar comerciales (caso real con 14 fundadores).",
  benefits: [
    "Te explica el sistema completo en un único documento",
    "Casos reales con cifras y cronología auditable",
    "Lo lees una vez y sabes exactamente qué hacer",
  ],
  qualifier: "Para fundadores B2B con +5K/mes que ya probaron 'más ads' y 'más SDRs'",
  cta: "Empieza el programa Eneryia",
};

const DEFAULT_CONFIG = {
  offerName: "Programa Eneryia Loop",
  price: "2.997€",
  oldPrice: "6.997€",
  guaranteeDays: "30",
  deadline: "Plazas abiertas hasta el viernes",
};

export default function CompraLargoPage() {
  return (
    <LandingWizard
      mode="compra-largo"
      eyebrow="Funnels · Landings · Compra"
      title="Long-form sales letter sin VSL"
      description="Argumento extendido para tráfico que llega frío desde SEO o newsletters. Storytelling + prueba social + value stack. Cero distracciones, solo texto."
      badge="Long-form · sin VSL"
      defaultAngle={DEFAULT_ANGLE}
      defaultConfig={DEFAULT_CONFIG}
      defaultTemplateId="longform-pas"
    />
  );
}
