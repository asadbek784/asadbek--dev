import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skillsService } from '@/services/skills.service';
import type { Skill } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const fadeUp = {
  hidden:  { opacity:0, y:20 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ duration:0.55, delay:i*0.07, ease:[0.22,1,0.36,1] } }),
};

const CAT_COLORS: Record<string, { accent: string; dim: string }> = {
  Frontend: { accent:'#b8ff3c', dim:'rgba(184,255,60,0.08)'  },
  Backend:  { accent:'#6c6cff', dim:'rgba(108,108,255,0.08)' },
  Mobile:   { accent:'#ff4d6d', dim:'rgba(255,77,109,0.08)'  },
  DevOps:   { accent:'#00ffb3', dim:'rgba(0,255,179,0.08)'   },
  Tools:    { accent:'#ffab00', dim:'rgba(255,171,0,0.08)'   },
  Design:   { accent:'#ff7eb3', dim:'rgba(255,126,179,0.08)' },
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });

  useEffect(() => { skillsService.getAll().then(setSkills).catch(console.error); }, []);

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const getIcon = (key: string): LucideIcon =>
    (LucideIcons as unknown as Record<string, LucideIcon>)[key] || LucideIcons.Code;

  return (
    <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 relative" ref={ref}>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center mb-20">
          <motion.div variants={fadeUp} custom={0} className="mb-4">
            <span className="section-label">Skills</span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="display-title">
            Technologies &amp; <span className="heading-acid">Expertise</span>
          </motion.h2>
        </motion.div>

        <div className="space-y-14">
          {Object.entries(grouped).map(([category, catSkills]) => {
            const col = CAT_COLORS[category] || CAT_COLORS.Frontend;
            return (
              <div key={category}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full"
                    style={{ background: col.accent, boxShadow:`0 0 6px ${col.accent}` }} />
                  <span style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.7rem',
                    letterSpacing:'0.18em', textTransform:'uppercase', color: col.accent }}>
                    {category}
                  </span>
                  <div className="flex-1 h-px"
                    style={{ background:`linear-gradient(90deg, ${col.accent}40, transparent)` }} />
                  <span style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.65rem',
                    color:'var(--text-3)' }}>
                    {catSkills.length} tools
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {catSkills.map((skill, i) => {
                    const Icon = getIcon(skill.icon_key);
                    return (
                      <motion.div
                        key={skill.id}
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        custom={i}
                        className="skill-card"
                        style={{ borderColor: `${col.accent}1a` }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg"
                            style={{ background: col.dim, border:`1px solid ${col.accent}2a` }}>
                            <Icon className="w-4 h-4" style={{ color: col.accent }} />
                          </div>
                          <span style={{ fontFamily:'"Cabinet Grotesk",sans-serif', fontWeight:700,
                            color:'var(--text-1)', fontSize:'0.9rem' }}>
                            {skill.name}
                          </span>
                          <span className="ml-auto" style={{ fontFamily:'"Instrument Mono",monospace',
                            fontSize:'0.75rem', fontWeight:600, color: col.accent }}>
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="prog-track">
                          <motion.div
                            className="prog-fill"
                            initial={{ width: 0 }}
                            animate={isInView ? { width:`${skill.proficiency}%` } : { width:0 }}
                            transition={{ duration: 1.4, delay: i * 0.05, ease:'easeOut' }}
                            style={{ background:`linear-gradient(90deg, ${col.accent}, ${col.accent}99)` }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
