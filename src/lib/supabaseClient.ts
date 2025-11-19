import { createClient } from '@supabase/supabase-js';

// Use dummy values for build time, will be replaced at runtime
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We're using wallet authentication, not Supabase auth
  },
});

// Helper to get storage bucket name
export const getStorageBucket = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'kyc-files';
};

// Helper to get public URL for a file
export const getPublicUrl = (path: string) => {
  const { data } = supabase.storage.from(getStorageBucket()).getPublicUrl(path);
  return data.publicUrl;
};
