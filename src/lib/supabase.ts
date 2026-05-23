import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase Environment Variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

// We default to empty strings if missing to prevent immediate crash, 
// but it will fail on network requests if not properly configured.
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// isMockMode is removed as we are using real backend now
