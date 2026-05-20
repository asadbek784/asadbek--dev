import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, FolderGit, Star } from 'lucide-react';
import { projectsService } from '@/services/projects.service';
import type { Project } from '@/types';
import DataTable from '@/admin/components/DataTable';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import ImageUploader from '@/admin/components/ImageUploader';
import { fadeInUp, staggerContainer } from '@/animations/variants';
import { slugify } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ProjectFormData {
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  thumbnail_url: string;
  github_url: string;
  live_url: string;
  featured: boolean;
  sort_order: number;
}

const initialForm: ProjectFormData = {
  title: '',
  slug: '',
  short_description: '',
  full_description: '',
  thumbnail_url: '',
  github_url: '',
  live_url: '',
  featured: false,
  sort_order: 0,
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectFormData>(initialForm);
  const [isSaving, setIsSaving] = useState(false);

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await projectsService.getAll();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreate = () => {
    setEditingProject(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      short_description: project.short_description,
      full_description: project.full_description,
      thumbnail_url: project.thumbnail_url || '',
      github_url: project.github_url || '',
      live_url: project.live_url || '',
      featured: project.featured,
      sort_order: project.sort_order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Delete "${project.title}"?`)) return;
    try {
      await projectsService.delete(project.id);
      toast.success('Project deleted');
      loadProjects();
    } catch (error) {
      toast.error('Failed to delete');
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const data = {
        ...form,
        slug: form.slug || slugify(form.title),
      };

      if (editingProject) {
        await projectsService.update(editingProject.id, data);
        toast.success('Project updated');
      } else {
        await projectsService.create(data);
        toast.success('Project created');
      }
      setIsModalOpen(false);
      loadProjects();
    } catch (error) {
      toast.error('Failed to save');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    {
      key: 'featured',
      label: 'Featured',
      render: (project: Project) => project.featured ? (
        <span className="flex items-center gap-1 text-rose">
          <Star className="w-4 h-4 fill-rose" />
          Yes
        </span>
      ) : (
        <span className="text-white/55">No</span>
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
            <FolderGit className="w-8 h-8 text-acid" />
            Projects Manager
          </h1>
          <p className="text-white/55">Manage your portfolio projects</p>
        </div>
        <Button variant="primary" onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <DataTable
          data={projects}
          columns={columns}
          onEdit={openEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add Project'}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">Thumbnail</label>
            <ImageUploader
              value={form.thumbnail_url || undefined}
              onChange={(url) => setForm({ ...form, thumbnail_url: url })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/55">Title</label>
              <input
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm(prev => ({
                    ...prev,
                    title,
                    slug: editingProject ? prev.slug : slugify(title),
                  }));
                }}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/55">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">Short Description</label>
            <input
              value={form.short_description}
              onChange={(e) => setForm({ ...form, short_description: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">Full Description</label>
            <textarea
              value={form.full_description}
              onChange={(e) => setForm({ ...form, full_description: e.target.value })}
              rows={4}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/55">GitHub URL</label>
              <input
                value={form.github_url}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/55">Live URL</label>
              <input
                value={form.live_url}
                onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 accent-acid rounded"
              />
              <span className="text-sm text-white/55">Featured Project</span>
            </label>
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-white/55">Sort Order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full gap-2" disabled={isSaving}>
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
          </Button>
        </form>
      </Modal>
    </motion.div>
  );
}
