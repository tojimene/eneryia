"use client";

import Link from "next/link";
import { Brain, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useBrief } from "@/context/brief-context";
import { getOverallProgress } from "@/lib/brief-questions";

const DEMO_TARGET =
  "Fundadores B2B de +5K/mes con ticket de +3.000€ que quieren escalar sin equipo extra";
const DEMO_PROBLEM =
  "Agenda inconsistente y captación dependiente del fundador. No hay sistema, hay esfuerzo.";

export function BriefContextPill() {
  const { answers } = useBrief();
  const overall = getOverallProgress(answers);

  const targetRaw = Array.isArray(answers.target)
    ? answers.target.join(", ")
    : answers.target;
  const problemRaw = Array.isArray(answers.coreProblem)
    ? answers.coreProblem.join(", ")
    : answers.coreProblem;
  const hasTarget = Boolean(targetRaw);
  const hasProblem = Boolean(problemRaw);
  const target = targetRaw || DEMO_TARGET;
  const mechanism = problemRaw || DEMO_PROBLEM;

  // Si el brief está vacío, mostramos un % demo (mock) para no romper el storytelling.
  const percent = overall.percent > 0 ? overall.percent : 62;
  const ready = percent >= 60;
  const usingDemo = !hasTarget && !hasProblem;

  return (
    <Link
      href="/dashboard"
      className="group block overflow-hidden rounded-2xl border border-border/60 bg-card/50 glass p-4 transition-colors hover:border-primary/40 lg:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 animate-pulse-neon">
          <Brain className="h-4 w-4 text-primary" />
        </span>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Conectado al Brief
            </p>
            <Badge variant={ready ? "success" : "violet"}>
              {percent}% del cerebro
            </Badge>
            {usingDemo && <Badge variant="violet">Demo</Badge>}
          </div>
          <div className="grid gap-2 lg:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                ICP
              </p>
              <p className="line-clamp-2 text-xs text-foreground/85">{target}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Problema central
              </p>
              <p className="line-clamp-2 text-xs text-foreground/85">
                {mechanism}
              </p>
            </div>
          </div>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
    </Link>
  );
}
