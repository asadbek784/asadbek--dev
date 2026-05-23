import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, Share2, Eye, EyeOff } from 'lucide-react';
import { socialService } from '@/services/social.service';
import type { SocialLink } from '@/types';
import DataTable from '@/admin/components/DataTable';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/animations/variants';
import toast from 'react-hot-toast';

interface SocialFormData {
  platform: string;
  url: string;
  icon_key: string;
  is_visible: boolean;
  sort_order: number;
}

const initialForm: SocialFormData = {
  platform: '',
  url: '',
  icon_key: 'Link',
  is_visible: true,
  sort_order: 0,
};

export default function SocialEditor() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [form, setForm] = useState<SocialFormData>(initialForm);
  const [isSaving, setIsSaving] = useState(false);

  const loadLinks = async () => {
    setIsLoading(true);
    const data = await socialService.getAllAdmin();
    setLinks(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const openCreate = () => {
    setEditingLink(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEdit = (link: SocialLink) => {
    setEditingLink(link);
    setForm({
      platform: link.platform,
      url: link.url,
      icon_key: link.icon_key,
      is_visible: link.is_visible,
      sort_order: link.sort_order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (link: SocialLink) => {
    if (!confirm(`Delete "${link.platform}"?`)) return;
    try {
      await socialService.delete(link.id);
      toast.success('Link deleted');
      loadLinks();
    } catch (error) {
      toast.error('Failed to delete');
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (editingLink) {
        await socialService.update(editingLink.id, form);
        toast.success('Link updated');
      } else {
        await socialService.create(form);
        toast.success('Link created');
      }
      setIsModalOpen(false);
      loadLinks();
    } catch (error) {
      toast.error('Failed to save');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: 'platform', label: 'Platform' },
    { key: 'url', label: 'URL', render: (link: SocialLink) => (
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-acid hover:underline text-sm truncate max-w-[200px] block">
        {link.url}
      </a>
    )},
    {
      key: 'is_visible',
      label: 'Visible',
      render: (link: SocialLink) => link.is_visible ? (
        <span className="flex items-center gap-1 text-green-400"><Eye className="w-4 h-4" /> Yes</span>
      ) : (
        <span className="flex items-center gap-1 text-white/55"><EyeOff className="w-4 h-4" /> No</span>
      ),
    },
    { key: 'sort_order', label: 'Order' },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-body font-bold text-white mb-2 flex items-center gap-3">
            <Share2 className="w-8 h-8 text-acid" />
            Social Links
          </h1>
          <p className="text-white/55">Manage your social media links</p>
        </div>
        <Button variant="primary" onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Link
        </Button>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <DataTable
          data={links}
          columns={columns}
          onEdit={openEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingLink ? 'Edit Link' : 'Add Link'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/55">Platform</label>
              <input
                value={form.platform}
                onChange={(e) => setForm({ ...form, platform: e.target.value })}
                required
                placeholder="e.g. GitHub"
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/55">Icon Key</label>
              <input
                value={form.icon_key}
                onChange={(e) => setForm({ ...form, icon_key: e.target.value })}
                placeholder="e.g. Github, Twitter"
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">URL</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_visible}
                onChange={(e) => setForm({ ...form, is_visible: e.target.checked })}
                className="w-4 h-4 accent-acid rounded"
              />
              <span className="text-sm text-white/55">Visible on site</span>
            </label>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/55">Sort Order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                className="w-24 px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full gap-2" disabled={isSaving}>
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : editingLink ? 'Update Link' : 'Create Link'}
          </Button>
        </form>
      </Modal>
    </motion.div>
  );
}
