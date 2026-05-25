// Genera mock de creativos a partir del ángulo (hook + 4 checkpoints).
// Cada creativo combina un formato, una paleta y un modelo de imagen.

import { STATIC_FORMATS } from "./ads-frameworks";

const PALETTE_TWISTS = [
  {
    base: "#050816",
    surface: "#0a1128",
    accent: "#00e5ff",
    contrast: "#e6f1ff",
  },
  {
    base: "#02040a",
    surface: "#0e1733",
    accent: "#00ffd1",
    contrast: "#e6f1ff",
  },
  {
    base: "#0a1128",
    surface: "#1b2a5b",
    accent: "#4f8cff",
    contrast: "#cfe8ff",
  },
  {
    base: "#060b1f",
    surface: "#122046",
    accent: "#8a5cff",
    contrast: "#e6f1ff",
  },
  {
    base: "#050816",
    surface: "#0a1128",
    accent: "#ff3d71",
    contrast: "#fff",
  },
];

const TRUST_SOURCES = [
  "Arnau Ferrer · +28K en 30 días",
  "Guille Z. · 10K → 102K en 4 meses",
  "Higini More · cierra tickets de 30K",
  "Pau Escrig · meses de 110K",
  "Pablo Tregon · 40K con 724€ ads",
  "Felipe P. · 5 cifras mensuales",
];

const HOOK_REWRITES = [
  (hook) => hook,
  (hook) => `Stop. Antes de leer esto:\n${hook}`,
  (hook) => `${hook}\n(no es lo que piensas)`,
  (hook) => `Lo dije en una llamada con un fundador de 102K/mes:\n${hook}`,
  (hook) => `Si facturas +5K/mes, esto te aplica:\n${hook}`,
];

let counter = 9000;

export function generateCreativeBatch({
  hook,
  benefits = [],
  qualifier = "",
  cta = "",
  modelId = "nano-banana",
  ratio = "1:1",
  size = 9,
}) {
  const batch = [];
  for (let i = 0; i < size; i += 1) {
    const format = STATIC_FORMATS[i % STATIC_FORMATS.length];
    const palette = PALETTE_TWISTS[i % PALETTE_TWISTS.length];
    const rewriter = HOOK_REWRITES[i % HOOK_REWRITES.length];
    const trust = TRUST_SOURCES[i % TRUST_SOURCES.length];
    counter += 1;
    batch.push({
      id: `CR-${counter}`,
      formatId: format.id,
      formatName: format.name,
      layout: format.layout,
      palette,
      modelId,
      ratio,
      hook: rewriter(hook || "Tu agenda no es predecible. Tu sistema sí puede serlo."),
      benefits: benefits.length ? benefits : [
        "Brief estratégico instalado",
        "Contenido + Ads + Funnels alineados",
        "30 días para ver el primer cierre",
      ],
      qualifier: qualifier || "Para fundadores B2B de +5K/mes con ticket de +3.000€",
      cta: cta || "Reserva tu plaza · Eneryia.net",
      trust,
      score: 78 + ((i * 7) % 22),
      createdAt: new Date().toISOString(),
    });
  }
  return batch;
}
