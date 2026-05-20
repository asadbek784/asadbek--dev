interface Props { fullScreen?: boolean; }

export default function Loader({ fullScreen }: Props) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'fixed inset-0 z-50' : 'p-12'}`}
      style={{ background: fullScreen ? 'var(--bg)' : 'transparent' }}>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full animate-spin"
          style={{ border:'2px solid transparent', borderTopColor:'var(--acid)',
            borderRightColor:'rgba(184,255,60,0.2)', animationDuration:'0.8s' }} />
        <div className="absolute inset-2 rounded-full animate-spin"
          style={{ border:'1px solid transparent', borderTopColor:'var(--indigo)',
            animationDuration:'1.2s', animationDirection:'reverse' }} />
      </div>
    </div>
  );
}
