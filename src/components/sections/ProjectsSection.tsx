import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Star, LayoutGrid } from 'lucide-react';
import { projectsService } from '@/services/projects.service';
import type { Project } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SkeletonCard from '@/components/ui/SkeletonCard';

const fadeUp = {
  hidden:  { opacity:0, y:28 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ duration:0.65, delay:i*0.09, ease:[0.22,1,0.36,1] } }),
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, isInView } = useScrollAnimation({ threshold: 0.04 });
  const navigate = useNavigate();

  useEffect(() => {
    projectsService.getAll()
      .then(d => { setProjects(d); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 relative" ref={ref}>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute', top:'30%', right:'-8%', width:'38vw', height:'38vw',
          background:'radial-gradient(ellipse, rgba(184,255,60,0.04) 0%, transparent 70%)',
          borderRadius:'50%' }} />
        <div style={{ position:'absolute', bottom:'20%', left:'-5%', width:'30vw', height:'30vw',
          background:'radial-gradient(ellipse, rgba(108,108,255,0.05) 0%, transparent 70%)',
          borderRadius:'50%' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center mb-20">
          <motion.div variants={fadeUp} custom={0} className="mb-4">
            <span className="section-label">Projects</span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="display-title mb-4">
            Featured <span className="heading-acid">Work</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2}
            style={{ color:'var(--text-2)', maxWidth:460, fontSize:'0.95rem' }}>
            A selection of projects crafted with precision and cutting-edge technology.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : projects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={i}
                className="project-card group"
                onClick={() => navigate(`/projects/${project.slug}`)}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden" style={{ aspectRatio:'16/9' }}>
                  {project.thumbnail_url ? (
                    <img
                      src={project.thumbnail_url} alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
                      style={{ background:'linear-gradient(135deg, rgba(184,255,60,0.05), rgba(108,108,255,0.06))' }}>
                      <div className="absolute inset-0 grid-bg opacity-20" />
                      <LayoutGrid className="w-10 h-10" style={{ color:'rgba(184,255,60,0.2)' }} />
                      <span className="absolute text-6xl font-body font-black"
                        style={{ color:'rgba(255,255,255,0.04)', fontFamily:'"Clash Display",sans-serif' }}>
                        {project.title[0]}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background:'linear-gradient(to top, rgba(6,6,8,0.85) 0%, transparent 60%)' }} />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full"
                      style={{ background:'rgba(184,255,60,0.12)', border:'1px solid rgba(184,255,60,0.3)' }}>
                      <Star className="w-3 h-3 fill-current" style={{ color:'var(--acid)' }} />
                      <span style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.65rem', color:'var(--acid)' }}>
                        Featured
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full"
                      style={{ background:'var(--acid)' }}>
                      <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 relative">
                  {/* Shimmer top border on hover */}
                  <div className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />

                  <h4 className="mb-1.5 transition-colors duration-300 group-hover:text-acid"
                    style={{ fontFamily:'"Cabinet Grotesk",sans-serif', fontWeight:700,
                      fontSize:'1rem', color:'var(--text-1)' }}>
                    {project.title}
                  </h4>
                  <p className="mb-4 line-clamp-2"
                    style={{ fontSize:'0.83rem', color:'var(--text-2)', lineHeight:1.7 }}>
                    {project.short_description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.github_url && (
                        <button onClick={e => { e.stopPropagation(); window.open(project.github_url!, '_blank'); }}
                          className="p-2 rounded-lg transition-all duration-200"
                          style={{ background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)' }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(184,255,60,0.3)')}
                          onMouseLeave={e => (e.currentTarget.style.borderColor='var(--border)')}>
                          <Github className="w-3.5 h-3.5" style={{ color:'var(--text-2)' }} />
                        </button>
                      )}
                      {project.live_url && (
                        <button onClick={e => { e.stopPropagation(); window.open(project.live_url!, '_blank'); }}
                          className="p-2 rounded-lg transition-all duration-200"
                          style={{ background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)' }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(184,255,60,0.3)')}
                          onMouseLeave={e => (e.currentTarget.style.borderColor='var(--border)')}>
                          <ExternalLink className="w-3.5 h-3.5" style={{ color:'var(--text-2)' }} />
                        </button>
                      )}
                    </div>
                    <span className="transition-colors duration-300 group-hover:text-acid"
                      style={{ fontFamily:'"Instrument Mono",monospace', fontSize:'0.7rem', color:'var(--text-3)' }}>
                      Details →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
