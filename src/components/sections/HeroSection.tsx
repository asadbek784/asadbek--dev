import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { heroService } from '@/services/hero.service';
import type { HeroSection as HeroSectionType } from '@/types';

const HeroScene = lazy(() => import('@/components/three/HeroScene'));
const HeroFallback = lazy(() => import('@/components/three/HeroFallback'));

const ROLES = ['Full-Stack Developer', 'Creative Technologist', 'AI Engineer', 'UI Architect'];

function RotatingRole() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % ROLES.length); setVisible(true); }, 350);
    }, 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className="text-acid-glow font-body"
      style={{
        display: 'inline-block',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      {ROLES[idx]}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22,1,0.36,1] } }),
};

export default function HeroSection() {
  const [hero, setHero] = useState<HeroSectionType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => { heroService.get().then(setHero).catch(console.error); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 3D BG */}
      <Suspense fallback={<div className="absolute inset-0" style={{ background: 'var(--bg)' }} />}>
        {isMobile ? <HeroFallback /> : <HeroScene />}
      </Suspense>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-0" />

      {/* Ambient left glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div style={{
          position:'absolute', top:'20%', left:'-10%',
          width:'55vw', height:'55vw',
          background:'radial-gradient(ellipse, rgba(184,255,60,0.05) 0%, transparent 70%)',
          borderRadius:'50%',
        }} />
        <div style={{
          position:'absolute', bottom:'10%', right:'-5%',
          width:'40vw', height:'40vw',
          background:'radial-gradient(ellipse, rgba(108,108,255,0.07) 0%, transparent 70%)',
          borderRadius:'50%',
        }} />
      </div>

      {/* Scan line */}
      <div
        className="pointer-events-none absolute left-0 right-0 z-10"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(184,255,60,0.4) 50%, transparent 100%)',
          animation: 'scan 8s linear infinite',
          animationDelay: '2s',
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Eyebrow badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="flex justify-center mb-8">
          <div className="section-label">
            <span className="cursor-blink text-acid" style={{ marginLeft: 4 }}>▋</span>
            &nbsp;Portfolio v2025
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="mb-4">
          <h1 style={{
            fontFamily: '"Clash Display", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(4rem, 13vw, 9.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            color: '#fff',
            textShadow: '0 0 80px rgba(184,255,60,0.08)',
          }}>
            {hero?.title || 'Asadbek'}
          </h1>
          <h1 style={{
            fontFamily: '"Clash Display", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(4rem, 13vw, 9.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(120deg, #b8ff3c 0%, #78ff9a 60%, #b8ff3c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Komilov
          </h1>
        </motion.div>

        {/* Role */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="mb-6">
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: 'var(--text-2)', fontFamily: '"Cabinet Grotesk", sans-serif', fontWeight: 500 }}>
            <RotatingRole />
          </p>
        </motion.div>

        {/* Chips */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex flex-wrap justify-center gap-2 mb-10">
          {['React', 'Python', 'Three.js', 'AI/ML', 'TypeScript'].map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <a href={hero?.cta_primary_url || '#projects'} className="btn-acid">
            <Zap className="w-4 h-4" />
            {hero?.cta_primary_label || 'View Projects'}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href={hero?.cta_secondary_url || '#about'} className="btn-ghost">
            {hero?.cta_secondary_label || 'About Me'}
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}
          className="inline-flex items-center gap-8 px-8 py-4 panel"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {[
            { v: '20+', l: 'Projects' },
            { v: '3+', l: 'Years' },
            { v: '15+', l: 'Technologies' },
          ].map((s, i) => (
            <div key={s.l} className="text-center" style={{ borderRight: i < 2 ? '1px solid var(--border)' : 'none', paddingRight: i < 2 ? 32 : 0 }}>
              <div style={{ fontFamily:'"Clash Display",sans-serif', fontWeight:700, fontSize:'1.6rem', color:'var(--acid)' }}>{s.v}</div>
              <div style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.65rem', letterSpacing:'0.15em', color:'var(--text-3)', textTransform:'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div style={{ width:1, height:48, background:'linear-gradient(to bottom, var(--acid), transparent)', opacity:0.4 }} className="animate-pulse" />
        <span style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.6rem', letterSpacing:'0.2em', color:'var(--text-3)', textTransform:'uppercase' }}>scroll</span>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background:'linear-gradient(to top, var(--bg), transparent)' }} />
    </section>
  );
}
