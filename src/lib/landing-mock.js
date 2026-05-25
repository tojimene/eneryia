// Genera el copy completo de la landing a partir de la config + brief.
// Cada sección produce un bloque listo para renderizar.

import { getTemplateById } from "./landing-templates";

const TESTIMONIALS = [
  {
    name: "Arnau Ferrer",
    role: "Fundador · agencia B2B",
    quote:
      "Pasamos de 28K a 102K mensuales en 4 meses sin contratar a nadie. El sistema hace el trabajo que antes hacía yo.",
    stat: "+264% facturación",
  },
  {
    name: "Pau Escrig",
    role: "Consultor · servicios IA",
    quote:
      "El mes pasado cerré 110K. Lo que más me ha sorprendido es que dejé de pasarme las tardes en llamadas que no convertían.",
    stat: "110K en 1 mes",
  },
  {
    name: "Higini More",
    role: "Fundador · servicios premium",
    quote:
      "Cerramos un ticket de 30.000€ la segunda semana. La estructura del funnel hizo lo que mi equipo de ventas no podía hacer.",
    stat: "Ticket de 30K",
  },
  {
    name: "Pablo Tregon",
    role: "Operador · servicios profesionales",
    quote:
      "724€ en ads se convirtieron en 40K en facturación. La diferencia: el ángulo del Brief, no el presupuesto.",
    stat: "ROAS 55x",
  },
];

const MEDIA_LOGOS = [
  "Forbes España",
  "El Referente",
  "Emprendedores",
  "Hipertextual",
  "BeBeyond",
  "Marketing4eCommerce",
];

const FAQ_BANK = [
  {
    q: "¿Cuánto tarda en estar todo instalado?",
    a: "Entre 7 y 14 días para tener el Brief, el Contenido y los Ads operativos. El funnel completo en 30 días.",
  },
  {
    q: "¿Necesito tener equipo propio?",
    a: "No. La idea precisamente es que el sistema funcione con el equipo mínimo que ya tienes. Si decides escalar, podemos formar al equipo que sumes.",
  },
  {
    q: "¿Sirve si todavía no facturo 5K al mes?",
    a: "Honestamente, no. Este programa está pensado para negocios con tracción mínima de 5K mensuales y ticket alto. Si estás validando, te recomendamos primero estabilizar la oferta.",
  },
  {
    q: "¿Qué pasa si no veo resultados?",
    a: "Tienes una garantía de 30 días. Si después del primer mes no has firmado al menos un cliente nuevo bajo el sistema, te devolvemos el dinero íntegro.",
  },
  {
    q: "¿Cómo se cobra el programa?",
    a: "Un pago único o tres cuotas mensuales. Sin permanencia, sin letra pequeña.",
  },
];

let counter = 4000;
function nextId(prefix) {
  counter += 1;
  return `${prefix}-${counter}`;
}

function fallback(value, demo) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ") || demo;
  if (typeof value === "string" && value.trim().length > 0) return value;
  return demo;
}

export function buildLanding({ templateId, config, angle, brief, mode = "compra-vsl" }) {
  const template = getTemplateById(templateId);
  if (!template) return null;

  const isOptin = mode.startsWith("optin");

  const target = fallback(
    brief?.target,
    "Fundadores B2B con facturación de 5K+ al mes y ticket de 3.000€"
  );
  const coreProblem = fallback(
    brief?.coreProblem,
    "La captación depende del fundador y la agenda no es predecible. No hay sistema, hay esfuerzo."
  );

  const benefitsRaw =
    angle?.benefits?.filter((b) => b && b.trim().length > 0) ?? [];
  const benefits =
    benefitsRaw.length >= 3
      ? benefitsRaw
      : [
          "Brief estratégico instalado en 7 días",
          "Contenido + Ads + Funnels alineados al avatar",
          "Primer cierre extra en menos de 30 días",
        ];

  const hook =
    angle?.hook?.trim() ||
    (isOptin
      ? "Descubre el sistema que usan 14 fundadores para escalar sin equipo extra."
      : "El sistema que convierte tu marca en un negocio predecible.");
  const qualifier =
    angle?.qualifier?.trim() ||
    "Para fundadores B2B de +5K/mes con ticket de +3.000€";
  const cta =
    angle?.cta?.trim() ||
    (isOptin ? "Quiero el dossier gratis" : "Reserva tu plaza ahora");
  const offerName = config?.offerName?.trim() || "Programa Eneryia Loop";
  const price = config?.price || "2.997€";
  const oldPrice = config?.oldPrice || "6.997€";
  const guaranteeDays = config?.guaranteeDays || 30;
  const deadline = config?.deadline || "Plazas abiertas hasta el viernes";
  const leadMagnetName =
    config?.leadMagnetName?.trim() || "Dossier Eneryia Loop · 14 páginas";
  const webinarDate = config?.webinarDate?.trim() || "Jueves 19:00h · directo en Zoom";

  const sections = {
    hero: {
      id: nextId("HERO"),
      eyebrow: isOptin ? "Recurso gratuito · Agencia Eneryia" : "Programa · Agencia Eneryia",
      headline: hook,
      subhead: isOptin
        ? `Descarga el dossier y descubre cómo ${benefits[0].toLowerCase()}.`
        : `Instalamos en tu negocio el sistema que ${benefits[0].toLowerCase()}.`,
      qualifier,
      cta,
      ctaSecondary: isOptin ? "Sin spam · te llega al email" : "Mira primero el vídeo",
    },
    vsl: {
      id: nextId("VSL"),
      title: "Cómo funciona Eneryia Loop en 8 minutos",
      duration: "8:24",
      thumbnailHook: hook,
      poster: target,
      cta,
    },
    logos: {
      id: nextId("LOGOS"),
      label: "Como se ha visto en",
      items: MEDIA_LOGOS,
    },
    problem: {
      id: nextId("PROB"),
      title: "Si te pasa esto, sigue leyendo",
      items: [
        coreProblem,
        "Has probado más ads, más contenido, más SDRs. La curva de aprendizaje siempre se come el resultado.",
        "Cada mes hay un cliente nuevo que casi cierra y se cae. No sabes exactamente por qué.",
        "Tu agenda manda. Si tú no abres WhatsApp el lunes, no pasa nada.",
      ],
    },
    story: {
      id: nextId("STORY"),
      title: "La historia detrás de Eneryia",
      paragraphs: [
        "Antes de Eneryia, pasamos 18 meses construyendo el sistema con nuestros propios negocios. Probamos lo que vendían los gurús y casi nada funcionaba.",
        "Cuando juntamos las cuatro piezas (Brief · Contenido · Ads · Funnel) en un único cerebro, todo cambió. Mismo equipo, mismo presupuesto, x3 en facturación.",
        "Hoy lo replicamos con fundadores que comparten el mismo perfil. Y el patrón se repite.",
      ],
    },
    transformation: {
      id: nextId("TRANS"),
      title: "Antes y después con Eneryia",
      before: [
        "Una manada de creativos sin patrón",
        "Bot que no sabe cuándo callarse",
        "Ventas dependientes del fundador",
        "Métricas que no dicen nada",
      ],
      after: benefits,
    },
    benefits: {
      id: nextId("BEN"),
      title: "Qué consigues con el sistema instalado",
      items: benefits.map((b, i) => ({
        title: b,
        description: [
          "Definimos avatar, dolor, mecanismo y prueba social en un único documento que alimenta todo el sistema.",
          "Cada canal habla el mismo idioma. Cero dispersión.",
          "Empiezas a ver patrones reales en menos de 30 días.",
        ][i] || "Sistema instalado y operando.",
      })),
    },
    proof: {
      id: nextId("PROOF"),
      title: "Lo que dicen quienes ya lo han instalado",
      testimonials: TESTIMONIALS,
    },
    process: {
      id: nextId("PROC"),
      title: "Cómo trabajamos contigo",
      steps: [
        { title: "Semana 1", description: "Brief estratégico instalado. Avatar, dolor y promesa única definidos." },
        { title: "Semanas 2-3", description: "Contenido y ads en marcha. 6 formatos ganadores activos." },
        { title: "Semana 4", description: "Funnels VSL + dossier desplegados. Sistema operativo." },
        { title: "Mes 2 en adelante", description: "Optimización por cohortes. Iteramos lo que funciona." },
      ],
    },
    stack: {
      id: nextId("STACK"),
      title: "Lo que incluye el programa",
      items: [
        { label: "Brief estratégico (cerebro)", value: "997€" },
        { label: "Motor de contenido (largo + corto)", value: "1.497€" },
        { label: "Motor de ads (estáticos + vídeo)", value: "1.997€" },
        { label: "Funnels VSL + Dossier + Upsells", value: "1.797€" },
        { label: "Setter IA conectado al calendario", value: "697€" },
        { label: "Soporte directo con el equipo Eneryia", value: "Incluido" },
      ],
      totalLabel: "Valor total del paquete",
      total: oldPrice,
    },
    offer: {
      id: nextId("OFFER"),
      title: offerName,
      tagline: "Instalación completa en 30 días",
      items: benefits.concat([
        "Setter IA conectado a tu calendario",
        "Soporte directo con el equipo Eneryia",
      ]),
      oldPrice,
      price,
      paymentNote: "Pago único o 3 cuotas sin intereses",
    },
    guarantee: {
      id: nextId("GUAR"),
      days: guaranteeDays,
      title: `Garantía sin letra pequeña · ${guaranteeDays} días`,
      description:
        "Si después del primer mes no has firmado al menos un cliente nuevo con el sistema, te devolvemos íntegro el importe. Sin preguntas. Sin formularios eternos.",
    },
    urgency: {
      id: nextId("URG"),
      title: deadline,
      description:
        "Trabajamos con un máximo de 6 fundadores por trimestre para garantizar el resultado. Cuando se llenan las plazas, cerramos hasta el siguiente trimestre.",
      slotsLeft: 3,
    },
    cta: {
      id: nextId("CTA"),
      title: "¿Listo para instalar el sistema?",
      description:
        "30 minutos contigo, sin venta agresiva. Si encaja, te lo decimos. Si no, también.",
      cta,
      ctaSub: "Sin compromiso · cancelas cuando quieras",
    },
    faq: {
      id: nextId("FAQ"),
      title: "Preguntas frecuentes",
      items: FAQ_BANK,
    },
    leadMagnet: {
      id: nextId("LM"),
      title: `Qué te llevas al instante`,
      assetName: leadMagnetName,
      assetType: "PDF + plantilla Notion",
      pages: 14,
      duration: "12 min de lectura",
      bullets: benefits.concat([
        "Plantilla editable lista para clonar en Notion",
        "Checklist de implementación semana a semana",
      ]),
    },
    form: {
      id: nextId("FORM"),
      title: isOptin
        ? "Recibe el dossier en tu email"
        : "Recibe acceso al programa",
      subtitle: "Sin spam · puedes darte de baja cuando quieras",
      fields: [
        { id: "name", label: "Nombre", placeholder: "Tu nombre" },
        { id: "email", label: "Email profesional", placeholder: "tu@empresa.com" },
        { id: "company", label: "Empresa · facturación mensual", placeholder: "Eneryia · 28K/mes" },
      ],
      cta,
      consent: "Acepto recibir comunicaciones de Agencia Eneryia",
    },
    agenda: {
      id: nextId("AGD"),
      title: "Qué vamos a ver en la sesión",
      date: webinarDate,
      duration: "75 min · directo + Q&A",
      items: [
        { time: "00:00", title: "Diagnóstico", description: "Por qué los SDR no escalan tu agenda" },
        { time: "00:15", title: "Mecanismo", description: "El loop Brief · Contenido · Ads · Funnel" },
        { time: "00:35", title: "Caso real", description: "Cómo Arnau pasó de 28K a 102K en 4 meses" },
        { time: "00:55", title: "Implementación", description: "Pasos para instalarlo en 30 días" },
        { time: "01:10", title: "Q&A", description: "Preguntas en directo + plazas limitadas" },
      ],
    },
  };

  // Solo devolvemos las secciones que la plantilla activa.
  const activeSections = template.sections
    .map((id) => ({ id, content: sections[id] }))
    .filter((s) => Boolean(s.content));

  return {
    id: nextId("LP"),
    templateId,
    template,
    mode,
    isOptin,
    title: hook,
    sections: activeSections,
    target,
    coreProblem,
    config: {
      offerName,
      price,
      oldPrice,
      guaranteeDays,
      deadline,
      leadMagnetName,
      webinarDate,
    },
  };
}

export function regenerateSection(landing, sectionId, brief, angle) {
  if (!landing) return landing;
  const fresh = buildLanding({
    templateId: landing.templateId,
    config: landing.config,
    angle,
    brief,
    mode: landing.mode,
  });
  if (!fresh) return landing;
  return {
    ...landing,
    sections: landing.sections.map((s) =>
      s.id === sectionId
        ? fresh.sections.find((fs) => fs.id === sectionId) || s
        : s
    ),
  };
}

export function landingToMarkdown(landing) {
  if (!landing) return "";
  const lines = [`# ${landing.title}`, `Plantilla: ${landing.template.name}`, ""];
  landing.sections.forEach(({ id, content }) => {
    lines.push(`## ${id.toUpperCase()}`);
    Object.entries(content).forEach(([k, v]) => {
      if (k === "id") return;
      if (Array.isArray(v)) {
        lines.push(`### ${k}`);
        v.forEach((item) => {
          if (typeof item === "string") {
            lines.push(`- ${item}`);
          } else if (item.title || item.label || item.q || item.name) {
            const head = item.title || item.label || item.q || item.name;
            const body =
              item.description || item.value || item.a || item.quote || "";
            lines.push(`- **${head}**: ${body}`);
          }
        });
      } else if (typeof v === "object" && v !== null) {
        lines.push(`### ${k}`);
        lines.push(JSON.stringify(v, null, 2));
      } else if (v) {
        lines.push(`**${k}:** ${v}`);
      }
    });
    lines.push("");
  });
  return lines.join("\n");
}
