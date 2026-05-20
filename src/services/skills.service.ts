import { supabase } from '@/lib/supabase';
import type { Skill } from '@/types';

export const skillsService = {
  async getAll(): Promise<Skill[]> {
    const { data, error } = await supabase.from('skills').select('*').order('sort_order');
    if (error) { console.error(error); return []; }
    return (data as Skill[]) || [];
  },
  async create(skill: Omit<Skill, 'id'>): Promise<Skill | null> {
    const { data, error } = await supabase.from('skills').insert(skill as never).select().single();
    if (error) { console.error(error); return null; }
    return data as Skill;
  },
  async update(id: string, skill: Partial<Skill>): Promise<Skill | null> {
    const { data, error } = await supabase.from('skills').update(skill as never).eq('id', id).select().single();
    if (error) { console.error(error); return null; }
    return data as Skill;
  },
  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) { console.error(error); return false; }
    return true;
  },
};
