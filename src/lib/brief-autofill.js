// Simulación de autofill IA usado por la demo del martes.
// En producción, esto debería llamar a un endpoint que use LLM + transcripción.

export const SAMPLE_CALL_TRANSCRIPT = `Tomás Jiménez [00:00]: Hola Ricardo, gracias por sumarte.
Cliente Eneryia [00:08]: Nada nada, te cuento lo que necesito. Quiero un sistema
de captación predecible para mi consultoría de agencias B2B con ticket de +3000€.
Hoy dependo de referidos y mi pipeline es impredecible.
Tomás [00:32]: Entiendo. ¿Qué probaste antes?
Cliente [00:40]: Ads de Meta, comerciales internos, herramientas de cold email.
Todo terminó en leads de baja calidad o cuentas bloqueadas. Sobre todo me jode
no poder controlar la entregabilidad de los correos y el algoritmo de LinkedIn
que cada vez restringe más.
Tomás [01:25]: ¿Quién compite contigo hoy?
Cliente [01:30]: Saleshackers, Flows, Agency Go To Market, Prospección 995 y
Bastida y Fariña. Sobre todo Flows con su branding premium me hace ruido.
Cliente [02:10]: Mi cliente ideal factura 50k al mes mínimo, B2B, vive online,
le gusta el contenido en LinkedIn, tiene 35-50 años y le quita el sueño no
saber de dónde va a salir el próximo cliente.`;

export const SAMPLE_OFFER_DOC = `OFERTA · ENERYIA AGENCY (V1)

Programa: Instalamos sistemas de captación y backend para escalar con equipo
minimalista y márgenes altos.

ICP: Agencias / coaching / consultoría con facturación >5K/mes.
Ticket de servicio: +3000€.

Mecanismo: Ecosistema de marketing automatizado · contenido + ads + funnels
construido sobre un brief estratégico unificado.

Entregables: Sistema instalado en 30 días, swipes ganadores, plantillas de
landings, secuencias de email, formación + soporte.

Resultado promedio (casos): 28K-110K/mes según vertical.

Precio: 15.000€.`;

export const AUTOFILL_STAGES = [
  { label: "Transcribiendo y limpiando llamada", ms: 800 },
  { label: "Detectando ICP, ticket y vertical", ms: 900 },
  { label: "Extrayendo dolores y deseos del prospecto", ms: 1000 },
  { label: "Mapeando competencia mencionada", ms: 900 },
  { label: "Cruzando con documento de oferta", ms: 800 },
  { label: "Generando hipótesis iniciales del brief", ms: 900 },
];

// Devuelve un mock de respuestas pre-rellenadas que se mergean en el brief.
export function buildAutofillFromSources(sources) {
  const hasCall = sources?.callTranscript?.text?.trim().length > 0;
  const hasOffer = sources?.offerDoc?.text?.trim().length > 0;

  if (!hasCall && !hasOffer) return {};

  return {
    target:
      "Agencias, coaching y consultoras B2B con ticket de servicio +3.000€ y facturación mínima de 50K/mes. Fundadores 35-50 años activos en LinkedIn.",
    coreProblem:
      "Falta de un flujo constante y predecible de reuniones cualificadas con decisores reales. Hoy dependen de referidos, ads caros o herramientas que se bloquean.",
    trends: [
      "Saturación del outbound genérico · los copys plantilla ya no funcionan",
      "LinkedIn limita invitaciones y monitoriza la automatización",
      "Mayor escrutinio sobre privacidad y deliverability de email",
      "Ciclo de decisión más largo en servicios de ticket alto",
      "Uso creciente de IA en prospección y personalización",
    ],
    pastAttempts: [
      "Ads pagados sin estrategia clara · leads no decisores",
      "Comerciales internos · curva de aprendizaje larga y costes fijos",
      "Agencias de leads que venden volumen, no reuniones",
      "Herramientas de automatización masiva · cuentas bloqueadas",
      "Networking y referidos · imprevisible y no escalable",
    ],
    competitors: [
      { name: "Saleshackers", reason: "Reputación y expertise en outbound" },
      {
        name: "Flows",
        reason: "Branding premium y metodología clara",
      },
      {
        name: "Agency Go To Market",
        reason: "Enfoque en LinkedIn + garantías",
      },
      {
        name: "Prospección 995",
        reason: "Propuesta de reuniones garantizadas",
      },
      {
        name: "Bastida & Fariña",
        reason: "Casos de éxito agresivos en redes",
      },
    ],
    competitorHeadlines: [
      "Reuniones garantizadas con decisores B2B",
      "De 0 a 10K MRR con outbound + LinkedIn",
      "Llenamos tu pipeline con tu cliente ideal",
    ],
    competitorMechanisms: [
      "Cold email",
      "LinkedIn outbound",
      "VSL + funnel",
      "Webinars",
    ],
    competitorChannels: ["LinkedIn", "YouTube", "Instagram"],
    marketSophistication: 4,
    demographics:
      "Fundador o director comercial, 35-50 años, ingresos +120K, ciudad principal, activo en LinkedIn, lector de newsletters de marketing.",
    stressAtNight:
      "Si no entran reuniones este mes no llego a payroll. Y si entran, ¿podré cumplir sin reventar al equipo?",
    frustrations: [
      "Horas perdidas en follow-up manual sin saber si va a cerrar",
      "Leads que no decidían y agendas vacías la semana siguiente",
      "Sentir que el negocio depende de él y no del sistema",
    ],
    secretDesires:
      "Que su agencia se valore como una verdadera empresa con sistema, no como un freelance senior con suerte. Un pipeline tan estable que pueda viajar un mes sin tocar el negocio.",
    biasAndJargon:
      "Habla de pipeline, closing rate, ICP, SQL/MQL, AOV, churn, MRR. Toma decisiones por casos de éxito y prueba social, no por features.",
    currentVsDesired:
      "Hoy facturación impredecible y agenda llena por referidos. Quiere 20+ reuniones cualificadas al mes con decisores +50K MRR.",
    obstacles: [
      "No sabe qué decir en LinkedIn sin sonar comercial",
      "No tiene un sistema para pre-cualificar antes de la llamada",
      "Falta de copy/ángulos que conviertan en su vertical",
    ],
    falseBeliefs: [
      "El outbound ya no funciona en mi nicho",
      "Mi servicio es demasiado específico para automatizar",
      "Si automatizo, pierdo el toque humano que me hace cerrar",
    ],
    insiderTopics: [
      "Restricciones nuevas de LinkedIn para invitaciones",
      "Deliverability de email y warm-up de dominios",
      "Cambios en algoritmos de Meta que rompen campañas",
    ],
  };
}
