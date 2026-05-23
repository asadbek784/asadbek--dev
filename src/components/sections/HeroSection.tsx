import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { t } from '@/i18n/translations';

const HeroScene   = lazy(() => import('@/components/three/HeroScene'));
const HeroFallback = lazy(() => import('@/components/three/HeroFallback'));

function RotatingRole() {
  const { lang } = useLang();
  const roles = t[lang].roles;
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setIdx(0);
  }, [lang]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % roles.length); setVisible(true); }, 350);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <span
      style={{
        display: 'inline-block',
        color: 'var(--acid)',
        textShadow: '0 0 16px rgba(184,255,60,0.5)',
        fontFamily: '"Clash Display", sans-serif',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      {roles[idx]}
    </span>
  );
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22,1,0.36,1] } }),
};

export default function HeroSection() {
  const { lang } = useLang();
  const tr = t[lang];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <Suspense fallback={<div className="absolute inset-0" style={{ background: 'var(--bg)' }} />}>
        {isMobile ? <HeroFallback /> : <HeroScene />}
      </Suspense>

      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-0" />

      <div className="absolute inset-0 pointer-events-none z-0">
        <div style={{ position:'absolute', top:'20%', left:'-10%', width:'55vw', height:'55vw',
          background:'radial-gradient(ellipse, rgba(184,255,60,0.05) 0%, transparent 70%)', borderRadius:'50%' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'-5%', width:'40vw', height:'40vw',
          background:'radial-gradient(ellipse, rgba(108,108,255,0.07) 0%, transparent 70%)', borderRadius:'50%' }} />
      </div>

      {/* Scan line */}
      <div className="pointer-events-none absolute left-0 right-0 z-10" style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(184,255,60,0.4) 50%, transparent 100%)',
        animation: 'scan 8s linear infinite',
        animationDelay: '2s',
      }} />

      {/* ── CONTENT ── */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="flex justify-center mb-8">
          <div className="section-label">
            <span className="cursor-blink" style={{ marginLeft:4, color:'var(--acid)' }}>▋</span>
            &nbsp;Portfolio 2025
          </div>
        </motion.div>

        {/* Name — only once */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="mb-4">
          <h1 style={{
            fontFamily: '"Clash Display", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(3.5rem, 12vw, 8.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(120deg, #ffffff 30%, rgba(255,255,255,0.6) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Asadbek Komilov
          </h1>
        </motion.div>

        {/* Role */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="mb-4">
          <p style={{ fontSize:'clamp(1rem, 2.2vw, 1.3rem)', color:'var(--text-2)',
            fontFamily:'"Cabinet Grotesk",sans-serif', fontWeight:500 }}>
            <RotatingRole />
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mb-8">
          <p style={{ color:'var(--text-3)', fontSize:'0.9rem', maxWidth:460,
            margin:'0 auto', lineHeight:1.7, fontFamily:'"Cabinet Grotesk",sans-serif' }}>
            {tr.heroDesc}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <a href="#projects" className="btn-acid">
            <Zap className="w-4 h-4" />
            {tr.viewProjects}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#about" className="btn-ghost">{tr.aboutMe}</a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}
          className="inline-flex items-center gap-8 px-8 py-4 panel"
          style={{ borderColor:'rgba(255,255,255,0.06)' }}>
          {[
            { v: '6',   l: tr.monthsLabel },
            { v: '5+',  l: tr.techLabel   },
            { v: '🔥',  l: tr.statusLabel },
          ].map((s, i) => (
            <div key={s.l} className="text-center" style={{
              borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              paddingRight: i < 2 ? 32 : 0,
            }}>
              <div style={{ fontFamily:'"Clash Display",sans-serif', fontWeight:700,
                fontSize:'1.5rem', color:'var(--acid)' }}>{s.v}</div>
              <div style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.62rem',
                letterSpacing:'0.15em', color:'var(--text-3)', textTransform:'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div style={{ width:1, height:48,
          background:'linear-gradient(to bottom, var(--acid), transparent)', opacity:0.4 }} className="animate-pulse" />
        <span style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.6rem',
          letterSpacing:'0.2em', color:'var(--text-3)', textTransform:'uppercase' }}>scroll</span>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background:'linear-gradient(to top, var(--bg), transparent)' }} />
    </section>
  );
}
 
