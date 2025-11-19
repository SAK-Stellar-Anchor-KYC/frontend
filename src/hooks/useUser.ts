'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@/types';
import { useWallet } from './useWallet';

export const useUser = () => {
  const { publicKey, isConnected } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && publicKey) {
      fetchOrCreateUser(publicKey);
    } else {
      setUser(null);
    }
  }, [publicKey, isConnected]);

  const fetchOrCreateUser = async (stellarPublicKey: string) => {
    setLoading(true);
    setError(null);

    try {
      // Check if user exists
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('stellar_public_key', stellarPublicKey)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 is "not found" error
        throw fetchError;
      }

      if (existingUser) {
        setUser(existingUser);
      } else {
        // Create new user
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            stellar_public_key: stellarPublicKey,
          })
          .select()
          .single();

        if (createError) throw createError;

        setUser(newUser);
      }
    } catch (err: any) {
      console.error('Error fetching or creating user:', err);
      setError(err.message || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
  };
};
