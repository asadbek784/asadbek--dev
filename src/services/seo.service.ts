import { supabase } from '@/lib/supabase';
import type { SEOSettings, SiteSettings } from '@/types';

export const seoService = {
  async get(): Promise<SEOSettings | null> {
    const { data, error } = await supabase.from('seo_settings').select('*').single();
    if (error) { console.error(error); return null; }
    return data as SEOSettings;
  },
  async update(id: string, seo: Partial<SEOSettings>): Promise<SEOSettings | null> {
    const { data, error } = await supabase.from('seo_settings').update(seo as never).eq('id', id).select().single();
    if (error) { console.error(error); return null; }
    return data as SEOSettings;
  },
  async getSiteSettings(): Promise<SiteSettings | null> {
    const { data, error } = await supabase.from('site_settings').select('*').single();
    if (error) { console.error(error); return null; }
    return data as SiteSettings;
  },
  async updateSiteSettings(id: string, settings: Partial<SiteSettings>): Promise<SiteSettings | null> {
    const { data, error } = await supabase.from('site_settings').update(settings as never).eq('id', id).select().single();
    if (error) { console.error(error); return null; }
    return data as SiteSettings;
  },
};
