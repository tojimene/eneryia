"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { BRIEF_STEPS } from "@/lib/brief-questions";

const STORAGE_KEY = "eneryia-brief";

const BriefContext = createContext(null);

function emptyAnswers() {
  const base = {};
  BRIEF_STEPS.forEach((step) => {
    step.questions.forEach((question) => {
      if (question.type === "list") base[question.id] = [""];
      else if (question.type === "competitors")
        base[question.id] = [{ name: "", reason: "" }];
      else if (question.type === "chips") base[question.id] = [];
      else if (question.type === "scale") base[question.id] = 0;
      else base[question.id] = "";
    });
  });
  return base;
}

function emptySources() {
  return {
    callTranscript: { text: "", filename: "", processedAt: null },
    offerDoc: { text: "", filename: "", processedAt: null },
    autofillStatus: "idle",
  };
}

export function BriefProvider({ children }) {
  const [answers, setAnswers] = useState(emptyAnswers);
  const [sources, setSources] = useState(emptySources);
  const [stepIndex, setStepIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setAnswers((prev) => ({ ...prev, ...(parsed.answers ?? {}) }));
        if (parsed.sources) {
          setSources((prev) => ({ ...prev, ...parsed.sources }));
        }
        if (typeof parsed.stepIndex === "number") {
          setStepIndex(parsed.stepIndex);
        }
        if (typeof parsed.questionIndex === "number") {
          setQuestionIndex(parsed.questionIndex);
        }
        if (parsed.lastSavedAt) setLastSavedAt(parsed.lastSavedAt);
      }
    } catch {
      // ignore
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      const payload = {
        answers,
        sources,
        stepIndex,
        questionIndex,
        lastSavedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setLastSavedAt(payload.lastSavedAt);
    }, 600);
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [answers, sources, stepIndex, questionIndex, isHydrated]);

  const setAnswer = useCallback((id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const setSource = useCallback((id, value) => {
    setSources((prev) => ({ ...prev, [id]: { ...prev[id], ...value } }));
  }, []);

  const setAutofillStatus = useCallback((status) => {
    setSources((prev) => ({ ...prev, autofillStatus: status }));
  }, []);

  const mergeAnswers = useCallback((next) => {
    setAnswers((prev) => ({ ...prev, ...next }));
  }, []);

  const goToStep = useCallback((index, options = {}) => {
    const target = Math.max(0, Math.min(index, BRIEF_STEPS.length - 1));
    setStepIndex((prev) => {
      setDirection(target >= prev ? 1 : -1);
      return target;
    });
    setQuestionIndex(options.questionIndex ?? 0);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    const current = BRIEF_STEPS[stepIndex];
    const totalQuestions = current?.questions?.length ?? 0;
    if (totalQuestions > 0 && questionIndex < totalQuestions - 1) {
      setQuestionIndex((q) => q + 1);
      return;
    }
    setStepIndex((prev) => Math.min(prev + 1, BRIEF_STEPS.length - 1));
    setQuestionIndex(0);
  }, [stepIndex, questionIndex]);

  const prev = useCallback(() => {
    setDirection(-1);
    if (questionIndex > 0) {
      setQuestionIndex((q) => q - 1);
      return;
    }
    setStepIndex((current) => {
      const target = Math.max(current - 1, 0);
      const targetStep = BRIEF_STEPS[target];
      const targetQuestions = targetStep?.questions?.length ?? 0;
      setQuestionIndex(targetQuestions > 0 ? targetQuestions - 1 : 0);
      return target;
    });
  }, [questionIndex]);

  const reset = useCallback(() => {
    setAnswers(emptyAnswers());
    setSources(emptySources());
    setStepIndex(0);
    setQuestionIndex(0);
    setDirection(1);
    window.localStorage.removeItem(STORAGE_KEY);
    setLastSavedAt(null);
  }, []);

  const value = useMemo(
    () => ({
      answers,
      sources,
      setAnswer,
      setSource,
      setAutofillStatus,
      mergeAnswers,
      stepIndex,
      questionIndex,
      direction,
      step: BRIEF_STEPS[stepIndex],
      steps: BRIEF_STEPS,
      goToStep,
      next,
      prev,
      reset,
      isHydrated,
      lastSavedAt,
    }),
    [
      answers,
      sources,
      setAnswer,
      setSource,
      setAutofillStatus,
      mergeAnswers,
      stepIndex,
      questionIndex,
      direction,
      goToStep,
      next,
      prev,
      reset,
      isHydrated,
      lastSavedAt,
    ]
  );

  return <BriefContext.Provider value={value}>{children}</BriefContext.Provider>;
}

export function useBrief() {
  const context = useContext(BriefContext);
  if (!context) {
    throw new Error("useBrief debe usarse dentro de BriefProvider");
  }
  return context;
}
