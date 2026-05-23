import { motion } from 'framer-motion';
import { Github, Send, Instagram } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { t } from '@/i18n/translations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const fadeUp = {
  hidden:  { opacity:0, y:20 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ duration:0.6, delay:i*0.09, ease:[0.22,1,0.36,1] } }),
};

const SOCIALS = [
  { icon: Github,    platform: 'GitHub',    url: 'https://github.com/asadbek784',          color: '#fff'     },
  { icon: Send,      platform: 'Telegram',  url: 'https://t.me/Asadbek_784',               color: '#29b6f6'  },
  { icon: Instagram, platform: 'Instagram', url: 'https://www.instagram.com/sinekays_784', color: '#e1306c'  },
];

export default function SocialSection() {
  const { lang } = useLang();
  const tr = t[lang];
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  return (
    <footer id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="divider mb-20 max-w-6xl mx-auto" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width:'60vw', height:'40vh',
          background:'radial-gradient(ellipse, rgba(184,255,60,0.04) 0%, transparent 70%)',
          borderRadius:'50%' }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="space-y-12">

          <div>
            <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-5">
              <span className="section-label">{tr.contact}</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="display-title mb-4">
              {tr.connectTitle} <span className="heading-acid">{tr.connectAccent}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              style={{ color:'var(--text-2)', maxWidth:400, margin:'0 auto', fontSize:'0.95rem' }}>
              {tr.connectDesc}
            </motion.p>
          </div>

          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-3">
            {SOCIALS.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.platform}
                  variants={fadeUp} custom={i + 3}
                  href={link.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale:1.04, y:-3 }}
                  className="flex items-center gap-3 px-6 py-3 panel transition-all duration-300 group"
                  style={{ border:'1px solid var(--border)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = link.color + '55';
                    (e.currentTarget as HTMLElement).style.background  = link.color + '0d';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.background  = 'var(--surface)';
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: link.color }} />
                  <span style={{ fontFamily:'"Cabinet Grotesk",sans-serif', fontWeight:600,
                    fontSize:'0.9rem', color:'var(--text-1)' }}>
                    {link.platform}
                  </span>
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div variants={fadeUp} custom={6}
            className="pt-10 border-t" style={{ borderColor:'var(--border)' }}>
            <p style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.72rem',
              letterSpacing:'0.05em', color:'var(--text-3)' }}>
              {tr.footerBuilt}{' '}
              <span style={{ color:'var(--acid)' }}>React</span>
              {' · '}
              <span style={{ color:'var(--indigo)' }}>Three.js</span>
              {' · '}
              <span style={{ color:'var(--rose)' }}>Supabase</span>
              {' '}—{' '}
              <span style={{
                background:'linear-gradient(120deg, var(--acid), var(--indigo))',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                fontWeight:600,
              }}>
                Asadbek Komilov
              </span>
              {' '}© {new Date().getFullYear()}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
