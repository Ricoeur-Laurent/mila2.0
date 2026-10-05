"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export type ServiceDetail = {
  label: string;
  id: string;
  pitch: string;
  items: string[];
};

type ServiceModalProps = {
  universeLabel: string;
  universeHref: string;
  services: ServiceDetail[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

/* case cochée au stylo — se dessine avec un léger décalage */
function Check({ delay }: { delay: number }) {
  return (
    <span className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center border-[1.5px] border-ink bg-white">
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-[22px] w-[22px] overflow-visible text-sky"
      >
        <path
          d="M3 12.5 L9.5 19 L22 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="animate-draw [stroke-dasharray:1] [stroke-dashoffset:1]"
          style={{ animationDelay: `${0.3 + delay * 0.15}s` }}
        />
      </svg>
    </span>
  );
}

export default function ServiceModal({
  universeLabel,
  universeHref,
  services,
  index,
  onClose,
  onNavigate,
}: ServiceModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const service = services[index];
  const total = services.length;

  const prev = () => onNavigate((index - 1 + total) % total);
  const next = () => onNavigate((index + 1) % total);

  // focus à l'ouverture + retour du focus à la fermeture
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, []);

  // clavier : Échap ferme, ← → naviguent
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // bloque le scroll de la page
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
    >
      {/* fond */}
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-petrol/45 backdrop-blur-[3px] transition-opacity duration-300 starting:opacity-0"
      />

      {/* fiche bristol */}
      <div
        key={service.id}
        className="
          relative
          max-h-[calc(100svh-32px)]
          w-full
          max-w-[520px]
          -rotate-[1.5deg]
          overflow-y-auto
          border-[1.5px]
          border-ink
          bg-[#fffdf8]
          shadow-hard-lg
          transition-all
          duration-300
          ease-out
          starting:translate-y-6
          starting:rotate-[-6deg]
          starting:opacity-0
        "
      >
        {/* en-tête */}
        <div className="flex items-center justify-between border-b-[1.5px] border-ink bg-accent px-5 py-2.5">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-ink">
            {universeLabel} · {pad(index + 1)}/{pad(total)}
          </span>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-7 w-7 items-center justify-center border-2 border-ink bg-white text-base font-bold leading-none text-ink shadow-hard-sm transition-transform duration-200 hover:rotate-90"
          >
            ×
          </button>
        </div>

        {/* contenu */}
        <div className="px-6 pb-7 pt-7 sm:px-8">
          <h3
            id="service-modal-title"
            className="text-hard-accent font-title text-[32px] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[40px]"
          >
            {service.label}
          </h3>

          <p className="mt-4 font-display text-[20px] italic leading-[1.3] text-petrol">
            {service.pitch}
          </p>

          <p className="mt-7 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-ink/50">
            Au programme
          </p>

          <ul className="mt-3 space-y-3">
            {service.items.map((item, i) => (
              <li key={item} className="flex items-start gap-3">
                <Check delay={i} />
                <span className="font-sans text-[15px] leading-snug text-ink">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* pied */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-ink/25 pt-5">
            <Link
              href={`${universeHref}#${service.id}`}
              onClick={onClose}
              className="btn-brut bg-accent px-5 py-2.5 font-sans text-[11px] text-ink"
            >
              / EN SAVOIR PLUS
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Prestation précédente"
                className="btn-brut h-9 w-9 bg-white font-sans text-sm text-ink"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Prestation suivante"
                className="btn-brut h-9 w-9 bg-white font-sans text-sm text-ink"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
