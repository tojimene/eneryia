// Construye un storyboard a partir del framework + duración + ángulo.
// Genera escenas con timestamps, voz-over, on-screen text y notas de visual.

import { getVideoFrameworkById, getDurationById } from "./video-frameworks";

const VOICEOVER_TEMPLATES = {
  Hook: (a) => a.hook || "Si tu agenda no es predecible, tu sistema tampoco lo es.",
  "Hook verbal": (a) => a.hook || "Lo que voy a decir te va a sonar contraintuitivo.",
  Promesa: (a) =>
    `En 30 días instalamos ${(a.benefits || [])[0] || "un sistema que cierra solo"}. Sin agencias, sin contratar más.`,
  Prueba: () => "Arnau pasó de 28K a 102K en 4 meses. Pau cierra meses de 110K.",
  Mecanismo: (a) =>
    `${(a.benefits || [])[1] || "Brief estratégico"} + contenido + ads + funnels alineados.`,
  Disruption: () => "*ruido fuerte* Para.",
  Reveal: (a) =>
    `${a.qualifier || "Esto solo funciona si facturas +5K/mes"}. Si no, ahórrate el clic.`,
  Stop: () => "Para. Si ya facturas 5 cifras mensuales, esto te aplica.",
  Dolor: () => "Llamadas que no se cierran. Equipo que no sostiene el ritmo. ROAS sin patrón.",
  Agitación: () =>
    "Cada mes que pasa con esa estructura es ticket que dejás sobre la mesa.",
  Solución: (a) =>
    `Eneryia te instala el sistema completo: ${(a.benefits || [])
      .slice(0, 2)
      .join(" + ") || "estrategia + ejecución"}.`,
  Intro: () =>
    "Soy Ricardo, fundador de Eneryia. Te voy a contar lo que hicimos con Arnau.",
  Caso: () =>
    "Empezó con 28K/mes vendiendo formación. En 4 meses cerró su mejor mes: 102K. Mismo equipo.",
  Insight: () =>
    "El cuello de botella no era el producto. Era el sistema de captación + cierre.",
  Problema: (a) =>
    a.coreProblem || "El problema no es que no escales. Es que no sabes qué romper.",
  Quiebre: () => "Pero hay otra forma. Una que no necesita más esfuerzo.",
  Antes: () => "Esto es lo que pasa sin un sistema instalado.",
  Transición: () => "*cut*",
  Después: () => "Esto es lo que pasa cuando lo instalas bien.",
  "Prueba + CTA": (a) =>
    `Arnau lo aplicó. Pau lo aplicó. ${a.cta || "Reserva tu plaza · Eneryia.net"}`,
  CTA: (a) => a.cta || "Reserva tu plaza · Eneryia.net",
};

const ON_SCREEN_TEMPLATES = {
  Hook: (a) => (a.hook || "Tu sistema decide tu agenda").toUpperCase(),
  "Hook verbal": (a) => (a.hook || "Lo que vas a oír es contraintuitivo").toUpperCase(),
  Promesa: () => "+74K€ EN 4 MESES",
  Prueba: () => "ARNAU · 28K → 102K",
  Mecanismo: () => "BRIEF · CONTENIDO · ADS · FUNNELS",
  Disruption: () => "STOP",
  Reveal: () => "ESTO SOLO FUNCIONA SI...",
  Stop: () => "PARA.",
  Dolor: () => "TU AGENDA ≠ PREDECIBLE",
  Agitación: () => "CADA MES SIN ESTO = -€",
  Solución: () => "SISTEMA INSTALADO EN 30 DÍAS",
  Intro: () => "RICARDO · ENERYIA",
  Caso: () => "ARNAU · CASO REAL",
  Insight: () => "EL SISTEMA > EL ESFUERZO",
  Problema: (a) => (a.coreProblem || "EL PROBLEMA NO ES LO QUE CREES").toUpperCase().slice(0, 60),
  Quiebre: () => "PERO...",
  Antes: () => "ANTES",
  Transición: () => "→",
  Después: () => "DESPUÉS",
  "Prueba + CTA": (a) => (a.cta || "RESERVA TU PLAZA").toUpperCase(),
  CTA: (a) => (a.cta || "RESERVA TU PLAZA").toUpperCase(),
};

const VISUAL_TEMPLATES = {
  TALKING_HEAD: "Fundador a cámara · plano medio · fondo desenfocado",
  B_ROLL: "Plano detalle del producto/dashboard · movimiento suave",
  TEXT_OVERLAY: "Pantalla negra · texto neon centrado · entrada por cut",
  SCREEN_RECORD: "Captura del dashboard Eneryia · zoom progresivo",
  PATTERN_INTERRUPT: "Zoom in agresivo · flash de luz · cambio de plano",
  TESTIMONIAL: "Cliente real a cámara · ambient lighting · sonido directo",
  CTA_CARD: "Logo Eneryia + texto CTA + flecha pulsante",
};

const BROLL_LIBRARY = [
  "Dashboard Eneryia con datos reales",
  "Fundador escribiendo en Notion",
  "Notificaciones de WhatsApp llegando",
  "Print de stripe con pago entrante",
  "Reunión de equipo en Loom",
  "Print de calendario lleno",
  "Print de email de cliente confirmando",
  "B-roll de oficina · café · pantalla",
];

let counter = 5000;

export function buildStoryboard({ frameworkId, durationId, angle }) {
  const framework = getVideoFrameworkById(frameworkId);
  const duration = getDurationById(durationId);
  if (!framework || !duration) return null;

  const totalSeconds = duration.seconds;
  let cursor = 0;

  const scenes = framework.beats.map((beat, idx) => {
    const sceneSeconds = Math.max(2, Math.round(totalSeconds * beat.weight));
    const start = cursor;
    const end = Math.min(totalSeconds, cursor + sceneSeconds);
    cursor = end;

    counter += 1;
    const voiceover = (VOICEOVER_TEMPLATES[beat.role] || (() => "—"))(angle);
    const onScreen = (ON_SCREEN_TEMPLATES[beat.role] || (() => ""))(angle);
    const visual = VISUAL_TEMPLATES[beat.shot] || "Visual sugerido";
    const broll = [BROLL_LIBRARY[idx % BROLL_LIBRARY.length]];

    return {
      id: `SC-${counter}`,
      order: idx + 1,
      role: beat.role,
      shotType: beat.shot,
      start,
      end,
      seconds: end - start,
      voiceover,
      onScreen,
      visual,
      broll,
      copyHint: beat.copyHint,
    };
  });

  // Ajuste por redondeo: si sobra/falta, lo aplicamos a la última escena
  const last = scenes[scenes.length - 1];
  if (last && last.end !== totalSeconds) {
    last.end = totalSeconds;
    last.seconds = last.end - last.start;
  }

  return {
    id: `STB-${Date.now()}`,
    frameworkId,
    durationId,
    totalSeconds,
    scenes,
    title:
      angle?.hook?.slice(0, 60) || `${framework.name} · ${duration.label}`,
    framework,
    duration,
  };
}

export function regenerateScene(storyboard, sceneId, angle) {
  return {
    ...storyboard,
    scenes: storyboard.scenes.map((scene) => {
      if (scene.id !== sceneId) return scene;
      counter += 1;
      const voiceover = (VOICEOVER_TEMPLATES[scene.role] || (() => "—"))(angle);
      const onScreen = (ON_SCREEN_TEMPLATES[scene.role] || (() => ""))(angle);
      return {
        ...scene,
        id: `SC-${counter}`,
        voiceover,
        onScreen,
        broll: [
          BROLL_LIBRARY[Math.floor(Math.random() * BROLL_LIBRARY.length)],
        ],
      };
    }),
  };
}

export function formatTimestamp(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${`0${s}`.slice(-2)}`;
}

export function storyboardToScript(storyboard) {
  if (!storyboard) return "";
  const lines = [
    `# ${storyboard.title}`,
    `Estructura: ${storyboard.framework.name}`,
    `Duración objetivo: ${storyboard.duration.label}`,
    "",
  ];
  storyboard.scenes.forEach((scene) => {
    lines.push(
      `## ${scene.order}. ${scene.role} · ${formatTimestamp(scene.start)}-${formatTimestamp(scene.end)} (${scene.seconds}s)`
    );
    lines.push(`Toma: ${scene.shotType}`);
    lines.push(`Visual: ${scene.visual}`);
    lines.push(`B-roll: ${scene.broll.join(", ")}`);
    lines.push("");
    lines.push(`Voz-over: ${scene.voiceover}`);
    if (scene.onScreen) lines.push(`On-screen: ${scene.onScreen}`);
    lines.push("");
  });
  return lines.join("\n");
}
