import { supabase } from '@/lib/supabase';
import type { AboutSection } from '@/types';

export const aboutService = {
  async get(): Promise<AboutSection | null> {
    const { data, error } = await supabase.from('about_section').select('*').single();
    if (error) { console.error(error); return null; }
    return data as AboutSection;
  },
  async update(id: string, about: Partial<AboutSection>): Promise<AboutSection | null> {
    const { data, error } = await supabase.from('about_section').update(about as never).eq('id', id).select().single();
    if (error) { console.error(error); return null; }
    return data as AboutSection;
  },
};
