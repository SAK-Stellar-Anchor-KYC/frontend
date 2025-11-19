'use client';

import { useState, useEffect } from 'react';
import { supabase, getStorageBucket, getPublicUrl } from '@/lib/supabaseClient';
import { KycRecord, KycType, KycData, FileUploadResult } from '@/types';
import { useUser } from './useUser';

export const useKyc = () => {
  const { user } = useUser();
  const [kycRecords, setKycRecords] = useState<KycRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchKycRecords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchKycRecords = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('kyc_records')
        .select('*')
        .eq('user_id', user.id);

      if (fetchError) throw fetchError;

      setKycRecords(data || []);
    } catch (err: any) {
      console.error('Error fetching KYC records:', err);
      setError(err.message || 'Failed to fetch KYC records');
    } finally {
      setLoading(false);
    }
  };

  const getKycByType = (kycType: KycType): KycRecord | undefined => {
    return kycRecords.find(record => record.kyc_type === kycType);
  };

  const createKycRecord = async (
    kycType: KycType,
    data: KycData
  ): Promise<KycRecord | null> => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // Check if KYC already exists
      const existing = getKycByType(kycType);
      if (existing && existing.status === 'validated') {
        throw new Error('KYC already validated for this type');
      }

      const { data: newRecord, error: createError } = await supabase
        .from('kyc_records')
        .insert({
          user_id: user.id,
          kyc_type: kycType,
          status: 'pending',
          data: data,
        })
        .select()
        .single();

      if (createError) throw createError;

      setKycRecords(prev => [...prev.filter(r => r.kyc_type !== kycType), newRecord]);
      return newRecord;
    } catch (err: any) {
      console.error('Error creating KYC record:', err);
      setError(err.message || 'Failed to create KYC record');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateKycRecord = async (
    kycType: KycType,
    data: Partial<KycData>,
    status?: 'pending' | 'validated' | 'rejected'
  ): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    const existing = getKycByType(kycType);
    if (!existing) {
      setError('KYC record not found');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const updateData: any = {
        data: { ...existing.data, ...data },
      };

      if (status) {
        updateData.status = status;
        if (status === 'validated') {
          updateData.validated_at = new Date().toISOString();
        }
      }

      const { data: updatedRecord, error: updateError } = await supabase
        .from('kyc_records')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setKycRecords(prev =>
        prev.map(r => (r.id === updatedRecord.id ? updatedRecord : r))
      );

      return true;
    } catch (err: any) {
      console.error('Error updating KYC record:', err);
      setError(err.message || 'Failed to update KYC record');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (
    file: File,
    kycType: KycType
  ): Promise<FileUploadResult | null> => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${kycType}/${Date.now()}.${fileExt}`;
      const bucket = getStorageBucket();

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const publicUrl = getPublicUrl(data.path);

      return {
        path: data.path,
        url: publicUrl,
      };
    } catch (err: any) {
      console.error('Error uploading file:', err);
      setError(err.message || 'Failed to upload file');
      return null;
    }
  };

  const deleteFile = async (path: string): Promise<boolean> => {
    try {
      const bucket = getStorageBucket();
      
      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (deleteError) throw deleteError;

      return true;
    } catch (err: any) {
      console.error('Error deleting file:', err);
      setError(err.message || 'Failed to delete file');
      return false;
    }
  };

  return {
    kycRecords,
    loading,
    error,
    getKycByType,
    createKycRecord,
    updateKycRecord,
    uploadFile,
    deleteFile,
    refetch: fetchKycRecords,
  };
};
