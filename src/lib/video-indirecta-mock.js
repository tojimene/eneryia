// Genera storyboards educativos (oferta indirecta) más extensos y didácticos que los directos.

import {
  getIndirectaFrameworkById,
  getIndirectaDurationById,
} from "./video-indirecta-frameworks";

const VOICEOVER_TEMPLATES = {
  Promesa: (a) =>
    `En los próximos minutos vas a aprender a aplicar ${(a.benefits || [])[0] || "nuestro sistema de captación"} sin contratar más equipo.`,
  Contexto: () =>
    "Esto es lo que vemos en los fundadores que nos contactan cada semana. Si te suena, este vídeo es para ti.",
  "Lección 1": (a) =>
    `Lección 1: ${(a.benefits || [])[0] || "El 80% del resultado viene de instalar bien el cerebro estratégico"}. Si te saltas este paso, todo lo demás se rompe.`,
  "Lección 2": (a) =>
    `Lección 2: ${(a.benefits || [])[1] || "Contenido + ads + funnels tienen que hablar el mismo idioma"}. Cuando se desincronizan, el ROAS se hunde.`,
  "Lección 3": (a) =>
    `Lección 3: ${(a.benefits || [])[2] || "Mide por cohortes, no por días"}. La diferencia entre ganar y perder dinero está aquí.`,
  "Resumen + CTA": (a) =>
    `Resumen: tres palancas. Brief, alineación, cohortes. Si quieres que lo instalemos por ti, ${a.cta || "reserva tu plaza en Eneryia.net"}.`,
  "Set-up": (a) =>
    `Soy Ricardo, fundador de Agencia Eneryia. ${a.qualifier ? `Trabajo con ${a.qualifier}.` : "Te voy a contar el caso de Arnau."}`,
  Conflicto: () =>
    "Arnau facturaba 28K/mes con un equipo de tres. Llegó un punto donde cada cliente nuevo consumía más energía de la que generaba.",
  Insight: () =>
    "El cuello de botella no era el producto. Era el sistema de captación + cierre.",
  Aprendizaje: (a) =>
    `${a.hook || "Tu agenda no es predecible · tu sistema sí puede serlo"}.`,
  Aplicación: (a) =>
    `Cómo se aplica: ${(a.benefits || []).slice(0, 2).join(" + ") || "brief estratégico + funnels alineados"}. En 30 días empiezas a ver patrones.`,
  "CTA suave": (a) =>
    `Si quieres ver si esto te aplica, ${a.cta || "reserva una llamada en Eneryia.net"}.`,
  Mito: () =>
    "Mito del mercado: 'más ads = más clientes'. Lo escuchas en cada hilo, en cada curso, en cada agencia.",
  "Evidencia mito": () =>
    "Y por eso ves cuentas de Meta con 12 audiencias, 40 creativos, sin patrón. Y ROAS volátil.",
  Verdad: () =>
    "La verdad: el cuello no es el volumen, es la coherencia entre brief → contenido → ads → funnel.",
  "Caso real": () =>
    "Arnau pasó de 28K a 102K en 4 meses bajando creativos pero alineando el mensaje. Mismo presupuesto.",
  "Cómo aplicarlo": (a) =>
    `Cómo aplicarlo: instala el brief estratégico, alinea los 4 canales con el mismo mensaje, y mide por cohortes. ${a.cta || "Reserva tu plaza"}.`,
  CTA: (a) => a.cta || "Reserva tu plaza · Eneryia.net",
  "Intro al framework": () =>
    "Te voy a mostrar el framework Eneryia Loop. Lo usamos con todos nuestros clientes B2B.",
  "Paso 1": (a) =>
    `Paso 1 · Brief Estratégico. ${(a.benefits || [])[0] || "Definimos avatar, dolor y mecanismo único"}. Sin esto, no hay sistema.`,
  "Paso 2": (a) =>
    `Paso 2 · Alineación de canales. ${(a.benefits || [])[1] || "Contenido, ads y funnel hablan el mismo idioma"}.`,
  "Paso 3": (a) =>
    `Paso 3 · Optimización por cohortes. ${(a.benefits || [])[2] || "Medimos por cohortes, no por día"}.`,
  "Resultado típico": () =>
    "Resultado típico: en 90 días, los fundadores duplican la facturación sin aumentar el equipo.",
  "Resultado primero": (a) =>
    `${a.hook || "De 28K/mes a 102K/mes en 4 meses · mismo equipo"}.`,
  Cliente: () =>
    "Arnau, fundador de una empresa B2B en Madrid. Llevaba 18 meses estancado en los 28K mensuales.",
  Acción1: (a) =>
    `Primera intervención: ${(a.benefits || [])[0] || "instalamos el brief estratégico"}.`,
  "Acción 1": (a) =>
    `Primera intervención: ${(a.benefits || [])[0] || "instalamos el brief estratégico"}.`,
  "Acción 2": (a) =>
    `Segunda intervención: ${(a.benefits || [])[1] || "alineamos contenido + ads + funnels al mismo mensaje"}.`,
  Resultado: () =>
    "Mes 4: cerró 102K. Mes 6: cerró 110K. Sin contratar a nadie. Sin gastar más en ads.",
  "Cómo replicarlo": (a) =>
    `${a.cta || "Reserva tu plaza en Eneryia.net"} y lo replicamos en tu negocio.`,
  "Hook + promesa": (a) =>
    `${a.hook || "Tu agenda no es predecible. Tu sistema sí puede serlo"}.`,
  Diagnóstico: (a) =>
    `Si estás aquí es porque ${a.qualifier || "facturas 5 cifras pero el crecimiento se siente cuesta arriba"}.`,
  "Por qué no funcionó antes": () =>
    "Lo que probaste no funcionó porque atacaba solo una palanca. Más ads. Más contenido. Más cierre. Suelto.",
  "Mecanismo único": (a) =>
    `Nuestro mecanismo: ${(a.benefits || []).slice(0, 2).join(" + ") || "Brief + Alineación + Cohortes"}. Las tres a la vez.`,
  Demostración: () =>
    "Mira el dashboard: así se ve un cliente nuestro un mes después de la implementación.",
  "Prueba social": () =>
    "Arnau, Pau, Higini, Felipe. Todos fundadores B2B. Todos cerraron sus mejores meses en menos de 120 días.",
  Oferta: () =>
    "Programa de 90 días: instalación completa del sistema. Brief + contenido + ads + funnels.",
  "CTA + urgencia": (a) =>
    `Tenemos 4 plazas este trimestre. ${a.cta || "Resérvala en Eneryia.net"}.`,
};

const ON_SCREEN_TEMPLATES = {
  Promesa: () => "LO QUE VAS A APRENDER",
  Contexto: () => "EL PATRÓN QUE SE REPITE",
  "Lección 1": () => "LECCIÓN 01 · BRIEF",
  "Lección 2": () => "LECCIÓN 02 · ALINEACIÓN",
  "Lección 3": () => "LECCIÓN 03 · COHORTES",
  "Resumen + CTA": (a) => (a.cta || "RESERVA TU PLAZA").toUpperCase(),
  "Set-up": () => "RICARDO · AGENCIA ENERYIA",
  Conflicto: () => "28K/MES · ESTANCADO",
  Insight: () => "EL CUELLO ≠ EL PRODUCTO",
  Aprendizaje: (a) => (a.hook || "EL SISTEMA > EL ESFUERZO").toUpperCase().slice(0, 60),
  Aplicación: () => "PASOS CONCRETOS",
  "CTA suave": (a) => (a.cta || "RESERVA").toUpperCase(),
  Mito: () => "MITO · 'MÁS ADS = MÁS CLIENTES'",
  "Evidencia mito": () => "POR QUÉ SE CREE",
  Verdad: () => "LA REALIDAD",
  "Caso real": () => "ARNAU · 28K → 102K",
  "Cómo aplicarlo": () => "CÓMO APLICARLO",
  CTA: (a) => (a.cta || "RESERVA TU PLAZA").toUpperCase(),
  "Intro al framework": () => "ENERYIA LOOP",
  "Paso 1": () => "01 · BRIEF",
  "Paso 2": () => "02 · ALINEACIÓN",
  "Paso 3": () => "03 · COHORTES",
  "Resultado típico": () => "x2 EN 90 DÍAS",
  "Resultado primero": () => "28K → 102K · 4 MESES",
  Cliente: () => "ARNAU · MADRID",
  "Acción 1": () => "BRIEF ESTRATÉGICO",
  "Acción 2": () => "ALINEACIÓN 4 CANALES",
  Resultado: () => "102K · 110K · SIN EQUIPO EXTRA",
  "Cómo replicarlo": (a) => (a.cta || "RESERVA").toUpperCase(),
  "Hook + promesa": (a) => (a.hook || "SISTEMA INSTALADO").toUpperCase().slice(0, 60),
  Diagnóstico: () => "DÓNDE ESTÁS HOY",
  "Por qué no funcionó antes": () => "EL FALLO COMÚN",
  "Mecanismo único": () => "ENERYIA LOOP",
  Demostración: () => "EN VIVO · DASHBOARD",
  "Prueba social": () => "CASOS REALES",
  Oferta: () => "PROGRAMA · 90 DÍAS",
  "CTA + urgencia": () => "4 PLAZAS · TRIMESTRE",
};

const VISUAL_TEMPLATES = {
  TALKING_HEAD: "Fundador a cámara · plano medio · fondo oscuro con luz suave",
  B_ROLL: "Imagen de apoyo · datos en pantalla · transición suave",
  TEXT_OVERLAY: "Pantalla negra · tipografía gigante en blanco/neon",
  SCREEN_RECORD: "Captura del dashboard Agencia Eneryia · zoom progresivo",
  PATTERN_INTERRUPT: "Cambio de plano · flash · sonido marcador",
  TESTIMONIAL: "Cliente real a cámara · sonido directo · subtitular con nombre",
  CTA_CARD: "Logo Agencia Eneryia + texto CTA + flecha pulsante",
};

const BROLL_LIBRARY = [
  "Dashboard Agencia Eneryia con datos reales",
  "Fundador revisando métricas en Notion",
  "Pantalla de calendario lleno",
  "Print de Stripe con pagos entrantes",
  "Equipo en reunión semanal por Loom",
  "Print del WhatsApp con cliente confirmando",
  "B-roll de pizarra con framework Eneryia Loop",
  "Print de cohortes que escalan mes a mes",
];

let counter = 7000;

export function buildIndirectaStoryboard({ frameworkId, durationId, angle }) {
  const framework = getIndirectaFrameworkById(frameworkId);
  const duration = getIndirectaDurationById(durationId);
  if (!framework || !duration) return null;

  const totalSeconds = duration.seconds;
  let cursor = 0;

  const scenes = framework.beats.map((beat, idx) => {
    const sceneSeconds = Math.max(4, Math.round(totalSeconds * beat.weight));
    const start = cursor;
    const end = Math.min(totalSeconds, cursor + sceneSeconds);
    cursor = end;

    counter += 1;
    const voiceover = (VOICEOVER_TEMPLATES[beat.role] || (() => "—"))(angle);
    const onScreen = (ON_SCREEN_TEMPLATES[beat.role] || (() => ""))(angle);
    const visual = VISUAL_TEMPLATES[beat.shot] || "Visual sugerido";
    const broll = [
      BROLL_LIBRARY[idx % BROLL_LIBRARY.length],
      BROLL_LIBRARY[(idx + 3) % BROLL_LIBRARY.length],
    ];

    return {
      id: `LSN-${counter}`,
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

  const last = scenes[scenes.length - 1];
  if (last && last.end !== totalSeconds) {
    last.end = totalSeconds;
    last.seconds = last.end - last.start;
  }

  return {
    id: `STB-INS-${Date.now()}`,
    frameworkId,
    durationId,
    totalSeconds,
    scenes,
    title:
      angle?.hook?.slice(0, 60) || `${framework.name} · ${duration.label}`,
    framework,
    duration,
    kind: "indirecta",
  };
}

export function regenerateIndirectaScene(storyboard, sceneId, angle) {
  return {
    ...storyboard,
    scenes: storyboard.scenes.map((scene) => {
      if (scene.id !== sceneId) return scene;
      counter += 1;
      const voiceover = (VOICEOVER_TEMPLATES[scene.role] || (() => "—"))(angle);
      const onScreen = (ON_SCREEN_TEMPLATES[scene.role] || (() => ""))(angle);
      return {
        ...scene,
        id: `LSN-${counter}`,
        voiceover,
        onScreen,
        broll: [
          BROLL_LIBRARY[Math.floor(Math.random() * BROLL_LIBRARY.length)],
          BROLL_LIBRARY[Math.floor(Math.random() * BROLL_LIBRARY.length)],
        ],
      };
    }),
  };
}
