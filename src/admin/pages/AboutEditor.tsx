import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User } from 'lucide-react';
import { aboutService } from '@/services/about.service';
import type { AboutSection } from '@/types';
import { fadeInUp, staggerContainer } from '@/animations/variants';
import Button from '@/components/ui/Button';
import ImageUploader from '@/admin/components/ImageUploader';
import toast from 'react-hot-toast';

export default function AboutEditor() {
  const [about, setAbout] = useState<AboutSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    aboutService.get().then((data) => {
      setAbout(data);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about?.id) return;

    setIsSaving(true);
    try {
      await aboutService.update(about.id, {
        biography: about.biography,
        experience_years: about.experience_years,
        location: about.location,
        profile_image_url: about.profile_image_url,
      });
      toast.success('About section updated');
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
          <User className="w-8 h-8 text-acid" />
          About Section
        </h1>
        <p className="text-white/55">Edit your biography and details</p>
      </motion.div>

      <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="panel p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/55">Profile Image</label>
          <ImageUploader
            value={about?.profile_image_url || undefined}
            onChange={(url) => setAbout(prev => prev ? { ...prev, profile_image_url: url } : null)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/55">Biography</label>
          <textarea
            value={about?.biography || ''}
            onChange={(e) => setAbout(prev => prev ? { ...prev, biography: e.target.value } : null)}
            rows={6}
            className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">Experience (Years)</label>
            <input
              type="number"
              value={about?.experience_years || 0}
              onChange={(e) => setAbout(prev => prev ? { ...prev, experience_years: parseInt(e.target.value) || 0 } : null)}
              className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">Location</label>
            <input
              value={about?.location || ''}
              onChange={(e) => setAbout(prev => prev ? { ...prev, location: e.target.value } : null)}
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
