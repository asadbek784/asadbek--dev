import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, FolderOpen, Cpu } from 'lucide-react';
import { aboutService } from '@/services/about.service';
import type { AboutSection as AboutSectionType } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ duration:0.65, delay:i*0.1, ease:[0.22,1,0.36,1] } }),
};
const slideLeft  = { hidden:{ opacity:0, x:-40 }, visible:{ opacity:1, x:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } };
const slideRight = { hidden:{ opacity:0, x:40  }, visible:{ opacity:1, x:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } };

export default function AboutSection() {
  const [about, setAbout] = useState<AboutSectionType | null>(null);
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  useEffect(() => { aboutService.get().then(setAbout).catch(console.error); }, []);

  const stats = [
    { icon: Briefcase, value: about?.experience_years || '3+', label: 'Years exp.',  color: 'var(--acid)'   },
    { icon: MapPin,    value: about?.location || 'Uzbekistan',  label: 'Location',   color: 'var(--indigo)' },
    { icon: FolderOpen,value: '20+',                            label: 'Projects',   color: 'var(--rose)'   },
    { icon: Cpu,       value: '15+',                            label: 'Technologies',color:'var(--amber)'  },
  ];

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative" ref={ref}>

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute', top:'50%', right:'-5%', width:'35vw', height:'35vw',
          background:'radial-gradient(ellipse, rgba(108,108,255,0.06) 0%, transparent 70%)',
          borderRadius:'50%', transform:'translateY(-50%)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <motion.div
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center mb-20"
        >
          <motion.div variants={fadeUp} custom={0} className="mb-4">
            <span className="section-label">About Me</span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="display-title max-w-xl">
            Crafting Digital<br />
            <span className="heading-acid">Experiences</span>
          </motion.h2>
        </motion.div>

        {/* Two col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Profile visual */}
          <motion.div
            variants={slideLeft}
            initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative" style={{ width: 320, height: 320 }}>
              {/* Orbit rings */}
              <div className="absolute inset-0 rounded-full animate-spin-slow"
                style={{ border: '1px solid rgba(184,255,60,0.12)' }} />
              <div className="absolute inset-4 rounded-full animate-spin-slow animation-delay-300"
                style={{ border:'1px solid rgba(108,108,255,0.1)', animationDirection:'reverse', animationDuration:'18s' }} />

              {/* Acid glow */}
              <div className="absolute inset-0 rounded-full blur-3xl"
                style={{ background:'rgba(184,255,60,0.06)' }} />

              {/* Photo */}
              <div className="absolute inset-8 rounded-full overflow-hidden panel"
                style={{ border:'1px solid rgba(184,255,60,0.15)' }}>
                {about?.profile_image_url ? (
                  <img src={about.profile_image_url} alt="Asadbek" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"
                    style={{ background:'linear-gradient(135deg, rgba(184,255,60,0.08), rgba(108,108,255,0.08))' }}>
                    <span style={{ fontFamily:'"Clash Display",sans-serif', fontSize:'3rem', fontWeight:700,
                      background:'linear-gradient(120deg, var(--acid), var(--indigo))',
                      WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                      AK
                    </span>
                  </div>
                )}
              </div>

              {/* Accent corners */}
              <div className="absolute top-0 right-0 w-5 h-5"
                style={{ borderTop:'2px solid var(--acid)', borderRight:'2px solid var(--acid)', opacity:0.6 }} />
              <div className="absolute bottom-0 left-0 w-5 h-5"
                style={{ borderBottom:'2px solid var(--indigo)', borderLeft:'2px solid var(--indigo)', opacity:0.6 }} />

              {/* Available badge */}
              <motion.div
                animate={{ y:[-4,4,-4] }} transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
                className="absolute -bottom-4 -right-2 panel px-3 py-2"
                style={{ border:'1px solid rgba(184,255,60,0.25)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-acid animate-pulse-acid block" />
                  <span style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.7rem', color:'var(--acid)' }}>
                    Available
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={slideRight}
            initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <p style={{ fontSize:'1.05rem', lineHeight:1.8, color:'var(--text-2)' }}>
              {about?.biography ||
                "I'm a passionate full-stack developer from Uzbekistan building futuristic digital experiences. I bridge the gap between design and engineering — turning ideas into high-performance web products with React, Python, and AI integrations."}
            </p>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="stat-card group">
                  <Icon className="w-4 h-4 mb-1 transition-colors" style={{ color }} />
                  <div style={{ fontFamily:'"Clash Display",sans-serif', fontWeight:700, fontSize:'1.4rem', color:'#fff' }}>
                    {value}
                  </div>
                  <div style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.65rem', letterSpacing:'0.12em',
                    textTransform:'uppercase', color:'var(--text-3)' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
