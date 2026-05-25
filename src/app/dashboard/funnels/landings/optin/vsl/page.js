"use client";

import { LandingWizard } from "@/components/funnels/landing-wizard";

const DEFAULT_ANGLE = {
  hook: "Cómo 14 fundadores B2B duplicaron su facturación sin contratar a nadie.",
  benefits: [
    "El loop completo Brief · Contenido · Ads · Funnel explicado en vídeo",
    "Las 3 palancas que mueven la facturación en los primeros 30 días",
    "Plantilla Notion lista para clonar e implementar la semana que viene",
  ],
  qualifier: "Para fundadores B2B que facturan +5K/mes y se sienten estancados",
  cta: "Quiero el vídeo y el dossier",
};

const DEFAULT_CONFIG = {
  leadMagnetName: "Eneryia Loop · Masterclass + Dossier (14 págs)",
  offerName: "Programa Eneryia Loop",
  webinarDate: "Jueves 19:00h · directo en Zoom",
  deadline: "Inscripciones abiertas hasta el miércoles a las 23:59h",
};

export default function OptinVslPage() {
  return (
    <LandingWizard
      mode="optin-vsl"
      eyebrow="Funnels · Landings · Opt-in"
      title="Opt-in con VSL educativo"
      description="Captura leads cualificados con una sesión grabada o webinar en directo. Vídeo + formulario sticky + agenda + prueba social."
      badge="Opt-in · VSL"
      defaultAngle={DEFAULT_ANGLE}
      defaultConfig={DEFAULT_CONFIG}
      defaultTemplateId="optin-vsl-clean"
    />
  );
}
