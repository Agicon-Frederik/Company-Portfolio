import { supabase } from './supabase';
import { toast } from 'sonner';

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    toast.error('Failed to sign in');
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    toast.error('Failed to sign out');
    throw error;
  }
}

// Replace the existing useAuth with the new hook
export { useSupabaseAuth as useAuth } from './hooks/useSupabaseAuth';