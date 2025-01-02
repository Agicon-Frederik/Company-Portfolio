// Environment configuration
export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
} as const;

// Validate environment variables
export function validateConfig() {
  const { supabase } = config;
  
  if (!supabase.url) {
    throw new Error('VITE_SUPABASE_URL is not defined');
  }
  
  if (!supabase.anonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY is not defined');
  }
}