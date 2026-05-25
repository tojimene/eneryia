"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  FileText,
  UploadCloud,
  Sparkles,
  Loader2,
  Check,
  RefreshCw,
  ArrowRight,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useBrief } from "@/context/brief-context";
import {
  AUTOFILL_STAGES,
  buildAutofillFromSources,
  SAMPLE_CALL_TRANSCRIPT,
  SAMPLE_OFFER_DOC,
} from "@/lib/brief-autofill";
import { cn } from "@/lib/utils";

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function SourceCard({
  icon: Icon,
  title,
  description,
  source,
  onChange,
  onLoadSample,
  placeholder,
  fileAccept,
  accentClass,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const wordCount = source.text.trim().split(/\s+/).filter(Boolean).length;
  const isReady = wordCount > 20;

  async function handleFiles(fileList) {
    const file = fileList?.[0];
    if (!file) return;
    try {
      const text = await readFile(file);
      onChange({
        text,
        filename: file.name,
        processedAt: new Date().toISOString(),
      });
    } catch {
      // ignore
    }
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card/60 glass p-5 transition-colors",
        isReady ? "border-primary/40" : "border-border/60"
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 -top-px h-px bg-gradient-to-r",
          accentClass
        )}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        {isReady ? (
          <Badge variant="success">
            <Check className="h-3 w-3" />
            Listo
          </Badge>
        ) : (
          <Badge variant="outline">Pendiente</Badge>
        )}
      </div>

      <label
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "mt-4 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed py-5 text-center transition-colors",
          isDragging
            ? "border-primary/60 bg-primary/10"
            : "border-border/60 bg-card/30 hover:border-primary/40"
        )}
      >
        <UploadCloud className="h-5 w-5 text-primary" />
        <span className="text-xs font-medium text-foreground/90">
          Soltá un archivo o hacé clic para subir
        </span>
        <span className="text-[11px] text-muted-foreground">
          {fileAccept} · {source.filename ? source.filename : "sin archivo"}
        </span>
        <input
          type="file"
          accept={fileAccept}
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </label>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            o pega el contenido
          </span>
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[11px] font-medium text-primary hover:underline"
          >
            Usar ejemplo demo
          </button>
        </div>
        <Textarea
          value={source.text}
          onChange={(event) =>
            onChange({ text: event.target.value, filename: source.filename })
          }
          placeholder={placeholder}
          rows={5}
          className="font-mono text-xs"
        />
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>
            {wordCount} palabras{" "}
            {wordCount < 20 && (
              <span className="text-yellow-300/80">· mín. 20 para IA</span>
            )}
          </span>
          {source.processedAt && (
            <span>
              Cargado{" "}
              {new Date(source.processedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function BriefUpload() {
  const {
    sources,
    setSource,
    setAutofillStatus,
    mergeAnswers,
    next,
    goToStep,
    steps,
  } = useBrief();

  const [activeStage, setActiveStage] = useState(-1);
  const [done, setDone] = useState(sources.autofillStatus === "done");

  const callReady =
    sources.callTranscript.text.trim().split(/\s+/).filter(Boolean).length > 20;
  const offerReady =
    sources.offerDoc.text.trim().split(/\s+/).filter(Boolean).length > 20;
  const canRun = callReady || offerReady;
  const isRunning = activeStage >= 0 && activeStage < AUTOFILL_STAGES.length;

  async function runAutofill() {
    setDone(false);
    setAutofillStatus("running");
    setActiveStage(0);

    for (let i = 0; i < AUTOFILL_STAGES.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) =>
        setTimeout(resolve, AUTOFILL_STAGES[i].ms)
      );
      setActiveStage(i + 1);
    }

    const draft = buildAutofillFromSources(sources);
    mergeAnswers(draft);
    setAutofillStatus("done");
    setDone(true);
  }

  function goToAvatar() {
    const idx = steps.findIndex((step) => step.summary);
    if (idx >= 0) goToStep(idx);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
          Paso 2 · Materia prima
        </p>
        <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
          Sube la llamada y la oferta.{" "}
          <span className="neon-text">La IA pre-rellena el brief.</span>
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground lg:text-base">
          Sube la transcripción de tu sesión de estrategia y el documento de
          oferta que ya usas. Eneryia extrae automáticamente el avatar, los
          dolores, los competidores y el mecanismo, y deja el brief listo para
          que solo revises lo que falta.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <SourceCard
          icon={Mic}
          title="Transcripción de la llamada"
          description="Sesión de estrategia, descubrimiento o cierre."
          source={sources.callTranscript}
          onChange={(next) => setSource("callTranscript", next)}
          onLoadSample={() =>
            setSource("callTranscript", {
              text: SAMPLE_CALL_TRANSCRIPT,
              filename: "demo-llamada.txt",
              processedAt: new Date().toISOString(),
            })
          }
          placeholder="Pega aquí la transcripción de la llamada con tu cliente…"
          fileAccept=".txt,.md,.vtt,.srt,.json"
          accentClass="from-transparent via-primary to-transparent"
        />

        <SourceCard
          icon={FileText}
          title="Documento de oferta"
          description="Propuesta, deck, página de servicios o nota interna."
          source={sources.offerDoc}
          onChange={(next) => setSource("offerDoc", next)}
          onLoadSample={() =>
            setSource("offerDoc", {
              text: SAMPLE_OFFER_DOC,
              filename: "oferta-demo.txt",
              processedAt: new Date().toISOString(),
            })
          }
          placeholder="Pega aquí el documento o resumen de tu oferta…"
          fileAccept=".txt,.md,.docx,.pdf"
          accentClass="from-transparent via-[#8a5cff] to-transparent"
        />
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/50 glass p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 animate-pulse-neon">
              <Wand2 className="h-4 w-4 text-primary" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Pre-fill con IA
              </p>
              <p className="text-xs text-muted-foreground">
                Eneryia analiza tus inputs y completa los campos del brief.
                Vas a poder editar todo después.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {done && !isRunning && (
              <Button variant="outline" size="sm" onClick={runAutofill}>
                <RefreshCw className="h-4 w-4" />
                Volver a ejecutar
              </Button>
            )}
            <Button
              size="lg"
              onClick={runAutofill}
              disabled={!canRun || isRunning}
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Procesando…
                </>
              ) : done ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  Brief pre-rellenado
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Ejecutar IA
                </>
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {(isRunning || done) && (
            <motion.ol
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-5 grid gap-2 lg:grid-cols-2"
            >
              {AUTOFILL_STAGES.map((stage, idx) => {
                const isPast = idx < activeStage || done;
                const isCurrent = idx === activeStage && !done;
                return (
                  <motion.li
                    key={stage.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 rounded-md border border-border/50 bg-card/40 px-3 py-2"
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-md border text-[10px] font-mono",
                        isPast
                          ? "border-primary/40 bg-primary/15 text-primary"
                          : isCurrent
                            ? "border-primary/60 bg-primary/20 text-primary"
                            : "border-border/60 bg-card/30 text-muted-foreground"
                      )}
                    >
                      {isPast ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : isCurrent ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        `0${idx + 1}`.slice(-2)
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-xs",
                        isPast || isCurrent
                          ? "text-foreground"
                          : "text-muted-foreground/80"
                      )}
                    >
                      {stage.label}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ol>
          )}
        </AnimatePresence>

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex flex-col gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-primary">
                Brief pre-cargado con tu materia prima
              </p>
              <p className="text-xs text-muted-foreground">
                Saltá directamente al avatar generado para revisar el resumen
                o continúa paso a paso editando cada respuesta.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={next}>
                Editar respuestas
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={goToAvatar}>
                Ver avatar generado
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>

    </motion.div>
  );
}
