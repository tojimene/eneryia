import {
  Target,
  Swords,
  UserSearch,
  Brain,
  ListChecks,
  Sparkles,
  Rocket,
  Upload,
  UserCheck,
} from "lucide-react";

export const BRIEF_STEPS = [
  {
    id: "intro",
    title: "Bienvenida",
    subtitle: "Vamos a construir tu ecosistema",
    icon: Sparkles,
    intro: true,
    questions: [],
  },
  {
    id: "inputs",
    title: "Materia prima",
    subtitle: "Sube tu llamada y tu oferta · la IA pre-rellena el brief",
    icon: Upload,
    upload: true,
    questions: [],
  },
  {
    id: "nicho",
    title: "Nicho & problema",
    subtitle: "Parte 0 · Selección de nicho y resolución de problemas",
    icon: Target,
    questions: [
      {
        id: "target",
        label: "Identificación del público objetivo",
        helper:
          "¿A qué grupo de personas o sector buscas ayudar con tu oferta? Describe el perfil ideal (industria, tamaño, ticket).",
        type: "textarea",
        placeholder:
          "Ej: Empresas de servicios B2B con ticket de +3.000€ y facturación mínima de 50k/mes…",
        rows: 4,
      },
      {
        id: "coreProblem",
        label: "Problema central a resolver",
        helper:
          "¿Cuál es el dolor más profundo que tiene este público hoy y que tu oferta resuelve?",
        type: "textarea",
        placeholder:
          "Ej: La falta de un flujo constante y predecible de reuniones cualificadas…",
        rows: 4,
      },
      {
        id: "trends",
        label: "Tendencias del sector",
        helper:
          "Lista los cambios o tendencias que están afectando hoy a tu público objetivo. Suma una por línea.",
        type: "list",
        placeholder: "Ej: Saturación del outbound genérico",
        min: 3,
      },
      {
        id: "pastAttempts",
        label: "Intentos previos de resolverlo",
        helper:
          "¿Cómo intentó tu cliente resolver el problema antes? ¿Por qué esas soluciones fallaron?",
        type: "list",
        placeholder: "Ej: Publicidad pagada · curva larga, leads de baja calidad",
        min: 3,
      },
    ],
  },
  {
    id: "competencia",
    title: "Análisis competitivo",
    subtitle: "Parte 1 · Quién más juega en tu mercado",
    icon: Swords,
    questions: [
      {
        id: "competitors",
        label: "Tus 5 competidores principales",
        helper:
          "Nombre del competidor y la razón por la que destaca. Puedes añadir tantos como quieras.",
        type: "competitors",
        min: 3,
      },
      {
        id: "competitorPositioning",
        label: "Posicionamiento de los competidores",
        helper:
          "¿Cómo posicionan su servicio? Entregables, precios, términos, bonos, garantías…",
        type: "textarea",
        placeholder:
          "Ej: Saleshackers vende paquetes anuales con set-up + 90 días de coaching…",
        rows: 5,
      },
      {
        id: "competitorHeadlines",
        label: "Titulares más usados por la competencia",
        helper:
          "Lista frases reales de sus webs, ads o redes que se repiten en el mercado.",
        type: "list",
        placeholder: "Ej: 'Reuniones garantizadas con decisores B2B'",
        min: 3,
      },
      {
        id: "uniqueMechanism",
        label: "Propuestas únicas / 'Yo ayudo a…'",
        helper:
          "¿Qué propuesta de venta única (USP) o frases tipo 'yo ayudo a…' usan tus competidores?",
        type: "list",
        placeholder: "Ej: 'Ayudamos a agencias a llenar su pipeline en 30 días'",
        min: 3,
      },
      {
        id: "competitorPromises",
        label: "Promesas y reclamos del mercado",
        helper: "¿Qué promesas/claims comparten al hablar con el cliente final?",
        type: "list",
        placeholder: "Ej: '10 reuniones cualificadas al mes garantizadas'",
        min: 3,
      },
      {
        id: "competitorMechanisms",
        label: "Mecanismos de marketing utilizados",
        helper:
          "Funnels con VSL, prospección por LinkedIn, cold email, ManyChat, ads de retargeting…",
        type: "chips",
        suggestions: [
          "Cold email",
          "LinkedIn outbound",
          "VSL + funnel",
          "Ads Meta",
          "Ads YouTube",
          "Webinars",
          "Eventos en vivo",
          "Newsletter",
          "Podcast",
          "Comunidad",
        ],
      },
      {
        id: "testimonialsInsights",
        label: "Qué dicen los testimonios sobre la competencia",
        helper:
          "Reseñas, casos de éxito, comentarios públicos. Tanto positivos como negativos.",
        type: "textarea",
        placeholder:
          "Ej: 'Buen onboarding pero falta acompañamiento en la fase de cierre'…",
        rows: 4,
      },
      {
        id: "competitorChannels",
        label: "Top 3 canales donde se anuncian",
        helper: "Dónde construyen marca: Instagram, YouTube, LinkedIn, X, podcast…",
        type: "chips",
        max: 3,
        suggestions: [
          "Instagram",
          "YouTube",
          "LinkedIn",
          "X / Twitter",
          "TikTok",
          "Podcast",
          "Email",
          "Google Search",
          "Meta Ads",
        ],
      },
      {
        id: "competitorWeaknesses",
        label: "Debilidades aprovechables",
        helper:
          "¿Qué hacen mal o no hacen tus competidores que tú puedes capitalizar?",
        type: "list",
        placeholder: "Ej: No personalizan el outbound, no muestran casos reales…",
        min: 3,
      },
      {
        id: "marketSophistication",
        label: "Nivel de sofisticación del mercado",
        helper:
          "Stage 1: nadie ofrece esto. Stage 5: el mercado está saturado, hay que mecanizar.",
        type: "scale",
        labels: [
          "1 · Mercado virgen",
          "2 · Reclamo directo",
          "3 · Reclamo grande",
          "4 · Mecanismo único",
          "5 · Saturado, todos prometen",
        ],
      },
    ],
  },
  {
    id: "avatar",
    title: "Avatar del cliente",
    subtitle: "Parte 2 · El humano detrás del decisor",
    icon: UserSearch,
    questions: [
      {
        id: "demographics",
        label: "Datos demográficos",
        helper:
          "Género, edad, ingresos, ubicación geográfica, estilo de vida del decisor.",
        type: "textarea",
        placeholder:
          "Ej: Hombre/mujer 30-50 años, fundador o director comercial, ingresos +120k, vive en ciudad…",
        rows: 4,
      },
      {
        id: "stressAtNight",
        label: "Qué le quita el sueño",
        helper:
          "Esos pensamientos que aparecen a las 3 AM: miedos, presiones, dudas existenciales.",
        type: "textarea",
        placeholder: "Ej: 'Si no entran reuniones este mes no llego a payroll'",
        rows: 4,
      },
      {
        id: "frustrations",
        label: "Frustraciones y enemigos cotidianos",
        helper:
          "¿Contra quién/qué está enojado? Sus 3 principales frustraciones diarias.",
        type: "list",
        placeholder:
          "Ej: 'Pierdo horas haciendo follow-up manual sin saber si va a cerrar'",
        min: 3,
      },
      {
        id: "secretDesires",
        label: "Tendencias y deseos secretos",
        helper:
          "Qué tendencias ocurren en su vida, qué desea más que nada pero no dice en voz alta.",
        type: "textarea",
        placeholder:
          "Ej: Quiere que su agencia se valore como una verdadera empresa, no como un freelance senior",
        rows: 4,
      },
      {
        id: "biasAndJargon",
        label: "Sesgos y jerga del nicho",
        helper:
          "¿Cómo toma decisiones? ¿Qué palabras o jerga usa en su mundo profesional?",
        type: "textarea",
        placeholder:
          "Ej: Habla de 'pipeline', 'closing rate', 'ICP', 'SQL/MQL'…",
        rows: 4,
      },
    ],
  },
  {
    id: "transformacion",
    title: "Situación & bloqueos",
    subtitle: "Parte 2 · Del punto A al punto B",
    icon: Brain,
    questions: [
      {
        id: "currentVsDesired",
        label: "Situación actual vs. deseada",
        helper:
          "¿Cómo describiría tu cliente su situación actual? ¿Por qué es dolorosa? ¿Cuál es el escenario ideal?",
        type: "textarea",
        placeholder:
          "Ej: 'Hoy dependo de referidos y mi facturación es impredecible. Quiero un sistema que me dé 20 reuniones/mes…'",
        rows: 5,
      },
      {
        id: "obstacles",
        label: "Obstáculos para llegar al punto B",
        helper:
          "¿Qué le impide alcanzar el escenario deseado por sí mismo? ¿Qué bloqueos siente?",
        type: "list",
        placeholder: "Ej: 'No sé qué decir en LinkedIn sin sonar comercial'",
        min: 3,
      },
      {
        id: "falseBeliefs",
        label: "Creencias erróneas que está comprando",
        helper:
          "Mentiras del mercado que cree: 'el outbound ya no funciona', 'esto es demasiado complejo', etc.",
        type: "list",
        placeholder: "Ej: 'Mi mercado es muy específico, no puedo automatizar'",
        min: 3,
      },
      {
        id: "insiderTopics",
        label: "Temas exclusivos del insider",
        helper:
          "Esos temas que solo entienden quienes están adentro: bloqueos de Facebook, cambios de Google, deliverability de email…",
        type: "list",
        placeholder: "Ej: 'Las restricciones nuevas de LinkedIn para invitaciones'",
        min: 3,
      },
    ],
  },
  {
    id: "ventas",
    title: "Sesiones & ventas",
    subtitle: "Parte 2 · Feedback de llamadas reales",
    icon: Brain,
    optional: true,
    note: "Esta parte es opcional. Complétala solo si ya has tenido sesiones de estrategia o llamadas con potenciales clientes.",
    questions: [
      {
        id: "leadGeneration",
        label: "Cómo has generado tus llamadas hasta ahora",
        helper:
          "Origen de las sesiones de estrategia: outbound, ads, contenido, referidos, networking…",
        type: "textarea",
        placeholder: "Ej: 80% LinkedIn outbound, 15% contenido orgánico, 5% referidos",
        rows: 4,
      },
      {
        id: "winLossPatterns",
        label: "Patrones de clientes que cerraron vs. que rechazaron",
        helper:
          "¿Qué similitudes tienen tus clientes actuales? ¿Qué patrones se repiten en los 'no'?",
        type: "textarea",
        placeholder:
          "Ej: Los que cerraron facturan +80k, llevan +3 años. Los que no, acaban de empezar…",
        rows: 4,
      },
      {
        id: "offerObjections",
        label: "Pitch ganador y objeciones más comunes",
        helper:
          "Cómo describes la oferta cuando cierra + objeciones recurrentes y cómo las gestionas.",
        type: "textarea",
        placeholder:
          "Ej: Pitch: 'Sistema de prospección automatizado que llena tu agenda…'. Objeción: 'es muy caro'…",
        rows: 5,
      },
    ],
  },
  {
    id: "problemas",
    title: "Problemas que resuelves",
    subtitle: "Parte 3 · Mínimo 25 problemas",
    icon: ListChecks,
    questions: [
      {
        id: "problemsSolved",
        label: "Problemas concretos que tu oferta resuelve",
        helper:
          "Lista al menos 25 problemas específicos, no genéricos. Cada uno será materia prima para ads, hooks, landings y email.",
        type: "list",
        placeholder: "Ej: 'No tener un sistema repetible para llenar la agenda mensual'",
        min: 25,
      },
    ],
  },
  {
    id: "avatar-resumen",
    title: "Avatar generado",
    subtitle: "Resumen estructurado antes de activar la fábrica",
    icon: UserCheck,
    summary: true,
    questions: [],
  },
  {
    id: "finish",
    title: "Generar ecosistema",
    subtitle: "Listo para activar tu portal",
    icon: Rocket,
    finish: true,
    questions: [],
  },
];

export function getStepById(id) {
  return BRIEF_STEPS.find((step) => step.id === id);
}

export function isAnswerComplete(question, value) {
  if (!value) return false;

  switch (question.type) {
    case "textarea":
    case "text":
      return value.trim().length >= 10;
    case "list":
      return Array.isArray(value) && value.filter(Boolean).length >= (question.min ?? 1);
    case "competitors":
      return (
        Array.isArray(value) &&
        value.filter((item) => item?.name?.trim()).length >= (question.min ?? 1)
      );
    case "chips":
      return Array.isArray(value) && value.length >= 1;
    case "scale":
      return typeof value === "number" && value >= 1;
    default:
      return false;
  }
}

export function getStepProgress(step, answers) {
  if (!step.questions.length) return { completed: 0, total: 0, percent: 100 };
  const total = step.questions.length;
  const completed = step.questions.filter((question) =>
    isAnswerComplete(question, answers[question.id])
  ).length;
  return {
    completed,
    total,
    percent: Math.round((completed / total) * 100),
  };
}

export function getOverallProgress(answers) {
  const trackable = BRIEF_STEPS.filter(
    (step) => step.questions.length > 0 && !step.optional
  );
  const total = trackable.reduce((sum, step) => sum + step.questions.length, 0);
  const completed = trackable.reduce((sum, step) => {
    return (
      sum +
      step.questions.filter((question) =>
        isAnswerComplete(question, answers[question.id])
      ).length
    );
  }, 0);
  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}
