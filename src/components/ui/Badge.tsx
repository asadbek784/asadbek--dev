import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'acid' | 'indigo' | 'rose' | 'default';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    acid:    { background:'rgba(184,255,60,0.1)',  color:'#b8ff3c', borderColor:'rgba(184,255,60,0.25)' },
    indigo:  { background:'rgba(108,108,255,0.1)', color:'#6c6cff', borderColor:'rgba(108,108,255,0.25)' },
    rose:    { background:'rgba(255,77,109,0.1)',  color:'#ff4d6d', borderColor:'rgba(255,77,109,0.25)' },
    default: { background:'rgba(255,255,255,0.05)', color:'var(--text-2)', borderColor:'rgba(255,255,255,0.1)' },
  };
  const v = variants[variant];
  return (
    <span
      className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs border', className)}
      style={{ ...v, fontFamily:'"Instrument Mono",monospace', letterSpacing:'0.06em' }}
    >
      {children}
    </span>
  );
}
