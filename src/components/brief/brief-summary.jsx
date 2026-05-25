"use client";

import { motion } from "framer-motion";
import {
  UserCheck,
  Target,
  Swords,
  Brain,
  Flame,
  Sparkles,
  ArrowRight,
  Pencil,
  Quote,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBrief } from "@/context/brief-context";
import { BRIEF_STEPS, getOverallProgress } from "@/lib/brief-questions";

function asListPreview(value, limit = 5) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === "string" && item.trim()).slice(0, limit);
}

function Section({ icon: Icon, title, hint, children, accent }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 glass p-5 lg:p-6"
    >
      <div
        className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${accent}`}
      />
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
          </div>
        </div>
      </header>
      <div className="mt-4 space-y-3 text-sm text-foreground/90">{children}</div>
    </motion.section>
  );
}

function Bullets({ items }) {
  if (!items.length) {
    return (
      <p className="text-xs italic text-muted-foreground">
        Sin datos · completa esta sección en pasos anteriores.
      </p>
    );
  }
  return (
    <ul className="space-y-1.5">
      {items.map((item, idx) => (
        <li key={`${item}-${idx}`} className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
          <span className="leading-snug">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Empty({ children }) {
  return (
    <p className="text-xs italic text-muted-foreground">
      {children ?? "Sin datos por ahora."}
    </p>
  );
}

export function BriefSummary() {
  const { answers, goToStep, next } = useBrief();
  const overall = getOverallProgress(answers);

  function goToStepById(id) {
    const idx = BRIEF_STEPS.findIndex((step) => step.id === id);
    if (idx >= 0) goToStep(idx);
  }

  const competitors = Array.isArray(answers.competitors)
    ? answers.competitors.filter((item) => item?.name?.trim())
    : [];

  const trends = asListPreview(answers.trends, 6);
  const obstacles = asListPreview(answers.obstacles, 5);
  const frustrations = asListPreview(answers.frustrations, 5);
  const falseBeliefs = asListPreview(answers.falseBeliefs, 5);
  const channels = Array.isArray(answers.competitorChannels)
    ? answers.competitorChannels
    : [];
  const mechanisms = Array.isArray(answers.competitorMechanisms)
    ? answers.competitorMechanisms
    : [];
  const problems = asListPreview(answers.problemsSolved, 6);

  const stage =
    typeof answers.marketSophistication === "number"
      ? answers.marketSophistication
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
            Resumen previo · Eneryia AI
          </p>
          <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
            Tu avatar y mecanismo,{" "}
            <span className="neon-text">listo para activar la fábrica</span>
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground lg:text-base">
            Esto es lo que vamos a inyectar en cada módulo del portal
            (contenido, ads y funnels). Revisalo antes de pulsar “Generar
            ecosistema”.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant={overall.percent === 100 ? "success" : "neon"}>
            {overall.percent}% del brief completado
          </Badge>
          <span className="text-[11px] text-muted-foreground">
            {overall.completed} / {overall.total} preguntas obligatorias
          </span>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Section
          icon={Target}
          title="Avatar & posicionamiento"
          hint="Quién es y dónde lo encontramos"
          accent="from-transparent via-primary to-transparent"
        >
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              ICP
            </p>
            {answers.target ? (
              <p className="mt-1 leading-snug">{answers.target}</p>
            ) : (
              <Empty />
            )}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Demografía
            </p>
            {answers.demographics ? (
              <p className="mt-1 leading-snug">{answers.demographics}</p>
            ) : (
              <Empty />
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToStepById("nicho")}
            className="-ml-2 mt-1 self-start"
          >
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </Button>
        </Section>

        <Section
          icon={Flame}
          title="Dolor & deseo"
          hint="El combustible emocional"
          accent="from-transparent via-[#ff3d71] to-transparent"
        >
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Dolor central
            </p>
            {answers.coreProblem ? (
              <p className="mt-1 leading-snug">{answers.coreProblem}</p>
            ) : (
              <Empty />
            )}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              A las 3 AM piensa
            </p>
            {answers.stressAtNight ? (
              <p className="mt-1 italic leading-snug">
                <Quote className="mr-1 inline h-3 w-3 text-primary" />
                {answers.stressAtNight}
              </p>
            ) : (
              <Empty />
            )}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Deseo secreto
            </p>
            {answers.secretDesires ? (
              <p className="mt-1 leading-snug">{answers.secretDesires}</p>
            ) : (
              <Empty />
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToStepById("avatar")}
            className="-ml-2 mt-1 self-start"
          >
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </Button>
        </Section>

        <Section
          icon={Brain}
          title="Punto A → Punto B"
          hint="El gap que cerramos"
          accent="from-transparent via-[#8a5cff] to-transparent"
        >
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Hoy vs. mañana
            </p>
            {answers.currentVsDesired ? (
              <p className="mt-1 leading-snug">{answers.currentVsDesired}</p>
            ) : (
              <Empty />
            )}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Obstáculos
            </p>
            {obstacles.length ? <Bullets items={obstacles} /> : <Empty />}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToStepById("transformacion")}
            className="-ml-2 mt-1 self-start"
          >
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </Button>
        </Section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section
          icon={Swords}
          title="Competencia y mecanismos"
          hint="Cómo se mueve el mercado"
          accent="from-transparent via-primary to-transparent"
        >
          {competitors.length > 0 ? (
            <ul className="grid gap-2">
              {competitors.slice(0, 5).map((comp) => (
                <li
                  key={comp.name}
                  className="flex items-start justify-between gap-3 rounded-md border border-border/40 bg-card/40 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {comp.name}
                    </p>
                    {comp.reason && (
                      <p className="truncate text-[11px] text-muted-foreground">
                        {comp.reason}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Sin competidores cargados.</Empty>
          )}

          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Mecanismos que usan
            </p>
            {mechanisms.length ? (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {mechanisms.map((mechanism) => (
                  <Badge key={mechanism} variant="violet">
                    {mechanism}
                  </Badge>
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Canales clave
            </p>
            {channels.length ? (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {channels.map((channel) => (
                  <Badge key={channel} variant="neon">
                    {channel}
                  </Badge>
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Sofisticación del mercado
            </p>
            {stage > 0 ? (
              <p className="mt-1 text-sm">
                <span className="font-mono text-primary">Stage {stage}</span>{" "}
                · ajustamos hooks y mecanismo único
              </p>
            ) : (
              <Empty />
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToStepById("competencia")}
            className="-ml-2 mt-1 self-start"
          >
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </Button>
        </Section>

        <Section
          icon={Sparkles}
          title="Frustraciones, creencias y problemas"
          hint="La materia prima para hooks"
          accent="from-transparent via-[#00ffd1] to-transparent"
        >
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Frustraciones cotidianas
            </p>
            {frustrations.length ? (
              <Bullets items={frustrations} />
            ) : (
              <Empty />
            )}
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Creencias erróneas
            </p>
            {falseBeliefs.length ? (
              <Bullets items={falseBeliefs} />
            ) : (
              <Empty />
            )}
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Tendencias del sector
            </p>
            {trends.length ? <Bullets items={trends} /> : <Empty />}
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Problemas que resolvés (top 6)
            </p>
            {problems.length ? <Bullets items={problems} /> : <Empty />}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToStepById("problemas")}
            className="-ml-2 mt-1 self-start"
          >
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </Button>
        </Section>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 animate-pulse-neon">
              <UserCheck className="h-4 w-4 text-primary" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Avatar confirmado
              </p>
              <p className="text-xs text-muted-foreground">
                Cuando pulses generar, este avatar alimenta contenido, ads y
                funnels.
              </p>
            </div>
          </div>
          <Button size="lg" onClick={next}>
            Ir a generar ecosistema
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

    </motion.div>
  );
}
