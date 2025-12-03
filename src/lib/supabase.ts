import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oiprgbmrbffoqvdidnrg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pcHJnYm1yYmZmb3F2ZGlkbnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTA2MDcsImV4cCI6MjA4MDM2NjYwN30.WmPh8IR_2VfPnREx2ZxeBrSD1orWMJqqdBYUitwkwxc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});
