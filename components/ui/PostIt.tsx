import Tape from "./Tape";

// bords légèrement irréguliers, effet papier
const PAPER_EDGES =
  "polygon(0.5% 1.5%, 18% 0.4%, 37% 1.2%, 55% 0%, 74% 1%, 92% 0.3%, 99.6% 1.4%, 100% 22%, 99.2% 41%, 100% 63%, 99.4% 82%, 99.8% 98.6%, 81% 100%, 63% 99.2%, 44% 100%, 26% 99.3%, 9% 100%, 0.3% 98.8%, 0.8% 77%, 0% 56%, 0.7% 34%, 0% 14%)";

type PostItProps = {
  children: React.ReactNode;
  /** position, largeur, rotation, z-index */
  className?: string;
  /** padding intérieur du papier */
  paperClassName?: string;
  tape?: boolean;
  tapeClassName?: string;
  liftedCorner?: boolean;
  heart?: boolean;
  heartClassName?: string;
};

export default function PostIt({
  children,
  className = "relative",
  paperClassName = "px-5 pb-7 pt-8",
  tape = true,
  tapeClassName = "left-1/2 top-[-13px] h-[26px] w-[72px] -translate-x-1/2 rotate-[4deg]",
  liftedCorner = true,
  heart = false,
  heartClassName = "bottom-2 right-2.5 h-4 w-4 lg:bottom-3 lg:right-3.5 lg:h-5 lg:w-5",
}: PostItProps) {
  return (
    <div
      className={className}
      style={{
        filter:
          "drop-shadow(0 2px 2px rgba(0,0,0,0.12)) drop-shadow(0 10px 14px rgba(0,40,52,0.22))",
      }}
    >
      {/* ombre du coin soulevé */}
      {liftedCorner && (
        <div
          aria-hidden
          className="
          absolute
          bottom-[48px]
          left-[31%]
          z-40
          w-[132px]
          rotate-[-4deg]
          sm:left-[36%]
          lg:bottom-[max(5%,52px)]
          lg:left-[21%]
          lg:w-[190px]
          lg:rotate-[-5deg]
        "
        />
      )}

      {/* papier */}
      <div
        className={`relative ${paperClassName}`}
        style={{
          background: "linear-gradient(170deg, #faf6ee 0%, #f2ecdf 100%)",
          clipPath: PAPER_EDGES,
        }}
      >
        {children}

        {heart && (
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className={`absolute -rotate-[8deg] text-accent ${heartClassName}`}
          >
            <path
              d="M12 20.5s-7.2-4.4-8.7-9.1C2.1 7.8 4.5 4.8 7.5 5c2 .1 3.5 1.4 4.4 3.1.9-1.8 2.6-3.2 4.7-3.2 3 0 5.1 3 3.9 6.4-1.6 4.6-8.5 9.2-8.5 9.2z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* scotch hors du papier (sinon coupé par le clip-path) */}
      {tape && <Tape className={tapeClassName} />}
    </div>
  );
}
