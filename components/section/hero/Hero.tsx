import Image from "next/image";
import Link from "next/link";

import SkyBackground from "./SkyBackground";
import CRTOverlay from "./CRTOverlay";
import Polaroid from "@/components/ui/Polaroid";
import PostIt from "@/components/ui/PostIt";
import TapeMarquee from "@/components/ui/TapeMarquee";

/* texte du post-it — partagé desktop / mobile */
function PostItText() {
  return (
    <p className="text-center font-display text-[17px] italic leading-[1.1] text-ink lg:text-[21px] 2xl:text-[23px]">
      Des événements
      <br />
      qui rapprochent
      <br />
      les gens.
    </p>
  );
}

export default function Hero() {
  return (
    <div className="relative z-20 overflow-x-clip">
      <section className="relative h-[100svh] min-h-[700px] w-full overflow-hidden bg-sky [clip-path:inset(0)] max-lg:short:min-h-[600px]">
        {/* =====================================================
            BACKGROUND
        ====================================================== */}

        <SkyBackground />

        {/* =====================================================
            CONTENU CENTRAL (au-dessus de tout)
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 z-[45] flex items-center justify-center px-5">
          <div className="pointer-events-auto relative mx-auto max-w-[900px] text-center">
            {/* Logo */}
            <Image
              src="/images/logo.png"
              alt="M.ila"
              width={140}
              height={140}
              priority
              className="
                mx-auto
                mb-4
                h-auto
                w-[78px]
                -rotate-[4deg]
                drop-shadow-[4px_4px_0_var(--color-ink)]
                md:w-[105px]
                2xl:w-[120px]
                max-lg:short:mb-2
                max-lg:short:w-[52px]
              "
            />

            <p className="text-hard-sm mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-white md:text-xs">
              M.ila — Creative Lab
            </p>

            <h1
              className="
                text-outline
                text-hard
                font-title
                text-[clamp(2.6rem,5.6vw,6.2rem)]
                font-extrabold
                leading-[0.92]
                tracking-[-0.035em]
                text-background
              "
            >
              L&apos;art de créer
              <br />
              des expériences
              <br />
              qui ont du sens.
            </h1>

            <p className="text-hard-sm mt-7 font-sans text-[9px] uppercase tracking-[0.35em] text-white md:text-xs max-lg:short:mt-4">
              Stratégie · Communication · Événementiel
            </p>

            <Link
              href="/contact"
              className="btn-brut mt-8 bg-white px-10 py-3 font-sans text-xs text-ink max-lg:short:mt-5 max-lg:short:py-2.5"
            >
              / CONTACT
            </Link>
          </div>
        </div>

        {/* =====================================================
            POLAROID — HAUT GAUCHE
        ====================================================== */}

        <Polaroid
          src="/images/event.jpg"
          alt="Public réuni devant la scène lors d'un événement M.ila"
          label="tout le monde est là"
          className="
            absolute
            left-[4%]
            top-[13%]
            z-20
            hidden
            w-[285px]
            -rotate-[5deg]
            lg:block
            2xl:w-[350px]
          "
        />

        {/* =====================================================
            POLAROID — HAUT DROITE
        ====================================================== */}

        <Polaroid
          src="/images/brand.jpeg"
          alt="Femme sur une balançoire face au ciel"
          label="dans les nuages"
          tapeClassName="left-1/2 top-[-15px] h-[34px] w-[96px] -translate-x-1/2 rotate-[5deg]"
          className="
            absolute
            right-[5%]
            top-[12%]
            z-20
            hidden
            w-[285px]
            rotate-[4deg]
            lg:block
            2xl:w-[350px]
          "
        />

        {/* =====================================================
            POLAROID — BAS GAUCHE + POST-IT (desktop)
            le post-it est accroché au polaroid → suit sa position
        ====================================================== */}

        <div
          className="
            absolute
            bottom-[max(7%,64px)]
            left-[5%]
            z-[35]
            hidden
            w-[255px]
            -rotate-[5deg]
            lg:block
            2xl:w-[315px]
          "
        >
          <Polaroid
            src="/images/dance.jpg"
            alt="Première danse des mariés entourés de leurs invités"
            label="première danse ♡"
            tapeClassName="left-[-18px] top-[6px] h-[30px] w-[84px] -rotate-[38deg]"
            className="relative w-full"
          />

          <PostIt
            heart
            className="absolute bottom-[-6%] left-[78%] z-10 w-[205px] rotate-[11deg] 2xl:w-[240px]"
            paperClassName="px-5 pb-8 pt-8"
            tapeClassName="left-1/2 top-[-13px] h-[28px] w-[74px] -translate-x-1/2 rotate-[4deg]"
          >
            <PostItText />
          </PostIt>
        </div>

        {/* =====================================================
            POLAROID — BAS DROITE (desktop)
        ====================================================== */}

        <Polaroid
          src="/images/party.jpg"
          alt="Deux danseuses en noir et blanc dans la rue"
          label="good vibes"
          tapeClassName="right-[-18px] top-[6px] h-[30px] w-[84px] rotate-[38deg]"
          className="
            absolute
            bottom-[max(7%,64px)]
            right-[4%]
            z-30
            hidden
            w-[255px]
            rotate-[6deg]
            lg:block
            2xl:w-[315px]
          "
        />

        {/* =====================================================
            PEOPLE / IDEAS / EVENTS / GOOD VIBES
        ====================================================== */}

        <div className="absolute left-[2.5%] top-[43%] z-30 hidden -rotate-[6deg] lg:block">
          <p className="font-display text-xl italic leading-[1.2] text-white [text-shadow:2px_2px_0_var(--color-ink)] 2xl:text-2xl">
            PEOPLE
            <br />
            IDEAS
            <br />
            EVENTS
            <br />
            GOOD VIBES
          </p>

          <div className="mt-2 h-[3px] w-28 -rotate-[8deg] bg-white shadow-hard-sm" />
        </div>

        {/* =====================================================
            DOODLES
        ====================================================== */}

        <span className="absolute left-[32%] top-[18%] z-30 hidden rotate-12 text-4xl text-white [text-shadow:2px_2px_0_var(--color-ink)] lg:block">
          ☆
        </span>

        <span className="absolute right-[29%] top-[20%] z-30 hidden -rotate-12 text-4xl text-white [text-shadow:2px_2px_0_var(--color-ink)] xl:block">
          ✦
        </span>

        <span className="absolute right-[4%] top-[50%] z-30 hidden rotate-[9deg] text-5xl text-white [text-shadow:3px_3px_0_var(--color-ink)] xl:block">
          ✦
        </span>

        <span className="absolute bottom-[22%] right-[27%] z-30 hidden rotate-12 text-4xl text-white [text-shadow:2px_2px_0_var(--color-ink)] xl:block">
          ☆
        </span>

        <span className="absolute bottom-[30%] left-[3%] z-30 hidden -rotate-12 text-3xl text-white [text-shadow:2px_2px_0_var(--color-ink)] xl:block">
          ♡
        </span>

        {/* =====================================================
            MOBILE
        ====================================================== */}
        <Polaroid
          src="/images/event.jpg"
          alt="Public réuni devant la scène lors d'un événement M.ila"
          label="tous là !"
          tapeClassName="left-1/2 top-[-11px] h-[24px] w-[64px] -translate-x-1/2 rotate-[-4deg]"
          className="absolute left-[-22px] top-[12%] z-10 w-[152px] -rotate-[7deg] lg:hidden short:top-[13%] short:w-[120px]"
        />

        <Polaroid
          src="/images/brand.jpeg"
          alt="Femme sur une balançoire face au ciel"
          label="dans les nuages"
          tapeClassName="left-1/2 top-[-11px] h-[24px] w-[64px] -translate-x-1/2 rotate-[5deg]"
          className="absolute right-[-20px] top-[14%] z-10 w-[142px] rotate-[7deg] lg:hidden short:top-[14%] short:w-[116px]"
        />
        {/* bas gauche + post-it accroché */}
        <div className="absolute bottom-[58px] left-[-16px] z-[35] w-[142px] -rotate-[6deg] lg:hidden short:bottom-[40px] short:w-[118px]">
          <Polaroid
            src="/images/dance.jpg"
            alt="Première danse des mariés entourés de leurs invités"
            label="1ère danse ♡"
            tapeClassName="left-1/2 top-[-11px] h-[24px] w-[64px] -translate-x-1/2 rotate-[-3deg]"
            className="relative w-full"
          />

          <PostIt
            heart
            className="absolute bottom-[-6px] left-[80%] z-10 w-[132px] rotate-[9deg] min-[400px]:w-[145px] short:hidden"
            paperClassName="px-3.5 pb-6 pt-6"
            tapeClassName="left-1/2 top-[-10px] h-[20px] w-[56px] -translate-x-1/2 rotate-[4deg]"
          >
            <PostItText />
          </PostIt>
        </div>

        <Polaroid
          src="/images/party.jpg"
          alt="Deux danseuses en noir et blanc dans la rue"
          label="good vibes"
          tapeClassName="left-1/2 top-[-11px] h-[24px] w-[64px] -translate-x-1/2 rotate-[4deg]"
          className="absolute bottom-[64px] right-[-16px] z-30 w-[142px] rotate-[7deg] lg:hidden short:bottom-[44px] short:w-[116px]"
        />

        {/* =====================================================
            SCROLL
        ====================================================== */}
        {/* 
        <div className="text-hard-sm absolute bottom-[110px] left-1/2 z-40 hidden -translate-x-1/2 flex-col items-center md:flex">
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white">
            Scroll
          </span>
          <span className="mt-1 text-2xl font-light text-white">↓</span>
        </div> */}

        {/* =====================================================
            CRT
        ====================================================== */}

        <CRTOverlay />
      </section>

      {/* =====================================================
          BANDEAU SCOTCH — À CHEVAL HERO / SECTION SUIVANTE
      ====================================================== */}

      <TapeMarquee className="bottom-0 translate-y-1/2 -rotate-[1deg] 2xl:-rotate-[0.6deg]" />
    </div>
  );
}
