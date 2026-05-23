import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Type } from 'lucide-react';
import { heroService } from '@/services/hero.service';
import type { HeroSection } from '@/types';
import { fadeInUp, staggerContainer } from '@/animations/variants';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function HeroEditor() {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    heroService.get().then((data) => {
      setHero(data);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hero?.id) return;

    setIsSaving(true);
    try {
      await heroService.update(hero.id, {
        title: hero.title,
        subtitle: hero.subtitle,
        cta_primary_label: hero.cta_primary_label,
        cta_primary_url: hero.cta_primary_url,
        cta_secondary_label: hero.cta_secondary_label,
        cta_secondary_url: hero.cta_secondary_url,
      });
      toast.success('Hero section updated');
    } catch (error) {
      toast.error('Failed to update');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-96 bg-white/5 rounded-xl" />;
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-2xl space-y-8"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-body font-bold text-white mb-2 flex items-center gap-3">
          <Type className="w-8 h-8 text-acid" />
          Hero Section
        </h1>
        <p className="text-white/55">Edit your main landing section</p>
      </motion.div>

      <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="panel p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/55">Title</label>
          <input
            value={hero?.title || ''}
            onChange={(e) => setHero(prev => prev ? { ...prev, title: e.target.value } : null)}
            className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/55">Subtitle</label>
          <textarea
            value={hero?.subtitle || ''}
            onChange={(e) => setHero(prev => prev ? { ...prev, subtitle: e.target.value } : null)}
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">Primary CTA Label</label>
            <input
              value={hero?.cta_primary_label || ''}
              onChange={(e) => setHero(prev => prev ? { ...prev, cta_primary_label: e.target.value } : null)}
              className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">Primary CTA URL</label>
            <input
              value={hero?.cta_primary_url || ''}
              onChange={(e) => setHero(prev => prev ? { ...prev, cta_primary_url: e.target.value } : null)}
              className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">Secondary CTA Label</label>
            <input
              value={hero?.cta_secondary_label || ''}
              onChange={(e) => setHero(prev => prev ? { ...prev, cta_secondary_label: e.target.value } : null)}
              className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">Secondary CTA URL</label>
            <input
              value={hero?.cta_secondary_url || ''}
              onChange={(e) => setHero(prev => prev ? { ...prev, cta_secondary_url: e.target.value } : null)}
              className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="gap-2" disabled={isSaving}>
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </motion.form>
    </motion.div>
  );
}
