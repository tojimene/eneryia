export const MOCK_USERS = [
  {
    email: "admin@eneryia.io",
    password: "admin123",
    name: "Tomás Jiménez",
    role: "Fundador",
    avatar: "TJ",
  },
  {
    email: "demo@eneryia.io",
    password: "demo123",
    name: "Demo User",
    role: "Editor",
    avatar: "DU",
  },
];

export const STATS = [
  {
    title: "Briefs activos",
    value: "12",
    delta: "+3",
    deltaTone: "up",
    hint: "Hoja de ruta en producción",
  },
  {
    title: "Funnels publicados",
    value: "28",
    delta: "+5",
    deltaTone: "up",
    hint: "Esta semana",
  },
  {
    title: "Ads en rotación",
    value: "47",
    delta: "+12",
    deltaTone: "up",
    hint: "Estáticos + vídeo",
  },
  {
    title: "ROAS medio",
    value: "3.42x",
    delta: "+0.4",
    deltaTone: "up",
    hint: "Últimos 30 días",
  },
];

export const RECENT_BRIEFS = [
  {
    id: "BR-0142",
    title: "Lanzamiento Eneryia Pro",
    type: "Largo",
    owner: "Tomás J.",
    status: "En revisión",
    progress: 72,
    updatedAt: "Hace 2h",
  },
  {
    id: "BR-0141",
    title: "Funnel Optin – Dossier IA",
    type: "Funnel",
    owner: "María L.",
    status: "Listo",
    progress: 100,
    updatedAt: "Hace 5h",
  },
  {
    id: "BR-0140",
    title: "Ads Estáticos – Black Week",
    type: "Ads",
    owner: "Iván P.",
    status: "Borrador",
    progress: 34,
    updatedAt: "Ayer",
  },
  {
    id: "BR-0139",
    title: "Vídeo Of. Directa – Coaching",
    type: "Vídeo",
    owner: "Lucía G.",
    status: "En diseño",
    progress: 58,
    updatedAt: "Hace 1d",
  },
  {
    id: "BR-0138",
    title: "VSL Compra – Upsell Premium",
    type: "Funnel",
    owner: "Tomás J.",
    status: "Listo",
    progress: 100,
    updatedAt: "Hace 2d",
  },
];

export const PIPELINE_PHASES = [
  {
    title: "Contenido",
    description: "Largo y corto, fundamento del mensaje",
    items: ["Largo", "Corto"],
    accent: "from-[#00e5ff] to-[#4f8cff]",
  },
  {
    title: "Ads",
    description: "Estáticos y vídeos para captar atención",
    items: ["Estáticos", "Vídeos · Of. Directa", "Vídeos · Of. Indirecta"],
    accent: "from-[#4f8cff] to-[#8a5cff]",
  },
  {
    title: "Funnels",
    description: "Landings de compra y optin con upsells",
    items: ["Landings (Compra/Optin)", "VSL Compra", "Upsell + Bumps"],
    accent: "from-[#8a5cff] to-[#ff3d71]",
  },
];

export const SECTION_ASSETS = [
  {
    id: "AS-2041",
    title: "Hook · IA en 7 días",
    owner: "María L.",
    updatedAt: "Hace 30 min",
    status: "Listo",
    statusVariant: "success",
    impact: 92,
    tag: "v3.2",
  },
  {
    id: "AS-2040",
    title: "Iteración de copy principal",
    owner: "Tomás J.",
    updatedAt: "Hace 2h",
    status: "En revisión",
    statusVariant: "neon",
    impact: 74,
    tag: "v2.1",
  },
  {
    id: "AS-2039",
    title: "Test A/B – CTA neón",
    owner: "Iván P.",
    updatedAt: "Hace 5h",
    status: "Borrador",
    statusVariant: "outline",
    impact: 41,
    tag: "v0.4",
  },
  {
    id: "AS-2038",
    title: "Diseño hero · gradiente",
    owner: "Lucía G.",
    updatedAt: "Ayer",
    status: "En diseño",
    statusVariant: "violet",
    impact: 63,
    tag: "v1.0",
  },
  {
    id: "AS-2037",
    title: "Refactor de hooks emocionales",
    owner: "María L.",
    updatedAt: "Hace 2 días",
    status: "Listo",
    statusVariant: "success",
    impact: 88,
    tag: "v3.0",
  },
  {
    id: "AS-2036",
    title: "Mockup variante mobile",
    owner: "Iván P.",
    updatedAt: "Hace 3 días",
    status: "En revisión",
    statusVariant: "neon",
    impact: 56,
    tag: "v1.5",
  },
];

export const ACTIVITY_FEED = [
  {
    actor: "María L.",
    action: "publicó",
    target: "Dossier IA · Optin",
    time: "hace 10 min",
  },
  {
    actor: "Iván P.",
    action: "movió a revisión",
    target: "Ads Estáticos – Black Week",
    time: "hace 32 min",
  },
  {
    actor: "Tomás J.",
    action: "creó brief",
    target: "VSL Compra – Upsell Premium",
    time: "hace 1h",
  },
  {
    actor: "Lucía G.",
    action: "subió variantes",
    target: "Vídeo Of. Indirecta",
    time: "hace 3h",
  },
];
