// Estructuras ganadoras ("swipe masters") que alimentan el motor de contenido.
// Inspiradas en frameworks clásicos de copywriting que Ricardo menciona en
// la llamada. Cada framework declara su "beat" (estructura) para que el
// generador IA pueda renderizar contenido siguiendo esa columna vertebral.

export const LONG_FORMATS = [
  {
    id: "linkedin-long",
    title: "Post largo LinkedIn",
    description: "Storytelling autoritario para fundadores B2B",
    icon: "Linkedin",
    accent: "from-[#00e5ff] to-[#4f8cff]",
    target: "1.200 – 1.800 caracteres",
    surface: "LinkedIn",
  },
  {
    id: "long-article",
    title: "Artículo / Blog",
    description: "SEO + autoridad técnica con narrativa",
    icon: "ScrollText",
    accent: "from-[#4f8cff] to-[#8a5cff]",
    target: "900 – 1.400 palabras",
    surface: "Web · Newsletter",
  },
  {
    id: "video-script",
    title: "Guion vídeo largo",
    description: "VSL / YouTube · 6-12 minutos",
    icon: "Video",
    accent: "from-[#8a5cff] to-[#ff3d71]",
    target: "1.500 – 2.500 palabras",
    surface: "YouTube · VSL",
  },
  {
    id: "dossier",
    title: "Dossier comercial",
    description: "Pieza pre-call para tickets +3.000€",
    icon: "FileStack",
    accent: "from-[#00ffd1] to-[#00e5ff]",
    target: "8 – 14 secciones",
    surface: "PDF · Notion",
  },
];

export const LONG_FRAMEWORKS = [
  {
    id: "pas-extended",
    name: "PAS extendido",
    summary:
      "Problema · Agitación · Solución · Prueba. La base de cualquier VSL ganadora.",
    beats: [
      "Hook: declaración fuerte sobre el problema oculto",
      "Agitación: 3 escenas reales que viven hoy",
      "Mecanismo único: por qué Eneryia rompe el patrón",
      "Prueba: 2-3 mini casos con cifras",
      "Cierre + CTA único",
    ],
    intensity: "Alto",
    bestFor: ["Cold traffic", "Lanzamientos", "Re-targeting"],
  },
  {
    id: "case-study",
    name: "Case Study Narrativa",
    summary:
      "Historia real con arco de transformación. Convierte mejor con tráfico tibio.",
    beats: [
      "Setup: situación inicial del cliente real",
      "Catalizador: el momento de la decisión",
      "Acción: qué hicimos paso a paso",
      "Resultado: métrica concreta + tiempo",
      "Lección replicable + CTA suave",
    ],
    intensity: "Medio",
    bestFor: ["Tráfico tibio", "Email", "Webinar de venta"],
  },
  {
    id: "manifesto",
    name: "Manifiesto del fundador",
    summary:
      "Postura editorial para construir marca personal. Eleva ticket y posiciona.",
    beats: [
      "Verdad incómoda del sector",
      "Por qué pasa (causa estructural)",
      "Lo que casi nadie dice",
      "Tu visión alternativa",
      "Llamado al cambio + soft CTA",
    ],
    intensity: "Alto",
    bestFor: ["Marca personal", "LinkedIn", "Podcast"],
  },
  {
    id: "hero-journey",
    name: "Hero's Journey condensado",
    summary:
      "Estructura mítica de Campbell aplicada a transformación de cliente.",
    beats: [
      "Mundo ordinario · status quo del cliente",
      "Llamado a la aventura · trigger emocional",
      "Mentor (tú) · ofrece mapa",
      "Pruebas · objeciones que supera",
      "Retorno con el elixir · resultado",
    ],
    intensity: "Medio",
    bestFor: ["YouTube", "VSL", "Dossier"],
  },
  {
    id: "contrarian",
    name: "Contrarian Insight",
    summary:
      "Postura opuesta al mercado + datos. Funciona en audiencias saturadas.",
    beats: [
      "Lo que el mercado predica",
      "Por qué es falso (3 evidencias)",
      "Lo que sí funciona hoy",
      "Cómo aplicarlo en 7 días",
      "CTA hacia tu mecanismo",
    ],
    intensity: "Alto",
    bestFor: ["LinkedIn", "Newsletter", "Twitter/X"],
  },
];

export const SHORT_FRAMEWORKS = [
  {
    id: "hook-counter",
    name: "Contrarian Hook",
    description: "Verdad incómoda que rompe el patrón del feed",
    template: "Todo el mundo dice X. La realidad es Y.",
  },
  {
    id: "hook-curiosity",
    name: "Curiosity Gap",
    description: "Pregunta abierta + promesa específica",
    template: "¿Cómo {avatar} logró {resultado} sin {fricción}?",
  },
  {
    id: "hook-data",
    name: "Stat Drop",
    description: "Dato duro de tu nicho como anzuelo",
    template: "El {%} de {avatar} {fracaso}. Esto es lo que hacen los que no.",
  },
  {
    id: "hook-list",
    name: "Listicle ultracorto",
    description: "Promesa numerada y específica",
    template: "{N} cosas que cambiaron mi {métrica} en {tiempo}.",
  },
  {
    id: "hook-story",
    name: "Micro Story",
    description: "Mini historia con gancho emocional",
    template: "{Año/lugar}. {Conflicto en una línea}. Lo que aprendí cambió todo.",
  },
  {
    id: "hook-question",
    name: "Brutal Question",
    description: "Pregunta directa que duele",
    template: "¿Por qué sigues {acción} si {realidad}?",
  },
];

export const SHORT_SURFACES = [
  { id: "linkedin", label: "LinkedIn", icon: "Linkedin" },
  { id: "twitter", label: "X / Twitter", icon: "Twitter" },
  { id: "reel-hook", label: "Reel Hook", icon: "Video" },
  { id: "email-subject", label: "Asunto email", icon: "Mail" },
  { id: "youtube-title", label: "Título YouTube", icon: "Youtube" },
];

export const GENERATION_STAGES = [
  { label: "Inyectando avatar y mecanismo único", ms: 700 },
  { label: "Aplicando estructura ganadora", ms: 900 },
  { label: "Generando variantes con prueba social", ms: 1000 },
  { label: "Optimizando hooks y CTAs", ms: 700 },
];

export function getFormatById(id) {
  return LONG_FORMATS.find((format) => format.id === id);
}

export function getLongFrameworkById(id) {
  return LONG_FRAMEWORKS.find((framework) => framework.id === id);
}
