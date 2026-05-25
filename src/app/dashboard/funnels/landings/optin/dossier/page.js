"use client";

import { LandingWizard } from "@/components/funnels/landing-wizard";

const DEFAULT_ANGLE = {
  hook: "Dossier ejecutivo · cómo escalar B2B con un equipo de 3 personas.",
  benefits: [
    "14 páginas con el sistema completo Eneryia Loop",
    "Análisis de 4 casos reales con cifras y cronograma",
    "Plantilla para presentar el plan a tu comité directivo",
  ],
  qualifier: "Para fundadores y CMOs B2B con facturación de +50K/mes",
  cta: "Recibir el dossier ejecutivo",
};

const DEFAULT_CONFIG = {
  leadMagnetName: "Dossier ejecutivo Eneryia Loop (14 págs)",
  offerName: "Eneryia Loop · Implementación Premium",
  webinarDate: "Acceso inmediato + briefing 1:1 opcional",
  deadline: "Sin urgencia · revisado mensualmente",
};

export default function OptinDossierPage() {
  return (
    <LandingWizard
      mode="optin-dossier"
      eyebrow="Funnels · Landings · Opt-in"
      title="Opt-in con dossier ejecutivo"
      description="Captura leads premium con un PDF ejecutivo de alto valor. Perfil de comprador B2B que valora autoridad y argumentos estructurados."
      badge="Opt-in · Dossier"
      defaultAngle={DEFAULT_ANGLE}
      defaultConfig={DEFAULT_CONFIG}
      defaultTemplateId="optin-dossier"
    />
  );
}
