export default function SkyBackground() {
  return (
    <div className="fixed inset-0 h-[100lvh] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      >
        <source src="/videos/clouds.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
