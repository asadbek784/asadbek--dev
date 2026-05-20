import { supabase } from '@/lib/supabase';
import type { Project, ProjectImage } from '@/types';

export const projectsService = {
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase.from('projects').select('*').order('sort_order');
    if (error) { console.error(error); return []; }
    return (data as Project[]) || [];
  },
  async getFeatured(): Promise<Project[]> {
    const { data, error } = await supabase.from('projects').select('*').eq('featured', true).order('sort_order');
    if (error) { console.error(error); return []; }
    return (data as Project[]) || [];
  },
  async getBySlug(slug: string): Promise<Project | null> {
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
    if (error) { console.error(error); return null; }
    return data as Project;
  },
  async getImages(projectId: string): Promise<ProjectImage[]> {
    const { data, error } = await supabase.from('project_images').select('*').eq('project_id', projectId).order('sort_order');
    if (error) { console.error(error); return []; }
    return (data as ProjectImage[]) || [];
  },
  async create(project: Omit<Project, 'id'>): Promise<Project | null> {
    const { data, error } = await supabase.from('projects').insert(project as never).select().single();
    if (error) { console.error(error); return null; }
    return data as Project;
  },
  async update(id: string, project: Partial<Project>): Promise<Project | null> {
    const { data, error } = await supabase.from('projects').update(project as never).eq('id', id).select().single();
    if (error) { console.error(error); return null; }
    return data as Project;
  },
  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) { console.error(error); return false; }
    return true;
  },
  async uploadImage(file: File, path: string): Promise<string | null> {
    const { data, error } = await supabase.storage.from('portfolio').upload(path, file);
    if (error) { console.error(error); return null; }
    const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(data.path);
    return publicUrl;
  },
};
