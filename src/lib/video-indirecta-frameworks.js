// Frameworks educativos para videos de oferta indirecta (largos, formativos, valor primero).
// Pensados para LinkedIn, YouTube, VSL pre-frame y top-funnel cualificado.

export const INDIRECTA_DURATIONS = [
  { id: "60s", seconds: 60, label: "60s · Mini-lesson", surface: "LinkedIn · Shorts" },
  { id: "120s", seconds: 120, label: "2 min · Lesson focal", surface: "LinkedIn · YT" },
  { id: "180s", seconds: 180, label: "3 min · Lesson profunda", surface: "YouTube · VSL" },
  { id: "300s", seconds: 300, label: "5 min · Masterclass corta", surface: "YouTube · LinkedIn" },
  { id: "600s", seconds: 600, label: "10 min · VSL educativo", surface: "VSL · Funnel" },
];

export const INDIRECTA_FRAMEWORKS = [
  {
    id: "3-lessons",
    name: "3 Lessons Drop",
    description: "Promesa + 3 lecciones accionables + CTA suave",
    winRate: 34,
    bestFor: ["LinkedIn", "YouTube"],
    accent: "from-cyan-400/60 to-blue-500/40",
    beats: [
      { role: "Promesa", shot: "TALKING_HEAD", weight: 0.12, copyHint: "Lo que vas a aprender" },
      { role: "Contexto", shot: "B_ROLL", weight: 0.13, copyHint: "Por qué importa ahora" },
      { role: "Lección 1", shot: "SCREEN_RECORD", weight: 0.22, copyHint: "Insight + ejemplo" },
      { role: "Lección 2", shot: "B_ROLL", weight: 0.22, copyHint: "Insight + ejemplo" },
      { role: "Lección 3", shot: "TEXT_OVERLAY", weight: 0.18, copyHint: "Insight + ejemplo" },
      { role: "Resumen + CTA", shot: "CTA_CARD", weight: 0.13, copyHint: "Síntesis + invitación" },
    ],
  },
  {
    id: "story-frame",
    name: "Story Frame",
    description: "Historia personal · lección · aplicación · CTA",
    winRate: 39,
    bestFor: ["LinkedIn", "VSL"],
    accent: "from-amber-400/60 to-orange-500/40",
    beats: [
      { role: "Set-up", shot: "TALKING_HEAD", weight: 0.18, copyHint: "Quién soy + situación" },
      { role: "Conflicto", shot: "B_ROLL", weight: 0.17, copyHint: "El problema que apareció" },
      { role: "Insight", shot: "PATTERN_INTERRUPT", weight: 0.1, copyHint: "El momento que cambió todo" },
      { role: "Aprendizaje", shot: "TEXT_OVERLAY", weight: 0.2, copyHint: "Lección destilada" },
      { role: "Aplicación", shot: "SCREEN_RECORD", weight: 0.22, copyHint: "Cómo aplicarlo paso a paso" },
      { role: "CTA suave", shot: "CTA_CARD", weight: 0.13, copyHint: "Invitación + recurso" },
    ],
  },
  {
    id: "myth-vs-truth",
    name: "Myth vs Truth",
    description: "Mito que te frena · realidad · cómo cambiarla · CTA",
    winRate: 36,
    bestFor: ["YouTube", "LinkedIn"],
    accent: "from-pink-400/60 to-purple-500/40",
    beats: [
      { role: "Mito", shot: "TALKING_HEAD", weight: 0.15, copyHint: "Creencia popular del mercado" },
      { role: "Evidencia mito", shot: "B_ROLL", weight: 0.15, copyHint: "Por qué se cree esto" },
      { role: "Verdad", shot: "PATTERN_INTERRUPT", weight: 0.15, copyHint: "Lo que realmente funciona" },
      { role: "Caso real", shot: "TESTIMONIAL", weight: 0.2, copyHint: "Demostración con cifras" },
      { role: "Cómo aplicarlo", shot: "SCREEN_RECORD", weight: 0.2, copyHint: "Pasos concretos" },
      { role: "CTA", shot: "CTA_CARD", weight: 0.15, copyHint: "Acción + recurso gratuito" },
    ],
  },
  {
    id: "framework-walkthrough",
    name: "Framework Walkthrough",
    description: "Presentar un framework propio paso a paso (pizarra estilo)",
    winRate: 32,
    bestFor: ["YouTube", "VSL"],
    accent: "from-emerald-400/60 to-teal-500/40",
    beats: [
      { role: "Intro al framework", shot: "TALKING_HEAD", weight: 0.12, copyHint: "Cómo se llama y qué resuelve" },
      { role: "Paso 1", shot: "SCREEN_RECORD", weight: 0.2, copyHint: "Qué hacer y por qué" },
      { role: "Paso 2", shot: "SCREEN_RECORD", weight: 0.2, copyHint: "Qué hacer y por qué" },
      { role: "Paso 3", shot: "SCREEN_RECORD", weight: 0.2, copyHint: "Qué hacer y por qué" },
      { role: "Resultado típico", shot: "B_ROLL", weight: 0.15, copyHint: "Antes vs después" },
      { role: "CTA", shot: "CTA_CARD", weight: 0.13, copyHint: "Solicita la implementación" },
    ],
  },
  {
    id: "case-study-deep",
    name: "Case Study · Deep Dive",
    description: "Cliente concreto · contexto · acciones · resultado · cómo replicarlo",
    winRate: 42,
    bestFor: ["LinkedIn", "VSL", "YouTube"],
    accent: "from-violet-400/60 to-indigo-500/40",
    beats: [
      { role: "Resultado primero", shot: "TEXT_OVERLAY", weight: 0.1, copyHint: "Cifra final · gancho" },
      { role: "Cliente", shot: "TALKING_HEAD", weight: 0.15, copyHint: "Quién es y dónde estaba" },
      { role: "Contexto", shot: "B_ROLL", weight: 0.15, copyHint: "Qué dolía y por qué" },
      { role: "Acción 1", shot: "SCREEN_RECORD", weight: 0.18, copyHint: "Primera intervención" },
      { role: "Acción 2", shot: "SCREEN_RECORD", weight: 0.18, copyHint: "Segunda intervención" },
      { role: "Resultado", shot: "TESTIMONIAL", weight: 0.12, copyHint: "Cifras + voz cliente" },
      { role: "Cómo replicarlo", shot: "CTA_CARD", weight: 0.12, copyHint: "Invitación a aplicar" },
    ],
  },
  {
    id: "vsl-educational",
    name: "VSL Educational",
    description: "VSL con foco educativo · presenta problema, mecanismo único y oferta",
    winRate: 45,
    bestFor: ["VSL", "Funnel"],
    accent: "from-cyan-300/60 to-emerald-400/40",
    beats: [
      { role: "Hook + promesa", shot: "TALKING_HEAD", weight: 0.08, copyHint: "Promesa + para quién" },
      { role: "Diagnóstico", shot: "TEXT_OVERLAY", weight: 0.12, copyHint: "Por qué estás donde estás hoy" },
      { role: "Por qué no funcionó antes", shot: "B_ROLL", weight: 0.13, copyHint: "Mitos del mercado" },
      { role: "Mecanismo único", shot: "SCREEN_RECORD", weight: 0.2, copyHint: "Cómo lo resolvemos diferente" },
      { role: "Demostración", shot: "SCREEN_RECORD", weight: 0.15, copyHint: "Mostrar el sistema" },
      { role: "Prueba social", shot: "TESTIMONIAL", weight: 0.12, copyHint: "Casos + cifras" },
      { role: "Oferta", shot: "CTA_CARD", weight: 0.1, copyHint: "Qué incluye y a qué precio" },
      { role: "CTA + urgencia", shot: "CTA_CARD", weight: 0.1, copyHint: "Acción + plaza limitada" },
    ],
  },
];

export const INDIRECTA_GENERATION_STAGES = [
  { label: "Inyectando ángulo + duración objetivo", ms: 600 },
  { label: "Mapeando insights del Brief", ms: 700 },
  { label: "Estructurando beats educativos", ms: 800 },
  { label: "Generando voz en off por lección", ms: 1200 },
  { label: "Sugiriendo B-roll + on-screen text", ms: 900 },
  { label: "Render storyboard educativo", ms: 600 },
];

export function getIndirectaFrameworkById(id) {
  return INDIRECTA_FRAMEWORKS.find((f) => f.id === id);
}

export function getIndirectaDurationById(id) {
  return INDIRECTA_DURATIONS.find((d) => d.id === id);
}
