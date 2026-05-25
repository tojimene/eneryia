"use client";

import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Crown,
  Gift,
  HelpCircle,
  Layers,
  ListChecks,
  MailPlus,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Tag,
  Trophy,
  Workflow,
  Quote,
  FileText,
} from "lucide-react";

const SECTION_ICONS = {
  hero: Crown,
  vsl: PlayCircle,
  logos: Award,
  problem: AlertTriangle,
  story: BookOpen,
  transformation: Sparkles,
  benefits: CheckCircle,
  proof: Trophy,
  process: Workflow,
  stack: Layers,
  offer: Tag,
  guarantee: ShieldCheck,
  urgency: Clock,
  cta: ArrowRight,
  faq: HelpCircle,
  leadMagnet: Gift,
  form: MailPlus,
  agenda: ListChecks,
};

export function LandingPreview({ landing, onSelectSection, activeSectionId }) {
  if (!landing) return null;
  const palette = landing.template.palette;

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        background: palette.bg,
        borderColor: `${palette.accent}33`,
      }}
    >
      {/* Barra de navegador simulada */}
      <div
        className="flex items-center gap-2 border-b px-3 py-2"
        style={{
          background: palette.surfaceAlt,
          borderColor: `${palette.accent}22`,
        }}
      >
        <span className="flex gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </span>
        <span
          className="ml-3 flex-1 rounded-md px-3 py-1 font-mono text-[10px]"
          style={{
            background: palette.bg,
            color: palette.muted,
            border: `1px solid ${palette.accent}22`,
          }}
        >
          https://eneryia.net/programa
        </span>
        <span
          className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
          style={{
            background: palette.accentSoft,
            color: palette.accent,
          }}
        >
          {landing.template.name}
        </span>
      </div>

      <div className="max-h-[640px] overflow-y-auto">
        {landing.sections.map(({ id, content }) => {
          const Icon = SECTION_ICONS[id] || Sparkles;
          const isActive = activeSectionId === content.id;

          function handleKeyDown(event) {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelectSection?.(content.id);
            }
          }

          return (
            <div
              key={content.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectSection?.(content.id)}
              onKeyDown={handleKeyDown}
              className="block w-full cursor-pointer text-left outline-none transition-all hover:brightness-110"
              style={{
                outline: isActive ? `2px solid ${palette.accent}` : "none",
                outlineOffset: isActive ? -2 : 0,
              }}
            >
              <SectionRenderer
                kind={id}
                content={content}
                palette={palette}
                Icon={Icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SectionRenderer({ kind, content, palette, Icon }) {
  if (kind === "hero") return <HeroSection content={content} palette={palette} />;
  if (kind === "vsl") return <VslSection content={content} palette={palette} />;
  if (kind === "logos") return <LogosSection content={content} palette={palette} />;
  if (kind === "problem") return <ProblemSection content={content} palette={palette} Icon={Icon} />;
  if (kind === "story") return <StorySection content={content} palette={palette} Icon={Icon} />;
  if (kind === "transformation")
    return <TransformationSection content={content} palette={palette} />;
  if (kind === "benefits") return <BenefitsSection content={content} palette={palette} />;
  if (kind === "proof") return <ProofSection content={content} palette={palette} />;
  if (kind === "process") return <ProcessSection content={content} palette={palette} />;
  if (kind === "stack") return <StackSection content={content} palette={palette} />;
  if (kind === "offer") return <OfferSection content={content} palette={palette} />;
  if (kind === "guarantee")
    return <GuaranteeSection content={content} palette={palette} />;
  if (kind === "urgency")
    return <UrgencySection content={content} palette={palette} />;
  if (kind === "cta") return <CtaSection content={content} palette={palette} />;
  if (kind === "faq") return <FaqSection content={content} palette={palette} />;
  if (kind === "leadMagnet")
    return <LeadMagnetSection content={content} palette={palette} />;
  if (kind === "form") return <FormSection content={content} palette={palette} />;
  if (kind === "agenda") return <AgendaSection content={content} palette={palette} />;
  return null;
}

function pillStyle(palette) {
  return {
    background: palette.accentSoft,
    color: palette.accent,
    border: `1px solid ${palette.accent}55`,
  };
}

function btnStyle(palette) {
  return {
    background: palette.accent,
    color: palette.bg,
  };
}

function HeroSection({ content, palette }) {
  return (
    <section
      className="relative overflow-hidden px-6 py-12 md:px-10 md:py-16"
      style={{ background: palette.bg, color: palette.text }}
    >
      <div
        className="pointer-events-none absolute -top-24 -left-10 h-60 w-60 rounded-full blur-3xl"
        style={{ background: palette.accent, opacity: 0.18 }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-10 h-60 w-60 rounded-full blur-3xl"
        style={{ background: palette.accent, opacity: 0.12 }}
      />
      <div className="relative max-w-3xl">
        <span
          className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em]"
          style={pillStyle(palette)}
        >
          {content.eyebrow}
        </span>
        <h1 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
          {content.headline}
        </h1>
        <p className="mt-3 text-base" style={{ color: palette.muted }}>
          {content.subhead}
        </p>
        <p
          className="mt-2 text-xs uppercase tracking-[0.2em]"
          style={{ color: palette.accent }}
        >
          {content.qualifier}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold"
            style={btnStyle(palette)}
          >
            {content.cta}
            <ArrowRight className="h-4 w-4" />
          </span>
          <span
            className="text-xs underline-offset-2"
            style={{ color: palette.muted, textDecoration: "underline" }}
          >
            {content.ctaSecondary}
          </span>
        </div>
      </div>
    </section>
  );
}

function VslSection({ content, palette }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.surface, color: palette.text }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: palette.accent }}
        >
          Vídeo · {content.duration}
        </p>
        <h2 className="mt-2 text-xl font-bold md:text-2xl">{content.title}</h2>

        <div
          className="relative mt-6 overflow-hidden rounded-xl border"
          style={{
            aspectRatio: "16 / 9",
            background: palette.bg,
            borderColor: `${palette.accent}33`,
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at center, ${palette.accentSoft} 0%, ${palette.bg} 70%)`,
            }}
          >
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: palette.accent }}
            >
              <PlayCircle className="h-8 w-8" style={{ color: palette.bg }} />
            </span>
          </div>
          <p
            className="absolute bottom-3 left-3 right-3 line-clamp-2 text-left text-xs font-bold uppercase tracking-wide"
            style={{ color: palette.text, textShadow: `0 0 12px ${palette.bg}` }}
          >
            {content.thumbnailHook}
          </p>
        </div>

        <span
          className="mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold"
          style={btnStyle(palette)}
        >
          {content.cta}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </section>
  );
}

function LogosSection({ content, palette }) {
  return (
    <section
      className="px-6 py-8 md:px-10"
      style={{ background: palette.bg, color: palette.muted }}
    >
      <p className="text-center text-xs uppercase tracking-[0.4em]">
        {content.label}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {content.items.map((logo) => (
          <span key={logo} className="text-sm font-bold opacity-70">
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProblemSection({ content, palette, Icon }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.surface, color: palette.text }}
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold">{content.title}</h2>
        <ul className="mt-5 space-y-2">
          {content.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-lg border p-3"
              style={{
                background: palette.surfaceAlt,
                borderColor: `${palette.accent}22`,
              }}
            >
              <Icon
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: palette.accent }}
              />
              <span className="text-sm" style={{ color: palette.text }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StorySection({ content, palette, Icon }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.bg, color: palette.text }}
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" style={{ color: palette.accent }} />
          <p
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: palette.accent }}
          >
            La historia
          </p>
        </div>
        <h2 className="mt-2 text-2xl font-bold">{content.title}</h2>
        <div className="mt-4 space-y-3">
          {content.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: palette.muted }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function TransformationSection({ content, palette }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.surface, color: palette.text }}
    >
      <h2 className="text-center text-2xl font-bold">{content.title}</h2>
      <div className="mx-auto mt-6 grid max-w-3xl gap-3 md:grid-cols-2">
        <div
          className="rounded-xl border p-4"
          style={{
            background: palette.surfaceAlt,
            borderColor: `${palette.accent}22`,
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: palette.muted }}
          >
            Antes
          </p>
          <ul className="mt-3 space-y-1.5">
            {content.before.map((b, i) => (
              <li key={i} className="text-sm" style={{ color: palette.muted }}>
                · {b}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-xl p-4"
          style={{
            background: palette.accent,
            color: palette.bg,
          }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em]">Después</p>
          <ul className="mt-3 space-y-1.5">
            {content.after.map((b, i) => (
              <li key={i} className="text-sm font-medium">
                · {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection({ content, palette }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.bg, color: palette.text }}
    >
      <h2 className="text-center text-2xl font-bold">{content.title}</h2>
      <div className="mx-auto mt-6 grid max-w-4xl gap-3 md:grid-cols-3">
        {content.items.map((b, i) => (
          <div
            key={i}
            className="rounded-xl border p-4"
            style={{
              background: palette.surface,
              borderColor: `${palette.accent}33`,
            }}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: palette.accentSoft }}
            >
              <CheckCircle className="h-4 w-4" style={{ color: palette.accent }} />
            </span>
            <p className="mt-3 text-sm font-semibold">{b.title}</p>
            <p className="mt-1 text-xs" style={{ color: palette.muted }}>
              {b.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProofSection({ content, palette }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.surface, color: palette.text }}
    >
      <h2 className="text-center text-2xl font-bold">{content.title}</h2>
      <div className="mx-auto mt-6 grid max-w-5xl gap-3 md:grid-cols-2">
        {content.testimonials.slice(0, 4).map((t, i) => (
          <div
            key={i}
            className="rounded-xl border p-4"
            style={{
              background: palette.surfaceAlt,
              borderColor: `${palette.accent}33`,
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <Quote className="h-5 w-5" style={{ color: palette.accent }} />
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold"
                style={{ background: palette.accentSoft, color: palette.accent }}
              >
                {t.stat}
              </span>
            </div>
            <p className="mt-3 text-sm" style={{ color: palette.text }}>
              "{t.quote}"
            </p>
            <p
              className="mt-3 text-[11px] uppercase tracking-widest"
              style={{ color: palette.muted }}
            >
              {t.name} · {t.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessSection({ content, palette }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.bg, color: palette.text }}
    >
      <h2 className="text-center text-2xl font-bold">{content.title}</h2>
      <div className="mx-auto mt-6 grid max-w-5xl gap-3 md:grid-cols-4">
        {content.steps.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border p-4"
            style={{
              background: palette.surface,
              borderColor: `${palette.accent}33`,
            }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: palette.accent }}
            >
              {`0${i + 1}`.slice(-2)}
            </span>
            <p className="mt-2 text-sm font-semibold">{s.title}</p>
            <p className="mt-1 text-xs" style={{ color: palette.muted }}>
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StackSection({ content, palette }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.surface, color: palette.text }}
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold">{content.title}</h2>
        <div
          className="mt-6 overflow-hidden rounded-xl border"
          style={{
            background: palette.surfaceAlt,
            borderColor: `${palette.accent}33`,
          }}
        >
          {content.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 border-b px-4 py-3 last:border-b-0"
              style={{ borderColor: `${palette.accent}1a` }}
            >
              <span className="text-sm">{item.label}</span>
              <span
                className="font-mono text-sm font-bold"
                style={{ color: palette.accent }}
              >
                {item.value}
              </span>
            </div>
          ))}
          <div
            className="flex items-center justify-between gap-3 px-4 py-3"
            style={{ background: palette.accentSoft }}
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: palette.accent }}
            >
              {content.totalLabel}
            </span>
            <span
              className="font-mono text-base font-black"
              style={{ color: palette.accent }}
            >
              {content.total}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferSection({ content, palette }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.bg, color: palette.text }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-black">{content.title}</h2>
        <p className="mt-1 text-sm" style={{ color: palette.accent }}>
          {content.tagline}
        </p>

        <ul className="mt-6 space-y-2 text-left">
          {content.items.map((it, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-lg border px-3 py-2"
              style={{
                background: palette.surface,
                borderColor: `${palette.accent}33`,
              }}
            >
              <CheckCircle
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: palette.accent }}
              />
              <span className="text-sm">{it}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-baseline justify-center gap-3">
          <span
            className="font-mono text-base line-through"
            style={{ color: palette.muted }}
          >
            {content.oldPrice}
          </span>
          <span
            className="font-mono text-4xl font-black"
            style={{ color: palette.accent }}
          >
            {content.price}
          </span>
        </div>
        <p className="mt-1 text-xs" style={{ color: palette.muted }}>
          {content.paymentNote}
        </p>
      </div>
    </section>
  );
}

function GuaranteeSection({ content, palette }) {
  return (
    <section
      className="px-6 py-10 md:px-10"
      style={{ background: palette.surface, color: palette.text }}
    >
      <div
        className="mx-auto flex max-w-3xl items-start gap-4 rounded-xl border p-5"
        style={{
          background: palette.surfaceAlt,
          borderColor: `${palette.accent}55`,
        }}
      >
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
          style={{ background: palette.accentSoft }}
        >
          <ShieldCheck className="h-6 w-6" style={{ color: palette.accent }} />
        </span>
        <div>
          <p
            className="font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: palette.accent }}
          >
            Garantía · {content.days} días
          </p>
          <h3 className="mt-1 text-lg font-bold">{content.title}</h3>
          <p className="mt-2 text-sm" style={{ color: palette.muted }}>
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function UrgencySection({ content, palette }) {
  return (
    <section
      className="px-6 py-8 md:px-10"
      style={{ background: palette.bg, color: palette.text }}
    >
      <div
        className="mx-auto max-w-3xl rounded-xl border p-4 text-center"
        style={{
          background: palette.accentSoft,
          borderColor: `${palette.accent}55`,
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <Clock className="h-4 w-4" style={{ color: palette.accent }} />
          <p
            className="font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: palette.accent }}
          >
            {content.title}
          </p>
        </div>
        <p className="mt-2 text-sm" style={{ color: palette.text }}>
          {content.description}
        </p>
        {typeof content.slotsLeft === "number" && (
          <p
            className="mt-2 font-mono text-xs"
            style={{ color: palette.accent }}
          >
            Quedan {content.slotsLeft} plazas
          </p>
        )}
      </div>
    </section>
  );
}

function CtaSection({ content, palette }) {
  return (
    <section
      className="px-6 py-14 md:px-10"
      style={{ background: palette.surface, color: palette.text }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold">{content.title}</h2>
        <p className="mt-2 text-sm" style={{ color: palette.muted }}>
          {content.description}
        </p>
        <span
          className="mt-5 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-bold"
          style={btnStyle(palette)}
        >
          {content.cta}
          <ArrowRight className="h-4 w-4" />
        </span>
        <p className="mt-2 text-[10px] uppercase tracking-widest" style={{ color: palette.muted }}>
          {content.ctaSub}
        </p>
      </div>
    </section>
  );
}

function LeadMagnetSection({ content, palette }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.surface, color: palette.text }}
    >
      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-[180px_1fr] md:items-center">
        <div
          className="relative mx-auto flex h-44 w-32 items-end overflow-hidden rounded-lg p-3"
          style={{
            background: `linear-gradient(160deg, ${palette.accent} 0%, ${palette.surfaceAlt} 100%)`,
            boxShadow: `0 20px 40px ${palette.accent}33`,
          }}
        >
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full"
            style={{ background: `${palette.bg}55`, filter: "blur(20px)" }}
          />
          <div>
            <FileText className="h-5 w-5" style={{ color: palette.bg }} />
            <p
              className="mt-2 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: palette.bg }}
            >
              {content.assetType}
            </p>
            <p
              className="mt-1 text-[10px]"
              style={{ color: `${palette.bg}cc` }}
            >
              {content.pages} págs · {content.duration}
            </p>
          </div>
        </div>
        <div>
          <p
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: palette.accent }}
          >
            Lead magnet
          </p>
          <h2 className="mt-2 text-2xl font-bold">{content.title}</h2>
          <p className="mt-2 text-sm font-semibold" style={{ color: palette.text }}>
            {content.assetName}
          </p>
          <ul className="mt-4 space-y-2">
            {content.bullets.slice(0, 5).map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm"
                style={{ color: palette.muted }}
              >
                <CheckCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: palette.accent }}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FormSection({ content, palette }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.bg, color: palette.text }}
    >
      <div
        className="mx-auto max-w-md rounded-2xl border p-6"
        style={{
          background: palette.surface,
          borderColor: `${palette.accent}44`,
          boxShadow: `0 24px 60px ${palette.bg}99`,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ background: palette.accentSoft }}
          >
            <MailPlus className="h-4 w-4" style={{ color: palette.accent }} />
          </span>
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: palette.accent }}
            >
              Acceso instantáneo
            </p>
            <h3 className="text-base font-bold">{content.title}</h3>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {content.fields.map((field, i) => (
            <div key={field.id}>
              <p
                className="mb-1 text-[10px] uppercase tracking-widest"
                style={{ color: palette.muted }}
              >
                {field.label}
              </p>
              <div
                className="flex h-10 items-center rounded-lg border px-3 text-xs"
                style={{
                  background: palette.surfaceAlt,
                  borderColor: `${palette.accent}33`,
                  color: i === 0 ? palette.text : palette.muted,
                }}
              >
                {i === 0 ? "Ricardo Eneryia" : field.placeholder}
              </div>
            </div>
          ))}
        </div>

        <span
          className="mt-5 flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold"
          style={btnStyle(palette)}
        >
          {content.cta}
          <ArrowRight className="h-4 w-4" />
        </span>

        <p
          className="mt-3 text-center text-[10px]"
          style={{ color: palette.muted }}
        >
          {content.subtitle}
        </p>
      </div>
    </section>
  );
}

function AgendaSection({ content, palette }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.surface, color: palette.text }}
    >
      <div className="mx-auto max-w-3xl">
        <p
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: palette.accent }}
        >
          Agenda · {content.duration}
        </p>
        <h2 className="mt-1 text-2xl font-bold">{content.title}</h2>
        <p
          className="mt-1 font-mono text-xs"
          style={{ color: palette.muted }}
        >
          {content.date}
        </p>

        <ol className="mt-5 space-y-2">
          {content.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg border px-3 py-2.5"
              style={{
                background: palette.surfaceAlt,
                borderColor: `${palette.accent}22`,
              }}
            >
              <span
                className="font-mono text-[11px]"
                style={{ color: palette.accent }}
              >
                {item.time}
              </span>
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs" style={{ color: palette.muted }}>
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FaqSection({ content, palette }) {
  return (
    <section
      className="px-6 py-12 md:px-10"
      style={{ background: palette.bg, color: palette.text }}
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold">{content.title}</h2>
        <div className="mt-6 space-y-2">
          {content.items.map((it, i) => (
            <details
              key={i}
              className="group rounded-xl border p-4"
              style={{
                background: palette.surface,
                borderColor: `${palette.accent}33`,
              }}
            >
              <summary
                className="flex cursor-pointer items-center justify-between text-sm font-semibold"
                style={{ color: palette.text }}
              >
                {it.q}
                <span style={{ color: palette.accent }}>+</span>
              </summary>
              <p className="mt-3 text-sm" style={{ color: palette.muted }}>
                {it.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
