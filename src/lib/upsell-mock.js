// Catálogo de upsells post-compra con métricas históricas.

export const UPSELL_OFFERS = [
  {
    id: "ups-coaching",
    name: "Coaching ejecutivo 1:1 · 4 sesiones",
    framework: "Bigger Better Faster",
    badge: "Más vendido",
    badgeTone: "neon",
    summary:
      "4 sesiones 1:1 con Ricardo y el equipo Eneryia para acelerar la implementación del sistema.",
    bullets: [
      "Diagnóstico inicial + 3 sesiones de seguimiento mensuales",
      "Acceso directo por WhatsApp para dudas tácticas",
      "Revisiones de tu funnel, ads y contenido cada quincena",
      "Plantillas privadas que no entregamos en el programa base",
    ],
    price: "1.497€",
    oldPrice: "2.997€",
    discountLabel: "50% solo en esta página",
    cta: "Sí, lo añado al programa",
    declineCta: "No, gracias · seguir sin coaching",
    timer: 600,
    conversion: 32,
    avgRevenue: 478,
  },
  {
    id: "ups-funnel-pro",
    name: "Funnel Pro · landings VSL + Dossier",
    framework: "Más profundo",
    badge: "Recomendado",
    badgeTone: "violet",
    summary:
      "Te montamos las 4 landings críticas (VSL compra, dossier, opt-in y upsell) personalizadas con tu brief.",
    bullets: [
      "4 landings completas listas para publicar",
      "Integración con tu stack (Stripe, Calendly, Notion)",
      "Tests A/B activos durante el primer mes",
      "Hand-off documentado en Loom para tu equipo",
    ],
    price: "1.997€",
    oldPrice: "3.997€",
    discountLabel: "Pack solo disponible aquí",
    cta: "Sí, quiero las landings montadas",
    declineCta: "No, las monto yo después",
    timer: 900,
    conversion: 24,
    avgRevenue: 479,
  },
  {
    id: "ups-setter",
    name: "Setter IA + integración CRM",
    framework: "Velocidad",
    badge: "Acelerador",
    badgeTone: "success",
    summary:
      "Setter IA conectado a tu agenda. Califica leads en menos de 4 minutos y reserva en Calendly.",
    bullets: [
      "Setter IA entrenado con tu brief y tus objeciones",
      "Conexión con Calendly + tu CRM (HubSpot, Pipedrive, Notion)",
      "Reglas anti-spam y horario configurable",
      "Dashboard de calidad de leads con NPS automatizado",
    ],
    price: "997€",
    oldPrice: "1.997€",
    discountLabel: "Activación solo en este pedido",
    cta: "Sí, activar setter IA",
    declineCta: "No, no me hace falta ahora",
    timer: 540,
    conversion: 41,
    avgRevenue: 408,
  },
];

export const UPSELL_GENERATION_STAGES = [
  { label: "Mapeando producto base + ticket", ms: 500 },
  { label: "Buscando upsells con afinidad >65%", ms: 700 },
  { label: "Calculando precio y descuento óptimo", ms: 600 },
  { label: "Generando copy y CTA", ms: 700 },
  { label: "Renderizando preview del flujo", ms: 500 },
];

export function getUpsellById(id) {
  return UPSELL_OFFERS.find((u) => u.id === id);
}
