import Link from "next/link";

type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections?: { id: string; title: string }[];
};

export default function PagePlaceholder({
  eyebrow,
  title,
  intro,
  sections = [],
}: PagePlaceholderProps) {
  return (
    <section className="min-h-[100svh] bg-paper px-5 pb-24 pt-36 lg:pt-44">
      <div className="mx-auto max-w-[900px]">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-ink/50">
          {eyebrow}
        </p>

        <h1 className="text-hard-accent mt-4 font-title text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-ink">
          {title}
        </h1>

        <p className="mt-5 max-w-[620px] font-display text-[20px] italic leading-[1.35] text-petrol">
          {intro}
        </p>

        {sections.length > 0 && (
          <div className="mt-16 flex flex-col gap-6">
            {sections.map((section, i) => (
              <article
                key={section.id}
                id={section.id}
                className="border-[1.5px] border-ink bg-[#fdfbf6] px-6 py-7 shadow-hard"
              >
                <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 font-title text-[26px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                  {section.title}
                </h2>
                <p className="mt-3 font-display text-[17px] italic text-petrol/70">
                  Contenu à venir.
                </p>
              </article>
            ))}
          </div>
        )}

        <Link
          href="/"
          className="btn-brut mt-14 bg-white px-6 py-3 font-sans text-[11px] text-ink"
        >
          / RETOUR À L&apos;ACCUEIL
        </Link>
      </div>
    </section>
  );
}
