// Biblioteca de formatos ganadores de ads estáticos.
// Cada formato declara su layout, paleta y win-rate aproximado.
// El motor IA aplica el ángulo (140c + 4 checkpoints) sobre cada layout.

export const STATIC_FORMATS = [
  {
    id: "split-bold",
    name: "Split Bold",
    description: "Hook gigante a la izquierda · prueba social a la derecha",
    layout: "split",
    winRate: 32,
    bestFor: ["Cold", "LinkedIn", "Meta"],
    palette: {
      base: "#050816",
      surface: "#0a1128",
      accent: "#00e5ff",
      contrast: "#e6f1ff",
    },
  },
  {
    id: "magazine-headline",
    name: "Magazine Headline",
    description: "Titular dominante · ideal para promesas fuertes",
    layout: "magazine",
    winRate: 41,
    bestFor: ["Cold", "Lanzamientos"],
    palette: {
      base: "#0a1128",
      surface: "#122046",
      accent: "#00ffd1",
      contrast: "#e6f1ff",
    },
  },
  {
    id: "testimonial-quote",
    name: "Testimonial Quote",
    description: "Cita real con foto · alta confianza, tibio + warm",
    layout: "quote",
    winRate: 28,
    bestFor: ["Warm", "Retarget", "Email"],
    palette: {
      base: "#060b1f",
      surface: "#0a1128",
      accent: "#4f8cff",
      contrast: "#cfe8ff",
    },
  },
  {
    id: "stat-drop",
    name: "Stat Drop",
    description: "Cifra enorme + reframe · gatilla curiosidad",
    layout: "stat",
    winRate: 36,
    bestFor: ["Cold", "Re-engagement"],
    palette: {
      base: "#050816",
      surface: "#0e1733",
      accent: "#8a5cff",
      contrast: "#e6f1ff",
    },
  },
  {
    id: "before-after",
    name: "Before / After",
    description: "Estado A vs B · ultra visual, alto CTR",
    layout: "compare",
    winRate: 30,
    bestFor: ["Warm", "Casos"],
    palette: {
      base: "#0a1128",
      surface: "#1b2a5b",
      accent: "#00e5ff",
      contrast: "#cfe8ff",
    },
  },
  {
    id: "minimal-promise",
    name: "Minimal Promise",
    description: "Negro absoluto + frase única · funciona en feed",
    layout: "minimal",
    winRate: 25,
    bestFor: ["Top of funnel", "Brand"],
    palette: {
      base: "#02040a",
      surface: "#050816",
      accent: "#00ffd1",
      contrast: "#e6f1ff",
    },
  },
];

export const IMAGE_MODELS = [
  {
    id: "nano-banana",
    name: "Nano Banana",
    description: "Rapidísimo · ideal para iteración masiva",
    speed: "Rápido",
    quality: "Medio",
    cost: "€0.002/img",
    badge: "Default",
  },
  {
    id: "imagen-3",
    name: "Imagen 3",
    description: "Equilibrio entre calidad y costo",
    speed: "Medio",
    quality: "Alto",
    cost: "€0.008/img",
  },
  {
    id: "flux-pro",
    name: "Flux Pro 1.1",
    description: "Foto realismo extremo, ideal para hero shots",
    speed: "Lento",
    quality: "Premium",
    cost: "€0.04/img",
    badge: "Premium",
  },
  {
    id: "midjourney",
    name: "Midjourney v7",
    description: "Estilo cinematográfico, branding fuerte",
    speed: "Lento",
    quality: "Premium",
    cost: "€0.03/img",
  },
];

export const ASPECT_RATIOS = [
  { id: "1:1", label: "1:1", description: "Feed Meta/LinkedIn", w: 1, h: 1 },
  { id: "4:5", label: "4:5", description: "Vertical Meta", w: 4, h: 5 },
  { id: "9:16", label: "9:16", description: "Reels/Stories", w: 9, h: 16 },
  { id: "16:9", label: "16:9", description: "YouTube/LinkedIn HZ", w: 16, h: 9 },
];

export const GENERATION_STAGES = [
  { label: "Inyectando ángulo + 4 checkpoints", ms: 600 },
  { label: "Mapeando avatar y deseo del Brief", ms: 700 },
  { label: "Aplicando 6 formatos ganadores", ms: 900 },
  { label: "Renderizando variantes en paralelo", ms: 1100 },
  { label: "Scoreando creativos por hook + estética", ms: 600 },
];

export function getFormatById(id) {
  return STATIC_FORMATS.find((f) => f.id === id);
}

export function getModelById(id) {
  return IMAGE_MODELS.find((m) => m.id === id);
}
