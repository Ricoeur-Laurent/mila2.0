import Image from "next/image";
import Tape from "./Tape";

type PolaroidProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  tape?: boolean;
  tapeClassName?: string;
};

export default function Polaroid({
  src,
  alt,
  label,
  className = "",
  tape = true,
  tapeClassName = "left-1/2 top-[-15px] h-[34px] w-[92px] -translate-x-1/2 rotate-[-4deg]",
}: PolaroidProps) {
  return (
    <figure
      className={`
        ${className}
        border-[1.5px]
        border-black
        bg-[#f8f1e4]
        p-[10px]
        pb-[40px]
        shadow-[5px_5px_0_#000,0_18px_35px_rgba(0,40,52,0.3)]
        lg:shadow-[8px_8px_0_#000,0_22px_40px_rgba(0,40,52,0.3)]
      `}
    >
      {tape && <Tape className={tapeClassName} />}

      {/* Photo */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-black/20 bg-black/10">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 160px, 360px"
          className="object-cover"
        />
      </div>

      {/* Légende */}
      {label && (
        <figcaption
          className="
            absolute
            bottom-[10px]
            left-0
            w-full
            text-center
            font-display
            text-[15px]
            italic
            tracking-[0.02em]
            text-petrol/80
          "
        >
          {label}
        </figcaption>
      )}
    </figure>
  );
}
