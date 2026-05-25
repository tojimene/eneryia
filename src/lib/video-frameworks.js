// Frameworks ganadores para video directo (ads Meta/TikTok/Reels).
// Cada framework define beats (escenas) con tipo de toma, duración estimada y rol narrativo.

export const VIDEO_DURATIONS = [
  { id: "15s", seconds: 15, label: "15s · Hook único", surface: "Reels · TikTok" },
  { id: "30s", seconds: 30, label: "30s · Hook + prueba + CTA", surface: "Meta · YouTube Shorts" },
  { id: "45s", seconds: 45, label: "45s · Desarrollo medio", surface: "Meta · LinkedIn" },
  { id: "60s", seconds: 60, label: "60s · Short completo", surface: "Reels · Shorts" },
  { id: "90s", seconds: 90, label: "90s · Educativo directo", surface: "YouTube · LinkedIn" },
];

export const SHOT_TYPES = {
  TALKING_HEAD: {
    id: "TALKING_HEAD",
    label: "Talking head",
    icon: "Mic",
    color: "#00e5ff",
    description: "Cara a cámara · fundador/host",
  },
  B_ROLL: {
    id: "B_ROLL",
    label: "B-roll",
    icon: "Film",
    color: "#00ffd1",
    description: "Imágenes de apoyo · acción/contexto",
  },
  TEXT_OVERLAY: {
    id: "TEXT_OVERLAY",
    label: "Text overlay",
    icon: "Type",
    color: "#8a5cff",
    description: "Texto en pantalla · pattern interrupt",
  },
  SCREEN_RECORD: {
    id: "SCREEN_RECORD",
    label: "Screen record",
    icon: "Monitor",
    color: "#4f8cff",
    description: "Captura de pantalla · producto",
  },
  PATTERN_INTERRUPT: {
    id: "PATTERN_INTERRUPT",
    label: "Pattern interrupt",
    icon: "Zap",
    color: "#ff3d71",
    description: "Cambio brusco · para el scroll",
  },
  TESTIMONIAL: {
    id: "TESTIMONIAL",
    label: "Testimonio",
    icon: "Quote",
    color: "#ffaa00",
    description: "Cliente real · prueba social",
  },
  CTA_CARD: {
    id: "CTA_CARD",
    label: "CTA card",
    icon: "ArrowRight",
    color: "#00e5ff",
    description: "Cierre con call to action",
  },
};

// Beats define la estructura de un framework. Cada beat tendrá su ratio del total.
export const VIDEO_FRAMEWORKS = [
  {
    id: "three-sec-promise",
    name: "3-Sec Promise",
    description: "Hook brutal en 3 segundos + promesa + prueba + CTA",
    winRate: 38,
    bestFor: ["Cold", "Meta", "Reels"],
    accent: "from-cyan-400/60 to-blue-500/40",
    beats: [
      { role: "Hook", shot: "TALKING_HEAD", weight: 0.2, copyHint: "Frase impactante con la promesa nuclear" },
      { role: "Promesa", shot: "TEXT_OVERLAY", weight: 0.15, copyHint: "Reframe + qué van a conseguir" },
      { role: "Prueba", shot: "TESTIMONIAL", weight: 0.25, copyHint: "Caso real + cifra concreta" },
      { role: "Mecanismo", shot: "B_ROLL", weight: 0.25, copyHint: "Cómo funciona en 1 frase" },
      { role: "CTA", shot: "CTA_CARD", weight: 0.15, copyHint: "Acción única + lugar" },
    ],
  },
  {
    id: "pattern-interrupt",
    name: "Pattern Interrupt",
    description: "Algo inesperado para el scroll, reveal y promesa",
    winRate: 41,
    bestFor: ["Cold", "TikTok", "Reels"],
    accent: "from-pink-400/60 to-purple-500/40",
    beats: [
      { role: "Disruption", shot: "PATTERN_INTERRUPT", weight: 0.18, copyHint: "Movimiento/sonido raro" },
      { role: "Hook verbal", shot: "TALKING_HEAD", weight: 0.22, copyHint: "Frase que abre el loop" },
      { role: "Reveal", shot: "TEXT_OVERLAY", weight: 0.25, copyHint: "Insight contraintuitivo" },
      { role: "Prueba", shot: "B_ROLL", weight: 0.2, copyHint: "Demostración del cambio" },
      { role: "CTA", shot: "CTA_CARD", weight: 0.15, copyHint: "Acción + urgencia" },
    ],
  },
  {
    id: "stop-the-scroll",
    name: "Stop the Scroll",
    description: "'Para. Antes de seguir...' + dolor + solución + CTA",
    winRate: 33,
    bestFor: ["Cold", "Warm", "Meta"],
    accent: "from-amber-400/60 to-orange-500/40",
    beats: [
      { role: "Stop", shot: "TALKING_HEAD", weight: 0.15, copyHint: "Para. Si X, este vídeo es para ti" },
      { role: "Dolor", shot: "TEXT_OVERLAY", weight: 0.25, copyHint: "Pintar el problema actual" },
      { role: "Agitación", shot: "B_ROLL", weight: 0.2, copyHint: "Por qué duele más cada día" },
      { role: "Solución", shot: "SCREEN_RECORD", weight: 0.25, copyHint: "Mostrar el sistema en acción" },
      { role: "CTA", shot: "CTA_CARD", weight: 0.15, copyHint: "Reserva tu plaza" },
    ],
  },
  {
    id: "founder-talk",
    name: "Founder Talk",
    description: "Fundador a cámara · caso real · insight · CTA",
    winRate: 29,
    bestFor: ["Warm", "LinkedIn", "Email"],
    accent: "from-emerald-400/60 to-teal-500/40",
    beats: [
      { role: "Intro", shot: "TALKING_HEAD", weight: 0.2, copyHint: "Quién soy + caso que voy a contar" },
      { role: "Caso", shot: "TALKING_HEAD", weight: 0.3, copyHint: "Historia concreta con cifra" },
      { role: "Insight", shot: "TEXT_OVERLAY", weight: 0.2, copyHint: "Lección clave que aplica al espectador" },
      { role: "Mecanismo", shot: "B_ROLL", weight: 0.15, copyHint: "Cómo replicarlo" },
      { role: "CTA", shot: "CTA_CARD", weight: 0.15, copyHint: "Acción + dónde" },
    ],
  },
  {
    id: "problem-agitate-solve",
    name: "Problem · Agitate · Solve",
    description: "PAS clásico adaptado a 30-60s",
    winRate: 35,
    bestFor: ["Cold", "Meta", "YouTube"],
    accent: "from-violet-400/60 to-indigo-500/40",
    beats: [
      { role: "Problema", shot: "TALKING_HEAD", weight: 0.2, copyHint: "Nombrar el dolor con precisión" },
      { role: "Agitación", shot: "B_ROLL", weight: 0.25, copyHint: "Consecuencias + escenario peor" },
      { role: "Quiebre", shot: "PATTERN_INTERRUPT", weight: 0.1, copyHint: "Pero hay otro camino..." },
      { role: "Solución", shot: "SCREEN_RECORD", weight: 0.3, copyHint: "Mostrar la solución funcionando" },
      { role: "CTA", shot: "CTA_CARD", weight: 0.15, copyHint: "Consíguelo" },
    ],
  },
  {
    id: "before-after-reel",
    name: "Before / After Reel",
    description: "Estado A vs B + reveal del mecanismo",
    winRate: 36,
    bestFor: ["Warm", "Casos", "Retarget"],
    accent: "from-cyan-300/60 to-emerald-400/40",
    beats: [
      { role: "Antes", shot: "B_ROLL", weight: 0.25, copyHint: "Cómo se ve sin esto" },
      { role: "Transición", shot: "PATTERN_INTERRUPT", weight: 0.1, copyHint: "Sweep / cut visual" },
      { role: "Después", shot: "B_ROLL", weight: 0.25, copyHint: "Cómo se ve con esto" },
      { role: "Mecanismo", shot: "TEXT_OVERLAY", weight: 0.2, copyHint: "Qué cambió exactamente" },
      { role: "Prueba + CTA", shot: "CTA_CARD", weight: 0.2, copyHint: "Cifra + acción" },
    ],
  },
];

export const VIDEO_GENERATION_STAGES = [
  { label: "Inyectando ángulo + duración objetivo", ms: 600 },
  { label: "Mapeando avatar y promesa del Brief", ms: 700 },
  { label: "Aplicando estructura ganadora · beats", ms: 800 },
  { label: "Generando voz en off por escena", ms: 1100 },
  { label: "Sugiriendo b-roll y on-screen text", ms: 800 },
  { label: "Renderizando storyboard final", ms: 600 },
];

export function getVideoFrameworkById(id) {
  return VIDEO_FRAMEWORKS.find((f) => f.id === id);
}

export function getDurationById(id) {
  return VIDEO_DURATIONS.find((d) => d.id === id);
}

export function getShotType(id) {
  return SHOT_TYPES[id] ?? SHOT_TYPES.B_ROLL;
}
