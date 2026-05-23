import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-250 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
    const variants = {
      primary: 'bg-acid text-black hover:shadow-[0_0_24px_rgba(184,255,60,0.35)] hover:-translate-y-0.5',
      secondary: 'bg-transparent border border-white/10 text-white hover:border-acid/30 hover:-translate-y-0.5',
      outline:  'border border-white/10 text-white hover:border-white/25 hover:bg-white/5',
      ghost:    'hover:bg-white/5 text-text-2 hover:text-white',
      danger:   'bg-rose/10 border border-rose/30 text-rose hover:bg-rose/20',
    };
    const sizes = { sm:'h-9 px-3 text-sm', md:'h-11 px-6 text-sm', lg:'h-12 px-8' };
    return (
      <button className={cn(base, variants[variant], sizes[size], className)} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
