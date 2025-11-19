'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileUploader } from './FileUploader';
import { useKyc } from '@/hooks/useKyc';
import { validateKycBase } from '@/utils/validators';
import { ALL_COUNTRIES } from '@/utils/countryFields';
import { KycBaseData } from '@/types';

export const KycFormBase: React.FC = () => {
  const router = useRouter();
  const { createKycRecord, uploadFile } = useKyc();
  
  const [formData, setFormData] = useState<Partial<KycBaseData>>({
    fullName: '',
    dateOfBirth: '',
    country: '',
    email: '',
    documentIdUrl: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDocumentUpload = async (file: any) => {
    setFormData(prev => ({ ...prev, documentIdUrl: file.url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateKycBase(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const record = await createKycRecord('base', formData as KycBaseData);
      if (record) {
        alert('Base KYC completed successfully');
        router.push('/dashboard');
      }
    } catch (error) {
      alert('Failed to submit KYC');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-dark-card p-4 rounded-lg border border-dark-border mb-6">
        <h3 className="text-lg font-semibold text-dark-text mb-2">LEVEL 1 — BASE</h3>
        <p className="text-sm text-dark-muted">Basic identity verification</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Full Name <span className="text-crypto-error">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="First and last name"
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:border-crypto-primary focus:outline-none"
        />
        {errors.fullName && <p className="text-sm text-crypto-error mt-1">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Date of Birth <span className="text-crypto-error">*</span>
        </label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:border-crypto-primary focus:outline-none"
        />
        {errors.dateOfBirth && <p className="text-sm text-crypto-error mt-1">{errors.dateOfBirth}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Country <span className="text-crypto-error">*</span>
        </label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:border-crypto-primary focus:outline-none"
        >
          <option value="">Select Country</option>
          {ALL_COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        {errors.country && <p className="text-sm text-crypto-error mt-1">{errors.country}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Email <span className="text-crypto-error">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:border-crypto-primary focus:outline-none"
        />
        {errors.email && <p className="text-sm text-crypto-error mt-1">{errors.email}</p>}
      </div>

      <FileUploader
        label="Identity Document (ID) *"
        accept="image/*,application/pdf"
        fileType="image"
        onUpload={handleDocumentUpload}
        currentFile={formData.documentIdUrl}
        required
      />
      {errors.documentIdUrl && <p className="text-sm text-crypto-error mt-1">{errors.documentIdUrl}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-4 bg-gradient-crypto text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Base KYC'}
      </button>
    </form>
  );
};
