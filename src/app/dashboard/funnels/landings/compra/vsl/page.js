"use client";

import { LandingWizard } from "@/components/funnels/landing-wizard";

const DEFAULT_ANGLE = {
  hook: "El sistema que convierte tu marca en un negocio predecible.",
  benefits: [
    "Brief estratégico instalado en 7 días",
    "Contenido + Ads + Funnels alineados al avatar",
    "Primer cierre extra en menos de 30 días",
  ],
  qualifier: "Para fundadores B2B de +5K/mes con ticket de +3.000€",
  cta: "Reserva tu plaza · Eneryia",
};

const DEFAULT_CONFIG = {
  offerName: "Programa Eneryia Loop",
  price: "2.997€",
  oldPrice: "6.997€",
  guaranteeDays: "30",
  deadline: "Plazas abiertas hasta el viernes",
};

export default function CompraVslPage() {
  return (
    <LandingWizard
      mode="compra-vsl"
      eyebrow="Funnels · Landings · Compra"
      title="Landing VSL lista para vender"
      description="Brief inyectado · plantilla ganadora · copy por sección. Genera la landing completa en menos de 30 segundos y aterriza con un link listo."
      badge="VSL · Compra directa"
      defaultAngle={DEFAULT_ANGLE}
      defaultConfig={DEFAULT_CONFIG}
      defaultTemplateId="minimal-vsl"
    />
  );
}
