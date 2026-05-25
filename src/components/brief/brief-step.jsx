"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useBrief } from "@/context/brief-context";
import { isAnswerComplete } from "@/lib/brief-questions";
import { cn } from "@/lib/utils";

import {
  ChipsInput,
  CompetitorsInput,
  ListInput,
  ScaleInput,
  TextareaInput,
} from "./inputs";

function renderInput(question, value, onChange) {
  switch (question.type) {
    case "textarea":
      return (
        <TextareaInput
          value={value}
          onChange={onChange}
          placeholder={question.placeholder}
          rows={question.rows ?? 4}
        />
      );
    case "list":
      return (
        <ListInput
          value={value}
          onChange={onChange}
          placeholder={question.placeholder}
          min={question.min ?? 1}
        />
      );
    case "competitors":
      return (
        <CompetitorsInput
          value={value}
          onChange={onChange}
          min={question.min ?? 3}
        />
      );
    case "chips":
      return (
        <ChipsInput
          value={value}
          onChange={onChange}
          suggestions={question.suggestions ?? []}
          max={question.max}
        />
      );
    case "scale":
      return (
        <ScaleInput
          value={value}
          onChange={onChange}
          labels={question.labels ?? []}
        />
      );
    default:
      return null;
  }
}

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
};

export function BriefStep() {
  const { step, questionIndex, answers, setAnswer, direction } = useBrief();
  const question = step.questions[questionIndex];

  if (!question) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-muted-foreground">
        Esta sección no tiene preguntas configuradas.
      </div>
    );
  }

  const value = answers[question.id];
  const isComplete = isAnswerComplete(question, value);
  const totalQuestions = step.questions.length;

  return (
    <div className="relative">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${step.id}-${question.id}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "relative overflow-hidden rounded-3xl border bg-card/60 glass p-6 lg:p-10",
            isComplete ? "border-primary/50" : "border-border/60"
          )}
        >
          {isComplete && (
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          )}

          <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <span
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-sm font-mono",
                  isComplete
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border/60 bg-card/40 text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <Check className="h-5 w-5" />
                ) : (
                  `0${questionIndex + 1}`.slice(-2)
                )}
              </span>
              <div className="min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-primary/80">
                    {step.subtitle}
                  </p>
                  <Badge variant="outline" className="text-[10px]">
                    {questionIndex + 1} / {totalQuestions}
                  </Badge>
                </div>
                <h2 className="text-2xl font-semibold leading-tight text-foreground lg:text-3xl">
                  {question.label}
                </h2>
                {question.helper && (
                  <p className="max-w-2xl text-sm text-muted-foreground lg:text-base">
                    {question.helper}
                  </p>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {isComplete && <Badge variant="success">Listo</Badge>}
              <Badge variant="neon">
                <Sparkles className="h-3 w-3" />
                IA assist
              </Badge>
            </div>
          </header>

          {step.note && questionIndex === 0 && (
            <div className="mt-5 flex items-start gap-2 rounded-md border border-border/60 bg-card/40 p-3 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span>{step.note}</span>
            </div>
          )}

          <div className="mt-6 lg:mt-8">
            {renderInput(question, value, (next) =>
              setAnswer(question.id, next)
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
