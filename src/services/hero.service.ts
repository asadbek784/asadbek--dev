import { supabase } from '@/lib/supabase';
import type { HeroSection } from '@/types';

export const heroService = {
  async get(): Promise<HeroSection | null> {
    const { data, error } = await supabase.from('hero_section').select('*').single();
    if (error) { console.error(error); return null; }
    return data as HeroSection;
  },
  async update(id: string, hero: Partial<HeroSection>): Promise<HeroSection | null> {
    const { data, error } = await supabase.from('hero_section').update(hero as never).eq('id', id).select().single();
    if (error) { console.error(error); return null; }
    return data as HeroSection;
  },
};
