"use client";

import Link from "next/link";
import { useState } from "react";

import Polaroid from "@/components/ui/Polaroid";
import PostIt from "@/components/ui/PostIt";
import Tape from "@/components/ui/Tape";

/* =====================================================
   DATA
====================================================== */

type UniverseKey = "pro" | "part";

type Universe = {
  key: UniverseKey;
  tag: string;
  label: string;
  href: string;
  intro: string;
  services: { label: string; id: string }[];
  photo: { src: string; alt: string; label: string };
  notes: { text: string; className: string }[];
};

const UNIVERSES: Universe[] = [
  {
    key: "pro",
    tag: "Pour les entreprises",
    label: "Professionnels",
    href: "/professionnels",
    intro:
      "Communication, événementiel et accompagnement créatif pour les entreprises.",
    services: [
      { label: "Communication & réseaux sociaux", id: "communication" },
      { label: "Communication événementielle", id: "evenementiel" },
      { label: "Accompagnement créatif", id: "accompagnement" },
      { label: "Expériences d'entreprise", id: "experiences-entreprise" },
    ],
    photo: {
      src: "/images/pro.jpg",
      alt: "Événement professionnel accompagné par M.ila",
      label: "côté pro",
    },
    notes: [
      {
        text: "les tableurs aussi ont\ndroit aux paillettes ✦",
        className: "left-[50%] top-[18px] -rotate-[3deg]",
      },
      {
        text: "promis, zéro réunion qui\naurait pu être un mail",
        className: "bottom-[190px] left-[56px] rotate-[-2deg]",
      },
    ],
  },
  {
    key: "part",
    tag: "Pour vous & vos proches",
    label: "Particuliers",
    href: "/particuliers",
    intro: "Mariages, danse et expériences privées pensées sur mesure.",
    services: [
      { label: "Mariages & accompagnement", id: "mariages" },
      { label: "Première danse & cours de danse", id: "danse" },
      { label: "Dernière danse — obsèques", id: "derniere-danse" },
      { label: "Expériences privées", id: "experiences" },
    ],
    photo: {
      src: "/images/part.jpg",
      alt: "Moment de vie accompagné par M.ila",
      label: "moments de vie",
    },
    notes: [
      {
        text: "même si vous\ndansez comme\nun frigo",
        className: "right-[40px] top-[64px] rotate-[6deg]",
      },
      {
        text: "surprise ?\nchuuut…",
        className: "bottom-[200px] right-[56px] rotate-[-5deg]",
      },
    ],
  },
];

/* =====================================================
   LIGNES DE CAHIER
   une ligne tous les 32px, en partant du haut de la page.
   tout le contenu de l'en-tête et de la liste respecte
   cette grille (hauteurs et marges en multiples de 32px)
====================================================== */

const LINE = 32;
const RULED = `linear-gradient(180deg, transparent ${LINE - 1}px, rgba(22,143,229,0.14) ${LINE - 1}px)`;

/* =====================================================
   LISTE DES PRESTATIONS (cliquables)
====================================================== */

function ServiceList({ u }: { u: Universe }) {
  return (
    <ol className="mt-8">
      {u.services.map((service, i) => (
        <li key={service.id}>
          <Link
            href={`${u.href}#${service.id}`}
            className="group flex items-baseline gap-4 transition-all duration-200 hover:pl-1.5"
          >
            <span className="w-5 shrink-0 translate-y-[5px] font-sans text-[10px] font-bold leading-[32px] tracking-[0.2em] text-ink/40">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="flex-1 translate-y-[5px] font-display text-[18px] italic leading-[32px] text-petrol transition-colors duration-200 group-hover:text-ink">
              {service.label}
            </span>

            <span
              aria-hidden
              className="translate-y-[5px] leading-[32px] text-ink/35 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

/* =====================================================
   NOTES MANUSCRITES (desktop large uniquement)
====================================================== */

function HandNotes({ u }: { u: Universe }) {
  return (
    <>
      {u.notes.map((note) => (
        <p
          key={note.text}
          aria-hidden
          className={`
            pointer-events-none
            absolute
            z-10
            hidden
            select-none
            whitespace-pre-line
            font-hand
            text-[23px]
            font-medium
            leading-[1.05]
            text-sky
            xl:block
            ${note.className}
          `}
        >
          {note.text}
        </p>
      ))}
    </>
  );
}

/* =====================================================
   PAGE DU CARNET
====================================================== */

function NotebookPage({
  u,
  side,
  active,
}: {
  u: Universe;
  side: "left" | "right";
  active: boolean;
}) {
  const isPart = u.key === "part";

  return (
    <article
      id={`panel-${u.key}`}
      role="tabpanel"
      aria-labelledby={`tab-${u.key}`}
      className={`
        relative
        flex-col
        px-7
        pb-12
        pt-16
        sm:px-12
        lg:flex
        lg:pb-14
        ${active ? "flex" : "hidden"}
        ${side === "left" ? "lg:pl-14 lg:pr-16" : "lg:pl-16 lg:pr-14"}
      `}
      style={{
        backgroundImage: `${
          side === "left"
            ? "linear-gradient(270deg, rgba(0,40,52,0.08), transparent 56px)"
            : "linear-gradient(90deg, rgba(0,40,52,0.08), transparent 56px)"
        }, ${RULED}`,
        backgroundSize: `100% 100%, 100% ${LINE}px`,
        backgroundPosition: "0 0, 0 0",
      }}
    >
      {/* marge du carnet */}
      <span
        aria-hidden
        className={`absolute inset-y-0 w-px bg-accent/60 ${
          side === "left" ? "left-4 sm:left-7" : "right-4 sm:right-7"
        }`}
      />

      {/* notes au stylo */}
      <HandNotes u={u} />

      {/* polaroid — mobile uniquement (hauteur = 8 lignes pour garder la grille) */}
      <div className="mb-8 flex h-[256px] items-center justify-center lg:hidden">
        <Polaroid
          src={u.photo.src}
          alt={u.photo.alt}
          label={u.photo.label}
          className={`relative w-[200px] ${isPart ? "rotate-[3deg]" : "-rotate-[3deg]"}`}
        />
      </div>

      {/* en-tête — tout en multiples de 32px */}
      <div>
        <div className="flex h-8 items-center gap-3">
          <span className="h-px w-8 bg-ink/30" />
          <span className="font-sans text-[10px] font-semibold uppercase leading-[32px] tracking-[0.25em] text-ink/60">
            {u.tag}
          </span>
        </div>

        <h3 className="text-hard-accent font-title text-[36px] font-extrabold leading-[64px] tracking-[-0.035em] text-ink sm:text-[42px] lg:text-[48px] xl:text-[52px]">
          {u.label}
        </h3>

        <p className="max-w-[440px] translate-y-[5px] font-display text-[19px] italic leading-[32px] text-petrol">
          {u.intro}
        </p>
      </div>

      {/* prestations */}
      <ServiceList u={u} />

      {/* bas de page : bouton + photo (ordre inversé côté particuliers) */}
      <div
        className={`
          mt-auto
          flex
          items-end
          justify-between
          gap-6
          pt-10
          ${isPart ? "lg:flex-row-reverse" : ""}
        `}
      >
        <Link
          href={u.href}
          className="btn-brut shrink-0 bg-accent px-6 py-3 font-sans text-[11px] text-ink"
        >
          / DÉCOUVRIR
          <span className="sr-only"> l&apos;univers {u.label}</span>
        </Link>

        {isPart ? (
          // photo + post-it en haut à droite (ne cache pas la légende)
          <div className="relative hidden shrink-0 lg:block xl:mr-[100px]">
            <Polaroid
              src={u.photo.src}
              alt={u.photo.alt}
              label={u.photo.label}
              className="relative w-[170px] -rotate-[4deg] xl:w-[185px]"
            />

            <PostIt
              className="absolute right-[-104px] top-[-6px] z-10 hidden w-[130px] rotate-[5deg] xl:block"
              paperClassName="px-4 pb-5 pt-6"
              tapeClassName="left-1/2 top-[-10px] h-[20px] w-[54px] -translate-x-1/2 rotate-[-4deg]"
            >
              <p className="text-center font-display text-[15px] italic leading-[1.2] text-petrol">
                Chaque moment
                <br />
                mérite d&apos;être
                <br />
                bien accompagné.
              </p>
            </PostIt>
          </div>
        ) : (
          <Polaroid
            src={u.photo.src}
            alt={u.photo.alt}
            label={u.photo.label}
            className="relative hidden w-[170px] shrink-0 rotate-[4deg] lg:block xl:w-[185px]"
          />
        )}
      </div>
    </article>
  );
}

/* =====================================================
   SECTION
====================================================== */

export default function Universes() {
  const [active, setActive] = useState<UniverseKey>("pro");

  return (
    <section
      id="univers"
      aria-labelledby="univers-title"
      className="relative z-10 overflow-x-clip bg-paper pb-24 pt-24 lg:pb-32 lg:pt-32"
    >
      <div className="mx-auto max-w-[1180px] px-5">
        {/* intro */}
        <div className="mb-14 max-w-[640px] lg:mb-20">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-ink/50">
            / Deux univers · une même signature
          </p>

          <h2
            id="univers-title"
            className="mt-4 font-title text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-ink"
          >
            Par où on <span className="text-hard-accent">commence</span> ?
          </h2>

          <p className="mt-5 font-display text-[19px] italic leading-[1.35] text-petrol">
            Une entreprise qui veut rassembler, ou un moment de vie à
            accompagner : chaque histoire a sa porte d&apos;entrée.
          </p>
        </div>

        {/* carnet */}
        <div className="relative">
          {/* onglets intercalaires — mobile */}
          <div
            role="tablist"
            aria-label="Univers"
            className="relative z-10 flex gap-2 pl-4 lg:hidden"
          >
            {UNIVERSES.map((u) => {
              const isActive = active === u.key;
              return (
                <button
                  key={u.key}
                  id={`tab-${u.key}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${u.key}`}
                  onClick={() => setActive(u.key)}
                  className={`
                    -mb-[1.5px]
                    border-[1.5px]
                    border-b-0
                    border-ink
                    px-4
                    pb-2.5
                    pt-2.5
                    font-sans
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    transition-all
                    duration-200
                    ${isActive ? "bg-[#fdfbf6] text-ink" : "translate-y-1 bg-accent/60 text-ink/70"}
                  `}
                >
                  {u.label}
                </button>
              );
            })}
          </div>

          {/* une seule feuille de carnet */}
          <div
            className="
              relative
              border-[1.5px]
              border-ink
              bg-[#fdfbf6]
              shadow-hard-lg
              lg:grid
              lg:-rotate-[0.4deg]
              lg:grid-cols-2
            "
          >
            {/* scotchs aux coins */}
            <Tape className="left-[-22px] top-[-10px] hidden h-[26px] w-[80px] -rotate-[35deg] lg:block" />
            <Tape className="right-[-22px] top-[-10px] hidden h-[26px] w-[80px] rotate-[35deg] lg:block" />

            {/* trait de séparation des deux pages */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-[1.5px] -translate-x-1/2 bg-ink lg:block"
            />

            {/* spirale */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden -translate-x-1/2 flex-col justify-around py-8 lg:flex"
            >
              {Array.from({ length: 13 }).map((_, i) => (
                <span
                  key={i}
                  className="block h-[12px] w-[38px] rounded-full border-[2.5px] border-ink bg-paper shadow-[2px_2px_0_var(--color-ink)]"
                />
              ))}
            </div>

            {UNIVERSES.map((u, i) => (
              <NotebookPage
                key={u.key}
                u={u}
                side={i === 0 ? "left" : "right"}
                active={active === u.key}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
