import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, ImageIcon } from 'lucide-react';
import { projectsService } from '@/services/projects.service';
import type { Project, ProjectImage } from '@/types';
import Loader from '@/components/ui/Loader';
import { pageTransition } from '@/animations/variants';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const data = await projectsService.getBySlug(slug);
        if (data) { setProject(data); setImages(await projectsService.getImages(data.id)); }
      } catch { navigate('/404'); }
      finally { setIsLoading(false); }
    }
    load();
  }, [slug, navigate]);

  if (isLoading) return <Loader fullScreen />;
  if (!project) return null;

  return (
    <motion.div
      variants={pageTransition} initial="initial" animate="animate" exit="exit"
      className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-10 group transition-colors"
        style={{ color: 'var(--text-2)', fontFamily: '"Cabinet Grotesk", sans-serif', fontWeight: 500 }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--acid)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </button>

      <div className="mb-10">
        <div className="section-label mb-4" style={{ display: 'inline-flex' }}>
          {project.featured ? 'Featured' : 'Project'}
        </div>
        <h1 style={{
          fontFamily: '"Clash Display", sans-serif', fontWeight: 700,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1,
          background: 'linear-gradient(120deg, #fff 40%, rgba(255,255,255,0.55) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          marginBottom: 12,
        }}>
          {project.title}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: '1rem', maxWidth: 560 }}>{project.short_description}</p>
      </div>

      {project.thumbnail_url && (
        <div className="relative rounded-2xl overflow-hidden mb-12 panel" style={{ aspectRatio: '16/9' }}>
          <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,6,8,0.5), transparent)' }} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="panel p-7">
            <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700,
              fontSize: '1.3rem', color: 'var(--acid)', marginBottom: 14 }}>
              About
            </h2>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {project.full_description}
            </p>
          </div>

          {images.length > 0 && (
            <div className="panel p-7">
              <h2 className="flex items-center gap-2" style={{
                fontFamily: '"Clash Display", sans-serif', fontWeight: 700,
                fontSize: '1.3rem', color: 'var(--acid)', marginBottom: 18 }}>
                <ImageIcon className="w-5 h-5" /> Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map(img => (
                  <div key={img.id} className="rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img src={img.image_url} alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="panel p-6 sticky top-8 space-y-3">
            <h3 style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700,
              fontSize: '1.1rem', color: '#fff', marginBottom: 8 }}>Links</h3>
            {project.github_url && (
              <button
                onClick={() => window.open(project.github_url!, '_blank')}
                className="w-full flex items-center justify-center gap-2 btn-ghost"
              >
                <Github className="w-4 h-4" /> View Source
              </button>
            )}
            {project.live_url && (
              <button
                onClick={() => window.open(project.live_url!, '_blank')}
                className="w-full flex items-center justify-center gap-2 btn-acid"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
