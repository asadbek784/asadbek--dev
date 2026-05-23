import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Search, Plus, X } from 'lucide-react';
import { seoService } from '@/services/seo.service';
import type { SEOSettings } from '@/types';
import { fadeInUp, staggerContainer } from '@/animations/variants';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function SEOEditor() {
  const [seo, setSeo] = useState<SEOSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    seoService.get().then((data) => {
      setSeo(data);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seo?.id) return;

    setIsSaving(true);
    try {
      await seoService.update(seo.id, {
        meta_title: seo.meta_title,
        meta_description: seo.meta_description,
        keywords: seo.keywords,
      });
      toast.success('SEO settings updated');
    } catch (error) {
      toast.error('Failed to update');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    setSeo(prev => prev ? { ...prev, keywords: [...prev.keywords, newKeyword.trim()] } : null);
    setNewKeyword('');
  };

  const removeKeyword = (index: number) => {
    setSeo(prev => prev ? { ...prev, keywords: prev.keywords.filter((_, i) => i !== index) } : null);
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
          <Search className="w-8 h-8 text-acid" />
          SEO Settings
        </h1>
        <p className="text-white/55">Manage your site metadata</p>
      </motion.div>

      <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="panel p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/55">Meta Title</label>
          <input
            value={seo?.meta_title || ''}
            onChange={(e) => setSeo(prev => prev ? { ...prev, meta_title: e.target.value } : null)}
            className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/55">Meta Description</label>
          <textarea
            value={seo?.meta_description || ''}
            onChange={(e) => setSeo(prev => prev ? { ...prev, meta_description: e.target.value } : null)}
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/55">Keywords</label>
          <div className="flex gap-2">
            <input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
              placeholder="Add keyword and press Enter"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
            />
            <Button type="button" variant="outline" onClick={addKeyword} className="gap-2">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {seo?.keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-acid/10 text-acid text-sm border border-acid/20"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(index)}
                  className="hover:text-rose transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
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
