export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  cta_primary_label: string;
  cta_primary_url: string;
  cta_secondary_label: string;
  cta_secondary_url: string;
}

export interface AboutSection {
  id: string;
  biography: string;
  experience_years: number;
  location: string;
  profile_image_url: string | null;
}

export interface Skill {
  id: string;
  name: string;
  icon_key: string;
  proficiency: number;
  category: string;
  sort_order: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  thumbnail_url: string | null;
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  sort_order: number;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  sort_order: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon_key: string;
  is_visible: boolean;
  sort_order: number;
}

export interface SEOSettings {
  id: string;
  meta_title: string;
  meta_description: string;
  keywords: string[];
}

export interface SiteSettings {
  id: string;
  site_name: string;
  logo_url: string | null;
  favicon_url: string | null;
}

export interface Profile {
  id: string;
  role: 'admin' | 'viewer';
}

export type Database = {
  public: {
    Tables: {
      hero_section: {
        Row: HeroSection;
        Insert: Omit<HeroSection, 'id'> & { id?: string };
        Update: Partial<HeroSection>;
      };
      about_section: {
        Row: AboutSection;
        Insert: Omit<AboutSection, 'id'> & { id?: string };
        Update: Partial<AboutSection>;
      };
      skills: {
        Row: Skill;
        Insert: Omit<Skill, 'id'> & { id?: string };
        Update: Partial<Skill>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id'> & { id?: string };
        Update: Partial<Project>;
      };
      project_images: {
        Row: ProjectImage;
        Insert: Omit<ProjectImage, 'id'> & { id?: string };
        Update: Partial<ProjectImage>;
      };
      social_links: {
        Row: SocialLink;
        Insert: Omit<SocialLink, 'id'> & { id?: string };
        Update: Partial<SocialLink>;
      };
      seo_settings: {
        Row: SEOSettings;
        Insert: Omit<SEOSettings, 'id'> & { id?: string };
        Update: Partial<SEOSettings>;
      };
      site_settings: {
        Row: SiteSettings;
        Insert: Omit<SiteSettings, 'id'> & { id?: string };
        Update: Partial<SiteSettings>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id'> & { id?: string };
        Update: Partial<Profile>;
      };
    };
  };
};
