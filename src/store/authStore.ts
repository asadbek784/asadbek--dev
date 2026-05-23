import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  checkAdmin: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,
      isAdmin: false,

      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),

      signIn: async (email, password) => {
        set({ isLoading: true });
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error) {
          const { data } = await supabase.auth.getSession();
          set({ user: data.session?.user ?? null, session: data.session });
          await get().checkAdmin();
        }
        set({ isLoading: false });
        return { error };
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null, isAdmin: false });
      },

      checkAdmin: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { set({ isAdmin: false }); return; }
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        set({ isAdmin: (data as { role: string } | null)?.role === 'admin' });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, session: state.session, isAdmin: state.isAdmin }),
    }
  )
);
