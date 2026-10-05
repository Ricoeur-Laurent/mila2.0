type TapeProps = {
  className?: string;
};

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

// bords gauche/droite déchirés irréguliers
const TORN_EDGES =
  "polygon(2% 0%, 98% 0%, 100% 9%, 97% 19%, 100% 30%, 96% 41%, 99% 52%, 96.5% 63%, 100% 74%, 96% 86%, 99% 100%, 1% 100%, 4% 89%, 0% 77%, 3% 65%, 0% 54%, 4% 43%, 1% 31%, 3.5% 20%, 0% 9%)";

export default function Tape({ className = "" }: TapeProps) {
  return (
    // le wrapper porte l'ombre (le clip-path coupe les box-shadow)
    <div
      className={`pointer-events-none absolute z-20 ${className}`}
      style={{ filter: "drop-shadow(0 2px 2px rgba(60,40,20,0.25))" }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          clipPath: TORN_EDGES,
          background: `
            linear-gradient(180deg,
              rgba(255,255,255,0.18) 0%,
              rgba(255,255,255,0) 45%,
              rgba(90,60,20,0.08) 100%),
            rgba(226, 204, 158, 0.65)
          `,
        }}
      >
        {/* fibres longitudinales */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(120,90,40,0.18) 2px, rgba(120,90,40,0.18) 3px)",
          }}
        />

        {/* grain */}
        <div
          className="absolute inset-0 opacity-50 mix-blend-multiply"
          style={{ backgroundImage: NOISE, backgroundSize: "140px 140px" }}
        />

        {/* bords haut/bas légèrement marqués */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(120,90,40,0.25)",
          }}
        />
      </div>
    </div>
  );
}
