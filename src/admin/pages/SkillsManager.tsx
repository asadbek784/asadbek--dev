import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, Wrench } from 'lucide-react';
import { skillsService } from '@/services/skills.service';
import type { Skill } from '@/types';
import DataTable from '@/admin/components/DataTable';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/animations/variants';
import toast from 'react-hot-toast';

interface SkillFormData {
  name: string;
  icon_key: string;
  proficiency: number;
  category: string;
  sort_order: number;
}

const initialForm: SkillFormData = {
  name: '',
  icon_key: 'Code',
  proficiency: 50,
  category: 'Frontend',
  sort_order: 0,
};

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [form, setForm] = useState<SkillFormData>(initialForm);
  const [isSaving, setIsSaving] = useState(false);

  const loadSkills = async () => {
    setIsLoading(true);
    const data = await skillsService.getAll();
    setSkills(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const openCreate = () => {
    setEditingSkill(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      icon_key: skill.icon_key,
      proficiency: skill.proficiency,
      category: skill.category,
      sort_order: skill.sort_order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (skill: Skill) => {
    if (!confirm(`Delete "${skill.name}"?`)) return;
    try {
      await skillsService.delete(skill.id);
      toast.success('Skill deleted');
      loadSkills();
    } catch (error) {
      toast.error('Failed to delete');
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (editingSkill) {
        await skillsService.update(editingSkill.id, form);
        toast.success('Skill updated');
      } else {
        await skillsService.create(form);
        toast.success('Skill created');
      }
      setIsModalOpen(false);
      loadSkills();
    } catch (error) {
      toast.error('Failed to save');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    {
      key: 'proficiency',
      label: 'Proficiency',
      render: (skill: Skill) => (
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-acid to-indigo rounded-full"
              style={{ width: `${skill.proficiency}%` }}
            />
          </div>
          <span className="text-xs font-mono">{skill.proficiency}%</span>
        </div>
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
            <Wrench className="w-8 h-8 text-acid" />
            Skills Manager
          </h1>
          <p className="text-white/55">Manage your skills and technologies</p>
        </div>
        <Button variant="primary" onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <DataTable
          data={skills}
          columns={columns}
          onEdit={openEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill ? 'Edit Skill' : 'Add Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/55">Icon Key</label>
              <input
                value={form.icon_key}
                onChange={(e) => setForm({ ...form, icon_key: e.target.value })}
                placeholder="e.g. Code, Globe, Database"
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/55">Category</label>
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">
              Proficiency: {form.proficiency}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={form.proficiency}
              onChange={(e) => setForm({ ...form, proficiency: parseInt(e.target.value) })}
              className="w-full accent-acid"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/55">Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-text-1 placeholder-text-3 focus:outline-none focus:border-acid/40 transition-colors"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full gap-2" disabled={isSaving}>
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : editingSkill ? 'Update Skill' : 'Create Skill'}
          </Button>
        </form>
      </Modal>
    </motion.div>
  );
}
