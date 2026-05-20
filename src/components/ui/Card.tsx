import { cn } from '@/lib/utils';
interface CardProps { children: React.ReactNode; className?: string; hover?: boolean; }
export default function Card({ children, className, hover }: CardProps) {
  return (
    <div className={cn('panel p-6', hover && 'panel-hover', className)}>
      {children}
    </div>
  );
}
