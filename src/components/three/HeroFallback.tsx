export default function HeroFallback() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[140px]"
        style={{ background: 'rgba(184,255,60,0.06)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px]"
        style={{ background: 'rgba(108,108,255,0.07)' }} />
    </div>
  );
}
