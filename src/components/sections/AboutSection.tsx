import { motion } from 'framer-motion';
import { MapPin, Briefcase, FolderOpen, Cpu } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { t } from '@/i18n/translations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const fadeUp = {
  hidden:  { opacity:0, y:28 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ duration:0.65, delay:i*0.1, ease:[0.22,1,0.36,1] } }),
};
const slideLeft  = { hidden:{ opacity:0, x:-40 }, visible:{ opacity:1, x:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } };
const slideRight = { hidden:{ opacity:0, x:40  }, visible:{ opacity:1, x:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } };

export default function AboutSection() {
  const { lang } = useLang();
  const tr = t[lang];
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  const stats = [
    { icon: Briefcase, value: tr.experience, label: tr.yearsLabel,    color: 'var(--acid)'   },
    { icon: MapPin,    value: 'Guliston',     label: tr.location.split(',')[1]?.trim() || 'UZ', color: 'var(--indigo)' },
    { icon: FolderOpen,value: '0+',           label: tr.projects,      color: 'var(--rose)'   },
    { icon: Cpu,       value: '5+',           label: tr.technologies,  color: 'var(--amber)'  },
  ];

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute', top:'50%', right:'-5%', width:'35vw', height:'35vw',
          background:'radial-gradient(ellipse, rgba(108,108,255,0.06) 0%, transparent 70%)',
          borderRadius:'50%', transform:'translateY(-50%)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center mb-20">
          <motion.div variants={fadeUp} custom={0} className="mb-4">
            <span className="section-label">{tr.aboutSub}</span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="display-title max-w-xl">
            {tr.aboutTitle.split(' ').slice(0,-1).join(' ')}<br />
            <span className="heading-acid">{tr.aboutTitle.split(' ').slice(-1)[0]}</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Avatar */}
          <motion.div variants={slideLeft} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="flex justify-center lg:justify-start">
            <div className="relative" style={{ width:300, height:300 }}>
              <div className="absolute inset-0 rounded-full animate-spin-slow"
                style={{ border:'1px solid rgba(184,255,60,0.12)' }} />
              <div className="absolute inset-4 rounded-full animate-spin-slow animation-delay-300"
                style={{ border:'1px solid rgba(108,108,255,0.1)', animationDirection:'reverse', animationDuration:'18s' }} />
              <div className="absolute inset-0 rounded-full blur-3xl"
                style={{ background:'rgba(184,255,60,0.06)' }} />
              <div className="absolute inset-8 rounded-full overflow-hidden panel"
                style={{ border:'1px solid rgba(184,255,60,0.15)' }}>
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background:'linear-gradient(135deg, rgba(184,255,60,0.08), rgba(108,108,255,0.08))' }}>
                  <span style={{ fontFamily:'"Clash Display",sans-serif', fontSize:'3.5rem', fontWeight:700,
                    background:'linear-gradient(120deg, var(--acid), var(--indigo))',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                    AK
                  </span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-5 h-5"
                style={{ borderTop:'2px solid var(--acid)', borderRight:'2px solid var(--acid)', opacity:0.6 }} />
              <div className="absolute bottom-0 left-0 w-5 h-5"
                style={{ borderBottom:'2px solid var(--indigo)', borderLeft:'2px solid var(--indigo)', opacity:0.6 }} />
              <motion.div animate={{ y:[-4,4,-4] }} transition={{ duration:3.5, repeat:Infinity }}
                className="absolute -bottom-4 -right-2 panel px-3 py-2"
                style={{ border:'1px solid rgba(184,255,60,0.25)' }}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse-acid block" style={{ background:'var(--acid)' }} />
                  <span style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.7rem', color:'var(--acid)' }}>
                    {tr.available}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={slideRight} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8">
            <p style={{ fontSize:'1rem', lineHeight:1.85, color:'var(--text-2)' }}>{tr.bio}</p>
            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="stat-card group">
                  <Icon className="w-4 h-4 mb-1" style={{ color }} />
                  <div style={{ fontFamily:'"Clash Display",sans-serif', fontWeight:700,
                    fontSize:'1.3rem', color:'#fff' }}>{value}</div>
                  <div style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.62rem',
                    letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-3)' }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
