const WORDS = ["PEOPLE", "IDEAS", "EVENTS", "GOOD VIBES"];

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

type TapeMarqueeProps = {
  className?: string;
};

export default function TapeMarquee({ className = "" }: TapeMarqueeProps) {
  // assez de mots pour couvrir les grands écrans
  const row = Array.from({ length: 5 }).flatMap(() => WORDS);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-[-5%] w-[110%] ${className}`}
    >
      <div
        className="relative overflow-hidden border-y-[1.5px] border-ink py-2.5 shadow-hard-sm"
        style={{ background: "rgba(226, 204, 158, 0.95)" }}
      >
        {/* grain du scotch */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{ backgroundImage: NOISE, backgroundSize: "140px 140px" }}
        />

        {/* deux rangées identiques → boucle sans couture */}
        <div className="relative flex w-max animate-marquee">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {row.map((word, i) => (
                <span key={`${half}-${i}`} className="flex items-center">
                  <span className="px-5 font-title text-[14px] font-extrabold tracking-[0.08em] text-ink md:text-[16px]">
                    {word}
                  </span>
                  <span className="text-[13px] text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
