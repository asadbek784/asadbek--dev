import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LangSwitcher from './LangSwitcher';
import { useLang } from '@/i18n/LangContext';
import { t } from '@/i18n/translations';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { lang } = useLang();
  const tr = t[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about',    label: tr.about    },
    { href: '#skills',   label: tr.skills   },
    { href: '#projects', label: tr.projects },
    { href: '#contact',  label: tr.contact  },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between"
        style={{
          background: scrolled ? 'rgba(6,6,8,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          borderRadius: scrolled ? 16 : 0,
          padding: '10px 20px',
          transition: 'all 0.3s ease',
        }}>

        {/* Logo */}
        <a href="#" style={{
          fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '1.1rem',
          background: 'linear-gradient(120deg, var(--acid), #78ff9a)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          textDecoration: 'none',
        }}>
          AK<span style={{ color: 'var(--acid)', WebkitTextFillColor: 'var(--acid)' }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href}
              style={{ fontFamily:'"Cabinet Grotesk",sans-serif', fontWeight:600, fontSize:'0.875rem',
                color:'var(--text-2)', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Right: LangSwitcher + burger */}
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <button className="md:hidden p-2 rounded-lg panel" onClick={() => setOpen(!open)}>
            {open ? <X className="w-4 h-4" style={{ color:'var(--text-1)' }} />
                  : <Menu className="w-4 h-4" style={{ color:'var(--text-1)' }} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
          className="md:hidden mt-2 mx-4 panel p-4 space-y-2">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-2 px-3 rounded-lg transition-colors"
              style={{ fontFamily:'"Cabinet Grotesk",sans-serif', fontWeight:600,
                fontSize:'0.9rem', color:'var(--text-2)', textDecoration:'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--acid)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
