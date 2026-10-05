export default function CRTOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Lignes verticales */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.16) 0px,
              rgba(0, 0, 0, 0.16) 1px,
              transparent 1px,
              transparent 3px
            )
          `,
        }}
      />

      {/* Scanlines horizontales très fines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.12) 0px,
              rgba(0, 0, 0, 0.12) 1px,
              transparent 1px,
              transparent 4px
            )
          `,
        }}
      />

      {/* Vignettage écran */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.22) 100%)",
        }}
      />

      {/* Légère lumière d'écran */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,0,80,.08), transparent 35%, rgba(0,180,255,.08))",
        }}
      />
    </div>
  );
}
