export default function SkeletonCard() {
  return (
    <div className="panel overflow-hidden" style={{ borderColor:'var(--border)' }}>
      <div className="animate-pulse">
        <div style={{ aspectRatio:'16/9', background:'rgba(255,255,255,0.04)' }} />
        <div className="p-5 space-y-3">
          <div className="h-4 rounded-full" style={{ background:'rgba(255,255,255,0.06)', width:'65%' }} />
          <div className="h-3 rounded-full" style={{ background:'rgba(255,255,255,0.04)', width:'90%' }} />
          <div className="h-3 rounded-full" style={{ background:'rgba(255,255,255,0.04)', width:'75%' }} />
        </div>
      </div>
    </div>
  );
}
