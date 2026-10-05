"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Tape from "../ui/Tape";

/* =====================================================
   DATA
====================================================== */

type MenuKey = "pro" | "part";

const MENUS: Record<
  MenuKey,
  {
    label: string;
    href: string;
    description: string;
    links: { label: string; href: string }[];
  }
> = {
  pro: {
    label: "Professionnels",
    href: "/professionnels",
    description:
      "Communication, événementiel et accompagnement créatif pour les entreprises.",
    links: [
      { label: "Communication", href: "/professionnels#communication" },
      { label: "Événementiel", href: "/professionnels#evenementiel" },
      {
        label: "Accompagnement créatif",
        href: "/professionnels#accompagnement",
      },
    ],
  },
  part: {
    label: "Particuliers",
    href: "/particuliers",
    description: "Mariages, danse et expériences privées pensées sur mesure.",
    links: [
      { label: "Mariages", href: "/particuliers#mariages" },
      { label: "Danse", href: "/particuliers#danse" },
      { label: "Dernière danse", href: "/particuliers#derniere-danse" },
      { label: "Expériences privées", href: "/particuliers#experiences" },
    ],
  },
};

const MENU_KEYS: MenuKey[] = ["pro", "part"];

/* =====================================================
   SOULIGNEMENT FEUTRE — visible au survol uniquement
====================================================== */

function Squiggle({ active = false }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      aria-hidden
      className="pointer-events-none absolute -bottom-1 left-0 h-[8px] w-full overflow-visible text-accent"
    >
      <path
        d="M2 6 Q 12 1, 22 5 T 42 5 T 62 5 T 82 5 T 98 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
        className={`
          [stroke-dasharray:1]
          transition-[stroke-dashoffset,opacity]
          duration-500
          ease-out
          ${
            active
              ? "opacity-100 [stroke-dashoffset:0]"
              : "opacity-0 [stroke-dashoffset:1] group-hover:opacity-100 group-hover:[stroke-dashoffset:0]"
          }
        `}
      />
    </svg>
  );
}

/* =====================================================
   CONTENU DE NOTE (partagé desktop / mobile)
====================================================== */

function NoteLinks({
  menuKey,
  onNavigate,
}: {
  menuKey: MenuKey;
  onNavigate: () => void;
}) {
  const menu = MENUS[menuKey];

  return (
    <>
      <p className="font-display text-[15px] italic leading-[1.3] text-petrol">
        {menu.description}
      </p>

      <ul className="mt-4">
        {menu.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className="
                group
                flex
                items-center
                justify-between
                border-b
                border-dashed
                border-ink/25
                py-2.5
                font-sans
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-ink
                transition-all
                duration-200
                hover:pl-1.5
              "
            >
              <span className="relative">
                {link.label}
                <Squiggle />
              </span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={menu.href}
        onClick={onNavigate}
        className="btn-brut mt-5 bg-white px-4 py-1.5 font-sans text-[10px] text-ink"
      >
        / TOUT DÉCOUVRIR
      </Link>
    </>
  );
}

/* =====================================================
   DROPDOWN DESKTOP
====================================================== */

function Dropdown({
  menuKey,
  open,
  onNavigate,
}: {
  menuKey: MenuKey;
  open: boolean;
  onNavigate: () => void;
}) {
  const menu = MENUS[menuKey];

  return (
    <div
      id={`menu-${menuKey}`}
      className={`
        absolute
        left-1/2
        top-full
        -translate-x-1/2
        pt-7
        transition-all
        duration-300
        ease-out
        ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }
      `}
    >
      <div
        className={`
          relative
          w-[340px]
          border-[1.5px]
          border-ink
          bg-surface
          px-6
          pb-6
          pt-7
          shadow-hard-lg
          transition-transform
          duration-300
          ${open ? "rotate-[1.5deg]" : "rotate-[-2deg]"}
        `}
      >
        <Tape className="left-1/2 top-[-13px] h-[26px] w-[76px] -translate-x-1/2 rotate-[-3deg]" />

        <span
          aria-hidden
          className="text-hard-sm absolute right-5 top-5 rotate-12 text-2xl text-accent"
        >
          ✦
        </span>

        <p className="text-hard-accent mb-3 mt-1 font-title text-[30px] font-extrabold leading-none tracking-[-0.03em] text-ink">
          {menu.label}
        </p>

        <NoteLinks menuKey={menuKey} onNavigate={onNavigate} />
      </div>
    </div>
  );
}

/* =====================================================
   HEADER
====================================================== */

export default function Header() {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // redressement au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // échap ferme tout
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // passage en desktop → ferme le menu mobile
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // bloque le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // nettoie le timer au démontage
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const closeAll = () => {
    setOpen(null);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Voile mobile */}
      <div
        aria-hidden
        onClick={closeAll}
        className={`
          fixed
          inset-0
          z-[55]
          bg-petrol/35
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          lg:hidden
          ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex flex-col items-center px-4 pt-4 md:pt-5">
        {/* =====================================================
            BANDE PAPIER
        ====================================================== */}

        <nav
          aria-label="Navigation principale"
          className={`
            pointer-events-auto
            relative
            flex
            w-full
            max-w-[780px]
            items-center
            justify-between
            gap-6
            border-[1.5px]
            border-ink
            bg-paper
            pl-3
            pr-2
            shadow-hard
            transition-all
            duration-500
            ease-out
            ${scrolled || mobileOpen ? "rotate-0 py-1.5" : "-rotate-[0.8deg] py-2.5"}
          `}
        >
          <Tape className="left-[-24px] top-[-8px] hidden h-[24px] w-[70px] -rotate-[32deg] md:block" />
          <Tape className="right-[-24px] top-[-8px] hidden h-[24px] w-[70px] rotate-[32deg] md:block" />

          {/* Logo */}
          <Link
            href="/"
            aria-label="M.ila Creative Lab — accueil"
            onClick={(e) => {
              closeAll();
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="group flex items-center gap-2"
          >
            <Image
              src="/images/logo2.png"
              alt=""
              width={48}
              height={48}
              className="h-auto w-[26px] transition-transform duration-500 group-hover:-rotate-12 md:w-[30px]"
            />
            <span className="font-display text-[26px] italic leading-none tracking-[-0.01em] text-ink">
              M.ila
            </span>
            <span className="ml-1 hidden border-l border-ink/25 pl-2.5 font-sans text-[8px] font-semibold uppercase leading-[1.35] tracking-[0.28em] text-ink/55 md:block">
              Creative
              <br />
              Lab
            </span>
          </Link>

          {/* Liens desktop */}
          <ul className="hidden items-center gap-7 lg:flex">
            {MENU_KEYS.map((key) => (
              <li
                key={key}
                className="relative"
                onMouseEnter={() => openMenu(key)}
                onMouseLeave={scheduleClose}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setOpen(null);
                  }
                }}
              >
                <button
                  type="button"
                  aria-expanded={open === key}
                  aria-controls={`menu-${key}`}
                  onClick={() => setOpen(open === key ? null : key)}
                  className="group relative flex items-center gap-1.5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-ink"
                >
                  {MENUS[key].label}
                  <span
                    className={`text-[9px] transition-transform duration-300 ${
                      open === key ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                  <Squiggle active={open === key} />
                </button>

                <Dropdown
                  menuKey={key}
                  open={open === key}
                  onNavigate={closeAll}
                />
              </li>
            ))}

            <li>
              <Link
                href="/a-propos"
                onClick={closeAll}
                className="group relative block py-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-ink"
              >
                À propos
                <Squiggle />
              </Link>
            </li>
          </ul>

          {/* Contact desktop */}
          <Link
            href="/contact"
            onClick={closeAll}
            className="btn-brut hidden bg-accent px-5 py-2 font-sans text-[11px] text-ink lg:inline-flex"
          >
            / CONTACT
          </Link>

          {/* Burger mobile */}
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="btn-brut gap-2.5 bg-white px-3 py-2 font-sans text-[10px] text-ink lg:hidden"
          >
            {mobileOpen ? "FERMER" : "MENU"}
            <span className="relative block h-[10px] w-[16px]">
              <span
                className={`absolute left-0 h-[2px] w-full bg-ink transition-all duration-300 ${
                  mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-full bg-ink transition-all duration-300 ${
                  mobileOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45"
                    : "bottom-0"
                }`}
              />
            </span>
          </button>
        </nav>

        {/* =====================================================
            FEUILLE MOBILE
        ====================================================== */}

        <div
          id="mobile-menu"
          className={`
            relative
            mt-5
            w-full
            max-w-[780px]
            border-[1.5px]
            border-ink
            bg-paper
            shadow-hard-lg
            transition-all
            duration-300
            ease-out
            lg:hidden
            ${
              mobileOpen
                ? "pointer-events-auto visible translate-y-0 rotate-[0.6deg] opacity-100"
                : "pointer-events-none invisible -translate-y-3 rotate-[-1.5deg] opacity-0"
            }
          `}
        >
          <Tape className="left-1/2 top-[-13px] h-[26px] w-[76px] -translate-x-1/2 rotate-[-3deg]" />

          <div className="max-h-[calc(100svh-130px)] overflow-y-auto px-5 pb-6 pt-4">
            <ul>
              {MENU_KEYS.map((key) => {
                const menu = MENUS[key];
                const isOpen = mobileSub === key;

                return (
                  <li
                    key={key}
                    className="border-b border-dashed border-ink/25"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`m-${key}`}
                      onClick={() => setMobileSub(isOpen ? null : key)}
                      className="flex w-full items-center justify-between py-4 text-left"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="text-hard-accent font-title text-[28px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                          {menu.label}
                        </span>
                      </span>

                      <span
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          border-2
                          border-ink
                          text-base
                          font-bold
                          shadow-hard-sm
                          transition-transform
                          duration-300
                          ${isOpen ? "rotate-45 bg-accent" : "bg-white"}
                        `}
                      >
                        +
                      </span>
                    </button>

                    <div
                      id={`m-${key}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pl-[2px] pr-1">
                          <NoteLinks menuKey={key} onNavigate={closeAll} />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}

              <li className="border-b border-dashed border-ink/25">
                <Link
                  href="/a-propos"
                  onClick={closeAll}
                  className="flex items-baseline gap-3 py-4"
                >
                  <span className="text-hard-accent font-title text-[28px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                    À propos
                  </span>
                </Link>
              </li>
            </ul>

            <Link
              href="/contact"
              onClick={closeAll}
              className="btn-brut mt-6 w-full bg-accent py-3 font-sans text-xs text-ink"
            >
              / CONTACT
            </Link>

            <p className="mt-6 text-center font-display text-[15px] italic text-petrol/70">
              People · Ideas · Events · Good vibes ♡
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
