import { supabase } from '@/lib/supabase';
import type { SocialLink } from '@/types';

export const socialService = {
  async getAll(): Promise<SocialLink[]> {
    const { data, error } = await supabase.from('social_links').select('*').eq('is_visible', true).order('sort_order');
    if (error) { console.error(error); return []; }
    return (data as SocialLink[]) || [];
  },
  async getAllAdmin(): Promise<SocialLink[]> {
    const { data, error } = await supabase.from('social_links').select('*').order('sort_order');
    if (error) { console.error(error); return []; }
    return (data as SocialLink[]) || [];
  },
  async create(link: Omit<SocialLink, 'id'>): Promise<SocialLink | null> {
    const { data, error } = await supabase.from('social_links').insert(link as never).select().single();
    if (error) { console.error(error); return null; }
    return data as SocialLink;
  },
  async update(id: string, link: Partial<SocialLink>): Promise<SocialLink | null> {
    const { data, error } = await supabase.from('social_links').update(link as never).eq('id', id).select().single();
    if (error) { console.error(error); return null; }
    return data as SocialLink;
  },
  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    if (error) { console.error(error); return false; }
    return true;
  },
};
