
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;

// Helper functions for database operations
export const termsAcceptanceService = {
  async create(data: { name: string; email: string; mobile: string }) {
    const { data: result, error } = await supabase
      .from('terms_acceptances')
      .insert({
        name: data.name.toUpperCase(),
        email: data.email.toLowerCase(),
        mobile: data.mobile,
        accepted_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('terms_acceptances')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async search(query: string) {
    const { data, error } = await supabase
      .from('terms_acceptances')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,mobile.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};

export const adminService = {
  async authenticate(username: string, password: string) {
    // For demo purposes, we'll use a simple check
    // In production, you'd want proper password hashing
    if (username === 'admin' && password === 'admin123') {
      return { success: true, user: { username: 'admin' } };
    }
    return { success: false, user: null };
  }
};
        