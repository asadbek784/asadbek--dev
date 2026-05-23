import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FolderGit,
  Wrench,
  Share2,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { projectsService } from '@/services/projects.service';
import { skillsService } from '@/services/skills.service';
import { socialService } from '@/services/social.service';
import { staggerContainer, fadeInUp } from '@/animations/variants';
import Card from '@/components/ui/Card';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    socialLinks: 0,
    views: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const [projects, skills, socialLinks] = await Promise.all([
        projectsService.getAll(),
        skillsService.getAll(),
        socialService.getAllAdmin(),
      ]);
      setStats({
        projects: projects.length,
        skills: skills.length,
        socialLinks: socialLinks.length,
        views: Math.floor(Math.random() * 5000) + 1000,
      });
    }
    loadStats();
  }, []);

  const cards = [
    { label: 'Total Projects', value: stats.projects, icon: FolderGit, color: 'text-acid' },
    { label: 'Skills', value: stats.skills, icon: Wrench, color: 'text-indigo' },
    { label: 'Social Links', value: stats.socialLinks, icon: Share2, color: 'text-rose' },
    { label: 'Page Views', value: stats.views.toLocaleString(), icon: Eye, color: 'text-green-400' },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-body font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/55">Overview of your portfolio</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.label} variants={fadeInUp}>
              <Card className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-white/5 ${card.color}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-body font-bold text-white">{card.value}</p>
                  <p className="text-sm text-white/55">{card.label}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div variants={fadeInUp}>
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-acid" />
            <h2 className="text-lg font-body font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Edit Hero', desc: 'Update your main headline', path: '/admin/hero' },
              { label: 'Manage Projects', desc: 'Add or edit projects', path: '/admin/projects' },
              { label: 'Update Skills', desc: 'Modify your skill set', path: '/admin/skills' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 hover:border-acid/30 transition-all group"
              >
                <h3 className="font-medium text-white group-hover:text-acid transition-colors">
                  {action.label}
                </h3>
                <p className="text-sm text-white/55 mt-1">{action.desc}</p>
              </button>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
