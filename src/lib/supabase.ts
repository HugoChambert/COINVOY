import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qpymfymqpzjmjmfapvmv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFweW1meW1xcHpqbWptZmFwdm12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NjY5OTgsImV4cCI6MjA3OTE0Mjk5OH0.t2BjhHrAW2hs4_lrB0iX0KvtQwYHXzt6Nb6rgQ72twk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
