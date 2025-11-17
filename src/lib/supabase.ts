import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Environment variables:', {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'present' : 'missing'
  });
  throw new Error('Missing Supabase environment variables. Check console for details.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
